import React, { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  PieChart,
  Pie,
  Cell,
} from "recharts";

const AdminDashboard = () => {
  const [products, setProducts] = useState([]);
  const [users, setUsers] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [feedback, setFeedback] = useState([]);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    // Fetch products data from 'service.json'
    fetch("/service.json")
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);
      });

    // Fetch users data from 'users.json'
    fetch("/users.json")
      .then((res) => res.json())
      .then((data) => {
        setUsers(data);
      });

    // Fetch reviews data from 'review.json'
    fetch("/review.json")
      .then((res) => res.json())
      .then((data) => {
        setReviews(data);
      });
  }, []);

  useEffect(() => {
    const feedbackData = [
      {
        id: 1,
        user: "User 1",
        feedback: "Excellent service!",
      },
      {
        id: 2,
        user: "User 2",
        feedback: "Great experience with this website.",
      },
    ];
    setFeedback(feedbackData);

    // Hardcoded values for order summary
    const orderSummaryData = [
      {
        id: 1,
        user: "User 1",
        orderDate: "2023-05-01",
        totalAmount: 120.0,
      },
      {
        id: 2,
        user: "User 2",
        orderDate: "2023-05-02",
        totalAmount: 75.0,
      },
    ];
    setOrders(orderSummaryData);
  }, []);

  // Process data for the sales chart
  const salesData = products.map((product) => ({
    category: product.category,
    sales: product.quantity,
  }));

  // Process data for the product category distribution chart
  const productCategoryData = products.reduce((acc, product) => {
    const category = product.category;
    if (category in acc) {
      acc[category] += 1;
    } else {
      acc[category] = 1;
    }
    return acc;
  }, {});

  // Convert the productCategoryData object into an array of objects for the PieChart
  const productCategoryChartData = Object.keys(productCategoryData).map(
    (category) => ({
      name: category,
      value: productCategoryData[category],
    })
  );

  const COLORS = ["#FF5733", "#337DFF", "#33FF58", "#A133FF", "#FFD133"];

  return (
    <div className="bg-gray-100 p-3 min-h-screen">
      <div className="bg-white shadow-lg p-6 rounded-lg m-4">
        <h1
          style={{ fontFamily: "rockwell" }}
          className="text-center text-2xl text-primary font-bold"
        >
          Admin Dashboard
        </h1>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
        {/* Sales Overview */}
        <div className="bg-accent border-2 border-secondary shadow-lg p-3 rounded-lg">
          <h3 className="text-lg font-semibold text-center text-primary">
            Sales Overview
          </h3>
          <BarChart className="mt-5" width={300} height={300} data={salesData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="category" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="sales" fill="#007d2f" />
          </BarChart>
        </div>

        {/* Product Category Distribution */}
        <div className="bg-accent border-2 border-secondary shadow-lg p-3 rounded-lg">
          <h3 className="text-lg font-semibold text-center text-primary">
            Product Category Distribution
          </h3>
          <PieChart className="mt-5" width={340} height={300}>
            <Pie
              dataKey="value"
              data={productCategoryChartData}
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={100}
              fill="#8884d8"
              label
            >
              {productCategoryChartData.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </div>

        {/* Customer Management */}
        <div className="bg-accent border-2 border-secondary shadow-lg p-6 rounded-lg">
          <h3 className="text-lg font-semibold text-center text-primary">
            Customer Management
          </h3>
          <p className="text-black mt-5">Total Customers: {users.length}</p>
          <p className="text-black">Total Reviews: {reviews.length}</p>
        </div>
      </div>{" "}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4 p-4">
        {/* Feedback Section */}
        <div className="bg-accent border-2 border-secondary shadow-lg p-6 rounded-lg">
          <h3 className="text-lg font-semibold text-gray-800">Feedback</h3>
          <div className="mt-4">
            {feedback.map((item) => (
              <div key={item.id} className="border-b border-gray-200 py-2">
                <p className="text-gray-600 text-sm font-semibold">
                  {item.user}
                </p>
                <p className="text-gray-800">{item.feedback}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Order Summary Section */}
        <div className="bg-accent border-2 border-secondary shadow-lg p-6 rounded-lg">
          <h3 className="text-lg font-semibold text-gray-800">Order Summary</h3>
          <div className="mt-4">
            {orders.map((order) => (
              <div key={order.id} className="border-b border-gray-200 py-2">
                <p className="text-gray-600 text-sm font-semibold">
                  {order.user}
                </p>
                <p className="text-gray-800">
                  Date: {order.orderDate}, Total Amount: ${order.totalAmount}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
