import React from "react";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Hero from "./components/Hero";
import FeaturedProducts from "./components/FeaturedProducts";

function App() {
  return (
    <div>
      <Navbar />
      <Hero />
      <FeaturedProducts />
      <Footer />
    </div>
  );
}

export default App;
