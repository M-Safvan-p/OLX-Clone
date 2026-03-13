export default function NotFound() {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center text-center px-4">

      {/* OLX Logo */}
      <div className="mb-6">
        <span className="text-4xl font-black italic">
          <span className="text-black">O</span>
          <span className="text-[#3a77ff]">L</span>
          <span className="text-[#ffd602]">X</span>
        </span>
      </div>

      <h1 className="text-7xl font-black text-[#3a77ff] mb-3">404</h1>
      <h2 className="text-xl font-semibold text-gray-800 mb-2">Page Not Found</h2>
      <p className="text-gray-500 text-sm mb-8">
        The page you're looking for doesn't exist or has been removed.
      </p>

      <a href="/" className="bg-[#3a77ff] hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-lg text-sm transition">
        Back to Home
      </a>

    </div>
  );
}