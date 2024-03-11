select * from quizzes;
select * from questions;
select * from courses;
select * from teachers;

delete from courses where teacher_id is null;
select * from users ;

select * from students;

delete from users where id = 42;
select * from lessons;

select * from blogs;

select * from course_student;
select * from course_teacher;

delete from teachers where teacher_id = 6

alter table courses 
add column course_outline varchar(1000);

ALTER TABLE courses
ALTER COLUMN image_url TYPE VARCHAR(1000);

delete from courses where course_id = 48;

CREATE TABLE quizzes (
    quiz_id SERIAL PRIMARY KEY,
    lesson_id INT REFERENCES lessons(lesson_id),
    course_id INT references courses(course_id),
    creator_id INT references teachers(teacher_id),
    time INT 
);

CREATE TABLE quizzes (
    quiz_id SERIAL PRIMARY KEY,
    lesson_id INT REFERENCES lessons(lesson_id) ON DELETE CASCADE,
    course_id INT REFERENCES courses(course_id) ON DELETE CASCADE,
    creator_id INT REFERENCES teachers(teacher_id) ON DELETE CASCADE,
    time INT 
);

select * from lessons;

alter table lessons add column lesson_no int ;



create table quiz_answers_student(
	quiz_id int references quizzes(quiz_id) ON DELETE CASCADE,
	student_id int references students(student_id) ON DELETE CASCADE,
	question_id int references questions(question_id) ON DELETE CASCADE,
	answer varchar(1000)
)

select * from quiz_answers_student;
select * from questions;


ALTER TABLE questions
ADD FOREIGN KEY (quiz_id)
REFERENCES quizzes(quiz_id)
ON DELETE CASCADE;


select * 
from quizzes 
where quiz_id = 16;



select * from quizzes;
select * from quiz_students;


select * from users;
select * from students;



select * from questions 
where quiz_id = 16;


alter table questions add column question TEXT;
delete from quiz_answers_student
where quiz_id = 3;

select * 
from quiz_answers_student;


select * from quiz_answers_student a join questions q on (a.question_id = q.question_id)
where a.student_id = 13 and a.quiz_id = 3;

select marks from quiz_students
where student_id = 13 and quiz_id = 23;


drop table quiz_answers_student;
ON DELETE CASCADE

select * 
from quiz_students;


CREATE TABLE questions (
    question_id SERIAL PRIMARY KEY,
    quiz_id INT REFERENCES quizzes(quiz_id) ,
    mark INT,
    option1 VARCHAR(255),
    option2 VARCHAR(255),
    option3 VARCHAR(255),
    option4 VARCHAR(255),
    correct_ans VARCHAR(255)--make it variable
);

ALTER TABLE quiz_answers_student
DROP CONSTRAINT IF EXISTS quiz_id,
DROP CONSTRAINT IF EXISTS student_id,
DROP CONSTRAINT IF EXISTS question_id;

-- Add foreign key constraints with cascading delete
ALTER TABLE quiz_answers_student
ADD CONSTRAINT fk_quiz_id
FOREIGN KEY (quiz_id)
REFERENCES quizzes(quiz_id)
ON DELETE CASCADE,
ADD CONSTRAINT fk_student_id
FOREIGN KEY (student_id)
REFERENCES students(student_id)
ON DELETE CASCADE,
ADD CONSTRAINT fk_question_id
FOREIGN KEY (question_id)
REFERENCES questions(question_id)
ON DELETE CASCADE;


CREATE OR REPLACE PROCEDURE DELETE_LESSONS (id IN INT) 
LANGUAGE plpgsql 
as $$ 
begin 
   delete from comment_lecture 
	 where lecture_id IN 
	 (
	   select lecture_id 
		 from lectures 
		 where lesson_id = id 
	 );
	 
	 delete from quiz_students 
	 where quiz_id IN 
	 (
		 select quiz_id 
		 from quizzes 
		 where lesson_id = id
	 ); 
	 
	 
	 delete from quiz_answers_student 
	 where quiz_id IN 
	 (
	   select quiz_id 
		 from quizzes 
		 where lesson_id = id
	 );
	 
	 delete from questions 
	 where quiz_id IN 
	 (
		 select quiz_id 
		 from quizzes 
		 where lesson_id = id
	 ); 
	 
	 delete from quizzes 
	 where lesson_id = id; 
	 
   delete FROM  lectures where lesson_id = id; 
	 
	 delete FROM lessons where lesson_id = id; 
end; $$;


delete from courses where teacher_id is null;

