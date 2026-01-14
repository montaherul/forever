import React from "react";
import { NavLink } from "react-router-dom";
import { assets } from "../assets/assets";

const Sidebar = () => {
  return (
    <div className="w-[18%] min-h-screen border-r-2 border-green-200 bg-gradient-to-b from-green-50 to-white shadow-sm">
      <div className="flex flex-col gap-2 pt-8 pl-[20%] text-[15px]">
        <NavLink
          className={({ isActive }) =>
            `flex items-center gap-3 border-2 border-l-0 px-3 py-3 rounded-r-lg transition-all ${
              isActive
                ? "bg-green-600 text-white border-green-600 shadow-md"
                : "bg-white text-gray-700 border-green-300 hover:bg-green-100 hover:border-green-400"
            }`
          }
          to="/add"
        >
          <span className="text-xl">➕</span>
          <p className="md:block font-medium">Add Product</p>
        </NavLink>

        <NavLink
          className={({ isActive }) =>
            `flex items-center gap-3 border-2 border-l-0 px-3 py-3 rounded-r-lg transition-all ${
              isActive
                ? "bg-green-600 text-white border-green-600 shadow-md"
                : "bg-white text-gray-700 border-green-300 hover:bg-green-100 hover:border-green-400"
            }`
          }
          to="/list"
        >
          <span className="text-xl">📋</span>
          <p className="md:block font-medium">Product List</p>
        </NavLink>

        <NavLink
          className={({ isActive }) =>
            `flex items-center gap-3 border-2 border-l-0 px-3 py-3 rounded-r-lg transition-all ${
              isActive
                ? "bg-green-600 text-white border-green-600 shadow-md"
                : "bg-white text-gray-700 border-green-300 hover:bg-green-100 hover:border-green-400"
            }`
          }
          to="/coupons"
        >
          <span className="text-xl">🎟️</span>
          <p className="md:block font-medium">Coupons</p>
        </NavLink>

        <NavLink
          className={({ isActive }) =>
            `flex items-center gap-3 border-2 border-l-0 px-3 py-3 rounded-r-lg transition-all ${
              isActive
                ? "bg-green-600 text-white border-green-600 shadow-md"
                : "bg-white text-gray-700 border-green-300 hover:bg-green-100 hover:border-green-400"
            }`
          }
          to="/order"
        >
          <span className="text-xl">🛒</span>
          <p className="md:block font-medium">Orders</p>
        </NavLink>
      </div>
    </div>
  );
};

export default Sidebar;
