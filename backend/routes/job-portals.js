
const express = require('express');
const { v4: uuidv4 } = require('uuid');

module.exports = (db) => {
  const router = express.Router();

  // Get job portal sources
  router.get('/sources', (req, res) => {
    res.json(['LinkedIn', 'Indeed', 'Glassdoor', 'Monster']);
  });

  // Import jobs from job portal
  router.post('/import', (req, res) => {
    const source = req.query.source;
    
    // Mock job titles and locations
    const jobTitles = ['Frontend Developer', 'Backend Engineer', 'UI/UX Designer', 'Product Manager'];
    const locations = ['Remote', 'New York', 'San Francisco', 'Austin'];
    const departments = ['Engineering', 'Design', 'Product'];
    
    // Create mock jobs
    const importedJobs = Array(2).fill().map(() => {
      const title = jobTitles[Math.floor(Math.random() * jobTitles.length)] + ` (${source})`;
      const department = departments[Math.floor(Math.random() * departments.length)];
      const location = locations[Math.floor(Math.random() * locations.length)];
      
      const job = {
        id: uuidv4(),
        title,
        department,
        location,
        type: 'full-time',
        status: 'active',
        applicants: 0,
        postedDate: `Posted ${new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })} - Imported from ${source}`,
        description: `This is a job imported from ${source}`
      };
      
      db.jobs.push(job);
      return job;
    });
    
    res.json(importedJobs);
  });

  // Export jobs to job portal
  router.post('/export-jobs', (req, res) => {
    const jobIds = req.body.jobIds;
    const destination = req.body.destination;
    
    // In a real implementation, this would call the API of the job portal
    console.log(`Exporting ${jobIds.length} jobs to ${destination}`);
    
    res.json({ success: true });
  });

  // Import candidates from job portal
  router.post('/import-candidates', (req, res) => {
    const source = req.body.source;
    
    // Mock data
    const firstNames = ['John', 'Jane', 'Alex', 'Taylor', 'Morgan'];
    const lastNames = ['Smith', 'Johnson', 'Williams', 'Brown', 'Jones'];
    const positions = ['Frontend Developer', 'Designer', 'Product Manager', 'DevOps Engineer'];
    
    // Create mock candidates
    const importedCandidates = Array(2).fill().map(() => {
      const firstName = firstNames[Math.floor(Math.random() * firstNames.length)];
      const lastName = lastNames[Math.floor(Math.random() * lastNames.length)];
      const fullName = `${firstName} ${lastName}`;
      const email = `${firstName.toLowerCase()}.${lastName.toLowerCase()}@example.com`;
      const position = positions[Math.floor(Math.random() * positions.length)];
      const initials = `${firstName[0]}${lastName[0]}`.toUpperCase();
      
      const candidate = {
        id: uuidv4(),
        name: fullName,
        email,
        position,
        status: 'new',
        date: new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
        initials
      };
      
      db.candidates.push(candidate);
      return candidate;
    });
    
    res.json(importedCandidates);
  });

  // Export candidates to job portal
  router.post('/export-candidates', (req, res) => {
    const candidateIds = req.body.candidateIds;
    const destination = req.body.destination;
    
    // In a real implementation, this would call the API of the job portal
    console.log(`Exporting ${candidateIds.length} candidates to ${destination}`);
    
    res.json({ success: true });
  });

  return router;
};
