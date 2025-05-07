
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Plus, Filter } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { jobsApi } from "@/services/api";
import { Job } from "@/types";
import { useToast } from "@/hooks/use-toast";
import { CreateJobForm } from "@/components/jobs/CreateJobForm";
import { JobDetails } from "@/components/jobs/JobDetails";

const getJobTypeColor = (type: Job["type"]) => {
  switch (type) {
    case "full-time":
      return "bg-blue-50 text-blue-600 hover:bg-blue-100";
    case "part-time":
      return "bg-purple-50 text-purple-600 hover:bg-purple-100";
    case "contract":
      return "bg-amber-50 text-amber-600 hover:bg-amber-100";
    case "remote":
      return "bg-teal-50 text-teal-600 hover:bg-teal-100";
  }
};

const getJobStatusColor = (status: Job["status"]) => {
  switch (status) {
    case "active":
      return "bg-green-50 text-green-600 hover:bg-green-100";
    case "draft":
      return "bg-gray-50 text-gray-600 hover:bg-gray-100";
    case "closed":
      return "bg-red-50 text-red-600 hover:bg-red-100";
    case "on-hold":
      return "bg-amber-50 text-amber-600 hover:bg-amber-100";
  }
};

// Mock data for demonstration (will be replaced with API data)
const mockJobs: Job[] = [
  {
    id: "1",
    title: "Senior Frontend Developer",
    department: "Engineering",
    location: "New York, NY (Remote)",
    type: "full-time",
    status: "active",
    applicants: 42,
    postedDate: "Posted 3 days ago",
    description: "We're looking for a Senior Frontend Developer to join our engineering team. The ideal candidate will have extensive experience with React, TypeScript, and modern frontend development practices.",
    requirements: [
      "5+ years of frontend development experience",
      "Strong proficiency with React and TypeScript",
      "Experience with state management libraries",
      "Familiarity with responsive design principles"
    ],
    responsibilities: [
      "Develop new user-facing features using React",
      "Build reusable components for future use",
      "Optimize applications for maximum speed and scalability",
      "Collaborate with backend developers on API integration"
    ],
    salary: {
      min: 100000,
      max: 150000,
      currency: "USD"
    }
  },
  {
    id: "2",
    title: "UX/UI Designer",
    department: "Design",
    location: "San Francisco, CA (Hybrid)",
    type: "full-time",
    status: "active",
    applicants: 28,
    postedDate: "Posted 1 week ago"
  },
  {
    id: "3",
    title: "DevOps Engineer",
    department: "Infrastructure",
    location: "Remote",
    type: "full-time",
    status: "active",
    applicants: 18,
    postedDate: "Posted 2 weeks ago"
  },
  {
    id: "4",
    title: "Product Manager",
    department: "Product",
    location: "Chicago, IL (On-site)",
    type: "full-time",
    status: "closed",
    applicants: 32,
    postedDate: "Posted 1 month ago"
  },
  {
    id: "5",
    title: "Marketing Specialist",
    department: "Marketing",
    location: "Remote",
    type: "full-time",
    status: "draft",
    applicants: 0,
    postedDate: "Draft"
  },
  {
    id: "6",
    title: "Data Scientist",
    department: "Data",
    location: "Austin, TX (Hybrid)",
    type: "full-time",
    status: "on-hold",
    applicants: 15,
    postedDate: "Posted 2 weeks ago"
  },
  {
    id: "7",
    title: "Customer Support Representative",
    department: "Support",
    location: "Remote",
    type: "part-time",
    status: "active",
    applicants: 24,
    postedDate: "Posted 3 days ago"
  },
  {
    id: "8",
    title: "HR Coordinator",
    department: "Human Resources",
    location: "Denver, CO (On-site)",
    type: "full-time",
    status: "active",
    applicants: 9,
    postedDate: "Posted 5 days ago"
  }
];

