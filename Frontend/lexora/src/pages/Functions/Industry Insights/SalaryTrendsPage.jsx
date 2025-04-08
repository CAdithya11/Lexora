import React, { useState, useEffect } from 'react';
import { Briefcase, ChevronDown, Globe, ArrowLeft, TrendingUp, Filter } from 'lucide-react';
import SidebarSub from '../../../component/template/SidebarSub';
import TopHeader from '../../../component/template/TopHeader';
import JobDashboard from '../../../component/IndustryInsights/JobDashboard';
import GoogleAIStudio from './Brain/GoogleAIStudio';

// Expanded categories for IT field jobs worldwide
const categories = [
  // Software Development
  'Software Development & Engineering',
  'Mobile App Development',
  'Web Development',
  'DevOps & SRE',
  'Cloud Engineering',
  'Game Development',
  'Embedded Systems',
  'Blockchain Development',

  // Data-focused roles
  'Data Science & Analytics',
  'Machine Learning & AI',
  'Business Intelligence',
  'Data Engineering',
  'Big Data',
  'Database Administration',

  // Security and infrastructure
  'Cybersecurity',
  'Network Engineering',
  'IT Infrastructure',
  'System Administration',

  // Design and product
  'Design & Creative',
  'UI/UX Design',
  'Product Management',
  'Quality Assurance & Testing',

  // Enterprise and business
  'IT Project Management',
  'Enterprise Architecture',
  'Business & Management',
  'IT Consulting',

  // Domain-specific IT
  'Marketing & Communications',
  'Healthcare & Medicine IT',
  'FinTech',
  'EdTech',
];

// Group categories by domain for better organization
const categoryGroups = {
  'Software Development': [
    'Software Development & Engineering',
    'Mobile App Development',
    'Web Development',
    'DevOps & SRE',
    'Cloud Engineering',
    'Game Development',
    'Embedded Systems',
    'Blockchain Development',
  ],
  'Data & Analytics': [
    'Data Science & Analytics',
    'Machine Learning & AI',
    'Business Intelligence',
    'Data Engineering',
    'Big Data',
    'Database Administration',
  ],
  'Security & Infrastructure': ['Cybersecurity', 'Network Engineering', 'IT Infrastructure', 'System Administration'],
  'Design & Product': ['Design & Creative', 'UI/UX Design', 'Product Management', 'Quality Assurance & Testing'],
  'Business & Management': [
    'IT Project Management',
    'Enterprise Architecture',
    'Business & Management',
    'IT Consulting',
  ],
  'Domain-Specific IT': ['Marketing & Communications', 'Healthcare & Medicine IT', 'FinTech', 'EdTech'],
};

// Countries data
const countries = [
  { name: 'United States', code: 'US' },
  { name: 'Canada', code: 'CA' },
  { name: 'United Kingdom', code: 'UK' },
  { name: 'Australia', code: 'AU' },
  { name: 'Germany', code: 'DE' },
  { name: 'France', code: 'FR' },
  { name: 'Japan', code: 'JP' },
  { name: 'India', code: 'IN' },
  { name: 'Singapore', code: 'SG' },
  { name: 'Netherlands', code: 'NL' },
  { name: 'Israel', code: 'IL' },
  { name: 'Sweden', code: 'SE' },
  { name: 'Switzerland', code: 'CH' },
  { name: 'South Korea', code: 'KR' },
  { name: 'Brazil', code: 'BR' },
];

