import React, { useContext, useEffect, useState } from 'react';
import Comment from './Comment';
import { AuthContext } from '../../../context/AuthProvider';

const LectureComments = ({lecture}) => {
    const [comments, setComments] = useState([]);
    const {user} = useContext(AuthContext);
    const [description, setDescription] = useState('');
    //get the comments related to the lecture
    console.log(lecture)
    // const {lecture_id, pdf_note, video_link, lesson_id} = lecture;
    const getComments = ()=>{
        fetch(`http://localhost:5002/lecture/comments/${lecture?.lecture_id}`)
        .then(res => res.json())
        .then(data => setComments(data))
    }
    useEffect(()=>{
        getComments();
    }, [setComments, lecture?.lecture_id])

    const handleChange = (event) => {
        setDescription(event.target.value);
        console.log(description)
    };
    const handleComment = async (event)=> {
        event.preventDefault();
        try{
            fetch('http://localhost:5002/lecture-comment', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({lecture_id : lecture?.lecture_id, user_id :user?.id, description : description})
          })
          .then(response => {
            if (response.ok) {
              return response.json();
            }
            throw new Error('Network response was not ok.');
          })
          .then(data => {
            // console.log('File uploaded successfully:', data);
          })
          .catch(error => {
            console.error('Error uploading comment:', error);
          });
        }finally{
            getComments();
        }  
    }

    console.log(comments)
    return (
        <>
            <div>
                <h2 className='text-3xl mt-6 font-medium'> {comments?.length} Comments </h2>
            </div>
            <section>
                <div>
                {/* <form class="mx-auto">
                    <label for="message" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">add a new comment</label>
                    <textarea id="message" rows="4" class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Leave a comment..."></textarea>
                    <div className='flex justify-end'>
                        <button className='bg-blue-600 mr-5 rounded-2xl px-3 py-1'>Cancel</button>
                        <button type='submit' className='bg-blue-600 rounded-2xl px-3 py-1'>Comment</button>
                    </div>
                    </form> */}

                    <form class="mx-auto mt-8">
                    <div class="relative z-0 w-full mb-5 group">
                        <input type="text" name="floating_email" id="floating_email" class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required  value={description}
                        onChange={handleChange}/>
                        
                        <label for="floating_email" class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Leave a comment</label>
                    </div>
                        <div className='flex justify-end'>
                        <button type="submit" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-2xl text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Cancel</button>
                        <button type="submit" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-2xl text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 ml-5" onClick={handleComment}>Comment</button>
                        </div>
                    </form>   
                </div>
            </section>
            <div>
                <hr className='mt-4 mb-3 text-green-600' />
            </div>
            <section>
                {
                    comments?.map(cmnt => 
                        <Comment key={cmnt?.comment_id} cmnt = {cmnt}></Comment>
                    )
                }
            </section>
        </>
    );
};

export default LectureComments;




<form class="max-w-md mx-auto">
  <div class="relative z-0 w-full mb-5 group">
      <input type="email" name="floating_email" id="floating_email" class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
      <label for="floating_email" class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Email address</label>
  </div>

  <button type="submit" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Submit</button>
</form>
