import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import { useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

const SearchBar = () => {
  const { search, setSearch, showSearch, setShowSearch } =
    useContext(ShopContext);

  const [visible, setVisible] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onCollection = location.pathname.includes("collection");
    setVisible(onCollection && showSearch);
  }, [location.pathname, showSearch]);

  return (
    <AnimatePresence>
      {showSearch && visible && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="relative z-40 border-b dark:border-slate-800 bg-white/80 dark:bg-slate-950/80 backdrop-blur-xl py-8 shadow-sm"
        >
          <div className="max-w-3xl mx-auto px-4">
            <div className="relative group">
              <div className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-emerald-500 transition-colors">
                <i className="fa-solid fa-magnifying-glass"></i>
              </div>

              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                type="text"
                placeholder="Search for items, categories, or brands..."
                autoFocus
                className="w-full h-16 pl-16 pr-20 bg-gray-100/50 dark:bg-slate-900/50 border-2 border-transparent focus:border-emerald-500/50 dark:focus:border-emerald-500 focus:bg-white dark:focus:bg-slate-900 rounded-[2rem] outline-none font-bold text-slate-800 dark:text-white transition-all shadow-inner"
              />

              <div className="absolute right-4 top-1/2 -translate-y-1/2 flex items-center gap-2">
                {search && (
                  <button
                    onClick={() => setSearch("")}
                    className="w-8 h-8 rounded-full flex items-center justify-center bg-slate-200 dark:bg-slate-800 text-slate-500 hover:text-slate-900 dark:hover:text-white transition-colors"
                  >
                    <i className="fa-solid fa-xmark text-xs"></i>
                  </button>
                )}
                <button
                  onClick={() => setShowSearch(false)}
                  className="px-4 py-2 text-[10px] font-black uppercase tracking-widest text-slate-500 hover:text-emerald-600 transition-colors"
                >
                  Close
                </button>
              </div>
            </div>

            <div className="mt-4 flex items-center justify-center gap-4 overflow-x-auto no-scrollbar py-2">
              <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex-shrink-0">
                Popular:
              </span>
              {["Fresh Produce", "Organic", "New In", "Best Sellers"].map(
                (tag) => (
                  <button
                    key={tag}
                    onClick={() => setSearch(tag)}
                    className="px-4 py-1.5 rounded-full bg-slate-50 dark:bg-slate-800 text-[10px] font-bold text-slate-600 dark:text-slate-400 border border-slate-100 dark:border-slate-700 hover:border-emerald-500 transition-all whitespace-nowrap"
                  >
                    {tag}
                  </button>
                ),
              )}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default SearchBar;
