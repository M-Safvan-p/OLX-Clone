export default function Footer() {
  return (
    <footer className="bg-gray-100 border-t border-gray-200 py-10 px-4">
      <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-5 gap-8">

        {/* Popular Locations */}
        <div>
          <h4 className="font-bold text-sm text-gray-800 mb-3 uppercase tracking-wide">Popular Locations</h4>
          {["Kolkata", "Mumbai", "Chennai", "Pune"].map((item) => (
            <p key={item} className="text-sm text-gray-500 mb-1 cursor-pointer hover:text-gray-800">{item}</p>
          ))}
        </div>

        {/* Trending Locations */}
        <div>
          <h4 className="font-bold text-sm text-gray-800 mb-3 uppercase tracking-wide">Trending Locations</h4>
          {["Bhubaneshwar", "Hyderabad", "Chandigarh", "Nashik"].map((item) => (
            <p key={item} className="text-sm text-gray-500 mb-1 cursor-pointer hover:text-gray-800">{item}</p>
          ))}
        </div>

        {/* About Us */}
        <div>
          <h4 className="font-bold text-sm text-gray-800 mb-3 uppercase tracking-wide">About Us</h4>
          {["About OLX India", "Tech@OLX", "Careers"].map((item) => (
            <p key={item} className="text-sm text-gray-500 mb-1 cursor-pointer hover:text-gray-800">{item}</p>
          ))}
        </div>

        {/* OLX */}
        <div>
          <h4 className="font-bold text-sm text-gray-800 mb-3 uppercase tracking-wide">OLX</h4>
          {["Blog", "Help", "Sitemap", "Legal & Privacy information", "Vulnerability Disclosure Program"].map((item) => (
            <p key={item} className="text-sm text-gray-500 mb-1 cursor-pointer hover:text-gray-800">{item}</p>
          ))}
        </div>

        {/* Follow Us + App Stores */}
        <div>
          <h4 className="font-bold text-sm text-gray-800 mb-3 uppercase tracking-wide">Follow Us</h4>

          {/* Social Icons */}
          <div className="flex items-center gap-2 mb-4 flex-wrap">
            {/* Facebook */}
            <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-white text-xs font-bold cursor-pointer">f</div>
            {/* Instagram */}
            <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-yellow-400 via-pink-500 to-purple-600 flex items-center justify-center text-white text-xs cursor-pointer">📷</div>
            {/* YouTube */}
            <div className="w-8 h-8 rounded-full bg-red-600 flex items-center justify-center text-white text-xs cursor-pointer">▶</div>
            {/* X */}
            <div className="w-8 h-8 rounded-full bg-black flex items-center justify-center text-white text-xs font-bold cursor-pointer">𝕏</div>
            {/* WhatsApp */}
            <div className="w-8 h-8 rounded-full bg-green-500 flex items-center justify-center text-white text-xs cursor-pointer">📱</div>
            {/* LinkedIn */}
            <div className="w-8 h-8 rounded-full bg-blue-700 flex items-center justify-center text-white text-xs font-bold cursor-pointer">in</div>
          </div>

          {/* Google Play */}
          <a href="#" className="flex items-center gap-2 bg-gray-900 text-white rounded-lg px-3 py-2 mb-2 w-40 hover:bg-gray-700 transition">
            <span className="text-xl">▶</span>
            <div>
              <p className="text-[9px] text-gray-400 leading-none">GET IT ON</p>
              <p className="text-sm font-semibold leading-tight">Google Play</p>
            </div>
          </a>

          {/* App Store */}
          <a href="#" className="flex items-center gap-2 bg-gray-900 text-white rounded-lg px-3 py-2 w-40 hover:bg-gray-700 transition">
            <span className="text-xl"></span>
            <div>
              <p className="text-[9px] text-gray-400 leading-none">Download on the</p>
              <p className="text-sm font-semibold leading-tight">App Store</p>
            </div>
          </a>
        </div>

      </div>
    </footer>
  );
}