select * from courses;

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

delete from quizzes where creator_id is null;

select * from questions;

delete from questions where quiz_id is null;

ALTER TABLE questions
DROP CONSTRAINT IF EXISTS questions_quiz_id_fkey,
ADD CONSTRAINT questions_quiz_id_fkey FOREIGN KEY (quiz_id)
REFERENCES quizzes(quiz_id) ON DELETE CASCADE;


select * from courses;
-- Inserting sample courses with teacher_ids
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




  CREATE OR REPLACE FUNCTION "public"."get_top_selling_courses"()
  RETURNS TABLE("courses_id" int4, "students_count" int4) AS $BODY$
BEGIN
    RETURN QUERY
    SELECT course_id, COUNT(student_id) as student_count
    FROM course_student  
    GROUP BY course_id
    ORDER BY student_count DESC
    LIMIT 3;
END;
$BODY$
  LANGUAGE plpgsql VOLATILE
  COST 100
  ROWS 1000
  
  
  
  
CREATE OR REPLACE FUNCTION "public"."launch_course"()
  RETURNS "pg_catalog"."trigger" AS $BODY$
BEGIN 
  IF NEW.course_status = 'APPROVED' THEN 
	INSERT INTO COURSE_TEACHER values (NEW.COURSE_ID, NEW.TEACHER_ID,'APPROVED'); 
	END IF; 
	RETURN NEW;
END;  
$BODY$
  LANGUAGE plpgsql VOLATILE
  COST 100



  CREATE OR REPLACE FUNCTION "public"."insert_users"()
  RETURNS "pg_catalog"."trigger" AS $BODY$
BEGIN 
  IF NEW.role = 'student' THEN 
  INSERT INTO STUDENTS (user_id) VALUES(NEW.id);
	ELSIF NEW.ROLE = 'teacher' THEN 
	INSERT INTO TEACHERS (user_id) VALUES(NEW.id);
	END IF; 
	RETURN NEW; 
END; 
$BODY$
  LANGUAGE plpgsql VOLATILE
  COST 100


select * from questions;


select lesson_id from lessons
where course_id = 46






  CREATE OR REPLACE FUNCTION "public"."get_top_enrolled_courses"()
  RETURNS TABLE("course_id" int4) AS $BODY$
BEGIN
    RETURN QUERY
    SELECT c.course_id
    FROM (
        SELECT course_id, COUNT(*) AS student_count
        FROM course_student  
        GROUP BY course_id
        ORDER BY student_count DESC
        LIMIT 3
    ) AS top_courses
    JOIN course_student AS c ON top_courses.course_id = c.course_id;
END;
$BODY$
  LANGUAGE plpgsql VOLATILE
  COST 100
  ROWS 1000

select * from lessons where course_id = 46;

select * from lectures where lesson_id = 8;


delete from lectures where lecture_id = 31;


select * 
from quiz_answers_student
where student_id = 13;


select * 
from quiz_students
where student_id = 13;


CREATE OR REPLACE FUNCTION get_student_rank_in_quiz(quiz_id INT, student_id INT)
RETURNS INT AS
$$
DECLARE
    student_marks INT;
    student_rank INT;
BEGIN
    -- Get the marks of the specified student in the given quiz
    SELECT marks INTO student_marks
    FROM quiz_students qs
    WHERE qs.quiz_id = $1 AND qs.student_id = $2;

    -- Count the number of students with marks higher than the specified student
    SELECT COUNT(*) INTO student_rank
    FROM quiz_students qs
    WHERE qs.quiz_id = $1 AND qs.marks > student_marks;

    -- Add 1 to the rank to include the student itself
    student_rank := student_rank + 1;

    RETURN student_rank;
END;
$$
LANGUAGE plpgsql;


select * from users;
select * from students;

SELECT get_student_percentile_in_quiz(26, 13) AS rank

   SELECT COUNT(*)
    FROM quiz_students qs
    WHERE qs.quiz_id = 26;
select get_student_rank_in_quiz(26, 13)

CREATE OR REPLACE FUNCTION get_student_percentile_in_quiz(quiz_id INT, student_id INT)
RETURNS NUMERIC AS
$$
DECLARE
    total_students INT;
    student_rank INT;
    percentile NUMERIC(8,2);
