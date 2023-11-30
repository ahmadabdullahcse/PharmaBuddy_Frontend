import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Cart from "../Cart/Cart";
import PharmacyIndividualCard from "./PharmacyIndividualCard";

const PharmacyMedicineDetails = ({ email }) => {
  const { pharmacyEmail } = useParams();
  const newEmail = email ? email : pharmacyEmail;
  const [medicines, setMedicines] = useState([]);
  const [filteredMedicine, setFilteredMedicine] = useState([]);
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");

  useEffect(() => {
    fetch("https://pharmabuddy.onrender.com/addMedicine")
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (Array.isArray(data)) {
          setMedicines(data);
          setFilteredMedicine(
            data.filter((medicine) => medicine.userInfo === newEmail)
          );
        } else {
          console.error("Response is not an array:", data);
          setMedicines([]);
          setFilteredMedicine([]);
        }
      })
      .catch((error) => {
        console.error("Error fetching medicines:", error);
      });
  }, [newEmail]);

  console.log(filteredMedicine);

  const handleSearchByPrice = () => {
    const filteredByPrice = medicines.filter((medicine) => {
      const priceInRange =
        (!minPrice || medicine.price >= parseFloat(minPrice)) &&
        (!maxPrice || medicine.price <= parseFloat(maxPrice));
      return priceInRange;
    });
    setFilteredMedicine(filteredByPrice);
  };

  return (
    <div className="container mx-auto my-8 p-4">
      <h1 className="text-2xl font-bold text-center text-primary mb-4">
        Medicines added by this Pharmacy
      </h1>

      {/* Price range search input fields */}
      <div className="mb-4 flex items-center justify-center">
        <label className="font-extrabold mr-2">Min Price:</label>
        <input
          type="number"
          value={minPrice}
          onChange={(e) => setMinPrice(e.target.value)}
          className="p-2 border border-gray-400 rounded-lg outline-none mr-2 text-sm"
        />
        <label className="font-extrabold mr-2">Max Price:</label>
        <input
          type="number"
          value={maxPrice}
          onChange={(e) => setMaxPrice(e.target.value)}
          className="p-2 border border-gray-400 rounded-lg outline-none text-sm"
        />
        <button
          onClick={handleSearchByPrice}
          className="p-2 bg-primary text-white rounded-md ml-2"
        >
          Search
        </button>
      </div>

      <div className="grid lg:grid-cols-4 md:grid-cols-2 sm:grid-cols-1 gap-5 p-11">
        {filteredMedicine.map((product) => (
          <PharmacyIndividualCard
            key={product._id}
            product={product}
          ></PharmacyIndividualCard>
        ))}
      </div>
      <Cart />
    </div>
  );
};

export default PharmacyMedicineDetails;
