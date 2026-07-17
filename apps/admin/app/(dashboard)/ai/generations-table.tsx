'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@marketing-workspace/ui/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@marketing-workspace/ui/components/ui/tabs';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@marketing-workspace/ui/components/ui/table';
import { Badge } from '@marketing-workspace/ui/components/ui/badge';
import { JobView } from '@/lib/ai-ops';

export function GenerationsTable({ 
  activeGenerations, 
  failedGenerations 
}: { 
  activeGenerations: JobView[];
  failedGenerations: JobView[];
}) {

  const renderTable = (jobs: JobView[], emptyMessage: string) => (
    <div className="rounded-md border border-zinc-200">
      <Table>
        <TableHeader>
          <TableRow className="bg-zinc-50">
            <TableHead>Job ID</TableHead>
            <TableHead>Type</TableHead>
            <TableHead>Created At</TableHead>
            <TableHead>Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {jobs.length === 0 ? (
            <TableRow>
              <TableCell colSpan={4} className="text-center py-8 text-zinc-500">
                {emptyMessage}
              </TableCell>
            </TableRow>
          ) : (
            jobs.map((job) => (
              <TableRow key={job.id}>
                <TableCell className="font-mono text-xs text-zinc-500">
                  {job.id.slice(0, 8)}...
                </TableCell>
                <TableCell className="font-medium text-zinc-900 capitalize">
                  {job.type.replace('_', ' ')}
                </TableCell>
                <TableCell className="text-zinc-500">
                  {new Date(job.created_at).toLocaleString()}
                </TableCell>
                <TableCell>
                  {job.status === 'failed' ? (
                    <Badge variant="destructive">Failed</Badge>
                  ) : job.status === 'running' ? (
                    <Badge className="bg-blue-500">Running</Badge>
                  ) : (
                    <Badge variant="secondary" className="capitalize">{job.status}</Badge>
                  )}
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );

  return (
    <Card className="shadow-sm border-zinc-200">
      <CardHeader>
        <CardTitle>Generation Jobs</CardTitle>
        <CardDescription>
          View currently active and recently failed AI operations.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="active" className="w-full">
          <TabsList className="mb-4 bg-zinc-100">
            <TabsTrigger value="active" className="data-[state=active]:bg-white">
              Active Generations
            </TabsTrigger>
            <TabsTrigger value="failed" className="data-[state=active]:bg-white">
              Failed Generations
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="active" className="mt-0">
            {renderTable(activeGenerations, "No active jobs running right now.")}
          </TabsContent>
          
          <TabsContent value="failed" className="mt-0">
            {renderTable(failedGenerations, "No failed jobs recently.")}
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}
