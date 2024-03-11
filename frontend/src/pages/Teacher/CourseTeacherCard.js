import { Link } from "react-router-dom";
import { FaUsersBetweenLines } from "react-icons/fa6";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthProvider";
import PrivateRoute from "../../Routes/PrivateRoute/PrivateRoute";

const CourseTeacherCard = ({course}) => {
    const {user} = useContext(AuthContext);
    const [enrolled, setEnrolled] = useState(0);
    const [isEnrolled, setIsEnrolled] = useState(false);
    const [isTeached, setIsTeached] = useState(false);
    const {course_id, course_name,  course_description, course_price, total_lectures, duration, image_url} = course;
    
    // const [teachers, setTeachers] = useState([]);

    //loading the related teachers with this course
    useEffect(()=>{
      fetch(`http://localhost:5002/course-total-student/${course_id}`)
      .then(res => res.json())
      .then(data =>setEnrolled(data[0]?.total_enrolled))
  },[]);
    console.log(enrolled)


    useEffect(() => {
      fetch(`http://localhost:5002/already-enrolled/${course_id}/${user?.student_id}`)
        .then(res => res.json())
        .then(data => setIsEnrolled(data.enrolled))
    })
  
    useEffect(() => {
      fetch(`http://localhost:5002/already-teached/${course_id}/${user?.teacher_id}`)
        .then(res => res.json())
        .then(data => setIsTeached(data.teached))
    })

    const handleDelete = (id) => {
      console.log(id);
      const proceed = window.confirm(
      "Are you sure, you want to cancel this course? "
      );
      if (proceed) {
      fetch(`http://localhost:5002/courses-delete/${id}`, {
          method: "DELETE",
      })
          .then((res) => res.json())
          .then((data) => {
          console.log(data);
          alert("Your course will be deleted after 3 days");
          });
      }
      // window.location = `/lessons/${lecture?.lesson_id}/lecture/${lecture?.lecture_id}`;
  };
    // console.log(teachers[0]?.username)
    //truncate text
    const truncateText = (text, maxLength) => {
      if (text.length <= maxLength) {
        return text;
      } else {
        // Truncate the text to the nearest word within the specified length
        const truncatedText = text.substr(0, text.lastIndexOf(' ', maxLength));
        return `${truncatedText}...`;
      }
    };

    const handleCombinedClick = () => {
    };
    return ( 
        <div>
            <div className="my-8">
            <div className="card card-side bg-indigo-50 shadow-xl p-6 grid grid-cols-3">
            <figure className="rounded-lg"><img className="w-[450px] h-[300px]" src="https://images.unsplash.com/photo-1496181133206-80ce9b88a853?q=80&w=3271&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="Movie"/></figure>
            <div className="card-body col-span-2">
                <h2 className="text-4xl">{course_name}</h2>
                <p>{truncateText(course_description, 400)}</p>

                <div className="card-actions justify-between">
                <div className="flex items-center gap-8">
                    <FaUsersBetweenLines  className="text-4xl"/> 
                    {enrolled}
                </div>
                <div className="flex items-center gap-5">
                { 
                    user?.role === "student" ? 
                    <>
                       {
                    isEnrolled === false ? (
                      <>
                        <PrivateRoute>
                          <Link to={`/courses/${course_id}`}
                          >
                            <button
                              onClick={handleCombinedClick}
                              className="btn text-3xl btn-success bg-emerald-700 text-slate-100"
                            >
                              Explore
                            </button>
                          </Link>
                        </PrivateRoute>
                      </>
                    )
                      :
                      (
                        <>
                          <div className="flex items-center gap-5">
                            <Link to={`/courses/main/${course_id}`}><button className="btn text-3xl btn-success bg-emerald-700 text-slate-100  ">Learn</button></Link>
                          </div>
                        </>
                      )
                  }
                    </> : 
                    <>  
                        <button onClick={()=>handleDelete(course_id)} className="btn btn-primary text-xl">Delete</button>
                        <Link to={`/courses/main/${course_id}`}><button className="btn btn-primary text-xl">Teach</button></Link>
                    </>
                } 
                </div>
                </div>
            </div>
            </div>
            </div>
        </div>
     );
}
 
export default CourseTeacherCard;