-- Create system_logs table
CREATE TABLE system_logs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    level TEXT NOT NULL CHECK (level IN ('info', 'warn', 'error', 'fatal')),
    message TEXT NOT NULL,
    stack_trace TEXT,
    url TEXT,
    method TEXT,
    user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
    browser TEXT,
    client_ip TEXT,
    metadata JSONB,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE system_logs ENABLE ROW LEVEL SECURITY;

-- Allow insert from anon and authenticated (to log client-side errors)
CREATE POLICY "Allow anon and authenticated to insert system logs"
ON system_logs FOR INSERT
TO authenticated, anon
WITH CHECK (true);

-- Only allow service_role to read logs (admins)
-- Note: service_role implicitly bypasses RLS, so we don't strictly need a policy for it, 
-- but we don't grant select to authenticated/anon.

-- Create index for faster querying by level and created_at
CREATE INDEX idx_system_logs_level ON system_logs(level);
CREATE INDEX idx_system_logs_created_at ON system_logs(created_at DESC);
CREATE INDEX idx_system_logs_user_id ON system_logs(user_id);
