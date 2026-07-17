-- Create a view to securely expose auth audit logs to the admin service role
CREATE OR REPLACE VIEW public.user_activities_view AS
SELECT
  id,
  payload,
  created_at,
  ip_address
FROM
  auth.audit_log_entries;

-- Grant access to the service role ONLY (not anon or authenticated)
GRANT SELECT ON public.user_activities_view TO service_role;
