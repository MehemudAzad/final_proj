import { useContext, useEffect, useState } from "react";
import courseFinder from "../../apis/courseFinder";
import { AuthContext } from "../../context/AuthProvider";
import Course from "../Courses/Course";
import CourseMain from "../../shared/CourseMain/CoursePage/CourseMain";
import CourseTeacherCard from "./CourseTeacherCard";
import AddCourses from "../CourseTeacher/AddCourses";
import Outline from "../../shared/CourseMain/CoursePage/Outline";
import useTitle from "../../hooks/useTitle";

const TeacherDashboard = () => {
    //load the course using course_teacher table
    useTitle('Dashboard');
    const [coursesTeacher, setCoursesTeacher] = useState([])
    const {user} = useContext(AuthContext);
    console.log(user);
    console.log(user?.username);

    useEffect(()=>{
        const fetchData = async () => {
            try {
                const response = await courseFinder.get(`/teacher-courses/${user?.teacher_id}`)
                // const data = await response.json();
                console.log(response?.data?.courses)
                setCoursesTeacher(response?.data?.courses);
            } catch (error) {
                console.log('teacher dashboard : ' + error)
            }
        }
        fetchData()
    }, []);

    console.log(coursesTeacher)
    return ( 
        <div className="p-8">
            <div>
                <h1 className="text-5xl border-3xl">Dashboard</h1>
                <h2 className="mt-3 text-xl">Welcome Back <span className="text-blue-400">{user?.username}</span>, Ready For Your Next Lecture?</h2>
            </div>
            {/* your courses section  */}
            {/* display the tabs */}
            <div role="tablist" className="tabs tabs-lifted py-12">
                <input type="radio" name="my_tabs_2" role="tab" className="tab text-xl  [--tab-bg:bg-blue-200] [--tab-border-color:blue-200]" aria-label="Courses" defaultChecked/>
                <div role="tabpanel" className="tab-content bg-base-100 border-base-300 rounded-box p-6">
                    <section>
                    <div className="w-[75%]">
                        {
                            coursesTeacher.map(course => 
                                <CourseTeacherCard key = {course.course_id} course = {course} />
                            )
                        }
                    </div>
                    
                </section>
                </div>

                <input type="radio" name="my_tabs_2" role="tab" className="tab text-xl [--tab-bg:bg-blue-200] [--tab-border-color:blue-200]" aria-label="AddCourses" />
                <div role="tabpanel" className="tab-content bg-base-100 border-base-300 rounded-box p-6">
                    <AddCourses></AddCourses>
                </div>

                <input type="radio" name="my_tabs_2" role="tab" className="tab text-xl [--tab-bg:bg-blue-200] [--tab-border-color:blue-200]" aria-label="Earnings" />
                <div role="tabpanel" className="tab-content bg-base-100 border-base-300 rounded-box p-6">
                
                </div>
            </div>
            
        </div>
    );
}
 
export default TeacherDashboard;