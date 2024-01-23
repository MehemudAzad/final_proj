const express = require('express');
const cors = require('cors');
const pool = require('./db');

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
        app.get("/users", async (req, res) => {
          try {
            const allUsers = await pool.query("SELECT * FROM users");
            res.json(allUsers.rows);
          } catch (err) {
            console.error(err.message);
          }
        });

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


        app.post("/register", async (req, res) => {
          try {
            const { email, username, password } = req.body;
        
            // Assuming you want to insert the role as 'student'
            const newStudent = await pool.query(
              "INSERT INTO users (role, email, username, password) VALUES('student', $1, $2, $3) RETURNING *",
              [email, username, password]
            );
        
            res.json(newStudent.rows[0]);
          } catch (err) {
            console.error(err.message);
            // res.status(500).send("Internal Server Error");
          }
        });

        app.post("/teacher-register", async (req, res) => {
          try {
            const { email, username, password } = req.body;
        
            // Assuming you want to insert the role as 'student'
            const newStudent = await pool.query(
              "INSERT INTO users (role, email, username, password) VALUES('teacher', $1, $2, $3) RETURNING *",
              [email, username, password]
            );
        
            res.json(newStudent.rows[0]);
          } catch (err) {
            console.error(err.message);
          }
        });

    // Login API endpoint
    app.post('/login', async (req, res) => {
      const { email, password } = req.body;
      try {
        // Check if the user with the provided email and password exists
        const result = await pool.query(
          'SELECT * FROM users WHERE email = $1 AND password = $2',
          [email, password]
        );

        if (result.rows.length === 1) {
          // User found, authentication successful
          const user = result.rows[0];
          res.json({ success: true, message: 'Authentication successful', user });
        } else {
          res.status(401).json({ success: false, message: 'Invalid email or password' });
        }
      } catch (error) {
        console.error('Error during login:', error);
        res.status(500).json({ success: false, message: 'Internal server error' });
      }
    });


    //courses for a particular student
    app.get('/student-courses/:studentId', async (req, res) => {
      const studentId = req.params.studentId;
    
      try {
        const result = await pool.query(
          'SELECT courses.* FROM courses ' +
          'JOIN course_student ON courses.course_id = course_student.course_id ' +
          'WHERE course_student.user_id = $1',
          [studentId]
        );
    
        const courses = result.rows;
    
        res.json({ success: true, courses });
      } catch (error) {
        console.error('Error retrieving student courses:', error);
        res.status(500).json({ success: false, message: 'Internal server error' });
      }
    });

    //student enroll course
    app.post('/enroll', async (req, res) => {
      try {
        const { course_id, user_id } = req.body;
    
        // Insert into course_student table
        const enrollmentResult = await pool.query(
          'INSERT INTO course_student (course_id, user_id) VALUES ($1, $2) RETURNING *',
          [course_id, user_id]
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
    
        //for a new course
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

        app.post("/courses/entry", async (req, res) => {
            try {
                console.log(req.body);
                const {course_name, course_price, course_description, image_url} = req.body;
                const newCourse = await pool.query(
                "INSERT INTO COURSES (course_name, course_price, course_description, image_url) VALUES($1, $2, $3, $4) RETURNING *",
                [course_name, course_price, course_description, image_url]
              );
          
              res.json(newCourse.rows[0]);
            } catch (err) {
              console.error(err.message);
            }
        });
         //get all the courses 
        app.get("/courses", async (req, res) => {
            try {
              const allCourses = await pool.query("SELECT * FROM courses");
              res.json(allCourses.rows);
            } catch (err) {
              console.error(err.message);
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
