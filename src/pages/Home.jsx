import { useState } from "react";
import Header from "../components/Header";
import CategoryBar from "../components/CategoryBar";
import Footer from "../components/Footer";
import FooterBottom from "../components/FooterBottom";
import CategoryIcon from "../components/CategoryIcon";
import ProductList from "../components/ProductList";

function Home() {
  const [selectedCategory, setSelectedCategory] = useState(null);

  const handleSelectCategory = (catName) => {
    setSelectedCategory((prev) => (prev === catName ? null : catName));
  };

  return (
    <>
      <Header />
      <CategoryBar />
      <CategoryIcon selectedCategory={selectedCategory} onSelectCategory={handleSelectCategory} />
      <ProductList selectedCategory={selectedCategory} />
      <Footer />
      <FooterBottom />
    </>
  );
}

export default Home;