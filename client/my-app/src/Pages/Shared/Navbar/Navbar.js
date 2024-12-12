import React, { useContext, useEffect, useState } from "react";
import { AiOutlineUser } from "react-icons/ai";
import { FcServices } from "react-icons/fc";
import "./Navbar.css";
import Cookies from 'js-cookie';

// import { BsSun } from 'react-icons/bs';
// import { BsMoonStars } from 'react-icons/bs';

import { Link, NavLink, useNavigate } from "react-router-dom";
import { AuthContext } from "../../../Contexts/AuthProvider";
import { decodeToken } from "../../../utils/decodeToken";

const Navbar = () => {
  const navigate = useNavigate();
  const { user, logOut,setUser } = useContext(AuthContext);

  //  useEffect(() => {
 
  //    if(user === null){
  //      const token = Cookies.get('token'); 
  //      console.log(token);
  //      if (token) {
  //        const user = decodeToken(token);
  //        console.log(user);
  //        setUser(user); 
  //      }
 
  //    }
    
  //  }, [user,setUser]);

 
  console.log(user);
  const email = user?.email;
  // (email);
  // (user);
  // const {mood,setMood} = useContext(MoodContext);

  const handleLogOut = () => {
    logOut();
    navigate("/")
    
     
  };

  return (
    <div>
      <div className="navbar bg-base-100">
        <div className="navbar-start">
          <div className="dropdown">
            <label tabIndex={0} className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </label>
            <ul
              tabIndex={0}
              className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52"
            >
             
             
            
              {user ? (
                <li>
                  {" "}
                  <Link to="/lessons">Lessons</Link>{" "}
                </li>
              ) : (
                ""
              )}
              {user.role ==='admin' ? (
                <li>
                  {" "}
                  <Link to="/dashboard">Dashboard</Link>{" "}
                </li>
              ) : (
                ""
              )}
            </ul>
          </div>
          <Link to="/" className="btn btn-ghost normal-case text-xl">
            Learn Japanese 
          </Link>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">
          
         
            
            {user ? (
              <li>
                {" "}
                <NavLink
                  className={({ isActive }) =>
                    isActive
                      ? " active topic-name text-decoration-none"
                      : " topic-name text-decoration-none"
                  }
                  to={`/lessons`}
                >
                 Lessons
                </NavLink>{" "}
              </li>
            ) : (
              ""
            )}
            {user ? (
              <li>
                {" "}
                <NavLink
                  className={({ isActive }) =>
                    isActive
                      ? " active topic-name text-decoration-none"
                      : " topic-name text-decoration-none"
                  }
                  to="/dashboard"
                >
                  Dashboard
                </NavLink>{" "}
              </li>
            ) : (
              ""
            )}
          
          </ul>
        </div>
        <div className="navbar-end">
          {/* {user ?  <Link to="/login" className="btn btn-ghost">Sign in</Link> :  <Link to="/login" className="btn btn-ghost">Sign in</Link>  }     */}
          <ul>
            <li>
              <span className={"  topic-name text-decoration-none"}>
                <>
                  {user?.id ? (
                    <div className="d-flex align-middle">
                      <div className="flex align-bottom ">
                        <span>
                          {" "}
                          {user?.photo ? (
                            <img
                              className="img-fluid  user-img me-2"
                              src={user.photo}
                              alt=""
                            />
                          ) : (
                            <AiOutlineUser></AiOutlineUser>
                          )}{" "}
                        </span>
                        <span className="flex my-auto">
                          {user?.name || user?.id}
                        </span>
                        <button
                          className="btn btn-outline ms-2"
                          onClick={handleLogOut}
                        >
                          Log out
                        </button>
                      </div>
                    </div>
                  ) : (
                    <>
                      <button className="btn btn-outline">
                        <Link
                          className="topic-name text-decoration-none "
                          to="/login"
                        >
                          Login{" "}
                        </Link>
                      </button>
                    </>
                  )}
                </>
              </span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
