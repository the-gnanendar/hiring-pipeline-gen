
import { useAuth } from '@/contexts/AuthContext';

interface RBACWrapperProps {
  children: React.ReactNode;
  requiredPermission?: {
    action: string;
    subject: string;
  };
  fallback?: React.ReactNode;
}

export function RBACWrapper({ 
  children, 
  requiredPermission, 
  fallback = null 
}: RBACWrapperProps) {
  const { hasPermission } = useAuth();

  if (!requiredPermission) {
    return <>{children}</>;
  }

  const hasAccess = hasPermission(requiredPermission.action, requiredPermission.subject);

  return hasAccess ? <>{children}</> : <>{fallback}</>;
}
