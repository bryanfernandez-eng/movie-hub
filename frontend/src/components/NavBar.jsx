import React, { useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import { Link, useLocation } from "react-router-dom";
import { useUser } from "../context/UserContext";

function NavBar() {
  const {user, loading} = useUser(); 
  const [isCollapsed, setIsCollapsed] = useState(true);
  const location = useLocation();

  const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed);
  };

  const isActive = (path) => {
    return location.pathname === path;
  };

  if(loading){
    return 
  }

  return (
    <nav
      className="px-4 py-3 bg-slate-950 pl-[calc(100vw - 100%)]"
      style={{ userSelect: "none" }}
    >
      <div className="container mx-auto flex flex-col md:flex-row items-center ">
        <div className="flex justify-between w-full md:w-auto">
          <Link to="/" className="flex text-white text-xl font-bold">
            Movies <span className="text-amber-100">Hub</span>
          </Link>
          <div
            className="text-white cursor-pointer flex md:hidden items-center"
            onClick={toggleCollapse}
            aria-label={isCollapsed ? "Open menu" : "Close menu"}
          >
            {isCollapsed ? <FaBars /> : <FaTimes />}
          </div>
        </div>

        <div
          className={`${
            isCollapsed ? "hidden" : "flex"
          } flex-col md:flex md:flex-row w-full md:justify-between items-center mt-4 md:mt-0`}
        >
          <ul className="flex flex-col md:flex-row items-center md:mx-auto space-y-2 md:space-y-0 md:space-x-4">
            <li>
              <Link
                to="/search"
                className={`hover:text-slate-300 transition-colors ${
                  isActive("/search") ? "text-amber-100" : "text-slate-100"
                }`}
              >
                Search
              </Link>
            </li>
            <li>
              <Link
                to="/trending"
                className={`hover:text-slate-300 transition-colors ${
                  isActive("/trending") ? "text-amber-100" : "text-slate-100"
                }`}
              >
                Trending
              </Link>
            </li>
            <li>
              <Link
                to="/upcoming"
                className={`hover:text-slate-300 transition-colors ${
                  isActive("/upcoming") ? "text-amber-100" : "text-slate-100"
                }`}
              >
                Upcoming
              </Link>
            </li>
          </ul>

          <div className="flex flex-col md:flex-row items-center space-y-2 md:space-y-0 md:space-x-4 mt-4 md:mt-0">
            <Link
              to={user===null ? "/signup" : "/logout"}
              className={`hover:text-slate-300 transition-colors ${
                isActive("/signup") ? "text-amber-100" : "text-slate-100"
              }`}
            >
              {user===null ? "Signup" : "Logout"}
            </Link>
            <Link
              to={user === null ? "/login" : "/settings"}
              className={`hover:text-slate-300 transition-colors ${
                isActive("/login") ? "text-amber-100" : "text-slate-100"
              }`}
            >
              {user === null ? "Login" : "Settings"}
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default NavBar;
