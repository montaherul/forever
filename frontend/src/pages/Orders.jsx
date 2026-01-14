import React, { useContext, useEffect, useMemo, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import Title from "../components/Title";
import axios from "axios";
import { toast } from "react-toastify";

const Orders = () => {
  const { backendUrl, token, currency, user, navigate, authChecked } =
    useContext(ShopContext);

  const [orderData, setOrderData] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [loading, setLoading] = useState(false);

  const formatAddress = useMemo(
    () => (addressObj) => {
      if (!addressObj || typeof addressObj !== "object") return "";
      const {
        street,
        city,
        state,
        zipcode,
        country,
        phone,
        firstName,
        lastName,
      } = addressObj;
      const name = [firstName, lastName].filter(Boolean).join(" ");
      const parts = [name, street, city, state, zipcode, country]
        .filter(Boolean)
        .join(", ");
      const phoneStr = phone ? ` | Phone: ${phone}` : "";
      return `${parts}${phoneStr}`;
    },
    []
  );

  const loadOrderData = async () => {
    try {
      if (!token) {
        return null;
      }
      setLoading(true);
      const response = await axios.post(
        backendUrl + "/api/order/userorders",
        {},
        { headers: { token } }
      );
      if (response.data.success) {
        let allOrderItems = [];
        response.data.orders.map((order) => {
          order.items.map((item) => {
            item["status"] = order.status;
            item["payment"] = order.payment;
            item["paymentMethod"] = order.paymentMethod;
            item["date"] = order.date;
            item["address"] = order.address;
            allOrderItems.push(item);
          });
        });
        setOrderData(allOrderItems.reverse());
      } else {
        toast.error(response.data.message || "Failed to load orders");
      }
    } catch (error) {
      console.log(error);
      toast.error("Unable to load orders. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (token) {
      loadOrderData();
    }
  }, [token]);

  useEffect(() => {
    if (authChecked && !token) {
      navigate("/login");
    }
  }, [authChecked, token, navigate]);

  return (
    <div className="border-t pt-16 min-h-screen bg-gradient-to-br from-green-50 to-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <Title text1={"MY"} text2={"ORDERS"} />
        </div>

        {/* User Info Header */}
        {user && (
          <div className="bg-white rounded-lg shadow-md p-6 mb-8 border-l-4 border-l-green-600">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-2 font-poppins">
                  {user.name}
                </h3>
                <p className="text-gray-600 mb-1">{user.email}</p>
                {user.phone && (
                  <p className="text-gray-600 mb-1">{user.phone}</p>
                )}
                {user.address && (
                  <p className="text-gray-600">{user.address}</p>
                )}
              </div>
              <button
                onClick={() => (window.location.href = "/profile")}
                className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-button font-semibold transition-colors"
              >
                Edit Profile
              </button>
            </div>
          </div>
        )}

        {/* Orders List */}
        <div className="space-y-4">
          {loading ? (
            <div className="bg-white rounded-lg shadow-md p-12 text-center">
              <p className="text-gray-500 text-lg">Loading your orders...</p>
            </div>
          ) : orderData.length > 0 ? (
            orderData.map((item, index) => (
              <div
                key={index}
                className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
              >
                <div className="py-4 px-6 border-b border-gray-200 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                  <div className="flex items-start gap-6">
                    <img
                      className="w-20 h-20 object-cover rounded-lg border-2 border-green-200"
                      src={item.images[0]}
                      alt={item.name}
                    />
                    <div className="flex-1">
                      <p className="text-lg font-bold text-gray-900 font-poppins">
                        {item.name}
                      </p>
                      <div className="flex flex-col gap-2 mt-2 text-sm text-gray-600">
                        <div className="flex gap-6 flex-wrap">
                          <p>
                            <span className="font-semibold">Price:</span>{" "}
                            {currency}
                            {/* NEW: Show size-specific price if available */}
                            {item.sizePrice ? item.sizePrice : item.price}
                          </p>
                          <p>
                            <span className="font-semibold">Size:</span>{" "}
                            {item.size || "N/A"}
                          </p>
                          <p>
                            <span className="font-semibold">Qty:</span>{" "}
                            {item.quantity}
                          </p>
                          <p>
                            <span className="font-semibold">Size:</span>{" "}
                            {item.size}
                          </p>
                        </div>
                        <p>
                          <span className="font-semibold">Date:</span>{" "}
                          {new Date(item.date).toDateString()}
                        </p>
                        <p>
                          <span className="font-semibold">Payment:</span>{" "}
                          {item.paymentMethod}
                        </p>
                        {item.address && (
                          <p>
                            <span className="font-semibold">Delivery:</span>{" "}
                            {formatAddress(item.address)}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col gap-3 md:items-end">
                    <div className="flex items-center gap-2">
                      <span className="inline-block w-3 h-3 rounded-full bg-green-500"></span>
                      <p className="text-sm md:text-base font-semibold text-gray-700 capitalize">
                        {item.status}
                      </p>
                    </div>
                    <button
                      onClick={() =>
                        setSelectedOrder(selectedOrder === index ? null : index)
                      }
                      className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 text-sm rounded-button font-semibold transition-colors"
                    >
                      {selectedOrder === index ? "Hide Details" : "Track Order"}
                    </button>
                  </div>
                </div>

                {/* Expanded Details */}
                {selectedOrder === index && (
                  <div className="bg-green-50 px-6 py-4 border-t border-green-200">
                    <h4 className="font-bold text-gray-900 mb-3">
                      Order Details
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                      <div className="bg-white p-4 rounded-lg border border-green-200">
                        <p className="text-gray-600 mb-1">
                          <span className="font-semibold">Total Amount:</span>
                        </p>
                        <p className="text-2xl font-bold text-green-600">
                          {currency}
                          {item.price * item.quantity}
                        </p>
                      </div>
                      <div className="bg-white p-4 rounded-lg border border-green-200">
                        <p className="font-semibold text-gray-900 mb-2">
                          Status Timeline
                        </p>
                        <p className="text-gray-600">
                          Current:{" "}
                          <span className="font-semibold capitalize">
                            {item.status}
                          </span>
                        </p>
                      </div>
                      {item.address && (
                        <div className="bg-white p-4 rounded-lg border border-green-200 md:col-span-2">
                          <p className="font-semibold text-gray-900 mb-2">
                            Delivery Address
                          </p>
                          <p className="text-gray-700">{item.address}</p>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            ))
          ) : (
            <div className="bg-white rounded-lg shadow-md p-12 text-center">
              <p className="text-gray-500 text-lg mb-4">No orders yet</p>
              <button
                onClick={() => (window.location.href = "/collection")}
                className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-button font-semibold transition-colors"
              >
                Start Shopping
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Orders;
