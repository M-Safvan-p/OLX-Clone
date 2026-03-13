import { useState } from "react";
import { Search, Heart, MapPin, ChevronRight, UserCircle  } from "lucide-react";
import { auth } from "../config/firebase";
import { signOut } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";
import LoginModal from "./LoginModal";
import { Link } from "react-router-dom";

export default function Header() {
  const [showLogin, setShowLogin] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [user] = useAuthState(auth);

  const handleWishlistClick = () => {
    if (!user) setShowLogin(true);
  };

  const handleLogout = async () => {
    await signOut(auth);
    setShowDropdown(false);
  };

  return (
    <>
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-2 flex items-center gap-3">

          {/* OLX Logo */}
          <Link to="/" className="flex-shrink-0">
            <img
              src="../../public/olx.png"
              alt="OLX"
              className="h-8 w-auto"
            />
          </Link>

          {/* Location Selector */}
          <div className="flex items-center gap-1 border border-gray-300 rounded-full px-3 py-2 cursor-pointer hover:border-gray-400 min-w-[140px]">
            <MapPin size={16} className="text-gray-500" />
            <span className="text-sm font-medium text-gray-700">Kerala</span>
            <ChevronRight size={16} className="text-gray-400 ml-1" />
          </div>

          {/* Search Bar */}
          <div className="flex flex-1 items-center border border-gray-300 rounded-full overflow-hidden">
            <input
              type="text"
              placeholder='Search "Jobs"'
              className="flex-1 px-4 py-2 text-sm outline-none text-gray-700 placeholder-gray-400"
            />
            <button className="bg-[#3a77ff] hover:bg-blue-700 px-4 py-2 transition">
              <Search size={18} className="text-white" />
            </button>
          </div>

          {/* Wishlist */}
          <Link to={user ? "/My-Ads" : "#"}
            onClick={handleWishlistClick}
            className="flex flex-col items-center cursor-pointer hover:text-[#3a77ff] text-gray-600"
          >
            <Heart size={22} />
            <span className="text-xs mt-0.5">My Ads</span>
          </Link>

          {/* Login / Avatar */}
          {user ? (
            <div className="relative">
              <div
                onClick={() => setShowDropdown(!showDropdown)}
                className="flex flex-col items-center cursor-pointer"
              >
                {/* Avatar */}
                <div className="w-8 h-8 rounded-full bg-[#3a77ff] flex items-center justify-center text-white font-bold text-sm">
                  {user.displayName?.charAt(0).toUpperCase()}
                </div>
                <span className="text-xs mt-0.5 text-gray-600 max-w-[60px] truncate">
                  {user.displayName?.split(" ")[0]}
                </span>
              </div>

              {/* Dropdown */}
              {showDropdown && (
                <div className="absolute right-0 top-12 bg-white border border-gray-200 rounded-xl shadow-lg w-48 py-2 z-50">
                  <p className="px-4 py-2 text-sm text-gray-700 font-medium">{user.displayName}</p>
                  <hr className="my-1" />
                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-2 text-sm text-red-500 hover:bg-gray-50"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div
              onClick={() => setShowLogin(true)}
              className="flex flex-col items-center cursor-pointer hover:text-[#3a77ff] text-gray-600"
            >
              <UserCircle size={26} className="text-gray-600" />
              <span className="text-xs mt-0.5">Login</span>
            </div>
          )}

          {/* Sell Button */}
          <Link to={user ? "/create-ad" : "#"}
            onClick={() => !user && setShowLogin(true)}
            className="flex items-center gap-1 border-2 border-[#ffd602] rounded-full px-5 py-2 font-bold text-sm hover:bg-[#ffd602] transition cursor-pointer"
          >
            + SELL
          </Link>

        </div>
      </header>

      {/* Login Modal */}
      {showLogin && <LoginModal onClose={() => setShowLogin(false)} />}
    </>
  );
}