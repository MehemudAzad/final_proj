import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../context/AuthProvider";
import File from "./File";
import { FaPlusCircle } from "react-icons/fa";

const CourseFiles = ({course}) => {
    const {user} = useContext(AuthContext);
    const [submissions, setSubmissions] = useState([]);
    const [selectedFile, setSelectedFile] = useState(null);
    const handleFileChange = (event) => {
        setSelectedFile(event.target.files[0]);
    };
    const getSubmissions = async () => {
      try {
          const response = await fetch(`http://localhost:5002/submission/${course?.course_id}`);
          if (response.ok) {
              const data = await response.json();
              setSubmissions(data);
          } else {
              throw new Error('Failed to fetch submissions');
          }
      } catch (error) {
          console.error('Error fetching submissions:', error);
      }
  };
    const handleFileUpload = () => {
        if (selectedFile) {
          const formData = new FormData();
        formData.append('file', selectedFile);
        formData.append('teacher_id', user?.teacher_id);
        formData.append('course_id', course?.course_id);
            
          fetch('http://localhost:5002/upload', {
            method: 'POST',
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
        getSubmissions();
      };
    useEffect(() => {
        getSubmissions();
        if (course?.course_id) {
            getSubmissions();
        }
        console.log('use effect called to many times')
    }, [course]);
    const handleFile = async() => {
        handleFileChange();
        handleFileUpload();
    }
    return ( 
        <div className="w-[90%]">
            <div className="gap-5">
                <label>
                    <input className="m-2" type="file" onChange={handleFileChange} />
                </label>
                    <button className="btn bg-blue-800 text-white hover:text-blue-800 hover:bg-base-100 hover:border-blue-800 mb-2 w-full" onClick={handleFileUpload}>Upload <FaPlusCircle /></button>
            </div>
            <div className="py-1 px-3 rounded-b-md">
                {
                    submissions?.map(submission => 
                        <File key={submission?.file_id} submission = {submission} />
                    )
                }
            </div>
        </div>
     );
}
 
export default CourseFiles;