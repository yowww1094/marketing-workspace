export type LogLevel = 'info' | 'warn' | 'error' | 'fatal';

export interface LogContext {
  url?: string;
  method?: string;
  userId?: string;
  browser?: string;
  clientIp?: string;
  metadata?: Record<string, any>;
}

export function formatErrorLog(error: unknown, level: LogLevel = 'error', context?: LogContext) {
  let message = '';
  let stack = null;

  if (error instanceof Error) {
    message = error.message;
    stack = error.stack || null;
  } else if (error && typeof error === 'object' && 'message' in error) {
    message = String((error as any).message);
    stack = 'stack' in error ? String((error as any).stack) : null;
  } else {
    message = String(error);
  }
  
  return {
    level,
    message,
    stack_trace: stack,
    url: context?.url || null,
    method: context?.method || null,
    user_id: context?.userId || null,
    browser: context?.browser || null,
    client_ip: context?.clientIp || null,
    metadata: context?.metadata || null,
  };
}
