
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const { v4: uuidv4 } = require('uuid');

// Load environment variables
dotenv.config();

// Create Express app
const app = express();

// Use middleware
app.use(cors());
app.use(bodyParser.json());

// In-memory data storage (for demo purposes)
// In a real app, you'd use a database like MongoDB or PostgreSQL
const db = {
  jobs: [],
  candidates: [],
  interviews: [],
  users: [
    {
      id: '1',
      name: 'Admin User',
      email: 'admin@example.com',
      role: 'admin',
      avatar: 'AU',
    },
    {
      id: '2',
      name: 'Recruiter User',
      email: 'recruiter@example.com',
      role: 'recruiter',
      avatar: 'RU',
      department: 'HR',
    },
    {
      id: '3',
      name: 'Manager User',
      email: 'manager@example.com',
      role: 'hiring_manager',
      avatar: 'MU',
      department: 'Engineering',
    },
    {
      id: '4',
      name: 'Viewer User',
      email: 'viewer@example.com',
      role: 'viewer',
      avatar: 'VU',
    },
  ]
};

// Import route handlers
const jobRoutes = require('./routes/jobs');
const candidateRoutes = require('./routes/candidates');
const interviewRoutes = require('./routes/interviews');
const jobPortalRoutes = require('./routes/job-portals');
const authRoutes = require('./routes/auth');

// Use routes
app.use('/api/jobs', jobRoutes(db));
app.use('/api/candidates', candidateRoutes(db));
app.use('/api/interviews', interviewRoutes(db));
app.use('/api/job-portals', jobPortalRoutes(db));
app.use('/api/auth', authRoutes(db));

// Health check endpoint
app.get('/api/health-check', (req, res) => {
  res.status(200).json({ status: 'ok' });
});

// Start server
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

module.exports = app; // For testing purposes
