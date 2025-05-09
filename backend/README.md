
# ATS Backend

Node.js Express backend for the ATS (Applicant Tracking System) application.

## Features

- RESTful API for managing jobs, candidates, interviews, and users
- PostgreSQL database integration
- AI capabilities using OpenAI
- Knex.js for database migrations and seeding

## Setup

### Prerequisites

- Node.js (v14+)
- PostgreSQL
- OpenAI API key

### Installation

1. Clone the repository and navigate to the backend directory
2. Install dependencies:
   ```
   npm install
   ```

3. Create a PostgreSQL database named `ats_db`

4. Configure environment variables in `.env`:
   ```
   PORT=8000
   DATABASE_URL=postgres://postgres:password@localhost:5432/ats_db
   NODE_ENV=development
   OPENAI_API_KEY=your-openai-api-key
   ```

5. Run database migrations and seed data:
   ```
   npm run setup-db
   ```

### Available Scripts

- `npm start` - Start the server in production mode
- `npm run dev` - Start the server in development mode with hot reloading
- `npm test` - Run tests
- `npm run migrate` - Run database migrations
- `npm run seed` - Seed the database with initial data
- `npm run rollback` - Rollback the last migration
- `npm run setup-db` - Run migrations and seed data

## API Endpoints

### Authentication
- `POST /api/auth/login` - Login a user
- `POST /api/auth/logout` - Logout a user
- `GET /api/auth/me` - Get current authenticated user

### Jobs
- `GET /api/jobs` - Get all jobs
- `GET /api/jobs/:id` - Get a specific job
- `POST /api/jobs` - Create a new job
- `PUT /api/jobs/:id` - Update a job
- `DELETE /api/jobs/:id` - Delete a job

### Candidates
- `GET /api/candidates` - Get all candidates
- `GET /api/candidates/:id` - Get a specific candidate
- `POST /api/candidates` - Create a new candidate
- `PUT /api/candidates/:id` - Update a candidate
- `DELETE /api/candidates/:id` - Delete a candidate

### Interviews
- `GET /api/interviews` - Get all interviews
- `GET /api/interviews/:id` - Get a specific interview
- `POST /api/interviews` - Create a new interview
- `PUT /api/interviews/:id` - Update an interview
- `DELETE /api/interviews/:id` - Delete an interview

### AI Endpoints
- `POST /api/ai/process-resume` - Process resume text and extract information
- `POST /api/ai/generate-job-description` - Generate job description from title

## Database Schema

The database includes the following tables:
- `users` - User accounts with roles and permissions
- `jobs` - Available job positions
- `candidates` - Job applicants and candidates
- `interviews` - Scheduled interviews

## License

MIT
