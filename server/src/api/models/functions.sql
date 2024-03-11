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