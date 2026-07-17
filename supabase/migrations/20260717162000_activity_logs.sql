-- Create activity_logs table for granular business events
CREATE TABLE public.activity_logs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
    workspace_id UUID, -- For future scoping
    type TEXT NOT NULL CHECK (type IN ('auth', 'user', 'billing', 'ai', 'admin', 'system')),
    action TEXT NOT NULL,
    description TEXT NOT NULL,
    metadata JSONB,
    ip_address TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE public.activity_logs ENABLE ROW LEVEL SECURITY;

-- Allow service_role to manage (Admins)
-- Note: service_role implicitly bypasses RLS, but it's good practice.

-- Create indexes for dashboard feed
CREATE INDEX idx_activity_logs_created_at ON public.activity_logs(created_at DESC);
CREATE INDEX idx_activity_logs_type ON public.activity_logs(type);
CREATE INDEX idx_activity_logs_user_id ON public.activity_logs(user_id);

-- Optional: Create Postgres Trigger to automatically log Supabase Auth events
CREATE OR REPLACE FUNCTION public.sync_auth_audit_to_activity_logs()
RETURNS TRIGGER AS $$
DECLARE
  v_action TEXT;
  v_desc TEXT;
BEGIN
  v_action := NEW.payload->>'action';
  
  -- Create user-friendly descriptions based on Supabase Auth internal actions
  IF v_action = 'login' THEN
    v_desc := 'User logged in';
  ELSIF v_action = 'signup' THEN
    v_desc := 'New user registered';
  ELSIF v_action = 'logout' THEN
    v_desc := 'User logged out';
  ELSIF v_action = 'user_updated' THEN
    v_desc := 'User updated their profile';
  ELSE
    v_desc := 'Auth event: ' || v_action;
  END IF;

  INSERT INTO public.activity_logs (user_id, type, action, description, ip_address, created_at)
  VALUES (
    (NEW.payload->>'actor_id')::UUID,
    'auth',
    v_action,
    v_desc,
    NEW.ip_address,
    NEW.created_at
  );
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Only create the trigger if it doesn't exist
DROP TRIGGER IF EXISTS on_auth_audit_log_insert ON auth.audit_log_entries;
CREATE TRIGGER on_auth_audit_log_insert
  AFTER INSERT ON auth.audit_log_entries
  FOR EACH ROW EXECUTE FUNCTION public.sync_auth_audit_to_activity_logs();
