
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Search, Filter, Brain, Users, Clock, CheckCircle } from "lucide-react";
import { CandidateScreeningCard } from "@/components/screening/CandidateScreeningCard";
import { AIScreeningDashboard } from "@/components/screening/AIScreeningDashboard";
import { useToast } from "@/hooks/use-toast";

const mockCandidates = [
  {
    id: "1",
    name: "Sarah Johnson",
    email: "sarah.johnson@email.com",
    phone: "+1 (555) 123-4567",
    position: "Senior Frontend Developer", 
    location: "San Francisco, CA",
    experience: "5+ years",
    education: "BS Computer Science, Stanford",
    skills: ["React", "TypeScript", "Node.js", "GraphQL", "AWS", "Docker"],
    aiScore: 92,
    matchReasons: [
      "5+ years React experience matches requirement",
      "TypeScript expertise aligns with tech stack",
      "Previous startup experience relevant"
    ],
    salary_expectation: "$120k - $150k",
    availability: "2 weeks notice"
  },
  {
    id: "2",
    name: "Michael Chen",
    email: "michael.chen@email.com", 
    phone: "+1 (555) 987-6543",
    position: "Product Manager",
    location: "New York, NY",
    experience: "7+ years",
    education: "MBA, Wharton",
    skills: ["Product Strategy", "Analytics", "Agile", "Roadmapping", "Stakeholder Management"],
    aiScore: 87,
    matchReasons: [
      "B2B SaaS experience matches company focus",
      "Led teams of 10+ engineers", 
      "Strong analytics background"
    ],
    salary_expectation: "$140k - $170k",
    availability: "Immediately"
  },
  {
    id: "3",
    name: "Emily Rodriguez",
    email: "emily.rodriguez@email.com",
    position: "UX Designer",
    location: "Austin, TX", 
    experience: "4+ years",
    education: "BA Design, RISD",
    skills: ["Figma", "User Research", "Prototyping", "Design Systems", "Usability Testing"],
    aiScore: 78,
    matchReasons: [
      "Strong portfolio in fintech design",
      "User research methodology expertise",
      "Cross-functional collaboration experience"
    ],
    salary_expectation: "$90k - $110k",
    availability: "1 month notice"
  }
];

export default function Screening() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("pending");
  const { toast } = useToast();

  const handleApprove = (id: string) => {
    const candidate = mockCandidates.find(c => c.id === id);
    toast({
      title: "Candidate Approved",
      description: `${candidate?.name} has been moved to the next interview stage.`,
    });
  };

  const handleReject = (id: string) => {
    const candidate = mockCandidates.find(c => c.id === id);
    toast({
      title: "Candidate Rejected", 
      description: `${candidate?.name} has been moved to rejected candidates.`,
      variant: "destructive",
    });
  };

  const handleViewDetails = (id: string) => {
    toast({
      title: "Opening Details",
      description: "Full candidate profile will open in new tab.",
    });
  };

  const stats = [
    { label: "Pending Review", value: 247, icon: <Clock className="h-4 w-4" /> },
    { label: "AI Processed", value: 1891, icon: <Brain className="h-4 w-4" /> },
    { label: "Approved Today", value: 89, icon: <CheckCircle className="h-4 w-4" /> },
    { label: "Total Pool", value: 5420, icon: <Users className="h-4 w-4" /> }
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Candidate Screening</h1>
        <p className="text-muted-foreground">
          AI-powered candidate screening and evaluation platform.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-4">
        {stats.map((stat) => (
          <Card key={stat.label}>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">{stat.label}</p>
                  <p className="text-2xl font-bold">{stat.value.toLocaleString()}</p>
                </div>
                <div className="text-muted-foreground">{stat.icon}</div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <TabsList>
            <TabsTrigger value="dashboard">AI Dashboard</TabsTrigger>
            <TabsTrigger value="pending">
              Pending Review 
              <Badge variant="secondary" className="ml-2">247</Badge>
            </TabsTrigger>
            <TabsTrigger value="approved">
              Approved
              <Badge variant="secondary" className="ml-2">89</Badge>
            </TabsTrigger>
            <TabsTrigger value="rejected">
              Rejected
              <Badge variant="secondary" className="ml-2">156</Badge>
            </TabsTrigger>
          </TabsList>
          
          <div className="flex items-center gap-2">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search candidates..."
                className="pl-10 w-64"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Button variant="outline">
              <Filter className="h-4 w-4 mr-2" />
              Filter
            </Button>
          </div>
        </div>

        <TabsContent value="dashboard">
          <AIScreeningDashboard />
        </TabsContent>

        <TabsContent value="pending" className="space-y-4">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {mockCandidates.map((candidate) => (
              <CandidateScreeningCard
                key={candidate.id}
                candidate={candidate}
                onApprove={handleApprove}
                onReject={handleReject}
                onViewDetails={handleViewDetails}
              />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="approved">
          <Card>
            <CardHeader>
              <CardTitle>Approved Candidates</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground text-center py-8">
                Approved candidates will appear here and move to interview scheduling.
              </p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="rejected">
          <Card>
            <CardHeader>
              <CardTitle>Rejected Candidates</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground text-center py-8">
                Rejected candidates are archived here for future reference.
              </p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
