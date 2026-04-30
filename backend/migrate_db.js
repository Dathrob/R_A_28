const { pool } = require('./config/db');

async function migrateDatabase() {
  try {
    console.log('Starting database migration...');
    
    // Check if institution column exists in courses table
    const institutionCheck = await pool.query(`
      SELECT column_name 
      FROM information_schema.columns 
      WHERE table_name = 'courses' AND column_name = 'institution'
    `);
    
    if (institutionCheck.rows.length === 0) {
      console.log('Adding institution column to courses table...');
      await pool.query(`ALTER TABLE courses ADD COLUMN institution VARCHAR(200)`);
    } else {
      console.log('Institution column already exists');
    }
    
    // Check if duration column exists
    const durationCheck = await pool.query(`
      SELECT column_name 
      FROM information_schema.columns 
      WHERE table_name = 'courses' AND column_name = 'duration'
    `);
    
    if (durationCheck.rows.length === 0) {
      console.log('Adding duration column to courses table...');
      await pool.query(`ALTER TABLE courses ADD COLUMN duration VARCHAR(100)`);
    } else {
      console.log('Duration column already exists');
    }
    
    // Check if class_mode column exists
    const classModeCheck = await pool.query(`
      SELECT column_name 
      FROM information_schema.columns 
      WHERE table_name = 'courses' AND column_name = 'class_mode'
    `);
    
    if (classModeCheck.rows.length === 0) {
      console.log('Adding class_mode column to courses table...');
      await pool.query(`ALTER TABLE courses ADD COLUMN class_mode VARCHAR(50)`);
    } else {
      console.log('Class_mode column already exists');
    }
    
    // Check if schedule column exists
    const scheduleCheck = await pool.query(`
      SELECT column_name 
      FROM information_schema.columns 
      WHERE table_name = 'courses' AND column_name = 'schedule'
    `);
    
    if (scheduleCheck.rows.length === 0) {
      console.log('Adding schedule column to courses table...');
      await pool.query(`ALTER TABLE courses ADD COLUMN schedule VARCHAR(100)`);
    } else {
      console.log('Schedule column already exists');
    }
    
    // Check if registration_link column exists
    const registrationLinkCheck = await pool.query(`
      SELECT column_name 
      FROM information_schema.columns 
      WHERE table_name = 'courses' AND column_name = 'registration_link'
    `);
    
    if (registrationLinkCheck.rows.length === 0) {
      console.log('Adding registration_link column to courses table...');
      await pool.query(`ALTER TABLE courses ADD COLUMN registration_link VARCHAR(500)`);
    } else {
      console.log('Registration_link column already exists');
    }
    
    // Check if registration_start column exists
    const registrationStartCheck = await pool.query(`
      SELECT column_name 
      FROM information_schema.columns 
      WHERE table_name = 'courses' AND column_name = 'registration_start'
    `);
    
    if (registrationStartCheck.rows.length === 0) {
      console.log('Adding registration_start column to courses table...');
      await pool.query(`ALTER TABLE courses ADD COLUMN registration_start DATE`);
    } else {
      console.log('Registration_start column already exists');
    }
    
    // Check if registration_end column exists
    const registrationEndCheck = await pool.query(`
      SELECT column_name 
      FROM information_schema.columns 
      WHERE table_name = 'courses' AND column_name = 'registration_end'
    `);
    
    if (registrationEndCheck.rows.length === 0) {
      console.log('Adding registration_end column to courses table...');
      await pool.query(`ALTER TABLE courses ADD COLUMN registration_end DATE`);
    } else {
      console.log('Registration_end column already exists');
    }
    
    // Check if course_fees table exists
    const courseFeesTableCheck = await pool.query(`
      SELECT table_name 
      FROM information_schema.tables 
      WHERE table_name = 'course_fees'
    `);
    
    if (courseFeesTableCheck.rows.length === 0) {
      console.log('Creating course_fees table...');
      await pool.query(`
        CREATE TABLE course_fees (
          id SERIAL PRIMARY KEY,
          course_id INT REFERENCES courses(id) ON DELETE CASCADE,
          category VARCHAR(100) NOT NULL,
          fee DECIMAL(10,2) NOT NULL,
          currency VARCHAR(10) DEFAULT 'ETB',
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
          UNIQUE(course_id, category)
        )
      `);
      
      // Create index
      await pool.query(`CREATE INDEX IF NOT EXISTS idx_course_fees_course ON course_fees(course_id)`);
    } else {
      console.log('Course_fees table already exists');
    }
    
    console.log('✅ Database migration completed successfully');
    
  } catch (err) {
    console.error('❌ Migration error:', err);
  } finally {
    process.exit();
  }
}

migrateDatabase();