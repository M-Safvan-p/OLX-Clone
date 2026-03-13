export default function FooterBottom() {
  return (
    <div className="bg-[#1a3c8f] text-white px-4 py-6">
      <div className="max-w-7xl mx-auto">

        {/* Logos Row */}
        <div className="flex items-center justify-between flex-wrap gap-6 pb-6 border-b border-blue-600">

          {/* CarTradeTech Group */}
          <div className="flex items-center gap-4">
            <div className="text-sm font-bold leading-tight">
              <span>Car</span>
              <span className="bg-white text-[#1a3c8f] px-1 rounded mx-0.5">T</span>
              <span>rade</span>
              <span className="bg-white text-[#1a3c8f] px-1 rounded mx-0.5 font-black">Tech</span>
              <br />
              <span className="tracking-widest text-xs font-semibold ml-1">GROUP</span>
            </div>
            <div className="w-px h-12 bg-blue-400" />
          </div>

          {/* OLX */}
          <div className="text-3xl font-black italic tracking-tight">
            OI<span className="text-white">X</span>
          </div>

          {/* Carwale */}
          <div className="text-lg font-bold flex items-center gap-1">
            <span className="border border-white rounded px-1 text-sm">□</span> carwale
          </div>

          {/* Bikewale */}
          <div className="text-lg font-bold flex items-center gap-1">
            <span className="text-sm">🔵</span> bikewale
          </div>

          {/* CarTrade */}
          <div className="text-lg font-bold">
            Car<span className="bg-white text-[#1a3c8f] px-1 rounded mx-0.5">T</span>rade
          </div>

          {/* Mobility Outlook */}
          <div className="text-sm font-bold flex items-center gap-1">
            <span className="text-lg">⊞</span>
            <span className="leading-tight">MOBILITY<br />OUTLOOK</span>
          </div>

        </div>

        {/* Bottom Row */}
        <div className="flex items-center justify-between pt-4 text-sm text-blue-200 flex-wrap gap-2">
          <div className="flex gap-3">
            <span className="cursor-pointer hover:text-white">Help</span>
            <span>-</span>
            <span className="cursor-pointer hover:text-white">Sitemap</span>
          </div>
          <p>All rights reserved © 2006-2026 OLX</p>
        </div>

      </div>
    </div>
  );
}