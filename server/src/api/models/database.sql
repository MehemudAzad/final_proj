-- Users Table
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    role VARCHAR(50) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    username VARCHAR(50) NOT NULL,
    password VARCHAR(255) NOT NULL,
    date_of_birth DATE,
    mobile VARCHAR(15),
    city VARCHAR(50),
    country VARCHAR(50)
    user_photo VARCHAR(2000)
);

--email, firstname, lastname, password, date_of_birth, mobile, city, country

--Teacher Table
CREATE TABLE teachers (
    teacher_id SERIAL PRIMARY KEY,
    user_id INT UNIQUE REFERENCES users(id),
    years_of_experience INT,
    institution VARCHAR(255),
    mentored_students INT,
    teacher_description TEXT
);

-- -- Student Table
CREATE TABLE students (
    student_id SERIAL PRIMARY KEY,
    user_id INT UNIQUE REFERENCES users(id),
    education VARCHAR(100),
    job_profile VARCHAR(100),
    profession VARCHAR(100)
);

-- Course Table
CREATE TABLE courses (
    course_id SERIAL PRIMARY KEY,
    course_name VARCHAR(100) NOT NULL,
    course_description TEXT,
    course_price NUMERIC(10, 2),
    total_lectures INT,
    duration VARCHAR(50),
    image_url VARCHAR(255)
);

-- Course_Student Table
-- CREATE TABLE course_student (
--     course_id SERIAL REFERENCES courses(course_id),
--     student_id INT REFERENCES students(student_id),
--     PRIMARY KEY (course_id, student_id)
-- );
CREATE TABLE course_student (
    course_id SERIAL REFERENCES courses(course_id),
    user_id INT REFERENCES users(id),
    PRIMARY KEY (course_id, user_id)
);
alter table course_student 
add column is_approved varchar(100);

-- Course_Teacher Table
CREATE TABLE course_teacher (
    course_id SERIAL REFERENCES courses(course_id),
    user_id INT REFERENCES users(id),
    PRIMARY KEY (course_id, user_id)
);
--added new column
alter table course_teacher
ADD COLUMN is_approved VARCHAR(100);


-- Lesson Tabl
CREATE TABLE lessons (
    lesson_id SERIAL PRIMARY KEY,
    course_id INT REFERENCES courses(course_id),
    teacher_id INT REFERENCES teachers(teacher_id),
    title VARCHAR(100),
    lesson_description TEXT
);

-- Lecture Table
CREATE TABLE lectures (
    lecture_id SERIAL PRIMARY KEY,
    lesson_id INT REFERENCES lessons(lesson_id),
    video_link VARCHAR(255),
    pdf_note VARCHAR(255)
);

-- Comment_Lecture Table
CREATE TABLE comment_lecture (
    comment_id SERIAL PRIMARY KEY,
    lecture_id INT REFERENCES lectures(lecture_id),
    user_id INT REFERENCES users(id),
    description TEXT
);

-- Blogs Table
CREATE TABLE blogs (
    blog_id SERIAL PRIMARY KEY,
    user_id INT REFERENCES users(id),
    blog_content TEXT,
    blog_title VARCHAR(500),
    blog_category VARCHAR(50),
);

-- Blog_Comments Table
CREATE TABLE blog_comments (
    blog_comment_id SERIAL PRIMARY KEY,
    blog_id INT REFERENCES blogs(blog_id),
    user_id INT REFERENCES users(id),
    comment_description TEXT,
    like_count INT
);

-- Quiz Table
CREATE TABLE quizzes (
    quiz_id SERIAL PRIMARY KEY,
    lesson_id INT REFERENCES lessons(lesson_id)
);

-- Quiz_Student Table
CREATE TABLE quiz_students (
    quiz_id INT REFERENCES quizzes(quiz_id),
    student_id INT REFERENCES students(student_id),
    marks INT,
    PRIMARY KEY (quiz_id, student_id)
);

-- Question Table
CREATE TABLE questions (
    question_id SERIAL PRIMARY KEY,
    quiz_id INT REFERENCES quizzes(quiz_id),
    mark INT,
    option1 VARCHAR(255),
    option2 VARCHAR(255),
    option3 VARCHAR(255),
    option4 VARCHAR(255),
    correct_ans VARCHAR(255)--make it variable
);



--INSERT
-- Inserting Computer Science Courses
-- Inserting courses into the courses table
INSERT INTO courses (course_name, course_description, course_price, total_lectures, duration, image_url)
VALUES ('Introduction to Programming', 'Learn the basics of programming with this introductory course.', 49.99, 12, '4 weeks', 'https://example.com/intro_programming.jpg');

INSERT INTO courses (course_name, course_description, course_price, total_lectures, duration, image_url)
VALUES ('Web Development Bootcamp', 'A comprehensive bootcamp covering HTML, CSS, and JavaScript.', 79.99, 20, '6 weeks', 'https://example.com/web_dev_bootcamp.jpg');

INSERT INTO courses (course_name, course_description, course_price, total_lectures, duration, image_url)
VALUES ('Data Science Essentials', 'An essential course for understanding the fundamentals of data science.', 59.99, 15, '5 weeks', 'https://example.com/data_science_essentials.jpg');

INSERT INTO courses (course_name, course_description, course_price, total_lectures, duration, image_url)
VALUES ('Machine Learning Masterclass', 'Master machine learning techniques with this in-depth course.', 99.99, 25, '8 weeks', 'https://example.com/ml_masterclass.jpg');

INSERT INTO courses (course_name, course_description, course_price, total_lectures, duration, image_url)
VALUES ('Cybersecurity Advanced Topics', 'Explore advanced topics in cybersecurity and ethical hacking.', 69.99, 18, '6 weeks', 'https://example.com/cybersecurity_advanced.jpg');


--Teacher Table
-- CREATE TABLE teachers (
--     teacher_id SERIAL PRIMARY KEY,
--     user_id INT UNIQUE REFERENCES users(id),
--     years_of_experience INT,
--     institution VARCHAR(100),
--     mentored_students INT,
--     teacher_description TEXT
-- );

-- -- Student Table
-- CREATE TABLE students (
--     student_id SERIAL PRIMARY KEY,
--     user_id INT UNIQUE REFERENCES users(id),
--     education VARCHAR(100),
--     job_profile VARCHAR(100),
--     profession VARCHAR(100)
-- );