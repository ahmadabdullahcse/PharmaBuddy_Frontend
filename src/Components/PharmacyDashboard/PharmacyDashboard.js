import React, { useState } from "react";
import { Link, Outlet } from "react-router-dom";
import ban1 from "../../images/banner/purchase-order.png";

const PharmacyDashboard = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  return (
    <div>
      <div className={`drawer ${isSidebarOpen ? "lg:drawer-open" : ""}`}>
        <input
          id="dashboard-drawer"
          type="checkbox"
          className="drawer-toggle"
        />
        <div className="drawer-content  p-11">
          {/* Page content here */}
          <Outlet />
          <label
            htmlFor="dashboard-drawer"
            className="btn btn-primary btn-sm drawer-button lg:hidden"
          >
            open drawer
          </label>
        </div>
        <div className="drawer-side">
          <label
            htmlFor="dashboard-drawer"
            aria-label="close sidebar"
            className="drawer-overlay"
          ></label>
          <ul className="menu p-4 w-64 min-h-full bg-accent text-base-content">
            {/* Sidebar content here */}
            <Link
              className="text-primary mt-16 mx-8 text-lg mb-4 font-bold hover:text-black "
              to="/pharmacySignupDashboard"
            >
              <span className="flex gap-4">
                <img className="w-6" src={ban1} alt="" />
                Add Medicine
              </span>
            </Link>{" "}
            <Link
              className="text-primary mx-8 text-lg mb-4 font-bold hover:text-black "
              to="/pharmacySignupDashboard/allMedicine"
            >
              <span className="flex gap-4">
                <img className="w-6" src={ban1} alt="" />
                Medicines
              </span>
            </Link>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default PharmacyDashboard;
