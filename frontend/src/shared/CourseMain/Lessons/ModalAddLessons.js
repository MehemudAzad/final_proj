import { useContext, useState } from "react";
import { MdDriveFolderUpload, MdLibraryAdd } from "react-icons/md";
import { AuthContext } from "../../../context/AuthProvider";
// import { AuthContext } from "../../context/AuthProvider";
// import { useContext, useEffect, useState } from "react";

const ModalAddLessons = ({lessons, course}) => {
    const {user} = useContext(AuthContext);
    const user_id = user?.id;
    const [selectedFile, setSelectedFile] = useState(null);

    console.log(course, "from add lessons")
    const handleFileChange = (event) => {
      setSelectedFile(event.target.files[0]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        //calling the form with event.target
        const form = e.target;
        const lesson_description = form.description.value;
        const title = form.title.value;
        const formData = new FormData();
        formData.append('file', selectedFile);
        formData.append('teacher_id', user?.teacher_id);
        formData.append('course_id', course?.course_id);
        formData.append('title', title);
        formData.append('lesson_description', lesson_description);
        console.log(formData);
        try {
          const response = await fetch('http://localhost:5002/lessons', {
            method: 'POST',
            body: formData,
          });
    
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
        <div className="p-4">  
        <div className="flex items-center justify-between w-3/4">
            <h2 className="text-4xl">Lessons : {lessons.length}</h2>
            {
                    user?.role === "teacher" ? 
                    <>
                        <button className="btn" onClick={()=>document.getElementById('my_modal_4').showModal()}>Add Lesson</button>
                    </>
                    :
                    <>
                    </>
                   } 
            
            
        </div>
            {/* You can open the modal using document.getElementById('ID').showModal() method */}
             {/* Displaying questions */}
             
            <dialog id="my_modal_4" className="modal">
            <div className="modal-box w-11/12 max-w-5xl relative">
                
            <form onSubmit={handleSubmit}  className='border-3 p-8 bg-white'>
                <h1 className='flex items-center gap-3 text-4xl font-semibold text-blue-800 mb-5'><MdLibraryAdd />ADD NEW LESSON</h1>
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
                <div className="flex items-center gap-5 rounded-t-xl mt-">
                <label className="label">
                    <span className="label-text text-blue-800">Add lesson pdf :</span>
                    <span className="label-text-alt"></span>
                </label> 
                <label className="flex items-center flex-row-reverse hover:cursor-pointer">
                  <input className="btn btn-primary flex items-center text-xl p-2 invisible" type="file"  onChange={handleFileChange} />
                  <MdDriveFolderUpload className="text-3xl"/>
                </label>
                  
                </div>
                <button type="submit" class="w-full inline-block px-6 py-2 border-2 mt-5 border-blue-800 text-xl text-blue-800 font-medium leading-normal uppercase rounded hover:bg-blue-800 hover:text-white  focus:outline-none focus:ring-0 transition duration-150 ease-in-out">
                    ADD LESSON
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
           
        </div>
     );
}
 
export default ModalAddLessons;