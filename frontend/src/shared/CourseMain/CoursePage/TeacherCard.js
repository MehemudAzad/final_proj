import { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../../context/AuthProvider";

const TeacherCard = ({ teacher, course }) => {
  const { user } = useContext(AuthContext);
  console.log(teacher, "form teacher card");
  /**city
: 
"Dhaka"
country
: 
"Bangladesh"
date_of_birth
: 
"2002-02-13T18:00:00.000Z"
email
: 
"absk@gmail.com"
id
: 
26
mobile
: 
null
password
: 
"123456"
role
: 
"teacher"
user_photo
: 
"public/images/2023-09-18 11.52.21.jpg"
username
: 
"absk" */
  const { id, teacher_id, role, username } = teacher;
  console.log(teacher, "from teahcer card dfafd");
  return (
    <>
      {user?.teacher_id === teacher?.teacher_id ? (
        <>
          hello
          <div className="bg-indigo-50 p-4 rounded my-3">
            <Link to={`/teacher/profile/${user?.teacher_id}`}>
              <h2>
                Name : <span className="text-blue-500">{username}</span>
              </h2>
            </Link>
          </div>
        </>
      ) : (
        <>
          <div className="bg-indigo-50 p-4 rounded my-3">
            <Link to={`/teacher/profile/view/${teacher?.teacher_id}`}>
              <h2>
                Name : <span className="text-blue-500">{username}</span>
              </h2>
            </Link>
          </div>
        </>
      )}
    </>
  );
};

export default TeacherCard;
