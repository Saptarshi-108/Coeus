import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom"; // Import Link for routing

const Navbar = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isServicedropdownopen, setisServicedropdownopen] = useState(false);

  // Refs for dropdowns to detect outside clicks
  const serviceDropdownRef = useRef(null);
  const accountDropdownRef = useRef(null);

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        serviceDropdownRef.current &&
        !serviceDropdownRef.current.contains(event.target)
      ) {
        setisServicedropdownopen(false);
      }
      if (
        accountDropdownRef.current &&
        !accountDropdownRef.current.contains(event.target)
      ) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <nav className="bg-white border-gray-200 dark:bg-gray-900">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        {/* Brand Logo and Name */}
        <Link
          to="/"
          className="flex items-center space-x-3 rtl:space-x-reverse"
        >
          <img
            src="https://flowbite.com/docs/images/logo.svg" // Consider replacing with a local logo
            className="h-8"
            alt="Coeus Logo"
          />
          <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
            Coeus
          </span>
        </Link>

        {/* User Account Dropdown and Mobile Menu Toggle */}
        <div
          className="flex items-center md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse relative"
          ref={accountDropdownRef}
        >
          {/* User Avatar Button */}
          <button
            type="button"
            onClick={() => setIsDropdownOpen((prev) => !prev)}
            className="flex text-sm bg-gray-800 rounded-full focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600"
            aria-expanded={isDropdownOpen ? "true" : "false"}
            aria-haspopup="true"
          >
            <span className="sr-only">Open user menu</span>
            <img
              className="w-8 h-8 rounded-full"
              src="https://github.com/ayantikdas2004/ayantik.com/blob/main/img2.png?raw=true" // Consider replacing with a local image or user profile picture
              alt="user avatar"
            />
          </button>

          {/* User Account Dropdown Menu */}
          <div
            className={`absolute top-12 right-0 z-50 my-4 text-base list-none bg-white divide-y divide-gray-100 rounded-lg shadow-sm dark:bg-gray-700 dark:divide-gray-600 transition-opacity duration-300 ${
              isDropdownOpen ? "opacity-100 visible" : "opacity-0 invisible"
            }`}
          >
            <div className="px-4 py-3">
              <span className="block text-sm text-gray-900 dark:text-white">
                Ayantik Das
              </span>
              <span className="block text-sm text-gray-500 truncate dark:text-gray-400">
                sarbomotabhai@gmail.com
              </span>
            </div>
            <ul className="py-2" aria-labelledby="user-menu-button">
              <li>
                <Link
                  to="/dashboard" // Example route
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                >
                  Dashboard
                </Link>
              </li>
              <li>
                <Link
                  to="/settings" // Example route
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                >
                  Settings
                </Link>
              </li>
              <li>
                <Link
                  to="/earnings" // Example route
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                >
                  Earnings
                </Link>
              </li>
              <li>
                <Link
                  to="/signout" // Example route
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                >
                  Sign out
                </Link>
              </li>
            </ul>
          </div>

          {/* Mobile Menu Toggle Button (Hamburger) */}
          <button
            type="button"
            className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
            onClick={() => setIsMobileMenuOpen((prev) => !prev)}
            aria-controls="navbar-user"
            aria-expanded={isMobileMenuOpen ? "true" : "false"}
          >
            <span className="sr-only">Open main menu</span>
            <svg
              className="w-5 h-5"
              fill="none"
              viewBox="0 0 17 14"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M1 1h15M1 7h15M1 13h15"
              />
            </svg>
          </button>
        </div>

        {/* Main Navigation Links */}
        <div
          className={`${
            isMobileMenuOpen ? "flex" : "hidden"
          } items-center justify-between w-full md:flex md:w-auto md:order-1`}
          id="navbar-user"
        >
          <ul className="flex flex-col font-medium p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
            <li>
              <Link
                to="/"
                className="block py-2 px-3 text-white bg-blue-700 rounded-sm md:bg-transparent md:text-blue-700 md:p-0 md:dark:text-blue-500"
                aria-current="page"
                onClick={() => setIsMobileMenuOpen(false)} // Close mobile menu on click
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                to="/about"
                className="block py-2 px-3 text-gray-900 rounded-sm hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700"
                onClick={() => setIsMobileMenuOpen(false)} // Close mobile menu on click
              >
                About
              </Link>
            </li>

            {/* Services dropdown */}
            <li className="relative" ref={serviceDropdownRef}>
              <button
                onClick={() => setisServicedropdownopen((prev) => !prev)}
                className="flex items-center py-2 px-3 text-gray-900 rounded-sm hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700"
                aria-expanded={isServicedropdownopen ? "true" : "false"}
                aria-haspopup="true"
              >
                Services
                <svg
                  className="w-4 h-4 ml-1"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>

              {/* Conditionally render the dropdown menu for animation */}
              {isServicedropdownopen && (
                <ul
                  className="absolute left-0 z-10 w-44 mt-2 bg-white rounded-lg shadow-lg dark:bg-gray-700 services-dropdown-menu"
                  // Removed transition-all here to let custom CSS manage animations
                >
                  <li>
                    <Link
                      to="/services/resume-scanner"
                      // Removed conflicting Tailwind hover classes
                      className="block px-4 py-2 text-sm text-gray-700 dark:text-white dropdown_item-1"
                      onClick={() => {
                        setisServicedropdownopen(false);
                        setIsMobileMenuOpen(false);
                      }}
                    >
                      Resume Scanner
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/services/interview-scheduler"
                      // Removed conflicting Tailwind hover classes
                      className="block px-4 py-2 text-sm text-gray-700 dark:text-white dropdown_item-2"
                      onClick={() => {
                        setisServicedropdownopen(false);
                        setIsMobileMenuOpen(false);
                      }}
                    >
                      Interview Scheduler
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/services/resume-personalizer" // Placeholder route
                      // Removed conflicting Tailwind hover classes
                      className="block px-4 py-2 text-sm text-gray-700 dark:text-white dropdown_item-3"
                      onClick={() => {
                        setisServicedropdownopen(false);
                        setIsMobileMenuOpen(false);
                      }}
                    >
                      Resume Personalizer
                    </Link>
                  </li>
                </ul>
              )}
            </li>

            <li>
              <Link
                to="/pricing" // Example route
                className="block py-2 px-3 text-gray-900 rounded-sm hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Pricing
              </Link>
            </li>
            <li>
              <Link
                to="/contact" // Example route
                className="block py-2 px-3 text-gray-900 rounded-sm hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Contact
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
