-- 1. Drop the problematic recursive policies
DROP POLICY IF EXISTS "Super admins can manage admin_users" ON admin_users;
DROP POLICY IF EXISTS "Admins can view admin_users" ON admin_users;
DROP POLICY IF EXISTS "Users can read their own admin status" ON admin_users;
DROP POLICY IF EXISTS "Super admins can manage all admin_users" ON admin_users;
DROP POLICY IF EXISTS "Admins can view all admin_users" ON admin_users;

-- 2. Create SECURITY DEFINER functions to safely bypass RLS recursion
CREATE OR REPLACE FUNCTION public.is_admin() RETURNS boolean
LANGUAGE sql SECURITY DEFINER SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 FROM admin_users 
    WHERE user_id = auth.uid() AND role IN ('admin', 'super_admin')
  );
$$;

CREATE OR REPLACE FUNCTION public.is_super_admin() RETURNS boolean
LANGUAGE sql SECURITY DEFINER SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 FROM admin_users 
    WHERE user_id = auth.uid() AND role = 'super_admin'
  );
$$;

-- 3. Apply the safe, non-recursive policies
-- Everyone can read their OWN admin status
CREATE POLICY "Users can read their own admin status"
ON admin_users
FOR SELECT
TO authenticated
USING (user_id = auth.uid());

-- Super admins can manage everything
CREATE POLICY "Super admins can manage all admin_users"
ON admin_users
FOR ALL
TO authenticated
USING (is_super_admin());

-- Admins can view all admin_users
CREATE POLICY "Admins can view all admin_users"
ON admin_users
FOR SELECT
TO authenticated
USING (is_admin());
