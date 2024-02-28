import React from 'react'; 
import{useState,useEffect} from 'react';
import ApproveCourse from '../Courses/ApproveCourse'


const AdminDashboard = () => {
    const [pendingCourses,setpendingCourse] = useState([]);
    useEffect(()=>{
        fetch('http://localhost:5002/pendingCourses')
        .then(res => res.json())
        .then(data => setpendingCourse(data))
    },[]);

    return ( 
        <>
           {
            pendingCourses.map(course => <ApproveCourse course={course}></ApproveCourse>)
           }
        </>
     );
}
 
export default AdminDashboard;