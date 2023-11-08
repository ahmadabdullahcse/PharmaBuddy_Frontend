// PharmacyMedicineDetails.js
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const PharmacyMedicineDetails = () => {
  const { pharmacyId } = useParams();
  const [medicines, setMedicines] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:5000/addMedicine?pharmacyId=${pharmacyId}`)
      .then((res) => res.json())
      .then((data) => {
        setMedicines(data);
        console.log(data);
      });
  }, [pharmacyId]);

  return (
    <div>
      <h1 className="text-3xl pt-12 text-center font-black text-primary px-7">
        Medicines added by this Pharmacy
      </h1>
      <ul>
        {medicines.map((medicine) => (
          <li key={medicine._id}>
            {medicine.title} {/* Display medicine details */}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PharmacyMedicineDetails;