BEGIN
    -- Get the total number of students in the given quiz
    SELECT COUNT(*) INTO total_students
    FROM quiz_students qs
    WHERE qs.quiz_id = $1;

    -- Get the rank of the specified student
    student_rank := get_student_rank_in_quiz($1, $2);
	
	RAISE NOTICE 'Total Students: %', total_students;
    RAISE NOTICE 'Student Rank: %', student_rank;
    -- Calculate the percentile
    percentile := 100 - (((student_rank::NUMERIC)-1) / total_students::NUMERIC) * 100;
    RETURN percentile;
END;
$$
LANGUAGE plpgsql;

select 
 
select * from quiz_students qs join quizzes q on q.quiz_id = qs.quiz_id
where qs.student_id = 13 and q.course_id = 46;


select * from quizzes


alter table quiz_students add column course_id int references courses(course_id)


UPDATE quiz_students SET course_id = 46;
select * from course_student;


ALTER TABLE quiz_students DROP COLUMN course_id;


CREATE OR REPLACE FUNCTION get_students_count(id IN INT)
RETURNS INT
AS $$
DECLARE
    student_count INT;
BEGIN
    SELECT COUNT(*)
    INTO student_count
    FROM COURSE_STUDENT
    WHERE COURSE_ID = id;
    
    RETURN student_count;
END;
$$
LANGUAGE plpgsql;




-- CREATE OR REPLACE FUNCTION get_quiz_marks(student_id_param INT, course_id_param INT) 
-- RETURNS JSONB AS $$
-- DECLARE
--     quiz_marks JSONB := '[]'::JSONB;
--     quiz_info RECORD;
-- BEGIN
--     -- Loop through each quiz in the given course
--     FOR quiz_info IN
--         SELECT quizzes.quiz_id, quiz_students.marks
--         FROM quizzes
--         LEFT JOIN quiz_students ON quizzes.quiz_id = quiz_students.quiz_id
--         WHERE quizzes.course_id = course_id_param AND quiz_students.student_id = student_id_param
--     LOOP
--         -- Initialize the JSON object for the quiz
--         quiz_marks := quiz_marks || jsonb_build_array(
--             jsonb_build_object(
--                 'quiz_number', quiz_info.quiz_id,
--                 'marks', CASE WHEN quiz_info.marks IS NULL THEN NULL ELSE quiz_info.marks END
--             )
--         );
--     END LOOP;

--     RETURN quiz_marks;
-- END;
-- $$ LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION get_quiz_marks(student_id_param INT, course_id_param INT) 
RETURNS JSONB AS $$
DECLARE
    quiz_marks JSONB := '[]'::JSONB;
    quiz_info RECORD;
BEGIN
    -- Loop through each quiz in the given course
    FOR quiz_info IN
        SELECT quizzes.quiz_no, quiz_students.marks
        FROM quizzes
        LEFT JOIN quiz_students ON quizzes.quiz_id = quiz_students.quiz_id
        WHERE quizzes.course_id = course_id_param AND quiz_students.student_id = student_id_param
    LOOP
        -- Initialize the JSON object for the quiz
        quiz_marks := quiz_marks || jsonb_build_array(
            jsonb_build_object(
                'quiz_number', quiz_info.quiz_no,
                'marks', CASE WHEN quiz_info.marks IS NULL THEN NULL ELSE quiz_info.marks END
            )
        );
    END LOOP;

    RETURN quiz_marks;
END;
$$ LANGUAGE plpgsql;


-- Index on category column
CREATE INDEX idx_category ON courses (category);

-- Index on course_type column
CREATE INDEX idx_course_type ON courses (course_type);

-- Index on course_name column
CREATE INDEX idx_course_name ON courses (course_name);
CREATE INDEX idx_username ON users (username);


alter table quizzes add column quiz_no int;

CREATE OR REPLACE FUNCTION increment_quiz_no(course_id INT) RETURNS INT AS $$
DECLARE
    current_count INT;
    new_count INT;
BEGIN
    -- Get the current count of quizzes for the course
    SELECT COUNT(*) INTO current_count FROM quizzes q WHERE q.course_id = $1;
    
    -- Increment the count by 1 to determine the new quiz_no
    new_count := current_count + 1;
    
    RETURN new_count;
END;
$$ LANGUAGE plpgsql;


select increment_quiz_no(46) as quiz_no;

select  * from quizzes

update quizzes set quiz_no = 5 where quiz_id = 27



create table course_teacher_rating(
   review_id SERIAL  PRIMARY KEY,  
	 student_id INT REFERENCES students(student_id), 
	 course_id INT REFERENCES courses(course_id),
	 teacher_id INT REFERENCES teachers(teacher_id),
	 rating INT 
)


