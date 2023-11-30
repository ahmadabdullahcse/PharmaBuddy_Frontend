import React, { useState } from "react";
import { toast } from "react-toastify";
import out_of_stock from "../../images/out-of-stock.png";

const MedicineRow = ({ product, index }) => {
  const [isOutOfStock, setIsOutOfStock] = useState(false);

  const handleOutOfStock = () => {
    setIsOutOfStock(true);
    toast.info("Medicine marked as out of stock");
  };

  const deleteBooking = () => {
    if (
      !isOutOfStock &&
      window.confirm("Are you sure you want to delete this booking?")
    ) {
      fetch(`https://pharmabuddy.onrender.com/addMedicine/${product._id}`, {
        method: "DELETE",
      })
        .then((response) => {
          if (response.ok) {
            toast.success("Booking deleted successfully");
          } else {
            throw new Error("Failed to delete booking");
          }
        })
        .catch((error) => {
          console.error("Error deleting booking:", error);
          toast.error("Error deleting booking");
        });
    }
  };

  return (
    <tr style={{ opacity: isOutOfStock ? 0.5 : 1 }}>
      <td className="uppercase text-lg font-bold py-2 text-left">
        {index + 1}
      </td>
      <td className="font-semibold">{product.title}</td>
      <td className="font-semibold">{product.category}</td>
      <td className="font-semibold text-primary">
        {product.price}
        {product.currency}
      </td>
      <td className="font-semibold">{product.quantity}</td>
      <td className="font-semibold">
        <img className="w-6" src={product?.img} alt="" />
      </td>
      <td>
        {!isOutOfStock && (
          <img
            onClick={handleOutOfStock}
            className="w-10 cursor-pointer"
            src={out_of_stock}
            alt="Out of Stock"
          />
        )}
      </td>
    </tr>
  );
};

export default MedicineRow;
