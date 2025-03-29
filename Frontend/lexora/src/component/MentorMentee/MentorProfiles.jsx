import React, { useState } from 'react';
import { Star, StarHalf, Filter, ChevronLeft, ChevronRight } from 'lucide-react';

// MentorProfile component
const MentorProfile = ({ mentor }) => {
  return (
    <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200 hover:shadow-md transition-all duration-300 flex flex-col h-full">
      <div className="flex items-start gap-4 mb-4">
        <div className="flex-shrink-0">
          <img 
            src={mentor.image || `/api/placeholder/80/80`} 
            alt={mentor.name} 
            className="w-20 h-20 rounded-full object-cover border-2 border-blue-100"
          />
        </div>
        <div className="flex-1">
          <h3 className="font-semibold text-lg text-gray-900">{mentor.name}</h3>
          <p className="text-sm text-blue-600 font-medium">{mentor.degree}</p>
          <div className="flex items-center mt-1">
            {[...Array(5)].map((_, i) => {
              if (i < Math.floor(mentor.rating)) {
                return <Star key={i} size={16} className="text-yellow-400 fill-yellow-400" />;
              } else if (i === Math.floor(mentor.rating) && mentor.rating % 1 !== 0) {
                return <StarHalf key={i} size={16} className="text-yellow-400 fill-yellow-400" />;
              } else {
                return <Star key={i} size={16} className="text-gray-300" />;
              }
            })}
            <span className="text-sm text-gray-500 ml-2">({mentor.reviews})</span>
          </div>
        </div>
      </div>
      <p className="text-gray-600 text-sm mb-3 flex-grow">{mentor.description}</p>
      <div className="flex flex-wrap gap-2 mt-2">
        {mentor.expertise.map((skill, index) => (
          <span 
            key={index} 
            className="px-2 py-1 bg-blue-50 text-blue-700 text-xs rounded-full"
          >
            {skill}
          </span>
        ))}
      </div>
      <button className="mt-4 w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-200">
        Connect
      </button>
    </div>
  );
};

