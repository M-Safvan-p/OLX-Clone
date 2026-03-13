import { useState } from "react";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../config/firebase";
import { useAuth } from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Alert from "../components/Alert";
import { uploadImage } from "../utils/UploadImage";

const categories = [
  "Cars", "Bikes", "Properties", "Mobiles",
  "Services", "Furniture", "Pets", "Others"
];

export default function CreateAd() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [images, setImages] = useState([]);
  const [previews, setPreviews] = useState([]);
  const [alert, setAlert] = useState({ show: false, message: "", type: "info" });
  const [form, setForm] = useState({
    title: "",
    price: "",
    description: "",
    category: "",
    location: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleImages = (e) => {
    const files = Array.from(e.target.files);
    setImages(files);
    setPreviews(files.map((f) => URL.createObjectURL(f)));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user) {
      setAlert({ show: true, message: "Please login first!", type: "warning" });
      return;
    }

    if (!form.title || !form.price || !form.category || !form.location) {
      setAlert({ show: true, message: "Please fill all required fields!", type: "warning" });
      return;
    }

    setLoading(true);
    try {
      // Upload images to Cloudinary
      const imageUrls = await Promise.all(
        images.map((img) => uploadImage(img))
      );

      // Save ad to Firestore
      await addDoc(collection(db, "products"), {
        ...form,
        price: `₹ ${Number(form.price).toLocaleString("en-IN")}`,
        images: imageUrls,
        img: imageUrls[0] || "",
        userId: user.uid,
        userName: user.displayName || "Anonymous",
        userPhoto: user.photoURL || "",
        featured: false,
        date: new Date().toLocaleDateString("en-IN", { 
          year: "numeric", 
          month: "short", 
          day: "numeric" 
        }),
        createdAt: serverTimestamp(),
      });

      setAlert({ show: true, message: "Ad posted successfully!", type: "success" });
      setTimeout(() => navigate("/My-Ads"), 2000);
    } catch (error) {
      console.error("Error creating ad:", error);
      setAlert({ show: true, message: `Error: ${error.message}`, type: "error" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Header />
      <div className="min-h-screen bg-gray-100 py-8 px-4">
        <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow p-8">

          <h1 className="text-2xl font-bold text-gray-800 mb-6">Post Your Ad</h1>

          <form onSubmit={handleSubmit} className="space-y-5">

            {/* Category */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Category *</label>
              <select
                name="category"
                value={form.category}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm outline-none focus:border-[#3a77ff]"
              >
                <option value="">Select a category</option>
                {categories.map((cat) => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>

            {/* Title */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Title *</label>
              <input
                type="text"
                name="title"
                value={form.title}
                onChange={handleChange}
                placeholder="e.g. iPhone 13 Pro Max 256GB"
                className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm outline-none focus:border-[#3a77ff]"
              />
            </div>

            {/* Price */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Price *</label>
              <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden focus-within:border-[#3a77ff]">
                <span className="px-3 text-gray-500 text-sm">₹</span>
                <input
                  type="number"
                  name="price"
                  value={form.price}
                  onChange={handleChange}
                  placeholder="0"
                  className="flex-1 py-2 pr-4 text-sm outline-none"
                />
              </div>
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Description</label>
              <textarea
                name="description"
                value={form.description}
                onChange={handleChange}
                rows={4}
                placeholder="Describe your item..."
                className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm outline-none focus:border-[#3a77ff] resize-none"
              />
            </div>

            {/* Location */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Location *</label>
              <input
                type="text"
                name="location"
                value={form.location}
                onChange={handleChange}
                placeholder="e.g. Kozhikode, Kerala"
                className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm outline-none focus:border-[#3a77ff]"
              />
            </div>

            {/* Images */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Images</label>
              <input
                type="file"
                accept="image/*"
                multiple
                onChange={handleImages}
                className="w-full border border-dashed border-gray-300 rounded-lg px-4 py-3 text-sm text-gray-500 cursor-pointer"
              />
              {previews.length > 0 && (
                <div className="flex gap-2 mt-3 flex-wrap">
                  {previews.map((src, i) => (
                    <img key={i} src={src} alt="" className="w-20 h-20 object-cover rounded-lg border" />
                  ))}
                </div>
              )}
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#3a77ff] hover:bg-blue-700 text-white font-bold py-3 rounded-lg transition disabled:opacity-60"
            >
              {loading ? "Uploading & Posting..." : "Post Ad"}
            </button>

          </form>
        </div>
      </div>
      <Footer />

      {/* Alert */}
      {alert.show && (
        <Alert
          message={alert.message}
          type={alert.type}
          onClose={() => setAlert({ ...alert, show: false })}
        />
      )}
    </>
  );
}