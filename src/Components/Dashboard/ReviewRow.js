import React from "react";

const ReviewRow = ({ review }) => {
  return (
    <tr>
      <td className="uppercase text-lg font-bold py-2 text-left">
        {review.id}
      </td>
      <td className="font-semibold">
        {review?.user?.name}
        <br /> ({review?.user?.email})
      </td>
      <td className="font-semibold">{review.rating} stars</td>
      <td className="font-semibold">{review.description}</td>
      <td className="font-semibold">
        Category: {review?.product?.category}
        <br />
        Detail: {review.product.detail}
        <br />
        <span className="text-primary font-bold">
          {" "}
          Price: ${review.product.price}
        </span>
      </td>
      <td className="font-semibold">{review?.payment_method}</td>
      <td className="font-semibold">{review.date}</td>
    </tr>
  );
};

export default ReviewRow;
