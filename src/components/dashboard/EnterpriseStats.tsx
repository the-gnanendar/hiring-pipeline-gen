
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { TrendingUp, TrendingDown, Users, Calendar, FileText, Target, Clock, CheckCircle } from "lucide-react";

export function EnterpriseStats() {
  const stats = [
    {
      title: "Total Candidates",
      value: "12,847",
      change: "+18%",
      trend: "up",
      icon: <Users className="h-5 w-5" />,
      subtitle: "vs last quarter"
    },
    {
      title: "Active Positions",
      value: "156",
      change: "+12%",
      trend: "up", 
      icon: <FileText className="h-5 w-5" />,
      subtitle: "across departments"
    },
    {
      title: "Screening Pipeline",
      value: "2,341",
      change: "+8%",
      trend: "up",
      icon: <Target className="h-5 w-5" />,
      subtitle: "in progress"
    },
    {
      title: "Time to Hire",
      value: "18 days",
      change: "-6%", 
      trend: "up",
      icon: <Clock className="h-5 w-5" />,
      subtitle: "average"
    }
  ];

  const pipelineMetrics = [
    { stage: "Applications", count: 5420, percentage: 100 },
    { stage: "AI Screening", count: 3892, percentage: 72 },
    { stage: "Phone Screen", count: 1456, percentage: 27 },
    { stage: "Technical", count: 782, percentage: 14 },
    { stage: "Final", count: 298, percentage: 5 },
    { stage: "Offers", count: 156, percentage: 3 }
  ];

  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Card key={stat.title}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {stat.title}
              </CardTitle>
              <div className="text-muted-foreground">{stat.icon}</div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <div className="flex items-center space-x-2 text-xs text-muted-foreground">
                <Badge variant={stat.trend === "up" ? "default" : "secondary"} className="px-1">
                  {stat.trend === "up" ? (
                    <TrendingUp className="h-3 w-3 mr-1" />
                  ) : (
                    <TrendingDown className="h-3 w-3 mr-1" />
                  )}
                  {stat.change}
                </Badge>
                <span>{stat.subtitle}</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Target className="h-5 w-5" />
            Screening Pipeline Analytics
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {pipelineMetrics.map((metric) => (
              <div key={metric.stage} className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-24 text-sm font-medium">{metric.stage}</div>
                  <Progress value={metric.percentage} className="w-48" />
                  <span className="text-sm text-muted-foreground">{metric.percentage}%</span>
                </div>
                <div className="text-right">
                  <div className="font-semibold">{metric.count.toLocaleString()}</div>
                  <div className="text-xs text-muted-foreground">candidates</div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
