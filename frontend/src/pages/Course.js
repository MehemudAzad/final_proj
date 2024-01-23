import React, { useState } from 'react'
import { Link } from 'react-router-dom';
// import { PhotoView } from 'react-photo-view';
// import { PhotoProvider,PhotoView } from 'react-photo-view';

// import 'react-photo-view/dist/react-photo-view.css';
/*{"course_id":1,"course_name":"Introduction to Computer Science","course_description":"Fundamentals of computer science and programming.","course_price":"49.99","total_lectures":20,"duration":"4 weeks","image_url":"intro_cs_image.jpg"}, */
const Course = ({ course, handleDelete }) => {
    const {course_id, course_name,  course_description, course_price, total_lectures, duration, image_url} = course;
    // const {update, setUpdate} = useState(course);

    console.log(image_url);

    
   
    return (
        // <div className='bg-slate-300 p-3 m-7 rounded-2xl'>
    <div className="card card-side shadow-2xl bg-blue-100 m-7 hover:bg-blue-200">
            <figure>
        {/* <PhotoView src={image_url}> */}
            <img className="h-[300px]" src={image_url}  alt="courses" />
        {/* </PhotoView> */}
            </figure>
        <div className="card-body h-[300px]">
          <h2 className="card-title text-3xl">{course_name}</h2>
          <p>{course_description}</p>
          <div className="flex card-action justify-between mt-5">
            <button className="text-black btn bg-blue-300">Price : {course_price}</button>
            {/* <UpdateCourse key={course_id} course = {course}/> */}
            <button onClick={()=>handleDelete(course_id)} className="w-24 btn bg-blue-300 btn-primary">Delete</button>
            <Link to={`/courses/${course_id}`}><div class="relative inline-flex items-center justify-start py-3 pl-4 pr-12 overflow-hidden font-semibold text-indigo-600 transition-all duration-150 ease-in-out rounded hover:pl-10 hover:pr-6 bg-gray-50 group">
            <span class="absolute bottom-0 left-0 w-full h-1 transition-all duration-150 ease-in-out bg-indigo-600 group-hover:h-full"></span>
            <span class="absolute right-0 pr-4 duration-200 ease-out group-hover:translate-x-12">
            <svg class="w-5 h-5 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
            </span>
            <span class="absolute left-0 pl-2.5 -translate-x-12 group-hover:translate-x-0 ease-out duration-200">
            <svg class="w-5 h-5 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
            </span>
            <span class="relative w-full text-left transition-colors duration-200 ease-in-out group-hover:text-white">VIEW DETAILS</span>
            </div></Link> 
          </div>
        </div>

      </div>
        
    // </div>  
    )
    
}   

export default Course;