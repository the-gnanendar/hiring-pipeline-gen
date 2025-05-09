
const express = require('express');

module.exports = (db) => {
  const router = express.Router();

  // Login
  router.post('/login', (req, res) => {
    const { email, password } = req.body;
    
    // In a real app, you would validate the password
    // For demo purposes, we're just checking if the email exists
    const user = db.users.find(u => u.email === email);
    
    if (user) {
      // In a real app, you would generate a JWT token here
      res.json(user);
    } else {
      res.status(401).json({ message: 'Invalid credentials' });
    }
  });

  // Logout
  router.post('/logout', (req, res) => {
    // In a real app, you would invalidate the token
    res.json({ message: 'Logged out successfully' });
  });

  // Get current user
  router.get('/me', (req, res) => {
    // In a real app, you would decode the JWT token
    // For demo purposes, we'll use the first user
    const userId = req.headers.authorization?.split(' ')[1];
    
    if (userId) {
      const user = db.users.find(u => u.id === userId);
      if (user) {
        res.json(user);
      } else {
        res.status(404).json({ message: 'User not found' });
      }
    } else {
      res.status(401).json({ message: 'Unauthorized' });
    }
  });

  return router;
};
