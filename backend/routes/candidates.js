
const express = require('express');
const { v4: uuidv4 } = require('uuid');

module.exports = (db) => {
  const router = express.Router();

  // Get all candidates
  router.get('/', (req, res) => {
    res.json(db.candidates);
  });

  // Get a specific candidate
  router.get('/:id', (req, res) => {
    const candidate = db.candidates.find(candidate => candidate.id === req.params.id);
    if (!candidate) {
      return res.status(404).json({ message: 'Candidate not found' });
    }
    res.json(candidate);
  });

  // Create a new candidate
  router.post('/', (req, res) => {
    // Generate initials from name
    const nameParts = req.body.name.split(' ');
    const initials = nameParts.length > 1 
      ? (nameParts[0][0] + nameParts[nameParts.length - 1][0]).toUpperCase()
      : req.body.name.slice(0, 2).toUpperCase();

    const candidate = {
      id: uuidv4(),
      name: req.body.name,
      email: req.body.email,
      position: req.body.position,
      status: req.body.status,
      date: new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
      initials: initials,
      applicationStage: req.body.applicationStage || null,
      jobId: req.body.jobId || null
    };

    db.candidates.push(candidate);
    res.status(201).json(candidate);
  });

  // Update a candidate
  router.put('/:id', (req, res) => {
    const index = db.candidates.findIndex(candidate => candidate.id === req.params.id);
    if (index === -1) {
      return res.status(404).json({ message: 'Candidate not found' });
    }

    // Update only the fields that are provided
    const updatedCandidate = {
      ...db.candidates[index],
      ...req.body,
      id: req.params.id // ensure ID doesn't change
    };

    db.candidates[index] = updatedCandidate;
    res.json(updatedCandidate);
  });

  // Delete a candidate
  router.delete('/:id', (req, res) => {
    const index = db.candidates.findIndex(candidate => candidate.id === req.params.id);
    if (index === -1) {
      return res.status(404).json({ message: 'Candidate not found' });
    }

    db.candidates.splice(index, 1);
    res.status(204).send();
  });

  // Update candidate stage
  router.patch('/:id/stage', (req, res) => {
    const index = db.candidates.findIndex(candidate => candidate.id === req.params.id);
    if (index === -1) {
      return res.status(404).json({ message: 'Candidate not found' });
    }

    db.candidates[index].applicationStage = req.body.applicationStage;
    res.json(db.candidates[index]);
  });

  // Bulk import candidates
  router.post('/bulk-import', (req, res) => {
    const importedCandidates = req.body.candidates.map(candidateData => {
      // Generate initials from name
      const nameParts = candidateData.name.split(' ');
      const initials = nameParts.length > 1 
        ? (nameParts[0][0] + nameParts[nameParts.length - 1][0]).toUpperCase()
        : candidateData.name.slice(0, 2).toUpperCase();

      return {
        id: uuidv4(),
        name: candidateData.name,
        email: candidateData.email,
        position: candidateData.position,
        status: candidateData.status,
        date: new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
        initials: initials
      };
    });

    db.candidates.push(...importedCandidates);
    res.status(201).json(importedCandidates);
  });

  // Bulk export candidates
  router.post('/bulk-export', (req, res) => {
    const candidateIds = req.body.candidateIds;
    const candidates = db.candidates.filter(candidate => candidateIds.includes(candidate.id));
    res.json(candidates);
  });

  return router;
};
