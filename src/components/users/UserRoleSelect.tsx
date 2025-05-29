
import React from 'react';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { Role } from "@/types";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/contexts/AuthContext";

interface UserRoleSelectProps {
  userId: string;
  currentRoleId: string;
  disabled?: boolean;
}

export const UserRoleSelect: React.FC<UserRoleSelectProps> = ({ 
  userId, 
  currentRoleId, 
  disabled = false 
}) => {
  const { toast } = useToast();
  const { roles, getUserRole } = useAuth();
  
  const currentRole = getUserRole(currentRoleId);
  
  const handleRoleChange = (newRoleId: string) => {
    // In a real app, you would call an API to update the user's role
    console.log(`Changing user ${userId} role to ${newRoleId}`);
    
    const newRole = getUserRole(newRoleId);
    
    toast({
      title: "Role updated",
      description: `User role has been updated to ${newRole?.name || 'Unknown'}`,
    });
  };
  
  return (
    <Select defaultValue={currentRoleId} onValueChange={handleRoleChange} disabled={disabled}>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Select a role" />
      </SelectTrigger>
      <SelectContent>
        {roles.map(role => (
          <SelectItem key={role.id} value={role.id}>
            {role.name}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};
