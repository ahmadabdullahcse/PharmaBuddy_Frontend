import React from "react";
import "swiper/css";
import "swiper/swiper-bundle.css";
import "swiper/css/autoplay";
import { Swiper, SwiperSlide } from "swiper/react";
import banner1 from "../../images/banner/fe1.jpg";
import banner2 from "../../images/banner/fe2.jpg";
import banner3 from "../../images/banner/fe3.jpg";
import banner4 from "../../images/banner/fe4.jpg";
import banner5 from "../../images/banner/fe5.jpg";
import banner6 from "../../images/banner/fe6.jpg";
import banner7 from "../../images/banner/fe7.jpg";
import banner8 from "../../images/banner/fe8.jpg";
import banner9 from "../../images/banner/fe9.jpg";
import banner10 from "../../images/banner/fe10.png";

const FeaturedProducts = () => {
  return (
    <div className="text-center py-10 bg-accent">
      <h1 className="text-2xl uppercase font-bold text-primary mb-5">
        OTC Medicines
      </h1>
      <Swiper
        spaceBetween={16}
        slidesPerView={4.5}
        autoplay={true}
        loop={true}
        width={900} // Set a fixed width for the Swiper container
        breakpoints={{
          640: {
            slidesPerView: 2,
            width: 300, // Adjust the width for smaller screens
          },
          768: {
            slidesPerView: 3,
            width: 600, // Adjust the width for medium-sized screens
          },
          1024: {
            slidesPerView: 4.5,
            width: 900, // Set the default width for larger screens
          },
        }}
      >
        <SwiperSlide className="hover:scale-105 transition-transform duration-300 ease-in-out">
          <div className="group relative">
            <img className="w-72 h-52 rounded-lg" src={banner1} alt="" />
            <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex justify-center items-center">
              <h1 className="text-xl font-semibold text-white">Constipation</h1>
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide className="hover:scale-105 transition-transform duration-300 ease-in-out">
          <div className="group relative">
            <img className="w-72 h-52 rounded-lg" src={banner2} alt="" />
            <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 absolute inset-0 flex justify-center items-center">
              <h1 className="text-xl font-semibold text-white">Cough & Flu</h1>
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide className="hover:scale-105 transition-transform duration-300 ease-in-out">
          <div className="group relative">
            <img className="w-72 h-52 rounded-lg" src={banner3} alt="" />
            <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 absolute inset-0 flex justify-center items-center">
              <h1 className="text-xl font-semibold text-white">Diarrhea</h1>
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide className="hover:scale-105 transition-transform duration-300 ease-in-out">
          <div className="group relative">
            <img className="w-72 h-52 rounded-lg" src={banner4} alt="" />
            <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 absolute inset-0 flex justify-center items-center">
              <h1 className="text-xl font-semibold text-white">Eczema</h1>
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide className="hover:scale-105 transition-transform duration-300 ease-in-out">
          <div className="group relative">
            <img className="w-72 h-52 rounded-lg" src={banner5} alt="" />
            <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 absolute inset-0 flex justify-center items-center">
              <h1 className="text-xl font-semibold text-white">Fever</h1>
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide className="hover:scale-105 transition-transform duration-300 ease-in-out">
          <div className="group relative">
            <img className="w-72 h-52 rounded-lg" src={banner6} alt="" />
            <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 absolute inset-0 flex justify-center items-center">
              <h1 className="text-xl font-semibold text-white">Gastric</h1>
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide className="hover:scale-105 transition-transform duration-300 ease-in-out">
          <div className="group relative">
            <img className="w-72 h-52 rounded-lg" src={banner7} alt="" />
            <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 absolute inset-0 flex justify-center items-center">
              <h1 className="text-xl font-semibold text-white">Headache</h1>
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide className="hover:scale-105 transition-transform duration-300 ease-in-out">
          <div className="group relative">
            <img className="w-72 h-52 rounded-lg" src={banner8} alt="" />
            <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 absolute inset-0 flex justify-center items-center">
              <h1 className="text-xl font-semibold text-white">Nasal</h1>
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide className="hover:scale-105 transition-transform duration-300 ease-in-out">
          <div className="group relative">
            <img className="w-72 h-52 rounded-lg" src={banner9} alt="" />
            <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 absolute inset-0 flex justify-center items-center">
              <h1 className="text-xl font-semibold text-white">Pain Relief</h1>
            </div>
          </div>
        </SwiperSlide>{" "}
        <SwiperSlide className="hover:scale-105 transition-transform duration-300 ease-in-out">
          <div className="group relative">
            <img className="w-72 h-52 rounded-lg" src={banner10} alt="" />
            <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 absolute inset-0 flex justify-center items-center">
              <h1 className="text-xl font-semibold text-white">Vitamins</h1>
            </div>
          </div>
        </SwiperSlide>
      </Swiper>
    </div>
  );
};

export default FeaturedProducts;