CREATE OR REPLACE FUNCTION calculate_lesson_no(course_id INT) RETURNS INT AS $$
DECLARE
    lesson_count INT;
    new_lesson_no INT;
BEGIN
    -- Get the current count of lessons for the course
    SELECT COUNT(*) INTO lesson_count FROM lessons L WHERE L.course_id = $1;
    
    -- Increment the count by 1 to determine the new lesson_no
    new_lesson_no := lesson_count + 1;
    
    RETURN new_lesson_no;
END;
$$ LANGUAGE plpgsql;

select calculate_lesson_no(46);

select * from lessons;
select * from quizzes;
select * from quiz_students;

delete from quizzes where quiz_id in(31,30, 29, 28);

select * 
-- SELECT quizzes.quiz_no, quiz_students.marks
        FROM quizzes
        FULL JOIN quiz_students ON quizzes.quiz_id = quiz_students.quiz_id
        WHERE quizzes.course_id = 46 AND quiz_students.student_id = 13
		







CREATE OR REPLACE FUNCTION get_avg_quiz_marks(course_id_param INT) 
RETURNS JSONB AS $$
DECLARE
    quiz_marks JSONB := '[]'::JSONB;
    quiz_info RECORD;
BEGIN
    -- Loop through each quiz in the given course
    FOR quiz_info IN
    SELECT 
    q.quiz_no, 
    SUM(qs.marks) AS marks_obtained, 
    COUNT(qs.marks) AS students, 
    COUNT(qs.marks) * (SELECT SUM(qn.mark)::DOUBLE PRECISION FROM questions qn WHERE qn.quiz_id = q.quiz_id) AS total_obtainable_marks, 
    (SUM(qs.marks) / (COUNT(qs.marks) * (SELECT SUM(qn.mark)::DOUBLE PRECISION FROM questions qn WHERE qn.quiz_id = q.quiz_id))) * 100 AS percentage
	FROM 
		quizzes q
	LEFT JOIN 
		quiz_students qs ON q.quiz_id = qs.quiz_id 
	WHERE 
		q.course_id = 46
	GROUP BY 
		q.quiz_id
    LOOP
		 -- Initialize the JSON object for the quiz
        quiz_marks := quiz_marks || jsonb_build_array(
            jsonb_build_object(
                'quiz_number', quiz_info.quiz_no,
                'marks', CASE WHEN quiz_info.marks_obtained IS NULL THEN 0 ELSE quiz_info.marks END,
				'percentage_marks',  CASE WHEN quiz_info.percentage IS NULL THEN 0 ELSE quiz_info.marks END,
				'students' , quiz_info.students,
				'obtainable_marks', CASE WHEN quiz_info.total_obtainable_marks IS NULL THEN 0 ELSE quiz_info.total_obtainable_marks END
            )
        );
		
	
    END LOOP;

    RETURN quiz_marks;
END;
$$ LANGUAGE plpgsql;


CREATE OR REPLACE FUNCTION get_avg_quiz_marks(course_id_param INT) 
RETURNS JSONB AS $$
DECLARE
    quiz_marks JSONB := '[]'::JSONB;
    quiz_info RECORD;
BEGIN
    -- Loop through each quiz in the given course
    FOR quiz_info IN
        SELECT 
            q.quiz_no, 
            COALESCE(SUM(qs.marks), 0) AS marks_obtained, 
            COUNT(qs.marks) AS students, 
            COUNT(qs.marks) * (SELECT COALESCE(SUM(qn.mark), 0)::DOUBLE PRECISION FROM questions qn WHERE qn.quiz_id = q.quiz_id) AS total_obtainable_marks, 
            COALESCE((SUM(qs.marks) / NULLIF(COUNT(qs.marks) * (SELECT COALESCE(SUM(qn.mark), 0)::DOUBLE PRECISION FROM questions qn WHERE qn.quiz_id = q.quiz_id), 0)) * 100, 0) AS percentage
        FROM 
            quizzes q
        LEFT JOIN 
            quiz_students qs ON q.quiz_id = qs.quiz_id 
        WHERE 
            q.course_id = course_id_param
        GROUP BY 
            q.quiz_id
    LOOP
        -- Initialize the JSON object for the quiz
        quiz_marks := quiz_marks || jsonb_build_array(
            jsonb_build_object(
                'quiz_number', quiz_info.quiz_no,
                'marks', quiz_info.marks_obtained,
                'percentage_marks', quiz_info.percentage,
                'students', quiz_info.students,
                'obtainable_marks', quiz_info.total_obtainable_marks,
            )
        );
    END LOOP;

    RETURN quiz_marks;
