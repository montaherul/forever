import React, { useState } from "react";
import axios from "axios";
import { backendUrl } from "../App";
import { toast } from "react-toastify";

const Login = ({ setToken }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const onSubmitHandler = async (e) => {
    try {
      e.preventDefault();
      setLoading(true);
      const response = await axios.post(backendUrl + "/api/user/admin", {
        email,
        password,
      });
      if (response.data.success) {
        setToken(response.data.token);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center w-full bg-gradient-to-br from-green-50 via-white to-green-50">
      <div className="w-full max-w-md">
        {/* Logo/Header */}
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-green-600 to-green-700 flex items-center justify-center shadow-lg">
              <span className="text-3xl">🥬</span>
            </div>
          </div>
          <h1 className="text-3xl font-bold text-gray-900">Admin Panel</h1>
          <p className="text-gray-600 mt-2">Smart Grocery Management</p>
        </div>

        {/* Login Form */}
        <div className="bg-white shadow-xl rounded-2xl px-8 py-8 border border-green-100">
          <form onSubmit={onSubmitHandler}>
            <div className="mb-6">
              <label className="text-sm font-semibold text-gray-700 mb-2 block">
                Email Address
              </label>
              <input
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-green-600 focus:ring-2 focus:ring-green-200 transition-all"
                type="email"
                placeholder="admin@example.com"
                required
              />
            </div>

            <div className="mb-8">
              <label className="text-sm font-semibold text-gray-700 mb-2 block">
                Password
              </label>
              <input
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-green-600 focus:ring-2 focus:ring-green-200 transition-all"
                type="password"
                placeholder="Enter your password"
                required
              />
            </div>

            <button
              className="w-full py-3 px-4 rounded-lg text-white font-semibold bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 transition-all shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
              type="submit"
              disabled={loading}
            >
              {loading ? "Logging in..." : "Login"}
            </button>
          </form>

          {/* Footer */}
          <div className="mt-6 pt-6 border-t border-gray-200">
            <p className="text-center text-xs text-gray-600">
              Secure Admin Access Only
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
