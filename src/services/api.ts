
import { Job, Candidate, Interview } from "@/types";

// Base API URL - replace with your actual Laravel API endpoint
export const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000/api';

// Helper function to handle API responses
const handleResponse = async (response: Response) => {
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'Something went wrong');
  }
  return response.json();
};

// Job-related API calls
export const jobsApi = {
  getAll: async (): Promise<Job[]> => {
    const response = await fetch(`${API_URL}/jobs`);
    return handleResponse(response);
  },
  
  getById: async (id: string): Promise<Job> => {
    const response = await fetch(`${API_URL}/jobs/${id}`);
    return handleResponse(response);
  },
  
  create: async (job: Omit<Job, 'id' | 'applicants' | 'postedDate'>): Promise<Job> => {
    const response = await fetch(`${API_URL}/jobs`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(job),
      credentials: 'include',
    });
    return handleResponse(response);
  },
  
  update: async (id: string, job: Partial<Job>): Promise<Job> => {
    const response = await fetch(`${API_URL}/jobs/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(job),
      credentials: 'include',
    });
    return handleResponse(response);
  },
  
  delete: async (id: string): Promise<void> => {
    const response = await fetch(`${API_URL}/jobs/${id}`, {
      method: 'DELETE',
      credentials: 'include',
    });
    return handleResponse(response);
  },
  
  searchJobs: async (query: string): Promise<Job[]> => {
    const response = await fetch(`${API_URL}/jobs/search?q=${encodeURIComponent(query)}`);
    return handleResponse(response);
  },
};

// Candidate-related API calls
export const candidatesApi = {
  getAll: async (): Promise<Candidate[]> => {
    const response = await fetch(`${API_URL}/candidates`);
    return handleResponse(response);
  },
  
  getById: async (id: string): Promise<Candidate> => {
    const response = await fetch(`${API_URL}/candidates/${id}`);
    return handleResponse(response);
  },
  
  create: async (candidate: Omit<Candidate, 'id'>): Promise<Candidate> => {
    const response = await fetch(`${API_URL}/candidates`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(candidate),
      credentials: 'include',
    });
    return handleResponse(response);
  },
  
  update: async (id: string, candidate: Partial<Candidate>): Promise<Candidate> => {
    const response = await fetch(`${API_URL}/candidates/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(candidate),
      credentials: 'include',
    });
    return handleResponse(response);
  },
  
  delete: async (id: string): Promise<void> => {
    const response = await fetch(`${API_URL}/candidates/${id}`, {
      method: 'DELETE',
      credentials: 'include',
    });
    return handleResponse(response);
  },
};

// Interview-related API calls
export const interviewsApi = {
  getAll: async (): Promise<Interview[]> => {
    const response = await fetch(`${API_URL}/interviews`);
    return handleResponse(response);
  },
  
  getById: async (id: string): Promise<Interview> => {
    const response = await fetch(`${API_URL}/interviews/${id}`);
    return handleResponse(response);
  },
  
  create: async (interview: Omit<Interview, 'id'>): Promise<Interview> => {
    const response = await fetch(`${API_URL}/interviews`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(interview),
      credentials: 'include',
    });
    return handleResponse(response);
  },
  
  update: async (id: string, interview: Partial<Interview>): Promise<Interview> => {
    const response = await fetch(`${API_URL}/interviews/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(interview),
      credentials: 'include',
    });
    return handleResponse(response);
  },
  
  delete: async (id: string): Promise<void> => {
    const response = await fetch(`${API_URL}/interviews/${id}`, {
      method: 'DELETE',
      credentials: 'include',
    });
    return handleResponse(response);
  },
};

// Third-party job portal integration API
export const jobPortalsApi = {
  importJobs: async (source: string): Promise<Job[]> => {
    const response = await fetch(`${API_URL}/job-portals/import?source=${source}`, {
      method: 'POST',
      credentials: 'include',
    });
    return handleResponse(response);
  },
  
  getSources: async (): Promise<string[]> => {
    const response = await fetch(`${API_URL}/job-portals/sources`);
    return handleResponse(response);
  },
};
