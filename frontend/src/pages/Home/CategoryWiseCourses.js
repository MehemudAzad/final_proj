import React from 'react'
import { useState,useEffect } from 'react'
import { Link } from 'react-router-dom';

const CategoryWiseCourses = () => {
    const [courses,setCourses] = useState([]);
    const [algorithmCourses,setAlgorithmCourses] = useState([]);
    const [machinelearning,setmachinelearning] = useState([]);
    const [webdevelopment,setwebdevelopment] = useState([]);
    useEffect(
        () => {
            fetch('http://localhost:5002/homepage')
            .then(res => res.json())
            .then(data => setCourses(data))
            
        }
    ,[]);

    useEffect(
        ()=>{
            fetch('http://localhost:5002/homepage/algorithm')
            .then(res => res.json())
            .then(data => setAlgorithmCourses(data))
        }
    ,[]); 

    useEffect(
        ()=>{
            fetch('http://localhost:5002/homepage/machinelearning')
            .then(res => res.json())
            .then(data => setmachinelearning(data))
        }
    ,[]);

    useEffect(
        ()=>{
            fetch('http://localhost:5002/homepage/webdevelopment')
            .then(res => res.json())
            .then(data => setwebdevelopment(data))
        },[]
    );

  return (
    <div>
        <div className="container mx-auto">
            <h1 className="text-3xl font-bold  my-8 p-5">Popular Courses</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {courses.map(course => (
                <div key={course.course_id} className="bg-white shadow-lg rounded-lg overflow-hidden">
                <img src={course.image_url} alt="course" className="w-full h-36 object-cover object-center" />
                <div className="p-4">
                    <h1 className="text-2xl font-bold">{course.course_name}</h1>
                    <p className="mt-2 text-2xl font-bold text-gray-500">{course.course_price}</p>
                    <Link to={`/courses/${course.course_id}`} className="block w-full bg-blue-500 hover:bg-blue-700 p-4 rounded-lg text-white font-bold mt-2 justify-center text-center">
                        View Course
                    </Link>
                </div>
                </div>
            ))}
            </div>
        </div>


        <div className="container mx-auto my-10">
            <h1 className="text-3xl font-bold text-left my-8 p-5">Algorithm Popular Courses</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {algorithmCourses.map(course => (
                <div key={course.course_id} className="bg-white shadow-lg rounded-lg overflow-hidden">
                <img src={course.image_url} alt="course" className="w-full h-36 object-cover object-center" />
                <div className="p-4">
                    <h1 className="text-2xl font-bold">{course.course_name}</h1>
                    <p className="mt-2 text-2xl font-bold text-gray-500">{course.course_price}</p>
                    <Link to={`/courses/${course.course_id}`} className="block w-full bg-blue-500 hover:bg-blue-700 p-4 rounded-lg text-white font-bold mt-2 justify-center text-center">
                        View Course
                    </Link>
                </div>
                </div>
            ))}
            </div>
        </div>

        <div className="container mx-auto">
            <h1 className="text-3xl font-bold text-left my-8 p-5">Machine Learning Popular Courses</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 my-10">
            {machinelearning.map(course => (
                <div key={course.course_id} className="bg-white shadow-lg rounded-lg overflow-hidden">
                <img src={course.image_url} alt="course" className="w-full h-36 object-cover object-center" />
                <div className="p-4">
                    <h1 className="text-2xl font-bold">{course.course_name}</h1>
                    <p className="mt-2 text-2xl font-bold text-gray-500">{course.course_price}</p>
                    <Link to={`/courses/${course.course_id}`} className="block w-full bg-blue-500 hover:bg-blue-700 p-4 rounded-lg text-white font-bold mt-2 justify-center text-center">
                        View Course
                    </Link>
                </div>
                </div>
            ))}
            </div>
        </div>

        <div className="container mx-auto">
            <h1 className="text-3xl font-bold text-left my-8 p-5">Web Development Popular Courses</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 my-10">
            {webdevelopment.map(course => (
                <div key={course.course_id} className="bg-white shadow-lg rounded-lg overflow-hidden">
                <img src={course.image_url} alt="course" className="w-full h-36 object-cover object-center" />
                <div className="p-4">
                    <h1 className="text-2xl font-bold">{course.course_name}</h1>
                    <p className="mt-2 text-2xl font-bold text-gray-500">{course.course_price}</p>
                    <button className="block w-full bg-blue-500 hover:bg-blue-700 p-4 rounded-lg text-white font-bold mt-2">
                        <Link to={`/courses/${course.course_id}`}>View Course</Link>
                    </button>
                </div>
                </div>
            ))}
            </div>
        </div>
    </div>
  )
}

export default CategoryWiseCourses