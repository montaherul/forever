import React, { useState, useEffect } from "react";
import axios from "axios";
import { backendUrl, currency } from "../App";
import { toast } from "react-toastify";
import { assets } from "../assets/assets";

const Orders = ({ token }) => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchAllOrders = async () => {
    if (!token) return;

    try {
      setLoading(true);
      const response = await axios.post(
        `${backendUrl}/api/order/list`,
        {},
        { headers: { token } }
      );
      if (response.data.success) {
        setOrders(response.data.orders);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const statusHandler = async (event, orderId) => {
    try {
      const response = await axios.post(
        `${backendUrl}/api/order/status`,
        { orderId, status: event.target.value },
        { headers: { token } }
      );
      if (response.data.success) {
        toast.success("Order status updated successfully");
        await fetchAllOrders();
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to update status");
    }
  };

  useEffect(() => {
    fetchAllOrders();
  }, [token]);

  const getStatusColor = (status) => {
    const colors = {
      "Order Placed": "bg-blue-100 text-blue-700 border-blue-300",
      Packing: "bg-yellow-100 text-yellow-700 border-yellow-300",
      Shipped: "bg-purple-100 text-purple-700 border-purple-300",
      "Out for delivery": "bg-orange-100 text-orange-700 border-orange-300",
      Delivered: "bg-green-100 text-green-700 border-green-300",
    };
    return colors[status] || "bg-gray-100 text-gray-700";
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-96">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-green-200 border-t-green-600 rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600 font-medium">Loading orders...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6">
      {/* Header */}
      <div className="mb-6 pb-6 border-b-2 border-green-100">
        <h2 className="text-3xl font-bold text-gray-900 mb-1">
          🛒 Orders Management
        </h2>
        <p className="text-gray-600">
          Track and manage customer orders ({orders.length} total)
        </p>
      </div>

      {orders.length > 0 ? (
        <div className="space-y-4">
          {orders.map((order, index) => (
            <div
              key={index}
              className="border-2 border-gray-200 rounded-xl p-6 hover:shadow-lg hover:border-green-300 transition-all bg-gradient-to-br from-white to-gray-50"
            >
              {/* Order Header */}
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6 pb-4 border-b border-gray-200">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0">
                    <img
                      className="w-14 h-14 rounded-lg object-contain bg-gray-100 p-2"
                      src={assets.parcel_icon}
                      alt="Parcel Icon"
                    />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">
                      Order ID: {order._id?.slice(-8)}
                    </p>
                    <p className="text-lg font-bold text-gray-900 mt-1">
                      {order.address.firstName} {order.address.lastName}
                    </p>
                    <p className="text-sm text-gray-600 mt-1">
                      📅{" "}
                      {new Date(order.date).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      })}
                    </p>
                  </div>
                </div>

                <div className="text-right">
                  <p className="text-3xl font-bold text-green-600">
                    {currency}
                    {order.amount}
                  </p>
                  <p className="text-xs text-gray-500 mt-1">Total Amount</p>
                  <div className="mt-3 flex flex-col items-end gap-1 text-sm text-gray-700">
                    {order.address?.phone && (
                      <span className="inline-flex items-center gap-2 bg-green-50 text-green-700 font-semibold px-3 py-1 rounded-lg border border-green-200">
                        ☎️ {order.address.phone}
                      </span>
                    )}
                    {order.address?.email && (
                      <span className="inline-flex items-center gap-2 bg-blue-50 text-blue-700 font-semibold px-3 py-1 rounded-lg border border-blue-200">
                        ✉️ {order.address.email}
                      </span>
                    )}
                  </div>
                </div>
              </div>

              {/* Order Content */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                {/* Items */}
                <div>
                  <h4 className="font-semibold text-gray-900 mb-3">
                    📦 Items ({order.items.length})
                  </h4>
                  <div className="space-y-2">
                    {order.items.map((item, idx) => (
                      <div
                        key={idx}
                        className="flex justify-between text-sm bg-gray-50 p-2 rounded"
                      >
                        <div>
                          <p className="font-medium text-gray-800">
                            {item.name}
                          </p>
                          <p className="text-xs text-gray-500">{item.size}</p>
                        </div>
                        <span className="font-semibold text-gray-700">
                          x{item.quantity}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Delivery Address */}
                <div>
                  <h4 className="font-semibold text-gray-900 mb-3">
                    📍 Delivery Address
                  </h4>
                  <div className="text-sm text-gray-700 bg-gray-50 p-3 rounded space-y-1">
                    <p>{order.address.street}</p>
                    <p>
                      {order.address.city}, {order.address.state}
                    </p>
                    <p>
                      {order.address.zipcode}, {order.address.country}
                    </p>
                    <p className="font-semibold mt-2 text-gray-900">
                      ☎️ {order.address.phone}
                    </p>
                  </div>
                </div>

                {/* Order Details */}
                <div>
                  <h4 className="font-semibold text-gray-900 mb-3">
                    ℹ️ Order Details
                  </h4>
                  <div className="space-y-2 text-sm bg-gray-50 p-3 rounded">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Payment Method:</span>
                      <span className="font-medium">{order.paymentMethod}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Payment Status:</span>
                      <span
                        className={`font-medium ${
                          order.payment ? "text-green-600" : "text-orange-600"
                        }`}
                      >
                        {order.payment ? "✅ Paid" : "⏳ Pending"}
                      </span>
                    </div>
                    <div className="pt-2 border-t border-gray-200">
                      <p className="text-xs text-gray-500 mb-2">Order Status</p>
                      <select
                        onChange={(event) => statusHandler(event, order._id)}
                        value={order.status}
                        className={`w-full px-3 py-2 rounded-lg font-semibold border-2 focus:outline-none transition-all ${
                          order.status === "Delivered"
                            ? "bg-green-100 border-green-500 text-green-700"
                            : "bg-yellow-100 border-yellow-500 text-yellow-700"
                        }`}
                      >
                        <option value="Order Placed">Order Placed</option>
                        <option value="Packing">Packing</option>
                        <option value="Shipped">Shipped</option>
                        <option value="Out for delivery">
                          Out for delivery
                        </option>
                        <option value="Delivered">Delivered</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>

              {/* Status Badge */}
              <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                <span
                  className={`inline-block px-4 py-2 rounded-full font-semibold text-sm border-2 ${getStatusColor(
                    order.status
                  )}`}
                >
                  {order.status === "Delivered" && "✅"}
                  {order.status === "Shipped" && "📦"}
                  {order.status === "Out for delivery" && "🚚"}
                  {order.status === "Packing" && "📍"}
                  {order.status === "Order Placed" && "✓"} {order.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <p className="text-4xl mb-3">📭</p>
          <p className="text-gray-600 font-semibold text-lg">No orders found</p>
          <p className="text-gray-500">
            Orders will appear here once customers place them
          </p>
        </div>
      )}
    </div>
  );
};

export default Orders;