END;
$$ LANGUAGE plpgsql;



SELECT get_avg_quiz_marks(46) as avg_quiz_marks





 SELECT q.quiz_no, sum(qs.marks) as marks_obtained, count(qs.marks) as students, count(qs.marks)*(select sum(qn.mark) from questions qn where qn.quiz_id = q.quiz_id) as total_obtainable_marks, (sum(qs.marks)/(count(qs.marks)*(select sum(qn.mark) from questions qn where qn.quiz_id = q.quiz_id)))*100
        FROM quizzes q
        LEFT JOIN quiz_students qs ON q.quiz_id = qs.quiz_id 
        WHERE q.course_id = 46
		group by q.quiz_id
		
		
SELECT 
    q.quiz_no, 
    SUM(qs.marks) AS marks_obtained, 
    COUNT(qs.marks) AS students, 
    COUNT(qs.marks) * (SELECT SUM(qn.mark)::DOUBLE PRECISION FROM questions qn WHERE qn.quiz_id = q.quiz_id) AS total_obtainable_marks, 
    (SUM(qs.marks) / (COUNT(qs.marks) * (SELECT SUM(qn.mark)::DOUBLE PRECISION FROM questions qn WHERE qn.quiz_id = q.quiz_id))) * 100 AS percentage
FROM 
    quizzes q
LEFT JOIN 
    quiz_students qs ON q.quiz_id = qs.quiz_id 
WHERE 
    q.course_id = 46
GROUP BY 
    q.quiz_id

CREATE OR REPLACE FUNCTION "public"."check_weak_password"()
  RETURNS "pg_catalog"."trigger" AS $BODY$
BEGIN

  IF LENGTH(NEW.password) < 8 THEN
    RAISE EXCEPTION 'WEAK PASSWORD';
  END IF;
  RETURN NEW;
END;
$BODY$
  LANGUAGE plpgsql VOLATILE
  COST 100
  
select * from users;


-- select cs.student_id, count(c.course_id) as enrolled_num
-- from courses c join course_student cs ON (c.course_id = cs.course_id)
-- group by cs.student_id 




CREATE OR REPLACE FUNCTION check_enrollment_limit()
RETURNS TRIGGER AS $$
DECLARE
    enrolled_count INTEGER;
BEGIN
    -- Get the number of courses the student is currently enrolled in
    SELECT COUNT(*)
    INTO enrolled_count
    FROM course_student
    WHERE student_id = NEW.student_id;

    -- If the number of enrolled courses exceeds 10, raise an exception
    IF enrolled_count >= 10 THEN
        RAISE EXCEPTION 'Student cannot enroll in more than 10 courses';
    END IF;

    -- If the limit is not exceeded, allow the insertion to proceed
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER enrollment_limit_trigger
BEFORE INSERT ON course_student
FOR EACH ROW
EXECUTE FUNCTION check_enrollment_limit();



CREATE OR REPLACE FUNCTION get_total_revenue(id INT)
RETURNS INT
AS $$
DECLARE
    total_revenue INT;
BEGIN
    SELECT course_price * (select count(student_id) from course_student where course_id = id)
    INTO total_revenue
    FROM courses c
    WHERE c.course_id = id;
    
    RETURN total_revenue;
END;
$$
LANGUAGE plpgsql;


select get_total_revenue(46)


update courses set course_type = 'Live' where course_id = 46;



CREATE OR REPLACE FUNCTION get_course_statistics() 
RETURNS JSONB AS $$
DECLARE
    course_statistics JSONB := '[]'::JSONB;
    course_info RECORD;
BEGIN
    -- Loop through each course
    FOR course_info IN
        SELECT 
		c.course_name, 
		COALESCE(SUM(CASE WHEN cs.student_id IS NOT NULL THEN c.course_price ELSE 0 END), 0) AS total_revenue, 
		COUNT(DISTINCT cs.student_id) AS num_students
	FROM 
		courses c
	LEFT JOIN 
		course_student cs ON c.course_id = cs.course_id 
	GROUP BY 
    c.course_name
    LOOP
        -- Add course statistics to the JSON array
        course_statistics := course_statistics || jsonb_build_array(
            jsonb_build_object(
                'course_name', course_info.course_name,
                'total_revenue', course_info.total_revenue,
                'num_students', course_info.num_students
            )
        );
    END LOOP;

    RETURN course_statistics;
