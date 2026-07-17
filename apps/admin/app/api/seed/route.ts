import { createAdminClient } from '@marketing-workspace/auth/admin';
import { NextResponse } from 'next/server';

export async function GET() {
  const supabase = createAdminClient();

  const { data: users } = await supabase.auth.admin.listUsers();
  const userId = users?.users?.[0]?.id || null;

  const mockLogs = [
    {
      level: 'error',
      message: 'AI generation timeout — project_id: proj_ac892',
      stack_trace: 'Error: Request timeout\n    at aiWorker (/app/workers/ai.ts:45:12)',
      url: '/api/generate',
      method: 'POST',
      user_id: userId,
      browser: 'ai-worker',
      status: 'open',
    },
    {
      level: 'critical',
      message: 'OpenAI rate limit exceeded — retry queue: 12 items',
      stack_trace: 'Error: 429 Too Many Requests\n    at openai (/app/lib/openai.ts:112:5)',
      url: '/api/ai/queue',
      method: 'POST',
      browser: 'ai-router',
      status: 'investigating',
    },
    {
      level: 'warn',
      message: 'Slow query detected — users table p99: 1.8s',
      stack_trace: null,
      url: null,
      method: 'SYSTEM',
      browser: 'postgres',
      status: 'resolved',
    },
    {
      level: 'error',
      message: 'PDF export failed — report_id: rep_bc723',
      stack_trace: 'Error: PDF generation failed\n    at exportService (/app/services/pdf.ts:22:9)',
      url: '/api/reports/export',
      method: 'GET',
      user_id: userId,
      browser: 'export-service',
      status: 'open',
    },
    {
      level: 'info',
      message: 'Background job completed with 2 warnings — job: weekly-digest',
      stack_trace: null,
      url: null,
      method: 'SYSTEM',
      browser: 'scheduler',
      status: 'resolved',
    }
  ];

  for (const log of mockLogs) {
    await supabase.from('system_logs').insert(log);
  }

  return NextResponse.json({ success: true, message: 'Seeded 5 mock error logs.' });
}
