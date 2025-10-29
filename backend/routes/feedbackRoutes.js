const express = require('express');
const router = express.Router();
const db = require('../models/Feedback');

// GET all feedback
router.get('/', (req, res) => {
  const query = 'SELECT * FROM feedback ORDER BY createdAt DESC';
  db.all(query, [], (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
    } else {
      res.json(rows);
    }
  });
});

// POST new feedback
router.post('/', (req, res) => {
  const { studentName, courseCode, comments, rating } = req.body;
  
  const query = `
    INSERT INTO feedback (studentName, courseCode, comments, rating) 
    VALUES (?, ?, ?, ?)
  `;
  
  db.run(query, [studentName, courseCode, comments, rating], function(err) {
    if (err) {
      res.status(400).json({ error: err.message });
    } else {
      res.status(201).json({ 
        message: 'Feedback added successfully!', 
        feedback: { 
          id: this.lastID, 
          studentName, 
          courseCode, 
          comments, 
          rating 
        } 
      });
    }
  });
});

// DELETE feedback (Bonus feature)
router.delete('/:id', (req, res) => {
  const query = 'DELETE FROM feedback WHERE id = ?';
  db.run(query, [req.params.id], function(err) {
    if (err) {
      res.status(500).json({ error: err.message });
    } else {
      res.json({ message: 'Feedback deleted successfully' });
    }
  });
});

module.exports = router;