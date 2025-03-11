import React, { useState, useEffect } from 'react';
<<<<<<< HEAD:Frontend/lexora/src/pages/Functions/Roadmap/RoadmapPage.jsx
import {
  LayoutDashboard,
  Home,
  StickyNote,
  Layers,
  Calendar,
  LifeBuoy,
  Settings,
  FileCog,
  Users,
  BarChart3,
  FileCheck,
  Bell,
  ChevronDown,
  Search,
  ArrowLeft,
  Globe,
  Filter,
  TrendingUp,
  Briefcase,
  User,
  LogOut,
  Download,
  Share2,
  Info,
  Sliders,
} from 'lucide-react';
import Sidebar, { SidebarItem, SidebarSubItem } from '../../../component/template/Sidebar';
import Roadmap from '../../../component/Roadmaps/Roadmap';
=======
import { Briefcase, ChevronDown, ArrowLeft, TrendingUp, Filter } from 'lucide-react';
import Sidebar from '../../component/template/Sidebar';
import Roadmap from '../../component/Roadmap';
import SidebarSub from '../../component/template/SidebarSub';
import TopHeader from '../../component/template/TopHeader';
>>>>>>> b8958e14fd471f8d996054334348245ec8750169:Frontend/lexora/src/pages/Functions/RoadmapPage.jsx

// Categories for the filter dropdown
const categories = [
  'Software Development & Engineering',
  'Data Science & Analytics',
  'Design & Creative',
  'Marketing & Communications',
  'Business & Management',
  'Healthcare & Medicine',
];

// Countries for the country selector
const countries = [
  { name: 'Sri Lanka', code: 'LK' },
  { name: 'United States', code: 'US' },
  { name: 'India', code: 'IN' },
  { name: 'United Kingdom', code: 'GB' },
  { name: 'Australia', code: 'AU' },
  { name: 'Canada', code: 'CA' },
  { name: 'Singapore', code: 'SG' },
];

