import { ReactNode } from 'react';
import { Card, CardContent } from '@marketing-workspace/ui/components/ui/card';

interface AdminKpiProps {
  title: string;
  value: string | number;
  icon: ReactNode;
  trend?: {
    value: string | number;
    isPositive: boolean;
    label?: string;
  };
}

export function AdminKpi({ title, value, icon, trend }: AdminKpiProps) {
  return (
    <Card className="shadow-sm border-zinc-200">
      <CardContent className="p-6">
        <div className="flex items-center justify-between space-y-0 pb-2">
          <p className="text-sm font-medium text-zinc-500">{title}</p>
          <div className="h-4 w-4 text-zinc-400">{icon}</div>
        </div>
        <div className="flex flex-col gap-1 mt-2">
          <div className="text-2xl font-bold text-zinc-950">{value}</div>
          {trend && (
            <p className="text-xs text-zinc-500">
              <span
                className={`font-medium ${
                  trend.isPositive ? 'text-emerald-600' : 'text-red-600'
                }`}
              >
                {trend.isPositive ? '+' : '-'}
                {trend.value}
              </span>{' '}
              {trend.label || 'from last month'}
            </p>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
