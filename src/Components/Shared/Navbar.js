import React from "react";
import avatar from "../../images/banner/avatar.png";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setSearch } from "../../redux/Slices/SearchSlice";
import { useAuthState } from "react-firebase-hooks/auth";
import auth from "../../firebase.init";
import { signOut } from "firebase/auth";

const Navbar = () => {
  const [user] = useAuthState(auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const logout = () => {
    localStorage.removeItem("userRole");
    signOut(auth);
    navigate("/");
  };
  const userRole = localStorage.getItem("userRole");

  return (
    <div className="navbar bg-primary">
      <div className="flex-1">
        <Link
          className="btn btn-ghost font-bold normal-case text-base-100 text-xl"
          to="/"
        >
          Pharma Buddy
        </Link>
      </div>

      {/* customer dashboard for large screens (lg) */}
      <div className="hidden lg:flex">
        {userRole === "admin" && (
          <Link
            className="mx-3 font-extrabold normal-case text-base-100 hover-text-secondary text-md"
            to="/adminDashboard"
          >
            DASHBOARD
          </Link>
        )}
        {userRole === "user" && (
          <Link
            className="mx-3 font-extrabold normal-case text-base-100 hover-text-secondary text-md"
            to="/userDashboard"
          >
            USER-DASHBOARD
          </Link>
        )}
      </div>
      {/* customer dashboard for large screens (lg) */}
      <div className="hidden lg:flex">
        <Link
          className="mx-3 font-extrabold normal-case text-base-100 hover:text-secondary text-md"
          to="/feedback"
        >
          FEEDBACK
        </Link>
        <Link
          className="mx-3 font-extrabold normal-case text-base-100 hover:text-secondary text-md"
          to="/products"
        >
          PRODUCTS
        </Link>
      </div>

      {/* Search input for all screen sizes */}
      <div className="form-control">
        <input
          type="search"
          name="search"
          id=""
          placeholder="Search here"
          autoComplete="off"
          onChange={(e) => dispatch(setSearch(e.target.value))}
          className="p-3 border border-gray-400 input-sm rounded-lg outline-none"
        />
      </div>
      {/* Create a dropdown for small and medium screens */}
      <div className="dropdown dropdown-end md:hidden">
        <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
          <div className="w-10 rounded-full">
            <img src={avatar} alt="" />
          </div>
        </label>
        <ul
          tabIndex={0}
          className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-primary rounded-box w-52"
        >
          <li>
            <Link
              to="/products"
              className="text-base-100 font-bold hover:text-black"
            >
              <div className="indicator">Products</div>
            </Link>
          </li>
          <li>
            <Link
              to="/feedback"
              className="text-base-100 font-bold hover:text-black"
            >
              <div className="indicator">Feedback</div>
            </Link>
          </li>
          <li>
            {userRole === "user" ? (
              <Link
                to="/userDashboard"
                className="text-base-100 font-bold hover:text-black"
              >
                <div className="indicator">Profile</div>
              </Link>
            ) : (
              <></>
            )}
          </li>
          <li>
            {userRole === "admin" ? (
              <Link
                to="/adminDashboard"
                className="text-base-100 font-bold hover:text-black"
              >
                <div className="indicator">Dashboard</div>
              </Link>
            ) : (
              <></>
            )}
          </li>
          <li>
            {user ? (
              <button
                onClick={logout}
                className="text-base-100 font-bold hover:text-black pr-7"
              >
                <div className="indicator">Signout</div>
              </button>
            ) : (
              <Link to="/login">
                <button className="text-base-100 font-bold hover:text-black pr-7">
                  <div className="indicator">Login</div>
                </button>
              </Link>
            )}
          </li>
        </ul>
      </div>

      {/* Avatar dropdown for large screens */}
      <div className="dropdown dropdown-end hidden md:block">
        <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
          <div className="w-10 rounded-full">
            <img src={avatar} alt="" />
          </div>
        </label>
        <ul
          tabIndex={0}
          className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-primary rounded-box w-52"
        >
          <li>
            {userRole === "user" ? (
              <Link
                to="/userDashboard"
                className="text-base-100 font-bold hover:text-black"
              >
                <div className="indicator">Profile</div>
              </Link>
            ) : (
              <></>
            )}
          </li>
          <li>
            {userRole === "admin" ? (
              <Link
                to="/adminDashboard"
                className="text-base-100 font-bold hover:text-black"
              >
                <div className="indicator">Dashboard</div>
              </Link>
            ) : (
              <></>
            )}
          </li>
          <li>
            {user ? (
              <button
                onClick={logout}
                className="text-base-100 font-bold hover:text-black pr-7"
              >
                <div className="indicator">Signout</div>
              </button>
            ) : (
              <Link to="/login">
                <button className="text-base-100 font-bold hover:text-black pr-7">
                  <div className="indicator">Login</div>
                </button>
              </Link>
            )}
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
