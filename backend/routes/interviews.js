
const express = require('express');
const { v4: uuidv4 } = require('uuid');

module.exports = (db) => {
  const router = express.Router();

  // Get all interviews
  router.get('/', (req, res) => {
    res.json(db.interviews);
  });

  // Get a specific interview
  router.get('/:id', (req, res) => {
    const interview = db.interviews.find(interview => interview.id === req.params.id);
    if (!interview) {
      return res.status(404).json({ message: 'Interview not found' });
    }
    res.json(interview);
  });

  // Create a new interview
  router.post('/', (req, res) => {
    // Find candidate details
    const candidate = db.candidates.find(c => c.id === req.body.candidateId);
    if (!candidate) {
      return res.status(400).json({ message: 'Candidate not found' });
    }

    const interview = {
      id: uuidv4(),
      candidate: {
        name: candidate.name,
        position: candidate.position,
        initials: candidate.initials
      },
      interviewers: req.body.interviewers || [],
      date: req.body.date,
      time: req.body.time,
      type: req.body.type,
      notes: req.body.notes || '',
      status: req.body.status || 'scheduled'
    };

    db.interviews.push(interview);
    res.status(201).json(interview);
  });

  // Update an interview
  router.put('/:id', (req, res) => {
    const index = db.interviews.findIndex(interview => interview.id === req.params.id);
    if (index === -1) {
      return res.status(404).json({ message: 'Interview not found' });
    }

    // Update only the fields that are provided
    const updatedInterview = {
      ...db.interviews[index],
      ...req.body,
      id: req.params.id // ensure ID doesn't change
    };

    db.interviews[index] = updatedInterview;
    res.json(updatedInterview);
  });

  // Delete an interview
  router.delete('/:id', (req, res) => {
    const index = db.interviews.findIndex(interview => interview.id === req.params.id);
    if (index === -1) {
      return res.status(404).json({ message: 'Interview not found' });
    }

    db.interviews.splice(index, 1);
    res.status(204).send();
  });

  return router;
};