END;
$$ LANGUAGE plpgsql;


select get_course_statistics();



CREATE OR REPLACE FUNCTION get_course_statistics_by_type() 
RETURNS JSONB AS $$
DECLARE
    course_statistics JSONB := '[]'::JSONB;
    total_revenue NUMERIC := 0;
	percentage NUMERIC := 0;
	course_info RECORD;
BEGIN
    -- Get the total revenue for all courses
    SELECT COALESCE(SUM(c.course_price), 0) INTO total_revenue
    FROM courses c
    LEFT JOIN course_student cs ON c.course_id = cs.course_id;

    -- Loop through each category
    FOR course_info IN
        SELECT 
            c.course_type, 
            COALESCE(SUM(c.course_price), 0) AS total_revenue_category, 
            COUNT(DISTINCT cs.student_id) AS num_students
        FROM 
            courses c
        LEFT JOIN 
            course_student cs ON c.course_id = cs.course_id 
        GROUP BY 
            c.course_type
    LOOP
        -- Calculate the percentage of total revenue for the category
		IF total_revenue > 0 THEN
                percentage := (course_info.total_revenue_category / total_revenue) * 100;
         END IF;
        -- Add course statistics to the JSON array
        course_statistics := course_statistics || jsonb_build_array(
            jsonb_build_object(
                'category', course_info.course_type,
                'total_revenue', course_info.total_revenue_category,
                'percentage_of_total_revenue', percentage,
                'num_students', course_info.num_students
            )
        );
    END LOOP;

    RETURN course_statistics;
END;
$$ LANGUAGE plpgsql;

select get_course_statistics_by_type();


 SELECT 
            c.category, 
            COALESCE(SUM(c.course_price), 0) AS total_revenue_category, 
            COUNT(DISTINCT cs.student_id) AS num_students
        FROM 
            courses c
        LEFT JOIN 
            course_student cs ON c.course_id = cs.course_id 
        GROUP BY 
            c.category
			


CREATE OR REPLACE PROCEDURE course_delete(id INT) AS $$
BEGIN
    DELETE FROM comment_lecture WHERE lecture_id IN (
        SELECT lecture_id FROM lectures WHERE lesson_id IN (
            SELECT lesson_id FROM lessons WHERE course_id = id
        )
    );

    DELETE FROM quiz_answers_student WHERE quiz_id IN (
        SELECT quiz_id FROM quizzes WHERE lesson_id IN (
            SELECT lesson_id FROM lessons WHERE course_id = id
        )
    );

    DELETE FROM questions WHERE quiz_id IN (
        SELECT quiz_id FROM quizzes WHERE lesson_id IN (
            SELECT lesson_id FROM lessons WHERE course_id = id
        )
    );

    DELETE FROM quizzes WHERE lesson_id IN (
        SELECT lesson_id FROM lessons WHERE course_id = id
    );

    DELETE FROM lectures WHERE lesson_id IN (
        SELECT lesson_id FROM lessons WHERE course_id = id
    );

    DELETE FROM lessons WHERE course_id = id;
		delete from files where course_id = id;
		delete from courses where course_id = id;
		

    -- Additional delete statements if needed

END;
$$ LANGUAGE plpgsql;



cron.schedule('* 17 * * *', async function () {
  try {
      const deletionThreshold = new Date(new Date().getTime() - 3 * 24 * 60 * 60 * 1000);
      const result = await pool.query(`SELECT course_id FROM courses WHERE ondelete = 'YES' and deletion_timestamp <= $1`, [deletionThreshold]);
      console.log('In the scheduler');
      for (const row of result.rows) {
          console.log('Deleting course with ID:', row.course_id);
          await pool.query('CALL course_delete($1)', [row.course_id]);
      }
  } catch (err) {
      console.error('Error in scheduler:', err);
  }
});


alter table courses add column deletion_timestamp timestamp; 
alter table courses  add column ondelete varchar(255);



 select t.*, (
        select sum(course_price) 
        from courses 
        where course_id IN(
          select course_id 
          from course_teacher
          where teacher_id = t.teacher_id)) as total_revenue, 
        (
          select round(avg(rating),2) 
          from course_teacher_rating 
          where teacher_id = t.teacher_id
        ) as total_rating
        
        
        from teachers t
        where t.teacher_id = 2

(select count(ct2.*) 
 from courses c2 
 join course_teacher ct2 on (c2.course_id=ct2.course_id) 
 where c2.course_id = 46)
 
