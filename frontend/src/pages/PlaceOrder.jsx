import React, { useContext, useEffect, useMemo, useState } from "react";
import Title from "../components/Title";
import CartTotal from "../components/CartTotal";
import { ShopContext } from "../context/ShopContext";
import { toast } from "react-toastify";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const PlaceOrder = () => {
  const navigate = useNavigate();
  const {
    backendUrl,
    token,
    cartItems,
    setCartItems,
    calculateCartSubtotal,
    appliedCoupon,
    delivery_fee,
    products,
    user,
    authChecked,
    normalizePricing,
  } = useContext(ShopContext);

  const [method, setMethod] = useState("cod");
  const [formSubmitting, setFormSubmitting] = useState(false);
  const [addressSource, setAddressSource] = useState("primary");

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    street: "",
    city: "",
    state: "",
    zipcode: "",
    country: "",
    phone: "",
  });

  /* ===================== PREFILL ===================== */

  const applyAddressFromProfile = useMemo(
    () => (source, prev) => {
      const parts = (user?.name || "").split(" ");
      return {
        ...prev,
        firstName: prev.firstName || parts[0] || "",
        lastName: prev.lastName || parts.slice(1).join(" "),
        email: prev.email || user?.email || "",
        phone: prev.phone || user?.phone || "",
        street: user?.deliveryStreet || "",
        city: user?.deliveryCity || "",
        state: user?.deliveryState || "",
        zipcode: user?.deliveryZipcode || "",
        country: user?.deliveryCountry || "",
      };
    },
    [user],
  );

  useEffect(() => {
    if (user) setFormData((p) => applyAddressFromProfile(addressSource, p));
  }, [user, addressSource, applyAddressFromProfile]);

  useEffect(() => {
    if (authChecked && !token) navigate("/login");
  }, [authChecked, token, navigate]);

  const onChangeHandler = (e) =>
    setFormData((p) => ({ ...p, [e.target.name]: e.target.value }));

  /* ===================== SUBMIT ===================== */

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    setFormSubmitting(true);

    try {
      let orderItems = [];

      Object.keys(cartItems).forEach((id) => {
        Object.keys(cartItems[id]).forEach((size) => {
          if (cartItems[id][size] > 0) {
            let product = normalizePricing(products.find((p) => p._id === id));
            if (product) {
              orderItems.push({
                ...product,
                size,
                quantity: cartItems[id][size],
                sizePrice: product.sizePricing?.[size] || product.price,
              });
            }
          }
        });
      });

      const subtotal = calculateCartSubtotal();
      const couponSavings = appliedCoupon
        ? (appliedCoupon.discountPercent / 100) * subtotal
        : 0;

      const finalAmount = Math.max(0, subtotal - couponSavings) + delivery_fee;

      const orderData = {
        address: formData,
        items: orderItems,
        amount: finalAmount,
        coupon: appliedCoupon || null,
        couponSavings,
        paymentMethod: method,
      };

      const res = await axios.post(`${backendUrl}/api/order/place`, orderData, {
        headers: { token },
      });

      if (res.data.success) {
        toast.success("Order placed successfully!");
        setCartItems({});
        navigate("/orders");
      } else toast.error(res.data.message);
    } catch (err) {
      toast.error("Order failed. Try again.");
    } finally {
      setFormSubmitting(false);
    }
  };

  /* ===================== UI ===================== */

  return (
    <form onSubmit={onSubmitHandler} className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4">
        <Title text1="CHECKOUT" text2="DETAILS" />

        <div className="grid lg:grid-cols-3 gap-10 mt-10">
          {/* LEFT */}
          <div className="lg:col-span-2 space-y-10">
            {/* DELIVERY */}
            <div className="bg-white rounded-3xl shadow-lg p-8 border">
              <h2 className="text-xl font-black mb-6">Delivery Information</h2>

              <div className="grid sm:grid-cols-2 gap-4 mb-4">
                <input
                  name="firstName"
                  value={formData.firstName}
                  onChange={onChangeHandler}
                  placeholder="First name"
                  className="input"
                  required
                />
                <input
                  name="lastName"
                  value={formData.lastName}
                  onChange={onChangeHandler}
                  placeholder="Last name"
                  className="input"
                  required
                />
              </div>

              <input
                name="email"
                value={formData.email}
                onChange={onChangeHandler}
                placeholder="Email address"
                className="input mb-4"
                required
              />

              <input
                name="street"
                value={formData.street}
                onChange={onChangeHandler}
                placeholder="Street address"
                className="input mb-4"
                required
              />

              <div className="grid sm:grid-cols-2 gap-4 mb-4">
                <input
                  name="city"
                  value={formData.city}
                  onChange={onChangeHandler}
                  placeholder="City"
                  className="input"
                  required
                />
                <input
                  name="state"
                  value={formData.state}
                  onChange={onChangeHandler}
                  placeholder="State"
                  className="input"
                  required
                />
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <input
                  name="zipcode"
                  value={formData.zipcode}
                  onChange={onChangeHandler}
                  placeholder="ZIP code"
                  className="input"
                  required
                />
                <input
                  name="country"
                  value={formData.country}
                  onChange={onChangeHandler}
                  placeholder="Country"
                  className="input"
                  required
                />
              </div>
            </div>

            {/* PAYMENT */}
            <div className="bg-white rounded-3xl shadow-lg p-8 border">
              <h2 className="text-xl font-black mb-6">Payment Method</h2>

              {[
                { id: "cod", label: "Cash on Delivery" },
                { id: "bkash", label: "bKash" },
                { id: "nagad", label: "Nagad" },
              ].map((p) => (
                <button
                  type="button"
                  key={p.id}
                  onClick={() => setMethod(p.id)}
                  className={`w-full p-5 mb-3 rounded-xl border flex items-center gap-4 ${
                    method === p.id
                      ? "border-emerald-600 bg-emerald-50"
                      : "border-gray-200"
                  }`}
                >
                  <div
                    className={`w-5 h-5 rounded-full border-2 ${
                      method === p.id
                        ? "bg-emerald-600 border-emerald-600"
                        : "border-gray-400"
                    }`}
                  />
                  <span className="font-bold">{p.label}</span>
                </button>
              ))}
            </div>
          </div>
          {/* RIGHT */}
          <div className="sticky top-24 h-fit">
            <div className="bg-white rounded-[2.5rem] shadow-2xl border border-slate-100 overflow-hidden">
              {/* HEADER */}
              <div className="p-8 border-b bg-gradient-to-r from-emerald-50 to-transparent">
                <h3 className="text-xl font-black text-slate-900 tracking-tight">
                  Order Summary
                </h3>
                <p className="text-[10px] font-bold uppercase tracking-widest text-emerald-600 mt-1">
                  Final review before payment
                </p>
              </div>

              {/* CONTENT */}
              <div className="p-8 space-y-8">
                <CartTotal />

                {/* CTA */}
                <button
                  type="submit"
                  disabled={formSubmitting}
                  className="relative w-full py-5 bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 disabled:cursor-not-allowed text-white font-black rounded-2xl shadow-xl shadow-emerald-600/30 transition-all uppercase tracking-[0.2em] text-xs flex items-center justify-center gap-3 active:scale-95"
                >
                  {formSubmitting ? (
                    <>
                      <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                      Processing
                    </>
                  ) : (
                    <>
                      Place Order
                      <i className="fa-solid fa-arrow-right-long text-xs"></i>
                    </>
                  )}
                </button>

                {/* TRUST ROW */}
                <div className="grid grid-cols-3 gap-3 text-center pt-4 border-t">
                  <Trust icon="fa-shield-halved" label="Secure" />
                  <Trust icon="fa-truck-fast" label="Fast Delivery" />
                  <Trust icon="fa-leaf" label="Fresh Only" />
                </div>
              </div>

              {/* FOOTER NOTE */}
              <div className="px-8 py-4 bg-slate-50 text-center">
                <p className="text-[10px] font-bold uppercase tracking-widest text-slate-500">
                  SSL Encrypted · Easy Returns · 24/7 Support
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* INPUT STYLE */}
      <style>
        {`
          .input {
            width: 100%;
            padding: 14px 16px;
            border: 2px solid #e5e7eb;
            border-radius: 14px;
            font-weight: 600;
            outline: none;
          }
          .input:focus {
            border-color: #10b981;
          }
        `}
      </style>
    </form>
  );
};
const Trust = ({ icon, label }) => (
  <div className="flex flex-col items-center gap-1 text-emerald-600">
    <i className={`fa-solid ${icon} text-lg`}></i>
    <span className="text-[10px] font-black uppercase tracking-widest text-slate-600">
      {label}
    </span>
  </div>
);

export default PlaceOrder;
