import React, { useState, useEffect } from "react";
import banner1 from "../../images/banner/b1.jpeg";
import banner2 from "../../images/banner/b2.jpeg";
import banner3 from "../../images/banner/b3.jpeg";
import banner4 from "../../images/banner/5.png";
const images = [banner1, banner2, banner3, banner4];

const Banner = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === images.length - 1 ? 0 : prevIndex + 1
      );
    }, 2500);

    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <div className="relative max-w-full h-[66vh]">
      <div className="absolute inset-0 transition-opacity duration-1000">
        {images.map((image, index) => (
          <img
            key={index}
            src={image}
            alt={`Banner ${index + 1}`}
            className={`w-full h-full object-cover absolute top-0 left-0 opacity-${
              index === currentIndex ? 100 : 0
            } transition-opacity duration-1000`}
          />
        ))}
      </div>
    </div>
  );
};

export default Banner;
