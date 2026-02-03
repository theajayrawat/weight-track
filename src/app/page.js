import Link from 'next/link'; 

export default function Home() {

  return (
    <main className="flex min-h-screen h-1/2 flex-col items-center justify-center p-8 bg-gray-50">
      <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">
          Tracker
      </h1>
      <div className="w-full max-w-4xl flex h-1/2 gap-2">
          <Link 
            href="/weight/track"
            className="mt-4 md:mt-0 px-6 py-10 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg shadow-md transition-all w-1/2"
          >
          Add Weight
          </Link>  
           <Link 
            href="/hour/track"
            className="mt-4 md:mt-0 px-6 py-10 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg shadow-md transition-all w-1/2"
          >
          Add Hour
          </Link>          
      </div>
    </main>
  );
}