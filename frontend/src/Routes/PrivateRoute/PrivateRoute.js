import React, { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";
// import { AuthContext } from '../../context/AuthProvider/AuthProvider';
import { FadeLoader } from "react-spinners";
import { AuthContext } from "../../context/AuthProvider";

const PrivateRoute = ({ children }) => {
  const { user, loading } = useContext(AuthContext);
  const location = useLocation();

  if (loading) {
    return (
      <FadeLoader
        className="py-40 my-20 mx-auto"
        color="#36d7b7"
        height={25}
        width={5}
      />
    );
  }
  // console.log(user);
  if (user) {
    return children;
  }

  // state name er ekata props e from namok property te location ta set korsi
  return (
    <Navigate to="/auth/login" state={{ from: location }} replace></Navigate>
  );
};

export default PrivateRoute;
