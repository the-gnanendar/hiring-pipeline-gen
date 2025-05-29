
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
import { Check, X } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";

export const RolePermissionsTable: React.FC = () => {
  const { roles } = useAuth();
  
  // Get all unique subjects
  const allSubjects = Array.from(
    new Set(
      roles.flatMap(role => role.permissions.map(p => p.subject))
    )
  ).sort();
  
  // Actions in desired order
  const actions = ["create", "read", "update", "delete"];
  
  return (
    <div className="border rounded-lg bg-white overflow-x-auto">
      <Table>
        <TableCaption>Role-based permissions matrix</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="min-w-[150px]">Permissions</TableHead>
            {roles.map(role => (
              <TableHead key={role.id} className="text-center capitalize">
                {role.name}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {allSubjects.map(subject => (
            <React.Fragment key={subject}>
              {actions.map(action => (
                <TableRow key={`${subject}-${action}`}>
                  <TableCell className="font-medium capitalize">
                    {action} {subject}
                  </TableCell>
                  {roles.map(role => {
                    const hasPermission = role.permissions.some(
                      p => p.action === action && p.subject === subject
                    );
                    return (
                      <TableCell key={`${role.id}-${subject}-${action}`} className="text-center">
                        {hasPermission ? (
                          <Check className="h-4 w-4 text-green-500 mx-auto" />
                        ) : (
                          <X className="h-4 w-4 text-red-500 mx-auto" />
                        )}
                      </TableCell>
                    );
                  })}
                </TableRow>
              ))}
            </React.Fragment>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};
