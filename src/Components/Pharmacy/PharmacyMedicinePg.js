import React, { useState } from "react";
import { useParams } from "react-router-dom"; // Import React Router if not already done

const PharmacyMedicinePg = () => {
  const { pharmacyId } = useParams(); // Get the pharmacy ID from the URL parameter
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  const handleSearch = () => {
    fetch(
      `http://localhost:5000/searchMedicinesInPharmacy/${pharmacyId}?query=${searchQuery}`
    )
      .then((res) => res.json())
      .then((data) => {
        setSearchResults(data);
      });
  };

  return (
    <div>
      <h1 className="text-3xl pt-12 text-center font-black text-primary px-7">
        Discover essential healthcare solutions
        <br /> through our diverse medicine categories
      </h1>

      {/* Search bar */}
      <div className="mb-4 text-center">
        <input
          type="text"
          placeholder="Search Medicines"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <button onClick={handleSearch}>Search</button>
      </div>

      {/* Display search results for the specific pharmacy */}
      <div className="grid lg:grid-cols-4 md:grid-cols-2 sm:grid-cols-1 gap-5 p-11">
        {searchResults.map((medicine) => (
          <div key={medicine._id}>
            {medicine.name} {/* Display medicine details */}
          </div>
        ))}
      </div>
    </div>
  );
};

export default PharmacyMedicinePg;
