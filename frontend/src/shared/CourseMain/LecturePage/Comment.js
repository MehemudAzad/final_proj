import React from 'react';
import { BiLike } from "react-icons/bi";
import { BiDislike } from "react-icons/bi";

const Comment = ({cmnt}) => {
    const {comment_id, username, description} = cmnt;
    return (
        <div className='bg-base-300 my-1 p-3 rounded-2xl'>
            <div className='flex gap-4'>
            <img className='w-12 h-12 rounded-full' src="https://images.unsplash.com/photo-1529665253569-6d01c0eaf7b6?q=80&w=3370&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="" />
            <div>
            <h3 className=' text-xl'>{username}</h3>
            <p className='text-sm text-gray-600'>{description}</p>
            
            </div>
        </div>
            <div className='flex items-center justify-between'>
                <div className='flex justify-start'>
                    <BiLike className='text-2xl mt-2 mr-2'/>
                    <BiDislike className='text-2xl mt-2'/>
                </div>
                <button className='btn btn-primary'>Delete</button>
            </div>
        </div>
       
    );
};

export default Comment;