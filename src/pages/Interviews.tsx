
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Calendar as CalendarIcon, Plus, Search } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import { Calendar } from "@/components/ui/calendar";

interface Interview {
  id: string;
  candidate: {
    name: string;
    position: string;
    initials: string;
  };
  interviewers: {
    name: string;
    initials: string;
  }[];
  date: string;
  time: string;
  type: "technical" | "culture" | "screening" | "final";
}

const interviews: Interview[] = [
  {
    id: "1",
    candidate: {
      name: "Emma Davis",
      position: "Frontend Developer",
      initials: "ED"
    },
    interviewers: [
      { name: "John Smith", initials: "JS" },
      { name: "Alice Wong", initials: "AW" }
    ],
    date: "Today",
    time: "10:00 AM - 11:00 AM",
    type: "technical"
  },
  {
    id: "2",
    candidate: {
      name: "Michael Brown",
      position: "Product Manager",
      initials: "MB"
    },
    interviewers: [
      { name: "Sarah Johnson", initials: "SJ" }
    ],
    date: "Today",
    time: "2:00 PM - 3:00 PM",
    type: "culture"
  },
  {
    id: "3",
    candidate: {
      name: "Sophie Miller",
      position: "UX Designer",
      initials: "SM"
    },
    interviewers: [
      { name: "David Chen", initials: "DC" },
      { name: "Emma Wilson", initials: "EW" }
    ],
    date: "Tomorrow",
    time: "9:30 AM - 10:30 AM",
    type: "screening"
  },
  {
    id: "4",
    candidate: {
      name: "James Wilson",
      position: "Backend Developer",
      initials: "JW"
    },
    interviewers: [
      { name: "Robert Taylor", initials: "RT" },
      { name: "Jennifer Lee", initials: "JL" },
      { name: "Mark Garcia", initials: "MG" }
    ],
    date: "Tomorrow",
    time: "1:00 PM - 2:30 PM",
    type: "final"
  },
  {
    id: "5",
    candidate: {
      name: "Olivia Martinez",
      position: "Marketing Specialist",
      initials: "OM"
    },
    interviewers: [
      { name: "Thomas Wright", initials: "TW" }
    ],
    date: "Jun 10",
    time: "11:00 AM - 12:00 PM",
    type: "screening"
  }
];

const getInterviewTypeStyles = (type: Interview["type"]) => {
  switch (type) {
    case "technical":
      return "border-blue-200 bg-blue-50";
    case "culture":
      return "border-green-200 bg-green-50";
    case "screening":
      return "border-amber-200 bg-amber-50";
    case "final":
      return "border-purple-200 bg-purple-50";
  }
};

const InterviewsPage = () => {
  return (
    <Layout title="Interviews">
      <div className="flex flex-col lg:flex-row gap-6">
        <div className="lg:w-2/3 space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold">Upcoming Interviews</h2>
            <Button className="gap-1 bg-ats-600 hover:bg-ats-700">
              <Plus className="h-4 w-4" />
              Schedule Interview
            </Button>
          </div>
          
          <div className="space-y-4">
            {interviews.map((interview) => (
              <Card 
                key={interview.id}
                className={cn("border-l-4", getInterviewTypeStyles(interview.type))}
              >
                <CardHeader className="pb-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Avatar>
                        <AvatarFallback className="bg-ats-100 text-ats-800">
                          {interview.candidate.initials}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <CardTitle className="text-base">{interview.candidate.name}</CardTitle>
                        <CardDescription>{interview.candidate.position}</CardDescription>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-medium">{interview.date}</div>
                      <div className="text-sm text-muted-foreground">{interview.time}</div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-sm font-medium">Interviewers</div>
                      <div className="flex -space-x-2 mt-1">
                        {interview.interviewers.map((interviewer, index) => (
                          <Avatar key={index} className="border-2 border-white h-7 w-7">
                            <AvatarFallback className="text-xs">
                              {interviewer.initials}
                            </AvatarFallback>
                          </Avatar>
                        ))}
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">Details</Button>
                      <Button variant="outline" size="sm">Join Call</Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
        
        <div className="lg:w-1/3">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CalendarIcon className="h-5 w-5" />
                <span>Calendar</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Calendar mode="default" className="rounded-md border" />
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
};

export default InterviewsPage;
