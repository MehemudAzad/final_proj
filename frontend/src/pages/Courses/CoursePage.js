import useTitle from "../../hooks/useTitle";
import Courses from "./Courses";

const CorusePage = () => {
    useTitle('Courses')
    return ( 
        <div>
            <Courses></Courses>
        </div>
    );
}
 
export default CorusePage;