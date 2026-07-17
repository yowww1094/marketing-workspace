'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@marketing-workspace/ui/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@marketing-workspace/ui/components/ui/table';
import { Button } from '@marketing-workspace/ui/components/ui/button';
import { Edit2 } from 'lucide-react';
import { AIJobConfig } from '@/lib/ai-config';
import { EditConfigDialog } from './edit-config-dialog';

export function ConfigTable({ configs }: { configs: AIJobConfig[] }) {
  const [selectedConfig, setSelectedConfig] = useState<AIJobConfig | null>(null);

  return (
    <Card className="shadow-sm border-zinc-200">
      <CardHeader>
        <CardTitle>Job Configurations</CardTitle>
        <CardDescription>
          Map each marketing workflow step to a specific AI model and configure its underlying prompt.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="rounded-md border border-zinc-200 bg-white overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow className="bg-zinc-50">
                <TableHead>Job Type</TableHead>
                <TableHead>Model / Provider</TableHead>
                <TableHead>System Prompt (Preview)</TableHead>
                <TableHead className="w-[80px]"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {configs.map((config) => (
                <TableRow key={config.job_type}>
                  <TableCell>
                    <div className="font-medium text-zinc-900 capitalize whitespace-nowrap">
                      {config.job_type.replace('_', ' ')}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="font-medium text-zinc-900 uppercase text-xs">
                      {config.provider}
                    </div>
                    <div className="text-xs text-zinc-500 whitespace-nowrap">
                      {config.model_name}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="text-xs text-zinc-500 font-mono truncate max-w-[400px]">
                      {config.system_prompt}
                    </div>
                  </TableCell>
                  <TableCell>
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      onClick={() => setSelectedConfig(config)}
                      className="text-zinc-500 hover:text-zinc-900"
                    >
                      <Edit2 className="h-4 w-4" />
                      <span className="sr-only">Edit Config</span>
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        <EditConfigDialog 
          config={selectedConfig} 
          open={selectedConfig !== null} 
          onOpenChange={(open) => {
            if (!open) setSelectedConfig(null);
          }} 
        />
      </CardContent>
    </Card>
  );
}
