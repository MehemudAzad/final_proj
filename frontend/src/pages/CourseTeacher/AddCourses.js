import { useContext} from "react";
import { AuthContext } from "../../context/AuthProvider";

const AddCourses = () => {
    const {user} = useContext(AuthContext);
    const user_id = user?.id;
    const teacher_id = user?.teacher_id;
    const handleSubmit = async (e) => {
        e.preventDefault();
        //calling the form with event.target
        const form = e.target;
        //firstname and lastname add kore fullname banano 
        const course_name = form.name.value;
        const image_url = form.photoURL.value;
        const course_description = form.description.value;
        const course_price = form.price.value;
        const category = form.category.value;
        
        try {//teacher_id, course_name, course_description, course_price, image_url
          const response = await fetch('http://localhost:5002/courses', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              teacher_id: teacher_id,
              course_name: course_name,
              course_description: course_description,
              course_price: parseFloat(course_price),
              image_url: image_url,
              category: category
            }),
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
        <div className='mx-auto bg-white'>
                <form onSubmit={handleSubmit}  className='w-[1200px] mt-12 mb-32 p-8 bg-white'>
                {/* <h1 className='text-4xl font-semibold text-blue-600 mb-5'>ADD NEW COURSE</h1> */}
                {/* name */}
                <div className="form-control w-full ">
                    <label className="label">
                        <span className="label-text text-blue-500">*What is the name of this course?</span>
                    </label>
                    <input  type="text"  name='name' placeholder="name" className="input input-bordered w-full bg-slate-200"  required/>
                </div>
                <div className="form-control w-full ">
                    <label className="label">
                        <span className="label-text text-blue-500">Give us a photo to display:</span>
                    </label>
                    <input type="text" name='photoURL' placeholder="photoURL" className="input input-bordered w-full bg-slate-200" />
                    </div>
                <div className="form-control w-full ">
                    <label className="label">
                        <span className="label-text text-blue-500">*What is the price of this course?</span>
                    </label>
                    <input type="text" name='price' placeholder="price" className="input input-bordered w-full bg-slate-200"  required/>
                    </div>
                <div className="form-control">
                <label className="label">
                    <span className="label-text text-blue-500">*Course category:</span>
                    <span className="label-text-alt"></span>
                </label> 
                <input type="text" name='category' placeholder="course category" className="input input-bordered w-full bg-slate-200"  required/>
                </div>
                <div className="form-control">
                <label className="label">
                    <span className="label-text text-blue-500">Course Description:</span>
                    <span className="label-text-alt"></span>
                </label> 
                <textarea className="textarea textarea-bordered h-24 bg-slate-200" name='description' placeholder="description" ></textarea>
                </div>
                <button type="submit" class="w-full inline-block px-6 py-2 border-2 mt-5 border-blue-600 text-xl text-blue-600 font-medium leading-normal uppercase rounded hover:bg-blue-500 hover:text-white  focus:outline-none focus:ring-0 transition duration-150 ease-in-out">
                    ADD COURSE
                </button>
                </form>
            </div>
      )
}
 
export default AddCourses;

