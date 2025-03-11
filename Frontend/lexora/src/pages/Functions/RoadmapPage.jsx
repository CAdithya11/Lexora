import React, { useState, useEffect } from 'react';
import { Briefcase, ChevronDown, ArrowLeft, TrendingUp, Filter } from 'lucide-react';
import Sidebar from '../../component/template/Sidebar';
import Roadmap from '../../component/Roadmap';
import SidebarSub from '../../component/template/SidebarSub';
import TopHeader from '../../component/template/TopHeader';

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
        <TopHeader />
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

              {/* Chart Footer with Insights */}
              <div className="px-6 py-4 bg-gray-50 border-t border-gray-200">
                <div className="flex items-start gap-4 flex-wrap">
                  <div className="bg-white p-3 rounded-lg border border-gray-200 flex-1 min-w-64">
                    <div className="flex items-center gap-2">
                      <TrendingUp size={16} className="text-green-500" />
                      <span className="text-sm font-medium text-gray-800">Highest Demand</span>
                    </div>
                    <p className="text-sm text-gray-600 mt-1">Full Stack Developer (28% growth)</p>
                  </div>

                  <div className="bg-white p-3 rounded-lg border border-gray-200 flex-1 min-w-64">
                    <div className="flex items-center gap-2">
                      <TrendingUp size={16} className="text-blue-500 transform rotate-45" />
                      <span className="text-sm font-medium text-gray-800">Emerging Role</span>
                    </div>
                    <p className="text-sm text-gray-600 mt-1">AI Engineer (203% YoY growth)</p>
                  </div>

                  <div className="bg-white p-3 rounded-lg border border-gray-200 flex-1 min-w-64">
                    <div className="flex items-center gap-2">
                      <Filter size={16} className="text-purple-500" />
                      <span className="text-sm font-medium text-gray-800">Top Skill</span>
                    </div>
                    <p className="text-sm text-gray-600 mt-1">React (requested in 42% of job listings)</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
