import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import HomePage from "./HomePage";



function RootLayout() {
  return (
    <div>
      <Navbar />
      <HomePage />
      <Footer />
    </div>
  );
}

export default RootLayout;
