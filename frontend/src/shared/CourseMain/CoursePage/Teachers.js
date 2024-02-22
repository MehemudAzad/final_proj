import { useEffect, useState } from "react";
import TeacherCard from "./TeacherCard";

const Teachers = ({course}) => {
    const [teachers, setTeachers]= useState([]);

    const getTeachers = () => {
        fetch(`http://localhost:5002/courses/teachers/${course?.course_id}`)
        .then(res => res.json())
        .then(data =>setTeachers(data.teachers))
    }
    useEffect(()=>{
        getTeachers();
    },[]);

    return ( 
        <>teachers of this course are
            <div>
                {
                    teachers?.map(teacher =>
                            <TeacherCard key={teacher.id} teacher={teacher} />
                        )
                }
            </div>
        </>
     );
}
 
export default Teachers;