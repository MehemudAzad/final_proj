import React, { useEffect, useState } from 'react'
import { useLoaderData } from 'react-router-dom'
import { useContext } from 'react';
import { AuthContext } from '../../context/AuthProvider';
import Comment from './Comment';
import SingleComment from './SingleComment';

const SingleBlog = () => {
    const blog = useLoaderData(); 
    const {user} = useContext(AuthContext);
    const user_id = user?.id;
    const [comments,setComments] = useState([]);
    const [loading, setLoading] = useState(true);
    // useEffect(()=>{
    //     fetch(`http://localhost:5002/blog_comments/${blog.blog_id}`)
    //     .then(res => res.json())
    //     .then(data =>setComments(data))
    //     .then(setLoading(false))
    // },[]);


    return (
    <div className='p-5 w-[88%] m-auto'>
      <div className='bg-indigo-50'>
        <h2 className='text-4xl font-semibold text-indigo-950 mb-3 bg-indigo-200 rounded-t-lg py-5 px-5'>{blog?.blog_title}</h2>
        <p className='text-xl px-5 tracking-wide leading-8 pt-5 pb-10'>{blog?.blog_content}</p>
      </div>
      <div className="card">
                <div className="flex items-center bg-indigo-100 p-3 gap-5 text-md font-bold">
                  <a href="#!" className="me-3">
                    <i className="far fa-thumbs-up me-2"></i>
                    <p className="">Like</p>
                  </a>
                  <a href="#!" className=" me-3">
                    <i className="far fa-comment-dots me-2"></i>
                    <p className="">Comment</p>
                  </a>
                  <a href="#!" className="me-3">
                    <i className="fas fa-share me-2"></i>
                    <p className="">Share</p>
                  </a>
                </div>
              </div>
        <Comment blog={blog}/>
     
    </div>
  )
}

export default SingleBlog;