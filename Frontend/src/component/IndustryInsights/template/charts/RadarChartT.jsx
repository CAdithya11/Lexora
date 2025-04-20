import React from 'react';
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
  const RadarData = DataSet;
  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-2 border border-gray-200 shadow-md rounded">
          <p className="font-medium">{label}</p>
          {payload.map((entry, index) => (
            <p key={index} style={{ color: entry.color || COLOR_SCALE[index % COLOR_SCALE.length] }}>
              {entry.name}: {entry.value.toLocaleString()}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  console.log();

  return Datatype == 'Jobs' ? (
    <div className={'h-150'}>
      <ResponsiveContainer>
        <RadarChart data={RadarData}>
          <PolarGrid />
          <PolarAngleAxis dataKey="role" />
          <PolarRadiusAxis />

          <RechartsRadar
            name="Job Count"
            dataKey="count"
            stroke={COLOR_SCALE[2]}
            fill={COLOR_SCALE[2]}
            fillOpacity={0.2}
          />
          <Tooltip content={<CustomTooltip />} />
        </RadarChart>
      </ResponsiveContainer>
    </div>
  ) : Datatype == 'Salary' ? (
    <div className={'h-150'}>
      <ResponsiveContainer>
        <RadarChart data={RadarData}>
          <PolarGrid />
          <PolarAngleAxis dataKey="role" />
          <PolarRadiusAxis />
          <RechartsRadar
            name="Avg Salary"
            dataKey="avgSalary"
            stroke={COLOR_SCALE[2]}
            fill={COLOR_SCALE[2]}
            fillOpacity={0.2}
          />
          <RechartsRadar
            name="Min Salary"
            dataKey="minSalary"
            stroke={COLOR_SCALE[3]}
            fill={COLOR_SCALE[3]}
            fillOpacity={0.2}
          />
          <RechartsRadar
            name="Max Salary"
            dataKey="maxSalary"
            stroke={COLOR_SCALE[4]}
            fill={COLOR_SCALE[4]}
            fillOpacity={0.2}
          />
          <Tooltip content={<CustomTooltip />} />
        </RadarChart>
      </ResponsiveContainer>
    </div>
  ) : null;
}
