import React, { useContext } from "react";
import { ShopContext } from "../context/ShopContext";
import { Link } from "react-router-dom";

const ProductItem = ({
  id,
  image,
  name,
  price,
  discount = 0,
  sizePricing,
  sizes,
  category,
  inStock = true,
  stockQuantity,
  sizeStock,
}) => {
  const { currency, addToCart, navigate } = useContext(ShopContext);

  // Ensure `image` is an array and has at least one element
  const productImage =
    Array.isArray(image) && image.length > 0 ? image[0] : "placeholder.jpg";

  const hasDiscount = Number(discount) > 0;

  // Check if product has multiple size prices
  const hasSizePricing = sizePricing && Object.keys(sizePricing).length > 0;
  const showFromPrice = hasSizePricing && sizes && sizes.length > 1;
  const sizeSoldOut = (sizes || []).every(
    (s) => sizeStock && sizeStock[s] !== undefined && Number(sizeStock[s]) <= 0
  );
  const isElectronics = category === "Electronics";

  const canQuickAdd = !sizes || sizes.length === 0 || sizes.length === 1;
  const quickAddSize = sizes && sizes.length === 1 ? sizes[0] : undefined;

  const finalPrice = hasDiscount
    ? (Number(price) * (1 - Number(discount) / 100)).toFixed(2)
    : Number(price).toFixed(2);

  return (
    <Link
      className="text-gray-700 cursor-pointer group block"
      to={id ? `/product/${id}` : "#"}
    >
      <div className="relative overflow-hidden rounded-2xl border-2 border-gray-100 group-hover:border-green-500 transition-all duration-300 shadow-md group-hover:shadow-2xl bg-white">
        {(!inStock || sizeSoldOut) && (
          <div className="absolute inset-0 bg-white/80 backdrop-blur-[1px] z-10 flex items-center justify-center text-rose-700 font-bold text-lg">
            Out of Stock
          </div>
        )}
        <div className="relative overflow-hidden">
          <img
            className="group-hover:scale-110 transition-transform ease-in-out duration-500 w-full h-52 object-cover"
            src={productImage}
            alt={name || "Product"}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          {canQuickAdd && inStock && !sizeSoldOut && (
            <button
              onClick={(e) => {
                e.preventDefault();
                if (quickAddSize) {
                  addToCart(id, quickAddSize);
                } else {
                  navigate(`/product/${id}`);
                }
              }}
              className="absolute bottom-3 left-1/2 -translate-x-1/2 bg-green-600 hover:bg-green-700 text-white text-xs font-semibold px-4 py-2 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-all"
            >
              {quickAddSize ? "Quick Add" : "View & Add"}
            </button>
          )}
        </div>
        <div className="absolute top-3 right-3 bg-gradient-to-r from-orange-500 to-orange-600 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-lg transform translate-x-20 group-hover:translate-x-0 transition-transform duration-300">
          {hasDiscount ? `-${discount}%` : "New"}
        </div>
        <div className="p-4">
          <p className="text-sm font-semibold text-gray-800 group-hover:text-green-600 transition-colors duration-200 line-clamp-2 min-h-[40px]">
            {name || "No Name"}
          </p>
          <div className="flex items-center justify-between mt-3">
            <div className="flex flex-col">
              <p className="text-lg font-bold text-green-700">
                {showFromPrice && (
                  <span className="text-xs font-normal text-gray-600">
                    From{" "}
                  </span>
                )}
                {currency}
                {finalPrice}
              </p>
              {hasDiscount && (
                <span className="text-xs text-gray-500 line-through">
                  {currency}
                  {Number(price).toFixed(2)}
                </span>
              )}
            </div>
            <div className="flex items-center gap-1 text-xs text-gray-500">
              <span className="text-yellow-500">★★★★★</span>
              <span className="font-medium">(4.8)</span>
            </div>
          </div>
          <div className="mt-3 pt-3 border-t border-gray-100 flex items-center justify-between text-xs font-semibold">
            <span className="flex items-center gap-1 text-green-600 font-semibold">
              Fast Delivery
            </span>
            <span
              className={`px-2 py-1 rounded ${
                inStock
                  ? "bg-green-50 text-green-700"
                  : "bg-rose-50 text-rose-700"
              }`}
            >
              {inStock ? "In Stock" : "Out of Stock"}
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ProductItem;
