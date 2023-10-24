import React from "react";

const UserRow = ({ user,index }) => {
  return (
    <tr>
      <td className="uppercase text-lg font-bold text-left">{index+1}</td>
      <td className="font-semibold">{user.name}</td>
      <td className="font-semibold">{user.email}</td>
      <td className="font-semibold">
        {" "}
        <img className="w-9" src={user?.img} alt="" />
      </td>
    </tr>
  );
};

export default UserRow;
