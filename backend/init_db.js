const { pool } = require('./config/db');
const fs = require('fs');
const path = require('path');

async function initDatabase() {
  try {
    // Run schema.sql
    const schemaPath = path.join(__dirname, 'db', 'schema.sql');
    const schema = fs.readFileSync(schemaPath, 'utf8');
    await pool.query(schema);
    console.log('✅ Main schema ensured');

    // Run course_fees.sql
    const courseFeesPath = path.join(__dirname, 'db', 'course_fees.sql');
    const courseFeesSql = fs.readFileSync(courseFeesPath, 'utf8');
    await pool.query(courseFeesSql);
    console.log('✅ Course fees schema ensured');

    // Check tables
    const tablesResult = await pool.query(`
      SELECT table_name 
      FROM information_schema.tables 
      WHERE table_schema = 'public'
      AND table_name IN ('users', 'courses', 'course_fees', 'enrollments')
    `);
    console.log('Tables in database:', tablesResult.rows.map(r => r.table_name));

    // Check courses columns
    const coursesColumns = await pool.query(`
      SELECT column_name 
      FROM information_schema.columns 
      WHERE table_name = 'courses'
    `);
    console.log('Courses columns:', coursesColumns.rows.map(r => r.column_name));

    // Check course_fees columns
    const courseFeesColumns = await pool.query(`
      SELECT column_name 
      FROM information_schema.columns 
      WHERE table_name = 'course_fees'
    `);
    console.log('Course fees columns:', courseFeesColumns.rows.map(r => r.column_name));

  } catch (err) {
    console.error('❌ Database initialization error:', err);
  } finally {
    process.exit();
  }
}

initDatabase();