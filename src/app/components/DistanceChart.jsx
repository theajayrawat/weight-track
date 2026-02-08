'use client';

import React, { useMemo } from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts';

const DistanceChart = ({ data }) => {
  // 1. Pre-process data to calculate Speed (km/h)
  const chartData = useMemo(() => {
    return data.map((item) => {
      const speed = item.time > 0 
        ? (item.distance / item.time) * 60 // (km / min) * 60 = km/h
        : 0;
      return {
        ...item,
        speed: parseFloat(speed.toFixed(1)), // Round to 1 decimal
      };
    });
  }, [data]);

  const formatDate = (dateStr) => {
    if (!dateStr) return '';
    const date = new Date(dateStr);
    return new Intl.DateTimeFormat('en-US', { 
      month: 'short', 
      day: 'numeric' 
    }).format(date);
  };

  return (
    <div className="w-full h-96 bg-white p-4 rounded-xl shadow-md border border-gray-100">      
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          data={chartData}
          margin={{ top: 20, right: 30, left: 10, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" vertical={false} />
          
          {/* SHARED X-AXIS (Date) */}
          <XAxis 
            dataKey="date" 
            tickFormatter={formatDate}
            stroke="#888888"
            tick={{ fontSize: 12 }}
            interval="preserveStartEnd"
          />
          
          {/* LEFT Y-AXIS (Distance) */}
          <YAxis 
            yAxisId="left"
            orientation="left"
            stroke="#06b6d4" // Blue
            tick={{ fontSize: 12 }}
            unit="km"
            label={{ value: 'Distance', angle: -90, position: 'insideLeft', fill: '#06b6d4' }}
          />

          {/* RIGHT Y-AXIS (Speed) - REPLACED TIME */}
          <YAxis 
            yAxisId="right"
            orientation="right"
            stroke="#8b5cf6" // Amber/Orange for Speed
            tick={{ fontSize: 12 }}
            unit=" km/h"
            label={{ value: 'Speed', angle: 90, position: 'insideRight', fill: '#8b5cf6' }}
          />
          
          <Tooltip 
            contentStyle={{ backgroundColor: '#fff', borderRadius: '8px', border: '1px solid #e5e7eb' }}
            labelFormatter={(label) => formatDate(label)}
            formatter={(value, name) => [
              name === 'distance' ? `${value} km` : `${value} km/h`, 
              name === 'distance' ? 'Distance' : 'Speed'
            ]}
          />
          
          <Legend wrapperStyle={{ paddingTop: '10px' }} />

          {/* LINE 1: DISTANCE (Binds to "left" axis) */}
          <Line 
            yAxisId="left"
            type="monotone" 
            dataKey="distance" 
            name="distance"
            stroke="#06b6d4" // Blue
            strokeWidth={3} 
            activeDot={{ r: 6 }} 
            dot={{ r: 3 }}
          />

          {/* LINE 2: SPEED (Binds to "right" axis) */}
          <Line 
            yAxisId="right"
            type="monotone" 
            dataKey="speed" 
            name="Speed"
            stroke="#8b5cf6"
            strokeWidth={3} 
            activeDot={{ r: 6 }} 
            dot={{ r: 3 }}
          />

        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default DistanceChart;