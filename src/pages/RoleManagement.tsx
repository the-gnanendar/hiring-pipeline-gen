
import { useState } from 'react';
import { Layout } from "@/components/layout/Layout";
import { RBACWrapper } from "@/components/layout/RBACWrapper";
import { useAuth } from '@/contexts/AuthContext';
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { ModulePermissionsTable } from "@/components/users/ModulePermissionsTable";
import { useToast } from "@/hooks/use-toast";

const RoleManagement = () => {
  const [isAddRoleDialogOpen, setIsAddRoleDialogOpen] = useState(false);
  const { rolePermissions } = useAuth();
  const { toast } = useToast();

  const handleAddRole = () => {
    // In a real implementation, this would open a dialog to add a new role
    setIsAddRoleDialogOpen(true);
    
    // Placeholder for demonstration
    toast({
      title: "This feature is coming soon",
      description: "The ability to add custom roles will be available in an upcoming update.",
    });
  };

  return (
    <Layout title="Role Management">
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Role Management</h1>
            <p className="text-muted-foreground">
              Define roles and assign permissions
            </p>
          </div>
          <RBACWrapper requiredPermission={{ action: 'create', subject: 'users' }}>
            <Button onClick={handleAddRole}>
              <Plus className="mr-2 h-4 w-4" />
              Add Role
            </Button>
          </RBACWrapper>
        </div>

        <Card>
          <CardContent className="pt-6 overflow-x-auto">
            <p className="text-sm text-muted-foreground mb-4">
              Review and manage role-based permissions for different modules in the system.
            </p>
            <ModulePermissionsTable />
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default RoleManagement;
