import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthProvider";
import MyCourse from "./MyCourse";
import CourseStudentCard from "./CourseStudentCard";

const StudentDashboard = () => {
    const [courses, setCourses] = useState([]);
    const {user, setUser} = useContext(AuthContext);
    // const {courses, setCourses} = useContext(CoursesContext);
    console.log('helo')
    const user_id = user?.id;
    console.log(user_id);
    useEffect(()=>{//http://localhost:5002/student-courses/1
        console.log('hello')
        fetch(`http://localhost:5002/student-courses/${user_id}`)
        .then(res => res.json())
        .then(data =>setCourses(data.courses))
        console.log(courses);
    },[user?.id]);
    
    // console.log(courses);
    // return ( 
    //     <>
    //         <h1>{user?.username}</h1>
    //         <h1>List of courses </h1>
    //         <div>
    //             {  
    //                 courses.map(course => {
    //                     <MyCourse key={course.course_id} course = {course}>
    //                 ) 
    //             }
    //         </div>
    //     </>
    //  );
     return (
        <>
        <div className='text-5xl ml-5  md-10 text-black'>
            All Courses of {user?.username} ( {courses?.length} )
        </div>
        {/* <div className='grid grid-cols-2 bg-white w-[86%] m-auto'>
        {
            courses.map(course => 
                <MyCourse key={course.course_id} course = {course}/>
            )
        }
        </div> */}
          <section className="p-8">
            <div className="w-[75%]">
                {
                    courses?.map(course => 
                        <CourseStudentCard key = {course.course_id} course = {course} />
                    )
                }
            </div>     
        </section>
        </>
        
      )
}
 
export default StudentDashboard;