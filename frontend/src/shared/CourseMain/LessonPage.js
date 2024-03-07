// import { useContext } from "react";
// import { useLoaderData } from "react-router-dom";
// import { AuthContext } from "../../context/AuthProvider";
// import LectureCard from "./LectureCard";
// import LectureVideo from "./LectureVideo";

// const LessonPage = () => {
//     const {user} = useContext(AuthContext);
//     const lectures = useLoaderData();
//     console.log(lectures, "hello")
    
//     return ( 
//         <>
//           <div className="drawer lg:drawer-open">
//             <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
//             <div className="drawer-content flex flex-col">
//                 {/* Page content here */}
//                 <LectureVideo></LectureVideo>
//                 <label htmlFor="my-drawer-2" className="btn btn-primary drawer-button lg:hidden">Open drawer</label>
            
//             </div> 
//             <div className="drawer-side">
//                 <label htmlFor="my-drawer-2" aria-label="close sidebar" className="drawer-overlay"></label> 
                

//                 <ul className="menu p-4 w-[450px] min-h-full bg-base-200 text-base-content">
//                 {/* Sidebar content here */}
//                 <div>
//                     <h2 className="text-3xl p-4">Lectures ({lectures.length})</h2>
//                 </div>
//                 <div>
//                     {
//                         lectures.map(lecture => 
//                             <li><LectureCard key={lecture?.lecture_id} lecture={lecture}></LectureCard></li>
//                         )
//                     }
//                 </div>
               
//                 {/* <li><a>Sidebar Item 2</a></li> */}
//                 </ul>
            
//             </div>
//             </div>
           
//         </>
//      );
// }
 
// export default LessonPage;

import React from 'react';

const LessonPage = () => {
    return (
        <div>
            this is lesson page
            load a pdf file from here
        </div>
    );
};

export default LessonPage;