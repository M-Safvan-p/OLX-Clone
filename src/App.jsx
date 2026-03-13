import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "./hooks/useAuth";
import Home from "./pages/Home";
import CreateAd from "./pages/CreateAd";
import MyAds from "./pages/MyAds";
import EditAd from "./pages/EditAd";
import ProductDetails from "./pages/ProductDetails";
import NotFound from "./pages/NotFound";

// Protected Route Component
function ProtectedRoute({ children }) {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-[#3a77ff] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }
  return user ? children : <Navigate to="/" replace />;
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />

        <Route
          path="/create-ad"
          element={
            <ProtectedRoute>
              <CreateAd />
            </ProtectedRoute>
          }
        />
        <Route
          path="/My-Ads"
          element={
            <ProtectedRoute>
              <MyAds />
            </ProtectedRoute>
          }
        />
        <Route
          path="/edit-ad/:id"
          element={
            <ProtectedRoute>
              <EditAd />
            </ProtectedRoute>
          }
        />

        <Route path="/product/:id" element={<ProductDetails />} />

        {/* 404 */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
