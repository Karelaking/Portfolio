import React, { useState, useEffect } from 'react';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/16/solid';
import { Link } from 'react-scroll';

const NavigationBar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const navItems = [
    { name: 'Home', link: 'home' },
    { name: 'About', link: '#about' },
    { name: 'Projects', link: 'projects' },
    { name: 'Contact', link: 'contact' },
  ];

  return (
    <nav
      className={`sticky z-10 w-full top-0 left-0 bg-white text-gray-800 transition-colors duration-300`}
    >
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <a href="#" className="flex items-center">
          <span className="self-center text-2xl font-semibold whitespace-nowrap">
            KatiyarMradul_
          </span>
        </a>
        <div className="flex md:order-2">
          <button
            onClick={toggleMenu}
            type="button"
            className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
            aria-controls="navbar-sticky"
            aria-expanded={isMenuOpen}
          >
            <span className="sr-only">Open main menu</span>
            {isMenuOpen ? <XMarkIcon /> : <Bars3Icon />}
          </button>
        </div>
        <div
          className={`items-center justify-between w-full md:flex md:w-auto md:order-1 ${
            isMenuOpen ? 'block' : 'hidden'
          }`}
          id="navbar-sticky"
        >
          <ul
            className={`flex flex-col p-4 md:p-0 items-center mt-4 font-medium border rounded-lg md:flex-row md:space-x-8 md:mt-0 md:border-0 bg-gray-50 md:bg-white border-gray-100`}
          >
            {navItems.map((item) => (
              <li key={item.name}>
                <Link
                  to={item.link}
                  smooth={true}
                  duration={500}
                  className={`block cursor-pointer py-2 pl-3 pr-4 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 text-gray-900`}
                  aria-current="page"
                >
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default NavigationBar;
