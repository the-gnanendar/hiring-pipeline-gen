
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Brain, CheckCircle, Clock, AlertCircle, Eye, Play } from "lucide-react";

export function AIScreeningDashboard() {
  const screeningQueue = [
    {
      id: "1",
      name: "Sarah Johnson",
      position: "Senior Frontend Developer",
      aiScore: 92,
      status: "completed",
      skills: ["React", "TypeScript", "Node.js"],
      experience: "5+ years",
      education: "BS Computer Science",
      timeToProcess: "2.3 mins"
    },
    {
      id: "2", 
      name: "Michael Chen",
      position: "Product Manager",
      aiScore: 87,
      status: "in-progress",
      skills: ["Product Strategy", "Analytics", "Agile"],
      experience: "7+ years",
      education: "MBA",
      timeToProcess: "1.8 mins"
    },
    {
      id: "3",
      name: "Emily Rodriguez",
      position: "UX Designer",
      aiScore: 78,
      status: "pending",
      skills: ["Figma", "User Research", "Prototyping"],
      experience: "3+ years", 
      education: "BA Design",
      timeToProcess: "pending"
    }
  ];

  const getScoreColor = (score: number) => {
    if (score >= 90) return "bg-green-500";
    if (score >= 80) return "bg-blue-500";
    if (score >= 70) return "bg-yellow-500";
    return "bg-red-500";
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed": return <CheckCircle className="h-4 w-4 text-green-600" />;
      case "in-progress": return <Clock className="h-4 w-4 text-blue-600" />;
      case "pending": return <AlertCircle className="h-4 w-4 text-yellow-600" />;
      default: return null;
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Brain className="h-5 w-5 text-purple-600" />
          AI Screening Dashboard
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <div className="text-2xl font-bold text-green-600">847</div>
              <div className="text-sm text-muted-foreground">Screened Today</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-blue-600">156</div>
              <div className="text-sm text-muted-foreground">High Matches</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-purple-600">2.1 min</div>
              <div className="text-sm text-muted-foreground">Avg Processing</div>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold">Screening Queue</h3>
              <Button size="sm" className="bg-purple-600 hover:bg-purple-700">
                <Play className="h-4 w-4 mr-2" />
                Process All
              </Button>
            </div>
            
            {screeningQueue.map((candidate) => (
              <div key={candidate.id} className="border rounded-lg p-4 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    {getStatusIcon(candidate.status)}
                    <div>
                      <div className="font-medium">{candidate.name}</div>
                      <div className="text-sm text-muted-foreground">{candidate.position}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="text-right">
                      <div className="text-sm font-medium">AI Score</div>
                      <div className="flex items-center gap-2">
                        <Progress value={candidate.aiScore} className="w-16 h-2" />
                        <span className="text-sm font-bold">{candidate.aiScore}%</span>
                      </div>
                    </div>
                    <Button size="sm" variant="outline">
                      <Eye className="h-4 w-4 mr-2" />
                      Review
                    </Button>
                  </div>
                </div>
                
                <div className="grid grid-cols-4 gap-4 text-sm">
                  <div>
                    <span className="text-muted-foreground">Skills:</span>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {candidate.skills.slice(0, 2).map((skill) => (
                        <Badge key={skill} variant="secondary" className="text-xs">
                          {skill}
                        </Badge>
                      ))}
                      {candidate.skills.length > 2 && (
                        <Badge variant="outline" className="text-xs">
                          +{candidate.skills.length - 2}
                        </Badge>
                      )}
                    </div>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Experience:</span>
                    <div className="font-medium">{candidate.experience}</div>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Education:</span>
                    <div className="font-medium">{candidate.education}</div>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Processing:</span>
                    <div className="font-medium">{candidate.timeToProcess}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