with T AS 
(select t.teacher_id, count(cs.student_id) as mentored_students, avg(ctr.rating), sum(c.course_price/(select count(ct2.*) 
 from courses c2 
 join course_teacher ct2 on (c2.course_id=ct2.course_id) 
 where c2.course_id = c.course_id))
from teachers t 
	left join course_teacher ct on ct.teacher_id = t.teacher_id 
	left join courses c on c.course_id = ct.course_id  
	left join course_student cs on cs.course_id = c.course_id
	left join course_teacher_rating ctr on ctr.teacher_id = t.teacher_id
where t.teacher_id = 2
group by t.teacher_id) 


select *
from teachers t2 join T using(teacher_id);



CREATE OR REPLACE PROCEDURE course_delete(id INT) AS $$
BEGIN
    DELETE FROM comment_lecture WHERE lecture_id IN (
        SELECT lecture_id FROM lectures WHERE lesson_id IN (
            SELECT lesson_id FROM lessons WHERE course_id = id
        )
    );

    DELETE FROM quiz_answers_student WHERE quiz_id IN (
        SELECT quiz_id FROM quizzes WHERE lesson_id IN (
            SELECT lesson_id FROM lessons WHERE course_id = id
        )
    );

    DELETE FROM questions WHERE quiz_id IN (
        SELECT quiz_id FROM quizzes WHERE lesson_id IN (
            SELECT lesson_id FROM lessons WHERE course_id = id
        )
    );

    DELETE FROM quizzes WHERE lesson_id IN (
        SELECT lesson_id FROM lessons WHERE course_id = id
    );

    DELETE FROM lectures WHERE lesson_id IN (
        SELECT lesson_id FROM lessons WHERE course_id = id
    );

    DELETE FROM lessons WHERE course_id = id;
		delete from files where course_id = id;
		delete from courses where course_id = id;
		

    -- Additional delete statements if needed

END;
$$ LANGUAGE plpgsql;

alter table courses add column deletion_timestamp timestamp; 
alter table courses  add column ondelete varchar(255);

select * from courses;
update courses set ondelete = 'NO';


create or replace procedure quiz_delete (id INT) as $$
begin 
  delete from quiz_answers_student 
	where quiz_id = id; 
	
	delete from questions 
	where quiz_id = id; 
	
	
	delete from quizzes 
	where quiz_id = id;
end;  
$$ LANGUAGE plpgsql;



CREATE OR REPLACE procedure delete_teacher(user_id INT) AS $$
DECLARE
    new_username VARCHAR(50);
    new_password VARCHAR(255);
    unique_part VARCHAR(32);
BEGIN
    -- Generate a random password (12 characters)
    new_password := '';
    FOR i IN 1..12 LOOP
        new_password := new_password || CHR(65 + FLOOR(RANDOM() * 26));
    END LOOP;

    -- Generate a unique part for the username using md5 hash
    SELECT md5(user_id || '-' || NOW()::TEXT) INTO unique_part;
	
	--course_teacher has cascading delete
    -- Concatenate username with unique part
    new_username := 'deletedUser#' || unique_part;

    -- Update the username and password in the users table
    UPDATE users SET 
        username = new_username,
        password = new_password,
		is_delete = TRUE
    WHERE id = user_id;

    -- Optionally, you can also update other tables referencing this user, 
    -- such as the teachers table to dissociate them if necessary.

END;
$$ LANGUAGE plpgsql;

DROP PROCEDURE delete_teacher(integer)
CREATE OR REPLACE PROCEDURE delete_teacher(u_id INT) AS $$
DECLARE
    new_username VARCHAR(50);
    new_password VARCHAR(255);
    unique_part VARCHAR(32);
    ascii_value INT;
BEGIN
    -- Generate a random password (12 characters)
    new_password := '';
    FOR i IN 1..12 LOOP
        -- Generate a random ASCII value for uppercase letters (65 to 90)
        ascii_value := 65 + FLOOR(RANDOM() * 26);
        
        -- Convert ASCII value to character and concatenate to new_password
        new_password := new_password || CHR(ascii_value);
    END LOOP;

    -- Generate a unique part for the username using md5 hash
    SELECT LEFT(md5(u_id || '-' || NOW()::TEXT), 10) INTO unique_part;
	
    -- Concatenate username with unique part
    new_username := 'deletedUser#' || unique_part;

    -- Update the username, password, and is_deleted flag in the users table
    UPDATE users SET 
        username = new_username,
        password = new_password,
		user_photo = NULL
    WHERE id = u_id;
	
	--get teacher_id 
	  -- Print the new password and username
    RAISE NOTICE 'New Password: %', new_password;
    RAISE NOTICE 'New Username: %', new_username;

	UPDATE teachers t SET 
		is_deleted = TRUE
	WHERE t.user_id = u_id;

    -- Optionally, you can also update other tables referencing this user, 
    -- such as the teachers table to dissociate them if necessary.

