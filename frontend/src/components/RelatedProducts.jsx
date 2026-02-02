import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import ProductItem from "./ProductItem";
import Title from "./Title";
import { motion } from "framer-motion";

const RelatedProducts = ({ category, subCategory }) => {
  const { products } = useContext(ShopContext);
  const [related, setRelated] = useState([]);

  useEffect(() => {
    if (products && products.length > 0) {
      const filtered = products.filter(
        (item) =>
          category === item.category && subCategory === item.subCategory,
      );
      setRelated(filtered.slice(0, 5));
    }
  }, [products, category, subCategory]);

  if (!related.length) return null;

  return (
    <section className="my-24 py-16 px-6 sm:px-10 rounded-[3rem] bg-gradient-to-br from-emerald-50/50 to-white dark:from-slate-900 dark:to-slate-900 border border-emerald-100 dark:border-slate-800">
      <div className="text-center mb-12">
        <Title text1="MORE" text2="FOR YOU" />
        <p className="text-slate-500 dark:text-slate-400 text-sm font-medium mt-4 tracking-wide">
          Hand-picked items that complement your taste.
        </p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
        {related.map((item) => (
          <ProductItem
            key={item._id}
            id={item._id}
            name={item.name}
            price={item.price}
            image={item.images}
            discount={item.discount}
            sizePricing={item.sizePricing}
            sizes={item.sizes}
            category={item.category}
          />
        ))}
      </div>
    </section>
  );
};

export default RelatedProducts;
