
import { useAuth } from '@/contexts/AuthContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export function UserRoleSelect() {
  const { profile } = useAuth();

  return (
    <Card>
      <CardHeader>
        <CardTitle>User Role Selection</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-center py-8">
          <p className="text-muted-foreground">
            User role selection will be implemented here.
          </p>
          <p className="text-sm text-muted-foreground mt-2">
            Current user role: {profile?.role}
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
