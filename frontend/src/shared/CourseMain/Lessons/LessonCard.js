import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../../context/AuthProvider";
import { GrFormEdit } from "react-icons/gr";
import { MdLibraryAdd } from "react-icons/md";

const LessonCard = ({lesson, handleDelete}) => {
    const {user} = useContext(AuthContext);
    const {course_id, lesson_description, title,  lesson_id, teacher_id, } = lesson;
    const [teacher, setTeacher] = useState([]);
    // /lessons/:lesson_id 
    const handleEditClick = (event) => {
        event.stopPropagation(); // Stop propagation to prevent click on Link
        document.getElementById('my_modal_6').showModal();
    }

    useEffect(()=>{
        fetch(`http://localhost:5002/teacher/${lesson_id}`)
        .then(res => res.json())
        .then(data => setTeacher(data))
    },[]); 



    return ( 
        <>
         <dialog id="my_modal_6" className="modal">
            <div className="modal-box w-11/12 max-w-5xl relative">
                
            <form className='border-3 p-8 bg-white'>
                <h1 className='flex items-center gap-3 text-4xl font-semibold text-blue-800 mb-5'><MdLibraryAdd />Update Lesson</h1>
                {/* name */}
                <div className="form-control w-full ">
                    <label className="label">
                        <span className="label-text text-blue-800">What is the title of this lesson?</span>
                    </label>
                    <input  type="text"  name='title' placeholder="enter your lesson title" className="input input-bordered w-full bg-slate-200"  required/>
                </div>
                <div className="form-control">
                <label className="label">
                    <span className="label-text text-blue-800">Lesson Description:</span>
                    <span className="label-text-alt"></span>
                </label> 
                <textarea className="textarea textarea-bordered h-24 bg-slate-200" name='description' placeholder="lesson description" required></textarea>
                </div>
                <button type="submit" class="w-full inline-block px-6 py-2 border-2 mt-5 border-blue-800 text-xl text-blue-800 font-medium leading-normal uppercase rounded hover:bg-blue-800 hover:text-white  focus:outline-none focus:ring-0 transition duration-150 ease-in-out">
                    Update LESSON
                </button>
                </form>

                <div className="modal-action flex justify-end">
                <form method="dialog">
                    {/* if there is a button, it will close the modal */}
                    <button className="btn rounded-full absolute top-5 right-5 px-5"><span> X </span></button>
                </form>
                
                </div>
            </div>
            </dialog>
           
        <Link to={`/lessons/${lesson_id}`}>
            <div className="flex justify-between items-center border-l-8 border-indigo-500 hover:bg-blue-100 bg-indigo-50 mt-5 p-6 w-[75%] transition ease-in-out">
                <div class="dark:bg-gray-800 dark:border-gray-700 ">
                        <h5 class="mb-2 text-3xl font-bold tracking-tight text-gray-900 dark:text-white">{title}</h5>
                    <p class="mb-3 font-normal text-gray-700 text-md dark:text-gray-400">{lesson_description}</p>
                    <p>Prepared By - <span className="text-blue-700 fond-bold">{teacher.username}</span></p>
                    <p>Total lectures - {teacher.total_lectures}</p>

                </div>
                <div className="flex items-center gap-5">   
                    {
                        user?.role === 'teacher' ? <>
                        <div className="bg-indigo-200 hover:bg-neutral-700 hover:text-base-200 rounded-full p-5 w-20 h-20">   
                            <button onClick={handleEditClick} className="text-5xl">
                                <GrFormEdit/>
                            </button>
                        </div>
                        </>:
                        <>
                        </>
                    }
                <div>
                {
                    user?.role === 'teacher' ? <>
                     <button onClick={()=>handleDelete(lesson_id)} className="text-5xl bg-indigo-200 hover:bg-neutral-700 hover:text-base-200 rounded-full p-5 w-20 h-20">X</button>
                    </>:
                    <>
                    </>
                }
                </div>
                </div>               
            </div>
        </Link>
        
        </>
     );
}

export default LessonCard;