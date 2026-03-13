import { useEffect, useState } from "react";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../config/firebase";
import { useNavigate, useParams } from "react-router-dom";
import Header from "../components/Header";
import Alert from "../components/Alert";
import { uploadImage } from "../utils/UploadImage";

const categories = [
  "Cars", "Bikes", "Properties", "Mobiles",
  "Services", "Furniture", "Pets", "Others"
];

export default function EditAd() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
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

  // Fetch existing ad data
  useEffect(() => {
    const fetchAd = async () => {
      try {
        const docRef = doc(db, "products", id);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          const data = docSnap.data();
          setForm({
            title: data.title || "",
            price: data.price || "",
            description: data.description || "",
            category: data.category || "",
            location: data.location || "",
          });
          setPreviews(data.images || (data.img ? [data.img] : []));
        }
      } catch (error) {
        console.error("Error fetching ad:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchAd();
  }, [id]);

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
    if (!form.title || !form.price || !form.category || !form.location) {
      setAlert({ show: true, message: "Please fill all required fields!", type: "warning" });
      return;
    }

    setSaving(true);
    try {
      let imageUrls = previews;

      // Upload new images if selected
      if (images.length > 0) {
        imageUrls = await Promise.all(images.map((img) => uploadImage(img)));
      }

      await updateDoc(doc(db, "products", id), {
        ...form,
        images: imageUrls,
        img: imageUrls[0] || "",
      });

      setAlert({ show: true, message: "Ad updated successfully!", type: "success" });
      setTimeout(() => navigate("/My-Ads"), 1000);
    } catch (error) {
      console.error("Error updating ad:", error);
      setAlert({ show: true, message: `Error: ${error.message}`, type: "error" });
    } finally {
      setSaving(false);
    }
  };

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

  return (
    <>
      <Header />
      <div className="min-h-screen bg-gray-100 py-8 px-4">
        <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow p-8">

          <h1 className="text-2xl font-bold text-gray-800 mb-6">Edit Ad</h1>

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
                  type="text"
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
              {/* Existing Previews */}
              {previews.length > 0 && (
                <div className="flex gap-2 mb-3 flex-wrap">
                  {previews.map((src, i) => (
                    <img key={i} src={src} alt="" className="w-20 h-20 object-cover rounded-lg border" />
                  ))}
                </div>
              )}
              <input
                type="file"
                accept="image/*"
                multiple
                onChange={handleImages}
                className="w-full border border-dashed border-gray-300 rounded-lg px-4 py-3 text-sm text-gray-500 cursor-pointer"
              />
              <p className="text-xs text-gray-400 mt-1">Upload new images to replace existing ones</p>
            </div>

            {/* Buttons */}
            <div className="flex gap-3">
              <button
                type="button"
                onClick={() => navigate("/My-Ads")}
                className="flex-1 border border-gray-300 text-gray-600 font-semibold py-3 rounded-lg text-sm hover:bg-gray-50 transition"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={saving}
                className="flex-1 bg-[#3a77ff] hover:bg-blue-700 text-white font-bold py-3 rounded-lg transition disabled:opacity-60"
              >
                {saving ? "Saving..." : "Save Changes"}
              </button>
            </div>

          </form>
        </div>
      </div>

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