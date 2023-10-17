import React from "react";
import Banner from "./Banner";
import FeaturedProducts from "./FeaturedProducts";
import ProductCategories from "./ProductCategories";
import About from "../About/About";
import ContactUs from "./ContactUs";
import ScrollToTop from "./ScrollToTop";
import Footer from "../Shared/Footer";

const Home = () => {
  return (
    <div>
      <ScrollToTop />
      <Banner />
      <ProductCategories />
      <FeaturedProducts />
      <About />
      <ContactUs />
      <Footer />
    </div>
  );
};

export default Home;
