import { useContext, useEffect } from "react";
import useTitle from "../../hooks/useTitle";
import Banner from "./Banner";
import TopTeachersHome from "./TopTeachersHome";
import { AuthContext } from "../../context/AuthProvider";
import CategoryWiseCourses from "./CategoryWiseCourses";
import HomeLogin from "./HomeLogin";

const Home = () => {
    useTitle('Home')
    return ( 
        <>
            {/* <HomeLogin></HomeLogin> */}
            <CategoryWiseCourses></CategoryWiseCourses>
            <TopTeachersHome></TopTeachersHome>                
        </>
     );
}
 
export default Home;