
export interface Job {
  id: string;
  title: string;
  department: string;
  location: string;
  type: "full-time" | "part-time" | "contract" | "remote";
  status: "draft" | "active" | "closed" | "on-hold";
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
}

export interface Candidate {
  id: string;
  name: string;
  email: string;
  position: string;
  status: "new" | "reviewing" | "interview" | "offer" | "rejected";
  date: string;
  initials: string;
  resume?: string;
  phone?: string;
  experience?: number;
  education?: string[];
  applicationStage?: ApplicationStage;
  jobId?: string;
}

export interface Interview {
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
  notes?: string;
  status?: "scheduled" | "completed" | "cancelled";
}

// New types for RBAC and application stages

export interface User {
  id: string;
  name: string;
  email: string;
  role: Role;
  avatar?: string;
  department?: string;
}

export type Role = "admin" | "recruiter" | "hiring_manager" | "viewer";

export interface Permission {
  action: "create" | "read" | "update" | "delete";
  subject: "candidates" | "jobs" | "interviews" | "users" | "settings";
}

export interface RolePermissions {
  [role: string]: Permission[];
}

export interface ApplicationStage {
  id: string;
  name: string;
  order: number;
  color: string;
  description?: string;
}

// Predefined application stages
export const APPLICATION_STAGES: ApplicationStage[] = [
  {
    id: "application_received",
    name: "Application Received",
    order: 1,
    color: "bg-blue-500",
    description: "Initial application has been received and logged in the system"
  },
  {
    id: "resume_screening",
    name: "Resume Screening",
    order: 2,
    color: "bg-indigo-500",
    description: "Candidate's resume is being reviewed by the recruitment team"
  },
  {
    id: "phone_screening",
    name: "Phone Screening",
    order: 3,
    color: "bg-purple-500",
    description: "Initial phone call to assess candidate's qualifications and interest"
  },
  {
    id: "technical_assessment",
    name: "Technical Assessment",
    order: 4,
    color: "bg-amber-500",
    description: "Technical skills evaluation through test or assignment"
  },
  {
    id: "first_interview",
    name: "First Interview",
    order: 5,
    color: "bg-orange-500",
    description: "First formal interview with the hiring team"
  },
  {
    id: "second_interview",
    name: "Second Interview",
    order: 6,
    color: "bg-pink-500",
    description: "Follow-up interview with additional team members or leadership"
  },
  {
    id: "reference_check",
    name: "Reference Check",
    order: 7,
    color: "bg-teal-500",
    description: "Verification of references provided by the candidate"
  },
  {
    id: "offer_preparation",
    name: "Offer Preparation",
    order: 8,
    color: "bg-cyan-500",
    description: "Preparing compensation package and formal job offer"
  },
  {
    id: "offer_extended",
    name: "Offer Extended",
    order: 9,
    color: "bg-green-500",
    description: "Job offer has been extended to the candidate"
  },
  {
    id: "hired",
    name: "Hired",
    order: 10,
    color: "bg-emerald-500",
    description: "Candidate has accepted the offer and completed onboarding"
  },
  {
    id: "rejected",
    name: "Rejected",
    order: 11,
    color: "bg-red-500",
    description: "Candidate is not moving forward in the process"
  }
];
