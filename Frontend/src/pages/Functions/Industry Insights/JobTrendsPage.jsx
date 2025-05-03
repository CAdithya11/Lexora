import React, { useState, useEffect } from 'react';
import { Briefcase, ChevronDown, Globe, ArrowLeft, TrendingUp, Filter } from 'lucide-react';
import SidebarSub from '../../../component/template/SidebarSub';
import TopHeader from '../../../component/template/TopHeader';
import JobDashboard from '../../../component/IndustryInsights/JobDashboard';
import GoogleAIStudio from './Brain/GoogleAIStudio';

const categories = [
  'Software Development & Engineering',
  'Mobile App Development',
  'Web Development',
  'DevOps & SRE',
  'Cloud Engineering',
  'Game Development',
  'Embedded Systems',
  'Blockchain Development',

  'Data Science & Analytics',
  'Machine Learning & AI',
  'Business Intelligence',
  'Data Engineering',
  'Big Data',
  'Database Administration',

  'Cybersecurity',
  'Network Engineering',
  'IT Infrastructure',
  'System Administration',

  'Design & Creative',
  'UI/UX Design',
  'Product Management',
  'Quality Assurance & Testing',

  'IT Project Management',
  'Enterprise Architecture',
  'Business & Management',
  'IT Consulting',

  'Marketing & Communications',
  'Healthcare & Medicine IT',
  'FinTech',
  'EdTech',
];

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
  { name: 'Afghanistan', code: 'AF' },
  { name: 'Albania', code: 'AL' },
  { name: 'Algeria', code: 'DZ' },
  { name: 'Andorra', code: 'AD' },
  { name: 'Angola', code: 'AO' },
  { name: 'Argentina', code: 'AR' },
  { name: 'Armenia', code: 'AM' },
  { name: 'Australia', code: 'AU' },
  { name: 'Austria', code: 'AT' },
  { name: 'Azerbaijan', code: 'AZ' },
  { name: 'Bahamas', code: 'BS' },
  { name: 'Bahrain', code: 'BH' },
  { name: 'Bangladesh', code: 'BD' },
  { name: 'Belarus', code: 'BY' },
  { name: 'Belgium', code: 'BE' },
  { name: 'Belize', code: 'BZ' },
  { name: 'Benin', code: 'BJ' },
  { name: 'Bhutan', code: 'BT' },
  { name: 'Bolivia', code: 'BO' },
  { name: 'Bosnia and Herzegovina', code: 'BA' },
  { name: 'Botswana', code: 'BW' },
  { name: 'Brazil', code: 'BR' },
  { name: 'Brunei', code: 'BN' },
  { name: 'Bulgaria', code: 'BG' },
  { name: 'Burkina Faso', code: 'BF' },
  { name: 'Burundi', code: 'BI' },
  { name: 'Cambodia', code: 'KH' },
  { name: 'Cameroon', code: 'CM' },
  { name: 'Canada', code: 'CA' },
  { name: 'Chad', code: 'TD' },
  { name: 'Chile', code: 'CL' },
  { name: 'China', code: 'CN' },
  { name: 'Colombia', code: 'CO' },
  { name: 'Comoros', code: 'KM' },
  { name: 'Congo (Brazzaville)', code: 'CG' },
  { name: 'Congo (Kinshasa)', code: 'CD' },
  { name: 'Costa Rica', code: 'CR' },
  { name: 'Croatia', code: 'HR' },
  { name: 'Cuba', code: 'CU' },
  { name: 'Cyprus', code: 'CY' },
  { name: 'Czech Republic', code: 'CZ' },
  { name: 'Denmark', code: 'DK' },
  { name: 'Djibouti', code: 'DJ' },
  { name: 'Dominica', code: 'DM' },
  { name: 'Dominican Republic', code: 'DO' },
  { name: 'Ecuador', code: 'EC' },
  { name: 'Egypt', code: 'EG' },
  { name: 'El Salvador', code: 'SV' },
  { name: 'Equatorial Guinea', code: 'GQ' },
  { name: 'Eritrea', code: 'ER' },
  { name: 'Estonia', code: 'EE' },
  { name: 'Eswatini', code: 'SZ' },
  { name: 'Ethiopia', code: 'ET' },
  { name: 'Fiji', code: 'FJ' },
  { name: 'Finland', code: 'FI' },
  { name: 'France', code: 'FR' },
  { name: 'Gabon', code: 'GA' },
  { name: 'Gambia', code: 'GM' },
  { name: 'Georgia', code: 'GE' },
  { name: 'Germany', code: 'DE' },
  { name: 'Ghana', code: 'GH' },
  { name: 'Greece', code: 'GR' },
  { name: 'Grenada', code: 'GD' },
  { name: 'Guatemala', code: 'GT' },
  { name: 'Guinea', code: 'GN' },
  { name: 'Guinea-Bissau', code: 'GW' },
  { name: 'Guyana', code: 'GY' },
  { name: 'Haiti', code: 'HT' },
  { name: 'Honduras', code: 'HN' },
  { name: 'Hungary', code: 'HU' },
  { name: 'Iceland', code: 'IS' },
  { name: 'India', code: 'IN' },
  { name: 'Indonesia', code: 'ID' },
  { name: 'Iran', code: 'IR' },
  { name: 'Iraq', code: 'IQ' },
  { name: 'Ireland', code: 'IE' },
  { name: 'Israel', code: 'IL' },
  { name: 'Italy', code: 'IT' },
  { name: 'Jamaica', code: 'JM' },
  { name: 'Japan', code: 'JP' },
  { name: 'Jordan', code: 'JO' },
  { name: 'Kazakhstan', code: 'KZ' },
  { name: 'Kenya', code: 'KE' },
  { name: 'Kiribati', code: 'KI' },
  { name: 'Kuwait', code: 'KW' },
  { name: 'Kyrgyzstan', code: 'KG' },
  { name: 'Laos', code: 'LA' },
  { name: 'Latvia', code: 'LV' },
  { name: 'Lebanon', code: 'LB' },
  { name: 'Lesotho', code: 'LS' },
  { name: 'Liberia', code: 'LR' },
  { name: 'Libya', code: 'LY' },
  { name: 'Liechtenstein', code: 'LI' },
  { name: 'Lithuania', code: 'LT' },
  { name: 'Luxembourg', code: 'LU' },
  { name: 'Madagascar', code: 'MG' },
  { name: 'Malawi', code: 'MW' },
  { name: 'Malaysia', code: 'MY' },
  { name: 'Maldives', code: 'MV' },
  { name: 'Mali', code: 'ML' },
  { name: 'Malta', code: 'MT' },
  { name: 'Mauritania', code: 'MR' },
  { name: 'Mauritius', code: 'MU' },
  { name: 'Mexico', code: 'MX' },
  { name: 'Micronesia', code: 'FM' },
  { name: 'Moldova', code: 'MD' },
  { name: 'Monaco', code: 'MC' },
  { name: 'Mongolia', code: 'MN' },
  { name: 'Montenegro', code: 'ME' },
  { name: 'Morocco', code: 'MA' },
  { name: 'Mozambique', code: 'MZ' },
  { name: 'Myanmar', code: 'MM' },
  { name: 'Namibia', code: 'NA' },
  { name: 'Nauru', code: 'NR' },
  { name: 'Nepal', code: 'NP' },
  { name: 'Netherlands', code: 'NL' },
  { name: 'New Zealand', code: 'NZ' },
  { name: 'Nicaragua', code: 'NI' },
  { name: 'Niger', code: 'NE' },
  { name: 'Nigeria', code: 'NG' },
  { name: 'North Korea', code: 'KP' },
  { name: 'North Macedonia', code: 'MK' },
  { name: 'Norway', code: 'NO' },
  { name: 'Oman', code: 'OM' },
  { name: 'Pakistan', code: 'PK' },
  { name: 'Palau', code: 'PW' },
  { name: 'Panama', code: 'PA' },
  { name: 'Papua New Guinea', code: 'PG' },
  { name: 'Paraguay', code: 'PY' },
  { name: 'Peru', code: 'PE' },
  { name: 'Philippines', code: 'PH' },
  { name: 'Poland', code: 'PL' },
  { name: 'Portugal', code: 'PT' },
  { name: 'Qatar', code: 'QA' },
  { name: 'Romania', code: 'RO' },
  { name: 'Russia', code: 'RU' },
  { name: 'Rwanda', code: 'RW' },
  { name: 'Saint Kitts and Nevis', code: 'KN' },
  { name: 'Saint Lucia', code: 'LC' },
  { name: 'Saint Vincent and the Grenadines', code: 'VC' },
  { name: 'Samoa', code: 'WS' },
  { name: 'San Marino', code: 'SM' },
  { name: 'Saudi Arabia', code: 'SA' },
  { name: 'Senegal', code: 'SN' },
  { name: 'Serbia', code: 'RS' },
  { name: 'Seychelles', code: 'SC' },
  { name: 'Sierra Leone', code: 'SL' },
  { name: 'Singapore', code: 'SG' },
  { name: 'Slovakia', code: 'SK' },
  { name: 'Slovenia', code: 'SI' },
  { name: 'Solomon Islands', code: 'SB' },
  { name: 'Somalia', code: 'SO' },
  { name: 'South Africa', code: 'ZA' },
  { name: 'South Korea', code: 'KR' },
  { name: 'South Sudan', code: 'SS' },
  { name: 'Spain', code: 'ES' },
  { name: 'Sri Lanka', code: 'LK' },
  { name: 'Sudan', code: 'SD' },
  { name: 'Suriname', code: 'SR' },
  { name: 'Sweden', code: 'SE' },
  { name: 'Switzerland', code: 'CH' },
  { name: 'Syria', code: 'SY' },
  { name: 'Taiwan', code: 'TW' },
  { name: 'Tajikistan', code: 'TJ' },
  { name: 'Tanzania', code: 'TZ' },
  { name: 'Thailand', code: 'TH' },
  { name: 'Timor-Leste', code: 'TL' },
  { name: 'Togo', code: 'TG' },
  { name: 'Tonga', code: 'TO' },
  { name: 'Trinidad and Tobago', code: 'TT' },
  { name: 'Tunisia', code: 'TN' },
  { name: 'Turkey', code: 'TR' },
  { name: 'Turkmenistan', code: 'TM' },
  { name: 'Tuvalu', code: 'TV' },
  { name: 'Uganda', code: 'UG' },
  { name: 'Ukraine', code: 'UA' },
  { name: 'United Arab Emirates', code: 'AE' },
  { name: 'United Kingdom', code: 'GB' },
  { name: 'United States', code: 'US' },
  { name: 'Uruguay', code: 'UY' },
  { name: 'Uzbekistan', code: 'UZ' },
  { name: 'Vanuatu', code: 'VU' },
  { name: 'Venezuela', code: 'VE' },
  { name: 'Vietnam', code: 'VN' },
  { name: 'Yemen', code: 'YE' },
  { name: 'Zambia', code: 'ZM' },
  { name: 'Zimbabwe', code: 'ZW' },
];

