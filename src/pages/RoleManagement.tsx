
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
import { Badge } from "@/components/ui/badge";
import { AddRoleDialog } from "@/components/users/AddRoleDialog";
import { EditRoleDialog } from "@/components/users/EditRoleDialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

const RoleManagement = () => {
  const [isAddRoleDialogOpen, setIsAddRoleDialogOpen] = useState(false);
  const [isEditRoleDialogOpen, setIsEditRoleDialogOpen] = useState(false);
  const [currentRoleId, setCurrentRoleId] = useState<string | null>(null);
  const [deleteRoleId, setDeleteRoleId] = useState<string | null>(null);
  const { roles, deleteRole, users } = useAuth();
  const { toast } = useToast();

  const handleAddRole = () => {
    setIsAddRoleDialogOpen(true);
  };

  const handleEditRole = (roleId: string) => {
    setCurrentRoleId(roleId);
    setIsEditRoleDialogOpen(true);
  };

  const handleDeleteRole = (roleId: string) => {
    setDeleteRoleId(roleId);
  };

  const confirmDeleteRole = () => {
    if (!deleteRoleId) return;
    
    const role = roles.find(r => r.id === deleteRoleId);
    if (!role) return;
    
    // Check if role is a system role
    if (role.isSystemRole) {
      toast({
        title: "Cannot delete system role",
        description: "System roles cannot be deleted as they are required for the application.",
        variant: "destructive",
      });
      setDeleteRoleId(null);
      return;
    }
    
    // Check if any users are assigned to this role
    const usersWithRole = users.filter(user => user.roleId === deleteRoleId);
    if (usersWithRole.length > 0) {
      toast({
        title: "Cannot delete role",
        description: `This role is assigned to ${usersWithRole.length} user(s). Please reassign them first.`,
        variant: "destructive",
      });
      setDeleteRoleId(null);
      return;
    }
    
    deleteRole(deleteRoleId);
    toast({
      title: "Role deleted",
      description: "The role has been successfully deleted.",
    });
    setDeleteRoleId(null);
  };

  const getRoleBadgeColor = (level: number) => {
    switch (level) {
      case 4:
        return 'bg-red-100 text-red-800';
      case 3:
        return 'bg-orange-100 text-orange-800';
      case 2:
        return 'bg-blue-100 text-blue-800';
      case 1:
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  // Sort roles by level (highest first)
  const sortedRoles = [...roles].sort((a, b) => b.level - a.level);

  return (
    <Layout title="Role Management">
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Role Management</h1>
            <p className="text-muted-foreground">
              Create, edit, and manage custom roles with flexible permissions
            </p>
          </div>
          <RBACWrapper requiredPermission={{ action: 'create', subject: 'roles' }}>
            <Button onClick={handleAddRole}>
              <Plus className="mr-2 h-4 w-4" />
              Add Role
            </Button>
          </RBACWrapper>
        </div>

        <Card>
          <CardContent className="pt-6 overflow-x-auto">
            <p className="text-sm text-muted-foreground mb-4">
              Manage system roles with custom permission sets. Administrators can create new roles, 
              modify existing ones, and assign specific permissions for different user types.
            </p>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[200px]">Role Name</TableHead>
                  <TableHead className="w-[100px]">Level</TableHead>
                  <TableHead>Description</TableHead>
                  <TableHead className="w-[120px]">Type</TableHead>
                  <TableHead className="w-[100px]">Users</TableHead>
                  <TableHead className="text-right w-[120px]">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {sortedRoles.map((role) => {
                  const userCount = users.filter(user => user.roleId === role.id).length;
                  
                  return (
                    <TableRow key={role.id}>
                      <TableCell className="font-medium">{role.name}</TableCell>
                      <TableCell>
                        <Badge className={getRoleBadgeColor(role.level)}>
                          Level {role.level}
                        </Badge>
                      </TableCell>
                      <TableCell>{role.description}</TableCell>
                      <TableCell>
                        {role.isSystemRole ? (
                          <Badge variant="secondary">System</Badge>
                        ) : (
                          <Badge variant="outline">Custom</Badge>
                        )}
                      </TableCell>
                      <TableCell>{userCount}</TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <RBACWrapper requiredPermission={{ action: 'update', subject: 'roles' }}>
                            <Button 
                              variant="ghost" 
                              size="icon"
                              onClick={() => handleEditRole(role.id)}
                            >
                              <Edit className="h-4 w-4" />
                              <span className="sr-only">Edit role</span>
                            </Button>
                          </RBACWrapper>
                          <RBACWrapper requiredPermission={{ action: 'delete', subject: 'roles' }}>
                            <Button 
                              variant="ghost" 
                              size="icon"
                              onClick={() => handleDeleteRole(role.id)}
                              disabled={role.isSystemRole}
                            >
                              <Trash2 className="h-4 w-4" />
                              <span className="sr-only">Delete role</span>
                            </Button>
                          </RBACWrapper>
                        </div>
                      </TableCell>
                    </TableRow>
                  );
                })}
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

        <AlertDialog open={!!deleteRoleId} onOpenChange={() => setDeleteRoleId(null)}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you sure?</AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone. This will permanently delete the role
                and remove all associated permissions.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction onClick={confirmDeleteRole}>
                Delete Role
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </Layout>
  );
};

export default RoleManagement;
