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
  const [jobData, setJobData] = useState([]);
  const [selectedYear, setSelectedYear] = useState('2025');
  const [activeChart, setActiveChart] = useState('radar');
  const [searchQuery, setSearchQuery] = useState('');
  const [hoveredJob, setHoveredJob] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('Software Development & Engineering');
  const [isLoading, setIsLoading] = useState(true);
  const [chartTitle, setChartTitle] = useState('Software Engineering Trends');
  const [showFilterDropdown, setShowFilterDropdown] = useState(false);
  const filterRef = useRef(null);
  const API_KEY = 'AIzaSyDk93DVnzDnYhuJyHCLIsjMjHd47uODLvs'; // Use the same API key from GoogleAIStudio

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
  const years = ['2023', '2024', '2025', '2026'];

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

  // Function to create a dynamic prompt for Google Gemini API
  // Function to create a dynamic prompt for Google Gemini API
  const createJobDataPrompt = (year, country, jobCategory) => {
    return `Generate realistic IT job market data for the year ${year} in ${country.name}. 
  Focus on the ${jobCategory || selectedCategory} category.
  
  Format the response as a pure JSON array of objects WITHOUT any markdown formatting, code blocks, or backticks. The output should be directly parseable by JSON.parse(). Each object should have the following structure:
  {
    "year": "${year}year,  month and date",
    "role": "Main Job Title",
    "subRole": "Specific Job Title",
    "jobRole": "Specific Job Function",
    "count": number of available jobs,
    "growthRate": year-over-year percentage growth rate,
    "avgSalary": Currency average annual salary in USD,
    "minSalary": Currency minimum typical salary in USD,
    "maxSalary": Currency maximum typical salary in USD
  }
  
  Include at least 15 different IT job roles across these categories:
  - Software Development & Engineering (roles like Software Engineer, Full-Stack Developer, Mobile App Developer, etc.)
  - Data Science & Analytics (Data Scientist, Data Engineer, Business Intelligence Analyst, etc.)
  - Cybersecurity (Security Analyst, Penetration Tester, Security Engineer, etc.)
  - Cloud Computing (Cloud Architect, DevOps Engineer, Site Reliability Engineer, etc.)
  - IT Support & Infrastructure (System Administrator, Network Engineer, IT Support Specialist, etc.)
  - AI & Machine Learning (ML Engineer, AI Researcher, Computer Vision Engineer, etc.)
  - Blockchain & Web3 (Blockchain Developer, Smart Contract Engineer, etc.)
  
  IMPORTANT: Return ONLY the valid JSON array with NO additional text, formatting, or code blocks. The response should start with "[" and end with "]". Do not have dplicate job roels. Order the data according to it's year date and month `;
  };

  // Function to fetch data from Google's Gemini API
  // Modify the fetchJobData function to clean the JSON response
  const fetchJobData = async (year, countryObj, category) => {
    setIsLoading(true);
    try {
      const { GoogleGenerativeAI } = await import('@google/generative-ai');
      const genAI = new GoogleGenerativeAI(API_KEY);
      const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });
      const prompt = createJobDataPrompt(year, countryObj, category);
      const result = await model.generateContent(prompt);
      let text = result.response
        .text()
        .replace(/```json|```/g, '')
        .trim();

      const parsedData = JSON.parse(text);
      const deduped = Array.from(new Map(parsedData.map((item) => [item.role, item])).values());

      setJobData(deduped);
    } catch (err) {
      console.error('Failed to fetch job data:', err);
      setJobData([]);
    } finally {
      setIsLoading(false);
    }
  };

  // Effect to fetch data when filters change
  useEffect(() => {
    // Initialize with parameters or defaults
    const yearToUse = dateTime || selectedYear;
    const countryToUse = country || selectedCountry;
    const categoryToUse = jobCategory || selectedCategory;

    fetchJobData(yearToUse, countryToUse, categoryToUse);

    // Update local state to match props if they exist
    if (dateTime) setSelectedYear(dateTime);
    if (country) setSelectedCountry(country);
    if (jobCategory) setSelectedCategory(jobCategory);
  }, [dateTime, country, jobCategory, selectedYear, selectedCountry, selectedCategory]);

  const toggleDropdown = (setter, state, event) => {
    event.stopPropagation();
    setter(!state);
  };

  // Apply filters button handler
  const handleApplyFilters = () => {
    fetchJobData();
    setShowFilterDropdown(false);
  };

  // Chart tooltip component
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
      <div className="flex justify-between items-center mb-6 mt-10">
        <div className="max-w-3xl">
          <div className="mb-6">
            <div className="flex flex-row object-center items-center mb-2">
              <h2 className="ml-6 text-lg font-medium mr-2">
                {selectedYear} {selectedCountry.name} Trending Jobs View
              </h2>
            </div>
          </div>
        </div>
        <div></div>
        <div className="flex gap-3 items-center">
          {/* Back button - moved outside filter */}
          <button className="flex items-center justify-center text-sm font-medium px-3 py-2 rounded-lg hover:bg-blue-100 transition-colors duration-200 shadow-sm">
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
                  <button
                    className="w-full flex items-center justify-center gap-2 text-sm font-medium px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition-colors duration-200 shadow-sm"
                    onClick={handleApplyFilters}
                  >
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
        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        ) : (
          <>
            {activeChart === 'bar' && <BarChart Datatype={Datatype} DataSet={jobData} />}
            {activeChart === 'pie' && <PieChartT Datatype={Datatype} DataSet={jobData} />}
            {activeChart === 'radar' && <RadarChartT Datatype={Datatype} DataSet={jobData} />}
            {activeChart === 'salary' && <DollarChart DataType={dataType} DataSet={jobData} />}
            {activeChart === 'line' && <DollarChart DataType={dataType} DataSet={jobData} />}
          </>
        )}
      </div>
    </div>
  );
};

export default JobDashboard;
