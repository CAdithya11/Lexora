import React, { useState, useEffect, useRef } from 'react';
import {
  Menu,
  X,
  ChevronDown,
  Home,
  Info,
  Users,
  Eye,
  Mail,
  Box,
  LogIn,
  UserPlus,
  TrendingUp,
  Map,
  UserCheck,
  Book,
  Users as UsersIcon,
} from 'lucide-react';
import logo from '../../assets/logo.png'; // Assuming logo path

const NavBar = ({ activeNavMenu }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showAppsDropdown, setShowAppsDropdown] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const appsDropdownRef = useRef(null);

  // Handle scroll event for navbar shadow effect
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (appsDropdownRef.current && !appsDropdownRef.current.contains(event.target)) {
        setShowAppsDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const toggleAppsDropdown = () => {
    setShowAppsDropdown(!showAppsDropdown);
  };

  // App items with their icons
  const appItems = [
    {
      title: 'Real-Time Industry Trends',
      description: 'Track latest market demands and skills',
      icon: <TrendingUp size={16} className="text-indigo-500" />,
    },
    {
      title: 'Roadmap Generator',
      description: 'Create personalized career paths',
      icon: <Map size={16} className="text-indigo-500" />,
    },
    {
      title: 'Persona Matcher',
      description: 'Find your ideal professional persona',
      icon: <UserCheck size={16} className="text-indigo-500" />,
    },
    {
      title: 'Skill Gap Analyzer',
      description: 'Identify skills to develop',
      icon: <Book size={16} className="text-indigo-500" />,
    },
    {
      title: 'Mentor-Mentee Matchmaking',
      description: 'Connect with industry mentors',
      icon: <UsersIcon size={16} className="text-indigo-500" />,
    },
  ];

  return (
    <nav
      className={`bg-white fixed w-full top-0 z-50 transition-all duration-300 ${scrolled ? 'shadow-lg' : 'shadow-md'}`}
    >
      <div className=" mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Logo and Brand */}
          <div className="flex-shrink-0 flex items-center">
            <img className="h-8 w-auto" src={logo} alt="Logo" />
            <span className="ml-2 text-xl font-bold text-indigo-700">Lexora</span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center">
            <div className="ml-14 flex items-baseline space-x-2">
              <a
                href="#"
                className={`text-gray-900 hover:text-indigo-600 px-3 py-2 font-medium transition-colors duration-200 flex items-center border-b-2 ${
                  activeNavMenu === 'home' ? 'border-indigo-600' : 'border-transparent hover:border-indigo-600'
                } `}
              >
                <Home size={18} className="mr-1" />
                Home
              </a>
              <a
                href="#"
                className={`text-gray-900 hover:text-indigo-600 px-3 py-2 font-medium transition-colors duration-200 flex items-center border-b-2 ${
                  activeNavMenu === 'aboutUs' ? 'border-indigo-600' : 'border-transparent hover:border-indigo-600'
                } `}
              >
                <Info size={18} className="mr-1" />
                About Us
              </a>
              <a
                href="#"
                className={`text-gray-900 hover:text-indigo-600 px-3 py-2 font-medium transition-colors duration-200 flex items-center border-b-2 ${
                  activeNavMenu === 'team' ? 'border-indigo-600' : 'border-transparent hover:border-indigo-600'
                } `}
              >
                <Users size={18} className="mr-1" />
                Our Team
              </a>
              <a
                href="#"
                className={`text-gray-900 hover:text-indigo-600 px-3 py-2 font-medium transition-colors duration-200 flex items-center border-b-2 ${
                  activeNavMenu === 'vision' ? 'border-indigo-600' : 'border-transparent hover:border-indigo-600'
                } `}
              >
                <Eye size={18} className="mr-1" />
                Vision
              </a>
              <a
                href="#"
                className={`text-gray-900 hover:text-indigo-600 px-3 py-2 font-medium transition-colors duration-200 flex items-center border-b-2 ${
                  activeNavMenu === 'contactUs' ? 'border-indigo-600' : 'border-transparent hover:border-indigo-600'
                } `}
              >
                <Mail size={18} className="mr-1" />
                Contact Us
              </a>

              {/* Apps Dropdown */}
              <div className="relative" ref={appsDropdownRef}>
                <button
                  className={`text-gray-600 hover:text-indigo-600 px-3 py-2 font-medium transition-colors duration-200 inline-flex items-center border-b-2 ${
                    showAppsDropdown ? 'border-indigo-600 text-indigo-600' : 'border-transparent'
                  } hover:border-indigo-600`}
                  onClick={toggleAppsDropdown}
                  aria-expanded={showAppsDropdown}
                  aria-haspopup="true"
                >
                  <Box size={18} className="mr-1" />
                  Apps
                  <ChevronDown
                    size={16}
                    className={`ml-1 transition-transform duration-200 ${
                      showAppsDropdown ? 'transform rotate-180' : ''
                    }`}
                  />
                </button>

                {showAppsDropdown && (
                  <div className="origin-top-right absolute right-0 mt-2 w-64 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-50 transition-all duration-200 opacity-100">
                    <div className="py-1 divide-y divide-gray-100">
                      {appItems.map((item, index) => (
                        <a
                          key={index}
                          
                          className="block px-4 py-3 text-sm text-gray-700 hover:bg-indigo-50 hover:text-indigo-700 transition-colors duration-150"
                        >
                          <div className="font-medium flex items-center">
                            {item.icon}
                            <span className="ml-2">{item.title}</span>
                          </div>
                          <div className="text-xs text-gray-500 mt-1 ml-6">{item.description}</div>
                        </a>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Auth Buttons */}
            <div className="ml-6 flex items-center">
              <a
                href="#"
                className="text-indigo-600 hover:text-indigo-800 px-3 py-2 font-medium flex items-center transition-colors duration-200 hover:bg-indigo-50 rounded"
              >
                <LogIn size={18} className="mr-1" />
                Sign In
              </a>
              <a
                href="#"
                className="ml-4 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-md font-medium transition-colors duration-200 flex items-center shadow-md hover:shadow-lg"
              >
                <UserPlus size={18} className="mr-1" />
                Sign Up
              </a>
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-600 hover:text-indigo-600 hover:bg-gray-100 focus:outline-none transition-colors duration-200"
              onClick={toggleMenu}
              aria-expanded={isMenuOpen}
            >
              <span className="sr-only">Open main menu</span>
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 border-t border-gray-200">
            <a
              href="#"
              className="flex items-center px-3 py-2 text-base font-medium text-indigo-600 bg-indigo-50 rounded-md"
            >
              <Home size={18} className="mr-2" />
              Home
            </a>
            <a
              href="#"
              className="flex items-center px-3 py-2 text-base font-medium text-gray-600 hover:text-indigo-600 hover:bg-indigo-50 rounded-md transition-colors duration-150"
            >
              <Info size={18} className="mr-2" />
              About Us
            </a>
            <a
              href="#"
              className="flex items-center px-3 py-2 text-base font-medium text-gray-600 hover:text-indigo-600 hover:bg-indigo-50 rounded-md transition-colors duration-150"
            >
              <Users size={18} className="mr-2" />
              Our Team
            </a>
            <a
              href="#"
              className="flex items-center px-3 py-2 text-base font-medium text-gray-600 hover:text-indigo-600 hover:bg-indigo-50 rounded-md transition-colors duration-150"
            >
              <Eye size={18} className="mr-2" />
              Vision
            </a>
            <a
              href="#"
              className="flex items-center px-3 py-2 text-base font-medium text-gray-600 hover:text-indigo-600 hover:bg-indigo-50 rounded-md transition-colors duration-150"
            >
              <Mail size={18} className="mr-2" />
              Contact Us
            </a>

            {/* Apps Section */}
            <div className="px-3 py-2">
              <div
                className="flex justify-between items-center text-base font-medium text-gray-600 hover:text-indigo-600 cursor-pointer"
                onClick={() => setShowAppsDropdown(!showAppsDropdown)}
              >
                <span className="flex items-center">
                  <Box size={18} className="mr-2" />
                  Apps
                </span>
                <ChevronDown
                  size={16}
                  className={`transform ${showAppsDropdown ? 'rotate-180' : ''} transition-transform duration-200`}
                />
              </div>

              {showAppsDropdown && (
                <div className="mt-2 pl-4 space-y-2 border-l-2 border-indigo-100">
                  {appItems.map((item, index) => (
                    <a
                      key={index}
                      href="#"
                      className="block py-2 text-sm text-gray-600 hover:text-indigo-600 transition-colors duration-150"
                    >
                      <div className="flex items-center">
                        {item.icon}
                        <span className="ml-2">{item.title}</span>
                      </div>
                    </a>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Auth Buttons for mobile */}
          <div className="pt-4 pb-3 border-t border-gray-200">
            <div className="flex items-center px-5">
              <div className="flex-shrink-0">
                <a
                  href="#"
                  className="block w-full px-5 py-2 text-center font-medium text-indigo-600 bg-gray-50 hover:bg-gray-100 rounded-md flex items-center justify-center transition-colors duration-150"
                >
                  <LogIn size={18} className="mr-1" />
                  Sign In
                </a>
              </div>
              <div className="ml-3 w-full">
                <a
                  href="#"
                  className="block w-full px-5 py-2 text-center font-medium text-white bg-indigo-600 hover:bg-indigo-700 rounded-md flex items-center justify-center transition-colors duration-150 shadow-md"
                >
                  <UserPlus size={18} className="mr-1" />
                  Sign Up
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default NavBar;
