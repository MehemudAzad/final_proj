import { createBrowserRouter } from "react-router-dom";

import Main from "../../layout/Main";
import Register from "../../pages/Auth/Register";
import ErrorPage from "../../pages/ErrorPage";
import Login from "../../pages/Auth/Login";
import Home from "../../pages/Home/Home";
import SingleCourse from "../../pages/Courses/SingleCourse";
import AddCourses from "../../pages/CourseTeacher/AddCourses";
import Profile from "../../pages/Student/Profile";
import LoginLayout from "../../layout/LoginLayout";
import TeacherLogin from "../../pages/Auth/TeacherLogin";
import TeacherRegister from "../../pages/Auth/TeacherRegister";
import CorusePage from "../../pages/Courses/CoursePage";
import BlogsPage from "../../pages/Blogs/BlogsPage";
import StudentDashboard from "../../pages/Student/StudentDashboard";
import TeacherDashboard from "../../pages/Teacher/TeacherDashboard";
import CourseMain from "../../shared/CourseMain/CoursePage/CourseMain";
import LessonPage from "../../shared/CourseMain/Lessons/LessonPage";
import LessonsLayout from "../../layout/LessonsLayout";
import LecturesPage from "../../shared/CourseMain/LecturePage/LecturesPage";
import TeacherProfile from "../../pages/Teacher/TeacherProfile";
import SingleBlog from "../../pages/Blogs/SingleBlog";
import AddLectures from "../../pages/CourseTeacher/AddLectures";
import AdminDashboard from "../../pages/Admin/AdminDashboard";
import TeacherProfileView from "../../pages/Teacher/TeacherProfileView";
import Notification from "../../pages/Teacher/Notification";
import StudentNotification from "../../pages/Student/StudentNotification";
import CreateQuizPage from "../../pages/Teacher/CreateQuizPage";

export const routes = createBrowserRouter([
  {
    path: "/",
    element: <Main></Main>,
    children: [
      {
        path: "/",
        element: <Home></Home>,
      },
      {
        path: "/blogs",
        element: <BlogsPage></BlogsPage>,
      },
      {
        path: "/blogs/:blog_id",
        element: <SingleBlog></SingleBlog>,
        loader: ({ params }) =>
          fetch(`http://localhost:5002/blogs/${params.blog_id}`),
      },
      {
        path: "/student/dashboard",
        element: <StudentDashboard></StudentDashboard>,
      },
      {
        path: "/teacher/dashboard",
        element: <TeacherDashboard></TeacherDashboard>,
      },
      {
        path: "/teacher/notification",
        element: <Notification></Notification>,
      },
      {
        path: "/student/notification",
        element: <StudentNotification />,
      },
      {
        path: "/admin/dashboard",
        element: <AdminDashboard />,
      },
      {
        path: "/addcourses",
        element: <AddCourses></AddCourses>,
      },
      {
        path: "/courses",
        element: <CorusePage></CorusePage>,
      },
      {
        path: "/courses/:id",
        element: <SingleCourse></SingleCourse>,
        loader: ({ params }) =>
          fetch(`http://localhost:5002/courses/${params.id}`),
      },
      {
        path: "/courses/main/:id",
        element: <CourseMain></CourseMain>,
        loader: ({ params }) =>
          fetch(`http://localhost:5002/courses/${params.id}`),
      },
      {
        path: "/student/profile/:id",
        element: <Profile></Profile>,
        loader: ({ params }) =>
          fetch(`http://localhost:5002/user/${params.id}`),
      },
      {
        path: "/teacher/profile/:teacher_id",
        element: <TeacherProfile></TeacherProfile>,
        loader: ({ params }) =>
          fetch(`http://localhost:5002/user/teacher/${params.teacher_id}`),
      },
      {
        path: "/teacher/profile/view/:teacher_id",
        element: <TeacherProfileView></TeacherProfileView>,
        loader: ({ params }) =>
          fetch(`http://localhost:5002/user/teacher/${params.teacher_id}`),
      },
      {
        path: "/teacher-register",
        element: <TeacherRegister></TeacherRegister>,
      },
      {
        path: "/lessons/:id",
        element: <LessonPage></LessonPage>,
        loader: ({ params }) =>
          fetch(`http://localhost:5002/lectures/${params.id}`),
      },
      {
        path: "/add-lectures/:lesson_id",
        element: <AddLectures></AddLectures>,
        loader: ({ params }) =>
          fetch(`http://localhost:5002/lesson/${params.lesson_id}`),
      },
    ],
  },
  {
    //layout for login and authentication
    path: "/auth",
    element: <LoginLayout></LoginLayout>,
    children: [
      {
        path: "/auth/login",
        element: <Login></Login>,
      },
      {
        path: "/auth/register",
        element: <Register></Register>,
      },
      // {
      //     path:'/teacherlogin',
      //     element:<TeacherLogin></TeacherLogin>
      // }
    ],
  },
  {
    //layout for lessons page and lecture display
    path: "/lessons/:id",
    element: <LessonsLayout></LessonsLayout>,
    loader: ({ params }) =>
      fetch(`http://localhost:5002/lectures/${params.id}`),
    children: [
      {
        path: "/lessons/:id",
        element: <LessonPage></LessonPage>,
        loader: ({ params }) =>
          fetch(`http://localhost:5002/lessons/${params.id}`),
      },
      {
        path: "/lessons/:id/lecture/:lecture_id",
        element: <LecturesPage></LecturesPage>,
        loader: ({ params }) =>
          fetch(`http://localhost:5002/lecture/${params.lecture_id}`),
      },
    ],
  },
  {
    path: "/quiz/create",
    element : <CreateQuizPage></CreateQuizPage>,
    loader : ({params}) => 
      fetch(`http://localhost:5002/courses/${params.id}`)
  },
  {
    path: "*",
    element: <ErrorPage></ErrorPage>,
  },
]);
