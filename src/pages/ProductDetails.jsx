import { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../config/firebase";
import { useParams, useNavigate } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { MapPin, Tag, Calendar, ChevronLeft, ChevronRight, Phone } from "lucide-react";

export default function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [currentImage, setCurrentImage] = useState(0);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const docRef = doc(db, "products", id);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setProduct({ id: docSnap.id, ...docSnap.data() });
        }
      } catch (error) {
        console.error("Error fetching product:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  if (loading) {
    return (
      <>
        <Header />
        <div className="min-h-screen bg-gray-100 flex items-center justify-center">
          <div className="w-8 h-8 border-4 border-[#3a77ff] border-t-transparent rounded-full animate-spin" />
        </div>
      </>
    );
  }

  if (!product) {
    return (
      <>
        <Header />
        <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center">
          <span className="text-6xl mb-4">😕</span>
          <h2 className="text-xl font-bold text-gray-700">Product not found</h2>
          <button onClick={() => navigate("/")} className="mt-4 text-[#3a77ff] underline text-sm">
            Go back to Home
          </button>
        </div>
      </>
    );
  }

  const images = product.images?.length > 0 ? product.images : [product.img].filter(Boolean);

  return (
    <>
      <Header />
      <div className="min-h-screen bg-gray-100 py-6 px-4">
        <div className="max-w-5xl mx-auto">

          {/* Back Button */}
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-1 text-sm text-gray-500 hover:text-gray-800 mb-4 transition"
          >
            <ChevronLeft size={16} /> Back
          </button>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

            {/* Left — Image Gallery + Details */}
            <div className="md:col-span-2 space-y-4">

              {/* Image Gallery */}
              <div className="bg-white rounded-2xl overflow-hidden shadow">
                <div className="relative">
                  {images.length > 0 ? (
                    <img
                      src={images[currentImage]}
                      alt={product.title}
                      className="w-full h-80 object-cover"
                    />
                  ) : (
                    <div className="w-full h-80 bg-gray-100 flex items-center justify-center text-6xl">📷</div>
                  )}

                  {/* Arrows */}
                  {images.length > 1 && (
                    <>
                      <button
                        onClick={() => setCurrentImage((i) => (i - 1 + images.length) % images.length)}
                        className="absolute left-3 top-1/2 -translate-y-1/2 bg-white rounded-full p-1 shadow hover:bg-gray-100"
                      >
                        <ChevronLeft size={20} />
                      </button>
                      <button
                        onClick={() => setCurrentImage((i) => (i + 1) % images.length)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 bg-white rounded-full p-1 shadow hover:bg-gray-100"
                      >
                        <ChevronRight size={20} />
                      </button>
                    </>
                  )}

                  {/* Image Count */}
                  {images.length > 1 && (
                    <span className="absolute bottom-3 right-3 bg-black/50 text-white text-xs px-2 py-1 rounded-full">
                      {currentImage + 1} / {images.length}
                    </span>
                  )}
                </div>

                {/* Thumbnails */}
                {images.length > 1 && (
                  <div className="flex gap-2 p-3 overflow-x-auto">
                    {images.map((img, i) => (
                      <img
                        key={i}
                        src={img}
                        alt=""
                        onClick={() => setCurrentImage(i)}
                        className={`w-16 h-16 object-cover rounded-lg cursor-pointer border-2 flex-shrink-0 ${i === currentImage ? "border-[#3a77ff]" : "border-transparent"}`}
                      />
                    ))}
                  </div>
                )}
              </div>

              {/* Title & Price */}
              <div className="bg-white rounded-2xl shadow p-5">
                <p className="text-2xl font-black text-gray-900">{product.price}</p>
                <h1 className="text-lg font-semibold text-gray-800 mt-1">{product.title}</h1>

                <div className="flex flex-wrap gap-4 mt-3 text-sm text-gray-500">
                  <span className="flex items-center gap-1">
                    <Tag size={14} /> {product.category}
                  </span>
                  <span className="flex items-center gap-1">
                    <MapPin size={14} /> {product.location}
                  </span>
                  <span className="flex items-center gap-1">
                    <Calendar size={14} /> {product.date}
                  </span>
                </div>
              </div>

              {/* Description */}
              {product.description && (
                <div className="bg-white rounded-2xl shadow p-5">
                  <h2 className="text-base font-bold text-gray-800 mb-2">Description</h2>
                  <p className="text-sm text-gray-600 leading-relaxed whitespace-pre-line">
                    {product.description}
                  </p>
                </div>
              )}

            </div>

            {/* Right — Seller Info + Contact */}
            <div className="space-y-4">

              {/* Contact Seller */}
              <div className="bg-white rounded-2xl shadow p-5">
                <h2 className="text-base font-bold text-gray-800 mb-4">Seller Info</h2>

                <div className="flex items-center gap-3 mb-5">
                  {product.userPhoto && product.userPhoto.length > 0 ? (
                    <img src={product.userPhoto} alt="seller" className="w-12 h-12 rounded-full object-cover border-2 border-[#3a77ff]" />
                  ) : (
                    <div className="w-12 h-12 rounded-full bg-[#3a77ff] flex items-center justify-center text-white font-bold text-lg">
                      {product.userName?.charAt(0).toUpperCase()}
                    </div>
                  )}
                  <div>
                    <p className="font-semibold text-gray-800">{product.userName || "Seller"}</p>
                    <p className="text-xs text-gray-400">Member on OLX</p>
                  </div>
                </div>

                <button className="w-full bg-[#3a77ff] hover:bg-blue-700 text-white font-bold py-3 rounded-xl flex items-center justify-center gap-2 transition">
                  <Phone size={16} /> Contact Seller
                </button>
              </div>

              {/* Location Card */}
              <div className="bg-white rounded-2xl shadow p-5">
                <h2 className="text-base font-bold text-gray-800 mb-2">Location</h2>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <MapPin size={16} className="text-[#3a77ff]" />
                  {product.location}
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}