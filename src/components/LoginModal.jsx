import { useState } from "react";
import { signInWithPopup } from "firebase/auth";
import { auth, provider } from "../config/firebase";


export default function LoginModal({ onClose }) {
  const [loading, setLoading] = useState(false);

  const handleGoogleLogin = async () => {
    setLoading(true);
    try {
      await signInWithPopup(auth, provider);
      onClose();
    } catch (error) {
      console.error("Google login error:", error);
    } finally {
      setLoading(false);
    }
  };

  const slides = [
    { emoji: "🧑‍💻", text: "Keep all your favourites in one place." },
    { emoji: "🛒", text: "Buy & sell in your local community." },
    { emoji: "🔔", text: "Get alerts for the things you want." },
  ];

  const [slide, setSlide] = useState(0);

  return (
    <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center px-4">
      <div className="bg-white rounded-2xl w-full max-w-md p-8 relative">

        {/* Close Button */}
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-gray-700 text-2xl">✕</button>

        {/* Slide Avatar */}
        <div className="flex flex-col items-center mb-4">
          <div className="w-24 h-24 bg-teal-100 rounded-full flex items-center justify-center text-5xl mb-4">
            {slides[slide].emoji}
          </div>

          {/* Arrows + Text */}
          <div className="flex items-center gap-4">
            <button onClick={() => setSlide((s) => (s - 1 + slides.length) % slides.length)} className="text-gray-400 hover:text-gray-700 text-xl">‹</button>
            <p className="text-center text-gray-700 font-medium text-sm w-48">{slides[slide].text}</p>
            <button onClick={() => setSlide((s) => (s + 1) % slides.length)} className="text-gray-400 hover:text-gray-700 text-xl">›</button>
          </div>

          {/* Dots */}
          <div className="flex gap-2 mt-3">
            {slides.map((_, i) => (
              <div key={i} className={`w-2 h-2 rounded-full ${i === slide ? "bg-[#3a77ff]" : "bg-gray-300"}`} />
            ))}
          </div>
        </div>

        {/* Continue with Phone (dummy) */}
        <button className="w-full border-2 border-[#3a77ff] text-[#3a77ff] font-semibold py-3 rounded-lg flex items-center justify-center gap-2 mb-3 hover:bg-blue-50 transition">
          <span>📱</span> Continue with phone
        </button>

        {/* Continue with Google */}
        <button
          onClick={handleGoogleLogin}
          disabled={loading}
          className="w-full border border-gray-300 text-gray-700 font-semibold py-3 rounded-lg flex items-center justify-center gap-2 hover:bg-gray-50 transition"
        >
          <img src="https://www.google.com/favicon.ico" className="w-5 h-5" alt="Google" />
          {loading ? "Signing in..." : "Continue with Google"}
        </button>

        {/* OR + Login with Email (dummy) */}
        <div className="text-center my-3 text-gray-400 text-sm">OR</div>
        <button className="w-full text-center text-[#3a77ff] font-semibold underline text-sm hover:text-blue-800">
          Login with Email
        </button>

        {/* Footer */}
        <p className="text-center text-xs text-gray-400 mt-6">All your personal details are safe with us.</p>
        <p className="text-center text-xs text-gray-400 mt-1">
          If you continue, you are accepting{" "}
          <span className="text-[#3a77ff] cursor-pointer">OLX Terms and Conditions and Privacy Policy</span>
        </p>

      </div>
    </div>
  );
}