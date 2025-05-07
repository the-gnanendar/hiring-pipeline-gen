
import { Layout } from "@/components/layout/Layout";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Filter, Plus, Trash } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Checkbox } from "@/components/ui/checkbox";
import { cn } from "@/lib/utils";

interface Candidate {
  id: string;
  name: string;
  email: string;
  position: string;
  status: "new" | "reviewing" | "interview" | "offer" | "rejected";
  date: string;
  initials: string;
}

const candidates: Candidate[] = [
  {
    id: "1",
    name: "Alex Morgan",
    email: "alex.morgan@example.com",
    position: "Frontend Developer",
    status: "interview",
    date: "June 3, 2025",
    initials: "AM"
  },
  {
    id: "2",
    name: "Jordan Smith",
    email: "jordan.smith@example.com",
    position: "UX Designer",
    status: "new",
    date: "June 3, 2025",
    initials: "JS"
  },
  {
    id: "3",
    name: "Taylor Johnson",
    email: "taylor.johnson@example.com",
    position: "Product Manager",
    status: "reviewing",
    date: "June 2, 2025",
    initials: "TJ"
  },
  {
    id: "4",
    name: "Casey Wilson",
    email: "casey.wilson@example.com",
    position: "Backend Developer",
    status: "offer",
    date: "June 1, 2025",
    initials: "CW"
  },
  {
    id: "5",
    name: "Riley Parker",
    email: "riley.parker@example.com",
    position: "Marketing Specialist",
    status: "rejected",
    date: "May 31, 2025",
    initials: "RP"
  },
  {
    id: "6",
    name: "Jamie Lee",
    email: "jamie.lee@example.com",
    position: "Data Scientist",
    status: "new",
    date: "May 30, 2025",
    initials: "JL"
  },
  {
    id: "7",
    name: "Morgan Chen",
    email: "morgan.chen@example.com",
    position: "Full Stack Developer",
    status: "reviewing",
    date: "May 29, 2025",
    initials: "MC"
  },
  {
    id: "8",
    name: "Drew Garcia",
    email: "drew.garcia@example.com",
    position: "DevOps Engineer",
    status: "interview",
    date: "May 28, 2025",
    initials: "DG"
  }
];

const getStatusColor = (status: Candidate["status"]) => {
  switch (status) {
    case "new":
      return "bg-blue-50 text-blue-600 hover:bg-blue-100";
    case "reviewing":
      return "bg-amber-50 text-amber-600 hover:bg-amber-100";
    case "interview":
      return "bg-purple-50 text-purple-600 hover:bg-purple-100";
    case "offer":
      return "bg-green-50 text-green-600 hover:bg-green-100";
    case "rejected":
      return "bg-gray-50 text-gray-600 hover:bg-gray-100";
  }
};

const CandidatesPage = () => {
  return (
    <Layout title="Candidates">
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search candidates..."
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
              Add Candidate
            </Button>
          </div>
        </div>
        
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-12 p-0">
                  <div className="flex items-center justify-center">
                    <Checkbox />
                  </div>
                </TableHead>
                <TableHead>Name</TableHead>
                <TableHead className="hidden md:table-cell">Email</TableHead>
                <TableHead className="hidden sm:table-cell">Position</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="hidden md:table-cell">Applied Date</TableHead>
                <TableHead className="w-12"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {candidates.map((candidate) => (
                <TableRow key={candidate.id} className="hover:bg-muted/50">
                  <TableCell className="p-0">
                    <div className="flex items-center justify-center">
                      <Checkbox />
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Avatar className="h-8 w-8">
                        <AvatarFallback className="bg-ats-100 text-ats-800 text-xs">
                          {candidate.initials}
                        </AvatarFallback>
                      </Avatar>
                      <span className="font-medium">{candidate.name}</span>
                    </div>
                  </TableCell>
                  <TableCell className="hidden md:table-cell text-muted-foreground">
                    {candidate.email}
                  </TableCell>
                  <TableCell className="hidden sm:table-cell">
                    {candidate.position}
                  </TableCell>
                  <TableCell>
                    <Badge variant="secondary" className={cn(getStatusColor(candidate.status))}>
                      {candidate.status.charAt(0).toUpperCase() + candidate.status.slice(1)}
                    </Badge>
                  </TableCell>
                  <TableCell className="hidden md:table-cell text-muted-foreground">
                    {candidate.date}
                  </TableCell>
                  <TableCell>
                    <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-destructive">
                      <Trash className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </Layout>
  );
};

export default CandidatesPage;
