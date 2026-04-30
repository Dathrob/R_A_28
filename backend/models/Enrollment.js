const pool = require('../config/db');

const Enrollment = {
  // Enroll a student in a course
  create: async (student_id, course_id) => {
    const query = `
      INSERT INTO enrollments (student_id, course_id)
      VALUES ($1, $2)
      ON CONFLICT (student_id, course_id) DO NOTHING
      RETURNING *
    `;
    const result = await pool.query(query, [student_id, course_id]);
    return result.rows[0];
  },

  // Get all courses a student is enrolled in
  getByStudent: async (student_id) => {
    const query = `
      SELECT c.id, c.course_name, c.description, c.start_date, c.end_date, e.enrolled_at
      FROM enrollments e
      JOIN courses c ON e.course_id = c.id
      WHERE e.student_id = $1
      ORDER BY e.enrolled_at DESC
    `;
    const result = await pool.query(query, [student_id]);
    return result.rows;
  },

  // Check if a student is already enrolled in a course
  exists: async (student_id, course_id) => {
    const query = `SELECT id FROM enrollments WHERE student_id = $1 AND course_id = $2`;
    const result = await pool.query(query, [student_id, course_id]);
    return result.rows.length > 0;
  },

  // Optional: unenroll
  delete: async (student_id, course_id) => {
    const query = `DELETE FROM enrollments WHERE student_id = $1 AND course_id = $2 RETURNING id`;
    const result = await pool.query(query, [student_id, course_id]);
    return result.rows[0];
  }
};

module.exports = Enrollment;