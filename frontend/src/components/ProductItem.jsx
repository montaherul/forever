import React, { useContext } from "react";
import { ShopContext } from "../context/ShopContext";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const Stars = ({ value = 4.8 }) => {
  const full = Math.round(Math.max(0, Math.min(5, value)));
  return (
    <div className="flex items-center gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <i
          key={i}
          className={`fa-solid fa-star text-[10px] ${
            i < full ? "text-amber-400" : "text-slate-200 dark:text-slate-800"
          }`}
        ></i>
      ))}
    </div>
  );
};

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
  sizeStock,
  rating = 4.8,
  reviewCount = 0,
}) => {
  const { currency, addToCart, navigate, formatCurrency } =
    useContext(ShopContext);

  const productImage =
    Array.isArray(image) && image.length > 0
      ? image[0]
      : "https://picsum.photos/400/500";

  const hasDiscount = Number(discount) > 0;
  const isSoldOut =
    !inStock ||
    (sizes || []).every((s) => sizeStock && Number(sizeStock[s]) <= 0);

  const finalPrice = hasDiscount ? price * (1 - discount / 100) : price;

  const canQuickAdd = (!sizes || sizes.length <= 1) && !isSoldOut;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="group"
    >
      <div className="relative flex flex-col h-full bg-white dark:bg-slate-900 rounded-[2rem] border border-slate-100 dark:border-slate-800 shadow-sm hover:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.1)] transition-all duration-500 overflow-hidden">
        {/* Top Badges */}
        <div className="absolute top-4 left-4 z-20 flex flex-col gap-2">
          {hasDiscount && (
            <span className="px-3 py-1 bg-rose-500 text-white text-[10px] font-black rounded-full shadow-lg shadow-rose-500/20 uppercase tracking-widest">
              -{discount}%
            </span>
          )}
          {isSoldOut ? (
            <span className="px-3 py-1 bg-slate-900/80 backdrop-blur-md text-white text-[10px] font-black rounded-full uppercase tracking-widest">
              Sold Out
            </span>
          ) : (
            <span className="px-3 py-1 bg-emerald-500 text-white text-[10px] font-black rounded-full shadow-lg shadow-emerald-500/20 uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity">
              In Stock
            </span>
          )}
        </div>

        {/* Image */}
        <Link
          to={`/product/${id}`}
          className="relative h-64 sm:h-72 overflow-hidden block"
        >
          <img
            src={productImage}
            alt={name}
            className={`w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 ${
              isSoldOut ? "grayscale opacity-50" : ""
            }`}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

          {/* Quick Actions */}
          <div className="absolute inset-x-4 bottom-4 z-30 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
            {canQuickAdd ? (
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={(e) => {
                  e.preventDefault();
                  if (sizes?.[0]) addToCart(id, sizes[0]);
                  else addToCart(id, "default");
                }}
                className="w-full py-3.5 bg-white text-slate-900 font-black text-[10px] uppercase tracking-[0.2em] rounded-2xl shadow-2xl flex items-center justify-center gap-2"
              >
                <i className="fa-solid fa-plus text-xs"></i>
                Quick Add
              </motion.button>
            ) : (
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={(e) => {
                  e.preventDefault();
                  navigate(`/product/${id}`);
                }}
                className="w-full py-3.5 bg-emerald-600 text-white font-black text-[10px] uppercase tracking-[0.2em] rounded-2xl shadow-2xl"
              >
                Select Options
              </motion.button>
            )}
          </div>
        </Link>

        {/* Content */}
        <div className="p-6 flex flex-col flex-1">
          <div className="flex justify-between items-start mb-2">
            <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
              {category || "Collection"}
            </span>
            <div className="flex items-center gap-1.5">
              <Stars value={rating} />
              <span className="text-[10px] font-bold text-slate-500">
                {reviewCount > 0 ? `(${reviewCount})` : "New"}
              </span>
            </div>
          </div>

          <Link to={`/product/${id}`} className="flex-1">
            <h3 className="text-base font-bold text-slate-900 dark:text-white leading-tight mb-3 line-clamp-2 hover:text-emerald-600 transition-colors">
              {name}
            </h3>
          </Link>

          <div className="flex items-end justify-between mt-auto">
            <div className="flex flex-col">
              {hasDiscount && (
                <span className="text-xs text-slate-400 line-through font-medium mb-0.5">
                  {formatCurrency(price)}
                </span>
              )}
              <span className="text-xl font-black text-slate-900 dark:text-emerald-400">
                {formatCurrency(finalPrice)}
              </span>
            </div>

            <Link
              to={`/product/${id}`}
              className="w-10 h-10 rounded-xl bg-slate-50 dark:bg-slate-800 flex items-center justify-center text-slate-400 hover:text-emerald-500 dark:hover:text-emerald-400 transition-colors"
            >
              <i className="fa-solid fa-arrow-right-long"></i>
            </Link>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ProductItem;
