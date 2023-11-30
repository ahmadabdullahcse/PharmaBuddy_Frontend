import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import auth from "../../firebase.init";

function OrderHistory() {
  const [user] = useAuthState(auth);
  const email = user?.email;
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await fetch(`https://pharmabuddy.onrender.com/order/${email}`);
        if (!response.ok) {
          throw new Error("Failed to fetch order history");
        }
        const data = await response.json();
        setOrders(data);
      } catch (error) {
        console.error("Error fetching order history:", error.message);
      }
    };
    fetchOrders();
  }, [email]);

  const handleReorder = (order) => {
    console.log("Reordering:", order);
  };
console.log(orders)
  return (
    <div className="container mx-auto p-4">
      <h2 className="text-3xl font-bold mb-4 text-center py-4">
        Order History
      </h2>
      <table className="table-auto w-full border">
        <thead>
          <tr className="bg-gray-200">
            <th className="border px-4 py-2">Order ID</th>
            <th className="border px-4 py-2">Products</th>
            <th className="border px-4 py-2">Action</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order._id} className="hover:bg-gray-100">
              <td className="border px-4 py-2 text-center">{order._id}</td>
              <td className="">
                <ul className="flex-col">
                  {order.products.map((product) => (
                    <li
                      key={product._id}
                      className="flex justify-center items-center border py-2"
                    >
                      {product.productDetails && product.productDetails.img && (
                        <img
                          src={product.productDetails.img}
                          alt={product.productDetails.title}
                          className="w-16 mr-2"
                        />
                      )}
                      <div>
                        {product.productDetails && (
                          <p className="text-lg font-bold">
                            {product.productDetails.title}
                          </p>
                        )}
                        {product.productDetails && (
                          <p>
                            Price: ${product.productDetails.price} (Qty:{" "}
                            {product.qty})
                          </p>
                        )}
                      </div>
                    </li>
                  ))}
                </ul>
              </td>
              <td className="border px-4 py-2 text-center">
                <button
                  onClick={() => handleReorder(order)}
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                >
                  Reorder
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default OrderHistory;
