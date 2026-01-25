'use client';

import React from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

const WeightChart = ({ data }) => {
  // Format: "Jan 15"
  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    return new Intl.DateTimeFormat('en-US', { 
      month: 'short', 
      day: 'numeric' 
    }).format(date);
  };

  return (
    <div className="w-full h-[400px] bg-white p-4 rounded-xl shadow-md border border-gray-100">      
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          // layout="vertical"  <-- REMOVED THIS (Defaults to horizontal)
          data={data}
          margin={{ top: 20, right: 30, left: 10, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={true} />
          
          {/* X Axis: Date (Now horizontal) */}
          <XAxis 
            dataKey="date" 
            tickFormatter={formatDate}
            stroke="#888888"
            interval="preserveStartEnd" // Prevents overlapping text if many dates
            tick={{ fontSize: 12 }}
          />
          
          {/* Y Axis: Weight (Now vertical) */}
          <YAxis 
            type="number" 
            domain={['dataMin - 2', 'dataMax + 2']} // Zoom in on weight range
            unit="kg" 
            stroke="#888888"
            tick={{ fontSize: 12 }}
          />
          
          <Tooltip 
            cursor={{ strokeDasharray: '3 3' }}
            contentStyle={{ backgroundColor: '#fff', borderRadius: '8px', border: '1px solid #e5e7eb' }}
            labelFormatter={(label) => formatDate(label)}
            formatter={(value) => [`${value} kg`, 'Weight']}
          />
          
          <Line 
            dataKey="weight" 
            type="monotone" 
            stroke="#3b82f6" 
            strokeWidth={3} 
            activeDot={{ r: 8 }} 
            dot={{ r: 4 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default WeightChart;