import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addToCart } from "../../redux/Slices/CartSlice";
import { toast } from "react-toastify";
import Cart from "../Cart/Cart";

const PharmacyIndividualCard = ({ product }) => {
  const { _id, img, title, price, description } = product;
  const [productDetail, setProductDetail] = useState([]);

  const [showFullDescription, setShowFullDescription] = useState(false);
  const dispatch = useDispatch();
  const toggleDescription = () => {
    setShowFullDescription(!showFullDescription);
  };
  const displayedDescription = showFullDescription
    ? description
    : description.slice(0, 20) + (description.length > 20 ? "..." : "");
  const notify = () => {
    toast.success(`Added ${title}`, {
      position: toast.POSITION.TOP_CENTER,
    });
  };

  const handleKnowMoreClick = () => {
    if (!productDetail.includes(product)) {
      setProductDetail([...productDetail, product]);
    }
  };
  return (
    <div className="bg-neutral">
      <div className="border-2 text-black relative m-2 hover:scale-105 cursor-grab transition-all duration-300 ease-in-out">
        <div className="bg-accent">
          <div className="flex">
            <figure className="top-3 left-3 right-0 h-full">
              <img
                src={img}
                alt="pharmacy"
                className="w-24 h-24 rounded-full border-2 border-primary shadow-md"
              />
            </figure>
            <div className="text-right p-2 text-primary font-bold ">
              <h2 className="text-xl font-bold">{title}</h2>
            </div>
          </div>
          <div className=" p-2 text-secondary font-semibold ">
            <h2 className="text-lg font-bold">{price}BDT</h2>
          </div>
          <p className="text-sm px-2">
            {displayedDescription}
            {description.length > 20 && (
              <span
                className="cursor-pointer font-semibold text-primary"
                onClick={toggleDescription}
              >
                {showFullDescription ? " Read Less" : " Read More"}
              </span>
            )}
          </p>

          <div className="flex justify-end p-2">
            <button
              onClick={() => {
                dispatch(addToCart({ _id, img, title, price, qty: 1 }));
                notify();
              }}
              className="px-4 btn-sm mt-3 bg-primary text-white font-bold rounded-full hover:bg-opacity-80 transition duration-300"
            >
              Add To Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PharmacyIndividualCard;
