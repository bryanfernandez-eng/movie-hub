import React, { useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import { Link } from "react-router-dom";

function NavBar() {
  const [isCollapsed, setIsCollapsed] = useState(true);

  const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <nav className="bg-gray-900 px-4 py-3 bg-slate-950" style={{ userSelect: "none" }}>
      <div className="container mx-auto flex flex-col md:flex-row items-center">
        <div className="flex justify-between w-full md:w-auto">
          <Link to="/" className="text-white text-xl font-bold">
            MovieHub
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
              <Link to="/search" className="text-white hover:text-gray-300 transition-colors">
                Search
              </Link>
            </li>
            <li>
              <Link to="/trending" className="text-white hover:text-gray-300 transition-colors">
                Trending
              </Link>
            </li>
            <li>
              <Link to="/upcoming" className="text-white hover:text-gray-300 transition-colors">
                Upcoming
              </Link>
            </li>
          </ul>

          <div className="flex flex-col md:flex-row items-center space-y-2 md:space-y-0 md:space-x-4 mt-4 md:mt-0">
            <Link
              to={"/signup"}
              className="text-white hover:text-gray-300 transition-colors"
            >
              {"Signup"}
            </Link>
            <Link
              to={ "/login"}
              className="text-white hover:text-gray-300 transition-colors"
            >
              { "Login"}
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default NavBar;