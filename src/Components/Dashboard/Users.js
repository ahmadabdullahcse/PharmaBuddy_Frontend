import React, { useEffect, useState } from "react";
import UserRow from "./UserRow";

const Users = () => {
  const [page, setPage] = useState(1);
  const [users, setUsers] = useState([]);
  const [itemsPerPage, setItemsPerPage] = useState(5);

  useEffect(() => {
    fetch("/users.json")
      .then((res) => res.json())
      .then((data) => {
        setUsers(data);
      });
  }, []);
  const startIndex = (page - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const usersToDisplay = users.slice(startIndex, endIndex);

  const totalPages = Math.ceil(users.length / itemsPerPage);

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
          placeholder="Search for name or address"
          className="border-2 border-secondary input-xs w-60 rounded-xl"
        />
      </div>{" "}
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
        <div>
          <table id="myTable" className="table">
            <thead>
              <tr>
                <th className="uppercase underline lg:text-lg text-primary lg:font-extrabold text-left">
                  ID
                </th>
                <th className="uppercase underline text-lg text-primary font-extrabold text-left">
                  name
                </th>
                <th className="uppercase underline text-lg text-primary font-extrabold text-left">
                  email
                </th>
                <th className="uppercase underline text-lg text-primary font-extrabold text-left">
                  address
                </th>
                <th className="uppercase underline text-lg text-primary font-extrabold text-left">
                  phone
                </th>
                <th className="uppercase underline text-lg text-primary font-extrabold pr-20 text-left">
                  orders
                </th>
                <th className="uppercase underline text-lg text-primary font-extrabold text-left">
                  status
                </th>
              </tr>
            </thead>
            {/* <tbody>
              {usersToDisplay.map((user) => (
                <UserRow key={user.id} user={user}></UserRow>
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
    </div>
  );
};

export default Users;
