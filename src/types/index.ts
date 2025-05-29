// Types for the entire application

// Dynamic Role System - roles can be created/deleted by admin
export interface Role {
  id: string;
  name: string;
  description?: string;
  level: number; // For hierarchy (1 = lowest, higher numbers = more access)
  permissions: Permission[];
  createdAt: string;
  updatedAt: string;
  isSystemRole?: boolean; // Prevents deletion of core system roles
}

// Permission Types
export type ActionType = 'create' | 'read' | 'update' | 'delete';
export type SubjectType = 'users' | 'roles' | 'candidates' | 'jobs' | 'interviews' | 'reports' | 'pipeline_levels' | 'settings' | 'recruitment';

export interface Permission {
  action: ActionType;
  subject: SubjectType;
}

// User Type - now references role by ID
export interface User {
  id: string;
  name: string;
  email: string;
  roleId: string; // References Role.id instead of hardcoded role string
  department?: string;
  avatar?: string;
  managerId?: string; // For hierarchical structure
  teamMembers?: string[]; // IDs of users this person manages
  createdAt: string;
  updatedAt: string;
}

// Job Type
export interface Job {
  id: string;
  title: string;
  department: string;
  location: string;
  type: 'full-time' | 'part-time' | 'contract' | 'internship' | 'remote';
  status: 'draft' | 'active' | 'paused' | 'closed' | 'on-hold';
  applicants: number;
  postedDate: string;
  description?: string;
  requirements?: string[];
  responsibilities?: string[];
  salary?: {
    min: number;
    max: number;
    currency: string;
  };
  pipelineLevels?: PipelineLevel[];
}

// Pipeline Level Type
export interface PipelineLevel {
  id: string;
  name: string;
  description?: string;
  order: number;
  jobId: string;
  assignedUsers?: string[];
}

// Workflow Stage
export interface WorkflowStage {
  id: string;
  name: string;
  description?: string;
  color: string;
  order: number;
}

// Default Workflow Stages
export const DEFAULT_WORKFLOW_STAGES: WorkflowStage[] = [
  {
    id: 'sourcing',
    name: 'Sourcing',
    description: 'Finding and attracting candidates',
    color: 'bg-blue-500',
    order: 1
  },
  {
    id: 'screening',
    name: 'Screening',
    description: 'Initial evaluation of candidates',
    color: 'bg-purple-500',
    order: 2
  },
  {
    id: 'interviewing',
    name: 'Interviewing',
    description: 'Conducting interviews with candidates',
    color: 'bg-orange-500',
    order: 3
  },
  {
    id: 'evaluation',
    name: 'Evaluation',
    description: 'Evaluating candidates after interviews',
    color: 'bg-yellow-500',
    order: 4
  },
  {
    id: 'offer',
    name: 'Offer',
    description: 'Extending job offers to candidates',
    color: 'bg-green-500',
    order: 5
  },
  {
    id: 'onboarding',
    name: 'Onboarding',
    description: 'Onboarding new hires',
    color: 'bg-teal-500',
    order: 6
  }
];

// Candidate Application Stage
export interface ApplicationStage {
  id: string;
  name: string;
  description?: string;
  color: string;
  order: number;
}

