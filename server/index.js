const express = require('express');
const cors = require('cors');
const pool = require('./src/config/db');
// const bcrypt = require('bcrypt');
const multer = require('multer');

const port = process.env.PORT || 5002;
const jwt = require('jsonwebtoken');
const { cloneDeep } = require('lodash');

require('dotenv').config();
const app = express();

//middleware
app.use(cors());
app.use(express.json());

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    return cb(null, './public/images');
  },
  filename: function (req, file, cb) {
    return cb(null, file.originalname);
  }
});

const upload = multer({ storage: storage });
// //verifying jwt token 
// function verifyJWT(req, res, next){
//     // next()
//     const authHeader = req.headers.authorization;
//     if(!authHeader){
//         // res.send({message: 'unauthorized access'})
//         res.status(401).send({message: 'unauthorized access'})
//     }
//     const token = authHeader.split(' ')[1];
//     jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, function(err ,decoded){
//         if(err){
//             res.status(401).send({message: 'forbidden access'})
//         }
//         req.decoded = decoded;
//         next();
//     })
// }


async function run() {
  try {
    //   app.post('/jwt', (req, res) =>{
    //     const user = req.body;
    //     console.log(user);
    //     const token = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {expiresIn: '5h'})
    //     res.send({token})

    //     //sending the token as an objext the property is token and the value is also token
    //     // res.send({token});
    // })

    /*************************
             *    Authentication
             *************************/
    // Endpoint to handle PATCH request to update data in users and teachers tables
    app.patch('/update/teacherProfile/:teacherId', async (req, res) => {
      console.log("hello");
      try {
        const { userId, teacherId } = req.params;
        const { date_of_birth, country, city, years_of_experience, institution, mentored_students, teacher_description } = req.body;
        console.log(date_of_birth, country, city, years_of_experience, institution, teacher_description);
        // Update user data
        const userUpdateQuery = `
              UPDATE users 
              SET date_of_birth = COALESCE($1, date_of_birth), country = COALESCE($2, country), city = COALESCE($3, city)
              WHERE id = $4`;
        const userUpdateValues = [date_of_birth, country, city, userId];
        await pool.query(userUpdateQuery, userUpdateValues);

        // Update teacher data
        const teacherUpdateQuery = `
              UPDATE teachers 
              SET years_of_experience = COALESCE($1, years_of_experience), institution = COALESCE($2, institution), 
                  mentored_students = COALESCE($3, mentored_students), teacher_description = COALESCE($4, teacher_description)
              WHERE teacher_id = $5`;
        const teacherUpdateValues = [years_of_experience, institution, mentored_students, teacher_description, teacherId];
        await pool.query(teacherUpdateQuery, teacherUpdateValues);

        res.status(200).json({ success: true, message: 'User and teacher data updated successfully' });
      } catch (error) {
        console.error('Error updating user and teacher data:', error);
        res.status(500).json({ success: false, message: 'Error updating user and teacher data' });
      }
    });

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
        const newTeacher = await pool.query(
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


    // Login API endpoint
    app.post('/login', async (req, res) => {
      const { email, password } = req.body;
      try {
        // Check if the user with the provided email and password exists
        const user = await pool.query(
          'SELECT * FROM users WHERE users.email = $1 AND users.password = $2',
          [email, password]
        );

        //get the user role
        const role = user?.rows[0]?.role;
        console.log(role);
        const userId = user?.rows[0]?.id;
        console.log(userId);

        if (role === 'student') {
          const result = await pool.query(
            'SELECT u.*, s.* FROM users u JOIN students s ON $1 = s.user_id WHERE u.id = $1', [userId]
          );
          if (result.rows.length === 1) {
            // User found, authentication successful
            const studentUser = result.rows[0];
            console.log(studentUser)
            res.json({ success: true, message: 'Authentication successful', user: studentUser });
          } else {
            res.status(401).json({ success: false, message: 'Invalid email or password' });
          }
        } else if (role === 'teacher') {
          const result = await pool.query(//$1 = s.user_id WHERE u.id = $1',[userId]
            'SELECT u.*, t.* FROM users u JOIN teachers t ON $1 = t.user_id WHERE u.id = $1', [userId]
          );
          console.log(result.rows[0])
          console.log(result.rows.length)
          if (result.rows.length === 1) {
            // User found, authentication successfu
            const teacherUser = result.rows[0];
            res.json({ success: true, message: 'Authentication successful', user: teacherUser });
          } else {
            res.status(401).json({ success: false, message: 'Invalid email or password' });
          }
        } else {
          const result = await pool.query(
            `SELECT * from users where id = $1`, [userId]
          );
          const adminUser = result.rows[0];
          res.json({ success: true, message: 'Authentication successful', user: adminUser });
        }

      } catch (error) {
        console.error('Error during login:', error);
        res.status(500).json({ success: false, message: 'Internal server error' });
      }
    });

    /*************************
         *    User
         *************************/
    //get all users
    app.get("/users", async (req, res) => {
      try {
        const allUsers = await pool.query("SELECT * FROM users");
        res.json(allUsers.rows);
      } catch (err) {
        console.error(err.message);
      }
    });
    //get a particular user
    app.get("/users/:user_id", async (req, res) => {
      const user_id = req.params.user_id;
      console.log(user_id)
      try {
        const user = await pool.query("SELECT * FROM users WHERE id = $1", [user_id]);

        if (user.rows.length === 1) {
          res.json(user.rows[0]);
        } else {
          res.json([]);
        }

      } catch (err) {
        console.error(err.message);
        res.status(500).json({ message: 'Internal server error' });
      }
    });

    // Upload photo
    app.patch('/upload/image/:user_id', upload.single('file'), async (req, res) => {
      const { path } = req.file;
      const user_id = req.params.user_id;
      console.log(path);
      // Check if a file was provided
      if (!req.file) {
        return res.status(400).send('No file uploaded');
      }
      try {
        const query = `
            UPDATE users 
            SET user_photo = COALESCE($1, user_photo)
            WHERE id = $2`;
        const values = [path, user_id];

        const result = await pool.query(query, values);

        console.log("upload called");
        res.status(200).send('File uploaded successfully');
      } catch (error) {
        console.error('Error uploading file:', error);
        res.status(500).send('Error uploading file');
      }

    });

    /*************************
        *  TEACHER
        *************************/
    //get courses that teacher teaches 
    app.get('/teacher-courses/:userId', async (req, res) => {
      const userId = req.params.userId;
      const teacherId = await pool.query('select teacher_id from teachers where user_id = $1', [userId]);

      try {
        const result = await pool.query(
          'SELECT courses.* FROM courses ' +
          'JOIN course_teacher ON courses.course_id = course_teacher.course_id ' +
          'WHERE course_teacher.teacher_id = $1',
          [teacherId.rows[0].teacher_id]
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
                select user_id from teachers where teacher_id = course_teacher.teacher_id
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


    //teacherInfo and courses he teacher for his profile page
    app.get('/user/teacher/:teacher_id', async (req, res) => {
      try {
        const teacher_id = req.params.teacher_id;
        const query = `SELECT * 
            FROM users U 
            JOIN teachers T ON (U.id = T.user_id) 
            WHERE T.teacher_id = $1`;
        const values = [teacher_id];
        const userResult = await pool.query(query, values);

        const query2 = `SELECT * 
            FROM teachers T 
            JOIN course_teacher CT ON ($1 = CT.user_id) 
            JOIN courses C ON C.course_id = CT.course_id 
            WHERE T.teacher_id = $1`;
        const values2 = [teacher_id];
        const coursesResult = await pool.query(query2, values2);


        res.json({ user: userResult.rows[0], courses: coursesResult.rows });
      } catch (error) {
        console.error('Error fetching files:', error);
        res.status(500).send('Error fetching files');
      }
    });

    /*************************
        *  COLLABORATIONS
        *************************/
    //       // Deny invitation to collaborate
    //       app.post('/course/invite/deny', async(req, res) => {
    //         try {
    //             const project_id = req.body.project_id;
    //             const user_id = req.body.user_id;

    //             await pool.query(
    //                 `
    //                 DELETE FROM project_user WHERE project_id = $1 AND user_id = $2
    //                 `, [project_id, user_id]
    //             );

    //             res.json({message: `Invitation denied`});

    //         } catch (error) {
    //             console.error('error executing query: ', error);
    //             res.status(500).json({ error: 'Internal Server Error' });
    //         }
    //     });

    //      // Accept collaborator invitation
    //   app.post('/course/invite/accept', async(req, res) => {
    //     try {

    //         const project_id = req.body.project_id;
    //         const user_id = req.body.user_id;
    //         await pool.query(
    //             `
    //             UPDATE project_user SET is_approved = 'APPROVED'
    //             WHERE project_id = $1 AND user_id = $2
    //             `, [project_id, user_id]
    //         );

    //         res.json({message: `Accepted`});

    //     } catch (error) {
    //         console.error('error executing query: ', error);
    //         res.status(500).json({ error: 'Internal Server Error' });
    //     }
    // });

    //  // API endpoint to search for users by username
    //  app.get('/users/search/:username', async (req, res) => {
    //     const username = req.params.username;

    //     try {
    //     const query = 'SELECT * FROM users WHERE username LIKE $1';
    //     const result = await pool.query(query, [`%${username}%`]);

    //     // if (result.rowCount === 0) {
    //     //     // If no user found with the provided username
    //     //     // return res.status(404).json({ message: 'No users found' });
    //     // }

    //     // If users found, send the user data
    //     res.json(result.rows)
    //     } catch (error) {
    //     console.error('Error searching for user:', error);
    //     res.status(500).json({ message: 'Internal server error' });
    //     }
    // });

    //   // Approve collaborator
    //   app.post('/course/invite/approve', async(req, res) => {
    //       try {

    //           const project_id = req.body.project_id;
    //           const user_id = req.body.user_id;

    //           await pool.query(
    //               `
    //               UPDATE project_user SET is_approved = 'APPROVED'
    //               WHERE project_id = $1 AND user_id = $2
    //               `, [project_id, user_id]
    //           );

    //           res.json({message: `Approved`});

    //       } catch (error) {
    //           console.error('error executing query: ', error);
    //           res.status(500).json({ error: 'Internal Server Error' });
    //       }
    //   });

    //       // invite collaborators
    //       app.post('/course/invite', async(req, res) => {
    //         try {

    //             const project_id = req.body.project_id;
    //             const user_id = req.body.user_id;
    //             console.log(project_id, user_id);
    //             const is_approved = "INVITED";

    //             await pool.query(
    //                 `
    //                 INSERT INTO project_user (project_id, user_id, is_approved) VALUES ($1, $2, $3)
    //                 `, [project_id, user_id, is_approved]
    //             );

    //             res.json({message: `Invited`});

    //         } catch (error) {
    //             console.error('error executing query: ', error);
    //             res.status(500).json({ error: 'Internal Server Error' });
    //         }
    // });
    /*************************
        *  STUDENT
        *************************/
    //courses for a particular student
    app.get('/student-courses/:userId', async (req, res) => {
      const userId = req.params.userId;
      try {
        const studentId = await pool.query('SELECT student_id FROM students WHERE user_id = $1', [userId]);
        const result = await pool.query(
          'SELECT courses.* FROM courses ' +
          'JOIN course_student ON courses.course_id = course_student.course_id ' +
          'WHERE course_student.student_id = $1',
          [studentId.rows[0].student_id]
        );

        const courses = result.rows;

        res.json({ courses: courses });
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
        const { course_id, user_id } = req.body;
        console.log(user_id);
        const student_id = await pool.query('SELECT student_id FROM students WHERE user_id = $1', [user_id]);
        console.log(student_id.rows[0].student_id)
        // Insert into course_student table
        const enrollmentResult = await pool.query(
          'INSERT INTO course_student (course_id, student_id) VALUES ($1, $2) RETURNING *',
          [course_id, student_id.rows[0].student_id]
        );

        res.json(enrollmentResult.rows[0].student_id);
      } catch (error) {
        console.error('Error enrolling student:', error.message);
      }
    });

    /*************************
         *    Lessons
         *************************/
    app.post('/upload', upload.single('file'), async (req, res) => {
      const { originalname, path } = req.file;
      const { user_id, project_id, commit_message } = req.body;
      // Check if a file was provided
      if (!req.file) {
        return res.status(400).send('No file uploaded');
      }
      try {

        const query = 'INSERT INTO submission (commit_id, user_id, project_id, file_path) VALUES ($1, $2, $3, $4, $5) RETURNING *';
        const values = [commitId, user_id, project_id, req.file?.originalname, req.file?.path];

        console.log("upload called");
        const result = await pool.query(query, values);
        res.status(200).send('File uploaded successfully');
      } catch (error) {
        console.error('Error uploading file:', error);
        res.status(500).send('Error uploading file');
      }
    });
    app.post('/lessons', upload.single('file'), async (req, res) => {
      try {
        const { title, lesson_description, teacher_id, course_id } = req.body;
        const { originalname, path } = req.file;
        // Check if teacher_id and course_id exist in the database
        const teacherResult = await pool.query('SELECT * FROM teachers WHERE teacher_id = $1', [teacher_id]);
        const courseResult = await pool.query('SELECT * FROM courses WHERE course_id = $1', [course_id]);

        if (teacherResult.rows.length === 0 || courseResult.rows.length === 0) {
          return res.status(404).json({ error: 'Teacher or Course not found' });
        }

        const insertQuery = `
      INSERT INTO lessons (course_id, teacher_id, title, lesson_description, lesson_pdf)
      VALUES ($1, $2, $3, $4, $5)
      RETURNING *;
    `;

        const result = await pool.query(insertQuery, [course_id, teacher_id, title, lesson_description, path]);

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

        // Check if teacher_id and course_id exist in the database
        // const teacherResult = await pool.query('SELECT * FROM teachers WHERE teacher_id = $1', [teacher_id]);
        const courseResult = await pool.query('SELECT * FROM courses WHERE course_id = $1', [course_id]);

        // if (teacherResult.rows.length === 0 || courseResult.rows.length === 0) {
        //   return res.status(404).json({ error: 'Teacher or Course not found' });
        // }

        // Fetch lessons based on teacher_id and course_id
        const fetchQuery = `
      SELECT * FROM lessons
      WHERE course_id = $1
    `;

        const result = await pool.query(fetchQuery, [course_id]);

        res.status(200).json(result.rows);
      } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
      }
    });

    // get a particulat lesson for a course using lesson_id
    app.get('/lesson/:lesson_id', async (req, res) => {
      console.log('insdies lesosn ')
      const lesson_id = req.params.lesson_id;
      try {
        const result = await pool.query('SELECT * FROM lessons WHERE lesson_id = $1', [lesson_id]);

        res.status(200).json(result.rows);
      } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
      }
    });

    // delete a lesson from a course
    app.delete('/lessons/:lesson_id', async (req, res) => {
      const course_id = req.params.course_id;
      try {
        const courseResult = await pool.query('SELECT * FROM courses WHERE lesson_id = $1', [course_id]);
        const fetchQuery = `
      DELETE FROM table_name
      WHERE condition;
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
        console.log(result.rows[0])

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
      WHERE lesson_id = $1
    `;

        const result = await pool.query(fetchQuery, [lesson_id]);
        if (result.rows.length === 0) {
          res.status(200).json([{ lesson_id: lesson_id }]);
        } else {
          res.status(200).json(result.rows);
        }

      } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
      }
    });

    //insert lectures
    // app.post('/lecture/:lesson_id', async (req, res) => {
    //   const lesson_id = req.params.lesson_id;
    //   try {
    //     const { video_link, pdf_note } = req.body;
    //     // Insert the new lecture into the lectures table
    //     const insertQuery = `
    //       INSERT INTO lectures (lesson_id, video_link, pdf_note)
    //       VALUES ($1, $2, $3)
    //       RETURNING *;
    //     `;

    //     const result = await pool.query(insertQuery, [lesson_id, video_link, pdf_note]);

    //     res.status(201).json(result.rows[0]);
    //   } catch (error) {
    //     console.error(error);
    //     res.status(500).json({ error: 'Internal Server Error' });
    //   }
    // });

    app.post('/lecture', async (req, res) => {
      try {
        const { lesson_id, video_link, lecture_title } = req.body;
        console.log(lesson_id, video_link, lecture_title);
        const newLecture = await pool.query(
          "INSERT INTO lectures (lesson_id,video_link,lecture_title) VALUES($1,$2,$3) RETURNING *",
          [lesson_id, video_link, lecture_title]
        );
        res.json(newLecture.rows[0]);
      } catch (err) {
        console.error(err.message);
      }
    })

    /*************************
         *    Lecture Comments
         *************************/
    // Endpoint to get comments and user information by lecture_id
    app.get('/lecture/comments/:lecture_id', async (req, res) => {
      try {
        const { lecture_id } = req.params;
        console.log(lecture_id)
        const parsedLectureId = parseInt(lecture_id, 10);
        console.log(parsedLectureId)

        const fetchQuery = `
      SELECT
        c.comment_id,
        c.description,
        u.id AS user_id,
        u.username,
        u.role,
        u.user_photo
      FROM comment_lecture c
      JOIN users u ON c.user_id = u.id
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

    // app.get("/lecture/comments", async (req, res) => {
    //   console.log('okay');
    //   try {
    //     const { lecture_id, user_id, description} = req.body;
    //     const newComment = await pool.query(
    //       "INSERT INTO comment_lecture (lecture_id, user_id, description) VALUES($1, $2, $3) RETURNING *",
    //       [lecture_id, user_id, description]
    //     );
    //     res.json(newComment.rows[0]);
    //   } catch (err) {
    //     console.error(err.message)
    //   }
    // });
    app.post("/lecture-comment", async (req, res) => {
      console.log('okay');
      try {
        const { lecture_id, user_id, description } = req.body;
        const newComment = await pool.query(
          "INSERT INTO comment_lecture (lecture_id, user_id, description) VALUES($1, $2, $3)",
          [lecture_id, user_id, description]
        );
        res.json({ message: "inserted " });
      } catch (err) {
        console.error(err.message);
      }
    });

    /*************************
         *    Courses
         *************************/
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
    //endpoint for adding a course
    app.post("/courses", async (req, res) => {
      try {
        const { teacher_id, course_name, course_description, course_price, category, duration, image_url } = req.body;
        const course_status = 'PENDING';
        const newCourse = await pool.query(
          "INSERT INTO courses (course_name, course_description, course_price, duration, image_url, course_status, teacher_id, category) VALUES($1,$2,$3,$4,$5,$6,$7,$8) RETURNING *",
          [course_name, course_description, course_price, duration, image_url, course_status, teacher_id, category]
        );
        res.json(newCourse.rows[0]);
      }
      catch (err) {
        console.error(err.message);
      }
    });
    //get a particular course
    app.get("/courses/:course_id", async (req, res) => {
      try {
        const courseId = req.params.course_id;
        const course = await pool.query(
          `SELECT * 
              FROM courses 
              WHERE course_id = $1`,
          [courseId]);

        if (course.rows.length === 1) {
          res.json(course.rows[0]);
        } else {
          res.status(404).json({ message: 'Course not found' });
        }
      } catch (err) {
        console.error(err.message);
        res.status(500).json({ message: 'Internal server error' });
      }
    });
    //update a course
    app.put("/courses/:id", async (req, res) => {
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
        res.status(500).json({ message: 'Internal server error' });
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


    /*************************
         *    BLOGS
         *************************/

    app.post("/blog_comments", async (req, res) => {
      console.log('okay');
      try {
        const { blog_id, user_id, comment_text } = req.body;
        const newComment = await pool.query(
          "INSERT INTO blog_comments (blog_id, user_id, comment_text) VALUES($1, $2, $3) RETURNING *",
          [blog_id, user_id, comment_text]
        );
        res.json(newComment.rows[0]);
      } catch (err) {
        console.error(err.message);
      }
    });

    // creating blog_child_comments 
    app.post("/blog_comments_child/", async (req, res) => {
      try {
        const { blog_id, user_id, comment_text, parent_comment_id } = req.body;
        const newComment = await pool.query(
          "INSERT INTO blog_comments (blog_id, user_id, comment_text, parent_comment_id) VALUES($1, $2, $3, $4) RETURNING *",
          [blog_id, user_id, comment_text, parent_comment_id]
        );
        res.json(newComment.rows[0]);
      }
      catch (err) {
        console.error(err.message);
      }
    });

    //get child_comments 
    app.get("/blog_comments_child/:id", async (req, res) => {
      try {
        const allChildComments = await pool.query("SELECT * FROM blog_comments WHERE parent_comment_id = $1", [req.params.id]);
        console.log('childs');
        res.json(allChildComments.rows);
      } catch (err) {
        console.error(err.message);
      }
    });


    app.get("/blog_comments/:id", async (req, res) => {
      try {
        const allBlogComments = await pool.query("SELECT * FROM blog_comments WHERE blog_id = $1 and parent_comment_id is null", [req.params.id]);
        res.json(allBlogComments.rows);
      } catch (err) {
        console.error(err.message);
      }
    });

    app.get('/blogs', async (req, res) => {
      try {
        const allBlogs = await pool.query("SELECT * FROM blogs");
        res.json(allBlogs.rows);
      } catch (err) {
        console.error(err.message);
      }
    });

    app.post('/blogs', async (req, res) => {
      const user_id = req.body.user_id;
      const blog_content = req.body.blog_content;
      const blog_title = req.body.blog_title;
      const blog_category = req.body.blog_category;

      try {
        const allBlogs = await pool.query(`
          INSERT INTO blogs 
          (user_id, blog_content, blog_title, blog_category)
          VALUES
          ($1, $2, $3, $4)
          `, [user_id, blog_content, blog_title, blog_category]);

        res.json({ message: "successfully inserted" });
      } catch (err) {
        res.status(500).json({ message: 'Internal server error' });
        console.error(err.message);
      }
    });

    //get a specific blog
    app.get("/blogs/:id", async (req, res) => {
      // console.log(req.params);
      const blogId = req.params.id;

      try {
        const blog = await pool.query("SELECT * FROM blogs WHERE blog_id = $1", [blogId]);
        // console.log(course);
        if (blog.rows.length === 1) {
          res.json(blog.rows[0]);
        } else {
          res.status(404).json({ message: 'Blog not found' });
        }

      } catch (err) {
        console.error(err.message);
        // res.status(500).json({ message: 'Internal server error' });
      }
    });
    /*****************************8
     *  //admin approval of courses 
     */


    app.get('/pendingCourses', async (req, res) => {
      const course_status = 'PENDING';
      try {
        const result = await pool.query('SELECT * FROM COURSES WHERE course_status = $1', [course_status]);
        res.json(result.rows);
      } catch (err) {
        console.error(err.message);
      }

    })


    //approve a course
    app.put('/courses/approve/:id', async (req, res) => {
      try {
        const { id } = req.params;
        const approveCourse = await pool.query("UPDATE COURSES SET course_status = 'APPROVED' WHERE course_id = $1", [id]);
        const teacher_id = await pool.query('SELECT teacher_id FROM courses WHERE course_id = $1', [id]);
        const teacherId = teacher_id.rows[0].teacher_id;
        const query = await pool.query('INSERT INTO course_teacher (course_id, teacher_id, status) VALUES ($1, $2,$3)', [id, teacherId,'APPROVED']);
        res.json("Course was approved!");
      } catch (err) {
        console.error(err.message);
      }
    });

    //decline a course 

    app.delete('/courses/decline/:id', async (req, res) => {
      try {
        const { id } = req.params;
        const declineCourse = await pool.query("DELETE FROM COURSES WHERE course_id = $1", [id]);
        res.json("Course was declined!");
      } catch (err) {
        console.error(err.message);
      }
    });




  } finally {

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
