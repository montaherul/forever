import React from "react";
import { assets } from "../assets/assets";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-slate-950 text-slate-400 mt-24 border-t border-slate-800/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-y-12 gap-x-8 py-16 text-sm">
          <div>
            <h4 className="text-white font-bold mb-6 uppercase tracking-widest text-xs">
              Get to Know Us
            </h4>
            <ul className="space-y-3">
              <li>
                <Link
                  to="/about"
                  className="hover:text-emerald-400 transition-colors"
                >
                  About Foody
                </Link>
              </li>
              <li>
                <Link
                  to="/contact"
                  className="hover:text-emerald-400 transition-colors"
                >
                  Contact Us
                </Link>
              </li>
              <li>
                <Link
                  to="/careers"
                  className="hover:text-emerald-400 transition-colors"
                >
                  Careers
                </Link>
              </li>
              <li>
                <Link
                  to="/blog"
                  className="hover:text-emerald-400 transition-colors"
                >
                  Blog
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold mb-6 uppercase tracking-widest text-xs">
              Shop With Us
            </h4>
            <ul className="space-y-3">
              <li>
                <Link
                  to="/collection"
                  className="hover:text-emerald-400 transition-colors"
                >
                  All Products
                </Link>
              </li>
              <li>
                <Link
                  to="/cart"
                  className="hover:text-emerald-400 transition-colors"
                >
                  Your Cart
                </Link>
              </li>
              <li>
                <Link
                  to="/orders"
                  className="hover:text-emerald-400 transition-colors"
                >
                  Your Orders
                </Link>
              </li>
              <li>
                <Link
                  to="/wishlist"
                  className="hover:text-emerald-400 transition-colors"
                >
                  Wishlist
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold mb-6 uppercase tracking-widest text-xs">
              Payment Methods
            </h4>
            <ul className="space-y-3">
              <li className="flex items-center gap-2">
                <i className="fa-regular fa-credit-card text-emerald-500"></i>
                Credit / Debit Cards
              </li>
              <li className="flex items-center gap-2">
                <i className="fa-solid fa-bolt text-emerald-500"></i>
                UPI Payments
              </li>
              <li className="flex items-center gap-2">
                <i className="fa-solid fa-building-columns text-emerald-500"></i>
                Net Banking
              </li>
              <li className="flex items-center gap-2">
                <i className="fa-solid fa-hand-holding-dollar text-emerald-500"></i>
                Cash on Delivery
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold mb-6 uppercase tracking-widest text-xs">
              Customer Support
            </h4>
            <ul className="space-y-3">
              <li>
                <Link
                  to="/help"
                  className="hover:text-emerald-400 transition-colors"
                >
                  Help Center
                </Link>
              </li>
              <li>
                <Link
                  to="/returns"
                  className="hover:text-emerald-400 transition-colors"
                >
                  Returns
                </Link>
              </li>
              <li>
                <Link
                  to="/shipping"
                  className="hover:text-emerald-400 transition-colors"
                >
                  Shipping Info
                </Link>
              </li>
              <li>
                <Link
                  to="/track-order"
                  className="hover:text-emerald-400 transition-colors"
                >
                  Track Order
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold mb-6 uppercase tracking-widest text-xs">
              Legal
            </h4>
            <ul className="space-y-3">
              <li>
                <Link
                  to="/privacy"
                  className="hover:text-emerald-400 transition-colors"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  to="/terms"
                  className="hover:text-emerald-400 transition-colors"
                >
                  Terms of Use
                </Link>
              </li>
              <li>
                <Link
                  to="/cookies"
                  className="hover:text-emerald-400 transition-colors"
                >
                  Cookie Policy
                </Link>
              </li>
              <li>
                <Link
                  to="/security"
                  className="hover:text-emerald-400 transition-colors"
                >
                  Security
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Brand Bar */}
        <div className="border-t border-slate-800 py-10 flex flex-col md:flex-row items-center justify-between gap-8">
          <Link to="/" className="flex items-center gap-3 hover:opacity-80">
            <img
              src={assets.logo}
              alt="Foody"
              className="w-32 md:w-40 brightness-0 invert"
            />
          </Link>

          <div className="flex flex-wrap items-center justify-center gap-3 text-[11px] font-semibold uppercase tracking-wider">
            <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-slate-900 border border-slate-800">
              <i className="fa-solid fa-globe text-emerald-500"></i>
              English
            </div>
            <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-slate-900 border border-slate-800">
              <i className="fa-solid fa-dollar-sign text-emerald-500"></i>
              USD
            </div>
            <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-slate-900 border border-slate-800">
              <i className="fa-solid fa-location-dot text-emerald-500"></i>
              United States
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-slate-900 py-8 text-[11px] text-slate-500 flex flex-col md:flex-row items-center justify-between gap-4">
          <p>© 2026 ForEver, Inc. • Freshness Guaranteed.</p>
          <div className="flex items-center gap-6">
            <Link to="/terms" className="hover:text-white">
              Conditions of Use
            </Link>
            <Link to="/privacy" className="hover:text-white">
              Privacy Notice
            </Link>
            <Link to="/ads" className="hover:text-white">
              Interest-Based Ads
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
