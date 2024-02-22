import { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../../context/AuthProvider";

const LessonCard = ({lesson}) => {
    const {user} = useContext(AuthContext);
    const {course_id, lesson_description, title,  lesson_id, teacher_id, } = lesson;
    return ( 
        <>
        <Link to={`/lessons/${lesson_id}`}>
            <div className="flex justify-between items-center border-l-8 border-indigo-500 bg-indigo-50 mt-8 p-6 w-[75%]">
                <div class="dark:bg-gray-800 dark:border-gray-700 ">
                        <h5 class="mb-2 text-3xl font-bold tracking-tight text-gray-900 dark:text-white">{title}</h5>
                    <p class="mb-3 font-normal text-gray-700 text-md dark:text-gray-400">{lesson_description}</p>
                </div>
                {
                    user?.role === 'teacher' ? <>
                     <button className="text-5xl bg-indigo-200 hover:bg-indigo-300 rounded-full p-5 w-20 h-20">X</button>
                    </>:
                    <>
                    </>
                }
               
            </div>
           
        </Link>
        
        </>
     );
}

export default LessonCard;