
import React from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Checkbox } from "@/components/ui/checkbox";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { useAuth } from "@/contexts/AuthContext";
import { Badge } from "@/components/ui/badge";

// Define available modules
const modules = [
  { id: "recruitment", name: "Recruitment", initials: "RE", color: "bg-blue-500" },
  { id: "candidates", name: "Candidates", initials: "CA", color: "bg-orange-500" },
  { id: "jobs", name: "Jobs", initials: "JO", color: "bg-emerald-500" },
  { id: "interviews", name: "Interviews", initials: "IN", color: "bg-purple-500" },
  { id: "users", name: "Users", initials: "US", color: "bg-red-500" },
  { id: "settings", name: "Settings", initials: "SE", color: "bg-gray-500" },
  { id: "reports", name: "Reports", initials: "RP", color: "bg-pink-500" }
];

// Define permission types
const permissionTypes = ["create", "read", "update", "delete"];

export const ModulePermissionsTable = () => {
  const { rolePermissions } = useAuth();
  
  // Define hierarchical roles in order
  const hierarchicalRoles = ["manage", "associate_manage", "hiring_manager", "recruiter"];
  
  // Function to check if a role has a specific permission for a module
  const hasPermission = (role: string, module: string, action: string) => {
    return rolePermissions[role]?.some(
      permission => permission.subject === module && permission.action === action
    ) || false;
  };
  
  const formatRoleName = (role: string) => {
    return role.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase());
  };
  
  return (
    <div className="space-y-4">
      <div className="text-sm text-muted-foreground">
        <p className="mb-2">
          <strong>Hierarchical Permission System:</strong> Higher-level roles inherit all permissions from lower-level roles.
        </p>
        <div className="flex gap-2 flex-wrap">
          <Badge className="bg-red-100 text-red-800">Manage (Level 4)</Badge>
          <span>→</span>
          <Badge className="bg-orange-100 text-orange-800">Associate Manage (Level 3)</Badge>
          <span>→</span>
          <Badge className="bg-blue-100 text-blue-800">Hiring Manager (Level 2)</Badge>
          <span>→</span>
          <Badge className="bg-green-100 text-green-800">Recruiter (Level 1)</Badge>
        </div>
      </div>
      
      <Table className="border">
        <TableHeader>
          <TableRow>
            <TableHead className="w-[200px]">Module</TableHead>
            {hierarchicalRoles.map(role => (
              <TableHead key={role} className="text-center">
                {formatRoleName(role)}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {modules.map(module => (
            <React.Fragment key={module.id}>
              <TableRow className="bg-muted/50">
                <TableCell colSpan={hierarchicalRoles.length + 1} className="py-2">
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
                  {hierarchicalRoles.map(role => (
                    <TableCell key={`${role}-${permission}`} className="text-center">
                      <Checkbox
                        checked={hasPermission(role, module.id, permission)}
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
