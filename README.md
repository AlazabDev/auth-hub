# Welcome to your Alazab Auth project

# Alazab Auth Project

Authentication system built with **React**, **Vite**, and **Supabase**.

This project provides a modern authentication interface connected to Supabase for secure user management, session handling, and database operations.

---

## 🚀 Tech Stack

### Frontend

* React
* Vite
* JavaScript
* CSS / Tailwind (optional)

### Backend (BaaS)

* Supabase
* Supabase Auth
* Supabase Database
* Supabase Storage (optional)

---

## 📂 Project Structure

```id="s1"
alazab-auth/
│
├── public/
│
├── src/
│   ├── components/
│   │   └── Login.jsx
│   │   └── Register.jsx
│   │
│   ├── pages/
│   │   └── Dashboard.jsx
│   │
│   ├── lib/
│   │   └── supabaseClient.js
│   │
│   ├── App.jsx
│   └── main.jsx
│
├── .env
├── index.html
├── package.json
├── vite.config.js
└── README.md
```

---

## ⚙️ Installation

Install dependencies:

```bash id="s2"
npm install
```

---

## ▶️ Run Development Server

```bash id="s3"
npm run dev
```

Default URL:

```id="s4"
http://localhost:5173
```

---

## 🔑 Environment Variables

Create a `.env` file in the root directory:

```env id="s5"
VITE_SUPABASE_URL=https://your-project-id.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key
```

---

## 🔌 Supabase Client Setup

Create:

```id="s6"
src/lib/supabaseClient.js
```

```javascript id="s7"
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY

export const supabase = createClient(
  supabaseUrl,
  supabaseKey
)
```

---

## 🔐 Features

* User Registration
* User Login
* Logout
* Session Management
* Protected Routes
* Real-time Database
* Secure Authentication

---

## 📦 Available Scripts

```bash id="s8"
npm run dev      # Start development server
npm run build    # Build for production
npm run preview  # Preview production build
```

---

## 🛡️ Security Notes

* Never expose the **service_role key** in frontend code
* Use `.env` for sensitive keys
* Enable Row Level Security (RLS) in Supabase
* Use HTTPS in production

---

## 🌍 Deployment

You can deploy this project to:

* Vercel
* Netlify
* VPS / Ubuntu Server
* Docker

---

## 📌 Future Improvements

* Role-based access control (RBAC)
* Email verification
* Password reset
* Admin dashboard
* Multi-tenant support

---

## 👨‍💻 Maintained By

**Alazab Team**

Authentication system for internal and commercial applications.

---

## Status

```id="s9"
Frontend: React + Vite
Backend: Supabase
Auth: Enabled
Environment: Development
Version: 1.0.0
```

## 📄 الترخيص

هذا المشروع مخصص لشركة العزب للإنشاءات.

## 🤝 الدعم

للحصول على الدعم:
- 📧 البريد الإلكتروني: support@uberfix.shop
- 🌐 الموقع: https://uberfix.shop
- 📚 التوثيق: راجع [PROJECT_STRUCTURE.md](./PROJECT_STRUCTURE.md)

## 📝 ملاحظات مهمة

1. **امتثال البيانات**: النظام يتوافق مع قانون حماية البيانات المصري رقم 151 لسنة 2020
2. **الأمان**: لا تستخدم بيانات Demo في الإنتاج
3. **الترحيلات**: ملفات `supabase/migrations/` للقراءة فقط - استخدم أدوات Supabase للتعديل
4. **Edge Functions**: يتم نشرها تلقائياً عند التحديث

## 🗺️ خارطة الطريق

- [ ] تطبيق الهاتف المحمول الأصلي
- [ ] نظام المحادثة المباشرة
- [ ] التكامل مع بوابات الدفع
- [ ] تقارير متقدمة وتحليلات
- [ ] نظام نقاط الولاء

<br>
<br>
<div align="center">
	<a href="https://alazab.dev">
		<picture>
			<div style="text-align:center;">
       <a href="https://alazab.dev" target="_blank">
    <img src="https://al-azab.co/images/logaz.gif" alt="Alazab.Dev" height="62" style="display:inline-block;">
		</picture>
	</a>
</div>


