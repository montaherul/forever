import { assets } from "../assets/assets";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <div className="bg-gray-900 text-white mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col sm:grid grid-cols-[3fr_1fr_1fr_1fr] gap-10 md:gap-14 text-sm">
          <div>
            <div className="flex items-center gap-2 mb-5">
              <img
                src={assets.logo}
                className="w-32"
                alt="Smart Grocery Logo"
              />
              <span className="text-2xl font-poppins font-bold text-green-500">
                Foody
              </span>
            </div>
            <p className="w-full md:w-4/5 text-gray-300 leading-relaxed">
              Your trusted partner for fresh, organic groceries delivered right
              to your doorstep. We source directly from local farms to ensure
              quality and freshness in every order.
            </p>
            <div className="flex gap-4 mt-6">
              <a
                href="https://facebook.com"
                className="w-10 h-10 bg-green-600 hover:bg-green-700 rounded-full flex items-center justify-center transition-colors"
              >
                <span className="text-white text-xl">f</span>
              </a>
              <a
                href="https://instagram.com"
                className="w-10 h-10 bg-orange-500 hover:bg-orange-600 rounded-full flex items-center justify-center transition-colors"
              >
                <span className="text-white text-xl">IG</span>
              </a>
              <a
                href="https://linkedin.com"
                className="w-10 h-10 bg-blue-600 hover:bg-blue-700 rounded-full flex items-center justify-center transition-colors"
              >
                <span className="text-white text-xl">in</span>
              </a>
            </div>
          </div>
          <div>
            <p className="text-lg font-poppins font-semibold mb-5 text-green-400">
              Quick Links
            </p>
            <ul className="flex flex-col gap-2 text-gray-300">
              <li className="hover:text-green-400 cursor-pointer transition-colors">
                <Link to="/">Home</Link>
              </li>
              <li className="hover:text-green-400 cursor-pointer transition-colors">
                <Link to="/collection">Products</Link>
              </li>
              <li className="hover:text-green-400 cursor-pointer transition-colors">
                <Link to="/about">About Us</Link>
              </li>
              <li className="hover:text-green-400 cursor-pointer transition-colors">
                <Link to="/contact">Contact</Link>
              </li>
            </ul>
          </div>
          <div>
            <p className="text-lg font-poppins font-semibold mb-5 text-green-400">
              Categories
            </p>
            <ul className="flex flex-col gap-2 text-gray-300">
              <li className="hover:text-green-400 cursor-pointer transition-colors">
                Fresh Vegetables
              </li>
              <li className="hover:text-green-400 cursor-pointer transition-colors">
                Fresh Fruits
              </li>
              <li className="hover:text-green-400 cursor-pointer transition-colors">
                Dairy Products
              </li>
              <li className="hover:text-green-400 cursor-pointer transition-colors">
                Bakery Items
              </li>
            </ul>
          </div>
          <div>
            <p className="text-lg font-poppins font-semibold mb-5 text-green-400">
              Get In Touch
            </p>
            <ul className="flex flex-col gap-2 text-gray-300">
              <li className="hover:text-green-400 transition-colors">
                +1-800-GROCERY
              </li>
              <li className="hover:text-green-400 transition-colors">
                support@smartgrocery.com
              </li>
              <li className="hover:text-green-400 transition-colors">
                123 Fresh St, Farm City
              </li>
              <li className="hover:text-green-400 transition-colors">
                Mon-Sun: 6AM - 10PM
              </li>
            </ul>
          </div>
        </div>
        <hr className="border-gray-700 my-8" />
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-gray-400">
            © 2026 Smart Grocery. All rights reserved. Powered by fresh ideas.
          </p>
          <div className="flex gap-4 text-sm text-gray-400">
            <Link
              to="/privacy"
              className="hover:text-green-400 transition-colors"
            >
              Privacy Policy
            </Link>
            <span>|</span>
            <Link
              to="/terms"
              className="hover:text-green-400 transition-colors"
            >
              Terms of Service
            </Link>
            <span>|</span>
            <Link
              to="/delivery"
              className="hover:text-green-400 transition-colors"
            >
              Delivery Info
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
