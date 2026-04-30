require('dotenv').config();
const express = require('express');
const cors = require('cors');

const db = require('./config/db');
const { pool, initSchema } = db;
const User = require('./models/User');

const authRoutes = require('./routes/authRoutes');
const courseRoutes = require('./routes/courseRoutes');
const enrollmentRoutes = require('./routes/enrollmentRoutes');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/courses', courseRoutes);
app.use('/api/enrollments', enrollmentRoutes);

// Initialize DB schema and seed admin
const initDB = async () => {
  try {
    await pool.query('SELECT NOW()');   // test connection
    console.log('✅ Database connected');
    await initSchema();                 // run schema.sql
    await User.seedAdmin();             // seed admin user
  } catch (err) {
    console.error('❌ Database initialization error:', err.message);
  }
};

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  initDB();
});

module.exports = app;