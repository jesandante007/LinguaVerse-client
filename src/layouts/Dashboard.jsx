import React, { useContext } from "react";
import { NavLink, Outlet } from "react-router-dom";
import { VscListSelection, VscHome, VscTable } from "react-icons/vsc";
import {
  FaClipboardCheck,
  FaClipboardList,
  FaUsers,
  FaListUl,
  FaWallet,
  FaCalendarAlt,
} from "react-icons/fa";
import { AuthContext } from "../providers/AuthProvider";

const Dashboard = () => {
  const { user, role } = useContext(AuthContext);
  return (
    <div className="drawer lg:drawer-open">
      <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content flex flex-col items-center">
        <label
          htmlFor="my-drawer-2"
          className="btn bg-blue-500 hover:bg-blue-700 text-white drawer-button lg:hidden"
        >
          Open drawer
        </label>
        <Outlet />
      </div>
      <div className="drawer-side">
        <label htmlFor="my-drawer-2" className="drawer-overlay"></label>
        <ul className="menu p-4 w-80 h-full bg-base-200 text-base space-y-3">
          <p className="text-center text-3xl font-medium">
            {user?.displayName}
          </p>
          <p className="text-center pb-8">{user?.email}</p>
          {role == "admin" ? (
            <>
              <li>
                <NavLink
                  to="/dashboard/manageUsers"
                  className={({ isActive }) => (isActive ? "bg-gray-300" : "")}
                >
                  <FaUsers size={24} className="mr-3" /> Manage Users
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/dashboard/manageClasses"
                  className={({ isActive }) => (isActive ? "bg-gray-300" : "")}
                >
                  <FaListUl size={24} className="mr-3" /> Manage Classes
                </NavLink>
              </li>
            </>
          ) : role == "instructor" ? (
            <>
              <li>
                <NavLink
                  to="/dashboard/addClass"
                  className={({ isActive }) => (isActive ? "bg-gray-300" : "")}
                >
                  <FaClipboardList size={24} className="mr-3" /> Add a Class
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/dashboard/myClasses"
                  className={({ isActive }) => (isActive ? "bg-gray-300" : "")}
                >
                  <FaCalendarAlt size={24} className="mr-3" /> My Classes
                </NavLink>
              </li>
            </>
          ) : (
            <>
              <li>
                <NavLink
                  to="/dashboard/selectedClasses"
                  className={({ isActive }) => (isActive ? "bg-gray-300" : "")}
                >
                  <VscListSelection size={24} className="mr-3" /> My Selected
                  Classes
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/dashboard/enrolledClasses"
                  className={({ isActive }) => (isActive ? "bg-gray-300" : "")}
                >
                  <FaClipboardCheck size={24} className="mr-3" /> My Enrolled
                  Classes
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/dashboard/paymentHistory"
                  className={({ isActive }) => (isActive ? "bg-gray-300" : "")}
                >
                  <FaWallet size={24} className="mr-3" /> Payment History
                </NavLink>
              </li>
            </>
          )}

          <div className="divider"></div>
          <li>
            <NavLink
              to="/"
              className={({ isActive }) => (isActive ? "bg-gray-300" : "")}
            >
              <VscHome size={24} className="mr-3" /> Home
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/allClasses"
              className={({ isActive }) => (isActive ? "bg-gray-300" : "")}
            >
              <VscTable size={24} className="mr-3" /> Classes
            </NavLink>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Dashboard;
