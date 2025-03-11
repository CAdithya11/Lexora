import React, { useState } from 'react';
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
} from 'lucide-react';
import Sidebar, { SidebarItem, SidebarSubItem } from '../template/Sidebar';
import LineChart from '../LineChart';
import Roadmap from '../../component/template/Roadmaps/Roadmap';

// Categories for the filter dropdown
const categories = [
  'Software Development & Engineering',
  'Data Science & Analytics',
  'Design & Creative',
  'Marketing & Communications',
  'Business & Management',
  'Healthcare & Medicine',
];

export default function SidebarSub() {
  const [selectedCategory, setSelectedCategory] = useState('Software Development & Engineering');
  const [showCategoryDropdown, setShowCategoryDropdown] = useState(false);
  const [selectedYear, setSelectedYear] = useState('2025');
  const [showYearDropdown, setShowYearDropdown] = useState(false);

  // Available years for the filter
  const years = ['2023', '2024', '2025', '2026'];

  return (
    <div className="flex h-screen overflow-hidden bg-gray-50">
      {/* Fixed Sidebar */}
      <div className="h-screen flex-shrink-0">
        <Sidebar>
          <SidebarItem icon={<Home size={20} />} text="Home" />
          <SidebarItem icon={<LayoutDashboard size={20} />} text="Dashboard" active />

          <SidebarItem icon={<StickyNote size={20} />} text="Projects" alwaysOpen={true}>
            <SidebarSubItem text="Active Projects" active />
            <SidebarSubItem text="Archived Projects" />
            <SidebarSubItem text="Templates" />
          </SidebarItem>

          <SidebarItem icon={<Calendar size={20} />} text="Calendar" />

          <SidebarItem icon={<Layers size={20} />} text="Tasks">
            <SidebarSubItem text="My Tasks" />
            <SidebarSubItem text="Assigned Tasks" />
            <SidebarSubItem text="Completed" />
          </SidebarItem>

          <SidebarItem icon={<Users size={20} />} text="Team">
            <SidebarSubItem text="Members" />
            <SidebarSubItem text="Permissions" />
          </SidebarItem>

          <SidebarItem icon={<BarChart3 size={20} />} text="Reports">
            <SidebarSubItem text="Analytics" />
            <SidebarSubItem text="Exports" />
            <SidebarSubItem text="Performance" />
          </SidebarItem>

          <SidebarItem icon={<Bell size={20} />} text="Notifications" alert />

          <hr className="my-3 border-gray-200" />

          <SidebarItem icon={<Settings size={20} />} text="Settings">
            <SidebarSubItem text="Account" />
            <SidebarSubItem text="Notifications" />
            <SidebarSubItem text="Appearance" />
          </SidebarItem>

          <SidebarItem icon={<FileCog size={20} />} text="Admin">
            <SidebarSubItem text="User Management" />
            <SidebarSubItem text="System Settings" />
          </SidebarItem>

          <SidebarItem icon={<LifeBuoy size={20} />} text="Help" />
          <SidebarItem icon={<FileCheck size={20} />} text="Documentation" />
        </Sidebar>
      </div>

      {/* Main Content Area with Independent Scrolling */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Fixed Header */}
        <header className="bg-white p-4 shadow-sm z-10 border-b border-gray-200">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:justify-between md:items-center">
            <div className="flex items-center space-x-4">
              <h1 className="text-2xl font-bold text-gray-800">Job Market Insights</h1>
              <span className="px-3 py-1 bg-blue-50 text-blue-600 text-xs font-semibold rounded-full">BETA</span>
            </div>

            <div className="flex items-center gap-3 mt-4 md:mt-0">
              {/* Country selector */}
              <div className="flex items-center gap-2 border border-gray-200 rounded-lg px-3 py-2 hover:border-blue-300 transition-colors duration-200 bg-white">
                <Globe size={16} className="text-blue-500" />
                <span className="text-sm font-medium">Sri Lanka</span>
                <ChevronDown size={14} className="text-gray-500 ml-1" />
              </div>

              {/* Search input */}
              <div className="relative w-full md:w-auto">
                <input
                  type="text"
                  placeholder="Search job roles"
                  className="pl-10 pr-4 py-2 bg-white border border-gray-200 rounded-lg w-full md:w-64 text-sm focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-300 transition-all duration-200"
                />
                <Search size={16} className="absolute left-3 top-2.5 text-gray-400" />
              </div>
            </div>
          </div>
        </header>

        {/* Breadcrumbs */}
        <div className="bg-white border-b border-gray-200 px-6 py-2">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-center space-x-2 text-sm text-gray-500">
              <span>Dashboard</span>
              <span>›</span>
              <span>Analytics</span>
              <span>›</span>
              <span className="text-blue-600 font-medium">Job Trends</span>
            </div>
          </div>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto p-6">
          <div className="max-w-7xl mx-auto">
            {/* Chart Container */}
            <div className="bg-white rounded-xl shadow-sm mb-6 overflow-hidden border border-gray-200">
              {/* Title and Filters Section */}
              <div className="p-6 border-b border-gray-200 bg-gradient-to-r from-blue-50 to-white">
                <div className="flex flex-wrap justify-between items-center">
                  <div>
                    <h2 className="text-xl font-semibold text-gray-800">
                      <Briefcase size={20} className="inline mr-2 text-blue-500" />
                      Software Engineering Trends
                    </h2>
                    <p className="text-sm text-gray-500 mt-1">Job market demand by role in {selectedYear}</p>
                  </div>

                  <div className="flex flex-wrap gap-3 mt-4 sm:mt-0">
                    {/* Year filter */}
                    <div className="relative">
                      <button
                        className="px-4 py-2 border border-gray-200 rounded-lg flex items-center gap-2 text-sm font-medium bg-white hover:bg-gray-50 transition-colors duration-200"
                        onClick={() => setShowYearDropdown(!showYearDropdown)}
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
                              onClick={() => {
                                setSelectedYear(year);
                                setShowYearDropdown(false);
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
                        onClick={() => setShowCategoryDropdown(!showCategoryDropdown)}
                      >
                        <span className="text-blue-600">
                          {selectedCategory.length > 20 ? selectedCategory.substring(0, 20) + '...' : selectedCategory}
                        </span>
                        <ChevronDown size={14} className="text-blue-500" />
                      </button>

                      {/* Category Dropdown */}
                      {showCategoryDropdown && (
                        <div className="absolute right-0 mt-2 w-72 bg-white border border-gray-200 rounded-lg shadow-lg z-20">
                          {categories.map((category) => (
                            <div
                              key={category}
                              className={`px-4 py-2 hover:bg-blue-50 cursor-pointer text-sm ${
                                category === selectedCategory ? 'bg-blue-50 text-blue-600 font-medium' : 'text-gray-700'
                              }`}
                              onClick={() => {
                                setSelectedCategory(category);
                                setShowCategoryDropdown(false);
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

              {/* Chart Content */}
              <div className="p-6">
                <Roadmap />
                <LineChart />
              </div>

              {/* Chart Footer */}
              <div className="p-4 bg-gray-50 border-t border-gray-200 text-xs text-gray-500 flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <TrendingUp size={14} className="text-blue-500" />
                  <span>Data updated on March 5, 2025</span>
                </div>
                <button className="text-blue-600 hover:text-blue-700 font-medium">Export Data</button>
              </div>
            </div>

            {/* Category Selection Section */}
            <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
              <div className="flex justify-between items-center mb-5">
                <h3 className="text-lg font-medium text-gray-800">Popular Job Categories</h3>
                <button className="text-sm text-blue-600 hover:text-blue-700 font-medium">View All</button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                {categories.map((category) => (
                  <button
                    key={category}
                    className={`py-3 px-4 rounded-lg text-sm font-medium text-left transition-all duration-200 border ${
                      category === selectedCategory
                        ? 'bg-blue-50 text-blue-700 border-blue-200 shadow-sm'
                        : 'bg-white text-gray-700 border-gray-200 hover:border-blue-200 hover:bg-blue-50 hover:text-blue-600'
                    }`}
                    onClick={() => setSelectedCategory(category)}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>

            {/* Quick Stats Section */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
              <div className="bg-white rounded-xl p-5 border border-gray-200 shadow-sm">
                <h4 className="text-sm font-medium text-gray-500 mb-1">Highest Demand</h4>
                <p className="text-xl font-semibold text-gray-800">Full-Stack Developer</p>
                <div className="flex items-center mt-2 text-green-600 text-sm">
                  <TrendingUp size={14} className="mr-1" />
                  <span>+12.3% growth since last year</span>
                </div>
              </div>

              <div className="bg-white rounded-xl p-5 border border-gray-200 shadow-sm">
                <h4 className="text-sm font-medium text-gray-500 mb-1">Average Salary</h4>
                <p className="text-xl font-semibold text-gray-800">$82,500 USD</p>
                <div className="flex items-center mt-2 text-green-600 text-sm">
                  <TrendingUp size={14} className="mr-1" />
                  <span>+5.8% increase from 2024</span>
                </div>
              </div>

              <div className="bg-white rounded-xl p-5 border border-gray-200 shadow-sm">
                <h4 className="text-sm font-medium text-gray-500 mb-1">Job Openings</h4>
                <p className="text-xl font-semibold text-gray-800">18,342</p>
                <div className="flex items-center mt-2 text-blue-600 text-sm">
                  <Filter size={14} className="mr-1" />
                  <span>View openings by location</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
