import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { ToastContainer, toast } from "react-toastify";
import auth from "../../firebase.init";

const UserDashboard = () => {
  const [user] = useAuthState(auth);
  const [loggedUser, setLoggedUser] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editedUserData, setEditedUserData] = useState({});
  const [toastId, setToastId] = useState(null);

  useEffect(() => {
    if (user) {
      fetch(`http://localhost:5000/customer?email=${user.email}`)
        .then((res) => res.json())
        .then((data) => {
          if (data.length > 0) {
            const matchingUser = data.find(
              (userData) => userData.email === user.email
            );
            if (matchingUser) {
              setLoggedUser(matchingUser);
            }
          }
        });
    }
  }, [user]);
  console.log(loggedUser);

  const handleSaveClick = () => {
    // Create a new object with only the changed fields
    const changedFields = {};
    Object.keys(editedUserData).forEach((key) => {
      if (editedUserData[key] !== loggedUser[key]) {
        changedFields[key] = editedUserData[key];
      }
    });

    fetch(`http://localhost:5000/updateUser/${loggedUser._id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(changedFields),
    })
      .then((response) => response.json())
      .then((data) => {
        toast("User updated successfully", {
          type: toast.TYPE.SUCCESS,
        });
        setIsEditing(false);
      })
      .catch((error) => {
        console.error("Error updating user:", error);
        toast.error("Error updating user");
      });
  };

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleCancelClick = () => {
    setIsEditing(false);
    setEditedUserData(loggedUser);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleSaveClick();
  };

  return (
    <div className="bg-gray-100 min-h-screen p-4">
      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg p-6">
        <h1
          style={{ fontFamily: "rockwell" }}
          className="text-center text-2xl text-primary font-bold"
        >
          User Dashboard
        </h1>

        <div className="flex justify-center items-center mt-5">
          <button
            className="btn btn-sm text-xs border-secondary text-accent font-bold bg-primary mx-4"
            onClick={isEditing ? handleSaveClick : handleEditClick}
          >
            {isEditing ? "Save" : "Update"}
          </button>
          {isEditing && (
            <button
              onClick={handleCancelClick}
              className="btn btn-sm text-xs border-secondary text-accent font-bold bg-primary mx-4"
            >
              Cancel
            </button>
          )}
        </div>
      </div>
      {/* grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 */}
      <div className="mt-4 flex justify-center items-center">
        <div className="bg-white shadow-lg p-6 rounded-lg">
          <h3 className="text-lg font-bold text-primary">User Profile</h3>
          <div className="flex items-center mt-4">
            {console.log(loggedUser)}
            <img
              src={loggedUser?.img}
              alt={loggedUser?.name}
              className="w-16 h-16 rounded-full mr-4"
            />
            <div>
              <p className="text-primary">Name: {loggedUser?.name}</p>
              <p className="text-primary">Email: {loggedUser?.email}</p>
              <p className="text-primary">Phone: {loggedUser?.phone}</p>
              <p className="text-primary">Address: {loggedUser?.address}</p>
            </div>
          </div>
        </div>

        {/* <div className="bg-white shadow-lg p-6 rounded-lg">
          <h3 className="text-lg font-bold text-primary">Order Summary</h3>
          {loggedUser?.orders?.map((order, index) => (
            <div key={index} className="mt-4">
              <p className="text-primary">Order Number: {order?.orderNumber}</p>
              <p className="text-primary">Order Date: {order.orderDate}</p>
              <p className="text-primary">
                Product: {order?.items[0].productName}
              </p>
              <p className="text-primary">
                Quantity: {order?.items[0].quantity}
              </p>
              <p className="text-primary">
                Price: ${order?.items[0].price.toFixed(2)}
              </p>
            </div>
          ))}
        </div> */}

        {/* <div className="bg-white shadow-lg p-6 rounded-lg">
          <h3 className="text-lg font-bold text-primary">Order Status</h3>
          <p className="text-primary mt-4">Status: {loggedUser?.status}</p>
        </div> */}
      </div>
      {isEditing && (
        <div className="lg:max-w-6xl mx-auto bg-white shadow-lg rounded-lg p-6 mt-4">
          {/* Update Form */}
          <form onSubmit={handleSubmit}>
            <div className="grid lg:grid-cols-2 gap-5">
              {/* Address */}
              <div className="form-control w-full">
                <label className="label">
                  <span className="label-text text-primary font-bold text-md">
                    Address
                  </span>
                </label>
                <input
                  type="text"
                  placeholder="Your Address"
                  name="address"
                  value={editedUserData.address}
                  onChange={(e) =>
                    setEditedUserData({
                      ...editedUserData,
                      address: e.target.value,
                    })
                  }
                  className="input input-sm input-bordered w-full "
                />
              </div>
              {/* Phone */}
              <div className="form-control w-full">
                <label className="label">
                  <span className="label-text text-primary font-bold text-md">
                    Phone
                  </span>
                </label>
                <input
                  type="text"
                  placeholder="Your phone"
                  name="phone"
                  value={editedUserData.phone}
                  onChange={(e) =>
                    setEditedUserData({
                      ...editedUserData,
                      phone: e.target.value,
                    })
                  }
                  className="input input-sm input-bordered w-full "
                />
              </div>
            </div>
            <div className="flex justify-center items-center">
              <input
                className="btn btn-sm text-xs w-1/6 mt-5 border-secondary text-accent font-bold bg-primary"
                value="UPDATE"
                type="submit"
              />
            </div>
          </form>
        </div>
      )}
      <ToastContainer
        position={toast.POSITION.TOP_RIGHT}
        autoClose={3000}
        closeOnClick={true}
        hideProgressBar={false}
        draggable={true}
        pauseOnHover={true}
        toastId={toastId}
      />
    </div>
  );
};

export default UserDashboard;
