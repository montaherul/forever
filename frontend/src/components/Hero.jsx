import React, { useEffect, useState, useContext } from "react";
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ShopContext } from "../context/ShopContext";

/* ---------------- TEXT ANIMATION VARIANT ---------------- */
const textVariant = {
  hidden: { opacity: 0, y: 40 },
  show: (i = 1) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.15,
      duration: 0.7,
      ease: [0.21, 0.45, 0.32, 0.9],
    },
  }),
};

const Hero = () => {
  const [products, setProducts] = useState([]);
  const [index, setIndex] = useState(0);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  /* ✅ GET CURRENCY FROM CONTEXT */
  const { currency } = useContext(ShopContext);

  /* ---------------- FETCH PRODUCTS ---------------- */
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get(
          "https://forever-main-2.onrender.com/api/product/list"
        );

        setProducts(res.data.products.filter((p) => p.inStock));
        setLoading(false);
      } catch (error) {
        console.error("Hero product fetch error:", error);
      }
    };

    fetchProducts();
  }, []);

  /* ---------------- AUTO SLIDE ---------------- */
  useEffect(() => {
    if (!products.length) return;

    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % products.length);
    }, 3500);

    return () => clearInterval(interval);
  }, [products]);

  /* ---------------- LOADING ---------------- */
  if (loading) {
    return (
      <div className="h-[500px] w-full flex flex-col items-center justify-center space-y-4">
        <div className="relative w-16 h-16">
          <div className="absolute inset-0 border-4 border-green-100 dark:border-slate-800 rounded-full"></div>
          <div className="absolute inset-0 border-4 border-green-600 border-t-transparent rounded-full animate-spin"></div>
        </div>
        <p className="text-slate-500 dark:text-slate-400 font-medium animate-pulse">
          Discovering Trending Products...
        </p>
      </div>
    );
  }

  const activeProduct = products[index];
  if (!activeProduct) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="relative w-full max-w-[1400px] mx-auto my-6 sm:my-10"
    >
      <div className="relative flex flex-col lg:flex-row min-h-[500px] sm:min-h-[600px] rounded-[2.5rem] overflow-hidden bg-white dark:bg-slate-900 shadow-[0_20px_50px_rgba(0,0,0,0.1)] dark:shadow-[0_20px_50px_rgba(0,0,0,0.3)] border border-slate-100 dark:border-slate-800">
        {/* Background blobs */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute -top-24 -left-24 w-96 h-96 bg-green-100/40 dark:bg-green-900/10 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-orange-100/40 dark:bg-orange-900/10 rounded-full blur-3xl"></div>
        </div>

        {/* ---------------- LEFT CONTENT ---------------- */}
        <div className="relative z-10 w-full lg:w-3/5 flex items-center">
          <div className="w-full px-8 sm:px-14 lg:px-20 py-12 lg:py-16">
            <div className="max-w-2xl">
              <motion.div
                variants={textVariant}
                initial="hidden"
                animate="show"
                custom={0}
                className="flex items-center gap-3 mb-6"
              >
                <span className="h-px w-8 bg-green-500"></span>
                <p className="font-bold text-green-600 dark:text-green-400 tracking-[0.2em] text-[10px] sm:text-xs uppercase">
                  Trending Selection
                </p>
              </motion.div>

              {/* PRODUCT NAME */}
              <div className="min-h-[140px]">
                <AnimatePresence mode="wait">
                  <motion.h1
                    key={activeProduct._id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    transition={{ duration: 0.5 }}
                    className="font-black text-4xl sm:text-5xl lg:text-6xl leading-tight"
                  >
                    {activeProduct.name}
                  </motion.h1>
                </AnimatePresence>
              </div>

              {/* DESCRIPTION */}
              <AnimatePresence mode="wait">
                <motion.p
                  key={activeProduct._id + "-desc"}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="mt-6 text-slate-500 dark:text-slate-400 text-lg leading-relaxed line-clamp-3"
                >
                  {activeProduct.description}
                </motion.p>
              </AnimatePresence>

              {/* PRICE + CTA */}
              <div className="flex flex-col sm:flex-row gap-8 mt-12">
                {/* ✅ CURRENCY FIXED HERE */}
                <motion.span
                  key={currency}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-4xl font-black"
                >
                  {currency}
                  {Number(activeProduct.price).toLocaleString()}
                </motion.span>

                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() =>
                    navigate(`/product/${activeProduct._id}`)
                  }
                  className="px-10 py-4 font-bold text-white bg-slate-900 rounded-full"
                >
                  SHOP COLLECTION
                </motion.button>
              </div>

              {/* SLIDER INDICATORS */}
              <div className="flex gap-2 mt-12">
                {products.map((_, i) => (
                  <div
                    key={i}
                    className={`h-1 rounded-full transition-all ${
                      i === index
                        ? "w-12 bg-green-500"
                        : "w-3 bg-slate-300"
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* ---------------- RIGHT IMAGE ---------------- */}
        <div className="relative w-full lg:w-2/5 flex items-center justify-center p-12">
          <AnimatePresence mode="wait">
            <motion.img
              key={activeProduct._id}
              src={
                activeProduct.images?.[0] ||
                "https://picsum.photos/600/600"
              }
              alt={activeProduct.name}
              initial={{ opacity: 0, scale: 0.85 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.1 }}
              transition={{ duration: 0.7 }}
              className="w-full h-full object-contain"
            />
          </AnimatePresence>
        </div>
      </div>
    </motion.div>
  );
};

export default Hero;
