
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { EnterpriseStats } from "@/components/dashboard/EnterpriseStats";
import { HiringAnalytics } from "@/components/analytics/HiringAnalytics";
import { RecentActivity } from "@/components/dashboard/RecentActivity";
import { RecentApplications } from "@/components/dashboard/RecentApplications";
import { HiringPipeline } from "@/components/dashboard/HiringPipeline";

const Dashboard = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Enterprise HRMS Dashboard</h1>
        <p className="text-muted-foreground">
          Comprehensive hiring and talent management platform.
        </p>
      </div>

      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
          <TabsTrigger value="pipeline">Pipeline</TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview" className="space-y-6">
          <EnterpriseStats />
          
          <section className="grid gap-6 lg:grid-cols-2 xl:grid-cols-3">
            <RecentActivity />
            <div className="space-y-6 xl:col-span-1">
              <RecentApplications />
            </div>
          </section>
        </TabsContent>

        <TabsContent value="analytics">
          <HiringAnalytics />
        </TabsContent>

        <TabsContent value="pipeline">
          <HiringPipeline />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Dashboard;
