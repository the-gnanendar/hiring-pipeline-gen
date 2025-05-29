
import { Layout } from "@/components/layout/Layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { RolePermissionsTable } from "@/components/users/RolePermissionsTable";
import { ModulePermissionsTable } from "@/components/users/ModulePermissionsTable";

const RolePermissions = () => {
  return (
    <Layout title="Role Permissions">
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Role Permissions</h1>
          <p className="text-muted-foreground">
            View and understand the permission structure across all roles
          </p>
        </div>

        <Tabs defaultValue="matrix" className="space-y-4">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="matrix">Permissions Matrix</TabsTrigger>
            <TabsTrigger value="modules">Module View</TabsTrigger>
          </TabsList>
          
          <TabsContent value="matrix">
            <Card>
              <CardHeader>
                <CardTitle>Permissions Matrix</CardTitle>
                <CardDescription>
                  A comprehensive view of all permissions across different roles
                </CardDescription>
              </CardHeader>
              <CardContent>
                <RolePermissionsTable />
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="modules">
            <Card>
              <CardHeader>
                <CardTitle>Module Permissions</CardTitle>
                <CardDescription>
                  View permissions organized by application modules
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ModulePermissionsTable />
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default RolePermissions;
