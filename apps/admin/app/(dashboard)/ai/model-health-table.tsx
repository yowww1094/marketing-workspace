import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@marketing-workspace/ui/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@marketing-workspace/ui/components/ui/table';
import { Badge } from '@marketing-workspace/ui/components/ui/badge';

export function ModelHealthTable({ models }: { models: any[] }) {
  return (
    <Card className="shadow-sm border-zinc-200">
      <CardHeader>
        <CardTitle>Model Health</CardTitle>
        <CardDescription>
          Operational status and latency of configured AI providers.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Job Type</TableHead>
              <TableHead>Active Model</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Latency</TableHead>
              <TableHead>Success Rate</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {models.map((model, idx) => (
              <TableRow key={idx}>
                <TableCell>
                  <div className="font-medium text-zinc-900 capitalize">
                    {model.type.replace('_', ' ')}
                  </div>
                </TableCell>
                <TableCell>
                  <div className="font-medium text-zinc-900 uppercase text-xs">
                    {model.provider}
                  </div>
                  <div className="text-xs text-zinc-500 truncate max-w-[150px]">
                    {model.model_name}
                  </div>
                </TableCell>
                <TableCell>
                  {model.status === 'Operational' ? (
                    <Badge variant="default" className="bg-emerald-500">Operational</Badge>
                  ) : model.status === 'Degraded' ? (
                    <Badge variant="default" className="bg-amber-500 text-white">Degraded</Badge>
                  ) : (
                    <Badge variant="destructive">Offline</Badge>
                  )}
                </TableCell>
                <TableCell className="text-zinc-500">{model.latency}</TableCell>
                <TableCell className="text-zinc-500">{model.successRate}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
