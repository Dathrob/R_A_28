CREATE TABLE IF NOT EXISTS course_fees (
    id SERIAL PRIMARY KEY,
    course_id INT REFERENCES courses(id) ON DELETE CASCADE,
    category VARCHAR(100) NOT NULL,
    fee DECIMAL(10,2) NOT NULL,
    currency VARCHAR(10) DEFAULT 'ETB',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(course_id, category)
);

-- Index for faster lookup by course_id
CREATE INDEX IF NOT EXISTS idx_course_fees_course ON course_fees(course_id);