'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function Track() {
  const router = useRouter();
  const [weight, setWeight] = useState('');
  const [displayDate, setDisplayDate] = useState('');
  const [loading, setLoading] = useState(false);

  // 1. Get "Today's" date on component mount
  useEffect(() => {
    const today = new Date();
    // Formats to "Oct 25"
    const formatted = new Intl.DateTimeFormat('en-US', { 
      month: 'short', 
      day: 'numeric' 
    }).format(today);
    
    setDisplayDate(formatted);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // 2. Prepare the data (Current ISO date + Weight)
      const payload = {
        date: new Date().toISOString(), // Save full date for sorting later
        weight: parseFloat(weight),
      };

      // 3. Send to your API
      const res = await fetch('/api/save-weight', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        alert('Weight saved!');
        setWeight(''); // Clear input
        router.refresh(); // Optional: Refresh data if you're showing a chart on this page
      } else {
        alert('Something went wrong.');
      }
    } catch (error) {
      console.error(error);
      alert('Error connecting to server.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gray-50 p-6">
      <div className="w-full max-w-md bg-white p-8 rounded-xl shadow-lg border border-gray-100">
        
        {/* Header Section */}
        <div className="text-center mb-8">
          <span className="text-sm font-semibold text-blue-600 uppercase tracking-wider">
            Daily Tracker
          </span>
          <h1 className="text-3xl font-bold text-gray-800 mt-2">
            Today is <span className="text-blue-600">{displayDate}</span>
          </h1>
        </div>

        {/* Input Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Current Weight (kg)
            </label>
            <input
              type="number"
              step="0.1"
              required
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
              placeholder="e.g., 75.5"
              className="w-full p-4 text-xl border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition text-black"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`w-full py-4 text-white font-bold text-lg rounded-lg transition-all ${
              loading 
                ? 'bg-blue-300 cursor-not-allowed' 
                : 'bg-blue-600 hover:bg-blue-700 shadow-md hover:shadow-lg'
            }`}
          >
            {loading ? 'Saving...' : 'Save Entry'}
          </button>
        </form>
      </div>
    </main>
  );
}