import { useEffect, useState } from "react";
import ApproveCourse from "./ApproveCourse";

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
             <h1 className="text-4xl pb-10">Pending courses </h1>
            <div className="grid grid-flow-col grid-cols-4">
            {
                pendingCourses.map(course => <ApproveCourse course={course} getPendingCourses={getPendingCourses}></ApproveCourse>)
            }
            </div>
        </div>
       
     );
}
 
export default AdminDashboard;