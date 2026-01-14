import axios from "axios";
import React from "react";
import { backendUrl, currency } from "../App";
import { toast } from "react-toastify";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const List = () => {
  const [list, setList] = useState([]);
  const navigate = useNavigate();

  // Normalize pricingId to sizePricing for display
  const normalizePricing = (product) => {
    if (!product) return product;

    // If product already has sizePricing (old format), return as is
    if (product.sizePricing) {
      return product;
    }

    // If product has pricingId (new format), convert to sizePricing
    if (product.pricingId && product.pricingId.sizes) {
      const sizePricing = {};
      product.pricingId.sizes.forEach((sizeObj) => {
        sizePricing[sizeObj.size] = sizeObj.price;
      });
      return {
        ...product,
        sizePricing,
      };
    }

    // Fallback: no pricing data
    return product;
  };

  const fetchList = async () => {
    try {
      const response = await axios.get(backendUrl + "/api/product/list");
      if (response.data.success) {
        // Normalize all products for consistent display
        const normalizedProducts = response.data.products.map(normalizePricing);
        setList(normalizedProducts);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error(error.message);
    }
  };

  useEffect(() => {
    fetchList();
  }, []);

  console.log("Fetched Products:", list);

  const removeProduct = async (id) => {
    try {
      const token = localStorage.getItem("token"); // ✅ Fetch token
      if (!token) {
        toast.error("Authentication token not found");
        return;
      }

      const response = await axios.post(
        backendUrl + "/api/product/remove",
        { id },
        { headers: { token } } // ✅ Pass token properly
      );

      if (response.data.success) {
        toast.success(response.data.message);
        await fetchList();
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || error.message);
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6">
      {/* Header */}
      <div className="mb-6 pb-6 border-b-2 border-green-100">
        <h2 className="text-3xl font-bold text-gray-900 mb-1">
          📋 Product List
        </h2>
        <p className="text-gray-600">
          Manage all products across grocery, electronics, and fashion (
          {list.length} total)
        </p>
      </div>

      <div className="flex flex-col gap-2">
        {/* Desktop Table Header */}
        <div className="hidden md:grid grid-cols-[80px_1fr_120px_150px_120px] items-center py-4 px-4 bg-gradient-to-r from-green-50 to-green-100 rounded-lg border border-green-200 text-sm font-semibold text-gray-700">
          <div>Image</div>
          <div>Product Name</div>
          <div>Category</div>
          <div>Pricing Info</div>
          <div className="text-center">Actions</div>
        </div>

        {/* Product List Items */}
        {list.length > 0 ? (
          list.map((item, index) => (
            <div
              key={index}
              className="grid grid-cols-[60px_1fr_80px] md:grid-cols-[80px_1fr_120px_150px_120px] items-center gap-3 py-4 px-4 border border-gray-200 rounded-lg hover:shadow-md hover:border-green-300 transition-all bg-white"
            >
              {/* Image */}
              <div className="flex-shrink-0">
                <img
                  className="w-16 h-16 rounded-lg object-cover border border-gray-200"
                  src={
                    item.images?.[0] ||
                    "https://via.placeholder.com/64?text=No+Image"
                  }
                  alt={item.name}
                />
              </div>

              {/* Name */}
              <div className="min-w-0">
                <p className="font-semibold text-gray-900 truncate">
                  {item.name}
                </p>
                <p className="text-xs text-gray-500 hidden md:block">
                  ID: {item._id?.slice(-8)}
                </p>
              </div>

              {/* Category (mobile hidden) */}
              <div className="hidden md:block">
                <span className="inline-block bg-blue-100 text-blue-700 text-xs font-semibold px-3 py-1 rounded-full">
                  {item.category}
                </span>
              </div>

              {/* Pricing Info - NEW */}
              <div className="hidden md:block">
                <div className="space-y-1">
                  {item.sizes && item.sizes.length > 0 ? (
                    <>
                      <p className="text-xs text-gray-600 font-semibold">
                        🏷️ Base:{" "}
                        <span className="text-green-600">${item.price}</span>
                      </p>
                      <div className="flex flex-wrap gap-1">
                        {item.sizes.map((size, idx) => {
                          const sizePrice = item.sizePricing?.[size];
                          return (
                            <span
                              key={idx}
                              className="text-xs bg-green-50 text-green-700 px-2 py-1 rounded border border-green-200"
                            >
                              {size}:{" "}
                              {sizePrice ? `$${sizePrice}` : `$${item.price}`}
                            </span>
                          );
                        })}
                      </div>
                    </>
                  ) : (
                    <p className="text-lg font-bold text-green-600">
                      ${item.price}
                    </p>
                  )}
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-2 justify-end md:justify-center">
                <button
                  onClick={() => navigate("/add", { state: { product: item } })}
                  className="px-3 py-2 rounded-lg text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 transition-colors shadow-sm hover:shadow-md"
                  title="Edit product"
                >
                  ✏️ Edit
                </button>
                <button
                  onClick={() => removeProduct(item._id)}
                  className="px-3 py-2 rounded-lg text-xs font-semibold text-white bg-red-600 hover:bg-red-700 transition-colors shadow-sm hover:shadow-md"
                  title="Delete product"
                >
                  🗑️ Delete
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-12">
            <p className="text-3xl mb-2">📦</p>
            <p className="text-gray-600 font-semibold">No products found</p>
            <p className="text-gray-500 text-sm">
              Click "Add Product" to create your first item
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default List;
