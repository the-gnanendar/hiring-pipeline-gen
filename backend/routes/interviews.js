
const express = require('express');
const { v4: uuidv4 } = require('uuid');

module.exports = (db) => {
  const router = express.Router();

  // Get all interviews
  router.get('/', async (req, res) => {
    try {
      const interviews = await db('interviews').select('*');
      
      // Convert JSON strings back to objects
      const formattedInterviews = interviews.map(interview => ({
        ...interview,
        candidate: typeof interview.candidate === 'string' ? JSON.parse(interview.candidate) : interview.candidate,
        interviewers: typeof interview.interviewers === 'string' ? JSON.parse(interview.interviewers) : interview.interviewers
      }));
      
      res.json(formattedInterviews);
    } catch (error) {
      console.error('Get interviews error:', error);
      res.status(500).json({ message: 'Server error' });
    }
  });

  // Get a specific interview
  router.get('/:id', async (req, res) => {
    try {
      const interview = await db('interviews').where({ id: req.params.id }).first();
      if (!interview) {
        return res.status(404).json({ message: 'Interview not found' });
      }
      
      // Convert JSON strings back to objects
      interview.candidate = typeof interview.candidate === 'string' ? JSON.parse(interview.candidate) : interview.candidate;
      interview.interviewers = typeof interview.interviewers === 'string' ? JSON.parse(interview.interviewers) : interview.interviewers;
      
      res.json(interview);
    } catch (error) {
      console.error('Get interview error:', error);
      res.status(500).json({ message: 'Server error' });
    }
  });

  // Create a new interview
  router.post('/', async (req, res) => {
    try {
      // Find candidate details
      const candidate = await db('candidates').where({ id: req.body.candidateId }).first();
      if (!candidate) {
        return res.status(400).json({ message: 'Candidate not found' });
      }

      const interview = {
        id: uuidv4(),
        candidateId: req.body.candidateId,
        candidate: JSON.stringify({
          name: candidate.name,
          position: candidate.position,
          initials: candidate.initials
        }),
        interviewers: JSON.stringify(req.body.interviewers || []),
        date: req.body.date,
        time: req.body.time,
        type: req.body.type,
        notes: req.body.notes || '',
        status: req.body.status || 'scheduled'
      };

      const [insertedId] = await db('interviews').insert(interview).returning('id');
      
      // Get the full interview object to return
      const newInterview = await db('interviews').where({ id: interview.id }).first();
      
      // Convert JSON strings back to objects
      newInterview.candidate = typeof newInterview.candidate === 'string' ? JSON.parse(newInterview.candidate) : newInterview.candidate;
      newInterview.interviewers = typeof newInterview.interviewers === 'string' ? JSON.parse(newInterview.interviewers) : newInterview.interviewers;
      
      res.status(201).json(newInterview);
    } catch (error) {
      console.error('Create interview error:', error);
      res.status(500).json({ message: 'Server error' });
    }
  });

  // Update an interview
  router.put('/:id', async (req, res) => {
    try {
      const interview = await db('interviews').where({ id: req.params.id }).first();
      if (!interview) {
        return res.status(404).json({ message: 'Interview not found' });
      }

      // Prepare the update data
      const updateData = { ...req.body };
      
      // Convert objects to JSON strings for storage
      if (updateData.candidate && typeof updateData.candidate === 'object') {
        updateData.candidate = JSON.stringify(updateData.candidate);
      }
      
      if (updateData.interviewers && Array.isArray(updateData.interviewers)) {
        updateData.interviewers = JSON.stringify(updateData.interviewers);
      }

      // Update the interview
      await db('interviews').where({ id: req.params.id }).update(updateData);
      
      // Get the updated interview
      const updatedInterview = await db('interviews').where({ id: req.params.id }).first();
      
      // Convert JSON strings back to objects
      updatedInterview.candidate = typeof updatedInterview.candidate === 'string' ? JSON.parse(updatedInterview.candidate) : updatedInterview.candidate;
      updatedInterview.interviewers = typeof updatedInterview.interviewers === 'string' ? JSON.parse(updatedInterview.interviewers) : updatedInterview.interviewers;
      
      res.json(updatedInterview);
    } catch (error) {
      console.error('Update interview error:', error);
      res.status(500).json({ message: 'Server error' });
    }
  });

  // Delete an interview
  router.delete('/:id', async (req, res) => {
    try {
      const count = await db('interviews').where({ id: req.params.id }).del();
      if (count === 0) {
        return res.status(404).json({ message: 'Interview not found' });
      }
      res.status(204).send();
    } catch (error) {
      console.error('Delete interview error:', error);
      res.status(500).json({ message: 'Server error' });
    }
  });

  return router;
};
