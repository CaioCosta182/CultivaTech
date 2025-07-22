// config/database.js
const mysql = require('mysql2/promise');
require('dotenv').config();

const pool = mysql.createPool({
  host: process.env.DB_HOST || 'auth-db',
  user: process.env.DB_USER || 'cultivatech_user',
  password: process.env.DB_PASSWORD || 'user123',
  database: process.env.DB_NAME || 'cultivatech',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

module.exports = {
  authenticate: async () => {
    const conn = await pool.getConnection();
    await conn.ping();
    conn.release();
  },
  pool
};