export default function SalaryTrendsPage() {
  const [selectedCategory, setSelectedCategory] = useState('Software Development & Engineering');
  const [selectedYear, setSelectedYear] = useState('2025');
  const [selectedCountry, setSelectedCountry] = useState(countries[0]);
  const [showCountryDropdown, setShowCountryDropdown] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [chartTitle, setChartTitle] = useState('Software Engineering Trends');
  const [role, setRole] = useState('');
  const [salaryData, setSalaryData] = useState([]);
  const [activeGroup, setActiveGroup] = useState('All');

  const { fetchJobData, isLoading: dataLoading } = GoogleAIStudio();

  const years = ['2023', '2024', '2025', '2026'];

  useEffect(() => {
    const titlePrefix = selectedCategory.split(' & ')[0];
    setChartTitle(`${titlePrefix} Trends`);
  }, [selectedCategory]);

  useEffect(() => {
    const loadSalaryData = async () => {
      setIsLoading(true);
      const result = await fetchJobData(selectedYear, selectedCountry, selectedCategory);
      if (result.success) {
        setSalaryData(result.data);
      }
      setIsLoading(false);
    };

    loadSalaryData();
  }, [selectedYear, selectedCountry, selectedCategory]);

  const toggleDropdown = (setter, currentState, e) => {
    e.stopPropagation();
    setter(!currentState);
  };

  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
    setRole(category); // Set the role for passing to the JobDashboard
  };

  // Get the appropriate list of categories to show based on active group
  const getCategoriesToShow = () => {
    if (activeGroup === 'All') {
      return categories;
    }
    return categoryGroups[activeGroup] || [];
  };

  return (
    <div className="flex h-screen overflow-hidden bg-gray-50">
      <SidebarSub />

      <div className="flex-1 flex flex-col overflow-hidden">
        <TopHeader HeaderMessage={'Salary Trends'} />

        <div className="flex-1 overflow-y-auto p-6 bg-white">
          <div className="m-5">
            <div className="mb-6 ">
              <div className="flex flex-row object-center items-center mb-2">
                <h2 className="text-lg font-medium mr-2">Worldwide Salary Trends</h2>
              </div>
              <div className="flex items-center space-x-4 mt-2">
                <div className="relative">
                  <div
                    className="flex items-center border rounded-md px-3 py-2 bg-white cursor-pointer"
                    onClick={(e) => toggleDropdown(setShowCountryDropdown, showCountryDropdown, e)}
                  >
                    <Globe size={16} className="mr-2" />
                    <span>{selectedCountry.name}</span>
                    <ChevronDown size={16} className="ml-2" />
                  </div>
                  {showCountryDropdown && (
                    <div className="absolute left-0 mt-1 bg-white border rounded-md shadow-lg z-10 max-h-60 overflow-y-auto w-48">
                      {countries.map((country) => (
                        <div
                          key={country.code}
                          className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                          onClick={() => {
                            setSelectedCountry(country);
                            setShowCountryDropdown(false);
                          }}
                        >
                          {country.name}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
                <div className="flex space-x-2">
                  {years.map((year) => (
                    <button
                      key={year}
                      className={`px-3 py-1 text-sm rounded-md ${
                        selectedYear === year ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                      }`}
                      onClick={() => setSelectedYear(year)}
                    >
                      {year}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 m-6 mb-0">
              <div className="bg-white rounded-xl p-5 border border-gray-200 shadow-sm">
                <h4 className="text-sm font-medium text-gray-500 mb-1">Highest Demand</h4>
                <p className="text-xl font-semibold text-gray-800">
                  {selectedCategory === 'Software Development & Engineering'
                    ? 'Full-Stack Developer'
                    : selectedCategory === 'Data Science & Analytics'
                    ? 'Data Engineer'
                    : selectedCategory === 'Machine Learning & AI'
                    ? 'ML Engineer'
                    : selectedCategory === 'DevOps & SRE'
                    ? 'DevOps Engineer'
                    : selectedCategory === 'Cybersecurity'
                    ? 'Security Analyst'
                    : selectedCategory === 'Cloud Engineering'
                    ? 'Cloud Architect'
                    : selectedCategory === 'Design & Creative'
                    ? 'UX/UI Designer'
                    : selectedCategory === 'Marketing & Communications'
                    ? 'Digital Marketing Specialist'
                    : selectedCategory === 'Business & Management'
                    ? 'Product Manager'
                    : 'IT Specialist'}
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
                    : selectedCategory === 'Machine Learning & AI'
                    ? '$112,800 USD'
                    : selectedCategory === 'DevOps & SRE'
                    ? '$97,600 USD'
                    : selectedCategory === 'Cybersecurity'
                    ? '$105,900 USD'
                    : selectedCategory === 'Cloud Engineering'
                    ? '$108,400 USD'
                    : selectedCategory === 'Design & Creative'
                    ? '$76,800 USD'
                    : selectedCategory === 'Marketing & Communications'
                    ? '$68,400 USD'
                    : selectedCategory === 'Business & Management'
                    ? '$89,600 USD'
                    : '$90,200 USD'}
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
                    : selectedCategory === 'Machine Learning & AI'
                    ? '8,943'
                    : selectedCategory === 'DevOps & SRE'
                    ? '10,215'
                    : selectedCategory === 'Cybersecurity'
                    ? '15,762'
                    : selectedCategory === 'Cloud Engineering'
                    ? '14,928'
                    : selectedCategory === 'Design & Creative'
                    ? '9,843'
                    : selectedCategory === 'Marketing & Communications'
                    ? '14,268'
                    : selectedCategory === 'Business & Management'
                    ? '16,590'
                    : '11,437'}
                </p>
                <div className="flex items-center mt-2 text-blue-600 text-sm">
                  <Filter size={14} className="mr-1" />
                  <span>View openings by location</span>
                </div>
              </div>
            </div>
            {/* Chart Content */}
            <div className="p-2">
              <JobDashboard
                Datatype={'Salary'}
                role={role}
                country={selectedCountry}
                dateTime={selectedYear}
                jobCategory={selectedCategory}
              />
            </div>
            {/* Job Categories Section */}

            <div className="m-5">
              <div className="mb-6">
                <div className="flex flex-row object-center items-center mb-2">
                  <h2 className="text-lg font-medium mr-2">IT Job Categories</h2>
                </div>
                <p className="text-gray-500 text-sm mb-4">Select the job category to view detailed salary insights</p>

                {/* Category group tabs */}
                <div className="flex flex-wrap gap-2 mb-6">
                  <button
                    className={`px-3 py-1 text-sm rounded-md ${
                      activeGroup === 'All' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                    }`}
                    onClick={() => setActiveGroup('All')}
                  >
                    All Categories
                  </button>
                  {Object.keys(categoryGroups).map((group) => (
                    <button
                      key={group}
                      className={`px-3 py-1 text-sm rounded-md ${
                        activeGroup === group ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                      }`}
                      onClick={() => setActiveGroup(group)}
                    >
                      {group}
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {getCategoriesToShow().map((category, index) => (
                  <div
                    key={index}
                    className={`p-4 rounded-lg cursor-pointer transition-all duration-200 transform hover:scale-102 bg-white border border-gray-200 ${
                      selectedCategory === category ? 'border-blue-500 bg-blue-50' : ''
                    }`}
                    onClick={() => handleCategorySelect(category)}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <span
                          className={`ml-3 font-medium ${
                            selectedCategory === category ? 'text-blue-700' : 'text-gray-700'
                          }`}
                        >
                          {category}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
