
import { useState } from 'react';
import { Layout } from "@/components/layout/Layout";
import { RBACWrapper } from "@/components/layout/RBACWrapper";
import { useAuth } from '@/contexts/AuthContext';
import { Button } from "@/components/ui/button";
import { Plus, Edit, Trash2 } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { AddRoleDialog } from "@/components/users/AddRoleDialog";
import { EditRoleDialog } from "@/components/users/EditRoleDialog";

const RoleManagement = () => {
  const [isAddRoleDialogOpen, setIsAddRoleDialogOpen] = useState(false);
  const [isEditRoleDialogOpen, setIsEditRoleDialogOpen] = useState(false);
  const [currentRoleId, setCurrentRoleId] = useState<string | null>(null);
  const { rolePermissions } = useAuth();
  const { toast } = useToast();

  // Sample roles for demonstration
  const roles = [
    { id: '1', name: 'Admin', description: 'Full system access' },
    { id: '2', name: 'Recruiter', description: 'Can manage candidates and jobs' },
    { id: '3', name: 'Hiring Manager', description: 'Limited access to review candidates' },
    { id: '4', name: 'Viewer', description: 'Read-only access to the system' },
  ];

  const handleAddRole = () => {
    setIsAddRoleDialogOpen(true);
  };

  const handleEditRole = (roleId: string) => {
    setCurrentRoleId(roleId);
    setIsEditRoleDialogOpen(true);
  };

  const handleDeleteRole = (roleId: string) => {
    // In a real implementation, you would call an API to delete the role
    toast({
      title: "Role deleted",
      description: "The role has been successfully deleted.",
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
              Create and manage roles with custom permission sets for different user types.
            </p>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[200px]">Role Name</TableHead>
                  <TableHead>Description</TableHead>
                  <TableHead className="text-right w-[120px]">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {roles.map((role) => (
                  <TableRow key={role.id}>
                    <TableCell className="font-medium">{role.name}</TableCell>
                    <TableCell>{role.description}</TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button 
                          variant="ghost" 
                          size="icon"
                          onClick={() => handleEditRole(role.id)}
                        >
                          <Edit className="h-4 w-4" />
                          <span className="sr-only">Edit role</span>
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="icon"
                          onClick={() => handleDeleteRole(role.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                          <span className="sr-only">Delete role</span>
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
        
        <AddRoleDialog open={isAddRoleDialogOpen} onOpenChange={setIsAddRoleDialogOpen} />
        {currentRoleId && (
          <EditRoleDialog 
            roleId={currentRoleId} 
            open={isEditRoleDialogOpen} 
            onOpenChange={setIsEditRoleDialogOpen} 
          />
        )}
      </div>
    </Layout>
  );
};

export default RoleManagement;
