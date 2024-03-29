import React, { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthProvider";
import StudentDashboard from "../../pages/Student/StudentDashboard";
import TeacherDashboard from "../../pages/Teacher/TeacherDashboard";

const Header = () => {
  const { user, setUser } = useContext(AuthContext);
  console.log(user ? user : "null");
  const imgUrl = user?.user_photo?.substring(6 + 1);

  //logout user
  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
  };
  // useEffect(() => {
  //     // Load user data from localStorage on component mount
  //     const storedUser = localStorage.getItem('user');
  //     if (storedUser) {
  //       setUser(JSON.parse(storedUser));
  //     }
  //   }, []);
  //   console.log(user);
  return (
    <>
      <nav class="bg-blue-950 border-gray-200 dark:bg-gray-900 ">
        <div class="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
          <Link to="/" class="flex items-center space-x-3 rtl:space-x-reverse">
            <img
              src="https://flowbite.com/docs/images/logo.svg"
              class="h-8"
              alt="Flowbite Logo"
            />
            <span class="self-center text-base-100  text-2xl font-semibold whitespace-nowrap dark:text-white">
              Edukate
            </span>
          </Link>
          <div class="flex items-center md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
            <div
              type="button"
              class="flex text-sm text-white rounded-full md:me-0 focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600 pl-1 pr-3"
              id="user-menu-button"
              aria-expanded="false"
              data-dropdown-toggle="user-dropdown"
              data-dropdown-placement="bottom"
            >
              {user?.id ? (
                <>
                  <div className="dropdown dropdown-end">
                    <div className="flex flex-row-reverse items-center">
                      <h3>{user?.username}</h3>
                      <label
                        tabIndex={0}
                        className="btn btn-ghost btn-circle avatar"
                      >
                        <div className="w-10 rounded-full">
                          {
                            user?.user_photo ?  <img src={`http://localhost:5002/${imgUrl}`} /> :  
                            <img src="https://png.pngtree.com/png-vector/20210702/ourmid/pngtree-black-chess-pawn-png-image_3539520.jpg" />

                          }
                        </div>
                      </label>
                    </div>
                    <ul
                      tabIndex={0}
                      className="mt-3 p-2 text-black shadow menu menu-compact dropdown-content bg-base-100 rounded-box w-52 z-10"
                    >
                      <li>
                        {user?.role === "student" ? (
                          <Link to={`/student/profile/${user?.id}`}>
                            Profile
                          </Link>
                        ) : (
                          <Link to={`/teacher/profile/${user?.teacher_id}`}>
                            teacher Profile
                          </Link>
                        )}
                      </li>
                      <li>
                        {user?.role === "admin" ? (
                          <Link to="/admin/dashboard">Admin </Link>
                        ) : user?.role === "student" ? (
                          <Link to="/student/dashboard">Dashboard</Link>
                        ) : (
                          <Link to="/teacher/dashboard">Dashboard</Link>
                        )}
                        {/* <Link to='/mycourses' className="justify-between">
                    Dashboard
                    <span className="badge">New</span>
                </Link> */}
                      </li>
                      <li>
                        {user?.role === "admin" ? (
                          <Link to="/admin/notification">aNotification </Link>
                        ) : user?.role === "student" ? (
                          <Link to="/student/notification">sNotification</Link>
                        ) : (
                          <Link to="/teacher/notification">Notification</Link>
                        )}
                      </li>
                      <li>
                        <Link onClick={handleLogout} to="/auth/login">
                          Logout
                        </Link>
                      </li>
                    </ul>
                  </div>
                </>
              ) : (
                <>
                  <div>
                    <Link to="/auth/login">
                      <button
                        type="button"
                        class="py-2.5 px-5 me-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-full border border-gray-200 hover:bg-gray-100 hover:text-orange-600 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
                      >
                        Login
                      </button>
                    </Link>
                  </div>
                </>
              )}
            </div>
          </div>

          <div
            class="items-center justify-between hidden w-full md:flex md:w-auto md:order-1 "
            id="navbar-user"
          >
            <ul class="flex flex-col font-medium p-4 md:p-0 mt-4 border border-gray-100 rounded-lg  md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0">
              <li class="block py-2 px-3 text-base-100  rounded hover:bg-orange-600md:hover:bg-transparent md:hover:text-orange-600 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">
                {user?.role === "student" ? (
                  <Link to="/student/dashboard"> Dashboard</Link>
                ) : (
                  <> </>
                )}
                {user?.role === "admin" ? (
                  <Link to="/admin/dashboard"> Admin Dashboard</Link>
                ) : (
                  <> </>
                )}
                {user?.role === "teacher" ? (
                  <Link to="/teacher/dashboard"> Dashboard</Link>
                ) : (
                  <> </>
                )}
              </li>
              <li>
                <Link
                  to="/"
                  class="block py-2 px-3 text-base-100  rounded hover:text-orange-600 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to="/courses"
                  class="block py-2 px-3 text-base-100  rounded hover:bg-orange-600md:hover:bg-transparent md:hover:text-orange-600 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
                >
                  Courses
                </Link>
              </li>
              <li>
                <Link
                  to="/blogs"
                  class="block py-2 px-3 text-base-100  rounded hover:text-orange-600 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
                >
                  Blogs
                </Link>
              </li>
              {/* <li>
                <Link to="/login" class="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">Login</Link>
              </li> */}
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Header;
