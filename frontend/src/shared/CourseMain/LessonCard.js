import { Link } from "react-router-dom";

const LessonCard = ({lesson}) => {
    const {course_id, lesson_description, title,  lesson_id, teacher_id, } = lesson;
    return ( 
        <>
        <Link to={`/lessons/${lesson_id}`}>
            <div class="mt-8 p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                    <h5 class="mb-2 text-4xl font-bold tracking-tight text-gray-900 dark:text-white">{title}</h5>
                <p class="mb-3 font-normal text-gray-700 dark:text-gray-400">{lesson_description}</p>
            </div>
        </Link>
        
        </>
     );
}

export default LessonCard;