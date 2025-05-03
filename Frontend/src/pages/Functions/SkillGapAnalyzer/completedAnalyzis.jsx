import React, { useState, useEffect } from 'react';
import { Briefcase, ChevronDown, Globe, ArrowLeft, TrendingUp, Filter } from 'lucide-react';
import SidebarSub from '../../../component/template/SidebarSub';
import TopHeader from '../../../component/template/SkillGapTop';
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
          

          {/* Quick Stats Section - Dynamic based on selected category */}
          <div className=" w-full">
            

            
            

            
        
            <div className="flex flex-row gap-x-4 gap-y-4 p-10 w-full justify-space-between items-start">
  
            

            
        </div>

          </div>
        </div>
      </div>
    </div>
  );
}
