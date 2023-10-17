import React, { useEffect, useState } from "react";
import ItemRow from "./ItemRow";

const Items = () => {
  const [page, setPage] = useState(1);
  const [products, setProducts] = useState([]);

  const itemsPerPage = 10;

  useEffect(() => {
    fetch("http://localhost:5000/medicine")
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);
      });
  }, []);
  const startIndex = (page - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const productsToDisplay = products.slice(startIndex, endIndex);

  const totalPages = Math.ceil(products.length / itemsPerPage);

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

  const handleSearch = () => {
    // Declare variables
    let input, filter, table, tr, td, i, txtValue;
    input = document.getElementById("myInput");
    filter = input.value.toUpperCase();
    table = document.getElementById("myTable");
    tr = table.getElementsByTagName("tr");

    // Loop through all table rows
    for (i = 0; i < tr.length; i++) {
      let match = false;

      for (let j = 1; j <= 3; j++) {
        td = tr[i].getElementsByTagName("td")[j];
        if (td) {
          txtValue = td.textContent || td.innerText;
          if (txtValue.toUpperCase().indexOf(filter) > -1) {
            match = true;
          }
        }
      }
      if (match) {
        tr[i].style.display = "";
      } else {
        tr[i].style.display = "none";
      }
    }
  };

  return (
    <div>
      <div className="flex lg:justify-end">
        <input
          type="text"
          id="myInput"
          onChange={handleSearch}
          placeholder="Search for title, price or category"
          className="border-2 border-secondary input-xs w-64 rounded-xl"
        />
      </div>
      <div>
        <div>
          <table id="myTable" className="table">
            <thead>
              <tr>
                <th className="uppercase underline lg:text-lg text-primary lg:font-extrabold lg:pr-10 text-left">
                  ID
                </th>
                <th className="uppercase underline text-lg text-primary font-extrabold pr-20 text-left">
                  Product title
                </th>
                <th className="uppercase underline text-lg text-primary font-extrabold pr-20 text-left">
                  category
                </th>
                <th className="uppercase underline text-lg text-primary font-extrabold pr-10 text-left">
                  price
                </th>
                <th className="uppercase underline text-lg text-primary font-extrabold pr-10 text-left">
                  quantity
                </th>
                <th className="uppercase underline text-lg text-primary font-extrabold pr-20 text-left">
                  seller name
                </th>
                <th className="uppercase underline text-lg text-primary font-extrabold pr-10 text-left">
                  deliveryTime
                </th>
              </tr>
            </thead>
            <tbody>
              {productsToDisplay.map((product) => (
                <ItemRow key={product.id} product={product}></ItemRow>
              ))}
            </tbody>
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
    </div>
  );
};

export default Items;
