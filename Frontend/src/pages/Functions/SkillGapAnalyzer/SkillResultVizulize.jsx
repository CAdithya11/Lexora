import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
  Tooltip
} from 'recharts';
import { useParams } from 'react-router-dom';

import SidebarSub from '../../../component/template/SidebarSub';
import TopHeader from '../../../component/template/SkillGapTop';

const SkillAssessmentRadarChart = () => {
    const { jobRole } = useParams();
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [jobRoleName, setJobRoleName] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSkillScores = async () => {
      setLoading(true);
      try {
        const response = await axios.get('http://localhost:8080/api/v1/skillScores');
        console.log('API Response:', response.data); // Debug log
        const scoress = response.data;
        const scores = scoress.filter(score => score.jobRoleName === jobRole);
        if (scores && scores.length > 0 ) {
          // Optional: Sort scores by score or filter based on user, skill, etc.
          setJobRoleName(scores[0].jobRoleName); // Display one job role name
          
          // Aggregating duplicate skills
          const aggregatedData = scores.reduce((acc, curr) => {
            const existingSkill = acc.find(item => item.subject === curr.skillName);
            if (existingSkill) {
              // If skill already exists, update its score and total questions
              existingSkill.score += (curr.predictedScore / curr.totalQuestions) * 100;
              existingSkill.totalQuestions = curr.totalQuestions;
              existingSkill.predictedScore = curr.predictedScore;
            } else {
              // Add new skill
              acc.push({
                subject: curr.skillName,
                score: (curr.predictedScore / curr.totalQuestions) * 100,
                predictedScore: curr.predictedScore,
                totalQuestions: curr.totalQuestions
              });
            }
            return acc;
          }, []);

          // Calculate average score for each skill
          const finalData = aggregatedData.map(item => ({
            ...item,
            score: ((item.predictedScore / item.totalQuestions )* 100) // Adjusting the score based on total questions
          }));

          console.log('Processed Chart Data:', finalData); // Debug log
          setData(finalData);
        } else {
          setError('No skill score data found');
        }
      } catch (error) {
        console.error('Error fetching skill scores:', error);
        setError('Failed to load skill scores. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchSkillScores();
  }, []);

  const handleGoBack = () => {
    navigate(-1);
  };

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-white p-2 border border-gray-200 shadow-md">
          <p className="font-bold">{data.subject}</p>
          <p>Score: {data.predictedScore}/{data.totalQuestions}</p>
          <p>Percentage: {data.score}%</p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="flex h-screen overflow-hidden bg-gray-50">
      <SidebarSub />
      <div className="flex-1 flex flex-col overflow-hidden">
        <TopHeader />
        <div className="flex-1 overflow-y-auto p-6 bg-white relative">
          <button
            onClick={handleGoBack}
            className="absolute top-4 right-4 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors text-sm"
          >
            Go Back
          </button>

          <h2 className="text-xl font-semibold text-gray-700 mb-6">
            Job Role: {jobRoleName}
          </h2>
          
          <ul className="list-disc ml-5 text-gray-600 mb-4">
            {data.map((item, index) => (
              <li key={index}>
                {item.subject}: {item.score}% {item.predictedScore}..{item.totalQuestions}
              </li>
                
            ))}
          </ul>

          {loading && (
            <div className="flex justify-center items-center h-64">
              <p className="text-gray-500">Loading skill data...</p>
            </div>
          )}

          {error && (
            <div className="flex justify-center items-center h-64">
              <p className="text-red-500">{error}</p>
            </div>
          )}

          {!loading && !error && data.length === 0 && (
            <div className="flex justify-center items-center h-64">
              <p className="text-yellow-500">No skill data available to display.</p>
            </div>
          )}

          {!loading && !error && data.length > 0 && (
            <div>
              <div className="w-full h-96 mt-12">
                <ResponsiveContainer width="100%" height="100%">
                  <RadarChart cx="50%" cy="50%" outerRadius="70%" data={data}>
                    <PolarGrid />
                    <PolarAngleAxis dataKey="subject" tick={{ fill: 'gray', fontSize: 10 }} />
                    <PolarRadiusAxis
                      angle={30}
                      domain={[0, 100]}
                      axisLine={false}
                      tick={{ fill: 'gray', fontSize: 10 }}
                    />
                    <Radar
                      name="Skill Score"
                      dataKey="score"
                      stroke="#3b82f6"
                      fill="#3b82f6"
                      fillOpacity={0.6}
                    />
                    <Tooltip content={<CustomTooltip />} />
                  </RadarChart>
                </ResponsiveContainer>
              </div>

              {/* Table for Raw Data */}
              <div className="mt-8">
                <table className="min-w-full border w-full text-sm">
                  <thead>
                    <tr className="bg-gray-100">
                      <th className="border px-4 py-2">Skill</th>
                      <th className="border px-4 py-2">Predicted Score</th>
                      <th className="border px-4 py-2">Total Questions</th>
                      <th className="border px-4 py-2">Percentage</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data.map((d, i) => (
                      <tr key={i}>
                        <td className="border px-4 py-2">{d.subject}</td>
                        <td className="border px-4 py-2">{d.predictedScore}</td>
                        <td className="border px-4 py-2">{d.totalQuestions}</td>
                        <td className="border px-4 py-2">{d.score}%</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SkillAssessmentRadarChart;
