import { getActivityLogs } from '@/lib/logs';
import { ActivityFeed } from './activity-feed';
import { RefreshButton } from '@/components/refresh-button';
import { revalidatePath } from 'next/cache';

export default async function ActivityLogsPage(props: {
  searchParams: Promise<{ search?: string; type?: string }>;
}) {
  const searchParams = await props.searchParams;
  const search = searchParams.search || '';

  const { logs } = await getActivityLogs({ search });

  async function refreshData() {
    'use server';
    revalidatePath('/logs', 'page');
  }

  return (
    <div className="space-y-6 w-full">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-[20px] font-bold tracking-tight text-[#0c0c0e]">Activity Logs</h1>
          <p className="text-[14px] text-[#6e6e85] mt-1">Real-time platform event stream</p>
        </div>
        <form action={refreshData}>
          <RefreshButton />
        </form>
      </div>

      <ActivityFeed 
        logs={logs}
        initialSearch={search}
      />
    </div>
  );
}