// Main MentorProfiles component
const MentorProfiles = () => {
  const [currentFilter, setCurrentFilter] = useState('All');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 9;

  // Dummy data for mentor profiles
  const mentors = [
    {
      id: 1,
      name: "Dr. Sarah Johnson",
      degree: "Ph.D. in Computer Science",
      rating: 4.9,
      reviews: 127,
      image: "/api/placeholder/80/80",
      description: "Specialized in AI and Machine Learning with 12+ years of industry experience. Former lead researcher at Google Brain.",
      expertise: ["Machine Learning", "Python", "TensorFlow", "Neural Networks"]
    },
    {
      id: 2,
      name: "Michael Chen",
      degree: "MSc in Software Engineering",
      rating: 4.7,
      reviews: 89,
      image: "/api/placeholder/80/80",
      description: "Full-stack developer with expertise in scalable web applications. Previously worked at Amazon and Meta.",
      expertise: ["React", "Node.js", "AWS", "System Design"]
    },
    {
      id: 3,
      name: "Priya Patel",
      degree: "BSc in Computer Science",
      rating: 4.8,
      reviews: 106,
      image: "/api/placeholder/80/80",
      description: "Mobile app development specialist with focus on iOS and Android platforms. 8+ years experience in app architecture.",
      expertise: ["iOS", "Android", "Swift", "Kotlin"]
    },
    {
      id: 4,
      name: "James Wilson",
      degree: "MSc in Data Science",
      rating: 4.6,
      reviews: 78,
      image: "/api/placeholder/80/80",
      description: "Data scientist specializing in predictive analytics and business intelligence solutions. Former lead at Spotify.",
      expertise: ["Data Analysis", "SQL", "Python", "Tableau"]
    },
    {
      id: 5,
      name: "Aisha Rahman",
      degree: "BSc in Information Technology",
      rating: 4.9,
      reviews: 132,
      image: "/api/placeholder/80/80",
      description: "DevOps engineer with expertise in continuous integration and deployment pipelines. Certified AWS Solutions Architect.",
      expertise: ["Docker", "Kubernetes", "CI/CD", "AWS"]
    },
    {
      id: 6,
      name: "Carlos Rodriguez",
      degree: "MSc in Cybersecurity",
      rating: 4.5,
      reviews: 67,
      image: "/api/placeholder/80/80",
      description: "Security expert with focus on application security and ethical hacking. Previously worked at Microsoft's security team.",
      expertise: ["Penetration Testing", "Network Security", "Cryptography"]
    },
    {
      id: 7,
      name: "Emma Thompson",
      degree: "BSc in Web Development",
      rating: 4.7,
      reviews: 95,
      image: "/api/placeholder/80/80",
      description: "Frontend specialist with strong UI/UX skills. Created design systems used by millions of users worldwide.",
      expertise: ["HTML/CSS", "JavaScript", "React", "UI/UX"]
    },
    {
      id: 8,
      name: "David Kim",
      degree: "MSc in Artificial Intelligence",
      rating: 4.8,
      reviews: 112,
      image: "/api/placeholder/80/80",
      description: "NLP and computer vision expert. Led AI projects at IBM Research and published multiple papers in top conferences.",
      expertise: ["Computer Vision", "NLP", "Python", "Deep Learning"]
    },
    {
      id: 9,
      name: "Olivia Martinez",
      degree: "BSc in Software Development",
      rating: 4.6,
      reviews: 84,
      image: "/api/placeholder/80/80",
      description: "Agile coach and backend developer specializing in microservice architectures and distributed systems.",
      expertise: ["Java", "Spring Boot", "Microservices", "Agile"]
    },
    {
      id: 10,
      name: "Robert Tan",
      degree: "MSc in Cloud Computing",
      rating: 4.9,
      reviews: 129,
      image: "/api/placeholder/80/80",
      description: "Cloud architecture expert with extensive experience in multi-cloud environments and serverless computing.",
      expertise: ["AWS", "Azure", "GCP", "Serverless"]
    },
    {
      id: 11,
      name: "Sophia Williams",
      degree: "BSc in Game Development",
      rating: 4.7,
      reviews: 91,
      image: "/api/placeholder/80/80",
      description: "Game developer with expertise in Unity and Unreal Engine. Worked on several successful indie games and VR applications.",
      expertise: ["Unity", "C#", "Game Design", "VR/AR"]
    },
    {
      id: 12,
      name: "Ahmed Hassan",
      degree: "MSc in Database Systems",
      rating: 4.8,
      reviews: 103,
      image: "/api/placeholder/80/80",
      description: "Database architect specializing in high-performance data solutions. Expert in SQL and NoSQL technologies.",
      expertise: ["SQL", "MongoDB", "Database Design", "Performance Tuning"]
    },
    {
      id: 13,
      name: "Lisa Nguyen",
      degree: "PhD in Human-Computer Interaction",
      rating: 4.9,
      reviews: 118,
      image: "/api/placeholder/80/80",
      description: "UX researcher and designer focusing on accessible technology. Previously led design teams at Apple and Google.",
      expertise: ["UX Research", "Accessibility", "Design Thinking", "Prototyping"]
    },
    {
      id: 14,
      name: "Thomas Green",
      degree: "MSc in Network Engineering",
      rating: 4.6,
      reviews: 76,
      image: "/api/placeholder/80/80",
      description: "Network specialist with expertise in secure infrastructure. CCIE certified with experience in large enterprise networks.",
      expertise: ["Networking", "Cisco", "Security", "SDN"]
    },
    {
      id: 15,
      name: "Fatima Al-Farsi",
      degree: "BSc in Software Engineering",
      rating: 4.7,
      reviews: 88,
      image: "/api/placeholder/80/80",
      description: "Quality assurance expert specializing in test automation frameworks and CI/CD integration for testing pipelines.",
      expertise: ["Test Automation", "Selenium", "QA Processes", "CI/CD"]
    }
  ];

  // Filter options
  const filters = [
    'All',
    'Machine Learning',
    'Web Development',
    'Mobile Development',
    'DevOps',
    'Security',
    'UI/UX'
  ];

  // Filter mentors based on selected category
  const filteredMentors = currentFilter === 'All' 
    ? mentors 
    : mentors.filter(mentor => 
        mentor.expertise.some(skill => 
          skill.toLowerCase().includes(currentFilter.toLowerCase())));

  // Pagination logic
  const totalPages = Math.ceil(filteredMentors.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentMentors = filteredMentors.slice(startIndex, startIndex + itemsPerPage);

  const nextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Expert Mentors</h2>
        <div className="flex items-center gap-4">
          <div className="relative">
            <div className="flex items-center gap-2 bg-gray-100 px-4 py-2 rounded-lg">
              <Filter size={16} className="text-gray-500" />
              <select 
                className="bg-transparent text-sm focus:outline-none"
                value={currentFilter}
                onChange={(e) => {
                  setCurrentFilter(e.target.value);
                  setCurrentPage(1);
                }}
              >
                {filters.map(filter => (
                  <option key={filter} value={filter}>{filter}</option>
                ))}
              </select>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button 
              onClick={prevPage}
              disabled={currentPage === 1}
              className={`p-2 rounded-full ${currentPage === 1 ? 'text-gray-300' : 'text-gray-600 hover:bg-gray-100'}`}
            >
              <ChevronLeft size={20} />
            </button>
            <span className="text-sm text-gray-600">
              Page {currentPage} of {totalPages}
            </span>
            <button 
              onClick={nextPage}
              disabled={currentPage === totalPages}
              className={`p-2 rounded-full ${currentPage === totalPages ? 'text-gray-300' : 'text-gray-600 hover:bg-gray-100'}`}
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {currentMentors.map(mentor => (
          <MentorProfile key={mentor.id} mentor={mentor} />
        ))}
      </div>

      {currentMentors.length === 0 && (
        <div className="flex flex-col items-center justify-center py-12">
          <div className="text-gray-400 mb-4">
            <Filter size={48} />
          </div>
          <h3 className="text-xl font-medium text-gray-700">No mentors found</h3>
          <p className="text-gray-500">Try changing your filter criteria</p>
        </div>
      )}

      <div className="mt-8 flex justify-center">
        <div className="flex items-center gap-2">
          {[...Array(totalPages)].map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentPage(i + 1)}
              className={`w-8 h-8 rounded-full flex items-center justify-center text-sm ${
                currentPage === i + 1 
                  ? 'bg-blue-600 text-white' 
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {i + 1}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MentorProfiles;