const { Pool } = require('pg');

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
});

// Create table
const createTable = async () => {
  try {
    const query = `
      CREATE TABLE IF NOT EXISTS feedback (
        id SERIAL PRIMARY KEY,
        studentName VARCHAR(255) NOT NULL,
        courseCode VARCHAR(50) NOT NULL,
        comments TEXT,
        rating INTEGER CHECK (rating >= 1 AND rating <= 5),
        createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `;
    await pool.query(query);
    console.log('✅ PostgreSQL table ready!');
  } catch (error) {
    console.error('❌ Table creation error:', error);
  }
};

createTable();

module.exports = pool;