
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Edit, Trash2 } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { RBACWrapper } from "@/components/layout/RBACWrapper";

interface UserTableProps {
  users: any[];
  onEdit: (userId: string) => void;
  onDelete: (userId: string) => void;
}

export const UserTable = ({ users, onEdit, onDelete }: UserTableProps) => {
  const { getAccessibleUsers, currentUser, getUserRole } = useAuth();
  
  // Filter users based on what current user can access
  const accessibleUsers = getAccessibleUsers();
  const filteredUsers = users.filter(user => 
    accessibleUsers.some(accessible => accessible.id === user.id)
  );

  const getRoleBadgeColor = (roleLevel: number) => {
    switch (roleLevel) {
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

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>User</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Role</TableHead>
            <TableHead>Department</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredUsers.length === 0 ? (
            <TableRow>
              <TableCell colSpan={5} className="text-center py-8 text-muted-foreground">
                No users found
              </TableCell>
            </TableRow>
          ) : (
            filteredUsers.map((user) => {
              const userRole = getUserRole(user.roleId);
              
              return (
                <TableRow key={user.id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Avatar className="h-8 w-8">
                        <AvatarFallback className="text-xs">
                          {user.avatar || user.name.substring(0, 2)}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="font-medium">{user.name}</div>
                        {user.id === currentUser?.id && (
                          <div className="text-xs text-muted-foreground">(You)</div>
                        )}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>
                    {userRole ? (
                      <Badge className={getRoleBadgeColor(userRole.level)}>
                        {userRole.name}
                      </Badge>
                    ) : (
                      <Badge variant="secondary">Unknown Role</Badge>
                    )}
                  </TableCell>
                  <TableCell>{user.department || '-'}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <RBACWrapper requiredPermission={{ action: 'update', subject: 'users' }}>
                        <Button 
                          variant="ghost" 
                          size="icon"
                          onClick={() => onEdit(user.id)}
                        >
                          <Edit className="h-4 w-4" />
                          <span className="sr-only">Edit user</span>
                        </Button>
                      </RBACWrapper>
                      <RBACWrapper requiredPermission={{ action: 'delete', subject: 'users' }}>
                        <Button 
                          variant="ghost" 
                          size="icon"
                          onClick={() => onDelete(user.id)}
                          disabled={user.id === currentUser?.id}
                        >
                          <Trash2 className="h-4 w-4" />
                          <span className="sr-only">Delete user</span>
                        </Button>
                      </RBACWrapper>
                    </div>
                  </TableCell>
                </TableRow>
              );
            })
          )}
        </TableBody>
      </Table>
    </div>
  );
};
