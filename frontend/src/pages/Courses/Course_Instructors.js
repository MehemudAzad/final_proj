import { isNull } from "lodash";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthProvider";
import { Link } from "react-router-dom";

const CourseInstructors = ({teacher}) => {
    const {user} = useContext(AuthContext);
    const {email,  username, image_url} = teacher;
    const imgUrl = teacher?.user_photo?.substring(7);
    return ( 
        <div className="m-auto bg-blue-300 px-40 border-solid my-1">
            <div className="flex gap-20 py-10">
                <div className="w-[40%]">
                {
                    teacher?.user_photo ?  <img className="size-72 rounded-full" src={`http://localhost:5002/${imgUrl}`} /> :  
                    <img className="size-72 rounded-full" src="https://png.pngtree.com/png-vector/20210702/ourmid/pngtree-black-chess-pawn-png-image_3539520.jpg" />
                }
                         
                </div>
                <div className="w-[60%] text-left">
                   <Link to={`/teacher/profile/view/${teacher?.teacher_id}`}><h1 className="hover:underline text-3xl text-left text-indigo-950 font-bold">{username}</h1></Link>
                    <h3 className="text-2xl text-indigo-800 py-4">{email}</h3>
                    <h4 className="text-white"> Lorem ipsum dolor sit amet consectetur adipisicing elit. Numquam, molestias officiis earum enim deserunt accusantium minus possimus ab! Non illo sint praesentium maiores. Laudantium asperiores assumenda, corporis hic error sapiente fuga aliquam. Maiores debitis, molestias rem unde quaerat aliquam explicabo velit eaque voluptas nulla quo quasi quisquam, sint pariatur quibusdam reprehenderit in, nisi ex voluptatem animi enim voluptates! Culpa consectetur itaque vitae temporibus consequuntur inventore? Sunt recusandae omnis veniam officiis? Libero, officia beatae facere molestiae modi explicabo optio minima iure dignissimos amet quas expedita perferendis quaerat adipisci itaque qui provident odio quo quibusdam natus, consectetur perspiciatis eum officiis! </h4>
                </div>
            </div>
        </div>
     );
}
 
export default CourseInstructors;