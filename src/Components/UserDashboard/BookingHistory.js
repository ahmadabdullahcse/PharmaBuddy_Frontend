import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import auth from "../../firebase.init";

const BookingHistory = () => {
  const [user] = useAuthState(auth);
  const [loggedUser, setLoggedUser] = useState([]);

  useEffect(() => {
    if (user) {
      fetch(`/users.json?email=${user.email}`)
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
  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h3 className="text-2xl font-semibold text-primary mb-4">
        Booking History
      </h3>
      {loggedUser?.orders?.map((order, index) => (
        <div
          key={order.orderNumber}
          className="bg-accent border border-secondary rounded-md p-4 mb-4"
        >
          <div className="flex justify-between items-center">
            <div>
              <p className="text-lg font-semibold">
                {order.items[0].productName}
              </p>
              <p className="text-sm text-gray-500">{order.orderDate}</p>
            </div>
            <p className="text-lg font-semibold text-primary">
              ${order.items[0].price.toFixed(2)}
            </p>
          </div>
          <div className="mt-2">
            <p className="text-sm text-gray-500">
              Order Number: {order.orderNumber}
            </p>
            <p className="text-sm text-gray-500">
              Quantity: {order.items[0].quantity}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default BookingHistory;
