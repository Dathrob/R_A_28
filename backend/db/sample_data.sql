-- Insert sample admin user if not exists (assuming admin already seeded)
-- Insert the Data Analytics with R course
INSERT INTO courses (course_name, description, institution, duration, class_mode, schedule, registration_link, registration_start, registration_end, start_date, end_date, created_by)
VALUES (
  'Data Analytics with R',
  'Build advanced analytics and stunning visuals. Strengthen statistical foundations with R''s ecosystem. Translate raw data into actionable insights.',
  'Addis Ababa University, College of Technology and Built Environment, School of Information Technology and Engineering',
  '6 weekends (1 and half month)',
  'Fully Online',
  'Saturday and Sunday (8:00 LT - 12:00 LT)',
  'https://forms.gle/QSPhGhEghfSXrU2u8',
  '2026-02-02',
  '2026-02-27',
  '2026-02-28',
  '2026-06-30',  -- Approximately 1.5 months from start date
  1  -- Assuming admin user has id=1
)
RETURNING id;

-- Insert course fees for different categories
INSERT INTO course_fees (course_id, category, fee, currency)
VALUES 
  ((SELECT id FROM courses WHERE course_name = 'Data Analytics with R' ORDER BY created_at DESC LIMIT 1), 'University Student', 16000, 'ETB'),
  ((SELECT id FROM courses WHERE course_name = 'Data Analytics with R' ORDER BY created_at DESC LIMIT 1), 'AAU staff and post grad student', 18000, 'ETB'),
  ((SELECT id FROM courses WHERE course_name = 'Data Analytics with R' ORDER BY created_at DESC LIMIT 1), 'Self-Sponsored', 20000, 'ETB'),
  ((SELECT id FROM courses WHERE course_name = 'Data Analytics with R' ORDER BY created_at DESC LIMIT 1), 'Company Sponsored', 60000, 'ETB');