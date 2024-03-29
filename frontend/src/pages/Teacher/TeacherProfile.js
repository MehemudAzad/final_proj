import { useContext, useState } from "react";
import { AuthContext } from "../../context/AuthProvider";
import { IoLocation } from "react-icons/io5";
import { GiTeacher } from "react-icons/gi";
import {useLoaderData} from 'react-router-dom';
import AddCourses from "../CourseTeacher/AddCourses";
import CourseTeacherCard from "./CourseTeacherCard";
import { BiSolidInstitution } from "react-icons/bi";
import Settings from "./Settings";
import { MdOutlineSystemUpdateAlt } from "react-icons/md";
import Invites from "./Invites";
/*
city: null
country: null
date_of_birth: null
email: "absk@gmail.com"
id: 26
institution: null
mentored_students: null
mobile: null
password: "123456"
role: "teacher"
teacher_description: null
teacher_id: 2
user_id : 26
user_photo: null
username : "absk"
years_of_experience: null
*/
const TeacherProfile = () => {
    const {user} = useContext(AuthContext);
    const data = useLoaderData();
    const courses = data.courses;
    const userInfo = data.user;
    const [selectedFile, setSelectedFile] = useState(null);
    const {city, country, date_of_birth, id, institution, mentored_students, password, teacher_id, user_photo, username, years_of_experience, email} = user;
    console.log(userInfo.user_photo)
    const imgUrl = userInfo?.user_photo?.substring(6 + 1);
    console.log(imgUrl)
    // console.log(user)
    const handleFileChange = (event) => {
        setSelectedFile(event.target.files[0]);
    };

    const handleFileUpload = () => {
        console.log('he')
        if (selectedFile) {
        const formData = new FormData();
        formData.append('file', selectedFile);
            
          fetch(`http://localhost:5002/upload/image/${id}`, {
            method: 'PATCH',
            body: formData
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
        }
        // getSubmissions();
        // getCommits();
      };
      //../../../server/public/images/2023-09-18 11.52.21.jpg
    //   const image = "../../../../server/public/images/2023-09-18 11.52.21.jpg";
    //http://localhost:5002/images/2023-09-18%2011.52.21.jpg
    return ( 
        <>
            <div className="grid grid-cols-7">
                <div className="bg-blue-900 text-white col-start-1 col-end-3 p-6">
                    <div className="w-100% h-[450px] m-auto static">
                        <img className="rounded-full w-[400px] h-[400px] m-auto mt-6" src={`http://localhost:5002/${imgUrl}`} alt="" />
                        <label className="absolute bottom-[550px] left-[400px] cursor-pointer"><MdOutlineSystemUpdateAlt className="text-3xl"/><input className="hidden" type="file" onChange={handleFileChange} /></label>
                        {
                            selectedFile != null ? <button className="btn" onClick={handleFileUpload}>save</button> : <></>
                        }
                        
                        
                        
                    </div>
                    <div className="p-5">
                        <h2 className="flex items-center gap-3 text-3xl"><GiTeacher />{username}</h2>
                        <h3 className="flex items-center gap-3 text-xl py-2"><span><BiSolidInstitution /></span>{institution}</h3>
                        <div className="flex items-center gap-3 text-xl py-2" >
                            <IoLocation />
                            <h3>{country} , {city}</h3>
                        </div>
                        <div className="flex items-center gap-5 pt-10">
                            <p className="text-xl">Followers (0) </p>
                            <p className="text-xl">Following (0)</p>
                        </div>
                    </div>
                </div>
                <div className=" shadow-lg rounded-lg col-start-3 col-end-8 ">
                     {/* tabs  */}
            <section className="p-4">
            <div role="tablist" className="tabs tabs-lg tabs-lifted py-12">
                <input type="radio" name="my_tabs_2" role="tab" className="tab text-xl  [--tab-bg:bg-blue-200] [--tab-border-color:blue-200]" aria-label="Courses" defaultChecked/>
                <div role="tabpanel" className="tab-content bg-base-100 border-base-300 rounded-box p-6">
                    <section>
                    <h2 className="text-3xl">My courses </h2>
                    <div>
                        {
                            courses.map(course => 
                                <CourseTeacherCard key = {course.course_id} course = {course} />
                            )
                        }
                    </div>
                    
                </section>
                </div>
{/* 
                <input type="radio" name="my_tabs_2" role="tab" className="tab text-2xl [--tab-bg:bg-blue-200] [--tab-border-color:blue-200]" aria-label="Add Courses" />
                <div role="tabpanel" className="tab-content bg-base-100 border-base-300 rounded-box p-6">
                    <AddCourses></AddCourses>
                </div> */}

                <input type="radio" name="my_tabs_2" role="tab" className="tab text-xl [--tab-bg:bg-blue-200] [--tab-border-color:blue-200]" aria-label="Settings" />
                <div role="tabpanel" className="tab-content bg-base-100 border-base-300 rounded-box p-6">
                    {/* <h1 className="text-2xl">setings here </h1> */}
                    <Settings></Settings>
                </div>
                <input type="radio" name="my_tabs_2" role="tab" className="tab text-xl [--tab-bg:bg-blue-200] [--tab-border-color:blue-200]" aria-label="Invites" />
                <div role="tabpanel" className="tab-content bg-base-100 border-base-300 rounded-box p-6">
                    {/* <h1 className="text-2xl">setings here </h1> */}
                    <Invites/>
                </div>
            </div>
            

            </section>

                </div>
            </div>
          
        </>
     );
}
 
export default TeacherProfile;