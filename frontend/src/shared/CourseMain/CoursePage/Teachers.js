import { useContext, useEffect, useState } from "react";
import TeacherCard from "./TeacherCard";
import { Link } from "react-router-dom";
import { FaPlusCircle } from "react-icons/fa";
import { AuthContext } from "../../../context/AuthProvider";
import StarRating from "../../../components/CourseRating";

const Teachers = ({course}) => {
    const {user} = useContext(AuthContext);
    const [username, setUsername] = useState('');
    const [users, setUsers] = useState([]);
    const [teachers, setTeachers]= useState([]);

    const getTeachers = () => {
        fetch(`http://localhost:5002/courses/teachers/${course?.course_id}`)
        .then(res => res.json())
        .then(data =>setTeachers(data.teachers))
    }
    useEffect(()=>{
        getTeachers();
    },[]);

    const handleSearch = async () => {
        try {
        //   console.log(username);
          const response = await fetch(`http://localhost:5002/teachers/${username}`);
          if(response.ok) {
              const data = await response.json();
              setUsers(data);
              console.log(data);
          }
        } catch (error) {
          console.error('Error searching for user:', error.response);
          setUsers(null);
        }
      };
 
      
    const handleInvitation = async (user_id) => {
        console.log('inside invite functino ' , user_id);
        try{
            fetch('http://localhost:5003/project/invite', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({user_id : user_id, course_id :course?.course_id})
          })
          .then(response => {
            if (response.ok) {
              return response.json();
            }
            throw new Error('Network response was not ok.');
          })
          .then(data => {
            console.log('File uploaded successfully:', data);
          })
          .catch(error => {
            console.error('Error uploading file:', error);
          });
        }finally{

        }  
    }

    return ( 
        <div className="w-[80%]">
            <div>
            {
              user?.role === 'teacher' ?  <button className="btn w-full" onClick={()=>document.getElementById('my_modal_5').showModal()}>Invite <FaPlusCircle /></button> :
              <></>
            }
             {/* <StarRating rating={3.5}></StarRating> */}
                   {/* You can open the modal using document.getElementById('ID').showModal() method */}
                        <dialog id="my_modal_5" className="modal">
                        <div className="modal-box w-11/12 max-w-5xl h-[500px]">
                            <h3 className="font-bold text-lg mb-3 pt-10">Search for collaborators!</h3>
                             {/* take input  */}
                             <div className="flex items-center gap-4">
                             <input className="input w-full bg-gray-200"
                                type="text"
                                placeholder="Enter username"
                                value={username}
                                onChange={(e) => {
                                    setUsername(e.target.value); 
                                    handleSearch();
                                }} />
                             </div>

                            <div className="mt-3">
                                {users && 
                                 users?.map(user =>
                                    <div className="flex items-center justify-between bg-indigo-100 rounded-md p-2 my-3 hover:bg-indigo-200">
                                      <div>
                                        <p>Email: {user.email}</p>
                                        <Link to={`/teacher/profile/view/${user?.id}`}><p>Username: <span className="text-blue-600 hover:underline">{user.username}</span></p></Link>
                                      </div>
                                      {/* Display other user data as needed */}
                                      <div className="modal-action">
                                        <form method="dialog">
                                          <button onClick={()=>handleInvitation(user.id)} className="btn btn-primary">Invite</button>
                                        </form>
                                      </div>
                                    </div>
                                )
                               }

                            </div>
                            <div className="modal-action">
                            <form method="dialog">
                                {/* if there is a button, it will close the modal */}
                                <button className="btn bg-base-200 rounded-full absolute top-5 right-5">X</button>
                            </form>
                            </div>
                        </div>
                        </dialog>
            </div>
            <div>
                {
                    teachers?.map(teacher =>
                            <TeacherCard key={teacher.id} teacher={teacher} course={course}/>
                        )
                }
               
            </div>
        </div>
     );
}
 
export default Teachers;