const { pool } = require('./config/db');

async function insertSampleData() {
  try {
    // Insert the Data Analytics with R course
    const courseResult = await pool.query(`
      INSERT INTO courses (course_name, description, institution, duration, class_mode, schedule, registration_link, registration_start, registration_end, start_date, end_date, created_by)
      VALUES (
        'Data Analytics with R',
        'Build advanced analytics and stunning visuals. Strengthen statistical foundations with R''s ecosystem. Translate raw data into actionable insights.',
        'Addis Ababa University, College of Technology and Built Environment, School of Information Technology and Engineering',
        '6 weekends (1 and a half months)',
        'Fully Online',
        'Saturday and Sunday (8:00 LT - 12:00 LT)',
        'https://forms.gle/QSPhGhEghfSXrU2u8',
        '2026-02-02',
        '2026-02-27',
        '2026-02-28',
        '2026-06-30',
        1
      )
      RETURNING id
    `);
    
    const courseId = courseResult.rows[0].id;
    console.log(`Inserted course with ID: ${courseId}`);
    
    // Insert course fees for different categories
    const fees = [
      ['University Student', 16000],
      ['AAU Staff and Post-Grad Student', 18000],
      ['Self-Sponsored', 20000],
      ['Company Sponsored', 60000]
    ];
    
    for (const [category, fee] of fees) {
      await pool.query(
        'INSERT INTO course_fees (course_id, category, fee, currency) VALUES ($1, $2, $3, $4)',
        [courseId, category, fee, 'ETB']
      );
    }
    
    console.log('Inserted course fees for all categories');
    
  } catch (err) {
    console.error('Error inserting sample data:', err);
  } finally {
    process.exit();
  }
}

insertSampleData();