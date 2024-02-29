import React, { useContext, useEffect, useState } from 'react'
import Blog from './Blog';

const Blogs = () =>{ 
    const [blogs, setblogs] = useState([]);
    // const {blogs, setblogs} = useContext(blogsContext);

    useEffect(()=>{
        fetch("http://localhost:5002/blogs")
        .then(res => res.json())
        .then(data =>setblogs(data))
    },[]);
    
    console.log(blogs);

    
  return (
    <div className='w-[90%] m-auto'>
        <div className='text-4xl pb-5 text-black '>
        <p className='text-indigo-600'> All blogs ( {blogs.length} )</p>
       
      </div>
        <div className='grid grid-cols-4 gap-10 bg-white  m-auto'>
        {
            blogs.map(blog => <Blog blog = {blog} ></Blog>)
        }
        </div>
    </div>
   
  )
}
export default Blogs;

//