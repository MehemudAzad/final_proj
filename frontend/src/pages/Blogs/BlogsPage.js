import useTitle from "../../hooks/useTitle";
import Blogs from "./Blogs";

const BlogsPage = () => {
    useTitle('Blogs');
    return ( 
        <div className="p-5">
            <Blogs></Blogs>
            
        </div>
     );
}
 
export default BlogsPage;