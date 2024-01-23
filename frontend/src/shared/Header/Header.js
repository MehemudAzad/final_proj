import React, { useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../context/AuthProvider';

const Header = () => {
    const {user, setUser} = useContext(AuthContext);
    console.log(user?user:"null");
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
        <nav class="bg-white border-gray-200 dark:bg-gray-900 ">
          <div class="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
          <a href="https://flowbite.com/" class="flex items-center space-x-3 rtl:space-x-reverse">
              <img src="https://flowbite.com/docs/images/logo.svg" class="h-8" alt="Flowbite Logo" />
              <span class="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">Edukate</span>
          </a>
          <div class="flex items-center md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
              <div type="button" class="flex text-sm text-whit bg-gray-200 rounded-full md:me-0 focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600 pl-1 pr-3" id="user-menu-button" aria-expanded="false" data-dropdown-toggle="user-dropdown" data-dropdown-placement="bottom">
        {
        user?.id ?
        <>
            <div className="dropdown dropdown-end">
            <div className='flex flex-row-reverse items-center'>
            <h3>{user?.username}</h3>
            <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                <div className="w-10 rounded-full">
                <img src={user?.photoURL ? user.photoURL : "https://w7.pngwing.com/pngs/96/435/png-transparent-world-chess-championship-pawn-chess-piece-chess-engine-cheess-game-king-queen-thumbnail.png"}/>
                </div>
            </label>
            </div>
            <ul tabIndex={0} className="mt-3 p-2 shadow menu menu-compact dropdown-content bg-base-100 rounded-box w-52 z-10">
                <li><Link to={`/profile/${user?.id}`}>Profile</Link></li>
                <li>
                <Link to='/mycourses' className="justify-between">
                    My Courses
                    <span className="badge">New</span>
                </Link>
                </li>
                <li><Link to='login'>Logout</Link></li>
            </ul>
            </div>
        </>
        :
        <>
            <div>
                <Link to="/login" class="py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">Login</Link>
            </div>
        </>
        }
              </div>  
          </div>


          <div class="items-center justify-between hidden w-full md:flex md:w-auto md:order-1" id="navbar-user">
            <ul class="flex flex-col font-medium p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
              <li>
              <Link to="/" class="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">Home</Link>
              </li>
              <li>
                <Link to="/about" class="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">About</Link>
              </li>
              {user?.role === 'teacher' && <>
                <li>
                    <Link to="/addcourses" class="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">Add Courses</Link>
                </li>
              </>}
              <li>
              <Link to="/courses" class="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">Courses</Link>
              </li>
              <li>
                <Link to="/blogs" class="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">Blogs</Link>
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
}
 
export default Header;