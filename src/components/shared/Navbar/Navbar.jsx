import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../providers/AuthProvider";
import { Link } from "react-router-dom";
import { FaRegMoon, FaRegSun, FaUser } from "react-icons/fa";

const Navbar = () => {
  const { user, logOut } = useContext(AuthContext);
  const [theme, setTheme] = useState(
    localStorage.getItem("theme") ? localStorage.getItem("theme") : "light"
  );

  const handleToggle = (e) => {
    const value = e.target.checked;
    if (value) {
      setTheme("dracula");
    } else {
      setTheme("light");
    }
  };

  useEffect(() => {
    localStorage.setItem("theme", theme);
    const localTheme = localStorage.getItem("theme")
    document.querySelector("html").setAttribute("data-theme", localTheme);
  }, [theme]);

  const handleLogOut = () => {
    logOut()
      .then()
      .catch((error) => console.log(error.message));
  };

  const navItem = (
    <>
      <li>
        <Link to="/">Home</Link>
      </li>
      <li>
        <Link to="/allInstructors">Instructors</Link>
      </li>
      <li>
        <Link to="/allClasses">Classes</Link>
      </li>
      {user && (
        <li>
          <Link to="/dashboard">Dashboard</Link>
        </li>
      )}
    </>
  );
  return (
    <div className="navbar mx-auto bg-base-200 bg-opacity-30 shadow-sm xl:px-10 md:px-6 sm:px-2 px-4">
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
            className="menu menu-sm dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52 z-10"
          >
            {navItem}
          </ul>
        </div>
        <Link>
          <span className="text-sm lg:text-2xl font-bold font-mono">
            LinguaVerse
          </span>
        </Link>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1 text-base">{navItem}</ul>
      </div>
      <div className="navbar-end">
        {user ? (
          <div
            className="dropdown dropdown-end tooltip tooltip-bottom"
            data-tip={user.displayName}
          >
            <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
              <div className="w-10 rounded-full ring-1 ring-blue-500 ring-offset-2">
                <img src={user ? user.photoURL : <FaUser />} />
              </div>
            </label>
            <ul
              tabIndex={0}
              className="mt-3 p-2 shadow menu menu-compact dropdown-content bg-base-100 rounded-box w-52 z-10"
            >
              <li onClick={handleLogOut}>
                <a>Logout</a>
              </li>
            </ul>
          </div>
        ) : (
          <Link to="/login" className="tooltip tooltip-bottom" data-tip="Login">
            <button className="btn btn-ghost btn-circle text-2xl my-btn">
              <FaUser />
            </button>
          </Link>
        )}
        <label className="swap swap-rotate ml-3">
          <input onChange={handleToggle} type="checkbox" />
          <FaRegSun className="swap-on fill-current w-6 h-6" />
          <FaRegMoon className="swap-off fill-current w-6 h-6" />
        </label>
      </div>
    </div>
  );
};

export default Navbar;
