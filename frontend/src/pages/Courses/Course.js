import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';

// import 'react-photo-view/dist/react-photo-view.css';
/*{"course_id":1,"course_name":"Introduction to Computer Science","course_description":"Fundamentals of computer science and programming.","course_price":"49.99","total_lectures":20,"duration":"4 weeks","image_url":"intro_cs_image.jpg"}, */
const Course = ({ course }) => {
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
            <button className="text-black btn bg-blue-300 mr-4">Price : {course_price}</button>
            {/* <UpdateCourse key={course_id} course = {course}/> */}
            {/* <button onClick={()=>handleDelete(course_id)} className="w-24 btn bg-blue-300 btn-primary">Delete</button> */}
            <Link to={`/courses/${course_id}`}><div class="relative inline-flex items-center justify-start py-3 pl-4 pr-12 overflow-hidden font-semibold text-indigo-600 transition-all duration-150 ease-in-out rounded hover:pl-10 hover:pr-6 bg-gray-50 group">
            <span class="absolute bottom-0 left-0 w-full h-1 transition-all duration-150 ease-in-out bg-indigo-600 group-hover:h-full"></span>
            <span class="absolute right-0 pr-4 duration-200 ease-out group-hover:translate-x-12">
            <svg class="w-5 h-5 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
            </span>
            <span class="absolute left-0 pl-2.5 -translate-x-12 group-hover:translate-x-0 ease-out duration-200">
            <svg class="w-5 h-5 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
            </span>
            <span class="relative w-full text-left transition-colors duration-200 ease-in-out group-hover:text-white">Explore</span>
            </div></Link> 
          </div>
        </div>

      </div>
    
    )
    
}   

export default Course;