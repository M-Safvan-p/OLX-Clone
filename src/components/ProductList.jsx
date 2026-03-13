import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../config/firebase";
import { Heart } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

export default function ProductList({ selectedCategory }) {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const snapshot = await getDocs(collection(db, "products"));
        const data = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
        setProducts(data);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const filtered = selectedCategory
    ? products.filter((p) => p.category === selectedCategory)
    : products;

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-6">
        <h2 className="text-xl font-bold mb-4">Fresh recommendations</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[...Array(8)].map((_, i) => (
            <div key={i} className="bg-gray-100 rounded-xl h-64 animate-pulse" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      <h2 className="text-xl font-bold mb-4">
        {selectedCategory ? `${selectedCategory}` : "Fresh recommendations"}
      </h2>

      {/* No products found */}
      {filtered.length === 0 && (
        <div className="flex flex-col items-center justify-center py-16 text-center">
          <span className="text-5xl mb-3">🔍</span>
          <p className="text-gray-500 text-sm">No products found in <strong>{selectedCategory}</strong></p>
        </div>
      )}

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {filtered.map((product) => (
          <div
            key={product.id}
            onClick={() => navigate(`/product/${product.id}`)}
            className="border border-gray-200 rounded-xl overflow-hidden cursor-pointer hover:shadow-md transition bg-white"
          >
            <div className="relative">
              <img src={product.img} alt={product.title} className="w-full h-40 object-cover" />
              {product.featured && (
                <span className="absolute bottom-2 left-2 bg-yellow-400 text-black text-[10px] font-bold px-2 py-0.5 rounded">
                  FEATURED
                </span>
              )}
              <button className="absolute top-2 right-2 bg-white rounded-full p-1 shadow">
                <Heart size={16} className="text-gray-400" />
              </button>
            </div>
            <div className="p-3">
              <p className="text-lg font-bold text-gray-900">{product.price}</p>
              {product.detail && <p className="text-xs text-gray-500">{product.detail}</p>}
              <p className="text-sm text-gray-700 mt-1 truncate">{product.title}</p>
              <div className="flex justify-between items-center mt-2">
                <p className="text-[11px] text-gray-400 uppercase truncate">{product.location}</p>
                <p className="text-[11px] text-gray-400 flex-shrink-0 ml-1">{product.date}</p>
              </div>
            </div>
          </div>
        ))}

        {/* Sell CTA — only show when not filtering */}
        {!selectedCategory && (
          <div className="bg-[#3a77ff] rounded-xl flex flex-col items-center justify-center text-white text-center p-6 cursor-pointer">
            <p className="font-bold text-lg mb-2">Want to see your stuff here?</p>
            <p className="text-sm mb-4 text-blue-100">Make some extra cash by selling things in your community.</p>
            <Link to="/create-ad">
              <button className="border-2 border-white text-white font-semibold px-5 py-2 rounded-lg hover:bg-white hover:text-[#3a77ff] transition text-sm">
                Start selling
              </button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}