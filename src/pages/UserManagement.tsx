
import { useState } from 'react';
import { Layout } from "@/components/layout/Layout";
import { RBACWrapper } from "@/components/layout/RBACWrapper";
import { useAuth } from '@/contexts/AuthContext';
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { UserTable } from "@/components/users/UserTable";
import { AddUserDialog } from "@/components/users/AddUserDialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { ModulePermissionsTable } from "@/components/users/ModulePermissionsTable";

const UserManagement = () => {
  const [isAddUserDialogOpen, setIsAddUserDialogOpen] = useState(false);
  const { users } = useAuth();

  return (
    <Layout title="User Management">
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">User Management</h1>
            <p className="text-muted-foreground">
              Manage user accounts and their permission levels
            </p>
          </div>
          <RBACWrapper requiredPermission={{ action: 'create', subject: 'users' }}>
            <Button onClick={() => setIsAddUserDialogOpen(true)}>
              <Plus className="mr-2 h-4 w-4" />
              Add User
            </Button>
          </RBACWrapper>
        </div>

        <Tabs defaultValue="users" className="w-full">
          <TabsList>
            <TabsTrigger value="users">Users</TabsTrigger>
            <TabsTrigger value="roles">Roles</TabsTrigger>
          </TabsList>
          <TabsContent value="users" className="mt-4">
            <UserTable users={users} />
          </TabsContent>
          <TabsContent value="roles" className="mt-4">
            <Card>
              <CardContent className="pt-6">
                <p className="text-sm text-muted-foreground mb-4">
                  Review and manage role-based permissions for different modules in the system.
                </p>
                <div className="overflow-x-auto">
                  <ModulePermissionsTable />
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
        
        <AddUserDialog open={isAddUserDialogOpen} onOpenChange={setIsAddUserDialogOpen} />
      </div>
    </Layout>
  );
};

export default UserManagement;
