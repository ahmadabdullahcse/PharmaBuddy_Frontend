import React, { useEffect } from "react";
import category1 from "../../images/banner/1.png";
import category2 from "../../images/banner/2.jpg";
import category3 from "../../images/banner/3.jpg";
import category4 from "../../images/banner/4.jpg";
import category5 from "../../images/banner/5.png";
import category6 from "../../images/banner/6.png";
import category7 from "../../images/banner/7.png";
import category8 from "../../images/banner/8.png";
import category9 from "../../images/banner/9.png";
import category10 from "../../images/banner/10.jpg";
import { Link } from "react-router-dom";
import Aos from "aos";
import "aos/dist/aos.css";

const ProductCategories = () => {
  const categories = [
    { image: category1, title: "Device and Equipments" },
    { image: category2, title: "Heart Health" },
    { image: category3, title: "Diabetic Care" },
    { image: category4, title: "Women Care" },
    { image: category5, title: "Eye Care" },
    { image: category6, title: "Baby Care" },
    { image: category7, title: "Men Care" },
    { image: category8, title: "Skin Care" },
    { image: category9, title: "Digestive Health" },
    { image: category10, title: "Dental Care" },
  ];

  const [hoveredCategory, setHoveredCategory] = React.useState(null);
  useEffect(() => {
    Aos.init();
  }, []);

  return (
    <div
      data-aos="fade-left"
      data-aos-duration="2000"
      className="bg-accent py-16 text-white"
    >
      <h1 className="text-2xl uppercase font-bold text-primary text-center mb-10">
        Shop by categories
      </h1>

      <div className="grid lg:grid-cols-5 md:grid-cols-3 sm:grid-cols-2 gap-3 justify-center items-center">
        {categories.map((category, index) => (
          <div
            key={index}
            className="relative overflow-hidden rounded-xl transform hover:scale-105 transition-transform duration-300 ease-in-out"
            onMouseEnter={() => setHoveredCategory(category)}
            onMouseLeave={() => setHoveredCategory(null)}
          >
            <img
              src={
                hoveredCategory === category ? category.image : category.image
              }
              alt={category.title}
              className=" w-56 h-36 rounded-lg"
            />
            <div className="absolute inset-0 bg-black bg-opacity-60 flex items-center justify-center transition-opacity duration-300 opacity-0 hover:opacity-100">
              <h2 className="text-2xl font-semibold">
                {hoveredCategory?.title}
              </h2>
            </div>
          </div>
        ))}
      </div>
      <div className="flex justify-center mt-8">
        <Link to="/products">
          <button className="bg-primary text-white py-2 px-6 rounded-full font-semibold text-xl hover:bg-accent hover:shadow-lg transition-all duration-300 ease-in-out">
            See More
          </button>
        </Link>
      </div>
    </div>
  );
};

export default ProductCategories;
