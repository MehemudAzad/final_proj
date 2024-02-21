import { useContext } from "react";
import { AuthContext } from "../context/AuthProvider";
import { Link, Outlet, useLoaderData } from "react-router-dom";
import Header from "../shared/Header/Header";
import LectureCard from "../shared/CourseMain/Lecture/LectureCard";

const LessonsLayout = () => {
    const {user} = useContext(AuthContext);
    const lectures = useLoaderData();
    console.log(lectures, "hello")
    
    return ( 
        <>
        <Header></Header>
          <div className="drawer lg:drawer-open">
            <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
            <div className="drawer-content flex flex-col">
                {/* Page content here */}
                {/* <LectureVideo></LectureVideo>
                <div>lecture video </div>
                <Outlet></Outlet>
                <label htmlFor="my-drawer-2" className="btn btn-primary drawer-button lg:hidden">Open drawer</label>
             */}
             <Outlet></Outlet>
            </div> 
            <div className="drawer-side">
                <label htmlFor="my-drawer-2" aria-label="close sidebar" className="drawer-overlay"></label> 
                

                <ul className="menu p-4 w-[450px] min-h-full bg-base-200 text-base-content">
                {/* Sidebar content here */}
                <div>
                    <h2 className="text-3xl p-4">Lectures ({lectures?.length})</h2>
                </div>
                <div>
                    {
                        lectures.map(lecture => 
                            <Link to={`/lessons/${lecture?.lesson_id}/lecture/${lecture?.lecture_id}`} >
                                <li><LectureCard key={lecture?.lecture_id} lecture={lecture}></LectureCard></li>
                            </Link>
                        )
                    }
                </div>
               
                {/* <li><a>Sidebar Item 2</a></li> */}
                </ul>
            
            </div>
            </div>
           
        </>
     );
}
 
export default LessonsLayout;