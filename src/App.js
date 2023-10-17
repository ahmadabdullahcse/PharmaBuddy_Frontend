import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Home from "./Components/Home/Home";
import Navbar from "./Components/Shared/Navbar";
import "swiper/css";
import { Route, Routes } from "react-router-dom";
import Products from "./Components/Products/Products";
import Login from "./Components/Login/Login";
import Signup from "./Components/Login/Signup";
import ProtectedRoute from "./Components/Cart/ProtectedRoute";
import Order from "./Components/Order/Order";
import Dashboard from "./Components/Dashboard/Dashboard";
import AddAdmin from "./Components/Dashboard/AddAdmin";
import AddItems from "./Components/Dashboard/AddItems";
import Items from "./Components/Dashboard/Items";
import Reviews from "./Components/Dashboard/Reviews";
import Users from "./Components/Dashboard/Users";
import Error from "./Components/Shared/Error";
import Feedback from "./Components/Feedback/Feedback";
import AdminDashboard from "./Components/Dashboard/AdminDashboard";
import UserDashboard from "./Components/UserDashboard/UserDashboard";
import DashboardPg from "./Components/UserDashboard/DashboardPg";
import BookingHistory from "./Components/UserDashboard/BookingHistory";
import NotificationsCenter from "./Components/UserDashboard/NotificationsCenter";
import RequireAuth from "./Components/Login/RequireAuth";
import TermsAndConditions from "./Components/Login/TermsAndConditions";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<Products />} />
        <Route path="/terms" element={<TermsAndConditions />} />
        <Route path="/feedback" element={<Feedback />} />
        <Route
          path="/adminDashboard"
          element={
            <RequireAuth requiredRole="admin">
              <Dashboard />
            </RequireAuth>
          }
        >
          <Route index element={<AdminDashboard />}></Route>
          <Route path="addAdmin" element={<AddAdmin />}></Route>
          <Route path="addItem" element={<AddItems />}></Route>
          <Route path="items" element={<Items />}></Route>
          <Route path="reviews" element={<Reviews />}></Route>
          <Route path="users" element={<Users />}></Route>
        </Route>{" "}
        <Route
          path="/userDashboard"
          element={
            <RequireAuth requiredRole="user">
              <DashboardPg />
            </RequireAuth>
          }
        >
          <Route index element={<UserDashboard />}></Route>
          <Route path="booking" element={<BookingHistory />}></Route>
          <Route path="notifications" element={<NotificationsCenter />}></Route>
        </Route>
        <Route path="/order" element={<ProtectedRoute element={<Order />} />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="*" element={<Error />} />
      </Routes>
      <ToastContainer />
    </>
  );
}

export default App;
