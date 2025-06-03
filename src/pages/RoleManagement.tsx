
import { RolePermissionsTable } from '@/components/users/RolePermissionsTable';
import { ModulePermissionsTable } from '@/components/users/ModulePermissionsTable';

export default function RoleManagement() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Role Management</h1>
        <p className="text-muted-foreground">
          Manage system roles and permissions.
        </p>
      </div>
      <div className="grid gap-6">
        <RolePermissionsTable />
        <ModulePermissionsTable />
      </div>
    </div>
  );
}
