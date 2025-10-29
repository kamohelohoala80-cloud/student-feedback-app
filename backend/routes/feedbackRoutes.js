const express = require('express');
const router = express.Router();
const pool = require('../models/Feedback');

// GET all feedback
router.get('/', async (req, res) => {
  try {
    console.log('🔧 GET /api/feedback called');
    const result = await pool.query('SELECT * FROM feedback ORDER BY createdAt DESC');
    res.json(result.rows);
  } catch (error) {
    console.error('❌ GET /api/feedback error:', error);
    res.status(500).json({ error: 'Database error: ' + error.message });
  }
});

// POST new feedback
router.post('/', async (req, res) => {
  try {
    console.log('🔧 POST /api/feedback called with:', req.body);
    const { studentName, courseCode, comments, rating } = req.body;
    
    const query = `
      INSERT INTO feedback (studentName, courseCode, comments, rating) 
      VALUES ($1, $2, $3, $4) 
      RETURNING *
    `;
    
    const values = [studentName, courseCode, comments, rating];
    const result = await pool.query(query, values);
    
    res.status(201).json({ 
      message: 'Feedback added successfully!', 
      feedback: result.rows[0] 
    });
  } catch (error) {
    console.error('❌ POST /api/feedback error:', error);
    res.status(500).json({ error: 'Database error: ' + error.message });
  }
});

// DELETE feedback
router.delete('/:id', async (req, res) => {
  try {
    console.log('🔧 DELETE /api/feedback called for ID:', req.params.id);
    const query = 'DELETE FROM feedback WHERE id = $1';
    await pool.query(query, [req.params.id]);
    res.json({ message: 'Feedback deleted successfully' });
  } catch (error) {
    console.error('❌ DELETE /api/feedback error:', error);
    res.status(500).json({ error: 'Database error: ' + error.message });
  }
});

module.exports = router;