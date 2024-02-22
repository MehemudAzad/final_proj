import { Link } from "react-router-dom";

const TeacherCard = ({teacher}) => {
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
    const {id, teacher_id, role, username} = teacher;
    return ( 
        <>  
            <div className="bg-indigo-50 p-4 rounded my-3">
               <Link></Link> <h2>Name : {username}</h2>
            </div>
        </>
     );
}
 
export default TeacherCard;