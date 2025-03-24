import React, { useState, useEffect } from 'react';
import { Briefcase, ChevronDown, Globe, ArrowLeft, TrendingUp, Filter } from 'lucide-react';
import SidebarSub from '../../../component/template/SidebarSub';
import TopHeader from '../../../component/template/TopHeader';
import LineChart from '../../../component/IndustryInsights/LineChart';
import BubbleChart from '../../../component/IndustryInsights/BubbleChart';
import JobDashboard from '../../../component/IndustryInsights/JobDashboard';
import FocusChart from '../../../component/IndustryInsights/charts/FocusChart';
import PieChartOne from '../../../component/IndustryInsights/charts/PieChartOne';

// Categories for the filter dropdown
const categories = [
  'Software Development & Engineering',
  'Data Science & Analytics',
  'Design & Creative',
  'Marketing & Communications',
  'Business & Management',
  'Healthcare & Medicine',
];

// Countries data that was missing
const countries = [
  { name: 'United States', code: 'US' },
  { name: 'Canada', code: 'CA' },
  { name: 'United Kingdom', code: 'UK' },
  { name: 'Australia', code: 'AU' },
  { name: 'Germany', code: 'DE' },
  { name: 'France', code: 'FR' },
  { name: 'Japan', code: 'JP' },
  { name: 'India', code: 'IN' },
];

export default function TrendingJobsPage() {
  const [selectedCategory, setSelectedCategory] = useState('Software Development & Engineering');
  const [selectedYear, setSelectedYear] = useState('2025');
  const [selectedCountry, setSelectedCountry] = useState(countries[0]);
  const [showCountryDropdown, setShowCountryDropdown] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [chartTitle, setChartTitle] = useState('Software Engineering Trends');

  // Available years for the filter
  const years = ['2023', '2024', '2025', '2026'];

  // Simulate loading data
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, [selectedCategory, selectedYear, selectedCountry]);

  // Update chart title when category changes
  useEffect(() => {
    // Extract first part of category for the title
    const titlePrefix = selectedCategory.split(' & ')[0];
    setChartTitle(`${titlePrefix} Trends`);
  }, [selectedCategory]);

  // Handle dropdown toggle without propagating events
  const toggleDropdown = (setter, currentState, e) => {
    e.stopPropagation();
    setter(!currentState);
  };

  // Handle category selection
  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
  };

  return (
    <div className="flex h-screen overflow-hidden bg-gray-50">
      {/* Fixed Sidebar */}
      <SidebarSub />

      {/* Main Content Area with Independent Scrolling */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Fixed Header */}
        <TopHeader />

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto p-6 bg-white">
          {/* Chart Content */}
          <div className="p-2">
            <JobDashboard />
          </div>

          {/* Quick Stats Section - Dynamic based on selected category */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
            <div className="bg-white rounded-xl p-5 border border-gray-200 shadow-sm">
              <h4 className="text-sm font-medium text-gray-500 mb-1">Highest Demand</h4>
              <p className="text-xl font-semibold text-gray-800">
                {selectedCategory === 'Software Development & Engineering'
                  ? 'Full-Stack Developer'
                  : selectedCategory === 'Data Science & Analytics'
                  ? 'Data Engineer'
                  : selectedCategory === 'Design & Creative'
                  ? 'UX/UI Designer'
                  : selectedCategory === 'Marketing & Communications'
                  ? 'Digital Marketing Specialist'
                  : selectedCategory === 'Business & Management'
                  ? 'Product Manager'
                  : 'Healthcare Informatics Specialist'}
              </p>
              <div className="flex items-center mt-2 text-green-600 text-sm">
                <TrendingUp size={14} className="mr-1" />
                <span>+12.3% growth since last year</span>
              </div>
            </div>

            <div className="bg-white rounded-xl p-5 border border-gray-200 shadow-sm">
              <h4 className="text-sm font-medium text-gray-500 mb-1">Average Salary</h4>
              <p className="text-xl font-semibold text-gray-800">
                {selectedCategory === 'Software Development & Engineering'
                  ? '$82,500 USD'
                  : selectedCategory === 'Data Science & Analytics'
                  ? '$95,200 USD'
                  : selectedCategory === 'Design & Creative'
                  ? '$76,800 USD'
                  : selectedCategory === 'Marketing & Communications'
                  ? '$68,400 USD'
                  : selectedCategory === 'Business & Management'
                  ? '$89,600 USD'
                  : '$110,200 USD'}
              </p>
              <div className="flex items-center mt-2 text-green-600 text-sm">
                <TrendingUp size={14} className="mr-1" />
                <span>+5.8% increase from 2024</span>
              </div>
            </div>

            <div className="bg-white rounded-xl p-5 border border-gray-200 shadow-sm">
              <h4 className="text-sm font-medium text-gray-500 mb-1">Job Openings</h4>
              <p className="text-xl font-semibold text-gray-800">
                {selectedCategory === 'Software Development & Engineering'
                  ? '18,342'
                  : selectedCategory === 'Data Science & Analytics'
                  ? '12,756'
                  : selectedCategory === 'Design & Creative'
                  ? '9,843'
                  : selectedCategory === 'Marketing & Communications'
                  ? '14,268'
                  : selectedCategory === 'Business & Management'
                  ? '16,590'
                  : '21,437'}
              </p>
              <div className="flex items-center mt-2 text-blue-600 text-sm">
                <Filter size={14} className="mr-1" />
                <span>View openings by location</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
