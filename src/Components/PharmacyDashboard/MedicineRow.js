import React from "react";
import { toast } from "react-toastify";
import trash from "../../images/trash.svg";

const MedicineRow = ({ product, index }) => {
  const deleteBooking = () => {
    if (window.confirm("Are you sure you want to delete this booking?")) {
      fetch(`http://localhost:5000/addMedicine/${product._id}`, {
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
    <tr>
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
        <img
          onClick={deleteBooking}
          className="w-6 cursor-pointer"
          src={trash}
          alt=""
        />
      </td>
    </tr>
  );
};

export default MedicineRow;
