import { useContext, useEffect, useState } from "react";
import { useLoaderData } from "react-router-dom";
import { AuthContext } from "../../../context/AuthProvider";
import LessonCard from "../Lessons/LessonCard";
import AddLessons from "../Lessons/AddLessons";
import Outline from "./Outline";
import Teachers from "./Teachers";
import CourseFiles from "./CourseFiles";
import Quizes from "./Quizes";
import ModalAddLessons from "../Lessons/ModalAddLessons";

const CourseMain = () => {
    const course = useLoaderData();
    const [lessons, setLessons] = useState([]);
    // const [isPlaying, setIsPlaying] = useState(false);

    // const togglePlay = () => {
    //   setIsPlaying(!isPlaying);
    // };
    const {user} = useContext(AuthContext);
    const {course_id, course_name,  course_description, course_price, image_url} = course;
    const user_id = user?.teacher_id;
    // const [teachers, setTeachers] = useState([]);

    // '/lessons/:course_id'
    useEffect(()=> {
        fetch(`http://localhost:5002/lessons/${course_id}`)
            .then(res => res.json())
            .then(data =>setLessons(data))
    },[])  

    // console.log(user?.username,user?.id)
    // //loading the related teachers with this course
    // useEffect(()=>{
    //     fetch(`http://localhost:5002/courses/teachers/${course_id}`)
    //     .then(res => res.json())
    //     .then(data =>setTeachers(data.teachers))
    // },[]);

    console.log(lessons);

    console.log(course_id, user_id, course);
    const handleAddLectures = async()=> {
        console.log(course_id, user_id);
        try {
            const response = await fetch('http://localhost:5002/enroll', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({ course_id, user_id}),
            });
      
            if (response.ok) {
              const enrollmentData = await response.json();
              console.log('Enrollment successful:', enrollmentData);
              // Optionally, you can handle successful enrollment here, such as updating state or displaying a success message.
            } else {
              const errorData = await response.json();
              console.error('Enrollment failed:', errorData.message);
              // Handle enrollment failure, display an error message, etc.
            }
          } catch (error) {
            console.error('Error during enrollment:', error.message);
            // Handle any unexpected errors
          }
    }
    return ( 
        <div className="p-6">
            <div className="">
                <h1 className="text-4xl pt-4 bg-">{course_name}</h1>
            </div>
            {/* 
                add tabs here  
            */}
            <div role="tablist" className="tabs tabs-bordered mt-10">
            <input type="radio" name="my_tabs_1" role="tab" className="tab text-xl mx-1 px-12" aria-label="LESSONS" defaultChecked/>
            <div role="tabpanel" className="tab-content p-10">
                <div>
                    <ModalAddLessons lessons={lessons} course={course}></ModalAddLessons>
                </div>
                <section>
                    {
                        lessons.map(lesson => 
                            <LessonCard key= {lesson?.lesson_id} lesson = {lesson}></LessonCard>    
                        )
                    }
                </section>
            </div>
            <input type="radio" name="my_tabs_1" role="tab" className="tab text-xl mx-1 px-12" aria-label="OUTLINE" />
            <div role="tabpanel" className="tab-content p-10">
                <Outline></Outline> 
            </div>
            <input type="radio" name="my_tabs_1" role="tab" className="tab text-xl mx-1 px-12" aria-label="MATERIALS" />
            <div role="tabpanel" className="tab-content p-10">
                <CourseFiles course={course}></CourseFiles> 
            </div>
            <input type="radio" name="my_tabs_1" role="tab" className="tab text-xl mx-1 px-12" aria-label="QUIZ" />
            <div role="tabpanel" className="tab-content p-10">
                <Quizes course={course}></Quizes> 
            </div>
            <input type="radio" name="my_tabs_1" role="tab" className="tab text-xl mx-1 px-12" aria-label="TEACHERS" />
            <div role="tabpanel" className="tab-content p-10">
                <Teachers course={course}></Teachers>
            </div>
            </div>
            

        </div>
     );
}
 
export default CourseMain;