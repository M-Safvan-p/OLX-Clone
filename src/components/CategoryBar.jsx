export default function CategoryBar() {
  const categories = [
    "Cars",
    "Motorcycles",
    "Mobile Phones",
    "For Sale: Houses & Apartments",
    "Beds-Wardrobes",
    "TVs, Video - Audio",
  ];

  const today = new Date().toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });

  return (
    <div className="bg-white border-b border-gray-200 px-4 py-2">
      <div className="max-w-7xl mx-auto flex items-center gap-3 overflow-x-auto no-scrollbar">

        {/* All Categories Button */}
        <button className="flex items-center gap-2 bg-[#3a77ff] text-white font-bold text-sm px-4 py-2 rounded-full whitespace-nowrap flex-shrink-0">
          <span className="text-lg leading-none">☰</span>
          ALL CATEGORIES
        </button>

        {/* Category Pills */}
        {categories.map((cat) => (
          <button
            key={cat}
            className="border border-gray-300 text-gray-700 text-sm px-4 py-2 rounded-full whitespace-nowrap flex-shrink-0 hover:border-gray-500 transition"
          >
            {cat}
          </button>
        ))}

        {/* Divider + Date */}
        <div className="flex items-center gap-3 ml-auto flex-shrink-0">
          <div className="w-px h-5 bg-gray-300" />
          <span className="text-sm text-gray-500 whitespace-nowrap">{today}</span>
        </div>

      </div>
    </div>
  );
}