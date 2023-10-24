import React from "react";

const ReviewRow = ({ review, index }) => {
  return (
    <tr>
      <td className="uppercase text-lg font-bold py-2 text-left">
        {index + 1}
      </td>
      <td className="font-semibold">{review?.name}</td>
      <td className="font-semibold">{review?.email}</td>
      <td className="font-semibold">{review?.rating} stars</td>
      <td className="font-semibold">{review?.comments}</td>
    </tr>
  );
};

export default ReviewRow;
