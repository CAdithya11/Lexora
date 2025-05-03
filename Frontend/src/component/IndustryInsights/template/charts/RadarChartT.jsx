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
                    ? `$${entry.value.toLocaleString()}`
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

  // Determine which dataKey to use based on Datatype
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
          {
            name: 'Frequency',
            dataKey: 'frequency',
            stroke: COLOR_SCALE[3],
            fill: COLOR_SCALE[3],
            fillOpacity: 0.2,
          },
          {
            name: 'Growth Rate',
            dataKey: 'growthRate',
            stroke: COLOR_SCALE[4],
            fill: COLOR_SCALE[4],
            fillOpacity: 0.2,
          },
        ];
      default:
        return [];
    }
  };

  const radarConfig = getRadarConfig();

  // If we don't have a valid datatype or no data, return null
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
