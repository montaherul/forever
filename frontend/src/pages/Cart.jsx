import { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import Title from "../components/Title";
import CartTotal from "../components/CartTotal";
import { motion, AnimatePresence } from "framer-motion";

const Cart = () => {
  const {
    products,
    currency,
    cartItems,
    updateQuantity,
    navigate,
    applyCoupon,
    clearCoupon,
    appliedCoupon,
    couponMessage,
    normalizePricing,
    removeFromCart,
  } = useContext(ShopContext);

  const [cartData, setCartData] = useState([]);
  const [couponCode, setCouponCode] = useState("");

  useEffect(() => {
    if (products && products.length > 0) {
      const tempData = [];
      for (const items in cartItems) {
        for (const item in cartItems[items]) {
          if (cartItems[items][item] > 0) {
            tempData.push({
              _id: items,
              size: item,
              quantity: cartItems[items][item],
            });
          }
        }
      }
      setCartData(tempData);
    }
  }, [cartItems, products]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen bg-gray-50 dark:bg-slate-950 pt-10 transition-colors"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        <div className="mb-10 text-center sm:text-left">
          <Title text1="YOUR" text2="SHOPPING BAG" />
          {cartData.length > 0 && (
            <p className="text-sm font-bold text-emerald-600 dark:text-emerald-400 mt-2 uppercase tracking-widest">
              {cartData.length} ITEM{cartData.length > 1 ? "S" : ""} READY FOR
              HARVEST
            </p>
          )}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* CART ITEMS */}
          <div className="lg:col-span-8">
            {cartData.length === 0 ? (
              <motion.div
                initial={{ scale: 0.95 }}
                animate={{ scale: 1 }}
                className="text-center py-20 bg-white dark:bg-slate-900 rounded-[2.5rem] border border-gray-100 dark:border-slate-800 shadow-xl shadow-black/[0.02]"
              >
                <div className="w-24 h-24 bg-gray-50 dark:bg-slate-800 rounded-full flex items-center justify-center mx-auto mb-6">
                  <i className="fa-solid fa-basket-shopping text-4xl text-gray-300"></i>
                </div>
                <h3 className="text-2xl font-black text-slate-800 dark:text-white mb-2">
                  Your basket is empty
                </h3>
                <p className="text-gray-500 dark:text-slate-400 mb-8 max-w-xs mx-auto">
                  Discover our fresh arrivals and start your healthy journey
                  today.
                </p>
                <button
                  onClick={() => navigate("/collection")}
                  className="bg-emerald-600 hover:bg-emerald-700 text-white font-black px-10 py-4 rounded-2xl shadow-xl shadow-emerald-600/20 transition-all uppercase tracking-widest text-xs"
                >
                  Start Shopping
                </button>
              </motion.div>
            ) : (
              <div className="space-y-6">
                <AnimatePresence mode="popLayout">
                  {cartData.map((item) => {
                    let productData = products.find((p) => p._id === item._id);
                    productData = normalizePricing(productData);
                    const itemPrice =
                      productData.sizePricing?.[item.size] || productData.price;

                    return (
                      <motion.div
                        key={`${item._id}-${item.size}`}
                        layout
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        className="bg-white dark:bg-slate-900 rounded-[2rem] p-6 shadow-sm border border-gray-100 dark:border-slate-800 group transition-all hover:shadow-xl hover:border-emerald-100 dark:hover:border-emerald-900/50"
                      >
                        <div className="flex flex-col sm:flex-row items-center gap-6">
                          <div className="relative w-32 h-32 rounded-2xl overflow-hidden bg-gray-50 dark:bg-slate-800 border border-gray-100 dark:border-slate-800 flex-shrink-0">
                            <img
                              src={productData.images[0]}
                              alt={productData.name}
                              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                            />
                          </div>

                          <div className="flex-1 text-center sm:text-left">
                            <h3
                              onClick={() =>
                                navigate(`/product/${productData._id}`)
                              }
                              className="text-xl font-bold text-slate-900 dark:text-white cursor-pointer hover:text-emerald-600 transition-colors line-clamp-1"
                            >
                              {productData.name}
                            </h3>

                            <div className="flex flex-wrap justify-center sm:justify-start items-center gap-3 mt-2">
                              <span className="text-xs font-black bg-gray-100 dark:bg-slate-800 text-gray-600 dark:text-slate-400 px-3 py-1 rounded-full uppercase tracking-widest">
                                {item.size}
                              </span>

                              {productData.isOrganic && (
                                <span className="text-xs font-black bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600 dark:text-emerald-400 px-3 py-1 rounded-full uppercase tracking-widest flex items-center gap-1.5">
                                  <i className="fa-solid fa-leaf"></i> Organic
                                </span>
                              )}
                            </div>

                            <p className="text-2xl font-black text-slate-900 dark:text-white mt-4">
                              {currency}
                              {itemPrice.toFixed(2)}
                            </p>
                          </div>

                          <div className="flex flex-col items-center sm:items-end gap-4">
                            <div className="flex items-center bg-gray-50 dark:bg-slate-800 rounded-xl p-1 border border-gray-200 dark:border-slate-700">
                              <button
                                onClick={() =>
                                  item.quantity > 1 &&
                                  updateQuantity(
                                    item._id,
                                    item.size,
                                    item.quantity - 1,
                                  )
                                }
                                className="w-10 h-10 rounded-lg flex items-center justify-center text-slate-400 hover:bg-white dark:hover:bg-slate-700 hover:text-emerald-600 transition-all font-bold"
                              >
                                <i className="fa-solid fa-minus text-xs"></i>
                              </button>

                              <span className="w-12 text-center font-black text-slate-900 dark:text-white">
                                {item.quantity}
                              </span>

                              <button
                                onClick={() =>
                                  updateQuantity(
                                    item._id,
                                    item.size,
                                    item.quantity + 1,
                                  )
                                }
                                className="w-10 h-10 rounded-lg flex items-center justify-center text-slate-400 hover:bg-white dark:hover:bg-slate-700 hover:text-emerald-600 transition-all font-bold"
                              >
                                <i className="fa-solid fa-plus text-xs"></i>
                              </button>
                            </div>

                            <button
                              onClick={() =>
                                removeFromCart(item._id, item.size)
                              }
                              className="text-xs font-black text-rose-500 uppercase tracking-widest hover:text-rose-600 transition-colors flex items-center gap-2"
                            >
                              <i className="fa-regular fa-trash-can"></i> Remove
                            </button>
                          </div>
                        </div>
                      </motion.div>
                    );
                  })}
                </AnimatePresence>
              </div>
            )}
          </div>

          {/* SIDEBAR */}
          <div className="lg:col-span-4 space-y-8">
            {/* PROMO */}
            <div className="bg-white dark:bg-slate-900 p-8 rounded-[2.5rem] border border-gray-100 dark:border-slate-800 shadow-xl shadow-black/[0.02]">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-emerald-500 rounded-xl flex items-center justify-center text-white shadow-lg shadow-emerald-500/20">
                  <i className="fa-solid fa-ticket text-sm"></i>
                </div>
                <h3 className="text-xl font-black text-slate-900 dark:text-white uppercase tracking-tight">
                  Promo Code
                </h3>
              </div>

              <div className="space-y-4">
                <input
                  type="text"
                  placeholder="Enter code..."
                  value={couponCode}
                  onChange={(e) => setCouponCode(e.target.value)}
                  disabled={appliedCoupon}
                  className="w-full h-14 pl-6 pr-6 bg-gray-50 dark:bg-slate-800 border-2 border-transparent focus:border-emerald-500 focus:bg-white dark:focus:bg-slate-900 rounded-2xl outline-none font-bold transition-all disabled:opacity-50"
                />

                {appliedCoupon ? (
                  <motion.div
                    initial={{ scale: 0.95 }}
                    animate={{ scale: 1 }}
                    className="p-4 rounded-2xl bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-100 dark:border-emerald-800/30"
                  >
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-xs font-black text-emerald-800 dark:text-emerald-400 uppercase tracking-widest">
                        Active Coupon
                      </span>
                      <button
                        onClick={clearCoupon}
                        className="text-[10px] font-black text-rose-500 uppercase tracking-widest"
                      >
                        Remove
                      </button>
                    </div>
                    <p className="font-black text-slate-900 dark:text-white">
                      {appliedCoupon.code}
                      <span className="text-emerald-600 text-sm ml-2">
                        -{appliedCoupon.discountPercent}% OFF
                      </span>
                    </p>
                  </motion.div>
                ) : (
                  <button
                    onClick={() => applyCoupon(couponCode)}
                    className="w-full py-4 bg-slate-900 dark:bg-emerald-600 hover:bg-slate-800 dark:hover:bg-emerald-700 text-white font-black rounded-2xl transition-all shadow-xl shadow-emerald-600/10 uppercase tracking-widest text-xs"
                  >
                    Apply Code
                  </button>
                )}

                {couponMessage && (
                  <p
                    className={`text-[10px] font-black uppercase tracking-widest px-2 ${
                      appliedCoupon ? "text-emerald-500" : "text-rose-500"
                    }`}
                  >
                    {couponMessage}
                  </p>
                )}
              </div>
            </div>

            <CartTotal />

            <button
              onClick={() => navigate("/place-order")}
              disabled={cartData.length === 0}
              className="w-full py-6 bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 disabled:cursor-not-allowed text-white font-black rounded-[2rem] shadow-2xl shadow-emerald-600/30 transition-all uppercase tracking-[0.2em] text-sm flex items-center justify-center gap-3"
            >
              Secure Checkout <i className="fa-solid fa-arrow-right-long"></i>
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Cart;
