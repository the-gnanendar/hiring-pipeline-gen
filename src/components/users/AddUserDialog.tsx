
import React, { useState } from 'react';
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { Role } from "@/types";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Checkbox } from "@/components/ui/checkbox";

interface AddUserDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const formSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  role: z.enum(["admin", "recruiter", "hiring_manager", "viewer"] as const),
  department: z.string().optional(),
});

// Define available modules
const modules = [
  { id: "recruitment", name: "Recruitment" },
  { id: "candidates", name: "Candidates" },
  { id: "jobs", name: "Jobs" },
  { id: "interviews", name: "Interviews" },
  { id: "users", name: "Users" },
  { id: "settings", name: "Settings" }
];

// Define permission types
const permissionTypes = ["create", "read", "update", "delete"];

export const AddUserDialog: React.FC<AddUserDialogProps> = ({ 
  open, 
  onOpenChange 
}) => {
  const { toast } = useToast();
  const [selectedTab, setSelectedTab] = useState("details");
  const [permissions, setPermissions] = useState<Record<string, Record<string, boolean>>>({});
  
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      role: "viewer",
      department: "",
    },
  });
  
  const handleRoleChange = (role: string) => {
    // Reset permissions when role changes
    const newPermissions: Record<string, Record<string, boolean>> = {};
    
    modules.forEach(module => {
      newPermissions[module.id] = {
        create: role === "admin" || role === "recruiter",
        read: true,
        update: role === "admin" || role === "recruiter" || role === "hiring_manager",
        delete: role === "admin"
      };
    });
    
    setPermissions(newPermissions);
  };
  
  const togglePermission = (module: string, permission: string) => {
    setPermissions(prev => ({
      ...prev,
      [module]: {
        ...prev[module],
        [permission]: !prev[module]?.[permission]
      }
    }));
  };
  
  function onSubmit(values: z.infer<typeof formSchema>) {
    // In a real app, you would call an API to create the user
    console.log("Form submitted:", values);
    console.log("User permissions:", permissions);
    
    toast({
      title: "User created",
      description: `${values.name} has been added as a ${values.role.replace('_', ' ')}.`,
    });
    
    form.reset();
    setPermissions({});
    setSelectedTab("details");
    onOpenChange(false);
  }
  
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[700px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Add New User</DialogTitle>
          <DialogDescription>
            Create a new user account and assign permissions.
          </DialogDescription>
        </DialogHeader>
        
        <Tabs value={selectedTab} onValueChange={setSelectedTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="details">User Details</TabsTrigger>
            <TabsTrigger value="permissions">Permissions</TabsTrigger>
          </TabsList>
          
          <TabsContent value="details">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Full Name</FormLabel>
                      <FormControl>
                        <Input placeholder="John Doe" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input placeholder="john.doe@example.com" type="email" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="role"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Role</FormLabel>
                      <Select 
                        onValueChange={(value) => {
                          field.onChange(value);
                          handleRoleChange(value);
                        }} 
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select a role" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="admin">Admin</SelectItem>
                          <SelectItem value="recruiter">Recruiter</SelectItem>
                          <SelectItem value="hiring_manager">Hiring Manager</SelectItem>
                          <SelectItem value="viewer">Viewer</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="department"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Department (Optional)</FormLabel>
                      <FormControl>
                        <Input placeholder="HR, Engineering, etc." {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <DialogFooter className="gap-2 sm:gap-0">
                  <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
                    Cancel
                  </Button>
                  <Button 
                    type="button" 
                    onClick={() => setSelectedTab("permissions")}
                    className="bg-ats-600 hover:bg-ats-700"
                  >
                    Next: Configure Permissions
                  </Button>
                </DialogFooter>
              </form>
            </Form>
          </TabsContent>
          
          <TabsContent value="permissions">
            <div className="py-4">
              <div className="overflow-x-auto border rounded-md">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-[150px]">Module</TableHead>
                      {permissionTypes.map(permission => (
                        <TableHead key={permission} className="text-center capitalize">
                          {permission}
                        </TableHead>
                      ))}
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {modules.map(module => (
                      <TableRow key={module.id}>
                        <TableCell className="font-medium">{module.name}</TableCell>
                        {permissionTypes.map(permission => (
                          <TableCell key={`${module.id}-${permission}`} className="text-center">
                            <Checkbox
                              checked={permissions[module.id]?.[permission] || false}
                              onCheckedChange={() => togglePermission(module.id, permission)}
                              className="mx-auto"
                            />
                          </TableCell>
                        ))}
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
              
              <DialogFooter className="mt-6 gap-2 sm:gap-0">
                <Button type="button" variant="outline" onClick={() => setSelectedTab("details")}>
                  Back
                </Button>
                <Button 
                  type="button" 
                  onClick={form.handleSubmit(onSubmit)}
                  className="bg-ats-600 hover:bg-ats-700"
                >
                  Create User
                </Button>
              </DialogFooter>
            </div>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};
