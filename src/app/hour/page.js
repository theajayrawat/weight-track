'use client';

import { useState, useEffect } from 'react';
import HourChart from '../components/HourChart';
import Link from 'next/link'; 

export default function Home() {
  const [loading, setLoading] = useState(true);
  const [chartData, setChartData] = useState([]); // Initialize as empty array

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    try {
      const res = await fetch('/api/save-hour', {
        method: 'GET', // Explicitly ask for data
        cache: 'no-store' // Ensure we don't get cached stale data
      });

      if (res.ok) {
        const json = await res.json(); // Parse the JSON response
        setChartData(json.data);       // Update state with the DB data
      } else {
        console.error('Failed to fetch');
      }
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-8 bg-gray-50">
      <div className="w-full max-w-4xl">
        <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">
          Hour History
        </h1>
          <Link 
            href="/"
            className="mt-4 md:mt-0 px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg shadow-md transition-all flex items-center gap-2"
          >
            <span>Back to home</span>
          </Link>        
        {loading ? (
          <p className="text-center text-gray-500">Loading your data...</p>
        ) : (
          /* Pass the REAL data state to the chart */
          <HourChart data={chartData} />
        )}
        
      </div>
    </main>
  );
}