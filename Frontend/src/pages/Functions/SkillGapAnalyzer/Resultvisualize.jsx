import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer, Tooltip } from 'recharts';
import SidebarSub from '../../../component/template/SidebarSub';
import TopHeader from '../../../component/template/SkillGapTop';

const SkillAssessmentRadarChart = () => {
  const navigate = useNavigate();

  const data = [
    { subject: 'CSS Basics', score: 70 },
    { subject: 'OOP', score: 50 },
    { subject: 'Flex Box', score: 60 },
    { subject: 'First Come First Serve', score: 40 },
    { subject: 'HTML Basics', score: 80 },
    { subject: 'HTML Forms', score: 55 }
  ];

  const handleGoBack = () => {
    navigate(-1); // This will go back to the previous page
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
        <div className="flex-1 overflow-y-auto p-6 bg-white relative">
          {/* Go Back Button */}
          <button 
            onClick={handleGoBack}
            className="absolute top-4 right-4 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors text-sm"
          >
            Go Back
          </button>

          {/* Chart Content */}
          <div className="w-full h-96 mt-12">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart 
                cx="50%" 
                cy="50%" 
                outerRadius="70%" 
                data={data}
              >
                <PolarGrid />
                <PolarAngleAxis 
                  dataKey="subject" 
                  tick={{ fill: 'gray', fontSize: 10 }}
                />
                <PolarRadiusAxis 
                  angle={30} 
                  domain={[0, 100]} 
                  axisLine={false}
                  tick={{ fill: 'gray', fontSize: 10 }}
                />
                <Radar 
                  name="Knowledge" 
                  dataKey="score" 
                  stroke="#3b82f6" 
                  fill="#3b82f6" 
                  fillOpacity={0.6} 
                />
                <Tooltip />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SkillAssessmentRadarChart;