export default function JobTrendingsPage() {
  const [selectedCategory, setSelectedCategory] = useState('Software Development & Engineering');
  const [selectedYear, setSelectedYear] = useState('2025');
  const [selectedCountry, setSelectedCountry] = useState(countries[0]);
  const [showCountryDropdown, setShowCountryDropdown] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [chartTitle, setChartTitle] = useState('Software Engineering Trends');
  const [role, setRole] = useState('');
  const [jobData, setJobData] = useState([]);
  const [activeGroup, setActiveGroup] = useState('All');

  const { fetchJobData, isLoading: dataLoading } = GoogleAIStudio();

  const years = ['2023', '2024', '2025', '2026'];

  useEffect(() => {
    const titlePrefix = selectedCategory.split(' & ')[0];
    setChartTitle(`${titlePrefix} Trends`);
  }, [selectedCategory]);

  useEffect(() => {
    const loadJobData = async () => {
      setIsLoading(true);
      const result = await fetchJobData(selectedYear, selectedCountry, selectedCategory);
      if (result.success) {
        setJobData(result.data);
      }
      setIsLoading(false);
    };

    loadJobData();
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
        <TopHeader HeaderMessage={'Job Trends'} />

        <div className="flex-1 overflow-y-auto p-6 bg-white">
          <div className="m-5">
            <div className="mb-6 ">
              <div className="flex flex-row object-center items-center mb-2">
                <h2 className="text-lg font-medium mr-2">Worldwide Job Trends</h2>
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
                Datatype={'Jobs'}
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
                <p className="text-gray-500 text-sm mb-4">
                  Select the job category to view detailed job market insights
                </p>

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
