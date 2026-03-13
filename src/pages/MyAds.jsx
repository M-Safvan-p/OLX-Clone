import { useEffect, useState } from "react";
import { collection, query, where, getDocs, deleteDoc, doc } from "firebase/firestore";
import { db } from "../config/firebase";
import { useAuth } from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import ConfirmDialog from "../components/ConfirmDialog";
import { Trash2, Pencil } from "lucide-react";

export default function MyAds() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [ads, setAds] = useState([]);
  const [loading, setLoading] = useState(true);
  const [confirmDialog, setConfirmDialog] = useState({ show: false, adId: null });

  const fetchMyAds = async () => {
    try {
      const q = query(collection(db, "products"), where("userId", "==", user.uid));
      const snapshot = await getDocs(q);
      const data = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setAds(data);
    } catch (error) {
      console.error("Error fetching ads:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user) fetchMyAds();
  }, [user]);

  const handleDelete = async (id) => {
    setConfirmDialog({ show: true, adId: id });
  };

  const confirmDelete = async () => {
    const { adId } = confirmDialog;
    try {
      await deleteDoc(doc(db, "products", adId));
      setAds((prev) => prev.filter((ad) => ad.id !== adId));
      setConfirmDialog({ show: false, adId: null });
    } catch (error) {
      console.error("Error deleting ad:", error);
    }
  };

  return (
    <>
      <Header />
      <div className="min-h-screen bg-gray-100 py-8 px-4">
        <div className="max-w-7xl mx-auto">

          {/* Top Bar */}
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-2xl font-bold text-gray-800">My Ads</h1>
            <button
              onClick={() => navigate("/create-ad")}
              className="bg-[#3a77ff] hover:bg-blue-700 text-white font-semibold px-5 py-2 rounded-lg text-sm transition"
            >
              + Post New Ad
            </button>
          </div>

          {/* Loading */}
          {loading && (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="bg-white rounded-xl h-64 animate-pulse" />
              ))}
            </div>
          )}

          {/* Empty State */}
          {!loading && ads.length === 0 && (
            <div className="flex flex-col items-center justify-center py-24 text-center">
              <span className="text-6xl mb-4">📭</span>
              <h2 className="text-xl font-bold text-gray-700 mb-2">No ads posted yet</h2>
              <p className="text-gray-400 text-sm mb-6">Start selling by posting your first ad!</p>
              <button
                onClick={() => navigate("/create-ad")}
                className="bg-[#3a77ff] text-white font-semibold px-6 py-3 rounded-lg text-sm hover:bg-blue-700 transition"
              >
                + Post Your First Ad
              </button>
            </div>
          )}

          {/* Ads Grid */}
          {!loading && ads.length > 0 && (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {ads.map((ad) => (
                <div key={ad.id} className="bg-white border border-gray-200 rounded-xl overflow-hidden hover:shadow-md transition">

                  {/* Image */}
                  <div className="relative">
                    {ad.img ? (
                      <img src={ad.img} alt={ad.title} className="w-full h-40 object-cover" />
                    ) : (
                      <div className="w-full h-40 bg-gray-100 flex items-center justify-center text-4xl">📷</div>
                    )}
                  </div>

                  {/* Info */}
                  <div className="p-3">
                    <p className="text-lg font-bold text-gray-900">{ad.price}</p>
                    <p className="text-sm text-gray-700 truncate">{ad.title}</p>
                    <p className="text-xs text-gray-400 mt-1">{ad.date}</p>

                    {/* Action Buttons */}
                    <div className="flex gap-2 mt-3">
                      <button
                        onClick={() => navigate(`/edit-ad/${ad.id}`)}
                        className="flex-1 flex items-center justify-center gap-1 border border-[#3a77ff] text-[#3a77ff] text-xs font-semibold py-1.5 rounded-lg hover:bg-blue-50 transition"
                      >
                        <Pencil size={13} /> Edit
                      </button>
                      <button
                        onClick={() => handleDelete(ad.id)}
                        className="flex-1 flex items-center justify-center gap-1 border border-red-400 text-red-400 text-xs font-semibold py-1.5 rounded-lg hover:bg-red-50 transition"
                      >
                        <Trash2 size={13} /> Delete
                      </button>
                    </div>
                  </div>

                </div>
              ))}
            </div>
          )}

        </div>
      </div>
      <Footer />
      
      {/* Confirm Delete Dialog */}
      {confirmDialog.show && (
        <ConfirmDialog
          title="Delete Ad"
          message="Are you sure you want to delete this ad? This action cannot be undone."
          confirmText="Delete"
          cancelText="Cancel"
          onConfirm={confirmDelete}
          onCancel={() => setConfirmDialog({ show: false, adId: null })}
        />
      )}
    </>
  );
}