const JobsPage = () => {
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState("");
  const [createDialogOpen, setCreateDialogOpen] = useState(false);
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  const [detailsDialogOpen, setDetailsDialogOpen] = useState(false);

  const {
    data: jobs = mockJobs,
    isLoading,
    error,
    refetch
  } = useQuery({
    queryKey: ['jobs'],
    queryFn: jobsApi.getAll,
    // Use mock data for now, but in production, remove the placeholderData
    placeholderData: mockJobs,
    // In production, enable the query
    enabled: false, // Set to true when API is ready
  });

  // Filter jobs based on search query
  const filteredJobs = jobs.filter((job) => 
    job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    job.department.toLowerCase().includes(searchQuery.toLowerCase()) ||
    job.location.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const handleCreateJob = () => {
    setCreateDialogOpen(true);
  };

  const handleViewDetails = (job: Job) => {
    setSelectedJob(job);
    setDetailsDialogOpen(true);
  };

  const handleShareJob = (jobId: string) => {
    // Copy job URL to clipboard
    const jobUrl = `${window.location.origin}/jobs/${jobId}`;
    navigator.clipboard.writeText(jobUrl);
    toast({
      title: "URL Copied!",
      description: "Job URL has been copied to clipboard.",
    });
  };

  if (error) {
    toast({
      title: "Error",
      description: "Failed to load jobs. Please try again.",
      variant: "destructive",
    });
  }

  return (
    <Layout title="Job Listings">
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search jobs..."
              className="pl-10"
              value={searchQuery}
              onChange={handleSearch}
            />
          </div>
          <div className="flex items-center gap-4">
            <Button variant="outline" className="gap-1">
              <Filter className="h-4 w-4" />
              Filter
            </Button>
            <Button 
              className="gap-1 bg-ats-600 hover:bg-ats-700"
              onClick={handleCreateJob}
            >
              <Plus className="h-4 w-4" />
              Create Job
            </Button>
          </div>
        </div>
        
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map((placeholder) => (
              <Card key={placeholder} className="animate-pulse">
                <CardHeader className="h-32 bg-gray-100"></CardHeader>
                <CardContent className="h-10 mt-4 bg-gray-100"></CardContent>
                <CardFooter className="h-10 mt-2 bg-gray-100"></CardFooter>
              </Card>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredJobs.length === 0 ? (
              <div className="col-span-full text-center py-10">
                <p className="text-muted-foreground">No jobs found matching your search.</p>
              </div>
            ) : (
              filteredJobs.map((job) => (
                <Card key={job.id}>
                  <CardHeader className="pb-2">
                    <div className="flex items-center justify-between">
                      <Badge variant="secondary" className={cn(getJobStatusColor(job.status))}>
                        {job.status.charAt(0).toUpperCase() + job.status.slice(1)}
                      </Badge>
                      <Badge variant="secondary" className={cn(getJobTypeColor(job.type))}>
                        {job.type.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
                      </Badge>
                    </div>
                    <CardTitle className="mt-2 text-lg">{job.title}</CardTitle>
                    <CardDescription>{job.department} • {job.location}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">
                      {job.applicants} {job.applicants === 1 ? 'applicant' : 'applicants'} • {job.postedDate}
                    </p>
                  </CardContent>
                  <CardFooter className="flex justify-between">
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => handleViewDetails(job)}
                    >
                      View Details
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => handleShareJob(job.id)}
                    >
                      Share
                    </Button>
                  </CardFooter>
                </Card>
              ))
            )}
          </div>
        )}
      </div>
      
      {/* Create Job Dialog */}
      <CreateJobForm 
        open={createDialogOpen} 
        onOpenChange={setCreateDialogOpen} 
      />
      
      {/* Job Details Dialog */}
      {selectedJob && (
        <JobDetails
          job={selectedJob}
          open={detailsDialogOpen}
          onOpenChange={setDetailsDialogOpen}
          onEdit={() => {
            // Implement edit functionality later
            toast({
              title: "Edit mode",
              description: "Job editing functionality will be implemented in the next phase.",
            });
          }}
        />
      )}
    </Layout>
  );
};

export default JobsPage;
