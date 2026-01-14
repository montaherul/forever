import React, { useEffect, useState } from "react";
import axios from "axios";
import { backendUrl } from "../App";
import { toast } from "react-toastify";

const Coupons = ({ token }) => {
  const [code, setCode] = useState("");
  const [discountPercent, setDiscountPercent] = useState(10);
  const [minPurchase, setMinPurchase] = useState(0);
  const [expiresAt, setExpiresAt] = useState("");
  const [usageLimit, setUsageLimit] = useState("");
  const [coupons, setCoupons] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchCoupons = async () => {
    try {
      const res = await axios.get(`${backendUrl}/api/coupon/list`, {
        headers: { token },
      });
      if (res.data.success) {
        setCoupons(res.data.coupons || []);
      } else {
        toast.error(res.data.message || "Failed to load coupons");
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to load coupons");
    }
  };

  useEffect(() => {
    fetchCoupons();
  }, []);

  const onCreate = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axios.post(
        `${backendUrl}/api/coupon/create`,
        {
          code,
          discountPercent,
          minPurchase,
          expiresAt: expiresAt || undefined,
          usageLimit: usageLimit || undefined,
        },
        { headers: { token } }
      );
      if (res.data.success) {
        toast.success("Coupon created");
        setCode("");
        setDiscountPercent(10);
        setMinPurchase(0);
        setExpiresAt("");
        setUsageLimit("");
        fetchCoupons();
      } else {
        toast.error(res.data.message || "Failed to create coupon");
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to create coupon");
    } finally {
      setLoading(false);
    }
  };

  const onRemove = async (id) => {
    if (!window.confirm("Delete this coupon?")) return;
    try {
      const res = await axios.post(
        `${backendUrl}/api/coupon/remove`,
        { id },
        { headers: { token } }
      );
      if (res.data.success) {
        toast.success("Coupon removed");
        setCoupons((prev) => prev.filter((c) => c._id !== id));
      } else {
        toast.error(res.data.message || "Failed to remove coupon");
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to remove coupon");
    }
  };

  return (
    <div className="space-y-8">
      <div className="bg-white p-6 rounded-2xl shadow-lg border-2 border-green-100">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Create Coupon</h2>
        <form
          onSubmit={onCreate}
          className="grid grid-cols-1 md:grid-cols-2 gap-4"
        >
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Code
            </label>
            <input
              value={code}
              onChange={(e) => setCode(e.target.value.toUpperCase())}
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-green-600 focus:outline-none"
              placeholder="SAVE10"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Discount (%)
            </label>
            <input
              type="number"
              min="1"
              max="100"
              value={discountPercent}
              onChange={(e) =>
                setDiscountPercent(
                  Math.max(1, Math.min(100, Number(e.target.value)))
                )
              }
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-green-600 focus:outline-none"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Min Purchase ($)
            </label>
            <input
              type="number"
              min="0"
              value={minPurchase}
              onChange={(e) =>
                setMinPurchase(Math.max(0, Number(e.target.value)))
              }
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-green-600 focus:outline-none"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Expires At
            </label>
            <input
              type="date"
              value={expiresAt}
              onChange={(e) => setExpiresAt(e.target.value)}
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-green-600 focus:outline-none"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Usage Limit (optional)
            </label>
            <input
              type="number"
              min="1"
              value={usageLimit}
              onChange={(e) => setUsageLimit(e.target.value)}
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-green-600 focus:outline-none"
              placeholder="Leave blank for unlimited"
            />
          </div>
          <div className="flex items-end">
            <button
              type="submit"
              disabled={loading}
              className="w-full md:w-auto px-6 py-3 bg-green-600 hover:bg-green-700 text-white font-bold rounded-lg shadow-md disabled:opacity-60"
            >
              {loading ? "Saving..." : "Save Coupon"}
            </button>
          </div>
        </form>
      </div>

      <div className="bg-white p-6 rounded-2xl shadow-lg border-2 border-gray-100">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">
          Active Coupons
        </h2>
        {coupons.length === 0 ? (
          <p className="text-gray-600">No coupons yet.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm">
              <thead>
                <tr className="text-left text-gray-600 border-b">
                  <th className="py-2 pr-4">Code</th>
                  <th className="py-2 pr-4">Discount</th>
                  <th className="py-2 pr-4">Min Purchase</th>
                  <th className="py-2 pr-4">Expires</th>
                  <th className="py-2 pr-4">Usage</th>
                  <th className="py-2 pr-4">Status</th>
                  <th className="py-2 pr-4"></th>
                </tr>
              </thead>
              <tbody>
                {coupons.map((c) => (
                  <tr key={c._id} className="border-b last:border-0">
                    <td className="py-2 pr-4 font-semibold">{c.code}</td>
                    <td className="py-2 pr-4">{c.discountPercent}%</td>
                    <td className="py-2 pr-4">${c.minPurchase || 0}</td>
                    <td className="py-2 pr-4">
                      {c.expiresAt
                        ? new Date(c.expiresAt).toLocaleDateString()
                        : "-"}
                    </td>
                    <td className="py-2 pr-4">
                      {c.usageLimit
                        ? `${c.usageCount || 0}/${c.usageLimit}`
                        : "∞"}
                    </td>
                    <td className="py-2 pr-4">
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-semibold ${
                          c.active
                            ? "bg-green-100 text-green-700"
                            : "bg-gray-200 text-gray-700"
                        }`}
                      >
                        {c.active ? "Active" : "Inactive"}
                      </span>
                    </td>
                    <td className="py-2 pr-4">
                      <button
                        onClick={() => onRemove(c._id)}
                        className="text-red-600 hover:text-red-800 font-semibold"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default Coupons;
