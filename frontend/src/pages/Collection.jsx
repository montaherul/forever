import React, { useState, useContext, useEffect } from "react";
import { ShopContext } from "../context/ShopContext";
import { useLocation } from "react-router-dom";
import Title from "../components/Title";
import ProductItem from "../components/ProductItem";
import { motion, AnimatePresence } from "framer-motion";

const Collection = () => {
  const { products, search, showSearch } = useContext(ShopContext);
  const location = useLocation();

  const [filterProducts, setFilterProducts] = useState([]);
  const [category, setCategory] = useState([]);
  const [subcategory, setSubCategory] = useState([]);
  const [sortType, setSortType] = useState("relevant");
  const [minPrice] = useState(0);
  const [maxPrice] = useState(2000);

  useEffect(() => {
    if (location.state?.selectedSort) {
      setSortType(location.state.selectedSort);
    }
  }, [location]);

  const applyFilter = () => {
    let productsCopy = products.slice();

    if (showSearch && search) {
      const searchLower = search.toLowerCase();
      productsCopy = productsCopy.filter(
        (item) =>
          item.name.toLowerCase().includes(searchLower) ||
          item.description.toLowerCase().includes(searchLower) ||
          item.category.toLowerCase().includes(searchLower) ||
          item.subCategory.toLowerCase().includes(searchLower) ||
          item.tags?.some((tag) => tag.toLowerCase().includes(searchLower)),
      );
    }

    if (category.length > 0) {
      productsCopy = productsCopy.filter((item) =>
        category.includes(item.category),
      );
    }

    if (subcategory.length > 0) {
      productsCopy = productsCopy.filter((item) =>
        subcategory.includes(item.subCategory),
      );
    }

    productsCopy = productsCopy.filter((item) => {
      const price = Number(item.price) || 0;
      return price >= minPrice && price <= maxPrice;
    });

    setFilterProducts(productsCopy);
  };

  useEffect(() => {
    applyFilter();
  }, [category, subcategory, search, showSearch, products]);

  useEffect(() => {
    if (filterProducts.length > 0) {
      let sorted = [...filterProducts];
      switch (sortType) {
        case "low-high":
          sorted.sort((a, b) => Number(a.price) - Number(b.price));
          break;
        case "high-low":
          sorted.sort((a, b) => Number(b.price) - Number(a.price));
          break;
        case "Top ranking":
        case "Top deals":
          sorted.sort(
            (a, b) => (Number(b.discount) || 0) - (Number(a.discount) || 0),
          );
          break;
        case "New arrivals":
          sorted.reverse();
          break;
        default:
          break;
      }
      setFilterProducts(sorted);
    }
  }, [sortType]);

  const clearFilters = () => {
    setCategory([]);
    setSubCategory([]);
    setSortType("relevant");
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-slate-950 transition-colors pb-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <header className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-8 border-b dark:border-slate-800 pb-10">
          <div className="text-center md:text-left">
            <Title text1="OUR" text2="COLLECTION" />

            <div className="flex items-center justify-center md:justify-start gap-4 mt-2">
              <span className="text-[10px] font-black text-emerald-600 dark:text-emerald-400 uppercase tracking-[0.2em] bg-emerald-50 dark:bg-emerald-900/20 px-4 py-1.5 rounded-full border border-emerald-100 dark:border-emerald-800">
                {filterProducts.length} PRODUCTS FOUND
              </span>

              {search && showSearch && (
                <span className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">
                  SEARCHING: "{search}"
                </span>
              )}
            </div>
          </div>

          <div className="flex items-center gap-4 bg-white dark:bg-slate-900 p-2 rounded-2xl shadow-sm border border-gray-100 dark:border-slate-800">
            <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest pl-4">
              Sort By
            </span>
            <select
              value={sortType}
              onChange={(e) => setSortType(e.target.value)}
              className="px-6 py-2.5 rounded-xl bg-gray-50 dark:bg-slate-800 text-slate-900 dark:text-white text-xs font-black uppercase tracking-widest focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all cursor-pointer border-none"
            >
              <option value="relevant">Relevant</option>
              <option value="low-high">Price: Low to High</option>
              <option value="high-low">Price: High to Low</option>
              <option value="Top ranking">Top Ranking</option>
              <option value="New arrivals">New Arrivals</option>
              <option value="Top deals">Hot Deals</option>
            </select>
          </div>
        </header>

        <main>
          <AnimatePresence mode="wait">
            {filterProducts.length > 0 ? (
              <motion.div
                key="grid"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 sm:gap-8"
              >
                {filterProducts.map((item) => (
                  <ProductItem
                    key={item._id}
                    id={item._id}
                    name={item.name}
                    price={item.price}
                    discount={item.discount}
                    image={item.images}
                    sizePricing={item.sizePricing}
                    sizes={item.sizes}
                    category={item.category}
                    inStock={item.inStock}
                    stockQuantity={item.stockQuantity}
                    sizeStock={item.sizeStock}
                  />
                ))}
              </motion.div>
            ) : (
              <motion.div
                key="empty"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-32 bg-white dark:bg-slate-900 rounded-[3rem] shadow-xl shadow-black/[0.02] border border-gray-100 dark:border-slate-800"
              >
                <div className="w-24 h-24 bg-gray-50 dark:bg-slate-800 rounded-full flex items-center justify-center mx-auto mb-8">
                  <i className="fa-solid fa-seedling text-4xl text-emerald-200"></i>
                </div>
                <h3 className="text-3xl font-black text-slate-900 dark:text-white mb-4">
                  No results found
                </h3>
                <p className="text-slate-500 dark:text-slate-400 mb-10 max-w-sm mx-auto leading-relaxed">
                  We couldn't find any products matching your criteria. Try
                  adjusting your filters or searching for something else.
                </p>
                <button
                  onClick={clearFilters}
                  className="bg-slate-900 dark:bg-emerald-600 hover:bg-slate-800 dark:hover:bg-emerald-700 text-white font-black px-12 py-5 rounded-2xl shadow-2xl transition-all uppercase tracking-[0.2em] text-xs"
                >
                  Clear All Filters
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </main>
      </div>
    </div>
  );
};

export default Collection;
