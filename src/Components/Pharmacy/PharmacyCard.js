import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addToCart } from "../../redux/Slices/CartSlice";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

const PharmacyCard = ({ product, setDetails }) => {
  const { id, img, name, price, description } = product;
  const [productDetail, setProductDetail] = useState([]);

  const [showFullDescription, setShowFullDescription] = useState(false);
  const dispatch = useDispatch();
  const toggleDescription = () => {
    setShowFullDescription(!showFullDescription);
  };
  //   const displayedDescription = showFullDescription
  //     ? description
  //     : description.slice(0, 20) + (description.length > 20 ? "..." : "");

  return (
    <div className="bg-primary rounded-3xl">
      <Link to="/pharmacyMedicine">
        {" "}
        <div className="border-2 rounded-3xl text-black relative m-2 hover:scale-105 cursor-grab transition-all duration-300 ease-in-out">
          <div className="bg-accent rounded-3xl">
            <div className="flex">
              <figure className="top-3 left-3 right-0 h-full">
                <img
                  src={img}
                  alt="handcraft"
                  className="w-64 h-64 ml-3 mt-2 rounded-3xl shadow-md"
                />
              </figure>
            </div>
            <div className=" p-2 text-primary font-semibold ">
              <h2 className="text-xl text-center capitalize font-bold">
                {name}
              </h2>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default PharmacyCard;
