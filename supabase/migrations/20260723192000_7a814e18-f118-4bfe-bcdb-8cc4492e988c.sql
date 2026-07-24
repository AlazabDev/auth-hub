
-- Fix function search_path
CREATE OR REPLACE FUNCTION public.get_active_subscriptions(user_id uuid)
 RETURNS TABLE(plan_name text, branches_count integer, total_price numeric, end_date date)
 LANGUAGE plpgsql
 STABLE
 SET search_path TO 'public'
AS $function$
BEGIN
  RETURN QUERY
  SELECT p.name_ar, s.branches_count, s.total_price, s.end_date
  FROM subscriptions s
  JOIN plans p ON s.plan_id = p.id
  WHERE s.user_id = $1 AND s.status = 'active' AND s.end_date >= CURRENT_DATE;
END;
$function$;

-- Tie maintenance_requests to submitter
ALTER TABLE public.maintenance_requests
  ADD COLUMN IF NOT EXISTS created_by uuid REFERENCES auth.users(id) ON DELETE SET NULL;

DROP POLICY IF EXISTS "Authenticated insert maintenance_requests" ON public.maintenance_requests;
CREATE POLICY "Users insert own maintenance_requests"
  ON public.maintenance_requests
  FOR INSERT
  TO authenticated
  WITH CHECK (created_by = auth.uid());

CREATE POLICY "Users read own maintenance_requests"
  ON public.maintenance_requests
  FOR SELECT
  TO authenticated
  USING (created_by = auth.uid());

-- Restrict pricing/catalog reads to authenticated users
DROP POLICY IF EXISTS "Public read finishing_levels" ON public.finishing_levels;
CREATE POLICY "Authenticated read finishing_levels"
  ON public.finishing_levels FOR SELECT TO authenticated USING (true);

DROP POLICY IF EXISTS "Public read quotation_categories" ON public.quotation_categories;
CREATE POLICY "Authenticated read quotation_categories"
  ON public.quotation_categories FOR SELECT TO authenticated USING (true);

DROP POLICY IF EXISTS "Public read quotation_items" ON public.quotation_items;
CREATE POLICY "Authenticated read quotation_items"
  ON public.quotation_items FOR SELECT TO authenticated USING (true);

REVOKE SELECT ON public.finishing_levels, public.quotation_categories, public.quotation_items FROM anon;
