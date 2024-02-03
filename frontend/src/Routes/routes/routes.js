import { createBrowserRouter } from "react-router-dom";

import Main from "../../layout/Main";
import Register from "../../pages/Login/Register";
import ErrorPage from "../../pages/ErrorPage";
import Login from "../../pages/Login/Login";
import Home from "../../pages/Home/Home";
import SingleCourse from "../../pages/Courses/SingleCourse";
import About from "../../pages/About/About";
import AddCourses from "../../pages/CourseTeacher/AddCourses";
import Profile from "../../pages/Student/Profile";
import LoginLayout from "../../layout/LoginLayout";
import TeacherLogin from "../../pages/Login/TeacherLogin";
import TeacherRegister from "../../pages/Login/TeacherRegister";
import CorusePage from "../../pages/Courses/CoursePage";
import BlogsPage from "../../pages/Blogs/BlogsPage";
import StudentDashboard from "../../pages/Student/StudentDashboard";
import TeacherDashboard from "../../pages/Teacher/TeacherDashboard";
import CourseMain from "../../shared/CourseMain/CourseMain";
import LessonPage from "../../shared/CourseMain/LessonPage";
import LessonsLayout from "../../layout/LessonsLayout";
import LecturesPage from "../../shared/CourseMain/LecturePage/LecturesPage";


export const routes = createBrowserRouter([
    {
        path:'/',
        element:<Main></Main>,
        children:[
            {
                path:'/',
                element:<Home></Home>
            },
            {
                path: '/blogs',
                element:<BlogsPage></BlogsPage>
            },
            {
                path: '/about',
                element:<About></About>
            },
            {
                path:'/student/dashboard',
                element:<StudentDashboard></StudentDashboard>
            },
            {
                path:'/teacher/dashboard',
                element:<TeacherDashboard></TeacherDashboard>
            },
            {
                path:'/addcourses',
                element: <AddCourses></AddCourses>
            },
            {
                path:'/courses',
                element:<CorusePage></CorusePage>
            },
            {
                path:'courses/:id',
                element:<SingleCourse></SingleCourse>,
                loader:({params})=> fetch(`http://localhost:5002/courses/${params.id}`)
            },
            {
                path:'courses/main/:id',
                element:<CourseMain></CourseMain>,
                loader:({params})=> fetch(`http://localhost:5002/courses/${params.id}`)
            },
            {
                path:'profile/:id',
                element:<Profile></Profile>,
                loader:({params})=> fetch(`http://localhost:5002/user/${params.id}`)
            },
           
            {
                path:'/teacher-register',
                element:<TeacherRegister></TeacherRegister>
            },
            {
                path: '/lessons/:id',
                element: <LessonPage></LessonPage>,
                loader:({params})=> fetch(`http://localhost:5002/lectures/${params.id}`)
            }
        ]
    },
    {//layout for login and authentication
        path:'/auth',
        element:<LoginLayout></LoginLayout>,
        children:[
            {
                path:'/auth/login',
                element:<Login></Login>
            },
            {
                path:'/auth/register',
                element:<Register></Register>
            },
            // {
            //     path:'/teacherlogin',
            //     element:<TeacherLogin></TeacherLogin>
            // }
        ]
    },
    {//layout for lessons page and lecture display
        path: '/lessons/:id',
        element: <LessonsLayout></LessonsLayout>,
        loader:({params})=> fetch(`http://localhost:5002/lectures/${params.id}`),
        children: [
            {
                path: '/lessons/:id',
                element: <LessonPage></LessonPage>,
                // loader:({params})=> fetch(`http://localhost:5002/lecture/${params.id}`)
            },
            {
                path: '/lessons/:id/lecture/:lecture_id',
                element: <LecturesPage></LecturesPage>,
                loader:({params})=> fetch(`http://localhost:5002/lecture/${params.lecture_id}`)
            }
        ]
    },
    {
        path:'*',
        element:<ErrorPage></ErrorPage>
    }
])