// Default Application Stages
export const APPLICATION_STAGES: ApplicationStage[] = [
  {
    id: 'new',
    name: 'New',
    description: 'Candidate has just applied',
    color: 'blue',
    order: 1
  },
  {
    id: 'screening',
    name: 'Resume Screening',
    description: 'Resume being reviewed',
    color: 'purple',
    order: 2
  },
  {
    id: 'phone_screen',
    name: 'Phone Screen',
    description: 'Initial phone screening',
    color: 'orange',
    order: 3
  },
  {
    id: 'assessment',
    name: 'Assessment',
    description: 'Technical or skill assessment',
    color: 'yellow',
    order: 4
  },
  {
    id: 'interview',
    name: 'First Interview',
    description: 'First round interview',
    color: 'green',
    order: 5
  },
  {
    id: 'second_interview',
    name: 'Second Interview',
    description: 'Second round interview',
    color: 'cyan',
    order: 6
  },
  {
    id: 'final_interview',
    name: 'Final Interview',
    description: 'Final interview round',
    color: 'indigo',
    order: 7
  },
  {
    id: 'offer',
    name: 'Offer',
    description: 'Offer extended',
    color: 'pink',
    order: 8
  },
  {
    id: 'hired',
    name: 'Hired',
    description: 'Candidate accepted offer',
    color: 'green',
    order: 9
  },
  {
    id: 'rejected',
    name: 'Rejected',
    description: 'Candidate was rejected',
    color: 'red',
    order: 10
  }
];

// Candidate Experience
export interface CandidateExperience {
  id: string;
  company: string;
  position: string;
  startDate: string;
  endDate?: string;
  current?: boolean;
  description?: string;
}

// Candidate Skill Rating
export interface SkillRating {
  id: string;
  skill: string;
  rating: number; // 1-5
}

// Interview Feedback
export interface InterviewFeedback {
  id: string;
  interviewerId: string;
  interviewerName: string;
  candidateId: string;
  jobId: string;
  pipelineLevelId: string;
  date: string;
  overallRating: number; // 1-5
  strengths: string;
  weaknesses: string;
  notes: string;
  recommendation: 'strong_yes' | 'yes' | 'neutral' | 'no' | 'strong_no';
  skillRatings?: SkillRating[];
}

// Candidate Type
export interface Candidate {
  id: string;
  name: string;
  email: string;
  phone?: string;
  position: string;
  status: 'new' | 'screening' | 'interview' | 'offer' | 'hired' | 'rejected' | 'reviewing';
  date: string;
  initials: string;
  resumeUrl?: string;
  applicationStage?: ApplicationStage;
  jobId?: string;
  experiences?: CandidateExperience[];
  skills?: SkillRating[];
  feedback?: InterviewFeedback[];
  overallRating?: number; // 1-5, averaged from feedback
  education?: string[];
  resume?: string;
}

// Interviewer Type
export interface Interviewer {
  name: string;
  initials: string;
}

// Interview Type
export interface Interview {
  id: string;
  candidateId: string;
  candidateName: string;
  jobId: string;
  jobTitle: string;
  interviewerId: string;
  interviewerName: string;
  date: string;
  startTime: string;
  endTime: string;
  location: string;
  type: 'in-person' | 'phone' | 'video' | 'technical' | 'culture' | 'screening' | 'final';
  status: 'scheduled' | 'completed' | 'cancelled';
  notes?: string;
  feedback?: InterviewFeedback;
  time?: string;
  candidate?: {
    name: string;
    position: string;
    initials: string;
  };
  interviewers?: Interviewer[];
}

// Workflow step
export interface WorkflowStep {
  id: string;
  name: string;
  count: number;
  percentage: number;
  color: string;
}

// Recruitment workflow 
export interface RecruitmentWorkflow {
  jobId: string;
  jobTitle: string;
  totalCandidates: number;
  steps: WorkflowStep[];
}

// API Key Settings
export interface ApiKeySettings {
  jobPortalApiKey?: string;
  aiApiKey?: string;
  zoomApiKey?: string;
  teamsApiKey?: string;
  googleMeetApiKey?: string;
  emailNotificationApiKey?: string;
  smsNotificationApiKey?: string;
}

// Helper function to check if user role level can access target role level
export const canAccessRoleLevel = (userRoleLevel: number, targetRoleLevel: number): boolean => {
  return userRoleLevel >= targetRoleLevel;
};

// Helper function to check if user has specific permission
export const hasPermission = (userPermissions: Permission[], action: ActionType, subject: SubjectType): boolean => {
  return userPermissions.some(permission => 
    permission.action === action && permission.subject === subject
  );
};
