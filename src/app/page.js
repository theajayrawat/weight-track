import Link from 'next/link'; 

export default function Home() {

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-8 bg-gray-50">
      <h1 className="text-4xl font-bold text-center mb-12 text-gray-800">
          Daily Tracker
      </h1>
      <div className="w-full max-w-5xl grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Weight Section */}
        <div className="flex flex-col gap-4 p-6 bg-white rounded-xl shadow-lg border border-gray-100 transition-transform hover:scale-105">
          <h2 className="text-2xl font-semibold text-center text-gray-700">Weight</h2>
          <Link 
            href="/weight/track"
            className="w-full py-3 text-center bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors shadow-sm"
          >
            Log Weight
          </Link>
          <Link 
            href="/weight"
            className="w-full py-3 text-center bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold rounded-lg transition-colors border border-gray-200"
          >
            View History
          </Link>
        </div>

        {/* Distance Section */}
        <div className="flex flex-col gap-4 p-6 bg-white rounded-xl shadow-lg border border-gray-100 transition-transform hover:scale-105">
          <h2 className="text-2xl font-semibold text-center text-gray-700">Distance</h2>
          <Link 
            href="/distance/track"
            className="w-full py-3 text-center bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors shadow-sm"
          >
            Log Run
          </Link>
          <Link 
            href="/distance"
            className="w-full py-3 text-center bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold rounded-lg transition-colors border border-gray-200"
          >
            View History
          </Link>
        </div>

        {/* Hour Section */}
        <div className="flex flex-col gap-4 p-6 bg-white rounded-xl shadow-lg border border-gray-100 transition-transform hover:scale-105">
          <h2 className="text-2xl font-semibold text-center text-gray-700">Hours</h2>
          <Link 
            href="/hour/track"
            className="w-full py-3 text-center bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors shadow-sm"
          >
            Log Hours
          </Link>
          <Link 
            href="/hour"
            className="w-full py-3 text-center bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold rounded-lg transition-colors border border-gray-200"
          >
            View History
          </Link>
        </div>

      </div>
    </main>
  );
}