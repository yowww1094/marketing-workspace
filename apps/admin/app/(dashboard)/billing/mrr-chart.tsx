'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@marketing-workspace/ui/components/ui/card';
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';

interface MRRChartProps {
  data: { name: string; mrr: number; free: number; pro: number }[];
}

export function MRRChart({ data }: MRRChartProps) {
  return (
    <Card className="shadow-sm border-zinc-200 w-full h-[400px] flex flex-col">
      <CardHeader>
        <CardTitle>MRR Growth</CardTitle>
        <CardDescription>Monthly Recurring Revenue over time</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 min-h-0">
        <div className="w-full h-full">
          {data.length === 0 ? (
            <div className="flex items-center justify-center h-full text-zinc-500">
              No MRR data available
            </div>
          ) : (
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorMrr" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e4e4e7" />
                <XAxis 
                  dataKey="name" 
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: '#71717a', fontSize: 12 }}
                  dy={10}
                />
                <YAxis 
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: '#71717a', fontSize: 12 }}
                  tickFormatter={(value) => `$${value}`}
                  dx={-10}
                />
                <Tooltip 
                  contentStyle={{ borderRadius: '8px', border: '1px solid #e4e4e7', boxShadow: '0 1px 2px rgba(0,0,0,0.05)' }}
                  formatter={(value: number) => [`$${value}`, 'MRR']}
                />
                <Area 
                  type="monotone" 
                  dataKey="mrr" 
                  stroke="#10b981" 
                  strokeWidth={2}
                  fillOpacity={1} 
                  fill="url(#colorMrr)" 
                />
              </AreaChart>
            </ResponsiveContainer>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
