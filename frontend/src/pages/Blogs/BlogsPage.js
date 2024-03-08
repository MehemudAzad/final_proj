import { Link } from "react-router-dom";
import useTitle from "../../hooks/useTitle";
import Blogs from "./Blogs";
import WriteBlogs from "./WriteBlogs";

const BlogsPage = () => {
    useTitle('Blogs');
    return ( 
        <div className="p-5 m-auto w-[90%]">
            {/* <WriteBlogs></WriteBlogs> */}
            <Link to={`/create-blogs`}><button className='btn btn-primary mb-10 w-full'>Create your own blog</button></Link>
            <Blogs></Blogs>
        </div>
     );
}
 
export default BlogsPage;