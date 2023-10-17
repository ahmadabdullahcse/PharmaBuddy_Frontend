import React from "react";

const ItemRow = ({ product }) => {
  return (
    <tr>
      <td className="uppercase text-lg font-bold py-2 text-left">
        {product.index}
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
      <td className="font-semibold">{product?.deliveryTime}</td>
    </tr>
  );
};

export default ItemRow;
