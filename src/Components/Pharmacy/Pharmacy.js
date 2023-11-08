import React, { useEffect, useState } from "react";
import PharmacyCard from "./PharmacyCard";
import bro from "../../images/Questions-bro.png";

const Pharmacy = () => {
  const [products, setProducts] = useState([]);
  const [details, setDetails] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/pharmacySignup")
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);
      });
  }, []);

  return (
    <div>
      <h1
        className="text-3xl pt-12 text-center font-black text-primary px-7"
        style={{ fontFamily: "arial" }}
      >
        Discover Pharmacy
      </h1>

      <div className="grid lg:grid-cols-2 sm:grid-cols-1 gap-5 p-11">
        <div>
          <img src={bro} alt="" />
        </div>
        <div className="grid lg:grid-cols-2 sm:grid-cols-1 gap-5 p-11">
          {products.map((product) => (
            <PharmacyCard
              key={product.id}
              product={product}
              setDetails={setDetails}
            ></PharmacyCard>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Pharmacy;
