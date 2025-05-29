
import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { User, Permission, Role, ActionType, SubjectType, canAccessRoleLevel, hasPermission as checkPermission } from '@/types';

// Default system roles that come with the application
const defaultRoles: Role[] = [
  {
    id: 'role-1',
    name: 'Manager',
    description: 'Full system access and management capabilities',
    level: 4,
    isSystemRole: true,
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z',
    permissions: [
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
      { action: 'create', subject: 'roles' },
      { action: 'read', subject: 'roles' },
      { action: 'update', subject: 'roles' },
      { action: 'delete', subject: 'roles' },
      { action: 'read', subject: 'settings' },
      { action: 'update', subject: 'settings' },
      { action: 'read', subject: 'reports' },
    ],
  },
  {
    id: 'role-2',
    name: 'Associate Manager',
    description: 'Advanced management with limited admin access',
    level: 3,
    isSystemRole: true,
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z',
    permissions: [
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
  },
  {
    id: 'role-3',
    name: 'Hiring Manager',
    description: 'Can manage hiring process and review candidates',
    level: 2,
    isSystemRole: true,
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z',
    permissions: [
      { action: 'read', subject: 'candidates' },
      { action: 'update', subject: 'candidates' },
      { action: 'read', subject: 'jobs' },
      { action: 'create', subject: 'interviews' },
      { action: 'read', subject: 'interviews' },
      { action: 'update', subject: 'interviews' },
      { action: 'read', subject: 'users' },
      { action: 'read', subject: 'reports' },
    ],
  },
  {
    id: 'role-4',
    name: 'Recruiter',
    description: 'Can manage candidates and basic recruitment tasks',
    level: 1,
    isSystemRole: true,
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z',
    permissions: [
      { action: 'create', subject: 'candidates' },
      { action: 'read', subject: 'candidates' },
      { action: 'update', subject: 'candidates' },
      { action: 'read', subject: 'jobs' },
      { action: 'create', subject: 'interviews' },
      { action: 'read', subject: 'interviews' },
      { action: 'update', subject: 'interviews' },
      { action: 'read', subject: 'users' },
    ],
  },
];

// Mock users with role IDs
const mockUsers: User[] = [
  {
    id: '1',
    name: 'System Manager',
    email: 'manager@example.com',
    roleId: 'role-1',
    avatar: 'SM',
    teamMembers: ['2', '3', '4', '5'],
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z',
  },
  {
    id: '2',
    name: 'Associate Manager',
    email: 'associate@example.com',
    roleId: 'role-2',
    avatar: 'AM',
    department: 'HR',
    managerId: '1',
    teamMembers: ['3', '4', '5'],
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z',
  },
  {
    id: '3',
    name: 'Hiring Manager',
    email: 'hiring@example.com',
    roleId: 'role-3',
    avatar: 'HM',
    department: 'Engineering',
    managerId: '2',
    teamMembers: ['4', '5'],
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z',
  },
  {
    id: '4',
    name: 'Recruiter One',
    email: 'recruiter1@example.com',
    roleId: 'role-4',
    avatar: 'R1',
    department: 'HR',
    managerId: '3',
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z',
  },
  {
    id: '5',
    name: 'Recruiter Two',
    email: 'recruiter2@example.com',
    roleId: 'role-4',
    avatar: 'R2',
    department: 'Engineering',
    managerId: '3',
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z',
  },
];

interface AuthContextType {
  currentUser: User | null;
  currentRole: Role | null;
  login: (email: string) => void;
  logout: () => void;
  hasPermission: (action: ActionType, subject: SubjectType) => boolean;
  users: User[];
  roles: Role[];
  isAuthenticated: boolean;
  getAccessibleUsers: () => User[];
  canAccessUser: (userId: string) => boolean;
  getUserRole: (roleId: string) => Role | undefined;
  createRole: (role: Omit<Role, 'id' | 'createdAt' | 'updatedAt'>) => void;
  updateRole: (roleId: string, updates: Partial<Role>) => void;
  deleteRole: (roleId: string) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [roles, setRoles] = useState<Role[]>(defaultRoles);

  // Check for saved user on component mount
  useEffect(() => {
    const savedUser = localStorage.getItem('currentUser');
    const savedRoles = localStorage.getItem('roles');
    
    if (savedUser) {
      setCurrentUser(JSON.parse(savedUser));
      setIsAuthenticated(true);
    }
    
    if (savedRoles) {
      setRoles(JSON.parse(savedRoles));
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

  const getCurrentRole = (): Role | null => {
    if (!currentUser) return null;
    return roles.find(role => role.id === currentUser.roleId) || null;
  };

  const currentRole = getCurrentRole();

  const hasPermission = (action: ActionType, subject: SubjectType): boolean => {
    if (!currentRole) return false;
    return checkPermission(currentRole.permissions, action, subject);
  };

  const getUserRole = (roleId: string): Role | undefined => {
    return roles.find(role => role.id === roleId);
  };

  // Get users that current user can access based on hierarchy
  const getAccessibleUsers = (): User[] => {
    if (!currentUser || !currentRole) return [];
    
    // Users with highest level role can see everyone
    const maxLevel = Math.max(...roles.map(r => r.level));
    if (currentRole.level === maxLevel) {
      return mockUsers;
    }
    
    // Users can see themselves, their team members, and users with lower or equal role levels
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
    
    // Filter by role level - can only see users with same or lower role level
    return mockUsers.filter(user => {
      if (!accessibleUserIds.has(user.id)) return false;
      
      const userRole = getUserRole(user.roleId);
      if (!userRole) return false;
      
      return canAccessRoleLevel(currentRole.level, userRole.level);
    });
  };

  // Check if current user can access specific user
  const canAccessUser = (userId: string): boolean => {
    if (!currentUser) return false;
    
    const accessibleUsers = getAccessibleUsers();
    return accessibleUsers.some(user => user.id === userId);
  };

  // Role management functions
  const createRole = (roleData: Omit<Role, 'id' | 'createdAt' | 'updatedAt'>) => {
    const newRole: Role = {
      ...roleData,
      id: `role-${Date.now()}`,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    
    const updatedRoles = [...roles, newRole];
    setRoles(updatedRoles);
    localStorage.setItem('roles', JSON.stringify(updatedRoles));
  };

  const updateRole = (roleId: string, updates: Partial<Role>) => {
    const updatedRoles = roles.map(role => 
      role.id === roleId 
        ? { ...role, ...updates, updatedAt: new Date().toISOString() }
        : role
    );
    
    setRoles(updatedRoles);
    localStorage.setItem('roles', JSON.stringify(updatedRoles));
  };

  const deleteRole = (roleId: string) => {
    // Prevent deletion of system roles
    const role = roles.find(r => r.id === roleId);
    if (role?.isSystemRole) {
      console.error('Cannot delete system role');
      return;
    }
    
    // Check if any users are assigned to this role
    const usersWithRole = mockUsers.filter(user => user.roleId === roleId);
    if (usersWithRole.length > 0) {
      console.error('Cannot delete role that is assigned to users');
      return;
    }
    
    const updatedRoles = roles.filter(role => role.id !== roleId);
    setRoles(updatedRoles);
    localStorage.setItem('roles', JSON.stringify(updatedRoles));
  };

  return (
    <AuthContext.Provider 
      value={{ 
        currentUser,
        currentRole,
        login, 
        logout, 
        hasPermission, 
        users: mockUsers,
        roles,
        isAuthenticated,
        getAccessibleUsers,
        canAccessUser,
        getUserRole,
        createRole,
        updateRole,
        deleteRole
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
