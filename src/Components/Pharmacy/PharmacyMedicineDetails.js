import React, { useEffect, useState } from "react";

const PharmacyMedicineDetails = ({email}) => {
  const [medicines, setMedicines] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:5000/medicinesByUser/${email}`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (Array.isArray(data)) {
          setMedicines(data);
        } else {
          console.error("Response is not an array:", data);
          setMedicines([]);
        }
      })
      .catch((error) => {
        console.error("Error fetching medicines:", error);
      });
  }, [email]);

  return (
    <div>
      <h1 className="text-xl pt-12 text-center font-black text-primary px-7">
        Medicines added by this Pharmacy
      </h1>
      <ul>
        {medicines.map((medicine) => (
          <li key={medicine._id}>
            {medicine.title}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PharmacyMedicineDetails;
