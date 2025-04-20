import React from 'react';
import { AreaChart, Area, CartesianGrid, Legend, Line, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';

export default function DollarChart({ DataSet, DataType }) {
  console.log('HUHUHUH', DataType);
  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-4 border border-gray-200 shadow-lg rounded">
          <p className="font-bold text-gray-800 mb-2">{`Year: ${label}`}</p>
          {payload.map((entry, index) => (
            <div key={`item-${index}`} className="flex items-center mb-1">
              <div className="w-3 h-3 mr-2 rounded-full" style={{ backgroundColor: entry.color }} />
              <p className="text-sm">
                <span className="font-medium">{entry.name}: </span>
                <span className="text-gray-700">${entry.value.toLocaleString()}</span>
              </p>
            </div>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="p-4  rounded ">
      <div className="h-80">
        {DataType != 'Jobs' && (
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={DataSet} margin={{ top: 10, right: 10, left: 0, bottom: 10 }}>
              <defs>
                <linearGradient id="seniorColor" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#1E40AF" stopOpacity={0.6} />
                  <stop offset="95%" stopColor="#1E40AF" stopOpacity={0.1} />
                </linearGradient>
                <linearGradient id="avgColor" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.6} />
                  <stop offset="95%" stopColor="#3B82F6" stopOpacity={0.1} />
                </linearGradient>
                <linearGradient id="entryColor" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#60A5FA" stopOpacity={0.7} />
                  <stop offset="95%" stopColor="#60A5FA" stopOpacity={0.2} />
                </linearGradient>
              </defs>

              <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" vertical={false} />
              <XAxis dataKey="year" />
              <YAxis tickFormatter={(value) => `$${value / 1000}k`} />
              <Tooltip content={<CustomTooltip />} />
              <Legend />

              <Area type="monotone" dataKey="maxSalary" name="Senior Level" stroke="#1E40AF" fill="url(#seniorColor)" />
              <Area type="monotone" dataKey="minSalary" name="Mid Level" stroke="#3B82F6" fill="url(#avgColor)" />
              <Area type="monotone" dataKey="avgSalary" name="Entry Level" stroke="#60A5FA" fill="url(#entryColor)" />
              <Line type="monotone" dataKey="Maximum" name="Maximum" stroke="#0F172A" strokeWidth={2} />
              <Line
                type="monotone"
                dataKey="Median"
                name="Median"
                stroke="#0369A1"
                strokeWidth={2}
                strokeDasharray="5 5"
              />
            </AreaChart>
          </ResponsiveContainer>
        )}
      </div>
    </div>
  );
}
