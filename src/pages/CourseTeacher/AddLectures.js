import { useContext } from "react";
// import { AuthContext } from "../../../context/AuthProvider";
import { MdLibraryAdd } from "react-icons/md";
import { AuthContext } from "../../context/AuthProvider";
import {useLoaderData, useParams} from "react-router-dom";

const AddLectures = () => {
    const lesson = useLoaderData();
    console.log(lesson[0])
    const {user} = useContext(AuthContext);
    const user_id = user?.id;
    const teacher_id = user?.teacher_id;
    const { lesson_id } = useParams();
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
        <div>
         <div className='mx-auto bg-white border-3 '>
                <form onSubmit={handleSubmit}  className='border-3 w-[1200px]  mb-32 p-8 bg-white'>
                <h1 className='flex items-center gap-3 text-4xl font-semibold text-blue-800 mb-5'><MdLibraryAdd />ADD NEW LECTURE</h1>
                {/* name */}
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
            </div>
        </div>
       
      )
}
 
export default AddLectures;