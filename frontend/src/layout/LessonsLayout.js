import { useContext } from "react";
import { AuthContext } from "../context/AuthProvider";
import { Link, Outlet, useLoaderData, useParams } from "react-router-dom";
import Header from "../shared/Header/Header";
import { IoAddCircleSharp } from "react-icons/io5";
import LectureCard from "../shared/CourseMain/Lecture/LectureCard";
import ModalAddLectures from "../shared/CourseMain/LecturePage/ModalAddLectures";
import { MdEdit } from "react-icons/md";
import { RxCross1 } from "react-icons/rx";

const LessonsLayout = () => {
  const { user } = useContext(AuthContext);
  const lectures = useLoaderData();
  console.log(lectures, "hello");
  const {lecture_id: lec_id, id : lesson_id} = useParams();///lessons/:id/lecture/:lecture_id
  console.log(lec_id, lesson_id);


  const handleDelete = (id) => {
      console.log(id);
      const proceed = window.confirm(
      "Are you sure, you want to cancel this review"
      );
      if (proceed) {
      fetch(`http://localhost:5002/delete-lecture/${id}`, {
          method: "DELETE",
      })
          .then((res) => res.json())
          .then((data) => {
          console.log(data);
          });
      }//http://localhost:3000/courses/main/46
      window.location = `/lessons/${lesson_id}`;
  };



  return (
    <>
      <Header></Header>
      <div className="drawer lg:drawer-open">
        <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content flex flex-col">
          {/* Page content here */}
          <Outlet></Outlet>
        </div>
        <div className="drawer-side">
          <label
            htmlFor="my-drawer-2"
            aria-label="close sidebar"
            className="drawer-overlay"
          ></label>

          <ul className="menu p-4 w-[450px] min-h-full bg-base-200 text-base-content">
            {/* Sidebar content here */}
            <ModalAddLectures lectures={lectures} lesson_id={lesson_id}></ModalAddLectures>
            <div>
              {lectures.length > 0 &&(
                <div>
                     {
                    lectures.map((lecture, index) => (
                      <Link
                        to={`/lessons/${lecture?.lesson_id}/lecture/${lecture?.lecture_id}`}
                      >
                        <li>
                          {
                              lecture?.lecture_id == lec_id ? 
                              <>
                                <div className= "flex items-center justify-between py-5  my-2 bg-blue-400">
                                    <div>{lecture?.lecture_title}</div>
                                    <div className="flex items-center column-reverse gap-4">
                                      {
                                        user?.role === "student" ? <></> : <> <div className="bg-base-100 hover:bg-indigo-200 rounded-full p-1"><MdEdit /></div>
                                        <div className="bg-base-100 hover:bg-indigo-200 rounded-full p-1"><RxCross1 /></div></>
                                      }
                                    </div>
                                </div>
                              </> : 
                              <>
                               <div className= "flex items-center justify-between py-5  my-2 bg-blue-200">
                                    <div>{lecture?.lecture_title}</div>
                                    <div className="flex items-center flex-column-reverse gap-4">
                                    {
                                        user?.role === "student" ? <></> : <>  <div className="bg-base-100 hover:bg-indigo-200 rounded-full p-1"><MdEdit /></div>
                                        <div onClick={()=>handleDelete(lecture?.lecture_id)} className="bg-base-100 hover:bg-indigo-200 rounded-full p-1"><RxCross1 /></div></>
                                      }
                                     
                                    </div>
                                </div>
                              </>
                          }
                          
                        </li>
                      </Link>
                    ))
                  }
                </div>
              ) 
             }
            </div>

            {/* <li><a>Sidebar Item 2</a></li> */}
          </ul>
        </div>
      </div>
    </>
  );
};

export default LessonsLayout;
