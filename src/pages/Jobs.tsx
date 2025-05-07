
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Plus, Filter } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface Job {
  id: string;
  title: string;
  department: string;
  location: string;
  type: "full-time" | "part-time" | "contract" | "remote";
  status: "draft" | "active" | "closed" | "on-hold";
  applicants: number;
  postedDate: string;
}

const jobs: Job[] = [
  {
    id: "1",
    title: "Senior Frontend Developer",
    department: "Engineering",
    location: "New York, NY (Remote)",
    type: "full-time",
    status: "active",
    applicants: 42,
    postedDate: "Posted 3 days ago"
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

const JobsPage = () => {
  return (
    <Layout title="Job Listings">
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search jobs..."
              className="pl-10"
            />
          </div>
          <div className="flex items-center gap-4">
            <Button variant="outline" className="gap-1">
              <Filter className="h-4 w-4" />
              Filter
            </Button>
            <Button className="gap-1 bg-ats-600 hover:bg-ats-700">
              <Plus className="h-4 w-4" />
              Create Job
            </Button>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {jobs.map((job) => (
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
                <Button variant="outline" size="sm">View Details</Button>
                <Button variant="outline" size="sm">Share</Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default JobsPage;
