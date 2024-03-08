import { useContext, useState } from "react";
import { MdDriveFolderUpload, MdLibraryAdd } from "react-icons/md";
import { AuthContext } from "../../../context/AuthProvider";
import { useSearchParams, useLoaderData, Link } from "react-router-dom";
import { IoAddCircleSharp } from "react-icons/io5";
// import { AuthContext } from "../../context/AuthProvider";
// import { useContext, useEffect, useState } from "react";

const ModalAddLectures = ({lectures, lesson_id}) => {
    const lesson = useLoaderData();
    console.log(lesson[0])
    const {user} = useContext(AuthContext);
    const user_id = user?.id;
    const teacher_id = user?.teacher_id;
    const handleSubmit = async (e) => {
        e.preventDefault();
        //calling the form with event.target
        const form = e.target;
        const title = form.title.value;
        const video_link = form.video_link.value;
        
        try {
          const response = await fetch('http://localhost:5002/lecture', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              lesson_id : lesson_id,
              lecture_title: title,
              video_link: video_link
            }),
          });
        console.log({
            lesson_id : lesson_id,
            lecture_title: title,
            video_link: video_link
          })
          if (response.ok) {
            const result = await response.json();
            console.log('Course added successfully. Course ID:', result.courseId);
            // Add any additional logic or UI updates here
            window.location = `/lessons/${lesson_id}`
          } else {
            console.error('Failed to add course.');
          }
          //reset the form
          form.reset();
        } catch (error) {
          console.error('Error:', error);
          
        }
      };

    return ( 
        <div className="p-4">  
        <div className="flex items-center justify-between">
              <h2 className="text-3xl p-4">Lectures ({lectures?.length})</h2>
              {user?.role === "teacher" ? (
                <>
                    <button className="py-2.5 px-5 me-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-full border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700" onClick={()=>document.getElementById('my_modal_4').showModal()}>
                      <IoAddCircleSharp className="text-xl" />
                    </button>
                </>
              ) : (
                <></>
              )}
              {/* {
                    user?.role === "teacher" ? 
                    <>
                        <button className="btn" onClick={()=>document.getElementById('my_modal_4').showModal()}>Add Lesson</button>
                    </>
                    :
                    <>
                    </>
                   }  */}
            </div>
            {/* You can open the modal using document.getElementById('ID').showModal() method */}
             {/* Displaying questions */}
             
            <dialog id="my_modal_4" className="modal">
            <div className="modal-box w-11/12 max-w-5xl relative">
                
            <form onSubmit={handleSubmit}  className='border-3 p-8 bg-white'>
                <h1 className='flex items-center gap-3 text-4xl font-semibold text-blue-800 mb-5'><MdLibraryAdd />ADD NEW LECTURE</h1>
                <div className="form-control w-full ">
                    <label className="label">
                        <span className="label-text text-blue-800">What is the title of this lecture?</span>
                    </label>
                    <input  type="text"  name='title' placeholder="enter your lesson title" className="input input-bordered w-full bg-slate-200"  required/>
                </div>
                <div className="form-control">
                <label className="label">
                    <span className="label-text text-blue-800">Video Link</span>
                    <span className="label-text-alt"></span>
                </label> 
                <textarea className="textarea textarea-bordered h-24 bg-slate-200" name='video_link' placeholder="place video link here" required></textarea>
                </div>
                <button type="submit" class="w-full inline-block px-6 py-2 border-2 mt-5 border-blue-800 text-xl text-blue-800 font-medium leading-normal uppercase rounded hover:bg-blue-800 hover:text-white  focus:outline-none focus:ring-0 transition duration-150 ease-in-out">
                    ADD LECTURE
                </button>
                </form> 

                <div className="modal-action flex justify-end">
                <form method="dialog">
                    {/* if there is a button, it will close the modal */}
                    <button className="btn rounded-full absolute top-5 right-5"><span> X </span></button>
                </form>
                
                </div>
            </div>
            </dialog>
           
        </div>
     );
}
 
export default ModalAddLectures;
