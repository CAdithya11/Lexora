import React, { useState } from 'react';
import { Globe, Info, DollarSign, TrendingUp, Users, Filter as FilterIcon, ChevronDown, X } from 'lucide-react';

const GlobalJobInsightsMap = () => {
  const [selectedMetric, setSelectedMetric] = useState('jobCount');
  const [selectedRegion, setSelectedRegion] = useState(null);
  const [showDropdown, setShowDropdown] = useState(false);

  // Country data with job market metrics
  const countryData = [
    {
      id: 'us',
      name: 'United States',
      jobCount: 1250000,
      avgSalary: 128000,
      growthRate: 8.2,
      topRole: 'Cloud Engineer',
    },
    { id: 'ca', name: 'Canada', jobCount: 320000, avgSalary: 110000, growthRate: 7.8, topRole: 'Full-Stack Developer' },
    {
      id: 'uk',
      name: 'United Kingdom',
      jobCount: 380000,
      avgSalary: 95000,
      growthRate: 6.5,
      topRole: 'Data Scientist',
    },
    { id: 'de', name: 'Germany', jobCount: 410000, avgSalary: 92000, growthRate: 9.1, topRole: 'DevOps Engineer' },
    {
      id: 'fr',
      name: 'France',
      jobCount: 280000,
      avgSalary: 87000,
      growthRate: 5.7,
      topRole: 'Cybersecurity Engineer',
    },
    { id: 'in', name: 'India', jobCount: 1850000, avgSalary: 42000, growthRate: 12.4, topRole: 'Backend Developer' },
    { id: 'au', name: 'Australia', jobCount: 170000, avgSalary: 104000, growthRate: 6.9, topRole: 'ML Engineer' },
    { id: 'jp', name: 'Japan', jobCount: 290000, avgSalary: 95000, growthRate: 4.5, topRole: 'Mobile Developer' },
    { id: 'sg', name: 'Singapore', jobCount: 85000, avgSalary: 108000, growthRate: 10.2, topRole: 'Data Engineer' },
    { id: 'br', name: 'Brazil', jobCount: 310000, avgSalary: 48000, growthRate: 11.5, topRole: 'Frontend Developer' },
    { id: 'nl', name: 'Netherlands', jobCount: 120000, avgSalary: 89000, growthRate: 8.0, topRole: 'Cloud Architect' },
    { id: 'se', name: 'Sweden', jobCount: 95000, avgSalary: 91000, growthRate: 7.2, topRole: 'Security Engineer' },
  ];

  // Color scale based on metrics
  const getColor = (country) => {
    let value, maxValue;

    switch (selectedMetric) {
      case 'jobCount':
        value = country.jobCount;
        maxValue = 1850000; // Max job count
        break;
      case 'avgSalary':
        value = country.avgSalary;
        maxValue = 128000; // Max salary
        break;
      case 'growthRate':
        value = country.growthRate;
        maxValue = 12.4; // Max growth rate
        break;
      default:
        value = country.jobCount;
        maxValue = 1850000;
    }

    // Calculate intensity (0-100)
    const intensity = Math.min(Math.floor((value / maxValue) * 100), 100);

    // Return blue shades based on intensity
    return `rgba(59, 130, 246, ${0.2 + (intensity * 0.8) / 100})`;
  };

  const getMetricDisplay = (country) => {
    switch (selectedMetric) {
      case 'jobCount':
        return `${(country.jobCount / 1000).toFixed(0)}k jobs`;
      case 'avgSalary':
        return `$${(country.avgSalary / 1000).toFixed(0)}k`;
      case 'growthRate':
        return `+${country.growthRate}%`;
      default:
        return `${(country.jobCount / 1000).toFixed(0)}k jobs`;
    }
  };

  const getMetricIcon = () => {
    switch (selectedMetric) {
      case 'jobCount':
        return <Users size={16} className="mr-2" />;
      case 'avgSalary':
        return <DollarSign size={16} className="mr-2" />;
      case 'growthRate':
        return <TrendingUp size={16} className="mr-2" />;
      default:
        return <Users size={16} className="mr-2" />;
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-md p-6 mt-6">
      <div className="flex justify-between items-center mb-4">
        <div>
          <h2 className="text-xl font-bold text-gray-800 flex items-center">
            <Globe size={20} className="mr-2" /> Global Tech Job Insights
          </h2>
          <p className="text-gray-500 text-sm">2025 Tech job market distribution and insights</p>
        </div>

        <div className="relative">
          <button
            className="px-4 py-2 bg-blue-50 text-blue-600 rounded-lg flex items-center gap-2 text-sm font-medium border border-blue-200"
            onClick={() => setShowDropdown(!showDropdown)}
          >
            {getMetricIcon()}
            <span>
              {selectedMetric === 'jobCount'
                ? 'Job Count'
                : selectedMetric === 'avgSalary'
                ? 'Average Salary'
                : 'Growth Rate'}
            </span>
            <ChevronDown size={14} className={showDropdown ? 'transform rotate-180' : ''} />
          </button>

          {showDropdown && (
            <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-50 animate-fade-in">
              <div className="p-2">
                <button
                  className={`w-full text-left px-3 py-2 rounded-md text-sm flex items-center ${
                    selectedMetric === 'jobCount' ? 'bg-blue-50 text-blue-600' : 'hover:bg-gray-50'
                  }`}
                  onClick={() => {
                    setSelectedMetric('jobCount');
                    setShowDropdown(false);
                  }}
                >
                  <Users size={16} className="mr-2" /> Job Count
                </button>
                <button
                  className={`w-full text-left px-3 py-2 rounded-md text-sm flex items-center ${
                    selectedMetric === 'avgSalary' ? 'bg-blue-50 text-blue-600' : 'hover:bg-gray-50'
                  }`}
                  onClick={() => {
                    setSelectedMetric('avgSalary');
                    setShowDropdown(false);
                  }}
                >
                  <DollarSign size={16} className="mr-2" /> Average Salary
                </button>
                <button
                  className={`w-full text-left px-3 py-2 rounded-md text-sm flex items-center ${
                    selectedMetric === 'growthRate' ? 'bg-blue-50 text-blue-600' : 'hover:bg-gray-50'
                  }`}
                  onClick={() => {
                    setSelectedMetric('growthRate');
                    setShowDropdown(false);
                  }}
                >
                  <TrendingUp size={16} className="mr-2" /> Growth Rate
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="h-96 relative">
        {/* World Map - Simplified representation */}
        <div className="grid grid-cols-4 gap-4 h-full">
          {countryData.map((country) => (
            <div
              key={country.id}
              className="relative p-4 rounded-lg border border-gray-100 shadow-sm cursor-pointer transition-all hover:shadow-md"
              style={{ backgroundColor: getColor(country) }}
              onClick={() => setSelectedRegion(country)}
              onMouseLeave={() => setSelectedRegion(null)}
            >
              <div className="flex justify-between items-start mb-2">
                <span className="font-medium text-gray-800">{country.name}</span>
                <span className="font-bold text-blue-700">{getMetricDisplay(country)}</span>
              </div>

              <div className="text-xs text-gray-600 space-y-1 pt-2">
                {selectedMetric !== 'jobCount' && (
                  <div className="flex items-center">
                    <Users size={14} className="mr-1" />
                    {(country.jobCount / 1000).toFixed(0)}k jobs
                  </div>
                )}
                {selectedMetric !== 'avgSalary' && (
                  <div className="flex items-center">
                    <DollarSign size={14} className="mr-1" />${(country.avgSalary / 1000).toFixed(0)}k avg
                  </div>
                )}
                {selectedMetric !== 'growthRate' && (
                  <div className="flex items-center">
                    <TrendingUp size={14} className="mr-1" />+{country.growthRate}% growth
                  </div>
                )}
                <div className="flex items-center pt-1 font-medium">
                  <Info size={14} className="mr-1" />
                  Top role: {country.topRole}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Legend */}
        <div className="absolute bottom-0 left-0 w-full flex justify-center">
          <div className="bg-white p-2 rounded-lg shadow-sm flex items-center text-xs text-gray-600 border border-gray-100">
            <div className="flex items-center mr-4">
              <div className="w-4 h-4 mr-1 rounded" style={{ backgroundColor: 'rgba(59, 130, 246, 0.2)' }}></div>
              <span>Lower</span>
            </div>
            <div className="w-24 h-4 bg-gradient-to-r from-blue-200 to-blue-600 rounded mx-2"></div>
            <div className="flex items-center ml-4">
              <div className="w-4 h-4 mr-1 rounded" style={{ backgroundColor: 'rgba(59, 130, 246, 1)' }}></div>
              <span>Higher</span>
            </div>
          </div>
        </div>
      </div>

      {/* Regional Insights Section */}
      <div className="mt-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-3">Regional Insights</h3>
        <div className="grid grid-cols-3 gap-4">
          <div className="p-4 bg-gray-50 rounded-lg">
            <h4 className="font-medium text-gray-700 mb-2 flex items-center">
              <Users size={16} className="mr-2" /> Highest Job Volume
            </h4>
            <div className="text-lg font-bold text-blue-700">India</div>
            <div className="text-sm text-gray-600">1.85M tech jobs</div>
          </div>
          <div className="p-4 bg-gray-50 rounded-lg">
            <h4 className="font-medium text-gray-700 mb-2 flex items-center">
              <DollarSign size={16} className="mr-2" /> Highest Average Salary
            </h4>
            <div className="text-lg font-bold text-blue-700">United States</div>
            <div className="text-sm text-gray-600">$128k per year</div>
          </div>
          <div className="p-4 bg-gray-50 rounded-lg">
            <h4 className="font-medium text-gray-700 mb-2 flex items-center">
              <TrendingUp size={16} className="mr-2" /> Fastest Growth
            </h4>
            <div className="text-lg font-bold text-blue-700">India</div>
            <div className="text-sm text-gray-600">+12.4% YoY</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GlobalJobInsightsMap;
