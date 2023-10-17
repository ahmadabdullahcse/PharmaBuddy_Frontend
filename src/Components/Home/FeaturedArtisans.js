import React from "react";
import StackedCards from "./StackedCards";

const artisans = [
  {
    name: "John Doe",
    specialty: "Woodworking",
    location: "New York, USA",
    image: "/images/banner/avatar.png",
  },
  {
    name: "Jane Smith",
    specialty: "Pottery",
    location: "Paris, France",
    image: "/images/banner/avatar.png",
  },
  {
    name: "Alex Johnson",
    specialty: "Jewelry",
    location: "Tokyo, Japan",
    image: "/images/banner/avatar.png",
  },
  {
    name: "Ella Davis",
    specialty: "Glassblowing",
    location: "Sydney, Australia",
    image: "/images/banner/avatar.png",
  },
  {
    name: "Daniel Brown",
    specialty: "Textiles",
    location: "London, UK",
    image: "/images/banner/avatar.png",
  },
];

const FeaturedArtisans = () => {
  return (
    <div>
      <h1 className="text-2xl font-bold text-center text-primary my-4">
        Featured Artisans
      </h1>
      <div className="text-center">
        <StackedCards artisans={artisans} />
      </div>
    </div>
  );
};

export default FeaturedArtisans;
