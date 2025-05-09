
import React from 'react';
import { 
  Table, 
  TableBody, 
  TableCaption, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { User, Role } from "@/types";
import { Edit, UserCog } from "lucide-react";
import { UserRoleSelect } from "@/components/users/UserRoleSelect";
import { RBACWrapper } from "@/components/layout/RBACWrapper";
import { useAuth } from "@/contexts/AuthContext";

interface UserTableProps {
  users: User[];
}

export const UserTable: React.FC<UserTableProps> = ({ users }) => {
  const { currentUser } = useAuth();
  
  const getRoleBadgeColor = (role: Role) => {
    switch (role) {
      case 'admin':
        return 'bg-red-500';
      case 'recruiter':
        return 'bg-blue-500';
      case 'hiring_manager':
        return 'bg-green-500';
      case 'viewer':
        return 'bg-amber-500';
      default:
        return 'bg-gray-500';
    }
  };
  
  return (
    <div className="border rounded-lg bg-white">
      <Table>
        <TableCaption>List of all users in the system</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>User</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Role</TableHead>
            <TableHead>Department</TableHead>
            <TableHead className="w-[100px]">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {users.map((user) => (
            <TableRow key={user.id}>
              <TableCell className="font-medium">
                <div className="flex items-center gap-3">
                  <Avatar className="h-8 w-8">
                    <AvatarFallback className="bg-primary/10">{user.avatar || user.name.substring(0, 2)}</AvatarFallback>
                  </Avatar>
                  <span>{user.name}</span>
                </div>
              </TableCell>
              <TableCell>{user.email}</TableCell>
              <TableCell>
                <RBACWrapper requiredPermission={{ action: 'update', subject: 'users' }}>
                  <UserRoleSelect userId={user.id} currentRole={user.role} disabled={user.id === currentUser?.id} />
                </RBACWrapper>
                <RBACWrapper 
                  requiredPermission={{ action: 'update', subject: 'users' }}
                  fallback={<Badge className={getRoleBadgeColor(user.role)}>{user.role.replace('_', ' ')}</Badge>}
                >
                  {null}
                </RBACWrapper>
              </TableCell>
              <TableCell>{user.department || '—'}</TableCell>
              <TableCell>
                <RBACWrapper requiredPermission={{ action: 'update', subject: 'users' }}>
                  <Button variant="ghost" size="icon">
                    <Edit className="h-4 w-4" />
                    <span className="sr-only">Edit user</span>
                  </Button>
                </RBACWrapper>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};
