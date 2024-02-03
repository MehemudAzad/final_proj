const express = require('express');
const cors = require('cors');
const pool = require('./db');
const bcrypt = require('bcrypt');

const port = process.env.PORT || 5002;
// const jwt = require('jsonwebtoken');

require('dotenv').config();
const app = express();
//middleware
app.use(cors());
app.use(express.json());

 
async function run(){
    try{
        //get all users
        app.get("/users", async (req, res) => {
          try {
            const allUsers = await pool.query("SELECT * FROM users");
            res.json(allUsers.rows);
          } catch (err) {
            console.error(err.message);
          }
        });


        //get a specific user
        app.get("/users/:user_id", async (req, res) => {
          // console.log(req.params);
          const user_id = req.params.course_id;
        
          try {
            const user = await pool.query("SELECT * FROM users WHERE id = $1", [user_id]);
            // console.log(course);
            if (course.rows.length === 1) {
              res.json(user.rows[0]);
            } else {
              res.status(404).json({ message: 'Course not found' });
            }
        
          } catch (err) {
            console.error(err.message);
            // res.status(500).json({ message: 'Internal server error' });
          }
        });


        // //student registration
        // app.post('/register', async (req, res) => {
        //   try {
        //     const { email, username, password } = req.body;

        //     // Hash the password using bcrypt
        //     const hashedPassword = await bcrypt.hash(password, 10);

        //     // Step 1: Insert into the users table
        //     const userResult = await pool.query(
        //       'INSERT INTO users (role, email, username, password) VALUES ($1, $2, $3, $4) RETURNING *',
        //       ['student', email, username, hashedPassword]
        //     );

        //     const userId = userResult.rows[0].id;
        //     const role = userResult.rows[0].role;
        //     // Step 2: If the user is a student, insert into the students table
        //     await pool.query(
        //       'INSERT INTO students (user_id) VALUES ($1)',
        //       [userId]
        //     );

        //     res.json({ success: true, userId });
        //     res.status(201).json({ message: 'User registered successfully' });
        //   } catch (error) {
        //     console.error('Error registering user', error);
        //     res.status(500).send('Internal Server Error');
        //   }
        // });
        // API endpoint for user registration (including student registration)
        app.post('/register', async (req, res) => {
          try {
            const { email, username, password } = req.body;

            // Step 1: Insert into the users table
            const userResult = await pool.query(
              'INSERT INTO users (role, email, username, password) VALUES ($1, $2, $3, $4) RETURNING *',
              ['student', email, username, password]
            );
            const userId = userResult.rows[0].id;
            const role = userResult.rows[0].role;
            // console.log(userId);

            // Step 2: If the user is a student, insert into the students table
            await pool.query(
              'INSERT INTO students (user_id) VALUES ($1)',
              [userId]
            );

            res.json({ success: true, userId });
            res.status(201).json({ message: 'User registered successfully' });
          } catch (error) {
            console.error('Error registering user', error);
            res.status(500).send('Internal Server Error');
          }
        });



        //teacher registration
        app.post("/teacher/register", async (req, res) => {
          try {
            // Assuming you want to insert the role as 'student'
            const { email, username, password } = req.body;

            // Step 1: Insert into the users table
            const newTeacher= await pool.query(
              "INSERT INTO users (role, email, username, password) VALUES('teacher', $1, $2, $3) RETURNING *",
              [email, username, password]
            );
            const userId = newTeacher.rows[0].id;
            console.log(userId);

            // Step 2: If the user is a student, insert into the students table
            await pool.query(
              'INSERT INTO teachers (user_id) VALUES ($1)',
              [userId]
            );

            res.json({ success: true, userId });
            res.status(201).json({ message: 'User registered successfully' });
        
            res.json(newTeacher.rows[0]);
          } catch (err) {
            console.error(err.message);
          }
        });


        // // Check if the user with the provided email and password exists
        // const user = await pool.query(
        //   'SELECT * FROM users WHERE users.email = $1 AND users.password = $2',
        //   [email, password]
        // );        
        
    //   } catch (error) {
    //     console.error('Error during login:', error);
    //     res.status(500).json({ success: false, message: 'Internal server error' });
    //   }
    // });

// Login API endpoint
app.post('/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    // Check if the user with the provided email and password exists
    const user = await pool.query(
      'SELECT * FROM users WHERE users.email = $1 AND users.password = $2',
      [email, password]
    );

    console.log(email + ' ' + password);

    //get the user role
    const role = user?.rows[0]?.role;
    console.log(role);
    const userId = user?.rows[0]?.id;
    console.log(userId);


    if(role === 'student') {
        const result = await pool.query(
          'SELECT u.*, s.* FROM users u JOIN students s ON $1 = s.user_id WHERE u.id = $1',[userId]
        );
        if (result.rows.length === 1) {
          // User found, authentication successful
          const studentUser = result.rows[0];
          console.log(studentUser)
          res.json({ success: true, message: 'Authentication successful', user:studentUser });
        } else {
          console.log(result.rows.length);
          res.status(401).json({ success: false, message: 'Invalid email or password' });
        }
    }else {
        const result = await pool.query(//$1 = s.user_id WHERE u.id = $1',[userId]
          'SELECT u.*, t.* FROM users u JOIN teachers t ON $1 = t.user_id WHERE u.id = $1',[userId]
        );
        console.log(result.rows[0])
        console.log(result.rows.length)
        if (result.rows.length === 1) {
          // User found, authentication successful
          const teacherUser = result.rows[0];
          res.json({ success: true, message: 'Authentication successful', user:teacherUser });
        } else {
          res.status(401).json({ success: false, message: 'Invalid email or password' });
        }
    }
  
  } catch (error) {
    console.error('Error during login:', error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
});
// Login API endpoint




    //courses for a particular student
    app.get('/student-courses/:userId', async (req, res) => {
      const userId = req.params.userId;
    
      try {
        const result = await pool.query(
          `SELECT CC.*
          FROM COURSES CC
          JOIN COURSE_STUDENT CS ON CC.COURSE_ID = CS.COURSE_ID
          WHERE CS.STUDENT_ID = (
            SELECT S.STUDENT_ID 
            FROM STUDENTS S
            WHERE S.USER_ID = $1
         rId]
        ); )`,
          [use
    
        const courses = result.rows;
    
        res.json({ success: true, courses });
      } catch (error) {
        console.error('Error retrieving student courses:', error);
        res.status(500).json({ success: false, message: 'Internal server error' });
      }
    });

    /*************************
    *  student enroll course
    *************************/
    app.post('/enroll', async (req, res) => {
      try {
        const { course_id, student_id } = req.body;
    
        // Insert into course_student table
        const enrollmentResult = await pool.query(
          'INSERT INTO course_student (course_id, student_id) VALUES ($1, $2) RETURNING *',
          [course_id, student_id]
        );
    
        res.json(enrollmentResult.rows[0]);
      } catch (error) {
        console.error('Error enrolling student:', error.message);
      }
    });

    
    
  //   CREATE TABLE course_teacher (
  //     course_id SERIAL REFERENCES courses(course_id),
  //     user_id INT REFERENCES users(id),
  //     PRIMARY KEY (course_id, user_id)
  // );
    
        //get courses that teacher
        // app.post('/teacher-courses', async (req, res) => {
        //   try {
        //     const { course_id, user_id } = req.body;
        
        //     // Insert into course_student table
        //     const enrollmentResult = await pool.query(
        //       'INSERT INTO course_teacher (course_id, user_id) VALUES ($1, $2) RETURNING *',
        //       [course_id, user_id]
        //     );
        
        //     res.json(enrollmentResult.rows[0]);
        //   } catch (error) {
        //     console.error('Error enrolling student:', error.message);
        //   }
        // });
    
        //get courses that teacher teaches 
        app.get('/teacher-courses/:teacherId', async (req, res) => {
          const teacherId = req.params.teacherId;
        
          try {
            const result = await pool.query(
              'SELECT courses.* FROM courses ' +
              'JOIN course_teacher ON courses.course_id = course_teacher.course_id ' +
              'WHERE course_teacher.user_id = $1',
              [teacherId]
            );
        
            const courses = result.rows;
        
            res.json({ success: true, courses });
          } catch (error) {
            console.error('Error retrieving student courses:', error);
            res.status(500).json({ success: false, message: 'Internal server error' });
          }
        });

        // Endpoint to get teachers for a specific course
        app.get('/courses/teachers/:course_id', async (req, res) => {
          const { course_id } = req.params;

          try {
            // Query to retrieve teachers for the given course_id
            const query = `
              SELECT users.*
              FROM users
              JOIN course_teacher ON users.id = (
                SELECT T.user_id 
                FROM TEACHERS T
                WHERE T.TEACHER_ID = course_teacher.TEACHER_ID
              )
              WHERE course_teacher.course_id = $1;
            `;

            const result = await pool.query(query, [course_id]);
            const teachers = result.rows;

            res.json({ teachers });
          } catch (error) {
            console.error('Error retrieving teachers:', error);
            res.status(500).json({ error: 'Internal Server Error' });
          }
        });

/*************************
         *    Lessons
         *************************/
app.post('/lessons', async (req, res) => {
  try {
    const { title, lesson_description, teacher_id, course_id } = req.body;

    // Check if teacher_id and course_id exist in the database
    const teacherResult = await pool.query('SELECT * FROM teachers WHERE teacher_id = $1', [teacher_id]);
    const courseResult = await pool.query('SELECT * FROM courses WHERE course_id = $1', [course_id]);

    if (teacherResult.rows.length === 0 || courseResult.rows.length === 0) {
      return res.status(404).json({ error: 'Teacher or Course not found' });
    }

    // Insert the new lesson into the database
    const insertQuery = `
      INSERT INTO lessons (course_id, teacher_id, title, lesson_description)
      VALUES ($1, $2, $3, $4)
      RETURNING *;
    `;

    const result = await pool.query(insertQuery, [course_id, teacher_id, title, lesson_description]);

    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// get lessons for a course
app.get('/lessons/:course_id', async (req, res) => {
  const course_id = req.params.course_id;
  try {
    // const { teacher_id, course_id } = req.query;

    // Check if teacher_id and course_id exist in the database
    // const teacherResult = await pool.query('SELECT * FROM teachers WHERE teacher_id = $1', [teacher_id]);
    const courseResult = await pool.query('SELECT * FROM courses WHERE course_id = $1', [course_id]);

    // if (teacherResult.rows.length === 0 || courseResult.rows.length === 0) {
    //   return res.status(404).json({ error: 'Teacher or Course not found' });
    // }

    // Fetch lessons based on teacher_id and course_id
    const fetchQuery = `
      SELECT * FROM lessons
      WHERE course_id = $1;
    `;

    const result = await pool.query(fetchQuery, [course_id]);

    res.status(200).json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

/*************************
         *    Lectures
         *************************/
//get a specific lecture by lecture_id
app.get('/lecture/:lecture_id', async (req, res) => {
  try {
    const { lecture_id } = req.params;
    // Fetch the lecture based on lecture_id
    const fetchQuery = `
      SELECT * FROM lectures
      WHERE lecture_id = $1;
    `;

    const result = await pool.query(fetchQuery, [lecture_id]);

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Lecture not found' });
    }

    res.status(200).json(result.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// get lectures of a particular lesson
app.get('/lectures/:lesson_id', async (req, res) => {
  try {
    const lesson_id = req.params.lesson_id;

    // Check if lesson_id exists in the lessons table//redundant
    const lessonResult = await pool.query('SELECT * FROM lessons WHERE lesson_id = $1', [lesson_id]);

    if (lessonResult.rows.length === 0) {
      return res.status(404).json({ error: 'Lesson not found' });
    }

    // Fetch lectures based on lesson_id
    const fetchQuery = `
      SELECT * FROM lectures
      WHERE lesson_id = $1;
    `;

    const result = await pool.query(fetchQuery, [lesson_id]);

    res.status(200).json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

//insert lectures
app.post('/lecture/:lesson_id', async (req, res) => {
  const lesson_id = req.params.lesson_id;
  try {
    const { video_link, pdf_note } = req.body;

    // Check if lesson_id exists in the lessons table
    const lessonResult = await pool.query('SELECT * FROM lessons WHERE lesson_id = $1', [lesson_id]);

    if (lessonResult.rows.length === 0) {
      return res.status(404).json({ error: 'Lesson not found' });
    }

    // Insert the new lecture into the lectures table
    const insertQuery = `
      INSERT INTO lectures (lesson_id, video_link, pdf_note)
      VALUES ($1, $2, $3)
      RETURNING *;
    `;

    const result = await pool.query(insertQuery, [lesson_id, video_link, pdf_note]);

    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

/*************************
         *    Lecture Comments
         *************************/
        // Endpoint to get comments with student and user information by lecture_id
app.get('/comments/:lecture_id', async (req, res) => {
  try {
    const { lecture_id } = req.params;
    console.log(lecture_id)
    const parsedLectureId = parseInt(lecture_id, 10);
    console.log(parsedLectureId)
    // Fetch comments, student, and user information based on lecture_id
    const fetchQuery = `
      SELECT
        c.comment_id,
        c.description,
        s.student_id,
        u.id AS user_id,
        u.username,
        u.role,
        u.user_photo
      FROM comment_lecture c
      JOIN students s ON c.student_id = s.student_id
      JOIN users u ON s.user_id = u.id
      WHERE c.lecture_id = $1;
    `;

    const result = await pool.query(fetchQuery, [lecture_id]);

    if (result.rows.length === 0) {
      return res.status(404).json([]);
    }

    res.status(200).json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


//add a new comment to the comment_lecture table
app.post('/comments', async (req, res) => {
  try {
    const { lecture_id, student_id, description } = req.body;

    // Check if lecture_id and student_id exist in the respective tables
    const lectureResult = await pool.query('SELECT * FROM lectures WHERE lecture_id = $1', [lecture_id]);
    const studentResult = await pool.query('SELECT * FROM students WHERE student_id = $1', [student_id]);

    if (lectureResult.rows.length === 0 || studentResult.rows.length === 0) {
      return res.status(404).json({ error: 'Lecture or Student not found' });
    }

    // Insert the new comment into the comment_lecture table
    const insertQuery = `
      INSERT INTO comment_lecture (lecture_id, student_id, description)
      VALUES ($1, $2, $3)
      RETURNING *;
    `;

    const result = await pool.query(insertQuery, [lecture_id, student_id, description]);

    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

/*************************
         *    Courses
         *************************/
        // API endpoint for adding a course
        app.post('/teacher/add-course', async (req, res) => {
          try {
            const { teacher_id, course_name, course_description, course_price, image_url } = req.body;

            // Step 1: Insert into courses table
            const courseResult = await pool.query(
              'INSERT INTO courses (course_name, course_description, course_price, image_url) VALUES ($1, $2, $3, $4) RETURNING course_id',
              [course_name, course_description, course_price, image_url]
            );

            const courseId = courseResult.rows[0].course_id;

            // Step 2: Insert into course_teacher table
            await pool.query(
              'INSERT INTO course_teacher (course_id, user_id) VALUES ($1, $2)',
              [courseId, teacher_id]
            );

            res.json({ success: true, courseId });
          } catch (error) {
            console.error(error);
            res.status(500).json({ success: false, error: 'Internal Server Error' });
          }
        });

        // //get all the courses 
        app.get("/courses/all", async (req, res) => {
            try {
              const allCourses = await pool.query("SELECT * FROM courses");
              res.json(allCourses.rows);
            } catch (err) {
              console.error(err.message);
            }
        });
        app.get('/courses/search', async (req, res) => {
          const searchTerm = req.query.q;
        
          try {
            const result = await pool.query(
              'SELECT * FROM courses WHERE LOWER(course_name) LIKE $1',
              [`%${searchTerm.toLowerCase()}%`]
            );
        
            res.json(result.rows);
          } catch (error) {
            console.error('Error executing search query:', error);
            res.status(500).json({ error: 'Internal Server Error' });
          }
        });
        
      
        app.get('/totalCourses', async (req, res) => {
          try {
            const result = await pool.query('SELECT COUNT(*) FROM courses');
            console.log(result.rows[0].totalCourses);
            console.log(result.rows[0].count);
            res.json(result.rows[0].count);
          } catch (error) {
            console.error('Error fetching total courses:', error);
            res.status(500).json({ error: 'Internal Server Error' });
          }
        });
        //pagination of courses
        app.get('/courses', async (req, res) => {
          try {
            const { page, pageSize } = req.query;
            const offset = (page - 1) * pageSize;
            const result = await pool.query('SELECT * FROM courses LIMIT $1 OFFSET $2', [pageSize, offset]);
            res.json(result.rows);
          } catch (error) {
            console.error('Error fetching courses:', error);
            res.status(500).json({ error: 'Internal Server Error' });
          }
        });

        //get a particular course
        app.get("/courses/:course_id", async (req, res) => {
          // console.log(req.params);
          const courseId = req.params.course_id;
        
          try {
            const course = await pool.query("SELECT * FROM courses WHERE course_id = $1", [courseId]);
            // console.log(course);
            if (course.rows.length === 1) {
              res.json(course.rows[0]);
            } else {
              res.status(404).json({ message: 'Course not found' });
            }
        
          } catch (err) {
            console.error(err.message);
            // res.status(500).json({ message: 'Internal server error' });
          }
        });

        app.get("/blogs", async (req, res) => {
          try {
            const allBlogs = await pool.query("SELECT * FROM blogs");
            res.json(allBlogs.rows);
          } catch (err) {
            console.error(err.message);
          }
        });
 
        //update a course
        app.put("/courses/:id", async (req, res) => {
            console.log(req.body);
            try {
                const { id } = req.params;
                const { cr_name, cr_price, cr_description, cr_image } = req.body;
                const updateCourse = await pool.query(
                "UPDATE COURSES SET cr_name = $1, cr_price = $2, cr_description = $3, cr_image = $4  WHERE course_id = $5",
                [cr_name, cr_price, cr_description, cr_image, id]
                );
            
                res.json("Course was updated!");
            } catch (err) {
                console.error(err.message);
            }
        });
        
        //delete a course
        app.delete("/courses/:id", async (req, res) => {
            try {
                const { id } = req.params;
                const deleteCourse = await pool.query("DELETE FROM courses WHERE course_id = $1", [
                id
                ]);
                res.json("Course was deleted!");
            } catch (err) {
                console.log(err.message);
            }
        });

    }finally{

    }
    
}

//running the function
run().catch(err => console.error(err));

//testing the server if it's working 
app.get('/', (req, res) => {
    res.send("courses server is running");
})
//listening to the port
app.listen(port, () => {
    console.log(`test server running on ${port}`);
})
