
import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { User, Permission, Role, RolePermissions, canAccessRole, ROLE_HIERARCHY } from '@/types';

// Define role permissions - hierarchical structure
const rolePermissions: RolePermissions = {
  manage: [
    { action: 'create', subject: 'candidates' },
    { action: 'read', subject: 'candidates' },
    { action: 'update', subject: 'candidates' },
    { action: 'delete', subject: 'candidates' },
    { action: 'create', subject: 'jobs' },
    { action: 'read', subject: 'jobs' },
    { action: 'update', subject: 'jobs' },
    { action: 'delete', subject: 'jobs' },
    { action: 'create', subject: 'interviews' },
    { action: 'read', subject: 'interviews' },
    { action: 'update', subject: 'interviews' },
    { action: 'delete', subject: 'interviews' },
    { action: 'create', subject: 'users' },
    { action: 'read', subject: 'users' },
    { action: 'update', subject: 'users' },
    { action: 'delete', subject: 'users' },
    { action: 'read', subject: 'settings' },
    { action: 'update', subject: 'settings' },
    { action: 'read', subject: 'reports' },
  ],
  associate_manage: [
    { action: 'create', subject: 'candidates' },
    { action: 'read', subject: 'candidates' },
    { action: 'update', subject: 'candidates' },
    { action: 'delete', subject: 'candidates' },
    { action: 'create', subject: 'jobs' },
    { action: 'read', subject: 'jobs' },
    { action: 'update', subject: 'jobs' },
    { action: 'delete', subject: 'jobs' },
    { action: 'create', subject: 'interviews' },
    { action: 'read', subject: 'interviews' },
    { action: 'update', subject: 'interviews' },
    { action: 'delete', subject: 'interviews' },
    { action: 'read', subject: 'users' },
    { action: 'update', subject: 'users' },
    { action: 'read', subject: 'reports' },
  ],
  hiring_manager: [
    { action: 'read', subject: 'candidates' },
    { action: 'update', subject: 'candidates' },
    { action: 'read', subject: 'jobs' },
    { action: 'create', subject: 'interviews' },
    { action: 'read', subject: 'interviews' },
    { action: 'update', subject: 'interviews' },
    { action: 'read', subject: 'users' },
    { action: 'read', subject: 'reports' },
  ],
  recruiter: [
    { action: 'create', subject: 'candidates' },
    { action: 'read', subject: 'candidates' },
    { action: 'update', subject: 'candidates' },
    { action: 'read', subject: 'jobs' },
    { action: 'create', subject: 'interviews' },
    { action: 'read', subject: 'interviews' },
    { action: 'update', subject: 'interviews' },
    { action: 'read', subject: 'users' },
  ],
};

// Mock users with hierarchical structure
const mockUsers: User[] = [
  {
    id: '1',
    name: 'System Manager',
    email: 'manager@example.com',
    role: 'manage',
    avatar: 'SM',
    teamMembers: ['2', '3', '4', '5'],
  },
  {
    id: '2',
    name: 'Associate Manager',
    email: 'associate@example.com',
    role: 'associate_manage',
    avatar: 'AM',
    department: 'HR',
    managerId: '1',
    teamMembers: ['3', '4', '5'],
  },
  {
    id: '3',
    name: 'Hiring Manager',
    email: 'hiring@example.com',
    role: 'hiring_manager',
    avatar: 'HM',
    department: 'Engineering',
    managerId: '2',
    teamMembers: ['4', '5'],
  },
  {
    id: '4',
    name: 'Recruiter One',
    email: 'recruiter1@example.com',
    role: 'recruiter',
    avatar: 'R1',
    department: 'HR',
    managerId: '3',
  },
  {
    id: '5',
    name: 'Recruiter Two',
    email: 'recruiter2@example.com',
    role: 'recruiter',
    avatar: 'R2',
    department: 'Engineering',
    managerId: '3',
  },
];

interface AuthContextType {
  currentUser: User | null;
  login: (email: string) => void;
  logout: () => void;
  hasPermission: (action: Permission['action'], subject: Permission['subject']) => boolean;
  users: User[];
  isAuthenticated: boolean;
  rolePermissions: RolePermissions;
  getAccessibleUsers: () => User[];
  canAccessUser: (userId: string) => boolean;
  getHierarchicalPermissions: () => Permission[];
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Check for saved user on component mount
  useEffect(() => {
    const savedUser = localStorage.getItem('currentUser');
    if (savedUser) {
      setCurrentUser(JSON.parse(savedUser));
      setIsAuthenticated(true);
    }
  }, []);

  const login = (email: string) => {
    const user = mockUsers.find(u => u.email === email);
    if (user) {
      setCurrentUser(user);
      setIsAuthenticated(true);
      localStorage.setItem('currentUser', JSON.stringify(user));
    } else {
      console.error('User not found');
    }
  };

  const logout = () => {
    setCurrentUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem('currentUser');
  };

  // Get hierarchical permissions - user gets their permissions plus all lower role permissions
  const getHierarchicalPermissions = (): Permission[] => {
    if (!currentUser) return [];
    
    const allPermissions: Permission[] = [];
    const userRoleLevel = ROLE_HIERARCHY[currentUser.role];
    
    // Get permissions for current role and all roles below it
    Object.entries(ROLE_HIERARCHY).forEach(([role, level]) => {
      if (level <= userRoleLevel) {
        const permissions = rolePermissions[role] || [];
        permissions.forEach(permission => {
          // Avoid duplicates
          const exists = allPermissions.some(p => 
            p.action === permission.action && p.subject === permission.subject
          );
          if (!exists) {
            allPermissions.push(permission);
          }
        });
      }
    });
    
    return allPermissions;
  };

  const hasPermission = (action: Permission['action'], subject: Permission['subject']): boolean => {
    if (!currentUser) return false;
    
    const hierarchicalPermissions = getHierarchicalPermissions();
    return hierarchicalPermissions.some(permission => 
      permission.action === action && permission.subject === subject
    );
  };

  // Get users that current user can access based on hierarchy
  const getAccessibleUsers = (): User[] => {
    if (!currentUser) return [];
    
    // Manage role can see everyone
    if (currentUser.role === 'manage') {
      return mockUsers;
    }
    
    // Users can see themselves, their team members, and users they manage
    const accessibleUserIds = new Set([currentUser.id]);
    
    // Add team members if any
    if (currentUser.teamMembers) {
      currentUser.teamMembers.forEach(id => accessibleUserIds.add(id));
    }
    
    // Recursively add team members of team members
    const addTeamMembersRecursively = (userId: string) => {
      const user = mockUsers.find(u => u.id === userId);
      if (user?.teamMembers) {
        user.teamMembers.forEach(memberId => {
          if (!accessibleUserIds.has(memberId)) {
            accessibleUserIds.add(memberId);
            addTeamMembersRecursively(memberId);
          }
        });
      }
    };
    
    if (currentUser.teamMembers) {
      currentUser.teamMembers.forEach(memberId => {
        addTeamMembersRecursively(memberId);
      });
    }
    
    return mockUsers.filter(user => accessibleUserIds.has(user.id));
  };

  // Check if current user can access specific user
  const canAccessUser = (userId: string): boolean => {
    if (!currentUser) return false;
    
    const accessibleUsers = getAccessibleUsers();
    return accessibleUsers.some(user => user.id === userId);
  };

  return (
    <AuthContext.Provider 
      value={{ 
        currentUser, 
        login, 
        logout, 
        hasPermission, 
        users: mockUsers,
        isAuthenticated,
        rolePermissions,
        getAccessibleUsers,
        canAccessUser,
        getHierarchicalPermissions
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
