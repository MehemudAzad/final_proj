import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';

// import 'react-photo-view/dist/react-photo-view.css';
/*{"course_id":1,"course_name":"Introduction to Computer Science","course_description":"Fundamentals of computer science and programming.","course_price":"49.99","total_lectures":20,"duration":"4 weeks","image_url":"intro_cs_image.jpg"}, */
const ApproveCourse = ({ course, getPendingCourses }) => {

    const {course_id, course_name,  course_description, course_price, total_lectures, duration, image_url} = course;
    
    // const [teachers, setTeachers] = useState([]);

    //loading the related teachers with this course
    // useEffect(()=>{
    //     fetch(`http://localhost:5002/courses/teachers/${course_id}`)
    //     .then(res => res.json())
    //     .then(data =>setTeachers(data.teachers))
    // },[]);


    // console.log(teachers[0]?.username)
    //truncate text
    const truncateText = (text, maxLength) => {
      if (text.length <= maxLength) {
        return text;
      } else {
        // Truncate the text to the nearest word within the specified length
        const truncatedText = text.substr(0, text.lastIndexOf(' ', maxLength));
        return `${truncatedText}...`;
      }
    };

    const handleApprove = async () => {
        try {
            const response = await fetch(`http://localhost:5002/courses/approve/${course_id}`, {
              method: 'PUT',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({ course_id}),
            });
      
            if (response.ok) {
              const approvalData = await response.json();
              console.log('Approval successful:', approvalData);
              getPendingCourses();
              // Optionally, you can handle successful approval here, such as updating state or displaying a success message.
            } else {
              const errorData = await response.json();
              console.error('Approval failed:', errorData.message);
              // Handle approval failure, display an error message, etc.
            }
          } catch (error) {
            console.error('Error during approval:', error.message);
            // Handle any unexpected errors
          }
    }

    const handleDecline = async () => {
        try {
            const response = await fetch(`http://localhost:5002/courses/decline/${course_id}`, {
              method: 'DELETE',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({ course_id}),
            });
      
            if (response.ok) {
              const approvalData = await response.json();
              console.log('Decline successful:', approvalData);
              getPendingCourses();
              // Optionally, you can handle successful approval here, such as updating state or displaying a success message.
            } else {
              const errorData = await response.json();
              console.error('Decline failed:', errorData.message);
              // Handle approval failure, display an error message, etc.
            }
          } catch (error) {
            console.error('Error during decline:', error.message);
            // Handle any unexpected errors
          }
    }
   
    return (
        // <div className='bg-slate-300 p-3 m-7 rounded-2xl'>
    <div className="card rounded-lg flex flex-col card-side shadow-2xl bg-green-200 hover:bg-blue-200">
          <figure className='rounded-none'>{/**image_url? image_url : */}
            <img className="h-[300px] rounded-t-lg z-100" src={"https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fGNvbXB1dGVyfGVufDB8fDB8fHww"}  alt="courses" />
          </figure>
        <div className="card-body h-[300px] p-4">
          <h2 className="card-title text-3xl">{course_name}</h2>
          <p>{truncateText(course_description, 100)}</p>
          <div className="flex card-action justify-between mt-5">
            <button className="text-black btn bg-blue-300 mr-4" onClick={handleApprove}>Approve</button>
            <button className="text-black btn bg-blue-300 mr-4" onClick={handleDecline}>Decline</button>
           
            {/* <UpdateCourse key={course_id} course = {course}/> */}
            {/* <button onClick={()=>handleDelete(course_id)} className="w-24 btn bg-blue-300 btn-primary">Delete</button> */}
           
          </div>
        </div>

      </div>
    
    )
    
}   

export default ApproveCourse;