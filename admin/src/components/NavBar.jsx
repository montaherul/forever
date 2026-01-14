import PropTypes from "prop-types";
import { assets } from "../assets/assets";

const NavBar = ({ setToken }) => {
  return (
    <div className="flex items-center py-4 px-[4%] justify-between bg-gradient-to-r from-green-600 to-green-700 shadow-lg border-b border-green-800">
      <div className="flex items-center gap-3">
        <img
          className="w-[max(10%,70px)]"
          src={assets.logo}
          alt="Smart Grocery Admin"
        />
        <div>
          <h1 className="text-xl font-poppins font-bold text-white">
            Forever Foody Admin
          </h1>
          <p className="text-xs text-green-100">Management Dashboard</p>
        </div>
      </div>
      <button
        onClick={() => setToken("")}
        className="bg-white hover:bg-gray-100 text-green-700 px-6 py-2.5 sm:px-8 sm:py-2.5 rounded-lg text-xs sm:text-sm font-semibold transition-all shadow-md hover:shadow-lg"
      >
        Logout
      </button>
    </div>
  );
};

NavBar.propTypes = {
  setToken: PropTypes.func.isRequired,
};

export default NavBar;
