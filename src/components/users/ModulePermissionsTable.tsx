
import React from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Checkbox } from "@/components/ui/checkbox";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { useAuth } from "@/contexts/AuthContext";
import { Badge } from "@/components/ui/badge";
import { SubjectType, ActionType } from "@/types";

// Define available modules
const modules = [
  { id: "recruitment" as SubjectType, name: "Recruitment", initials: "RE", color: "bg-blue-500" },
  { id: "candidates" as SubjectType, name: "Candidates", initials: "CA", color: "bg-orange-500" },
  { id: "jobs" as SubjectType, name: "Jobs", initials: "JO", color: "bg-emerald-500" },
  { id: "interviews" as SubjectType, name: "Interviews", initials: "IN", color: "bg-purple-500" },
  { id: "users" as SubjectType, name: "Users", initials: "US", color: "bg-red-500" },
  { id: "roles" as SubjectType, name: "Roles", initials: "RO", color: "bg-indigo-500" },
  { id: "settings" as SubjectType, name: "Settings", initials: "SE", color: "bg-gray-500" },
  { id: "reports" as SubjectType, name: "Reports", initials: "RP", color: "bg-pink-500" }
];

// Define permission types
const permissionTypes: ActionType[] = ["create", "read", "update", "delete"];

export const ModulePermissionsTable = () => {
  const { roles } = useAuth();
  
  // Sort roles by level (highest first)
  const sortedRoles = [...roles].sort((a, b) => b.level - a.level);
  
  // Function to check if a role has a specific permission for a module
  const hasPermission = (roleId: string, module: SubjectType, action: ActionType) => {
    const role = roles.find(r => r.id === roleId);
    if (!role) return false;
    
    return role.permissions.some(
      permission => permission.subject === module && permission.action === action
    );
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
  
  return (
    <div className="space-y-4">
      <div className="text-sm text-muted-foreground">
        <p className="mb-2">
          <strong>Dynamic Role System:</strong> Roles can be created, modified, and deleted by administrators.
        </p>
        <div className="flex gap-2 flex-wrap">
          {sortedRoles.map(role => (
            <Badge key={role.id} className={getRoleBadgeColor(role.level)}>
              {role.name} (Level {role.level})
            </Badge>
          ))}
        </div>
      </div>
      
      <Table className="border">
        <TableHeader>
          <TableRow>
            <TableHead className="w-[200px]">Module</TableHead>
            {sortedRoles.map(role => (
              <TableHead key={role.id} className="text-center">
                <div className="flex flex-col items-center gap-1">
                  <span className="font-medium">{role.name}</span>
                  <Badge variant="outline" className="text-xs">
                    Level {role.level}
                  </Badge>
                </div>
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {modules.map(module => (
            <React.Fragment key={module.id}>
              <TableRow className="bg-muted/50">
                <TableCell colSpan={sortedRoles.length + 1} className="py-2">
                  <div className="flex items-center gap-2">
                    <Avatar className={`h-6 w-6 ${module.color} text-white`}>
                      <AvatarFallback>{module.initials}</AvatarFallback>
                    </Avatar>
                    <span className="font-medium">{module.name}</span>
                  </div>
                </TableCell>
              </TableRow>
              {permissionTypes.map(permission => (
                <TableRow key={`${module.id}-${permission}`}>
                  <TableCell className="pl-8 capitalize">{permission}</TableCell>
                  {sortedRoles.map(role => (
                    <TableCell key={`${role.id}-${permission}`} className="text-center">
                      <Checkbox
                        checked={hasPermission(role.id, module.id, permission)}
                        disabled
                        className="mx-auto"
                      />
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </React.Fragment>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};
