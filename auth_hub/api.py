import json
import frappe
from frappe import throw, msgprint
from frappe.utils.password import get_decrypted_password
import requests
from datetime import datetime, timedelta

# Supabase Configuration
SUPABASE_URL = frappe.conf.get("supabase_url")
SUPABASE_ANON_KEY = frappe.conf.get("supabase_anon_key")
SUPABASE_SERVICE_ROLE_KEY = frappe.conf.get("supabase_service_role_key")
SUPABASE_JWKS_URL = frappe.conf.get("supabase_jwks_url")


@frappe.whitelist(allow_guest=True)
def login(email, password):
    """Login user via Supabase and create Frappe session"""
    try:
        # Authenticate with Supabase
        auth_response = requests.post(
            f"{SUPABASE_URL}/auth/v1/token?grant_type=password",
            headers={
                "apikey": SUPABASE_ANON_KEY,
                "Content-Type": "application/json"
            },
            json={
                "email": email,
                "password": password
            }
        )

        if auth_response.status_code != 200:
            throw("Invalid email or password")

        auth_data = auth_response.json()
        access_token = auth_data.get("access_token")
        user_id = auth_data.get("user", {}).get("id")

        # Create or update Auth User
        auth_user = frappe.db.get_value("Auth User", {"supabase_id": user_id})
        
        if not auth_user:
            auth_user = frappe.new_doc("Auth User")
            auth_user.email = email
            auth_user.supabase_id = user_id
            auth_user.access_token = access_token
            auth_user.token_expires_at = datetime.now() + timedelta(hours=1)
            auth_user.insert(ignore_permissions=True)
        else:
            frappe.db.set_value(
                "Auth User",
                auth_user,
                {
                    "access_token": access_token,
                    "token_expires_at": datetime.now() + timedelta(hours=1),
                    "last_login": datetime.now()
                },
                update_modified=False
            )

        # Create Frappe session
        frappe.local.login_manager.user = email
        frappe.local.login_manager.post_login()

        return {
            "status": "success",
            "message": "Login successful",
            "access_token": access_token,
            "user": {
                "email": email,
                "id": user_id
            }
        }

    except Exception as e:
        frappe.log_error(f"Login error: {str(e)}", "Auth Hub Login")
        throw(str(e))


@frappe.whitelist(allow_guest=True)
def register(email, password, full_name):
    """Register new user via Supabase"""
    try:
        # Create user in Supabase
        signup_response = requests.post(
            f"{SUPABASE_URL}/auth/v1/signup",
            headers={
                "apikey": SUPABASE_ANON_KEY,
                "Content-Type": "application/json"
            },
            json={
                "email": email,
                "password": password,
                "user_metadata": {
                    "full_name": full_name
                }
            }
        )

        if signup_response.status_code not in [200, 201]:
            error_msg = signup_response.json().get("error_description", "Registration failed")
            throw(error_msg)

        user_data = signup_response.json()
        user_id = user_data.get("user", {}).get("id")

        # Create Auth User in Frappe
        auth_user = frappe.new_doc("Auth User")
        auth_user.email = email
        auth_user.full_name = full_name
        auth_user.supabase_id = user_id
        auth_user.status = "Active"
        auth_user.insert(ignore_permissions=True)

        return {
            "status": "success",
            "message": "Registration successful. Please check your email to confirm.",
            "user_id": user_id
        }

    except Exception as e:
        frappe.log_error(f"Registration error: {str(e)}", "Auth Hub Registration")
        throw(str(e))


@frappe.whitelist()
def logout():
    """Logout current user"""
    try:
        user = frappe.session.user
        
        # Update Auth User
        auth_user = frappe.db.get_value("Auth User", {"email": user})
        if auth_user:
            frappe.db.set_value(
                "Auth User",
                auth_user,
                {"last_logout": datetime.now()},
                update_modified=False
            )

        # Logout from Frappe
        frappe.local.login_manager.logout()

        return {
            "status": "success",
            "message": "Logged out successfully"
        }

    except Exception as e:
        frappe.log_error(f"Logout error: {str(e)}", "Auth Hub Logout")
        throw(str(e))


@frappe.whitelist()
def get_current_user():
    """Get current authenticated user"""
    try:
        if frappe.session.user == "Guest":
            return {"status": "not_authenticated"}

        user = frappe.session.user
        auth_user = frappe.get_doc("Auth User", {"email": user})

        return {
            "status": "authenticated",
            "user": {
                "email": auth_user.email,
                "full_name": auth_user.full_name,
                "supabase_id": auth_user.supabase_id,
                "status": auth_user.status
            }
        }

    except Exception as e:
        frappe.log_error(f"Get user error: {str(e)}", "Auth Hub Get User")
        throw(str(e))


@frappe.whitelist(allow_guest=True)
def verify_token(token):
    """Verify Supabase JWT token"""
    try:
        # Verify token with Supabase
        verify_response = requests.get(
            f"{SUPABASE_URL}/auth/v1/user",
            headers={
                "Authorization": f"Bearer {token}",
                "apikey": SUPABASE_ANON_KEY
            }
        )

        if verify_response.status_code != 200:
            return {"valid": False, "message": "Invalid token"}

        user_data = verify_response.json()
        return {
            "valid": True,
            "user": user_data
        }

    except Exception as e:
        frappe.log_error(f"Token verification error: {str(e)}", "Auth Hub Verify Token")
        return {"valid": False, "message": str(e)}
