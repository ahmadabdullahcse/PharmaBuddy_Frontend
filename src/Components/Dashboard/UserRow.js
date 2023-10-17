import React from "react";

const UserRow = ({ user }) => {
  const getStatusStyle = (status) => {
    let style = {};
    switch (status) {
      case "Shipped":
        style.color = "blue";
        style.fontWeight = "bold";
        break;
      case "Delivered":
        style.color = "green";
        style.fontWeight = "bold";
        break;
      case "In Transit":
        style.color = "orange";
        style.fontWeight = "bold";
        break;
      case "Processing":
        style.color = "red";
        style.fontWeight = "bold";
        break;
      default:
        style.fontWeight = "bold";
    }
    return style;
  };
  return (
    <tr>
      <td className="uppercase text-lg font-bold text-left">{user.id}</td>
      <td className="font-semibold">{user.name}</td>
      <td className="font-semibold">{user.email}</td>
      <td className="font-semibold">{user.address}</td>
      <td className="font-semibold">{user.phone}</td>
      <td className="font-semibold">
        {user?.orders?.map((order, index) => (
          <div key={index}>
            Order Number: {order?.orderNumber}
            <br />
            Order Date: {order.orderDate}
            <br />
            <strong>Ordered Items:</strong>
            <ul>
              {order?.items?.map((item, itemIndex) => (
                <li key={itemIndex}>
                  Product Name: {item.productName}
                  <br />
                  Quantity: {item.quantity}
                  <br />
                  Price: {item.price}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </td>
      <td style={getStatusStyle(user?.status)} className="font-semibold">
        {user?.status}
      </td>
    </tr>
  );
};

export default UserRow;
