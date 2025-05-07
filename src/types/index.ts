
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
