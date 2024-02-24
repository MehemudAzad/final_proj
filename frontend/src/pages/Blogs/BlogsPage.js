import useTitle from "../../hooks/useTitle";
import Blogs from "./Blogs";
import WriteBlogs from "./WriteBlogs";

const BlogsPage = () => {
    useTitle('Blogs');
    return ( 
        <div className="p-5">

            <WriteBlogs></WriteBlogs>
            <Blogs></Blogs>
        </div>
     );
}
 
export default BlogsPage;