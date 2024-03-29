import { useContext } from "react";
import { AuthContext } from "../../context/AuthProvider";
import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { FaCalendarAlt } from "react-icons/fa";

const Settings = () => {
    const {user} = useContext(AuthContext);
    const [selectedDate, setDate] = useState(new Date());
    const user_id = user?.id;
    console.log(selectedDate);
   
    // console.log(formattedDate)
    // const date = new Date();
    const year = selectedDate.getFullYear();
    const month = String(selectedDate.getMonth() + 1).padStart(2, '0'); // Add leading zero if needed
    const day = String(selectedDate.getDate()).padStart(2, '0'); // Add leading zero if needed
    const formattedDate = `${year}-${month}-${day}`;
    console.log(formattedDate);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const form = e.target;
        const country = form.country.value;
        const institution = form.institution.value;
        const city = form.city.value;
        const bio = form.bio.value;
        const experience = form.experience.value;
        //date_of_birth, country, city, years_of_experience, institution, mentored_students, teacher_description
        // /update/:userId/:teacherId
        try {
            console.log(user?.teacher_id);
            
          const response = await fetch(`http://localhost:5002/update/teacherProfile/${user?.id}/${user?.teacher_id}`, {
            method: 'PATCH',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                institution: institution,
                country: country,
                city: city,
                teacher_description: bio,
                date_of_birth: selectedDate,
                experience: experience
            }),
          });
          console.log({
            institution: institution,
            country: country,
            city: city,
            teacher_description: bio,
            date_of_birth: selectedDate,
            experience: experience
        })
          if (response.ok) {
            const result = await response.json();
            console.log('Course added successfully. Course ID:', result.courseId);
            // Add any additional logic or UI updates here
          } else {
            console.error('Failed to add course.');
          }
          //reset the form
        //   form.reset();
        } catch (error) {
          console.error('Error:', error);
          
        }
      };
    
      return (
        <div className='mx-auto bg-white'>
                <form onSubmit={handleSubmit}  className='w-[1200px] mt-10 mb-32 p-8 bg-white'>
                {/* <h1 className='text-4xl font-semibold text-blue-600 mb-5'>ADD NEW COURSE</h1> */}
                {/* name */}
                <div className="form-control w-full ">
                    <label className="label">
                        <span className="label-text text-blue-500"><span className="text-red-500">*</span>Your Country</span>
                    </label>
                    <input  type="text"  name='country' placeholder="eg. Bangladesh" className="input input-bordered w-full bg-slate-200"  required/>
                </div>
                <div className="form-control w-full ">
                    <label className="label">
                        <span className="label-text text-blue-500">Your City</span>
                    </label>
                    <input type="text" name='city' placeholder="eg. Dhaka" className="input input-bordered w-full bg-slate-200"  />
                    </div>
                <div className="form-control w-full ">
                    <label className="label">
                        <span className="label-text text-blue-500"><span className="text-red-500">*</span>Your Institution</span>
                    </label>
                    <input type="text" name='institution' placeholder="eg. BUET" className="input input-bordered w-full bg-slate-200"  required/>
                    </div>
                <div className="form-control w-full ">
                    <label className="label">
                        <span className="label-text text-blue-500"><span className="text-red-500">*</span>Years of Experience</span>
                    </label>
                    <input type="text" name='experience' placeholder="enter a number(your experience)" className="input input-bordered w-full bg-slate-200"  required/>
                </div>
                {/* date picker  */}
                <div className="form-control w-full ">
                    <label className="label">
                        <span className="label-text text-blue-500"><span className="text-red-500">*</span>What is your date of birth?</span>
                    </label>
                    <label  className="flex items-center gap-3 p-3 rounded-xl bg-slate-200">
                        <FaCalendarAlt/>
                        <div>|</div>
                        <DatePicker className="p-2 bg-slate-200" selected={selectedDate} dateFormat="MM-DD-YYYY" onChange={date=> setDate(date)}></DatePicker>
                    </label>
                </div>
                <div className="form-control">
                <label className="label">
                    <span className="label-text text-blue-500 ">Add Bio</span>
                    <span className="label-text-alt"></span>
                </label> 
                <textarea className="textarea textarea-bordered h-24 bg-slate-200" name='bio' placeholder="write something about yourself" required></textarea>
                </div>
                <button type="submit" class="w-full inline-block px-6 py-2 border-2 mt-5 border-blue-600 text-xl text-blue-600 font-medium leading-normal uppercase rounded hover:bg-blue-500 hover:text-white  focus:outline-none focus:ring-0 transition duration-150 ease-in-out">
                    Save Changes
                </button>
                </form>
            </div>
      )
}
 
export default Settings;