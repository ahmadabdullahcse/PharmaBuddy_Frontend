import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import auth from "../../firebase.init";

const NotificationsCenter = () => {
  const [user] = useAuthState(auth);
  const [loggedUser, setLoggedUser] = useState([]);
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, "0"); // Month is 0-based, so we add 1 and format with two digits
  const day = String(today.getDate()).padStart(2, "0");

  const formattedDate = `${year}-${month}-${day}`;
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
        Notifications Center
      </h3>

      <div className="bg-accent border border-secondary rounded-md p-4 mb-4">
        <div className="flex justify-between items-center">
          <div>
            <p className="text-lg font-semibold">{loggedUser?.status}</p>
            <p className="text-sm ">Received at: {formattedDate} </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotificationsCenter;
