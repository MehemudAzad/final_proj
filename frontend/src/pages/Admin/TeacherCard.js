import { Link } from "react-router-dom";

const TeacherCard = ({teacher, handleDelete}) => {
    return ( 
        <div className="bg-base-100 hover:bg-indigo-100 my-2 px-3 flex items-center justify-between">
            <div className="p-4 rounded my-3">
              <Link to={`/teacher/profile/${teacher?.teacher_id}`}>
                <h2>
                  Name : <span className="text-blue-500 hover:underline hover:text-blue-700">{teacher?.username}</span> 
                </h2>
              </Link>
              <h2>
                  Instituition : <span>{
                    teacher?.institution ? <>
                    <span className="text-blue-500">
                    {teacher?.institution}
                  </span></> :
                    <>
                    not available
                    </>
                  }</span>     
              </h2>
            </div>
            <button onClick={()=>handleDelete(teacher?.teacher_id)} className="btn btn-primary">Delete</button>
        </div>
     );
}
 
export default TeacherCard;