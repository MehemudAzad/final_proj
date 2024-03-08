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
    country VARCHAR(50),
    user_photo VARCHAR(2000),
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
    teacher_id INT references teachers(teacher_id),
    duration VARCHAR(50),
    image_url VARCHAR(1000),
    category,
    course_status,
    course_type VARCHAR(255),--
);


const types = ["Live", "Free", "Self-Paced", "Classroom"];
  const options = ["Web Development", "DS & Algorithms", "Programming Languages", "Machine Learning","Interview & Placement", "Data Science"]
course_status = APPROVED

CREATE TABLE course_student (
    course_id SERIAL REFERENCES courses(course_id),
    student_id INT REFERENCES students(student_id),
	rating INT,
	review TEXT,
	join_date DATE,
    PRIMARY KEY (course_id, student_id)
);

alter table course_student 
add column is_approved varchar(100);

-- Course_Teacher Table
CREATE TABLE course_teacher (
    course_id SERIAL REFERENCES courses(course_id),
    teacher_id INT REFERENCES teachers(teacher_id),
    status VARCHAR(100),
    PRIMARY KEY (course_id, teacher_id)
);

-- Lesson Tabl
CREATE TABLE lessons (
    lesson_id SERIAL PRIMARY KEY,
    course_id INT REFERENCES courses(course_id),
    teacher_id INT REFERENCES teachers(teacher_id),
    title VARCHAR(100),
    lesson_description TEXT,
    lesson_pdf VARCHAR(1000)
);

-- Lecture Table
CREATE TABLE lectures (
    lecture_id SERIAL PRIMARY KEY,
    lesson_id INT REFERENCES lessons(lesson_id),
    video_link VARCHAR(255),
    pdf_note VARCHAR(255),
    lecture_title VARCHAR(255)
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
    comment_text TEXT,
    parent_comment_id INT REFERENCES blog_comments(blog_comment_id),
    comment_date DATE
);

-- Quiz Table
CREATE TABLE quizzes (
    quiz_id SERIAL PRIMARY KEY,
    lesson_id INT REFERENCES lessons(lesson_id),
    course_id INT references courses(course_id),
    creator_id INT references teachers(teacher_id),
    time INT 
);

-- Quiz_Student Table
CREATE TABLE quiz_students (
    quiz_id INT REFERENCES quizzes(quiz_id),
    student_id INT REFERENCES students(student_id),
    course_id INT REFERENCES courses(course_id),
    marks INT,
    PRIMARY KEY (quiz_id, student_id)
);

-- Question Table
CREATE TABLE questions (
    question_id SERIAL PRIMARY KEY,
    quiz_id INT REFERENCES quizzes(quiz_id),
    mark INT,
    question TEXT,
    option1 VARCHAR(255),
    option2 VARCHAR(255),
    option3 VARCHAR(255),
    option4 VARCHAR(255),
    correct_ans VARCHAR(255)--make it variable
);

--store answers here
create table quiz_answers_student(
	quiz_id int references quizzes(quiz_id) ON DELETE CASCADE,
	student_id int references students(student_id) ON DELETE CASCADE,
	question_id int references questions(question_id) ON DELETE CASCADE,
	answer varchar(1000)
)


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


-- Add ON DELETE CASCADE constraint for course_id in course_student table
ALTER TABLE course_student

ADD FOREIGN KEY (course_id) REFERENCES courses(course_id) ON DELETE CASCADE;

-- Add ON DELETE CASCADE constraint for student_id in course_student table
ALTER TABLE course_student
ADD FOREIGN KEY (student_id) REFERENCES students(student_id) ON DELETE CASCADE;

ALTER TABLE course_student
DROP CONSTRAINT IF EXISTS course_student_course_id_fkey,
ADD FOREIGN KEY (course_id) REFERENCES courses(course_id) ON DELETE CASCADE;


ALTER TABLE quizzes
DROP CONSTRAINT IF EXISTS quizzes_lesson_id_fkey,
ADD CONSTRAINT quizzes_lesson_id_fkey FOREIGN KEY (lesson_id) 
REFERENCES lessons(lesson_id) ON DELETE CASCADE;


ALTER TABLE lessons
DROP CONSTRAINT IF EXISTS lessons_course_id_fkey,
ADD CONSTRAINT lessons_course_id_fkey FOREIGN KEY (course_id) 
REFERENCES courses(course_id) ON DELETE CASCADE;

ALTER TABLE lectures
DROP CONSTRAINT IF EXISTS lectures_lesson_id_fkey,
ADD CONSTRAINT lectures_lesson_id_fkey FOREIGN KEY (lesson_id) 
REFERENCES lessons(lesson_id) ON DELETE CASCADE;


