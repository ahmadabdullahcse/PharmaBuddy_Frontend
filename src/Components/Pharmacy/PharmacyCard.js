import React from "react";
import { useNavigate } from "react-router-dom";
import PharmacyMedicineDetails from "./PharmacyMedicineDetails";

const PharmacyCard = ({ product }) => {
  const { img, name, email } = product;
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/pharmacyMedicineDetails/${email}`);
  };

  return (
    <div className="bg-primary rounded-3xl">
      <div
        className="border-2 rounded-3xl text-black relative m-2 hover:scale-105 cursor-grab transition-all duration-300 ease-in-out"
        onClick={handleClick}
      >
        <div className="bg-accent rounded-3xl">
          <div className="flex">
            <figure className="top-3 left-3 right-0 h-full">
              <img
                src={img}
                alt="medicine"
                className="w-64 h-64 ml-3 mt-2 rounded-3xl shadow-md"
              />
            </figure>
          </div>
          <div className=" p-2 text-primary font-semibold ">
            <h2 className="text-xl text-center capitalize font-bold">{name}</h2>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PharmacyCard;
