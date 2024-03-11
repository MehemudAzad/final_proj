-- Index on category column
CREATE INDEX idx_category ON courses (category);

-- Index on course_type column
CREATE INDEX idx_course_type ON courses (course_type);

-- Index on course_name column
CREATE INDEX idx_course_name ON courses (course_name);
CREATE INDEX idx_username ON users (username);