ALTER TABLE comment_lecture
DROP CONSTRAINT IF EXISTS comment_lecture_lecture_id_fkey,
ADD CONSTRAINT comment_lecture_lecture_id_fkey FOREIGN KEY (lecture_id) 
REFERENCES lectures(lecture_id) ON DELETE CASCADE;



ALTER TABLE quiz_students
DROP CONSTRAINT IF EXISTS quiz_students_quiz_id_fkey,
ADD CONSTRAINT quiz_students_quiz_id_fkey FOREIGN KEY (quiz_id) 
REFERENCES quizzes(quiz_id) ON DELETE CASCADE;

ALTER TABLE questions
DROP CONSTRAINT IF EXISTS questions_quiz_id_fkey,
ADD CONSTRAINT questions_quiz_id_fkey FOREIGN KEY (quiz_id) 
REFERENCES quizzes(quiz_id) ON DELETE CASCADE;


ALTER TABLE teachers
DROP CONSTRAINT IF EXISTS teachers_user_id_fkey,
ADD CONSTRAINT teachers_user_id_fkey FOREIGN KEY (user_id) 
REFERENCES users(id) ON DELETE CASCADE;

ALTER TABLE course_teacher
DROP CONSTRAINT IF EXISTS course_teacher_course_id_fkey,
ADD CONSTRAINT course_teacher_course_id_fkey FOREIGN KEY (course_id) 
REFERENCES courses(course_id) ON DELETE CASCADE;


ALTER TABLE students
DROP CONSTRAINT IF EXISTS students_user_id_fkey,
ADD CONSTRAINT students_user_id_fkey FOREIGN KEY (user_id) 
REFERENCES users(id) ON DELETE CASCADE;


ALTER TABLE course_teacher
DROP CONSTRAINT IF EXISTS course_teacher_teacher_id_fkey,
ADD CONSTRAINT course_teacher_teacher_id_fkey FOREIGN KEY (teacher_id) 
REFERENCES teachers(teacher_id) ON DELETE CASCADE;

ALTER TABLE questions
DROP CONSTRAINT IF EXISTS questions_quiz_id_fkey,
ADD CONSTRAINT questions_quiz_id_fkey FOREIGN KEY (quiz_id)
REFERENCES quizzes(quiz_id) ON DELETE CASCADE;



INSERT INTO courses (course_name, course_description, course_price, category, course_status, course_type, teacher_id)
VALUES ('HTML & CSS Basics', 'Learn the fundamentals of HTML and CSS.', 19.99, 'Web Development', 'APPROVED', 'Live', 2);
INSERT INTO course_teacher (course_id, teacher_id, status) VALUES (57, 2, 'APPROVED');

INSERT INTO courses (course_name, course_description, course_price, category, course_status, course_type, teacher_id)
VALUES ('JavaScript Essentials', 'Master JavaScript programming language.', 29.99, 'Web Development', 'APPROVED', 'Self-Paced', 3);
INSERT INTO course_teacher (course_id, teacher_id, status) VALUES (58, 3, 'APPROVED');


INSERT INTO courses (course_name, course_description, course_price, category, course_status, course_type, teacher_id)
VALUES ('Data Structures in Python', 'Learn about data structures in Python.', 39.99, 'DS & Algorithms', 'APPROVED', 'Classroom', 4);
INSERT INTO course_teacher (course_id, teacher_id, status) VALUES (59, 4, 'APPROVED');


INSERT INTO courses (course_name, course_description, course_price, category, course_status, course_type, teacher_id)
VALUES ('Advanced Machine Learning Techniques', 'Explore advanced machine learning concepts.', 49.99, 'Machine Learning', 'APPROVED', 'Live', 5);
INSERT INTO course_teacher (course_id, teacher_id, status) VALUES (60, 5, 'APPROVED');

INSERT INTO courses (course_name, course_description, course_price, category, course_status, course_type, teacher_id)
VALUES ('Java Programming Masterclass', 'Become an expert in Java programming.', 59.99, 'Programming Languages', 'APPROVED', 'Self-Paced', 7);
INSERT INTO course_teacher (course_id, teacher_id, status) VALUES (61, 7, 'APPROVED');


INSERT INTO courses (course_name, course_description, course_price, category, course_status, course_type, teacher_id)
VALUES ('Data Analysis with Pandas', 'Learn data analysis using Pandas library.', 24.99, 'Data Science', 'APPROVED', 'Free', 2);
INSERT INTO course_teacher (course_id, teacher_id, status) VALUES (62, 2, 'APPROVED');


