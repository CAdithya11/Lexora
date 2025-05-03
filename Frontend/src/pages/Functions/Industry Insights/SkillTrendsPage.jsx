import React, { useState, useEffect } from 'react';
import { ChevronDown, Globe, TrendingUp, Filter, BookOpen } from 'lucide-react';
import SidebarSub from '../../../component/template/SidebarSub';
import TopHeader from '../../../component/template/TopHeader';
import JobDashboard from '../../../component/IndustryInsights/JobDashboard';
import GoogleAIStudio from './Brain/GoogleAIStudio';

// Expanded categories for IT field jobs worldwide
const categories = [
  // Software Development
  'JavaScript',
  'Python',
  'Java',
  'C#',
  'C++',
  'TypeScript',
  'Go',
  'PHP',
  'Rust',
  'Kotlin',
  'Swift',
  'HTML/CSS',
  'React',
  'Angular',
  'Vue.js',
  'Node.js',
  'Spring Boot',
  '.NET',
  'Flutter',
  'Unity',

  // Data & Analytics
  'SQL',
  'R',
  'Python for Data Science',
  'Pandas',
  'NumPy',
  'TensorFlow',
  'PyTorch',
  'Scikit-learn',
  'Power BI',
  'Tableau',
  'Apache Spark',
  'Hadoop',
  'Data Warehousing',
  'ETL',
  'BigQuery',

  // Security & Infrastructure
  'Linux',
  'Networking',
  'Firewalls',
  'SIEM Tools',
  'Penetration Testing',
  'Cryptography',
  'AWS',
  'Azure',
  'Google Cloud Platform (GCP)',
  'Docker',
  'Kubernetes',
  'Terraform',
  'CI/CD',
  'Monitoring Tools (e.g., Prometheus, Grafana)',

  // Design & Product
  'Figma',
  'Adobe XD',
  'Sketch',
  'Photoshop',
  'User Research',
  'Wireframing',
  'Prototyping',
  'Agile Methodology',
  'Scrum',
  'Testing Tools (e.g., Selenium, Jest)',

  // Business & Management
  'Jira',
  'Confluence',
  'Project Management',
  'Business Analysis',
  'Enterprise Modeling',
  'ITIL',
  'TOGAF',
  'Stakeholder Management',
  'Risk Management',

  // Domain-Specific IT
  'Digital Marketing',
  'SEO',
  'Salesforce',
  'Health IT Systems (e.g., HL7, EHR)',
  'Financial Systems (e.g., SAP, Oracle)',
  'LMS Platforms',
  'EdTech Tools',
];

// Group categories by domain for better organization
const categoryGroups = {
  'Software Development': [
    'JavaScript',
    'Python',
    'Java',
    'C#',
    'C++',
    'TypeScript',
    'Go',
    'PHP',
    'Rust',
    'Kotlin',
    'Swift',
    'HTML/CSS',
    'React',
    'Angular',
    'Vue.js',
    'Node.js',
    'Spring Boot',
    '.NET',
    'Flutter',
    'Unity',
  ],
  'Data & Analytics': [
    'SQL',
    'R',
    'Python for Data Science',
    'Pandas',
    'NumPy',
    'TensorFlow',
    'PyTorch',
    'Scikit-learn',
    'Power BI',
    'Tableau',
    'Apache Spark',
    'Hadoop',
    'Data Warehousing',
    'ETL',
    'BigQuery',
  ],
  'Security & Infrastructure': [
    'Linux',
    'Networking',
    'Firewalls',
    'SIEM Tools',
    'Penetration Testing',
    'Cryptography',
    'AWS',
    'Azure',
    'Google Cloud Platform (GCP)',
    'Docker',
    'Kubernetes',
    'Terraform',
    'CI/CD',
    'Monitoring Tools (e.g., Prometheus, Grafana)',
  ],
  'Design & Product': [
    'Figma',
    'Adobe XD',
    'Sketch',
    'Photoshop',
    'User Research',
    'Wireframing',
    'Prototyping',
    'Agile Methodology',
    'Scrum',
    'Testing Tools (e.g., Selenium, Jest)',
  ],
  'Business & Management': [
    'Jira',
    'Confluence',
    'Project Management',
    'Business Analysis',
    'Enterprise Modeling',
    'ITIL',
    'TOGAF',
    'Stakeholder Management',
    'Risk Management',
  ],
  'Domain-Specific IT': [
    'Digital Marketing',
    'SEO',
    'Salesforce',
    'Health IT Systems (e.g., HL7, EHR)',
    'Financial Systems (e.g., SAP, Oracle)',
    'LMS Platforms',
    'EdTech Tools',
  ],
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

export default function SkillTrendsPage() {
  const [selectedCategory, setSelectedCategory] = useState('Software Development & Engineering');
  const [selectedYear, setSelectedYear] = useState('2025');
  const [selectedCountry, setSelectedCountry] = useState(countries[0]);
  const [showCountryDropdown, setShowCountryDropdown] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [chartTitle, setChartTitle] = useState('Software Engineering Skills');
  const [role, setRole] = useState('');
  const [skillsData, setSkillsData] = useState([]);
  const [activeGroup, setActiveGroup] = useState('All');

  const { fetchJobData, isLoading: dataLoading } = GoogleAIStudio();

  const years = ['2023', '2024', '2025', '2026'];

  useEffect(() => {
    const titlePrefix = selectedCategory.split(' & ')[0];
    setChartTitle(`${titlePrefix} Skills`);
  }, [selectedCategory]);

  useEffect(() => {
    const loadSkillsData = async () => {
      setIsLoading(true);
      const result = await fetchJobData(selectedYear, selectedCountry, selectedCategory);
      if (result.success) {
        setSkillsData(result.data);
      }
      setIsLoading(false);
    };

    loadSkillsData();
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

  // Function to get skill data based on the selected category

  return (
    <div className="flex h-screen overflow-hidden bg-gray-50">
      <SidebarSub />

      <div className="flex-1 flex flex-col overflow-hidden">
        <TopHeader HeaderMessage={'Skill Trends'} />

        <div className="flex-1 overflow-y-auto p-6 bg-white">
          <div className="m-5">
            <div className="mb-6 ">
              <div className="flex flex-row object-center items-center mb-2">
                <h2 className="text-lg font-medium mr-2">Worldwide Skill Trends</h2>
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
            {/* Chart Content */}
            <div className="p-2">
              <JobDashboard
                Datatype={'Skills'}
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
                <p className="text-gray-500 text-sm mb-4">Select the job category to view detailed skill insights</p>

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
