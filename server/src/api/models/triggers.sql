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
