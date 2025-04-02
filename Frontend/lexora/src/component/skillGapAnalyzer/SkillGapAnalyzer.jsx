import React, { useState, useEffect, useRef } from 'react';
import {
  Search,
  X,
  ChevronDown,
  BookOpen,
  Award,
  Zap,
  Target,
  CheckCircle,
  TrendingUp,
  Book,
  Code,
  Star,
  GitBranch,
  Layers,
  Rocket,
} from 'lucide-react';

const COLOR_PALETTE = {
  primary: ['#3B82F6', '#2563EB', '#1D4ED8'],
  secondary: ['#10B981', '#059669', '#047857'],
  accent: ['#6366F1', '#4F46E5', '#4338CA'],
};

const SkillGapAnalyzer = () => {
  const [activeSection, setActiveSection] = useState('welcome');
  const [selectedRole, setSelectedRole] = useState(null);
  const [selectedTechnologies, setSelectedTechnologies] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [quizProgress, setQuizProgress] = useState({
    currentQuestion: 0,
    score: 0,
    completed: false,
  });
  const [userProfile, setUserProfile] = useState({
    name: '',
    email: '',
    experience: 'beginner',
  });

  const jobRoles = [
    {
      name: 'Frontend Developer',
      icon: <Code className="h-8 w-8 text-blue-500" />,
      description: 'Create beautiful, responsive web interfaces',
      technologies: ['HTML5', 'CSS', 'JavaScript', 'React', 'Vue.js', 'Tailwind'],
      skillLevels: {
        beginner: ['HTML', 'CSS Basics'],
        intermediate: ['JavaScript', 'React Fundamentals'],
        advanced: ['Advanced React', 'Performance Optimization'],
      },
    },
    {
      name: 'Backend Developer',
      icon: <Layers className="h-8 w-8 text-green-500" />,
      description: 'Build robust server-side applications',
      technologies: ['Node.js', 'Python', 'Java', 'Spring Boot', 'Django', 'REST APIs'],
      skillLevels: {
        beginner: ['Basic Programming', 'Database Concepts'],
        intermediate: ['Server-side Logic', 'API Development'],
        advanced: ['Microservices', 'System Design'],
      },
    },
    {
      name: 'Data Scientist',
      icon: <GitBranch className="h-8 w-8 text-purple-500" />,
      description: 'Analyze complex data and build intelligent models',
      technologies: ['Python', 'Machine Learning', 'SQL', 'Pandas', 'TensorFlow', 'Data Visualization'],
      skillLevels: {
        beginner: ['Statistics', 'Python Basics'],
        intermediate: ['Machine Learning', 'Data Analysis'],
        advanced: ['Deep Learning', 'AI Model Development'],
      },
    },
    {
      name: 'DevOps Engineer',
      icon: <Rocket className="h-8 w-8 text-indigo-500" />,
      description: 'Streamline development and operations',
      technologies: ['Docker', 'Kubernetes', 'AWS', 'CI/CD', 'Linux', 'Terraform'],
      skillLevels: {
        beginner: ['Cloud Basics', 'Linux Fundamentals'],
        intermediate: ['Containerization', 'Cloud Services'],
        advanced: ['Complex Orchestration', 'Enterprise Scaling'],
      },
    },
  ];

  const quizQuestions = {
    'Frontend Developer': [
      {
        question: "What does React's useState hook do?",
        options: ['Manage component state', 'Fetch data from an API', 'Create a new component', 'Handle routing'],
        correctAnswer: 0,
        explanation: 'useState allows functional components to have state management capabilities.',
      },
      {
        question: 'What is a CSS Flexbox key property?',
        options: ['position', 'display', 'margin', 'flex-direction'],
        correctAnswer: 3,
        explanation: 'flex-direction controls the main axis of flex container layout.',
      },
    ],
  };

  const renderWelcomeSection = () => (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-white">
      <div className="max-w-4xl mx-auto text-center p-8 bg-white rounded-2xl shadow-2xl">
        <h1 className="text-4xl font-extrabold text-gray-800 mb-6">
          Skill Gap <span className="text-blue-600">Analyzer</span>
        </h1>
        <p className="text-xl text-gray-600 mb-8">
          Discover your potential, bridge your skills, and accelerate your tech career journey
        </p>

        <div className="flex justify-center space-x-4">
          <button
            onClick={() => setActiveSection('roleSelection')}
            className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all shadow-lg"
          >
            <Star className="w-5 h-5" />
            Start Your Journey
          </button>
          <button className="flex items-center gap-2 px-6 py-3 border border-blue-500 text-blue-600 rounded-lg hover:bg-blue-50 transition-all">
            <TrendingUp className="w-5 h-5" />
            Learn More
          </button>
        </div>

        <div className="mt-12 grid grid-cols-3 gap-6">
          {[
            { icon: <BookOpen className="w-12 h-12 text-blue-500" />, title: 'Personalized Assessment' },
            { icon: <Award className="w-12 h-12 text-green-500" />, title: 'Skill Tracking' },
            { icon: <Zap className="w-12 h-12 text-purple-500" />, title: 'Career Guidance' },
          ].map((feature, index) => (
            <div key={index} className="bg-gray-50 p-6 rounded-xl hover:shadow-md transition-all">
              {feature.icon}
              <h3 className="mt-4 font-semibold text-gray-800">{feature.title}</h3>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderRoleSelection = () => (
    <div className="container mx-auto px-4 py-12">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold text-gray-800 mb-4">Choose Your Career Path</h2>
        <p className="text-gray-600">Select a role to begin your skill assessment journey</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {jobRoles.map((role, index) => (
          <div
            key={role.name}
            className="bg-white border border-gray-200 rounded-2xl p-6 shadow-lg hover:shadow-xl transform hover:-translate-y-2 transition-all duration-300 cursor-pointer"
            onClick={() => {
              setSelectedRole(role);
              setActiveSection('results');
            }}
          >
            <div
              className={`mb-4 w-16 h-16 rounded-full flex items-center justify-center`}
              style={{ backgroundColor: COLOR_PALETTE.primary[index % COLOR_PALETTE.primary.length] + '20' }}
            >
              {role.icon}
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">{role.name}</h3>
            <p className="text-sm text-gray-600 mb-4">{role.description}</p>
            <div className="flex flex-wrap gap-2">
              {role.technologies.slice(0, 3).map((tech) => (
                <span key={tech} className="px-2 py-1 bg-blue-50 text-blue-600 text-xs rounded-full">
                  {tech}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderQuizSection = () => {
    if (!selectedRole) return null;

    const currentQuiz = quizQuestions[selectedRole.name];
    const currentQuestion = currentQuiz[quizProgress.currentQuestion];

    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-white">
        <div className="w-full max-w-2xl bg-white rounded-2xl shadow-2xl p-8">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-800">{selectedRole.name} Quiz</h2>
            <div className="text-sm text-gray-600">
              Question {quizProgress.currentQuestion + 1} of {currentQuiz.length}
            </div>
          </div>

          <div className="mb-6">
            <p className="text-lg text-gray-700 font-medium">{currentQuestion.question}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {currentQuestion.options.map((option, index) => (
              <button
                key={index}
                onClick={() => {
                  const isCorrect = index === currentQuestion.correctAnswer;
                  setQuizProgress((prev) => ({
                    ...prev,
                    score: isCorrect ? prev.score + 1 : prev.score,
                    currentQuestion: prev.currentQuestion + 1,
                    completed: prev.currentQuestion + 1 === currentQuiz.length,
                  }));
                }}
                className={`
                  py-4 px-4 text-left rounded-lg transition-all duration-300
                  ${
                    index === currentQuestion.correctAnswer
                      ? 'bg-green-50 text-green-800 hover:bg-green-100'
                      : 'bg-blue-50 text-blue-800 hover:bg-blue-100'
                  }
                `}
              >
                {option}
              </button>
            ))}
          </div>

          {quizProgress.completed && (
            <div className="mt-6 text-center">
              <h3 className="text-2xl font-bold text-gray-800">Quiz Completed!</h3>
              <p className="text-lg text-gray-600 mt-2">
                Your Score: {quizProgress.score} / {currentQuiz.length}
              </p>
              <button
                onClick={() => setActiveSection('results')}
                className="mt-4 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                View Results
              </button>
            </div>
          )}
        </div>
      </div>
    );
  };

  const renderResults = () => (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-white">
      <div className="w-full max-w-3xl bg-white rounded-2xl shadow-2xl p-8">
        <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">Your Skill Assessment Results</h2>

        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <h3 className="text-xl font-semibold mb-4">Performance Overview</h3>
            <div className="bg-blue-50 p-4 rounded-lg">
              <div className="flex justify-between mb-2">
                <span>Quiz Score</span>
                <span className="font-bold">
                  {quizProgress.score} / {quizQuestions[selectedRole.name].length}
                </span>
              </div>
              <div className="w-full bg-blue-200 rounded-full h-2.5">
                <div
                  className="bg-blue-600 h-2.5 rounded-full"
                  style={{ width: `${(quizProgress.score / quizQuestions[selectedRole.name].length) * 100}%` }}
                ></div>
              </div>
            </div>

            <div className="mt-6">
              <h3 className="text-xl font-semibold mb-4">Recommended Learning Paths</h3>
              {selectedRole.skillLevels[userProfile.experience].map((skill, index) => (
                <div key={index} className="flex items-center mb-3">
                  <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                  <span className="text-gray-700">{skill}</span>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-xl font-semibold mb-4">Next Steps</h3>
            <div className="space-y-4">
              {[
                { title: 'Online Courses', description: 'Curated learning resources' },
                { title: 'Practice Projects', description: 'Hands-on skill development' },
                { title: 'Community Support', description: 'Connect with experts' },
              ].map((step, index) => (
                <div key={index} className="bg-gray-50 p-4 rounded-lg hover:bg-blue-50 transition-colors">
                  <h4 className="font-semibold text-gray-800 mb-2">{step.title}</h4>
                  <p className="text-gray-600 text-sm">{step.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-8 text-center">
          <button
            onClick={() => setActiveSection('roleSelection')}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 mr-4"
          >
            Retake Assessment
          </button>
          <button className="px-6 py-3 border border-blue-500 text-blue-600 rounded-lg hover:bg-blue-50">
            Download Report
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div>
      {activeSection === 'welcome' && renderWelcomeSection()}
      {activeSection === 'roleSelection' && renderRoleSelection()}
      {activeSection === 'quiz' && renderQuizSection()}
      {activeSection === 'results' && renderResults()}
    </div>
  );
};

export default SkillGapAnalyzer;
