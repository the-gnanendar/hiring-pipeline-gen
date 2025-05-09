
const express = require('express');
const { v4: uuidv4 } = require('uuid');

module.exports = (db) => {
  const router = express.Router();

  // Get all jobs
  router.get('/', (req, res) => {
    res.json(db.jobs);
  });

  // Get a specific job
  router.get('/:id', (req, res) => {
    const job = db.jobs.find(job => job.id === req.params.id);
    if (!job) {
      return res.status(404).json({ message: 'Job not found' });
    }
    res.json(job);
  });

  // Create a new job
  router.post('/', (req, res) => {
    const job = {
      id: uuidv4(),
      title: req.body.title,
      department: req.body.department,
      location: req.body.location,
      type: req.body.type,
      status: req.body.status,
      applicants: 0,
      postedDate: req.body.status === 'draft' ? 'Draft' : `Posted ${new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}`,
      description: req.body.description || '',
      requirements: req.body.requirements || [],
      responsibilities: req.body.responsibilities || [],
      salary: {
        min: req.body.min_salary || 0,
        max: req.body.max_salary || 0,
        currency: req.body.salary_currency || 'USD'
      }
    };

    db.jobs.push(job);
    res.status(201).json(job);
  });

  // Update a job
  router.put('/:id', (req, res) => {
    const index = db.jobs.findIndex(job => job.id === req.params.id);
    if (index === -1) {
      return res.status(404).json({ message: 'Job not found' });
    }

    // Update only the fields that are provided
    const updatedJob = {
      ...db.jobs[index],
      ...req.body,
      id: req.params.id // ensure ID doesn't change
    };

    db.jobs[index] = updatedJob;
    res.json(updatedJob);
  });

  // Delete a job
  router.delete('/:id', (req, res) => {
    const index = db.jobs.findIndex(job => job.id === req.params.id);
    if (index === -1) {
      return res.status(404).json({ message: 'Job not found' });
    }

    db.jobs.splice(index, 1);
    res.status(204).send();
  });

  // Search jobs
  router.get('/search', (req, res) => {
    const query = req.query.q.toLowerCase();
    const filteredJobs = db.jobs.filter(job => 
      job.title.toLowerCase().includes(query) ||
      job.department.toLowerCase().includes(query) ||
      job.location.toLowerCase().includes(query) ||
      (job.description && job.description.toLowerCase().includes(query))
    );
    res.json(filteredJobs);
  });

  // Bulk import jobs
  router.post('/bulk-import', (req, res) => {
    const importedJobs = req.body.jobs.map(jobData => ({
      id: uuidv4(),
      title: jobData.title,
      department: jobData.department,
      location: jobData.location,
      type: jobData.type,
      status: jobData.status,
      applicants: 0,
      postedDate: jobData.status === 'draft' ? 'Draft' : `Posted ${new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}`,
      description: jobData.description || '',
      requirements: jobData.requirements || [],
      responsibilities: jobData.responsibilities || []
    }));

    db.jobs.push(...importedJobs);
    res.status(201).json(importedJobs);
  });

  // Bulk export jobs
  router.post('/bulk-export', (req, res) => {
    const jobIds = req.body.jobIds;
    const jobs = db.jobs.filter(job => jobIds.includes(job.id));
    res.json(jobs);
  });

  return router;
};
