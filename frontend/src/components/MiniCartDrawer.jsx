import React, { useContext, useEffect } from "react";
import { ShopContext } from "../context/ShopContext";
import { motion, AnimatePresence } from "framer-motion";

/* ---------------- ANIMATION VARIANTS ---------------- */
const drawerVariant = {
  hidden: { x: "100%", opacity: 0.8 },
  show: {
    x: 0,
    opacity: 1,
    transition: { type: "spring", stiffness: 300, damping: 30 },
  },
  exit: { x: "100%", opacity: 0.8, transition: { duration: 0.3 } },
};

const backdropVariant = {
  hidden: { opacity: 0 },
  show: { opacity: 1 },
  exit: { opacity: 0 },
};

const itemVariant = {
  hidden: { opacity: 0, x: 20 },
  show: { opacity: 1, x: 0 },
  exit: { opacity: 0, scale: 0.95, transition: { duration: 0.2 } },
};

const MiniCartDrawer = () => {
  const {
    cartDrawerOpen,
    toggleCartDrawer,
    cartItems,
    products,
    currency,
    calculateCartSubtotal,
    updateQuantity,
    removeFromCart,
    navigate,
    formatCurrency,
  } = useContext(ShopContext);

  const subtotal = calculateCartSubtotal();

  const items = Object.entries(cartItems || {}).flatMap(([productId, sizes]) =>
    Object.entries(sizes || {}).map(([size, qty]) => ({
      productId,
      size,
      qty,
    })),
  );

  const getProduct = (id) => products.find((p) => p._id === id);

  useEffect(() => {
    const onKeyDown = (e) => {
      if (e.key === "Escape") toggleCartDrawer(false);
    };

    if (cartDrawerOpen) {
      document.addEventListener("keydown", onKeyDown);
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = "";
    };
  }, [cartDrawerOpen, toggleCartDrawer]);

  return (
    <AnimatePresence>
      {cartDrawerOpen && (
        <div className="fixed inset-0 z-[100] flex justify-end">
          {/* Backdrop */}
          <motion.div
            variants={backdropVariant}
            initial="hidden"
            animate="show"
            exit="exit"
            onClick={() => toggleCartDrawer(false)}
            className="absolute inset-0 bg-slate-950/40 backdrop-blur-md"
          />

          {/* Drawer */}
          <motion.div
            variants={drawerVariant}
            initial="hidden"
            animate="show"
            exit="exit"
            className="relative h-full w-full sm:w-[480px] bg-white dark:bg-slate-900 shadow-[0_0_100px_rgba(0,0,0,0.5)] flex flex-col border-l dark:border-slate-800"
          >
            {/* Header */}
            <div className="p-6 border-b dark:border-slate-800 flex items-center justify-between">
              <div>
                <h3 className="text-xl font-black text-slate-900 dark:text-white uppercase tracking-tight">
                  Shopping Bag
                </h3>
                <p className="text-xs font-bold text-emerald-600 dark:text-emerald-400 mt-1 uppercase tracking-widest">
                  {items.length} ITEM{items.length !== 1 ? "S" : ""} SELECTED
                </p>
              </div>
              <motion.button
                whileHover={{ rotate: 90, scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => toggleCartDrawer(false)}
                className="w-10 h-10 rounded-full flex items-center justify-center text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              >
                <i className="fa-solid fa-xmark text-lg"></i>
              </motion.button>
            </div>

            {/* Items */}
            <div className="flex-1 overflow-y-auto custom-scrollbar px-6 py-4 space-y-6">
              {items.length === 0 ? (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="h-full flex flex-col items-center justify-center text-center py-20"
                >
                  <div className="w-24 h-24 rounded-full bg-slate-50 dark:bg-slate-800 flex items-center justify-center mb-6">
                    <i className="fa-solid fa-bag-shopping text-4xl text-slate-300"></i>
                  </div>
                  <h4 className="text-lg font-bold text-slate-900 dark:text-white">
                    Your bag is empty
                  </h4>
                  <p className="text-slate-500 dark:text-slate-400 text-sm mt-2 max-w-[200px]">
                    Looks like you haven't added anything yet.
                  </p>
                  <button
                    onClick={() => {
                      toggleCartDrawer(false);
                      navigate("/collection");
                    }}
                    className="mt-8 text-emerald-600 font-bold text-sm uppercase tracking-widest hover:text-emerald-700 underline underline-offset-8"
                  >
                    Start Shopping
                  </button>
                </motion.div>
              ) : (
                <AnimatePresence>
                  {items.map((item) => {
                    const product = getProduct(item.productId);
                    const price =
                      product?.sizePricing?.[item.size] || product?.price || 0;
                    const line = price * item.qty;

                    return (
                      <motion.div
                        key={`${item.productId}-${item.size}`}
                        variants={itemVariant}
                        initial="hidden"
                        animate="show"
                        exit="exit"
                        className="group flex gap-5 relative"
                      >
                        <div className="relative w-24 h-24 flex-shrink-0 overflow-hidden rounded-2xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                          <img
                            src={
                              product?.images?.[0] ||
                              "https://picsum.photos/200"
                            }
                            alt={product?.name || "Item"}
                            className="w-full h-full object-cover transition-transform group-hover:scale-110"
                          />
                        </div>

                        <div className="flex-1 flex flex-col justify-between py-1">
                          <div>
                            <div className="flex justify-between items-start gap-2">
                              <h4 className="font-bold text-slate-900 dark:text-white line-clamp-2">
                                {product?.name || "Product Name"}
                              </h4>
                              <p className="font-black text-slate-900 dark:text-white">
                                {formatCurrency(line)}
                              </p>
                            </div>
                            <p className="text-[10px] font-bold text-slate-400 dark:text-slate-500 mt-1 uppercase tracking-widest">
                              SIZE:{" "}
                              <span className="text-slate-900 dark:text-white">
                                {item.size}
                              </span>
                            </p>
                          </div>

                          <div className="flex items-center justify-between mt-3">
                            <div className="flex items-center bg-slate-50 dark:bg-slate-800 rounded-xl p-1 border border-slate-200 dark:border-slate-700">
                              <motion.button
                                whileTap={{ scale: 0.8 }}
                                onClick={() =>
                                  updateQuantity(
                                    item.productId,
                                    item.size,
                                    Math.max(1, item.qty - 1),
                                  )
                                }
                                className="w-8 h-8 flex items-center justify-center"
                              >
                                <i className="fa-solid fa-minus text-[10px]"></i>
                              </motion.button>

                              <span className="w-10 text-center text-xs font-black">
                                {item.qty}
                              </span>

                              <motion.button
                                whileTap={{ scale: 0.8 }}
                                onClick={() =>
                                  updateQuantity(
                                    item.productId,
                                    item.size,
                                    item.qty + 1,
                                  )
                                }
                                className="w-8 h-8 flex items-center justify-center"
                              >
                                <i className="fa-solid fa-plus text-[10px]"></i>
                              </motion.button>
                            </div>

                            <motion.button
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.9 }}
                              onClick={() =>
                                removeFromCart(item.productId, item.size)
                              }
                              className="text-slate-400 p-2"
                            >
                              <i className="fa-regular fa-trash-can"></i>
                            </motion.button>
                          </div>
                        </div>
                      </motion.div>
                    );
                  })}
                </AnimatePresence>
              )}
            </div>

            {/* Footer */}
            <div className="p-8 border-t dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50">
              <div className="flex justify-between mb-6">
                <span className="text-slate-500">Subtotal</span>
                <span className="text-2xl font-black">
                  {currency}
                  {subtotal.toLocaleString(undefined, {
                    minimumFractionDigits: 2,
                  })}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <motion.button
                  onClick={() => {
                    toggleCartDrawer(false);
                    navigate("/cart");
                  }}
                  className="py-4 rounded-2xl border font-bold uppercase"
                >
                  Bag Details
                </motion.button>

                <motion.button
                  onClick={() => {
                    toggleCartDrawer(false);
                    navigate("/place-order");
                  }}
                  className="py-4 rounded-2xl bg-emerald-600 text-white font-bold uppercase"
                >
                  Checkout
                </motion.button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default MiniCartDrawer;
