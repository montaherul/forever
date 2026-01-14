import React, { useContext, useEffect } from "react";
import { ShopContext } from "../context/ShopContext";
import { Link } from "react-router-dom";

const MiniCartDrawer = () => {
  const {
    cartDrawerOpen,
    toggleCartDrawer,
    cartItems,
    products,
    currency,
    calculateCartSubtotal,
    updateQuantity,
    navigate,
  } = useContext(ShopContext);

  const subtotal = calculateCartSubtotal();

  const items = Object.entries(cartItems || {}).flatMap(
    ([productId, sizes]) => {
      return Object.entries(sizes || {}).map(([size, qty]) => ({
        productId,
        size,
        qty,
      }));
    }
  );

  const getProduct = (id) => products.find((p) => p._id === id);

  // Close drawer with Escape and lock background scroll while open
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
    <div
      className={`fixed inset-0 z-50 transition ${
        cartDrawerOpen ? "pointer-events-auto" : "pointer-events-none"
      }`}
    >
      {/* Backdrop */}
      <div
        onClick={() => toggleCartDrawer(false)}
        className={`absolute inset-0 bg-black/40 transition-opacity ${
          cartDrawerOpen ? "opacity-100" : "opacity-0"
        }`}
      />

      {/* Drawer */}
      <div
        className={`absolute right-0 top-0 h-full w-full sm:w-[420px] bg-white shadow-2xl transition-transform duration-300 flex flex-col ${
          cartDrawerOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="p-4 border-b flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-500">My Cart</p>
            <p className="text-lg font-bold text-gray-900">
              {items.length} item(s)
            </p>
          </div>
          <button
            onClick={() => toggleCartDrawer(false)}
            className="text-gray-500 hover:text-gray-800"
            aria-label="Close cart"
          >
            ✕
          </button>
        </div>

        <div className="flex-1 overflow-y-auto divide-y">
          {items.length === 0 && (
            <div className="p-6 text-center text-gray-500">
              Your cart is empty.
            </div>
          )}
          {items.map((item, idx) => {
            const product = getProduct(item.productId);
            const price =
              product?.sizePricing?.[item.size] || product?.price || 0;
            const line = price * item.qty;
            return (
              <div
                key={`${item.productId}-${item.size}-${idx}`}
                className="p-4 flex gap-3"
              >
                <img
                  className="w-16 h-16 rounded border object-cover"
                  src={product?.images?.[0] || "https://via.placeholder.com/64"}
                  alt={product?.name || "Item"}
                />
                <div className="flex-1">
                  <p className="font-semibold text-gray-800 line-clamp-1">
                    {product?.name || "Product"}
                  </p>
                  <p className="text-xs text-gray-500">{item.size}</p>
                  <div className="flex items-center gap-2 mt-2">
                    <button
                      onClick={() =>
                        updateQuantity(
                          item.productId,
                          item.size,
                          Math.max(1, item.qty - 1)
                        )
                      }
                      className="px-2 py-1 border rounded"
                    >
                      -
                    </button>
                    <span className="min-w-[24px] text-center text-sm font-semibold">
                      {item.qty}
                    </span>
                    <button
                      onClick={() =>
                        updateQuantity(item.productId, item.size, item.qty + 1)
                      }
                      className="px-2 py-1 border rounded"
                    >
                      +
                    </button>
                  </div>
                </div>
                <div className="text-right text-sm font-semibold text-gray-800">
                  {currency}
                  {line.toFixed(2)}
                </div>
              </div>
            );
          })}
        </div>

        <div className="p-4 border-t space-y-3">
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-600">Subtotal</span>
            <span className="font-bold text-gray-900">
              {currency}
              {subtotal.toFixed(2)}
            </span>
          </div>
          <p className="text-xs text-gray-500">
            Taxes and shipping are calculated at checkout.
          </p>
          <div className="flex gap-2">
            <button
              onClick={() => {
                toggleCartDrawer(false);
                navigate("/cart");
              }}
              className="flex-1 bg-white border-2 border-gray-900 text-gray-900 font-semibold py-3 rounded-lg hover:bg-gray-900 hover:text-white transition-colors"
            >
              View Cart
            </button>
            <button
              onClick={() => {
                toggleCartDrawer(false);
                navigate("/place-order");
              }}
              className="flex-1 bg-green-600 hover:bg-green-700 text-white font-semibold py-3 rounded-lg transition-colors"
            >
              Checkout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MiniCartDrawer;
