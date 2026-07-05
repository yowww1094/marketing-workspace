import { Button } from "@marketing-workspace/ui/components/ui/button";
import { Input } from "@marketing-workspace/ui/components/ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@marketing-workspace/ui/components/ui/card";
import { Badge } from "@marketing-workspace/ui/components/ui/badge";

export default function Home() {
  return (
    <div className="p-8 max-w-4xl mx-auto space-y-12">
      <div className="space-y-4">
        <h1 className="text-4xl font-bold tracking-tight">UI Foundation Test Page</h1>
        <p className="text-muted-foreground text-lg">
          Testing Phase 1.5 shadcn components styled with our custom design system.
        </p>
      </div>

      <div className="space-y-6">
        <h2 className="text-2xl font-semibold">Buttons</h2>
        <div className="flex gap-4 items-center">
          <Button>Primary Button</Button>
          <Button variant="secondary">Secondary</Button>
          <Button variant="outline">Outline</Button>
          <Button variant="ghost">Ghost</Button>
          <Button variant="destructive">Destructive</Button>
        </div>
      </div>

      <div className="space-y-6">
        <h2 className="text-2xl font-semibold">Inputs & Forms</h2>
        <div className="grid max-w-sm gap-4">
          <Input type="email" placeholder="Email address" />
          <Input type="password" placeholder="Password" />
        </div>
      </div>

      <div className="space-y-6">
        <h2 className="text-2xl font-semibold">Cards & Badges</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Market Research</CardTitle>
                <Badge>AI Running</Badge>
              </div>
              <CardDescription>B2B SaaS — North America — Q2 2025</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Total Addressable Market: $4.2B (+12% YoY)
              </p>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full">Export Report</Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
}
