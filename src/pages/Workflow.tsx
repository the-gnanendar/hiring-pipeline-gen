
import { useAuth } from '@/contexts/AuthContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function Workflow() {
  const { profile } = useAuth();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Workflow Management</h1>
        <p className="text-muted-foreground">
          Configure and manage hiring workflows.
        </p>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Workflow Configuration</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8">
            <p className="text-muted-foreground">
              Workflow management functionality will be implemented here.
            </p>
            <p className="text-sm text-muted-foreground mt-2">
              Current user role: {profile?.role}
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
