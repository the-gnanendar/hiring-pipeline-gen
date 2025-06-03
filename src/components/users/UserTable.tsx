
import { useAuth } from '@/contexts/AuthContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export function UserTable() {
  const { profile } = useAuth();

  return (
    <Card>
      <CardHeader>
        <CardTitle>User Management</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-center py-8">
          <p className="text-muted-foreground">
            User management functionality will be implemented here.
          </p>
          <p className="text-sm text-muted-foreground mt-2">
            Current user role: {profile?.role}
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
