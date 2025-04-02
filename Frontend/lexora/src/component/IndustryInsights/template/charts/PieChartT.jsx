import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';

export default function PieChartT({ Datatype,DataSet }) {
 

  // Create a color scale from light to dark blue
  const COLOR_SCALE = ['#93C5FD', '#60A5FA', '#3B82F6', '#2563EB', '#1D4ED8'];
  const getColorShade = (value, max) => {
    const index = Math.floor((value / max) * (COLOR_SCALE.length - 1));
    return COLOR_SCALE[Math.min(index, COLOR_SCALE.length - 1)];
  };

  // Get max count for color scaling
  const maxCount = Math.max(...DataSet.map((job) => job.count));

  // Add total jobs count to calculate percentages
  const totalJobs = DataSet.reduce((sum, job) => sum + job.count, 0);

  const top10Jobs = [...DataSet]
    .sort((a, b) => b.count - a.count)
    .slice(0, 25)
    .map((job) => ({
      ...job,
      percentage: ((job.count / totalJobs) * 100).toFixed(1),

      color: getColorShade(job.count, maxCount),
    }));

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;

      return Datatype == 'Salary' ? (
        <>
          <div className="bg-white p-4 border border-gray-200 shadow-lg rounded">
            <p className="font-bold text-gray-800 mb-2">{`${data.role}`}</p>
            <div className="flex flex-col space-y-2">
              <p className="text-sm">
                <span className="font-medium">Min Salary: </span>
                <span className="text-gray-700">${data.minSalary.toLocaleString()}</span>
              </p>
              <p className="text-sm">
                <span className="font-medium">Avg Salary: </span>
                <span className="text-gray-700">${data.avgSalary.toLocaleString()}</span>
              </p>
              <p className="text-sm">
                <span className="font-medium">Max Salary: </span>
                <span className="text-gray-700">${data.maxSalary.toLocaleString()}</span>
              </p>
              <p className="text-sm">
                <span className="font-medium">Count: </span>
                <span className="text-gray-700">{data.count.toLocaleString()} jobs</span>
              </p>
            </div>
          </div>
        </>
      ) : Datatype == 'Jobs' ? (
        <div className="bg-white p-4 border border-gray-200 shadow-lg rounded">
          <p className="font-bold text-gray-800 mb-2">{`${data.role}`}</p>
          <div className="flex flex-col space-y-2">
            <p className="text-sm">
              <span className="font-medium">Count: </span>
              <span className="text-gray-700">{data.count.toLocaleString()} jobs</span>
            </p>
            <p className="text-sm">
              <span className="font-medium">Market Share: </span>
              <span className="text-gray-700">{data.percentage}%</span>
            </p>
            <p className="text-sm">
              <span className="font-medium">Growth Rate: </span>
              <span className="text-gray-700">{data.growthRate}%</span>
            </p>
            <p className="text-sm">
              <span className="font-medium">Avg Salary: </span>
              <span className="text-gray-700">${data.avgSalary.toLocaleString()}</span>
            </p>
          </div>
        </div>
      ) : (
        {}
      );
    }
    return null;
  };

  return (
    <div>
      <div className="h-126">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart margin={{ top: 30, right: 30, bottom: 30, left: 30 }}>
            <Pie
              data={top10Jobs}
              dataKey={
                Datatype == 'Jobs'
                  ? 'count'
                  : Datatype == 'Salary'
                  ? 'maxSalary'
                  : Datatype == 'Skills'
                  ? 'maxCount'
                  : ''
              }
              nameKey="role"
              cx="50%"
              cy="50%"
              outerRadius={200}
              innerRadius={90}
              paddingAngle={2}
              labelLine={true}
              label={({ name }) => `${name}`}
            >
              {top10Jobs.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} stroke="#ffffff" strokeWidth={2} />
              ))}
            </Pie>
            <Legend layout="vertical" align="right" verticalAlign="middle" wrapperStyle={{ paddingLeft: '20px' }} />
            <Tooltip content={<CustomTooltip />} />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
