import React, { useMemo } from 'react';
import {
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar as RechartsRadar,
  ResponsiveContainer,
  Tooltip,
} from 'recharts';

const COLOR_SCALE = ['#93C5FD', '#60A5FA', '#3B82F6', '#2563EB', '#1D4ED8'];

export default function RadarChartT({ Datatype, DataSet }) {
  // Step 1: Aggregate all skill data if Datatype is 'Skills'
  const RadarData = useMemo(() => {
    if (Datatype === 'Skills') {
      const skillMap = {};

      DataSet.forEach((role) => {
        role.skills.forEach((skill) => {
          if (!skillMap[skill.name]) {
            skillMap[skill.name] = {
              skill: skill.name,
              demandScore: 0,
              frequency: 0,
              growthRate: 0,
              count: 0,
              roles: 0,
            };
          }

          // Update totals (you can adjust logic if you have other data fields)
          skillMap[skill.name].demandScore += skill.count;
          skillMap[skill.name].frequency += 1;
          skillMap[skill.name].count += skill.count;
          skillMap[skill.name].roles += 1;
        });
      });

      // You can define growthRate arbitrarily or calculate if available
      const radarDataArr = Object.values(skillMap).map((skill) => ({
        skill: skill.skill,
        demandScore: skill.demandScore,
      }));

      return radarDataArr;
    }

    return DataSet; // fallback for Jobs or Salary
  }, [DataSet, Datatype]);

  // Tooltip
  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-4 border border-gray-200 shadow-lg rounded">
          <p className="font-bold text-gray-800 mb-2">{label}</p>
          <div className="flex flex-col space-y-2">
            {payload.map((entry, index) => (
              <p key={index} className="text-sm">
                <span className="font-medium">{entry.name}: </span>
                <span
                  className="text-gray-700"
                  style={{ color: entry.color || COLOR_SCALE[index % COLOR_SCALE.length] }}
                >
                  {Datatype === 'Salary' && entry.name.includes('Salary')
                    ? `${entry.value.toLocaleString()}`
                    : entry.value.toLocaleString()}
                </span>
              </p>
            ))}
          </div>
        </div>
      );
    }
    return null;
  };

  const getRadarConfig = () => {
    switch (Datatype) {
      case 'Jobs':
        return [
          {
            name: 'Job Count',
            dataKey: 'count',
            stroke: COLOR_SCALE[2],
            fill: COLOR_SCALE[2],
            fillOpacity: 0.2,
          },
        ];
      case 'Salary':
        return [
          {
            name: 'Avg Salary',
            dataKey: 'avgSalary',
            stroke: COLOR_SCALE[2],
            fill: COLOR_SCALE[2],
            fillOpacity: 0.2,
          },
          {
            name: 'Min Salary',
            dataKey: 'minSalary',
            stroke: COLOR_SCALE[3],
            fill: COLOR_SCALE[3],
            fillOpacity: 0.2,
          },
          {
            name: 'Max Salary',
            dataKey: 'maxSalary',
            stroke: COLOR_SCALE[4],
            fill: COLOR_SCALE[4],
            fillOpacity: 0.2,
          },
        ];
      case 'Skills':
        return [
          {
            name: 'Demand Score',
            dataKey: 'demandScore',
            stroke: COLOR_SCALE[2],
            fill: COLOR_SCALE[2],
            fillOpacity: 0.2,
          },
        ];
      default:
        return [];
    }
  };

  const radarConfig = getRadarConfig();

  if (radarConfig.length === 0 || !RadarData || RadarData.length === 0) {
    return (
      <div className="h-150 flex items-center justify-center text-gray-500">No data available for radar chart</div>
    );
  }

  return (
    <div className="h-150">
      <ResponsiveContainer>
        <RadarChart data={RadarData}>
          <PolarGrid />
          <PolarAngleAxis dataKey={Datatype === 'Skills' ? 'skill' : 'role'} />
          <PolarRadiusAxis />
          {radarConfig.map((config, index) => (
            <RechartsRadar
              key={index}
              name={config.name}
              dataKey={config.dataKey}
              stroke={config.stroke}
              fill={config.fill}
              fillOpacity={config.fillOpacity}
            />
          ))}
          <Tooltip content={<CustomTooltip />} />
        </RadarChart>
      </ResponsiveContainer>
    </div>
  );
}
