import { useEffect, useState } from "react";
import ApproveCourse from "./ApproveCourse";
import CourseFiles from "../../shared/CourseMain/CoursePage/CourseFiles";
import Outline from "../../shared/CourseMain/CoursePage/Outline";
import CourseStatistics from "./CourseStatistics";
import TeachersAdmin from "./TeachersAdmin";

const AdminDashboard = () => {
    const [pendingCourses,setpendingCourse] = useState([]);

    const getPendingCourses = () => {
        fetch('http://localhost:5002/pendingCourses')
        .then(res => res.json())
        .then(data => setpendingCourse(data))
    }
    useEffect(()=>{
        getPendingCourses();
    },[]);

    return ( 
        <div className="p-4">
            <div role="tablist" className="tabs tabs-bordered mt-10">
                <input type="radio" name="my_tabs_1" role="tab" className="tab text-xl mx-1 px-12" aria-label="APPROVALS" defaultChecked/>
                <div role="tabpanel" className="tab-content p-10">
                    <h1 className="text-2xl pb-10">Pending courses </h1>
                    <div className="grid grid-flow-col grid-cols-4">
                        {
                            pendingCourses.map(course => <ApproveCourse course={course} getPendingCourses={getPendingCourses}></ApproveCourse>)
                        }
                    </div>
                </div>
                <input type="radio" name="my_tabs_1" role="tab" className="tab text-xl mx-1 px-12" aria-label="TEACHERS" />
                <div role="tabpanel" className="tab-content p-10">
                    <TeachersAdmin></TeachersAdmin>
                </div>
                <input type="radio" name="my_tabs_1" role="tab" className="tab text-xl mx-1 px-12" aria-label="COURSE_STATISTICS" />
                <div role="tabpanel" className="tab-content p-10">
                    <CourseStatistics></CourseStatistics>
            



                </div>
            </div>
        </div>
       
     );
}
 
export default AdminDashboard;