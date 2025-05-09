
# ATS Backend API

This is the Node.js Express backend for the ATS (Applicant Tracking System) application.

## Setup

1. Install dependencies:
```bash
npm install
```

2. Create a `.env` file with the following content:
```
PORT=8000
```

3. Start the server:
```bash
npm start
```

For development with auto-restart:
```bash
npm run dev
```

## API Endpoints

### Authentication
- POST `/api/auth/login` - Login
- POST `/api/auth/logout` - Logout
- GET `/api/auth/me` - Get current user

### Jobs
- GET `/api/jobs` - Get all jobs
- GET `/api/jobs/:id` - Get a specific job
- POST `/api/jobs` - Create a new job
- PUT `/api/jobs/:id` - Update a job
- DELETE `/api/jobs/:id` - Delete a job
- GET `/api/jobs/search?q={query}` - Search jobs
- POST `/api/jobs/bulk-import` - Import multiple jobs
- POST `/api/jobs/bulk-export` - Export selected jobs

### Candidates
- GET `/api/candidates` - Get all candidates
- GET `/api/candidates/:id` - Get a specific candidate
- POST `/api/candidates` - Create a new candidate
- PUT `/api/candidates/:id` - Update a candidate
- DELETE `/api/candidates/:id` - Delete a candidate
- PATCH `/api/candidates/:id/stage` - Update candidate stage
- POST `/api/candidates/bulk-import` - Import multiple candidates
- POST `/api/candidates/bulk-export` - Export selected candidates

### Interviews
- GET `/api/interviews` - Get all interviews
- GET `/api/interviews/:id` - Get a specific interview
- POST `/api/interviews` - Create a new interview
- PUT `/api/interviews/:id` - Update an interview
- DELETE `/api/interviews/:id` - Delete an interview

### Job Portals Integration
- GET `/api/job-portals/sources` - Get available job portal sources
- POST `/api/job-portals/import?source={source}` - Import jobs from external job portal
- POST `/api/job-portals/export-jobs` - Export jobs to external job portal
- POST `/api/job-portals/import-candidates` - Import candidates from external job portal
- POST `/api/job-portals/export-candidates` - Export candidates to external job portal

## Data Storage

For this demo, data is stored in memory. In a production application, you would implement a database like MongoDB, PostgreSQL, or MySQL.
