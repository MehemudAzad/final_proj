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

    //delete operation
    // const handleDelete = id =>{
    //     console.log(id);
    //     const proceed = window.confirm('Are you sure, you want to cancel this review');
    //     if(proceed){
    //         fetch(`http://localhost:5002/blogs/${id}`, {
    //             method: 'DELETE'
    //            })
    //         .then(res => res.json())
    //         .then(data => {
    //             console.log(data);
    //         })
    //     }
    //     window.location = '/';
    // }
    
  return (
    <>
    <div className='text-5xl ml-40  md-10 text-black'>
        All blogs ( {blogs.length} )
    </div>
    <div className='grid grid-cols-2 bg-white w-[86%] m-auto'>
    {
        blogs.map(blog => <Blog key={blog.blog_id} blog={blog.blog_content}></Blog>)
    }
    </div>
    </>
    
  )
}
export default Blogs;

//
