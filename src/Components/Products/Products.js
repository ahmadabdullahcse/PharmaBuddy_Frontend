import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Cart from "../Cart/Cart";
import CategoryMenu from "../Cart/CategoryMenu";
import ProductCard from "./ProductCard";
import ProductDetailPage from "./ProductDetailPage";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [details, setDetails] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(8); // Number of items to display per page
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const category = useSelector((state) => state.category.category);
  const search = useSelector((state) => state.search.search);

  useEffect(() => {
    fetch("https://pharmabuddy.onrender.com/medicine")
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);
      });
  }, []);

  // Calculate the index of the last item to display on the current page
  const indexOfLastItem = currentPage * itemsPerPage;
  // Calculate the index of the first item to display on the current page
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  // Get the current items to display
  const currentProducts = products.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleItemsPerPageChange = (event) => {
    setItemsPerPage(parseInt(event.target.value, 10));
    setCurrentPage(1); // Reset to the first page when changing items per page.
  };

  return (
    <div>
      <h1
        className="text-3xl pt-12 text-center font-black text-primary px-7"
        style={{ fontFamily: "arial" }}
      >
        Discover essential healthcare solutions
        <br /> through our diverse medicine categories
      </h1>

      <div className="mb-4 mt-7 mr-20 text-center flex items-center justify-end">
        <label className="font-extrabold mr-2">Items per Page:</label>
        <select
          value={itemsPerPage}
          onChange={handleItemsPerPageChange}
          className="p-2 border border-gray-400 rounded-lg outline-none mr-4"
        >
          <option value={20}>20</option>
          <option value={30}>30</option>
          <option value={60}>60</option>
        </select>

        {/* Price range search input fields */}
        <div>
          <label className="font-extrabold mr-2">Min Price:</label>
          <input
            type="number"
            value={minPrice}
            onChange={(e) => setMinPrice(e.target.value)}
            className="p-2 border border-gray-400 rounded-lg outline-none mr-2 text-sm"
          />
        </div>
        <div>
          <label className="font-extrabold mr-2">Max Price:</label>
          <input
            type="number"
            value={maxPrice}
            onChange={(e) => setMaxPrice(e.target.value)}
            className="p-2 border border-gray-400 rounded-lg outline-none text-sm"
          />
        </div>
      </div>

      <CategoryMenu />

      <div className="grid lg:grid-cols-4 md:grid-cols-2 sm:grid-cols-1 gap-5 p-11">
        {currentProducts
          .filter((product) => {
            const titleMatches = product.title
              .toLowerCase()
              .includes(search.toLowerCase());
            const categoryMatches =
              category === "All" || category === product.category;
            const priceInRange =
              (!minPrice || product.price >= parseFloat(minPrice)) &&
              (!maxPrice || product.price <= parseFloat(maxPrice));

            return titleMatches && categoryMatches && priceInRange;
          })
          .map((product) => (
            <ProductCard
              key={product._id}
              product={product}
              setDetails={setDetails}
            ></ProductCard>
          ))}
      </div>

      {/* Pagination component */}
      <div className="text-center mt-4">
        <ul className="pagination flex items-center justify-center">
          {Array(Math.ceil(products.length / itemsPerPage))
            .fill()
            .map((_, index) => (
              <li
                key={index}
                className={`page-item mx-10 mb-12 border-2 border-secondary bg-primary text-accent p-2 font font-extrabold text-xl rounded-md${
                  currentPage === index + 1 ? "active" : ""
                }`}
              >
                <button
                  onClick={() => paginate(index + 1)}
                  className="page-link"
                >
                  {index + 1}
                </button>
              </li>
            ))}
        </ul>
      </div>

      <Cart />
      {/* <ScrollToTop /> */}
      <ProductDetailPage details={details} />
    </div>
  );
};

export default Products;
