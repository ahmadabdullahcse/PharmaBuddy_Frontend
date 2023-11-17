import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import PharmacyIndividualCard from "./PharmacyIndividualCard";

const PharmacyMedicineDetails = ({ email }) => {
  const { pharmacyEmail } = useParams();
  const newEmail = email ? email : pharmacyEmail;
  const [medicines, setMedicines] = useState([]);
  const [filteredMedicine, setFilteredMedicine] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/addMedicine")
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

  return (
    <div className="container mx-auto my-8 p-4">
      <h1 className="text-2xl font-bold text-center text-primary mb-4">
        Medicines added by this Pharmacy
      </h1>
      {/* {filteredMedicine.length > 0 && pharmacyEmail && (
        <table className="table-auto mx-auto w-full">
          <thead>
            <tr>
              <th className="border px-4 py-2">Title</th>
              {pharmacyEmail && (
                <>
                  <th className="border px-4 py-2">Description</th>
                  <th className="border px-4 py-2">Category</th>
                  <th className="border px-4 py-2">Price</th>
                  <th className="border px-4 py-2">Quantity</th>
                </>
              )}
            </tr>
          </thead>
          <tbody>
            {filteredMedicine.map((medicine) => (
              <tr key={medicine._id}>
                <td className="border px-4 py-2">{medicine.title}</td>
                {pharmacyEmail && (
                  <>
                    <td className="border px-4 py-2">{medicine.description}</td>
                    <td className="border px-4 py-2">{medicine.category}</td>
                    <td className="border px-4 py-2">{medicine.price}</td>
                    <td className="border px-4 py-2">{medicine.quantity}</td>
                  </>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      )} */}
      <div className="grid lg:grid-cols-4 md:grid-cols-2 sm:grid-cols-1 gap-5 p-11">
        {filteredMedicine.map((product) => (
          <PharmacyIndividualCard
            key={product._id}
            product={product}
          ></PharmacyIndividualCard>
        ))}
      </div>
    </div>
  );
};

export default PharmacyMedicineDetails;
