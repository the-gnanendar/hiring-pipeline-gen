
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  CheckCircle, 
  X, 
  Eye, 
  Brain, 
  Star, 
  MapPin, 
  Briefcase, 
  GraduationCap,
  Phone,
  Mail
} from "lucide-react";

interface CandidateScreeningCardProps {
  candidate: {
    id: string;
    name: string;
    email: string;
    phone?: string;
    position: string;
    location: string;
    experience: string;
    education: string;
    skills: string[];
    aiScore: number;
    matchReasons: string[];
    avatar?: string;
    salary_expectation?: string;
    availability?: string;
    resume_url?: string;
  };
  onApprove: (id: string) => void;
  onReject: (id: string) => void;
  onViewDetails: (id: string) => void;
}

export function CandidateScreeningCard({ 
  candidate, 
  onApprove, 
  onReject, 
  onViewDetails 
}: CandidateScreeningCardProps) {
  const getScoreColor = (score: number) => {
    if (score >= 90) return "text-green-600";
    if (score >= 80) return "text-blue-600";
    if (score >= 70) return "text-yellow-600";
    return "text-red-600";
  };

  const getScoreBg = (score: number) => {
    if (score >= 90) return "bg-green-50 border-green-200";
    if (score >= 80) return "bg-blue-50 border-blue-200";
    if (score >= 70) return "bg-yellow-50 border-yellow-200";
    return "bg-red-50 border-red-200";
  };

  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex items-start gap-3">
            <Avatar className="h-12 w-12">
              <AvatarImage src={candidate.avatar} />
              <AvatarFallback>
                {candidate.name.split(' ').map(n => n[0]).join('')}
              </AvatarFallback>
            </Avatar>
            <div>
              <CardTitle className="text-lg">{candidate.name}</CardTitle>
              <p className="text-muted-foreground font-medium">{candidate.position}</p>
              <div className="flex items-center gap-4 text-sm text-muted-foreground mt-1">
                <span className="flex items-center gap-1">
                  <MapPin className="h-3 w-3" />
                  {candidate.location}
                </span>
                <span className="flex items-center gap-1">
                  <Briefcase className="h-3 w-3" />
                  {candidate.experience}
                </span>
              </div>
            </div>
          </div>
          <div className={`px-3 py-2 rounded-lg border ${getScoreBg(candidate.aiScore)}`}>
            <div className="flex items-center gap-2">
              <Brain className="h-4 w-4" />
              <span className="text-xs font-medium">AI MATCH</span>
            </div>
            <div className={`text-2xl font-bold ${getScoreColor(candidate.aiScore)}`}>
              {candidate.aiScore}%
            </div>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-4">
        <div className="space-y-3">
          <div>
            <div className="text-sm font-medium mb-2">Contact Information</div>
            <div className="grid grid-cols-2 gap-3 text-sm">
              <div className="flex items-center gap-2">
                <Mail className="h-3 w-3 text-muted-foreground" />
                <span className="truncate">{candidate.email}</span>
              </div>
              {candidate.phone && (
                <div className="flex items-center gap-2">
                  <Phone className="h-3 w-3 text-muted-foreground" />
                  <span>{candidate.phone}</span>
                </div>
              )}
            </div>
          </div>

          <div>
            <div className="text-sm font-medium mb-2">Education</div>
            <div className="flex items-center gap-2 text-sm">
              <GraduationCap className="h-3 w-3 text-muted-foreground" />
              <span>{candidate.education}</span>
            </div>
          </div>

          <div>
            <div className="text-sm font-medium mb-2">Key Skills</div>
            <div className="flex flex-wrap gap-1">
              {candidate.skills.slice(0, 6).map((skill) => (
                <Badge key={skill} variant="secondary" className="text-xs">
                  {skill}
                </Badge>
              ))}
              {candidate.skills.length > 6 && (
                <Badge variant="outline" className="text-xs">
                  +{candidate.skills.length - 6} more
                </Badge>
              )}
            </div>
          </div>

          <div>
            <div className="text-sm font-medium mb-2">AI Match Reasons</div>
            <div className="space-y-1">
              {candidate.matchReasons.slice(0, 3).map((reason, index) => (
                <div key={index} className="flex items-center gap-2 text-sm">
                  <Star className="h-3 w-3 text-yellow-500" />
                  <span>{reason}</span>
                </div>
              ))}
            </div>
          </div>

          {(candidate.salary_expectation || candidate.availability) && (
            <div className="grid grid-cols-2 gap-4 text-sm">
              {candidate.salary_expectation && (
                <div>
                  <span className="text-muted-foreground">Salary:</span>
                  <div className="font-medium">{candidate.salary_expectation}</div>
                </div>
              )}
              {candidate.availability && (
                <div>
                  <span className="text-muted-foreground">Available:</span>
                  <div className="font-medium">{candidate.availability}</div>
                </div>
              )}
            </div>
          )}
        </div>

        <div className="flex gap-2 pt-2">
          <Button
            size="sm"
            className="flex-1 bg-green-600 hover:bg-green-700"
            onClick={() => onApprove(candidate.id)}
          >
            <CheckCircle className="h-4 w-4 mr-2" />
            Approve
          </Button>
          <Button
            size="sm"
            variant="outline"
            className="flex-1 border-red-200 text-red-600 hover:bg-red-50"
            onClick={() => onReject(candidate.id)}
          >
            <X className="h-4 w-4 mr-2" />
            Reject
          </Button>
          <Button
            size="sm"
            variant="outline"
            onClick={() => onViewDetails(candidate.id)}
          >
            <Eye className="h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
