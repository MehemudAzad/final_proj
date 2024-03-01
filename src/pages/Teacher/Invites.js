import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthProvider";

const Invites = ({}) => {
    const [invites, setInvites] = useState([]);
    const {user} = useContext(AuthContext);
    // /course-invite/:teacher_id
    const getInvites = async() => {
        try{
            fetch(`http://localhost:5002/course-invite/${user?.teacher_id}`)
            .then(res => res.json())
            .then(data => setInvites(data))
        }catch(error){
            console.error(error)
        }
    }
    useEffect(()=>{
        // const getInvites = async () => {
        //     try {
        //         const response = await courseFinder.get(`/teacher-courses/${user?.teacher_id}`)
        //         // const data = await response.json();
        //         console.log(response?.data?.courses)
        //         setCoursesTeacher(response?.data?.courses);
        //     } catch (error) {
        //         console.log('teacher dashboard : ' + error)
        //     }
        // }
        getInvites()
    }, []);
    console.log(invites)

    const acceptInvitation = async (course_id)=>{
        // console.log('inside invite functino ' , user_id);
        try{
            fetch('http://localhost:5002/course/invite/accept', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({teacher_id : user?.teacher_id, course_id : course_id})
            })
            .then(response => {
            if (response.ok) {
                return response.json();
            }
            throw new Error('Network response was not ok.');
            })
            .then(data => {
                console.log('File uploaded successfully:', data);
                getInvites();
            })
            .catch(error => {
            console.error('Error uploading file:', error);
            });
        }finally{
            
        }  
    }


    const rejectInvitation = async (course_id)=>{
        try{
            fetch('http://localhost:5002/course/invite/deny', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({teacher_id : user?.teacher_id, course_id : course_id})
            })
            .then(response => {
            if (response.ok) {
                return response.json();
            }
            throw new Error('Network response was not ok.');
            })
            .then(data => {
                console.log('File uploaded successfully:', data);
                getInvites();
            })
            .catch(error => {
            console.error('Error uploading file:', error);
            });
        }finally{
            
        }  
    }
    return ( 
        <>
            show invites here
            {
                invites.map(invite=>
                    <div className="bg-indigo-100 p-4 my-2 flex items-center justify-between">
                        <div>
                            <h2>Course Name : <span className="text-blue-600  hover:underline">{invite?.course_name}</span></h2>
                            <h3>Course Price : {invite?.course_price}</h3>
                        </div>
                        <div className="flex items-center gap-2">
                            <button className="btn btn-primary " onClick={()=>acceptInvitation(invite?.course_id)}>ACCEPT</button>
                            <button className="btn btn-primary" onClick={()=>rejectInvitation(invite?.course_id)}>DENY</button>
                        </div>
                        
                    </div>
                )
            }
        </>
    );
}
 
export default Invites;