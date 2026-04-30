const { pool } = require('../config/db');

const Course = {
  getAll: async () => {
    const query = `
      SELECT c.*, u.name AS created_by_name
      FROM courses c
      LEFT JOIN users u ON c.created_by = u.id
      ORDER BY c.created_at DESC
    `;
    const result = await pool.query(query);
    return result.rows;
  },

  getById: async (id) => {
    const query = `SELECT * FROM courses WHERE id = $1`;
    const result = await pool.query(query, [id]);
    return result.rows[0];
  },

  create: async (course_name, description, institution, duration, class_mode, schedule, registration_link, registration_start, registration_end, start_date, end_date, created_by) => {
    const query = `
      INSERT INTO courses (course_name, description, institution, duration, class_mode, schedule, registration_link, registration_start, registration_end, start_date, end_date, created_by)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12)
      RETURNING *
    `;
    const values = [course_name, description, institution, duration, class_mode, schedule, registration_link, registration_start, registration_end, start_date, end_date, created_by];
    const result = await pool.query(query, values);
    return result.rows[0];
  },

  update: async (id, course_name, description, institution, duration, class_mode, schedule, registration_link, registration_start, registration_end, start_date, end_date) => {
    const query = `
      UPDATE courses
      SET course_name = $1, description = $2, institution = $3, duration = $4, class_mode = $5, schedule = $6, registration_link = $7, registration_start = $8, registration_end = $9, start_date = $10, end_date = $11
      WHERE id = $12
      RETURNING *
    `;
    const values = [course_name, description, institution, duration, class_mode, schedule, registration_link, registration_start, registration_end, start_date, end_date, id];
    const result = await pool.query(query, values);
    return result.rows[0];
  },

  delete: async (id) => {
    const query = `DELETE FROM courses WHERE id = $1 RETURNING id`;
    const result = await pool.query(query, [id]);
    return result.rows[0];
  },

  // Course fees methods
  getFeesByCourseId: async (courseId) => {
    const query = `SELECT * FROM course_fees WHERE course_id = $1`;
    const result = await pool.query(query, [courseId]);
    return result.rows;
  },

  createFee: async (courseId, category, fee, currency = 'ETB') => {
    const query = `
      INSERT INTO course_fees (course_id, category, fee, currency)
      VALUES ($1, $2, $3, $4)
      RETURNING *
    `;
    const values = [courseId, category, fee, currency];
    const result = await pool.query(query, values);
    return result.rows[0];
  },

  updateFee: async (id, category, fee, currency) => {
    const query = `
      UPDATE course_fees
      SET category = $1, fee = $2, currency = $3
      WHERE id = $4
      RETURNING *
    `;
    const values = [category, fee, currency, id];
    const result = await pool.query(query, values);
    return result.rows[0];
  },

  deleteFee: async (id) => {
    const query = `DELETE FROM course_fees WHERE id = $1 RETURNING id`;
    const result = await pool.query(query, [id]);
    return result.rows[0];
  }
};

module.exports = Course;