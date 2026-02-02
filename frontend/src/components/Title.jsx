import React from "react";

const Title = ({ text1, text2 }) => {
  return (
    <div className="inline-flex flex-col items-center gap-1 mb-8 group">
      <div className="flex items-center gap-3">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-black tracking-tight text-slate-800 dark:text-slate-100 font-poppins">
          <span className="opacity-60 font-light">{text1}</span>{" "}
          <span className="text-emerald-600 dark:text-emerald-400">
            {text2}
          </span>
        </h2>
      </div>
      <div className="flex items-center gap-1.5 mt-2">
        <span className="w-12 h-1 bg-emerald-600 dark:bg-emerald-500 rounded-full group-hover:w-20 transition-all duration-500"></span>
        <span className="w-2 h-1 bg-emerald-600/40 dark:bg-emerald-500/40 rounded-full"></span>
      </div>
    </div>
  );
};

export default Title;
