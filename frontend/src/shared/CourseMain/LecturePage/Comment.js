import React, { useContext } from 'react';
import { BiLike } from "react-icons/bi";
import { BiDislike } from "react-icons/bi";
import { AuthContext } from '../../../context/AuthProvider';

const Comment = ({cmnt}) => {
    const {user} = useContext(AuthContext);
    const {comment_id, username, description} = cmnt;
    console.log(cmnt?.user_photo)
     const imgUrl = cmnt?.user_photo?.substring(6 + 1);
    return (
        <div className='bg-base-200 my-2 p-2 rounded-xl'>
            <div className='flex gap-4'>
            {
                            cmnt?.user_photo ?  <img className='size-10 rounded-full' src={`http://localhost:5002/${imgUrl}`} /> :  
                            <img className='size-10 rounded-full' src="https://png.pngtree.com/png-vector/20210702/ourmid/pngtree-black-chess-pawn-png-image_3539520.jpg" />

                          }
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
                {
                    user?.id === cmnt?.user_id ?<><button className='btn btn-primary'>Delete</button></> : <></>
                     
                }
            </div>
        </div>
       
    );
};

export default Comment;