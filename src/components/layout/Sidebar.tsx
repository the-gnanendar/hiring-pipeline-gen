
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { 
  Calendar, 
  FileText, 
  FolderPlus, 
  User, 
  Users, 
  Shield, 
  BarChart3, 
  Workflow,
  Search,
  Brain,
  Target,
  Building
} from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

export function Sidebar() {
  const location = useLocation();
  const { hasPermission, profile } = useAuth();
  
  // Define navigation items
  const navigation = [
    { name: 'Dashboard', href: '/', icon: <BarChart3 className="h-5 w-5" /> },
    { name: 'Candidate Screening', href: '/screening', icon: <Search className="h-5 w-5" />, permission: { action: 'read', subject: 'candidates' } },
    { name: 'Candidates', href: '/candidates', icon: <Users className="h-5 w-5" />, permission: { action: 'read', subject: 'candidates' } },
    { name: 'Jobs', href: '/jobs', icon: <FolderPlus className="h-5 w-5" />, permission: { action: 'read', subject: 'jobs' } },
    { name: 'Interviews', href: '/interviews', icon: <Calendar className="h-5 w-5" />, permission: { action: 'read', subject: 'interviews' } },
    { name: 'Workflow', href: '/workflow', icon: <Workflow className="h-5 w-5" />, permission: { action: 'read', subject: 'jobs' } },
    { name: 'Reports', href: '/reports', icon: <FileText className="h-5 w-5" />, permission: { action: 'read', subject: 'reports' } },
  ];
  
  // Define user management navigation items
  const userManagementNav = [
    { name: 'User Management', href: '/users', icon: <User className="h-5 w-5" />, permission: { action: 'read', subject: 'users' } },
    { name: 'Role Management', href: '/roles', icon: <Shield className="h-5 w-5" />, role: 'admin' },
  ];
  
  return (
    <div className="flex h-full flex-col border-r bg-white">
      <div className="flex h-16 items-center px-6">
        <Link to="/" className="flex items-center gap-2 font-semibold">
          <Building className="h-6 w-6 text-ats-600" />
          <span className="text-lg font-semibold text-ats-800">Enterprise HRMS</span>
        </Link>
      </div>
      <nav className="flex-1 overflow-y-auto px-3 py-2">
        <ul className="space-y-1">
          {navigation.map((item) => {
            const isActive = location.pathname === item.href;
            const showItem = !item.permission || hasPermission(item.permission.action, item.permission.subject);
            
            if (!showItem) return null;
            
            return (
              <li key={item.name}>
                <Link
                  to={item.href}
                  className={cn(
                    "group flex items-center rounded-md px-3 py-2 text-sm font-medium",
                    isActive
                      ? "bg-ats-50 text-ats-700"
                      : "text-gray-700 hover:bg-ats-50 hover:text-ats-700"
                  )}
                >
                  <div className={cn("mr-3", isActive ? "text-ats-600" : "text-gray-400 group-hover:text-ats-600")}>
                    {item.icon}
                  </div>
                  {item.name}
                </Link>
              </li>
            );
          })}
        </ul>

        {/* User Management Section */}
        {userManagementNav.some(item => 
          (!item.permission || hasPermission(item.permission.action, item.permission.subject)) ||
          (item.role && profile?.role === item.role)
        ) && (
          <>
            <div className="my-3 px-3">
              <div className="border-t" />
              <h3 className="mt-3 text-xs font-semibold text-gray-500">ADMINISTRATION</h3>
            </div>
            <ul className="space-y-1">
              {userManagementNav.map((item) => {
                const isActive = location.pathname === item.href;
                const showItem = (!item.permission || hasPermission(item.permission.action, item.permission.subject)) ||
                                (item.role && profile?.role === item.role);
                
                if (!showItem) return null;
                
                return (
                  <li key={item.name}>
                    <Link
                      to={item.href}
                      className={cn(
                        "group flex items-center rounded-md px-3 py-2 text-sm font-medium",
                        isActive
                          ? "bg-ats-50 text-ats-700"
                          : "text-gray-700 hover:bg-ats-50 hover:text-ats-700"
                      )}
                    >
                      <div className={cn("mr-3", isActive ? "text-ats-600" : "text-gray-400 group-hover:text-ats-600")}>
                        {item.icon}
                      </div>
                      {item.name}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </>
        )}
      </nav>
    </div>
  );
}
