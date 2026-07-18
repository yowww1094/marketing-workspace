CREATE TABLE public.blocked_ips (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    ip_address TEXT NOT NULL UNIQUE,
    reason TEXT,
    expires_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE public.blocked_ips ENABLE ROW LEVEL SECURITY;

CREATE TABLE public.security_alerts (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    severity TEXT NOT NULL CHECK (severity IN ('info', 'warning', 'high', 'critical')),
    event_type TEXT NOT NULL,
    message TEXT NOT NULL,
    ip_address TEXT,
    user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
    metadata JSONB,
    status TEXT DEFAULT 'open' CHECK (status IN ('open', 'investigating', 'resolved')),
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE public.security_alerts ENABLE ROW LEVEL SECURITY;

-- Trigger to automatically block IPs and users on high/critical alerts
CREATE OR REPLACE FUNCTION public.handle_critical_security_alert()
RETURNS trigger AS $$
BEGIN
    IF NEW.severity IN ('high', 'critical') THEN
        -- Block IP if present
        IF NEW.ip_address IS NOT NULL THEN
            INSERT INTO public.blocked_ips (ip_address, reason, expires_at)
            VALUES (NEW.ip_address, 'Automatic block due to ' || NEW.severity || ' alert: ' || NEW.event_type, NOW() + INTERVAL '30 days')
            ON CONFLICT (ip_address) DO UPDATE SET 
                expires_at = NOW() + INTERVAL '30 days',
                reason = 'Automatic block due to ' || NEW.severity || ' alert: ' || NEW.event_type;
        END IF;

        -- Block user if present
        IF NEW.user_id IS NOT NULL THEN
            UPDATE auth.users SET banned_until = NOW() + INTERVAL '30 days' WHERE id = NEW.user_id;
        END IF;
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER on_critical_security_alert
AFTER INSERT ON public.security_alerts
FOR EACH ROW
EXECUTE FUNCTION public.handle_critical_security_alert();
