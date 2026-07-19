import { HealthMetrics } from '@/lib/health';
import { 
  Server, 
  Database, 
  DatabaseBackup, 
  Zap, 
  Cpu, 
  CreditCard, 
  Mail, 
  Image as ImageIcon 
} from 'lucide-react';
import { cn } from '@marketing-workspace/ui/utils';

export function HealthCards({ metrics }: { metrics: HealthMetrics }) {
  const cards = [
    {
      name: 'API Gateway',
      icon: Server,
      status: 'operational',
      stats: [
        { label: 'Latency', value: '42ms' },
        { label: 'Uptime', value: '99.98%' },
        { label: 'Traffic', value: '8,924/day' },
      ],
    },
    {
      name: 'PostgreSQL (Primary)',
      icon: Database,
      status: 'operational',
      stats: [
        { label: 'Latency', value: `${metrics.dbLatencyMs}ms` },
        { label: 'Uptime', value: '99.99%' },
        { label: 'Queries', value: '124K/hr' },
      ],
    },
    {
      name: 'PostgreSQL (Replica)',
      icon: DatabaseBackup,
      status: 'operational',
      stats: [
        { label: 'Latency', value: '5ms' },
        { label: 'Uptime', value: '99.99%' },
        { label: 'Replication lag', value: '0.2s' },
      ],
    },
    {
      name: 'Redis Cache',
      icon: Zap,
      status: 'operational',
      stats: [
        { label: 'Latency', value: '1ms' },
        { label: 'Uptime', value: '99.99%' },
        { label: 'Hit rate', value: '94.2%' },
      ],
    },
    {
      name: 'AI Worker Pool',
      icon: Cpu,
      status: metrics.queueDepth > 10 || metrics.aiLatencyS > 5 ? 'degraded' : 'operational',
      stats: [
        { label: 'Latency', value: `${metrics.aiLatencyS}s` },
        { label: 'Active Jobs', value: `${metrics.aiWorkersActive}` },
        { label: 'Queue Depth', value: `${metrics.queueDepth}` },
      ],
    },
    {
      name: 'Stripe Webhooks',
      icon: CreditCard,
      status: 'operational',
      stats: [
        { label: 'Latency', value: '112ms' },
        { label: 'Uptime', value: '100%' },
        { label: 'Events', value: '412/day' },
      ],
    },
    {
      name: 'Email Delivery',
      icon: Mail,
      status: 'operational',
      stats: [
        { label: 'Latency', value: '450ms' },
        { label: 'Uptime', value: '99.99%' },
        { label: 'Bounce rate', value: '0.1%' },
      ],
    },
    {
      name: 'Storage (Images)',
      icon: ImageIcon,
      status: 'operational',
      stats: [
        { label: 'Latency', value: '85ms' },
        { label: 'Uptime', value: '99.99%' },
        { label: 'Bandwidth', value: '14.2 GB/day' },
      ],
    },
  ];

  return (
    <div className="grid grid-cols-4 gap-4 mt-2">
      {cards.map((card, i) => (
        <div 
          key={i}
          className={cn(
            "border-[1.25px] rounded-[12px] p-4 flex flex-col",
            card.status === 'degraded' 
              ? "bg-[#fffbeb] border-[#fee685]" 
              : "bg-[#f8f8fb] border-[#e2e2ea]"
          )}
        >
          <div className="flex items-center justify-between mb-4">
            <div className="bg-[#f1f1f5] rounded-[8px] h-7 w-7 flex items-center justify-center">
              <card.icon className="h-4 w-4 text-[#6e6e85]" />
            </div>
            <div className={cn(
              "h-2 w-2 rounded-full",
              card.status === 'degraded' ? "bg-[#fe9a00]" : "bg-[#00c950]"
            )} />
          </div>

          <h3 className="text-[12px] font-semibold text-[#0c0c0e] mb-1">{card.name}</h3>

          <div className="flex flex-col gap-1">
            {card.stats.map((stat, idx) => (
              <p key={idx} className="text-[10px] text-[#6e6e85]">
                {stat.label}: {stat.value}
              </p>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
