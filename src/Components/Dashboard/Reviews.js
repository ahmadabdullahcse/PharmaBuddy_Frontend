import React, { useEffect, useState } from "react";
import ReviewRow from "./ReviewRow";

const Reviews = () => {
  const [page, setPage] = useState(1);
  const [reviews, setReviews] = useState([]);
  const [itemsPerPage, setItemsPerPage] = useState(5);

  useEffect(() => {
    fetch("/review.json")
      .then((res) => res.json())
      .then((data) => {
        setReviews(data);
      });
  }, []);
  console.log(reviews);

  const startIndex = (page - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const reviewsToDisplay = reviews.slice(startIndex, endIndex);

  const totalPages = Math.ceil(reviews.length / itemsPerPage);

  const handleNextPage = () => {
    if (page < totalPages) {
      setPage(page + 1);
    }
  };

  const handlePrevPage = () => {
    if (page > 1) {
      setPage(page - 1);
    }
  };

  const handleItemsPerPageChange = (event) => {
    const selectedItemsPerPage = parseInt(event.target.value, 10);
    setItemsPerPage(selectedItemsPerPage);
    setPage(1); // Reset to the first page when changing items per page
  };

  return (
    <div>
      <div className="mb-10">
        <label className="label-text text-primary font-bold text-md">
          Items per Page:
          <select value={itemsPerPage} onChange={handleItemsPerPageChange}>
            <option value="3">3</option>
            <option value="5">5</option>
            <option value="10">10</option>
            <option value="20">20</option>
          </select>
        </label>
      </div>
      <div>
        <table id="myTable" className="table">
          <thead>
            <tr>
              <th className="uppercase underline lg:text-lg text-primary lg:font-extrabold text-left">
                Serial
              </th>
              <th className="uppercase underline text-lg text-primary font-extrabold text-left">
                User
              </th>
              <th className="uppercase underline text-lg text-primary font-extrabold text-left">
                Rating
              </th>
              <th className="uppercase underline text-lg text-primary font-extrabold text-left">
                Description
              </th>
              <th className="uppercase underline text-lg text-primary font-extrabold text-left">
                Product
              </th>
              <th className="uppercase underline text-lg text-primary font-extrabold text-left">
                Payment
              </th>
              <th className="uppercase underline text-lg text-primary font-extrabold text-left">
                Date
              </th>
            </tr>
          </thead>
          {/* <tbody>
            {reviewsToDisplay.map((review) => (
              <ReviewRow key={review.id} review={review} />
            ))}
          </tbody> */}
        </table>
        <button className="btn btn-primary mt-16 btn-sm drawer-button lg:hidden">
          Slide to see
        </button>
        <div className="flex justify-end gap-10 lg:my-20">
          <button
            className="btn btn-sm text-xs lg:w-1/6 uppercase border-accent text-accent font-bold bg-primary"
            onClick={handlePrevPage}
            disabled={page === 1}
          >
            Previous
          </button>
          <button
            className="btn btn-sm text-xs w-1/6 uppercase border-accent text-accent font-bold bg-primary"
            onClick={handleNextPage}
            disabled={page === totalPages}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default Reviews;
