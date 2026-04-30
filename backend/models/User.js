const { pool } = require('../config/db');
const bcrypt = require('bcryptjs');

const User = {
  // Create a new user (student)
  create: async (email, password, name, role = 'student') => {
    const hashedPassword = await bcrypt.hash(password, 10);
    const query = `
      INSERT INTO users (email, password_hash, name, role)
      VALUES ($1, $2, $3, $4)
      RETURNING id, email, name, role, created_at
    `;
    const values = [email, hashedPassword, name, role];
    const result = await pool.query(query, values);
    return result.rows[0];
  },

  // Find user by email (for login)
  findByEmail: async (email) => {
    const query = `SELECT * FROM users WHERE email = $1`;
    const result = await pool.query(query, [email]);
    return result.rows[0];
  },

  // Find by ID
  findById: async (id) => {
    const query = `SELECT id, email, name, role, created_at FROM users WHERE id = $1`;
    const result = await pool.query(query, [id]);
    return result.rows[0];
  },

  // Seed admin if no admin exists (called at server start)
  seedAdmin: async () => {
    const adminEmail = 'khalid@mern-platform.local';
    const existing = await User.findByEmail(adminEmail);
    if (!existing) {
      await User.create(adminEmail, 'admin123', 'Super Admin', 'admin');
      console.log('✅ Admin seeded: khalid@mern-platform.local / admin123');
    }
  }
};

module.exports = User;
