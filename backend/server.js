
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const { v4: uuidv4 } = require('uuid');
const db = require('./db/db');

// Load environment variables
dotenv.config();

// Create Express app
const app = express();

// Use middleware
app.use(cors());
app.use(bodyParser.json());

// Initialize database by running PostgreSQL extension
app.use(async (req, res, next) => {
  try {
    // Check if the uuid-ossp extension is available and enable it if not
    await db.raw('CREATE EXTENSION IF NOT EXISTS "uuid-ossp"');
    next();
  } catch (error) {
    console.error('Database initialization error:', error);
    res.status(500).json({ error: 'Database initialization failed' });
  }
});

// Import route handlers
const jobRoutes = require('./routes/jobs');
const candidateRoutes = require('./routes/candidates');
const interviewRoutes = require('./routes/interviews');
const jobPortalRoutes = require('./routes/job-portals');
const authRoutes = require('./routes/auth');
const aiRoutes = require('./routes/ai');

// Use routes - pass the database connection to each route
app.use('/api/jobs', jobRoutes(db));
app.use('/api/candidates', candidateRoutes(db));
app.use('/api/interviews', interviewRoutes(db));
app.use('/api/job-portals', jobPortalRoutes(db));
app.use('/api/auth', authRoutes(db));
app.use('/api/ai', aiRoutes(db));

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
