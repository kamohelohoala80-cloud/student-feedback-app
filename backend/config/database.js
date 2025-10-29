const sqlite3 = require('sqlite3').verbose();

const db = new sqlite3.Database('./feedback.db', (err) => {
  if (err) {
    console.error('❌ SQLite error:', err);
  } else {
    console.log('✅ SQLite Database Connected!');
    // Create table
    db.run(`
      CREATE TABLE IF NOT EXISTS feedback (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        studentName TEXT NOT NULL,
        courseCode TEXT NOT NULL,
        comments TEXT,
        rating INTEGER CHECK (rating >= 1 AND rating <= 5),
        createdAt DATETIME DEFAULT CURRENT_TIMESTAMP
      )
    `, (err) => {
      if (err) {
        console.error('❌ Table creation error:', err);
      } else {
        console.log('✅ Feedback table ready!');
      }
    });
  }
});

module.exports = db;