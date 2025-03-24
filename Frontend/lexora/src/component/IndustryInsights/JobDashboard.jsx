import React, { useState, useRef, useEffect } from 'react';
import {
  ChevronDown,
  Search,
  PieChart as PieIcon,
  BarChart as BarIcon,
  Circle,
  LineChart as LineIcon,
  Triangle,
  Radar,
  DollarSign,
  ArrowLeft,
  Globe,
  Filter as FilterIcon,
  X,
  ChartArea,
  LineChartIcon,
  MonitorCheckIcon,
} from 'lucide-react';
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
  Legend,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar as RechartsRadar,
  AreaChart,
  Area,
} from 'recharts';

// Color configuration
const COLOR_SCALE = ['#93C5FD', '#60A5FA', '#3B82F6', '#2563EB', '#1D4ED8'];
const getColorShade = (value, max) => {
  const index = Math.floor((value / max) * (COLOR_SCALE.length - 1));
  return COLOR_SCALE[Math.min(index, COLOR_SCALE.length - 1)];
};

const JobDashboard = () => {
  const [selectedYear, setSelectedYear] = useState('2025');
  const [showYearDropdown, setShowYearDropdown] = useState(false);

  const [activeChart, setActiveChart] = useState('bar');
  const [searchQuery, setSearchQuery] = useState('');
  const [hoveredJob, setHoveredJob] = useState(null);

  const [selectedCategory, setSelectedCategory] = useState('Software Development & Engineering');

  const [showCountryDropdown, setShowCountryDropdown] = useState(false);
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
  // Job data
  const jobData = [
    { role: 'Software Development', count: 15000, growthRate: 6.2 },
    { role: 'AR/VR Developer', count: 22000, growthRate: 18.5 },
    { role: 'QA Engineer', count: 30000, growthRate: 5.0 },
    { role: 'Frontend Developer', count: 35000, growthRate: 7.8 },
    { role: 'Backend Developer', count: 42000, growthRate: 8.3 },
    { role: 'Mobile App Developer', count: 48000, growthRate: 9.1 },
    { role: 'DevOps Engineer', count: 49000, growthRate: 12.7 },
    { role: 'Machine Learning Engineer', count: 55000, growthRate: 14.2 },
    { role: 'Cybersecurity Engineer', count: 60000, growthRate: 15.8 },
    { role: 'Data Scientist', count: 70000, growthRate: 10.5 },
    { role: 'Cloud Engineer', count: 82000, growthRate: 13.9 },
    { role: 'Full-Stack Developer', count: 95000, growthRate: 11.2 },
  ];

  const maxCount = Math.max(...jobData.map((job) => job.count));
  const processedJobs = jobData.map((job) => ({
    ...job,
    color: getColorShade(job.count, maxCount),
  }));

  // Trend data
  const trendData = [
    { month: 'Jan', 'AR/VR': 19000, Data: 65000, FullStack: 90000, Cloud: 76000 },
    { month: 'Feb', 'AR/VR': 19500, Data: 66000, FullStack: 91000, Cloud: 78000 },
    { month: 'Mar', 'AR/VR': 20000, Data: 67000, FullStack: 92000, Cloud: 79000 },
    { month: 'Apr', 'AR/VR': 20500, Data: 68000, FullStack: 93000, Cloud: 79500 },
    { month: 'May', 'AR/VR': 21000, Data: 69000, FullStack: 93500, Cloud: 80000 },
    { month: 'Jun', 'AR/VR': 21200, Data: 69500, FullStack: 94000, Cloud: 80500 },
    { month: 'Jul', 'AR/VR': 21500, Data: 70000, FullStack: 94500, Cloud: 81000 },
    { month: 'Aug', 'AR/VR': 21800, Data: 70000, FullStack: 95000, Cloud: 82000 },
  ];

  // Salary trend data from 2018 to 2025
  const salaryTrendData = [
    { year: '2018', Senior: 110000, Average: 85000, Entry: 65000, Maximum: 145000, Median: 90000 },
    { year: '2019', Senior: 115000, Average: 89000, Entry: 68000, Maximum: 152000, Median: 93000 },
    { year: '2020', Senior: 122000, Average: 93000, Entry: 70000, Maximum: 160000, Median: 97000 },
    { year: '2021', Senior: 130000, Average: 98000, Entry: 72000, Maximum: 175000, Median: 102000 },
    { year: '2022', Senior: 102000, Average: 105000, Entry: 78000, Maximum: 190000, Median: 110000 },
    { year: '2023', Senior: 155000, Average: 112000, Entry: 85000, Maximum: 210000, Median: 118000 },
    { year: '2024', Senior: 168000, Average: 120000, Entry: 92000, Maximum: 230000, Median: 125000 },
    { year: '2025', Senior: 180000, Average: 128000, Entry: 98000, Maximum: 250000, Median: 132000 },
  ];

  const toggleDropdown = (setter, state, event) => {
    event.stopPropagation();
    setter(!state);
  };

  // Chart components
  const CustomTooltip = ({ active, payload }) => {
    if (!active || !payload) return null;
    return (
      <div className="bg-white p-3 rounded-lg shadow-lg border border-gray-100">
        <div className="flex items-center gap-2 mb-2">
          <div className="w-3 h-3 rounded-full" style={{ backgroundColor: payload[0].payload.color }} />
          <p className="font-semibold text-sm">{payload[0].name}</p>
        </div>
        <p className="text-sm">Jobs: {payload[0].value.toLocaleString()}</p>
        <p className="text-sm text-blue-600">Growth: +{payload[0].payload.growthRate}%</p>
      </div>
    );
  };

  // Salary tooltip component
  const SalaryTooltip = ({ active, payload, label }) => {
    if (!active || !payload || !payload.length) return null;

    return (
      <div className="bg-white p-3 rounded-lg shadow-lg border border-gray-100">
        <p className="font-semibold text-sm mb-2">{label}</p>
        {payload.map((entry, index) => (
          <p key={index} className="text-sm" style={{ color: entry.color }}>
            {entry.name}: ${entry.value.toLocaleString()}
          </p>
        ))}
      </div>
    );
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Tech Job Market Dashboard</h1>
          <p className="text-gray-500 text-sm">2025 Projections</p>
        </div>
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
              <div className="absolute right-0 mt-2 w-64 bg-white border border-gray-200 rounded-lg shadow-lg z-50 p-4 animate-fade-in">
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
                {chart === 'line' && <LineIcon className="h-5 w-5" />}
                {chart === 'radar' && <Radar className="h-5 w-5" />}
                {chart === 'salary' && <DollarSign className="h-5 w-5" />}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-md p-6">
        {activeChart === 'bar' && (
          <div className="space-y-4">
            {processedJobs.map((job) => (
              <div key={job.role} className="flex items-center">
                <div className="w-48 text-sm text-gray-600 pr-4">{job.role}</div>
                <div className="flex-1 h-8 bg-gray-100 rounded-md overflow-hidden">
                  <div
                    className="h-full transition-all duration-300"
                    style={{ width: `${(job.count / maxCount) * 100}%`, backgroundColor: job.color }}
                  >
                    <span className="text-white text-sm font-medium pl-2 inline-block pt-1">
                      {job.count.toLocaleString()}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {activeChart === 'pie' && (
          <div className="h-96">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={processedJobs}
                  dataKey="count"
                  nameKey="role"
                  cx="50%"
                  cy="50%"
                  outerRadius={120}
                  innerRadius={70}
                  paddingAngle={2}
                  labelLine={false}
                  label={({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }) => {
                    const RADIAN = Math.PI / 180;
                    const radius = outerRadius * 1.15;
                    const x = cx + radius * Math.cos(-midAngle * RADIAN);
                    const y = cy + radius * Math.sin(-midAngle * RADIAN);

                    // Only show labels for segments with enough space (larger than 5%)
                    if (percent < 0.05) return null;

                    return (
                      <text
                        x={x}
                        y={y}
                        fill="#374151"
                        textAnchor={x > cx ? 'start' : 'end'}
                        dominantBaseline="central"
                        className="text-xs font-medium"
                      >
                        {processedJobs[index].role} ({(percent * 100).toFixed(0)}%)
                      </text>
                    );
                  }}
                >
                  {processedJobs.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={getColorShade(entry.count, maxCount)}
                      stroke="#ffffff"
                      strokeWidth={1}
                    />
                  ))}
                </Pie>
                <Tooltip
                  content={<CustomTooltip />}
                  wrapperStyle={{
                    backgroundColor: 'rgba(255, 255, 255, 0.95)',
                    border: '1px solid #e5e7eb',
                    borderRadius: '6px',
                    boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)',
                  }}
                />
                <Legend
                  layout="vertical"
                  align="right"
                  verticalAlign="middle"
                  formatter={(value) => <span className="text-sm text-gray-600">{value}</span>}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        )}

        {activeChart === 'line' && (
          <div className="h-96">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={trendData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="AR/VR"
                  stroke={COLOR_SCALE[0]}
                  strokeWidth={2}
                  dot={{ fill: COLOR_SCALE[0] }}
                />
                <Line
                  type="monotone"
                  dataKey="Data"
                  stroke={COLOR_SCALE[2]}
                  strokeWidth={2}
                  dot={{ fill: COLOR_SCALE[2] }}
                />
                <Line
                  type="monotone"
                  dataKey="FullStack"
                  stroke={COLOR_SCALE[4]}
                  strokeWidth={2}
                  dot={{ fill: COLOR_SCALE[4] }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        )}

        {activeChart === 'radar' && (
          <div className="h-96">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart data={processedJobs.slice(0, 8)}>
                <PolarGrid />
                <PolarAngleAxis dataKey="role" />
                <PolarRadiusAxis />
                <RechartsRadar dataKey="count" stroke={COLOR_SCALE[3]} fill={COLOR_SCALE[3]} fillOpacity={0.2} />
                <Tooltip content={<CustomTooltip />} />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        )}

        {activeChart === 'salary' && (
          <div className="h-96">
            <div className="mb-4">
              <h3 className="text-lg font-semibold text-gray-800">Tech Salary Trends (2018-2025)</h3>
              <p className="text-sm text-gray-600">Salary trends across different experience levels</p>
            </div>
            <ResponsiveContainer width="100%" height="85%">
              <AreaChart data={salaryTrendData} margin={{ top: 10, right: 30, left: 20, bottom: 10 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="year" />
                <YAxis tickFormatter={(value) => `$${value / 1000}k`} domain={[60000, 260000]} />
                <Tooltip content={<SalaryTooltip />} />
                <Legend />
                <Area type="monotone" dataKey="Senior" stackId="1" stroke="#1D4ED8" fill="#1D4ED8" fillOpacity={0.1} />
                <Area type="monotone" dataKey="Average" stackId="2" stroke="#3B82F6" fill="#3B82F6" fillOpacity={0.1} />
                <Area type="monotone" dataKey="Entry" stackId="3" stroke="#93C5FD" fill="#93C5FD" fillOpacity={0.1} />
                <Line type="monotone" dataKey="Maximum" stroke="#1E40AF" strokeWidth={2} dot={{ fill: '#1E40AF' }} />
                <Line
                  type="monotone"
                  dataKey="Median"
                  stroke="#60A5FA"
                  strokeWidth={2}
                  strokeDasharray="5 5"
                  dot={{ fill: '#60A5FA' }}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        )}
        <div className="flex w-full ">
          <div className="flex justify-center bg-gray-50 gap-2 mt-4 p-1 rounded-lg w-full 	">
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
