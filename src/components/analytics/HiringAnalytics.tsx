
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from "recharts";
import { TrendingUp, Users, Clock, DollarSign } from "lucide-react";

export function HiringAnalytics() {
  const monthlyHires = [
    { month: "Jan", hires: 45, applications: 890 },
    { month: "Feb", hires: 52, applications: 1120 },
    { month: "Mar", hires: 38, applications: 980 },
    { month: "Apr", hires: 61, applications: 1340 },
    { month: "May", hires: 47, applications: 1150 },
    { month: "Jun", hires: 58, applications: 1280 }
  ];

  const sourceEffectiveness = [
    { source: "LinkedIn", candidates: 2341, hired: 89, rate: 3.8 },
    { source: "Indeed", candidates: 1876, hired: 45, rate: 2.4 },
    { source: "Company Site", candidates: 987, hired: 67, rate: 6.8 },
    { source: "Referrals", candidates: 543, hired: 78, rate: 14.4 },
    { source: "Glassdoor", candidates: 765, hired: 23, rate: 3.0 }
  ];

  const departmentData = [
    { department: "Engineering", value: 45, color: "#8884d8" },
    { department: "Sales", value: 28, color: "#82ca9d" },
    { department: "Marketing", value: 18, color: "#ffc658" },
    { department: "Support", value: 12, color: "#ff7300" },
    { department: "HR", value: 8, color: "#00ff00" }
  ];

  const timeToHire = [
    { week: "W1", days: 22 },
    { week: "W2", days: 19 },
    { week: "W3", days: 25 },
    { week: "W4", days: 18 },
    { week: "W5", days: 21 },
    { week: "W6", days: 16 }
  ];

  return (
    <div className="space-y-6">
      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5" />
              Monthly Hiring Trends
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={monthlyHires}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="applications" fill="#e2e8f0" name="Applications" />
                <Bar dataKey="hires" fill="#3b82f6" name="Hires" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="h-5 w-5" />
              Time to Hire Trend
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={timeToHire}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="week" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="days" stroke="#10b981" strokeWidth={3} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Source Effectiveness</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {sourceEffectiveness.map((source) => (
                <div key={source.source} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="font-medium">{source.source}</div>
                    <Badge variant="outline">{source.candidates} candidates</Badge>
                  </div>
                  <div className="text-right">
                    <div className="font-semibold">{source.hired} hired</div>
                    <div className="text-sm text-muted-foreground">{source.rate}% rate</div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Hires by Department</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie
                  data={departmentData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {departmentData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
            <div className="grid grid-cols-2 gap-2 mt-4">
              {departmentData.map((dept) => (
                <div key={dept.department} className="flex items-center gap-2">
                  <div 
                    className="w-3 h-3 rounded-full" 
                    style={{ backgroundColor: dept.color }}
                  />
                  <span className="text-sm">{dept.department}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
