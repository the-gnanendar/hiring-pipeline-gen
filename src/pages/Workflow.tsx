
import { useState } from 'react';
import { Layout } from "@/components/layout/Layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { DEFAULT_WORKFLOW_STAGES, APPLICATION_STAGES } from '@/types';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { useAuth } from '@/contexts/AuthContext';

const Workflow = () => {
  const [activeTab, setActiveTab] = useState("all");
  const { users } = useAuth();
  
  // Mock data for workflow stages with candidates
  const workflowData = [
    {
      stage: DEFAULT_WORKFLOW_STAGES[0],
      candidates: [
        { id: '1', name: 'Sarah Williams', position: 'Frontend Developer', date: '2025-05-10', status: 'new', initials: 'SW' },
        { id: '2', name: 'James Brown', position: 'UX Designer', date: '2025-05-12', status: 'reviewing', initials: 'JB' },
      ]
    },
    {
      stage: DEFAULT_WORKFLOW_STAGES[1],
      candidates: [
        { id: '3', name: 'Emily Johnson', position: 'Product Manager', date: '2025-05-08', status: 'reviewing', initials: 'EJ' },
        { id: '4', name: 'Michael Chen', position: 'Backend Developer', date: '2025-05-11', status: 'reviewing', initials: 'MC' },
      ]
    },
    {
      stage: DEFAULT_WORKFLOW_STAGES[2],
      candidates: [
        { id: '5', name: 'David Wilson', position: 'DevOps Engineer', date: '2025-05-09', status: 'interview', initials: 'DW' },
      ]
    },
    {
      stage: DEFAULT_WORKFLOW_STAGES[3],
      candidates: [
        { id: '6', name: 'Lisa Garcia', position: 'Marketing Manager', date: '2025-05-07', status: 'interview', initials: 'LG' },
      ]
    },
    {
      stage: DEFAULT_WORKFLOW_STAGES[4],
      candidates: [
        { id: '7', name: 'Robert Smith', position: 'Sales Representative', date: '2025-05-06', status: 'offer', initials: 'RS' },
      ]
    },
    {
      stage: DEFAULT_WORKFLOW_STAGES[5],
      candidates: []
    }
  ];

  return (
    <Layout title="Workflow">
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Candidate Workflow</h1>
          <p className="text-muted-foreground">
            Track candidates through the hiring process
          </p>
        </div>

        <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab}>
          <div className="flex justify-between items-center mb-4">
            <TabsList>
              <TabsTrigger value="all">All Jobs</TabsTrigger>
              <TabsTrigger value="frontend">Frontend Engineer</TabsTrigger>
              <TabsTrigger value="backend">Backend Engineer</TabsTrigger>
              <TabsTrigger value="design">UX Designer</TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="all" className="m-0">
            <div className="grid grid-cols-1 gap-6">
              <div className="overflow-x-auto pb-4">
                <div className="flex space-x-4 min-w-max">
                  {workflowData.map((column, index) => (
                    <div key={column.stage.id} className="w-80 flex-shrink-0">
                      <Card>
                        <CardHeader className={`${column.stage.color} text-white rounded-t-lg px-4 py-2`}>
                          <div className="flex justify-between items-center">
                            <CardTitle className="text-sm font-medium">{column.stage.name}</CardTitle>
                            <Badge variant="outline" className="bg-white/20 hover:bg-white/30 text-white">
                              {column.candidates.length}
                            </Badge>
                          </div>
                        </CardHeader>
                        <CardContent className="p-2">
                          {column.candidates.length === 0 ? (
                            <div className="flex items-center justify-center h-20 border border-dashed rounded-md">
                              <p className="text-sm text-muted-foreground">No candidates</p>
                            </div>
                          ) : (
                            <div className="space-y-2">
                              {column.candidates.map((candidate) => (
                                <Card key={candidate.id} className="p-3 cursor-pointer hover:bg-muted/50">
                                  <div className="flex items-center space-x-3">
                                    <Avatar className="h-9 w-9 bg-primary/10">
                                      <AvatarFallback>{candidate.initials}</AvatarFallback>
                                    </Avatar>
                                    <div>
                                      <div className="font-medium text-sm">{candidate.name}</div>
                                      <div className="text-xs text-muted-foreground">{candidate.position}</div>
                                    </div>
                                  </div>
                                </Card>
                              ))}
                            </div>
                          )}
                        </CardContent>
                      </Card>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </TabsContent>

          {/* Similar structure for other tabs - using placeholder for brevity */}
          <TabsContent value="frontend" className="m-0">
            <Card>
              <CardContent className="p-6">
                <CardDescription>Frontend Engineer workflow view will appear here</CardDescription>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="backend" className="m-0">
            <Card>
              <CardContent className="p-6">
                <CardDescription>Backend Engineer workflow view will appear here</CardDescription>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="design" className="m-0">
            <Card>
              <CardContent className="p-6">
                <CardDescription>UX Designer workflow view will appear here</CardDescription>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default Workflow;
