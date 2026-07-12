-- Create admin roles enum
CREATE TYPE admin_role AS ENUM ('admin', 'super_admin');

-- Create admin_users table
CREATE TABLE admin_users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    role admin_role NOT NULL DEFAULT 'admin',
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    UNIQUE(user_id)
);

-- Enable RLS
ALTER TABLE admin_users ENABLE ROW LEVEL SECURITY;

-- Allow super_admins to do anything to admin_users table
CREATE POLICY "Super admins can manage admin_users"
ON admin_users
FOR ALL
TO authenticated
USING (
    EXISTS (
        SELECT 1 FROM admin_users au WHERE au.user_id = auth.uid() AND au.role = 'super_admin'
    )
);

-- Allow admins to read the admin_users table
CREATE POLICY "Admins can view admin_users"
ON admin_users
FOR SELECT
TO authenticated
USING (
    EXISTS (
        SELECT 1 FROM admin_users au WHERE au.user_id = auth.uid()
    )
);

-- Note: The service_role key implicitly bypasses RLS, so it can always read/write.
-- Setup updated_at trigger
CREATE TRIGGER set_admin_users_updated_at
BEFORE UPDATE ON admin_users
FOR EACH ROW EXECUTE FUNCTION set_updated_at();