export default function RoadmapPage() {
  const [selectedCategory, setSelectedCategory] = useState('Software Development & Engineering');
  const [showCategoryDropdown, setShowCategoryDropdown] = useState(false);
  const [selectedYear, setSelectedYear] = useState('2025');
  const [showYearDropdown, setShowYearDropdown] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState(countries[0]);
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Available years for the filter
  const years = ['2023', '2024', '2025'];

  // Simulate loading data
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, [selectedCategory, selectedYear, selectedCountry]);

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = () => {
      setShowCategoryDropdown(false);
      setShowYearDropdown(false);
      setShowProfileDropdown(false);
    };

    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

  // Handle dropdown toggle without propagating events
  const toggleDropdown = (setter, currentState, e) => {
    e.stopPropagation();
    setter(!currentState);
  };

  return (
    <div className="flex h-screen overflow-hidden bg-gray-50">
      <SidebarSub />
      <div className="flex-1 flex flex-col overflow-hidden">
<<<<<<< HEAD:Frontend/lexora/src/pages/Functions/Roadmap/RoadmapPage.jsx
        {/* Fixed Header */}
        <header className="bg-white p-4 shadow-sm z-10 border-b border-gray-200">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:justify-between md:items-center">
            <div className="flex items-center space-x-4">
              <h1 className="text-2xl font-bold text-gray-800">Roadmap Generator</h1>
            </div>

            <div className="flex items-center gap-3 mt-4 md:mt-0">
              {/* Country selector */}
              <div className="relative">
                <button
                  className="flex items-center gap-2 border border-gray-200 rounded-lg px-3 py-2 hover:border-blue-300 transition-colors duration-200 bg-white"
                  onClick={(e) => toggleDropdown(setShowCountryDropdown, showCountryDropdown, e)}
                >
                  <Globe size={16} className="text-blue-500" />
                  <span className="text-sm font-medium">{selectedCountry.name}</span>
                  <ChevronDown size={14} className="text-gray-500 ml-1" />
                </button>

                {/* Country Dropdown */}
                {showCountryDropdown && (
                  <div className="absolute left-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 z-50 max-h-64 overflow-y-auto">
                    {countries.map((country) => (
                      <div
                        key={country.code}
                        className={`px-4 py-2 hover:bg-blue-50 cursor-pointer text-sm ${
                          country.code === selectedCountry.code
                            ? 'bg-blue-50 text-blue-600 font-medium'
                            : 'text-gray-700'
                        }`}
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedCountry(country);
                          setShowCountryDropdown(false);
                          setIsLoading(true);
                        }}
                      >
                        {country.name}
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Search input */}
              <div className="relative w-full md:w-auto">
                <input
                  type="text"
                  placeholder="Search job roles"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 pr-4 py-2 bg-white border border-gray-200 rounded-lg w-full md:w-64 text-sm focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-300 transition-all duration-200"
                />
                <Search size={16} className="absolute left-3 top-2.5 text-gray-400" />
                {searchQuery && (
                  <button
                    className="absolute right-3 top-2.5 text-gray-400 hover:text-gray-600"
                    onClick={() => setSearchQuery('')}
                  >
                    ×
                  </button>
                )}
              </div>

              {/* Profile dropdown */}
              <div className="relative">
                <button
                  className="flex items-center gap-2  border-gray-200 rounded-lg px-3 py-2 hover:border-blue-300 transition-colors duration-200 bg-white"
                  onClick={(e) => toggleDropdown(setShowProfileDropdown, showProfileDropdown, e)}
                >
                  <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-white font-medium">
                    JS
                  </div>
                  <span className="text-sm font-medium hidden md:inline">John Smith</span>
                  <ChevronDown size={14} className="text-gray-500" />
                </button>

                {/* Profile Dropdown Menu */}
                {showProfileDropdown && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 z-50">
                    <div className="p-3 border-b border-gray-100">
                      <p className="text-sm font-semibold">John Smith</p>
                      <p className="text-xs text-gray-500">john.smith@example.com</p>
                    </div>
                    <ul className="py-1">
                      <li className="px-4 py-2 hover:bg-gray-50 cursor-pointer flex items-center gap-2 text-gray-700">
                        <Home size={16} className="text-gray-500" />
                        <span className="text-sm">Home</span>
                      </li>
                      <li className="px-4 py-2 hover:bg-gray-50 cursor-pointer flex items-center gap-2 text-gray-700">
                        <User size={16} className="text-gray-500" />
                        <span className="text-sm">Profile</span>
                      </li>
                      <li className="px-4 py-2 hover:bg-gray-50 cursor-pointer flex items-center gap-2 text-gray-700">
                        <Settings size={16} className="text-gray-500" />
                        <span className="text-sm">Settings</span>
                      </li>
                      <li className="border-t border-gray-100 mt-1">
                        <button className="w-full text-left px-4 py-2 hover:bg-gray-50 cursor-pointer flex items-center gap-2 text-red-600">
                          <LogOut size={16} className="text-red-500" />
                          <span className="text-sm">Logout</span>
                        </button>
                      </li>
                    </ul>
                  </div>
                )}
              </div>
            </div>
          </div>
        </header>

        {/* Breadcrumbs */}
        <div className="bg-white border-b border-gray-200 px-6 py-2">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-center space-x-2 text-sm text-gray-500">
              <span className="hover:text-blue-600 cursor-pointer">Dashboard</span>
              <span>›</span>
              <span className="hover:text-blue-600 cursor-pointer">Analytics</span>
              <span>›</span>
              <span className="text-blue-600 font-medium">Job Trends</span>
            </div>
          </div>
        </div>

        {/* Scrollable Content */}
=======
        <TopHeader />
>>>>>>> b8958e14fd471f8d996054334348245ec8750169:Frontend/lexora/src/pages/Functions/RoadmapPage.jsx
        <div className="flex-1 overflow-y-auto p-6">
          <div className="max-w-7xl mx-auto">
            <div className="bg-white rounded-xl shadow-sm mb-6 overflow-hidden border border-gray-200">
              <div className="p-6 border-b border-gray-200 bg-gradient-to-r from-blue-50 to-white">
                <div className="flex flex-wrap justify-between items-center">
                  <div>
                    <h2 className="text-xl font-semibold text-gray-800 flex items-center">
                      <Briefcase size={20} className="mr-2 text-blue-500" />
                      {selectedCategory === 'Software Development & Engineering'
                        ? 'Software Engineering Trends'
                        : `${selectedCategory} Trends`}
                    </h2>
                    <p className="text-sm text-gray-500 mt-1">
                      Job market demand by role in {selectedYear} • {selectedCountry.name}
                    </p>
                  </div>

                  <div className="flex flex-wrap gap-3 mt-4 sm:mt-0">
                    {/* Year filter */}
                    <div className="relative">
                      <button
                        className="px-4 py-2 border border-gray-200 rounded-lg flex items-center gap-2 text-sm font-medium bg-white hover:bg-gray-50 transition-colors duration-200"
                        onClick={(e) => toggleDropdown(setShowYearDropdown, showYearDropdown, e)}
                      >
                        <span className="text-gray-700">{selectedYear}</span>
                        <ChevronDown size={14} className="text-gray-500" />
                      </button>

                      {/* Year Dropdown */}
                      {showYearDropdown && (
                        <div className="absolute right-0 mt-2 w-32 bg-white border border-gray-200 rounded-lg shadow-lg z-20">
                          {years.map((year) => (
                            <div
                              key={year}
                              className={`px-4 py-2 hover:bg-blue-50 cursor-pointer text-sm ${
                                year === selectedYear ? 'bg-blue-50 text-blue-600 font-medium' : 'text-gray-700'
                              }`}
                              onClick={(e) => {
                                e.stopPropagation();
                                setSelectedYear(year);
                                setShowYearDropdown(false);
                                setIsLoading(true);
                              }}
                            >
                              {year}
                            </div>
                          ))}
                        </div>
                      )}
                    </div>

                    {/* Category filter with dropdown */}
                    <div className="relative">
                      <button
                        className="px-4 py-2 border border-gray-200 rounded-lg flex items-center gap-2 text-sm font-medium bg-white hover:bg-gray-50 transition-colors duration-200"
                        onClick={(e) => toggleDropdown(setShowCategoryDropdown, showCategoryDropdown, e)}
                      >
                        <span className="text-blue-600">
                          {selectedCategory.length > 20 ? selectedCategory.substring(0, 20) + '...' : selectedCategory}
                        </span>
                        <ChevronDown size={14} className="text-blue-500" />
                      </button>

                      {/* Category Dropdown */}
                      {showCategoryDropdown && (
                        <div className="absolute right-0 mt-2 w-72 bg-white border border-gray-200 rounded-lg shadow-lg z-20 max-h-64 overflow-y-auto">
                          {categories.map((category) => (
                            <div
                              key={category}
                              className={`px-4 py-2 hover:bg-blue-50 cursor-pointer text-sm ${
                                category === selectedCategory ? 'bg-blue-50 text-blue-600 font-medium' : 'text-gray-700'
                              }`}
                              onClick={(e) => {
                                e.stopPropagation();
                                setSelectedCategory(category);
                                setShowCategoryDropdown(false);
                                setIsLoading(true);
                              }}
                            >
                              {category}
                            </div>
                          ))}
                        </div>
                      )}
                    </div>

                    {/* All Analytics button */}
                    <button className="flex items-center gap-2 text-sm font-medium border border-gray-200 px-4 py-2 rounded-lg hover:bg-blue-50 text-blue-600 transition-colors duration-200 bg-white">
                      <ArrowLeft size={14} />
                      All Analytics
                    </button>
                  </div>
                </div>
              </div>

              {/* Chart Content with Loading State */}
              <div className="p-6 min-h-96">
                {isLoading ? (
                  <div className="flex items-center justify-center h-80">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
                  </div>
                ) : (
                  <Roadmap />
                )}
              </div>

              
             
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
