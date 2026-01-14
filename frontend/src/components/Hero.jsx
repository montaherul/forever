import React from "react";
import { assets } from "../assets/assets";

const Hero = () => {
  return (
    <div className="flex flex-col sm:flex-row border border-green-200 rounded-xl overflow-hidden bg-gradient-to-r from-green-50 to-yellow-50 shadow-lg my-6">
      {/* Hero Left Side */}
      <div className="w-full sm:w-1/2 flex items-center justify-center py-16 sm:py-0 px-8">
        <div className="text-gray-800">
          <div className="flex items-center gap-2">
            <p className="w-8 md:w-11 h-[3px] bg-green-600 rounded"></p>
            <p className="font-semibold text-sm md:text-base text-green-600 tracking-wide">
              EVERYTHING. FAST. RELIABLE.
            </p>
          </div>
          <h1 className="font-poppins font-bold text-4xl sm:py-3 lg:text-6xl leading-tight text-green-900">
            Groceries, Gadgets,
            <br />
            Styles in One Place
          </h1>
          <p className="text-gray-600 my-4 text-base md:text-lg">
            Daily essentials, top tech, new fashion drops — delivered quick with
            trusted support.
          </p>
          <div className="flex items-center gap-4 mt-6">
            <button className="bg-orange-500 hover:bg-orange-600 text-white font-semibold px-6 py-3 rounded-button shadow-md hover:shadow-lg transition-all">
              SHOP NOW
            </button>
            <button className="bg-white border-2 border-green-600 text-green-600 hover:bg-green-600 hover:text-white font-semibold px-6 py-3 rounded-button shadow-md transition-all">
              VIEW OFFERS
            </button>
          </div>
        </div>
      </div>
      {/* Hero Right Side */}
      <div className="w-full sm:w-1/2 relative">
        <img
          className="w-full h-full object-cover"
          src={assets.hero_img}
          alt="Fresh Groceries"
        />
        <div className="absolute bottom-4 left-4 right-4 bg-white/90 backdrop-blur-sm p-4 rounded-lg shadow-lg">
          <p className="text-sm font-medium text-gray-700">
            <span className="text-green-600 font-bold">Special Offer:</span> 20%
            off first order • Free returns on fashion • Next-day on select
            electronics
          </p>
        </div>
      </div>
    </div>
  );
};
export default Hero;
