
import { useState } from 'react';
import { Layout } from "@/components/layout/Layout";
import { RBACWrapper } from "@/components/layout/RBACWrapper";
import { useAuth } from '@/contexts/AuthContext';
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { UserTable } from "@/components/users/UserTable";
import { AddUserDialog } from "@/components/users/AddUserDialog";
import { Card, CardContent } from "@/components/ui/card";

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

        <Card>
          <CardContent className="pt-6">
            <UserTable users={users} />
          </CardContent>
        </Card>
        
        <AddUserDialog open={isAddUserDialogOpen} onOpenChange={setIsAddUserDialogOpen} />
      </div>
    </Layout>
  );
};

export default UserManagement;
