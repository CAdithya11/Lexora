import React, { useState, useEffect, useRef } from 'react';
import {
  Menu, X, ChevronDown, Home, Info, Users, Eye, Mail, Box, Bell,
  LogOut, User, Settings, LogIn, UserPlus,
  TrendingUp, Map, UserCheck, Book, Users as UsersIcon,
} from 'lucide-react';
import logo from '../../assets/logo.png'; // Assuming logo path
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { authService } from '../../services/AuthService';
import userProfileHandleService from '../../services/userProfileHandleService';
import axios from 'axios';

const NavBar = ({ activeNavMenu }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showAppsDropdown, setShowAppsDropdown] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const appsDropdownRef = useRef(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const [showProfileDropdown, setShowProfileDropdown] = useState(false);
const [showNotificationDropdown, setShowNotificationDropdown] = useState(false);
const [notifications, setNotifications] = useState([]);
const [unreadCount, setUnreadCount] = useState(0);
const [profileDetails, setProfileDetails] = useState(null);

const navigate = useNavigate();

  useEffect(() => {
  const user = localStorage.getItem('user');
  setIsLoggedIn(!!user); // true if user exists
}, []);

const toggleDropdown = (setter, currentState, e) => {
  e.stopPropagation();
  setter(!currentState);
};

const markAsRead = async (notificationId) => {
  try {
    await axios.put(`http://localhost:8080/api/v2/notification/${notificationId}`, {
      status: 'READ',
    });
    const user = JSON.parse(localStorage.getItem('user'));
    if (user?.user_id) fetchNotifications(user.user_id);
  } catch (err) {
    console.error('Failed to mark as read:', err);
  }
};

const handleViewAllNotifications = () => {
  setShowNotificationDropdown(false);
  navigate('/notifications');
};

const handleNotificationClick = (notification) => {
  // You can show modal or redirect based on your UX plan
  console.log('Clicked Notification:', notification);
};

useEffect(() => {
  const user = JSON.parse(localStorage.getItem('user'));
  if (user?.user_id) {
    fetchNotifications(user.user_id);
    fetchProfile(user.user_id);
  }
}, []);

const fetchNotifications = async (userId) => {
  try {
    const res = await axios.get(`http://localhost:8080/api/v2/notification/${userId}`);
    setNotifications(res.data);
    setUnreadCount(res.data.filter(n => n.status === 'UNREAD').length);
  } catch (err) {
    console.error('Failed to load notifications', err);
  }
};

const fetchProfile = async (userId) => {
  try {
    const res = await userProfileHandleService.findUserProfileById(userId);
    setProfileDetails(res.data);
  } catch (err) {
    console.error('Failed to load profile', err);
  }
};

const handleLogout = () => {
  authService.logout();
  localStorage.removeItem('user');
  navigate('/');
};




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
      icon: <TrendingUp size={16} className="text-blue-500" />,
    },
    {
      title: 'Roadmap Generator',
      description: 'Create personalized career paths',
      icon: <Map size={16} className="text-blue-500" />,
    },
    {
      title: 'Persona Matcher',
      description: 'Find your ideal professional persona',
      icon: <UserCheck size={16} className="text-blue-500" />,
    },
    {
      title: 'Skill Gap Analyzer',
      description: 'Identify skills to develop',
      icon: <Book size={16} className="text-blue-500" />,
    },
    {
      title: 'Mentor-Mentee Matchmaking',
      description: 'Connect with industry mentors',
      icon: <UsersIcon size={16} className="text-blue-500" />,
    },
  ];

  return (
    <nav className={`bg-white fixed w-full top-0 z-50 transition-all duration-300 ${scrolled ? 'shadow-lg' : 'shadow-md'}`}    >
      <div className=" mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Logo and Brand */}
          <div className="flex-shrink-0 flex items-center">
            <img className="h-8 w-auto" src={logo} alt="Logo" />
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center">
            <div className="ml-14 flex items-baseline space-x-2">
              <Link to={'/'}>
                <div
                  className={`text-gray-900 hover:text-blue-600 px-3 py-2 font-medium transition-colors duration-200 flex items-center border-b-2 ${
                    activeNavMenu === 'home' ? 'border-blue-600' : 'border-transparent hover:border-blue-600'
                  } `}
                >
                  Home
                </div>
              </Link>

              <Link to={'/app'}>
                <div
                  className={`text-gray-900 hover:text-blue-600 px-3 py-2 font-medium transition-colors duration-200 flex items-center border-b-2 ${
                    activeNavMenu === 'contactUs' ? 'border-blue-600' : 'border-transparent hover:border-blue-600'
                  } `}
                >
                  Apps
                </div>
              </Link>

              <Link to={'/aboutus'}>
                <div
                  className={`text-gray-900 hover:text-blue-600 px-3 py-2 font-medium transition-colors duration-200 flex items-center border-b-2 ${
                    activeNavMenu === 'aboutUs' ? 'border-blue-600' : 'border-transparent hover:border-blue-600'
                  } `}
                >
                  About Us
                </div>
              </Link>

              <Link to={'/contactUs'}>
                <div
                  className={`text-gray-900 hover:text-blue-600 px-3 py-2 font-medium transition-colors duration-200 flex items-center border-b-2 ${
                    activeNavMenu === 'contactUs' ? 'border-blue-600' : 'border-transparent hover:border-blue-600'
                  } `}
                >
                  Contact Us
                </div>
              </Link>
            </div>

            {/* Auth Buttons */}
            {!isLoggedIn ? (
            <>
            <div className="flex-shrink-0 ml-22 mr-3">
              <Link to={'/signIn'}>
                <div
                  id="signInButton"
                  className="block w-full px-5 py-2 text-center font-medium text-blue-600 bg-gray-50 hover:bg-gray-100 rounded-md flex items-center justify-center transition-colors duration-150"
                >
                  <LogIn size={18} className="mr-1" />
                  Sign In
                </div>
              </Link>
            </div>
            <div className="flex-shrink-0">
              <Link to={'/signUpPage'}>
                <div
                  id="signupButton"
                  className="block w-full px-5 py-2 text-center font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-md flex items-center justify-center transition-colors duration-150 shadow-md"
                >
                  <UserPlus size={18} className="mr-1" />
                  Sign Up
                </div>
              </Link>
            </div>
            </>
            ):(
              <div className="flex items-center gap-4 ml-4">
  {/* Notification Bell */}
  <div className="relative">
    <button
      onClick={(e) => toggleDropdown(setShowNotificationDropdown, showNotificationDropdown, e)}
      className="relative p-2 text-gray-500 hover:text-blue-600 hover:scale-110 transition-transform duration-200 rounded-lg"
    >
      <Bell size={20} />
      {unreadCount > 0 && (
        <span className="absolute -top-1 -right-1 bg-blue-500 ring-2 ring-white text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
          {unreadCount > 99 ? '99+' : unreadCount}
        </span>
      )}
    </button>

    {showNotificationDropdown && (
      <NotificationDropdown
        notifications={notifications}
        onMarkAsRead={markAsRead}
        onClose={() => setShowNotificationDropdown(false)}
        onViewAll={handleViewAllNotifications}
        onNotificationClick={handleNotificationClick}
      />
    )}
  </div>

  {/* Profile Dropdown */}
  <div className="relative">
    <button
      onClick={(e) => toggleDropdown(setShowProfileDropdown, showProfileDropdown, e)}
      className="flex items-center gap-2 border border-transparent rounded-lg px-3 py-2 cursor-pointer bg-white"
    >
      <img
        src={profileDetails?.profile_image || ''}
        alt="Profile"
        className="h-10 w-10 object-cover rounded-full"
      />
      <div className="hidden md:flex flex-col ml-2">
        <span className="text-sm font-medium">{profileDetails?.username}</span>
        <span className="text-xs text-gray-600">{profileDetails?.role || 'Student'}</span>
      </div>
      <ChevronDown size={14} className="text-gray-500" />
    </button>

    {showProfileDropdown && (
      <div
        onClick={(e) => e.stopPropagation()}
        className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 z-50"
      >
        <div className="p-3 border-b border-gray-100">
          <p className="text-sm font-semibold">{profileDetails?.username}</p>
          <p className="text-xs text-gray-500">{profileDetails?.email}</p>
        </div>
        <ul className="py-1">
          <li className="px-4 py-2 hover:bg-gray-50 cursor-pointer flex items-center gap-2 text-gray-700">
            <Home size={17} />
            <Link to={'/dashboard'}>Dashboard</Link>
          </li>
          <li className="px-4 py-2 hover:bg-gray-50 cursor-pointer flex items-center gap-2 text-gray-700">
            <User size={17} />
            <Link to={'/settings/profile'}>Profile</Link>
          </li>
          <li className="px-4 py-2 hover:bg-gray-50 cursor-pointer flex items-center gap-2 text-gray-700">
            <Settings size={17} />
            <Link to={'/settings/professionalDetails'}>Settings</Link>
          </li>
          <li className="border-t border-gray-100 mt-1">
            <button
                onClick={() => authService.logout()}
                className="w-full text-left px-4 py-2 hover:bg-gray-50 cursor-pointer flex items-center gap-2 text-red-600"
              >
                <LogOut size={17} className="text-red-500" />
                <span className="text-m">Logout</span>
              </button>
          </li>
        </ul>
      </div>
    )}
  </div>
</div>
       
          
          )}

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
           
            <button
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-600 hover:text-blue-600 hover:bg-gray-100 focus:outline-none transition-colors duration-200"
              onClick={toggleMenu}
              aria-expanded={isMenuOpen}
            >
              <span className="sr-only">Open main menu</span>
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>
    </div>
      

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 border-t border-gray-200">
            <a
              href="#"
              className="flex items-center px-3 py-2 text-base font-medium text-blue-600 bg-blue-50 rounded-md"
            >
              <Home size={18} className="mr-2" />
              Home
            </a>
            <a
              href="#"
              className="flex items-center px-3 py-2 text-base font-medium text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-md transition-colors duration-150"
            >
              <Info size={18} className="mr-2" />
              About Us
            </a>
            <a
              href="#"
              className="flex items-center px-3 py-2 text-base font-medium text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-md transition-colors duration-150"
            >
              <Users size={18} className="mr-2" />
              Our Team
            </a>
            <a
              href="#"
              className="flex items-center px-3 py-2 text-base font-medium text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-md transition-colors duration-150"
            >
              <Eye size={18} className="mr-2" />
              Vision
            </a>
            <a
              href="#"
              className="flex items-center px-3 py-2 text-base font-medium text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-md transition-colors duration-150"
            >
              <Mail size={18} className="mr-2" />
              Contact Us
            </a>
          </div>

          {/* Auth Buttons for mobile */}
          <div className="pt-4 pb-3 border-t border-gray-200 h-150">
            <div className="flex items-center px-5">
              <div className="flex-shrink-0">
                <Link to={'/signIn'}>
                  <div className="block w-full px-5 py-2 text-center font-medium text-blue-600 bg-gray-50 hover:bg-gray-100 rounded-md flex items-center justify-center transition-colors duration-150">
                    <LogIn size={18} className="mr-1" />
                    Sign In
                  </div>
                </Link>
              </div>
              <div className="flex-shrink-0">
                <Link to={'/signUpPage'}>
                  <div className="block w-full px-5 py-2 text-center font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-md flex items-center justify-center transition-colors duration-150 shadow-md">
                    <UserPlus size={18} className="mr-1" />
                    Sign Up
                  </div>
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default NavBar;
