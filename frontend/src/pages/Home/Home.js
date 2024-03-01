import { useContext, useEffect } from "react";
import useTitle from "../../hooks/useTitle";
import Banner from "./Banner";
import TopTeachersHome from "./TopTeachersHome";
import { AuthContext } from "../../context/AuthProvider";

const Home = () => {
    useTitle('Home')
    return ( 
        <>
            <Banner></Banner>
            <TopTeachersHome></TopTeachersHome>          
        </>
     );
}
 
export default Home;