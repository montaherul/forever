import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import Title from "./Title";
import ProductItem from "./ProductItem";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const LatestCollection = () => {
  const { products } = useContext(ShopContext);
  const [latestProducts, setLatestProducts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (products && products.length) {
      setLatestProducts(products.slice(0, 10));
    }
  }, [products]);

  if (!latestProducts.length) return null;

  return (
    <section className="max-w-7xl mx-auto my-24 px-4 sm:px-6">
      {/* Header Section */}
      <div className="text-center mb-16">
        <Title text1="NEW" text2="ARRIVALS" />

        <p className="max-w-2xl mx-auto text-sm sm:text-base text-slate-500 dark:text-slate-400 mt-6 leading-relaxed">
          Explore our handpicked fresh arrivals. From premium groceries to
          cutting-edge electronics and high-street fashion, delivered straight
          to your doorstep.
        </p>

        {/* Feature Highlights */}
        <div className="flex flex-wrap justify-center gap-4 mt-10">
          {[
            {
              label: "Lightning Delivery",
              color:
                "bg-emerald-50 dark:bg-emerald-900/20 text-emerald-700 dark:text-emerald-400",
              icon: "fa-bolt",
            },
            {
              label: "Secure Payments",
              color:
                "bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-400",
              icon: "fa-shield-halved",
            },
            {
              label: "Elite Support",
              color:
                "bg-amber-50 dark:bg-amber-900/20 text-amber-700 dark:text-amber-400",
              icon: "fa-headset",
            },
          ].map((feat, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              className={`flex items-center gap-2.5 px-5 py-2.5 rounded-2xl shadow-sm border border-black/5 dark:border-white/5 ${feat.color}`}
            >
              <i className={`fa-solid ${feat.icon} text-sm`}></i>
              <span className="font-bold text-xs uppercase tracking-wider">
                {feat.label}
              </span>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Grid Layout */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 gap-y-10">
        {latestProducts.map((item, idx) => (
          <motion.div
            key={item._id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: (idx % 5) * 0.05 }}
            viewport={{ once: true }}
          >
            <ProductItem
              id={item._id}
              image={item.images}
              name={item.name}
              price={item.price}
              discount={item.discount}
              sizePricing={item.sizePricing}
              sizes={item.sizes}
              category={item.category}
              inStock={item.inStock}
              stockQuantity={item.stockQuantity}
              sizeStock={item.sizeStock}
            />
          </motion.div>
        ))}
      </div>

      {/* CTA Section */}
      <div className="flex justify-center mt-20">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => navigate("/collection")}
          className="group relative flex items-center gap-4 px-10 py-4 rounded-2xl bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-bold shadow-2xl transition-all overflow-hidden"
        >
          <span className="relative z-10">EXPLORE FULL COLLECTION</span>
          <i className="fa-solid fa-arrow-right-long group-hover:translate-x-1 transition-transform relative z-10"></i>
          <div className="absolute inset-0 bg-emerald-600 scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-500"></div>
        </motion.button>
      </div>
    </section>
  );
};

export default LatestCollection;
