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


CREATE OR REPLACE PROCEDURE public.delete_lessons(
	IN id integer)
LANGUAGE 'plpgsql'
AS $BODY$
 
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
end; 
$BODY$;
ALTER PROCEDURE public.delete_lessons(integer)
    OWNER TO postgres;