import React, { useState } from "react";
import TitleLogo from "../../images/A.png";
import { Link } from "react-router-dom";
import { HashLink as Hlink } from "react-router-hash-link";

export default function Navbar() {
  const [showMenu, setShowMenu] = useState(false);
  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };
  return (
    <div className="bg-white sticky top-0 z-50">
      <div className="flex justify-between items-center px-4 md:px-20 h-16">
        <div className="flex items-center text-lg">
          <img className="w-10" src={TitleLogo} alt="Logo"></img>
          <h1 className="ml-2">Avalon Hirings</h1>
        </div>
        <div className="hidden md:flex items-center space-x-3">
          <Hlink to="#hero" className="hover:text-sky-700">
            Home
          </Hlink>
          <Hlink to="#about" className="hover:text-sky-700">
            About
          </Hlink>
          <Hlink to="#contact" className="hover:text-sky-700">
            Contact
          </Hlink>
          {/* <Hlink to="#reviews" className="hover:text-sky-700">
            Reviews
          </Hlink> */}
          <button className="bg-green-600 text-white py-2 px-4 hover:bg-green-900">
            <Link to="/login">LOGIN</Link>
          </button>
          <button className="bg-sky-600 text-white py-2 px-4 hover:bg-sky-900">
            <Link to="/register">JOIN US</Link>
          </button>
        </div>
        <div className="md:hidden">
          <button
            id="menu-toggle"
            onClick={toggleMenu}
            className="focus:outline-none"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"
              ></path>
            </svg>
          </button>
        </div>
      </div>
      {showMenu && (
        <div className="md:hidden bg-white border rounded-lg shadow-lg">
          <ul className="divide-y divide-gray-200">
            <li>
              <Hlink to="#hero" className="block py-2 px-4 hover:text-sky-700">
                Home
              </Hlink>
            </li>
            <li>
              <Hlink to="#about" className="block py-2 px-4 hover:text-sky-700">
                About
              </Hlink>
            </li>
            <li>
              <Hlink
                to="#contact"
                className="block py-2 px-4 hover:text-sky-700"
              >
                Contact
              </Hlink>
            </li>
            {/* <li>
              <Hlink
                to="#reviews"
                className="block py-2 px-4 hover:text-sky-700"
              >
                Reviews
              </Hlink>
            </li> */}
            <li>
              <button className="block w-full bg-green-600 text-white py-2 px-4 hover:bg-green-900">
                <Link to="/login">LOGIN</Link>
              </button>
            </li>
            <li>
              <button className="block w-full bg-sky-900 text-white py-2 px-4 hover:bg-sky-900">
                <Link to="/register">JOIN US</Link>
              </button>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
}
