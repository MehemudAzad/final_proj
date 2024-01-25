import { useContext} from "react";
import { AuthContext } from "../../context/AuthProvider";

const AddCourses = () => {
    const {user} = useContext(AuthContext);
    const user_id = user?.id;
    const handleSubmit = async (e) => {
        e.preventDefault();
        e.preventDefault();
        //calling the form with event.target
        const form = e.target;
        //firstname and lastname add kore fullname banano 
        const course_name = form.name.value;
        //going inside the form and then calling the name of the input and then .value to get the value
        // const title = form.title.value;
        const image_url = form.photoURL.value;
        const course_description = form.description.value;
        const course_price = form.price.value;
        
        try {
          const response = await fetch('http://localhost:5002/teacher/add-course', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              teacher_id: user_id,
              course_name: course_name,
              course_description: course_description,
              course_price: parseFloat(course_price),
              image_url: image_url,
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
        <div className='max-w-screen-xl mx-auto bg-white'>
                <form onSubmit={handleSubmit}  className='border-3 shadow-2xl w-[1200px] mt-24  mb-32 p-8 bg-white'>
                <h1 className='text-4xl font-semibold text-blue-600 mb-5'>ADD NEW COURSE</h1>
                {/* name */}
                <div className="form-control w-full ">
                    <label className="label">
                        <span className="label-text text-blue-500">What is the name of this course?</span>
                    </label>
                    <input  type="text"  name='name' placeholder="name" className="input input-bordered w-full bg-slate-200"  required/>
                </div>
                <div className="form-control w-full ">
                    <label className="label">
                        <span className="label-text text-blue-500">Give us a photo to display:</span>
                    </label>
                    <input type="text" name='photoURL' placeholder="photoURL" className="input input-bordered w-full bg-slate-200"  required/>
                    </div>
                <div className="form-control w-full ">
                    <label className="label">
                        <span className="label-text text-blue-500">What is the price of this course?</span>
                    </label>
                    <input type="text" name='price' placeholder="price" className="input input-bordered w-full bg-slate-200"  required/>
                    </div>
                <div className="form-control">
                <label className="label">
                    <span className="label-text text-blue-500">Course Description:</span>
                    <span className="label-text-alt"></span>
                </label> 
                <textarea className="textarea textarea-bordered h-24 bg-slate-200" name='description' placeholder="description" required></textarea>
                </div>
                <button type="submit" class="w-full inline-block px-6 py-2 border-2 mt-5 border-blue-600 text-xl text-blue-600 font-medium leading-normal uppercase rounded hover:bg-blue-500 hover:text-white  focus:outline-none focus:ring-0 transition duration-150 ease-in-out">
                    ADD COURSE
                </button>
                </form>
            </div>
      )
}
 
export default AddCourses;

// Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusantium quidem nostrum, ipsum aliquam corporis temporibus iusto fugiat commodi illo quia reprehenderit possimus voluptates, doloribus perferendis sunt, beatae laudantium. A perspiciatis rem sit cumque illo repellat tenetur consequuntur saepe ducimus obcaecati in atque quibusdam veniam unde, ratione molestias maiores dolores necessitatibus quo debitis soluta labore pariatur possimus alias. Adipisci ullam atque quod at quo molestiae rerum? Asperiores laboriosam commodi modi voluptatum, tempora maiores repellat repudiandae nesciunt corrupti, doloribus qui quibusdam omnis dolore. Commodi minus a neque amet voluptatem magni ipsa nostrum eius aliquam numquam, quae quod, illum officia quis, accusantium praesentium! Quaerat ea neque officia delectus deleniti qui sit nulla alias illo excepturi a itaque atque doloribus temporibus dolores, autem beatae dolore exercitationem cum perspiciatis commodi saepe! Deserunt, iure quia? Perferendis quibusdam debitis quas cumque minima reiciendis corporis repellendus eum natus ducimus suscipit id incidunt quod consequuntur, exercitationem, sequi doloribus similique dolorum alias inventore illum expedita odit possimus cupiditate. Modi placeat quia qui adipisci, id, dolores velit natus, quam minima illo accusantium enim iure atque quibusdam necessitatibus iste doloremque iusto. At autem perspiciatis explicabo fugiat illum quis repellat non nihil nostrum libero, consequatur neque perferendis eius! Mollitia velit quasi veniam fugiat.