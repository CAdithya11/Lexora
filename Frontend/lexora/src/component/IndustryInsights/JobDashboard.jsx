import React, { useState, useRef, useEffect } from 'react';
import {
  ChevronDown,
  Search,
  PieChart as PieIcon,
  BarChart as BarIcon,
  LineChart as LineIcon,
  DollarSign,
  ArrowLeft,
  Filter as FilterIcon,
  X,
  Radar,
  LineChartIcon,
  LineChart,
} from 'lucide-react';
import BarChart from './template/charts/BarChart';
import RadarChartT from './template/charts/RadarChartT';
import PieChartT from './template/charts/PieChartT';
import DollarChart from './template/charts/DollarChart';

const JobDashboard = ({ Datatype, role, country, dateTime, jobCategory }) => {
  const [dataType, setDataType] = useState(Datatype);

  const jobData = [
    {
      year: '2025',
      role: 'Software Engineer',
      count: 180000,
      growthRate: 8.5,
      avgSalary: 135000,
      minSalary: 100000,
      maxSalary: 170000,
    },
    {
      year: '2025',
      role: 'Full-Stack Developer',
      count: 220000,
      growthRate: 12.1,
      avgSalary: 140000,
      minSalary: 105000,
      maxSalary: 175000,
    },
    {
      year: '2025',
      role: 'Mobile App Developer',
      count: 165000,
      growthRate: 9.8,
      avgSalary: 130000,
      minSalary: 95000,
      maxSalary: 165000,
    },
    {
      year: '2025',
      role: 'Game Developer',
      count: 95000,
      growthRate: 6.7,
      avgSalary: 115000,
      minSalary: 85000,
      maxSalary: 145000,
    },
    {
      year: '2025',
      role: 'DevOps Engineer',
      count: 210000,
      growthRate: 14.3,
      avgSalary: 155000,
      minSalary: 120000,
      maxSalary: 190000,
    },
    {
      year: '2025',
      role: 'Web Developer',
      count: 185000,
      growthRate: 7.2,
      avgSalary: 125000,
      minSalary: 90000,
      maxSalary: 160000,
    },
    {
      year: '2025',
      role: 'UI/UX Developer',
      count: 135000,
      growthRate: 10.5,
      avgSalary: 128000,
      minSalary: 95000,
      maxSalary: 160000,
    },

    {
      year: '2025',
      role: 'Data Scientist',
      count: 250000,
      growthRate: 15.0,
      avgSalary: 165000,
      minSalary: 130000,
      maxSalary: 200000,
    },
    {
      year: '2025',
      role: 'Machine Learning Engineer',
      count: 190000,
      growthRate: 18.4,
      avgSalary: 175000,
      minSalary: 140000,
      maxSalary: 210000,
    },

    {
      year: '2025',
      role: 'AI Engineer',
      count: 145000,
      growthRate: 22.7,
      avgSalary: 185000,
      minSalary: 150000,
      maxSalary: 220000,
    },
    {
      year: '2025',
      role: 'Computer Vision Engineer',
      count: 120000,
      growthRate: 20.5,
      avgSalary: 180000,
      minSalary: 145000,
      maxSalary: 215000,
    },

    {
      year: '2025',
      role: 'Cybersecurity Analyst',
      count: 175000,
      growthRate: 16.8,
      avgSalary: 150000,
      minSalary: 115000,
      maxSalary: 185000,
    },
    {
      year: '2025',
      role: 'Ethical Hacker',
      count: 85000,
      growthRate: 19.3,
      avgSalary: 160000,
      minSalary: 125000,
      maxSalary: 195000,
    },

    {
      year: '2025',
      role: 'Cloud Architect',
      count: 130000,
      growthRate: 13.9,
      avgSalary: 170000,
      minSalary: 135000,
      maxSalary: 205000,
    },
    {
      year: '2025',
      role: 'Site Reliability Engineer (SRE)',
      count: 110000,
      growthRate: 11.5,
      avgSalary: 158000,
      minSalary: 125000,
      maxSalary: 190000,
    },
    {
      year: '2025',
      role: 'IT Support Specialist',
      count: 220000,
      growthRate: 4.5,
      avgSalary: 80000,
      minSalary: 60000,
      maxSalary: 100000,
    },

    {
      year: '2025',
      role: 'Database Administrator (DBA)',
      count: 95000,
      growthRate: 5.8,
      avgSalary: 135000,
      minSalary: 105000,
      maxSalary: 165000,
    },

    // 9. IT Project Management
    {
      year: '2025',
      role: 'IT Project Manager',
      count: 150000,
      growthRate: 9.1,
      avgSalary: 145000,
      minSalary: 110000,
      maxSalary: 180000,
    },

    // 10. Software Testing & QA
    {
      year: '2025',
      role: 'QA Engineer',
      count: 120000,
      growthRate: 6.3,
      avgSalary: 115000,
      minSalary: 85000,
      maxSalary: 145000,
    },

    // 11. Blockchain & Web3
    {
      year: '2025',
      role: 'Blockchain Developer',
      count: 75000,
      growthRate: 25.4,
      avgSalary: 195000,
      minSalary: 155000,
      maxSalary: 235000,
    },

    // 12. Network & Telecommunications
    {
      year: '2025',
      role: 'Network Engineer',
      count: 105000,
      growthRate: 7.6,
      avgSalary: 125000,
      minSalary: 95000,
      maxSalary: 155000,
    },

    // 13. Hardware & Embedded Systems
    {
      year: '2025',
      role: 'IoT Engineer',
      count: 90000,
      growthRate: 12.9,
      avgSalary: 140000,
      minSalary: 110000,
      maxSalary: 170000,
    },

    // 14. IT Governance & Compliance
    {
      year: '2025',
      role: 'IT Auditor',
      count: 65000,
      growthRate: 8.7,
      avgSalary: 130000,
      minSalary: 100000,
      maxSalary: 160000,
    },

    // 15. IT Sales & Marketing
    {
      year: '2025',
      role: 'IT Sales Engineer',
      count: 80000,
      growthRate: 7.4,
      avgSalary: 120000,
      minSalary: 90000,
      maxSalary: 150000,
    },
  ];

  const [selectedYear, setSelectedYear] = useState('2025');

  const [activeChart, setActiveChart] = useState('radar');
  const [searchQuery, setSearchQuery] = useState('');
  const [hoveredJob, setHoveredJob] = useState(null);

  const [selectedCategory, setSelectedCategory] = useState('Software Development & Engineering');

  const [isLoading, setIsLoading] = useState(true);
  const [chartTitle, setChartTitle] = useState('Software Engineering Trends');
  const [showFilterDropdown, setShowFilterDropdown] = useState(false);

  const filterRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (filterRef.current && !filterRef.current.contains(event.target)) {
        setShowFilterDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

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

  const [selectedCountry, setSelectedCountry] = useState(countries[0]);

  // Available years for the filter
  const years = ['2023', '2024', '2025', '2026'];

  const toggleDropdown = (setter, state, event) => {
    event.stopPropagation();
    setter(!state);
  };

  // Chart components
  const CustomTooltip = ({ active, payload }) => {
    if (!active || !payload) return null;
    const { role, count, growthRate, avgSalary, minSalary, maxSalary } = payload[0].payload;

    return (
      <div className="bg-white p-3 rounded-lg shadow-lg border border-gray-100">
        <div className="flex items-center gap-2 mb-2">
          <div className="w-3 h-3 rounded-full" style={{ backgroundColor: payload[0].payload.color }} />
          <p className="font-semibold text-sm">{role}</p>
        </div>
        <p className="text-sm">Jobs: {count.toLocaleString()}</p>
        <p className="text-sm text-blue-600">Growth: +{growthRate}%</p>
        <p className="text-sm">Avg Salary: ${avgSalary.toLocaleString()}</p>
        <p className="text-sm">Min Salary: ${minSalary.toLocaleString()}</p>
        <p className="text-sm">Max Salary: ${maxSalary.toLocaleString()}</p>
      </div>
    );
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6  mt-10">
        <div className="max-w-3xl">
          <div className="mb-6 ">
            <div className="flex flex-row object-center items-center mb-2">
              <h2 className="ml-6  text-lg font-medium mr-2">2025 Worldwide Trending Jobs View</h2>
            </div>
          </div>
        </div>
        <div></div>
        <div className="flex gap-3 items-center">
          {/* Back button - moved outside filter */}
          <button className="flex items-center justify-center text-sm font-medium px-3 py-2 rounded-lg  hover:bg-blue-100 transition-colors duration-200 shadow-sm">
            <ArrowLeft size={16} className="mr-1" />
            Back
          </button>

          {/* Filter dropdown */}
          <div className="relative" ref={filterRef}>
            <button
              className={`px-4 py-2 rounded-lg flex items-center gap-2 text-sm font-medium transition-colors duration-200 shadow-sm ${
                showFilterDropdown
                  ? 'bg-blue-50 text-blue-600 border border-blue-200'
                  : 'bg-white border border-gray-200 hover:bg-gray-50 text-gray-700'
              }`}
              onClick={(e) => toggleDropdown(setShowFilterDropdown, showFilterDropdown, e)}
            >
              <FilterIcon size={16} />
              <span>Filter</span>
              <ChevronDown size={14} className={showFilterDropdown ? 'transform rotate-180' : ''} />
            </button>

            {showFilterDropdown && (
              <div className="absolute right-0 mt-2 w-64 bg-white border border-gray-50 rounded-lg shadow-lg z-50 p-4 animate-fade-in">
                <div className="flex justify-between items-center mb-3 pb-2 border-b border-gray-100">
                  <h3 className="text-sm font-bold text-gray-800">Filters</h3>
                  <button className="text-gray-400 hover:text-gray-600" onClick={() => setShowFilterDropdown(false)}>
                    <X size={16} />
                  </button>
                </div>
                <div className="space-y-4">
                  {/* Year filter section */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Year</label>
                    <div className="grid grid-cols-4 gap-2">
                      {years.map((year) => (
                        <button
                          key={year}
                          className={`px-2 py-1.5 text-xs rounded-md transition-colors duration-200 ${
                            year === selectedYear
                              ? 'bg-blue-500 text-white font-medium shadow-sm'
                              : 'border border-gray-200 text-gray-700 hover:bg-gray-50'
                          }`}
                          onClick={() => setSelectedYear(year)}
                        >
                          {year}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Country filter section */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Country</label>
                    <div className="relative">
                      <select
                        className="w-full p-2 text-sm border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-300 appearance-none bg-white pr-8"
                        value={selectedCountry.code}
                        onChange={(e) => {
                          const country = countries.find((c) => c.code === e.target.value);
                          setSelectedCountry(country);
                          setIsLoading(true);
                        }}
                      >
                        {countries.map((country) => (
                          <option key={country.code} value={country.code}>
                            {country.name}
                          </option>
                        ))}
                      </select>
                      <ChevronDown size={14} className="absolute right-3 top-3 text-gray-400 pointer-events-none" />
                    </div>
                  </div>

                  {/* Apply filters button */}
                  <button className="w-full flex items-center justify-center gap-2 text-sm font-medium px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition-colors duration-200 shadow-sm">
                    Apply Filters
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Search input */}
          <div className="flex relative w-full md:w-auto">
            <input
              type="text"
              placeholder="Search job roles"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 pr-4 py-2 bg-white border border-gray-200 rounded-lg w-full md:w-64 text-sm focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-300 transition-all duration-200 shadow-sm"
            />
            <Search size={16} className="absolute left-3 top-2.5 text-gray-400" />
            {searchQuery && (
              <button
                className="absolute right-3 top-2.5 text-gray-400 hover:text-gray-600"
                onClick={() => setSearchQuery('')}
              >
                <X size={14} />
              </button>
            )}
          </div>

          {/* Chart type selector */}
          <div className="flex bg-gray-100 p-1 rounded-lg shadow-sm">
            {['bar', 'pie', 'line', 'radar', 'salary'].map((chart) => (
              <button
                key={chart}
                onClick={() => setActiveChart(chart)}
                className={`p-2 rounded-md transition-all duration-200 ${
                  activeChart === chart
                    ? 'bg-white shadow-sm text-blue-600'
                    : 'text-gray-600 hover:text-gray-800 hover:bg-gray-200'
                }`}
                title={chart.charAt(0).toUpperCase() + chart.slice(1)}
              >
                {chart === 'bar' && <BarIcon className="h-5 w-5" />}

                {chart === 'pie' && <PieIcon className="h-5 w-5" />}

                {chart === 'radar' && <Radar className="h-5 w-5" />}
                {chart === 'salary' && <DollarSign className="h-5 w-5" />}
                {chart === 'line' && <LineChart className="h-5 w-5" />}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl p-6">
        {activeChart === 'bar' && <BarChart Datatype={Datatype} DataSet={jobData} />}
        {activeChart === 'pie' && <PieChartT Datatype={Datatype} DataSet={jobData} />}
        {activeChart === 'radar' && <RadarChartT Datatype={Datatype} DataSet={jobData} />}
        {activeChart === 'salary' && <DollarChart DataType={dataType} DataSet={jobData} />}
        {activeChart === 'line' && <DollarChart DataType={dataType} DataSet={jobData} />}

        <div className="flex w-full ">
          <div className="flex justify-center bg-white gap-2 mt-4 p-1 rounded-lg w-full 	">
            <button className="flex items-center justify-center text-sm font-medium px-3 py-2 rounded-lg bg-white  transition-colors duration-200 shadow-sm cursor-pointer">
              <LineChartIcon size={16} className="mr-4" />
              Weekly
            </button>
            <button className="flex items-center justify-center text-sm font-medium px-3 py-2 rounded-lg  hover:bg-gray-200 transition-colors duration-200 cursor-pointer">
              <LineChartIcon size={16} className="mr-4" />
              Monthly
            </button>
            <button className="flex items-center justify-center text-sm font-medium px-3 py-2 rounded-lg  hover:bg-gray-200 transition-colors duration-200 cursor-pointer">
              <LineChartIcon size={16} className="mr-4" />
              Yearly
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobDashboard;