END;
$$ LANGUAGE plpgsql;


select * from course_student;

select * from users;

-- Add a column to indicate deletion status in the teachers table
ALTER TABLE users
ADD COLUMN is_deleted BOOLEAN DEFAULT FALSE;

call delete_teacher(7);

select * from students;

ALTER TABLE course_student
ALTER COLUMN join_date SET DEFAULT CURRENT_DATE;

update course_student set join_date = '3-3-2024' where student_id = 21


select * from users;
select * from teachers

select * from course_teacher_rating;


delete from course_teacher_rating where teacher_id is null;




CREATE OR REPLACE FUNCTION public.get_quiz_marks(
	student_id_param integer,
	course_id_param integer)
    RETURNS jsonb
    LANGUAGE 'plpgsql'
    COST 100
    VOLATILE PARALLEL UNSAFE
AS $BODY$
DECLARE
    quiz_marks JSONB := '[]'::JSONB;
    quiz_info RECORD;
BEGIN
    -- Loop through each quiz in the given course
    FOR quiz_info IN
        SELECT quizzes.quiz_no, quiz_students.marks
		FROM quizzes
		LEFT JOIN quiz_students ON quizzes.quiz_id = quiz_students.quiz_id
		WHERE quizzes.course_id = course_id_param AND  quiz_students.student_id = student_id_params
    LOOP
        -- Initialize the JSON object for the quiz
        quiz_marks := quiz_marks || jsonb_build_array(
            jsonb_build_object(
                'quiz_number', quiz_info.quiz_no,
                'marks', CASE WHEN quiz_info.marks IS NULL THEN 0 ELSE quiz_info.marks END
            )
        );
    END LOOP;

    RETURN quiz_marks;
END;
$BODY$;


select * from quiz_students;


   SELECT quizzes.quiz_no, quiz_students.marks
		FROM quizzes
		LEFT JOIN quiz_students ON quizzes.quiz_id = quiz_students.quiz_id AND quiz_students.student_id = 13
		WHERE quizzes.course_id = 46

select * from lessons;



select * from quizzes;
select * from quiz_students;
select * from quiz_answers_students;
select * from questions;


alter table quizzes add column status varchar(100) default 'APPROVED'


alter table quizzes drop column status
update 


call quiz_delete(24)

--quiz no update again

CREATE OR REPLACE PROCEDURE public.quiz_delete(
    IN id integer,
    IN c_id integer)
LANGUAGE 'plpgsql'
AS $BODY$
DECLARE
    q_no integer;
    R RECORD;
BEGIN
    -- Update the status of the quiz
    UPDATE quizzes SET status = 'DECLINED' WHERE quiz_id = id;
    
    -- Get the quiz_no
    SELECT quiz_no INTO q_no FROM quizzes WHERE quiz_id = id;
    
    -- Loop through quizzes with the same course_id and adjust quiz_no
    FOR R IN SELECT * FROM quizzes WHERE course_id = c_id ORDER BY quiz_no
    LOOP
        IF R.quiz_no > q_no THEN
            UPDATE quizzes SET quiz_no = R.quiz_no - 1 WHERE quiz_id = R.quiz_id;
        END IF;
    END LOOP;
    
END;
$BODY$;



CREATE OR REPLACE FUNCTION check_course_limit()
RETURNS TRIGGER AS $$
BEGIN
    IF (SELECT COUNT(*) FROM courses WHERE teacher_id = NEW.teacher_id) >= 10 THEN
        RAISE EXCEPTION 'Teacher cannot launch more than 10 courses';
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;



CREATE TRIGGER course_limit_trigger
BEFORE INSERT ON courses
FOR EACH ROW
EXECUTE FUNCTION check_course_limit();





select * from users;
select * from teahcers;
select * from students;
select * from lectures;
select * from files;
select * from blogs;
select * from blog_comments;
select * from lessons;
select * from course_teacher;
select * from questions;
select * from quiz_answer_students;
select * from quizzes;
select * from quiz_students;
select * from courses;
select * from course_teacher_rating;
select * from comment_lecture;
select * from course_student;
select * from course_teacher;
