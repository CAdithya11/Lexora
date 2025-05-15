import React from 'react';

export default function BarChart({ Datatype, DataSet }) {
  const COLOR_SCALE = ['#93C5FD', '#60A5FA', '#3B82F6', '#2563EB', '#1D4ED8'];

  const getColorShade = (value, max) => {
    const index = Math.floor((value / max) * (COLOR_SCALE.length - 1));
    return COLOR_SCALE[Math.min(index, COLOR_SCALE.length - 1)];
  };

  const processSkillsData = () => {
    const skills = DataSet.skills || [];
    const maxCount = Math.max(...skills.map((s) => s.count || 0));

    return skills.map((s) => ({
      name: s.name,
      count: s.count,
      overallCount: s.overallCount,
      color: getColorShade(s.count, maxCount),
      percentage: ((s.count / s.overallCount) * 100).toFixed(1),
    }));
  };

  const renderContent = () => {
    if (Datatype === 'Salary') {
      return <p className="p-4">Salary trends are not displayed in bar chart.</p>;
    }

    if (Datatype === 'Skills') {
      const skills = processSkillsData();
      const maxCount = Math.max(...skills.map((s) => s.count));

      return (
        <div className="space-y-4">
          {skills.map((skill) => (
            <div key={skill.name} className="flex flex-col">
              <div className="flex justify-between text-sm">
                <span className="font-medium">{skill.name}</span>
                <span className="text-gray-500">{skill.count.toLocaleString()} jobs</span>
              </div>
              <div className="w-full h-6 bg-gray-100 rounded overflow-hidden mt-1">
                <div
                  className="h-full transition-all duration-300"
                  style={{
                    width: `${(skill.count / maxCount) * 100}%`,
                    backgroundColor: skill.color,
                  }}
                >
                  <span className="text-white text-xs font-semibold pl-2 leading-6">{skill.percentage}% of market</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      );
    }

    return <p className="p-4">Data type not supported</p>;
  };

  return <div className="w-full">{renderContent()}</div>;
}