INSERT INTO courses (course_name, course_description, course_price, category, course_status, course_type, teacher_id)
VALUES ('Python Django Web Development', 'Build web applications using Django framework.', 39.99, 'Web Development', 'APPROVED', 'Classroom', 3);
INSERT INTO course_teacher (course_id, teacher_id, status) VALUES (63, 3, 'APPROVED');


INSERT INTO courses (course_name, course_description, course_price, category, course_status, course_type, teacher_id)
VALUES ('Algorithms & Data Structures in C++', 'Learn algorithms and data structures in C++.', 29.99, 'DS & Algorithms', 'APPROVED', 'Self-Paced', 4);
INSERT INTO course_teacher (course_id, teacher_id, status) VALUES (64, 4, 'APPROVED');


INSERT INTO courses (course_name, course_description, course_price, category, course_status, course_type, teacher_id)
VALUES ('Deep Learning Fundamentals', 'Get started with deep learning.', 44.99, 'Machine Learning', 'APPROVED', 'Live', 5);
INSERT INTO course_teacher (course_id, teacher_id, status) VALUES (65, 5, 'APPROVED');


INSERT INTO courses (course_name, course_description, course_price, category, course_status, course_type, teacher_id)
VALUES ('React.js Essentials', 'Master React.js for building interactive UIs.', 34.99, 'Web Development', 'APPROVED', 'Self-Paced', 7);
INSERT INTO course_teacher (course_id, teacher_id, status) VALUES (66, 7, 'APPROVED');


INSERT INTO courses (course_name, course_description, course_price, category, course_status, course_type, teacher_id)
VALUES ('SQL Database Management', 'Learn SQL for database management.', 19.99, 'Programming Languages', 'APPROVED', 'Classroom', 2);
INSERT INTO course_teacher (course_id, teacher_id, status) VALUES (67, 2, 'APPROVED');


INSERT INTO courses (course_name, course_description, course_price, category, course_status, course_type, teacher_id)
VALUES ('Artificial Intelligence Basics', 'Introduction to artificial intelligence.', 39.99, 'Machine Learning', 'APPROVED', 'Live', 3);
INSERT INTO course_teacher (course_id, teacher_id, status) VALUES (68, 3, 'APPROVED');


INSERT INTO courses (course_name, course_description, course_price, category, course_status, course_type, teacher_id)
VALUES ('Node.js Web Development', 'Build web applications with Node.js.', 29.99, 'Web Development', 'APPROVED', 'Self-Paced', 4);
INSERT INTO course_teacher (course_id, teacher_id, status) VALUES (69, 4, 'APPROVED');

INSERT INTO courses (course_name, course_description, course_price, category, course_status, course_type, teacher_id)
VALUES ('Python for Data Science', 'Learn Python for data science applications.', 24.99, 'Data Science', 'APPROVED', 'Free', 5);
INSERT INTO course_teacher (course_id, teacher_id, status) VALUES (70, 5, 'APPROVED');

INSERT INTO courses (course_name, course_description, course_price, category, course_status, course_type, teacher_id)
VALUES ('Advanced JavaScript Concepts', 'Explore advanced JavaScript concepts.', 34.99, 'Web Development', 'APPROVED', 'Classroom', 7);
INSERT INTO course_teacher (course_id, teacher_id, status) VALUES (71, 7, 'APPROVED');

INSERT INTO courses (course_name, course_description, course_price, category, course_status, course_type, teacher_id)
VALUES ('C# Programming Masterclass', 'Become proficient in C# programming.', 49.99, 'Programming Languages', 'APPROVED', 'Self-Paced', 2);
INSERT INTO course_teacher (course_id, teacher_id, status) VALUES (72, 2, 'APPROVED');

INSERT INTO courses (course_name, course_description, course_price, category, course_status, course_type, teacher_id)
VALUES ('Computer Vision Fundamentals', 'Introduction to computer vision.', 29.99, 'Machine Learning', 'APPROVED', 'Live', 3);
INSERT INTO course_teacher (course_id, teacher_id, status) VALUES (73, 3, 'APPROVED');

INSERT INTO courses (course_name, course_description, course_price, category, course_status, course_type, teacher_id)
VALUES ('Angular.js Essentials', 'Master Angular.js for building web apps.', 39.99, 'Web Development', 'APPROVED', 'Self-Paced', 4);
INSERT INTO course_teacher (course_id, teacher_id, status) VALUES (74, 4, 'APPROVED');

INSERT INTO courses (course_name, course_description, course_price, category, course_status, course_type, teacher_id)
VALUES ('R Programming for Data Analysis', 'Learn R programming for data analysis.', 24.99, 'Data Science', 'APPROVED', 'Free', 5);
INSERT INTO course_teacher (course_id, teacher_id, status) VALUES (75, 5, 'APPROVED');
