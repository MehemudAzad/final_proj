import React, { useState } from 'react';
import { AuthContext } from "../../context/AuthProvider";
import { useContext } from "react";


export default function WriteBlogs() {
  const { user, setUser } = useContext(AuthContext);
  const [blogCreated, setBlogCreated] = useState(false);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [category, setCategory] = useState('');

  const handleCreateBlog = () => {
    // You can perform any actions necessary to create a new blog here
    // For demonstration purposes, let's just set a state to indicate that a blog is created
    setBlogCreated(true);
  };

  function handleSubmit(e) {
    //const history = useHistory();
    if (user) {
      e.preventDefault();
      fetch('http://localhost:5002/blogs', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          blog_title: title,
          blog_content: content,
          blog_category: category,
          user_id: user.id
        }),
      })
      // .then(response => {
      //   if (response.ok) {
      //     // Redirect to blogs page after successful blog creation
      //     history.push('/blogs');
      //   } else {
      //     // Handle error response if needed
      //     console.error('Error creating blog:', response.statusText);
      //   }
      // })
    }
    else {
      //history.push('/login');
      alert('You must be logged in to write a blog');
    }
    e.preventDefault();
    setCategory('');
    setTitle('');
    setContent('');
    // Link('/blogs');
  }

  return (
    <div className="card flex-shrink-0 bg-base-100 w-[90%] m-auto">
    <form onSubmit={handleSubmit} className="card-body">
      <h1 className="text-4xl font-bold">Create a new Blog now!</h1>
      <div className="form-control">
        <label className="block text-sm font-medium leading-10">
          <span className="label-text">Blog-Title</span>
        </label>
        <div className='mt-2'>
          <textarea
            id="title"
            rows="1"
            class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Give your blog a title... "
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
      </div>
      {/* <div className="form-control" >
        <label className="label">
          <span className="label-text">Blog-Text</span>
        </label>
        <input type="text" name='blog' placeholder="Make your blog" className="input input-bordered" />
      </div> */}
      <div className="form-control">
        <label htmlFor="about" className="block text-sm font-medium leading-10">
          Blog Content
        </label>
        <div className="mt-2">
          <textarea
            id="message"
            rows="25"
            class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Write your thoughts here..."
            value={content}
            onChange={(e) => setContent(e.target.value)}
          ></textarea>
        </div>
        <div className="form-control">
          <label className="block text-sm font-medium leading-10">
            <span className="label-text"> Blog category:</span>
            <span className="label-text-alt"></span>
          </label>
          <select name="category" className="select select-bordered w-full"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option disabled value="">What catagory does this Blog belong to?</option>
            <option value="Web Development">Web Development</option>
            <option value="Machine Learning">Machine Learning</option>
            <option value="Data Structure">Data Structure</option>
            <option value="Data Science">Data Science</option>
            <option value="Dev OPS">Dev OPS</option>
          </select>
        </div>

      </div>
      <div className="form-control mt-6">
        <button type='submit' className="btn btn-primary">Publish</button>
      </div>
    </form>
  </div>
  );

}