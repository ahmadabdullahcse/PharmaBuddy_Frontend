import React from "react";
import banner6 from "../../images/banner/banner-8.jpg";
import banner1 from "../../images/banner/b3.jpeg";

const About = () => {
  return (
    <div className="mt-20">
      <h1 className="text-3xl font-bold text-center text-primary my-8">
        About - "Pharma-Buddy"
      </h1>
      <div className="grid lg:grid-cols-2 gap-8 p-8">
        <div className="bg-neutral rounded-lg p-6 flex flex-col items-center justify-center text-center">
          <p className="text-lg font-bold text-black mb-4">
            Welcome to PHARMA BUDDY, your trusted destination for all your
            pharmaceutical needs. As an online medicine shop, we're dedicated to
            providing you with a seamless and convenient way to access essential
            medications and healthcare products from the comfort of your home.
          </p>
        </div>

        <div>
          <img className="w-full rounded-lg" src={banner1} alt="" />
        </div>
      </div>
    </div>
  );
};

export default About;
