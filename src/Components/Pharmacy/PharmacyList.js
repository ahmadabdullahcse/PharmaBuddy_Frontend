// PharmacyList.js
import React, { useEffect, useState } from "react";

const PharmacyList = () => {
  const [pharmacies, setPharmacies] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/pharmacies")
      .then((res) => res.json())
      .then((data) => {
        setPharmacies(data);
      });
  }, []);

  return (
    <div>
      <h1 className="text-3xl pt-12 text-center font-black text-primary px-7">
        List of Pharmacies
      </h1>
      <ul>
        {pharmacies.map((pharmacy) => (
          <li key={pharmacy._id}>
            <a href={`/pharmacy/${pharmacy._id}`}>
              {pharmacy.name} {/* Display pharmacy name */}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PharmacyList;
