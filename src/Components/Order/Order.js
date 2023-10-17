import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import ReactModal from "react-modal";
import { useAuthState } from "react-firebase-hooks/auth";
import auth from "../../firebase.init";

const Order = () => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const storedSelectedItems = JSON.parse(localStorage.getItem("selectedItems"));
  const [selectedItems, setSelectedItems] = useState(storedSelectedItems || []);
  const {
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();
  const [user] = useAuthState(auth);
  const [loggedUser, setLoggedUser] = useState([]);

  useEffect(() => {
    if (user) {
      fetch(`/allUser.json?email=${user.email}`)
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
  useEffect(() => {}, [selectedItems]);

  const placeOrder = () => {
    openModal();
  };
  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
    reset();
    navigate("/");
  };

  return (
    <div>
      <div className="lg:grid grid-cols-2">
        <div>
          <h1
            style={{ fontFamily: "rockwell" }}
            className="text-4xl font-bold text-center text-primary py-20"
          >
            Your Order
          </h1>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            {selectedItems.map((item) => (
              <div
                key={item.id}
                className="shadow-md p-3 w-52 h-64 mx-auto rounded-lg  bg-accent border-2 "
              >
                <div className="w-1/2">
                  <img
                    src={item.images}
                    alt={item.title}
                    className="w-20 h-28 border-2 border-secondary"
                  />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-black mb-2">
                    {item.title}
                  </h3>
                  <p className="text-primary font-bold">Price: ${item.price}</p>
                  <p className="text-primary font-bold">Quantity: {item.qty}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div>
          <div className="mx-auto pt-16 max-w-md">
            <div className="card bg-accent border-secondary shadow-xl">
              <div>
                <div className="card-body">
                  <h1
                    style={{ fontFamily: "rockwell" }}
                    className="text-center text-2xl text-primary font-extrabold uppercase"
                  >
                    confirm Order
                  </h1>
                  <form onSubmit={handleSubmit(placeOrder)}>
                    {/* email field */}
                    <div className="form-control w-full">
                      <label className="label">
                        <span className="label-text text-primary font-bold text-md">
                          Email
                        </span>
                      </label>
                      <input
                        type="email"
                        value={loggedUser?.email}
                        placeholder="Your email"
                        name="email"
                        className="input input-sm input-bordered w-full "
                      />
                    </div>

                    {/* contact field */}
                    <div className="form-control w-full">
                      <label className="label">
                        <span className="label-text text-primary font-bold text-md">
                          Contact
                        </span>
                      </label>
                      <input
                        type="digit"
                        required
                        placeholder="Your Contact number"
                        name="contact"
                        className="input input-sm input-bordered w-full "
                      />
                    </div>
                    {/* address */}
                    <div className="form-control w-full">
                      <label className="label">
                        <span className="label-text text-primary font-bold text-md">
                          Address
                        </span>
                      </label>
                      <input
                        type="text"
                        value={loggedUser?.address}
                        placeholder="Your address"
                        name="address"
                        className="input input-md input-bordered w-full"
                      />
                    </div>
                    {/* Alternate address */}
                    <div className="form-control w-full">
                      <label className="label">
                        <span className="label-text text-primary font-bold text-md">
                          Alternate address
                        </span>
                      </label>
                      <input
                        type="text"
                        placeholder="Your address"
                        name="address"
                        className="input input-md input-bordered w-full"
                      />
                    </div>
                    <p className="text-center my-3">
                      <small className="font-semibold">
                        <Link className="text-primary" to="/register">
                          Terms and policy
                        </Link>
                      </small>
                    </p>
                    <div className="flex items-center justify-center">
                      <input
                        className="btn btn-sm text-xs w-1/2 border-secondary text-accent font-bold bg-primary"
                        value="PLACE ORDER"
                        type="submit"
                      />
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div>
        <div>
          {/* <button onClick={openModal}>Open Modal</button> */}
          <ReactModal
            isOpen={modalIsOpen}
            contentLabel="Order Confirmation"
            style={{
              overlay: {
                backgroundColor: "rgba(0, 0, 0, 0.5)",
              },
              content: {
                width: "420px",
                height: "200px",
                margin: "auto",
              },
            }}
          >
            <h1
              style={{ fontFamily: "rockwell" }}
              className="text-4xl font-bold text-center text-primary"
            >
              Thank you for your order!
            </h1>
            <div className="mt-12 flex justify-center items-center">
              <button
                className="btn btn-sm text-xs w-1/2 border-secondary text-accent font-bold bg-primary"
                onClick={closeModal}
              >
                Close
              </button>
            </div>
          </ReactModal>
        </div>
      </div>
    </div>
  );
};

export default Order;
