import react from 'react'; 
import { useContext,useState,useEffect } from 'react';
import CourseInstructors from '../Courses/Course_Instructors';
import { AuthContext } from '../../context/AuthProvider';
import { Link } from 'react-router-dom';


const TopTeachersHome = () => {
    const [teachers,setTeachers] = useState([]);
    useEffect(
        ()=>{
            fetch('http://localhost:5002/homepage/teachers')
            .then(res => res.json())
            .then(data => setTeachers(data))
        }
    ,[]);

    return ( 
        <>
           <div className="container mx-auto">
            <h1 className="text-3xl font-bold  my-8 p-5">Popular Teachers</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"/>
            <div className="carousel w-full">
                {
                    teachers.map(teacher => (
                        <div className="carousel-item relative w-full">
                        <CourseInstructors teacher={teacher} />
                        {/* <img src="https://daisyui.com/images/stock/photo-1559703248-dcaaec9fab78.jpg" className="rounded-box" /> */}
                      </div> 
                    ))
                
                }
            </div>
            {/* {
                teachers.map({teacher} => <CourseInstructors teacher={teacher} />)
            } */}
         </div>
        </>
     );
}

export default TopTeachersHome;