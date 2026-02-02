import React from "react";

const NewsletterBox = () => {
  const onSubmitHandler = (event) => {
    event.preventDefault();
  };

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 my-24 group">
      <div className="relative overflow-hidden rounded-[3rem] bg-slate-900 dark:bg-emerald-950 p-8 sm:p-20 text-center shadow-[0_40px_80px_-20px_rgba(0,0,0,0.4)]">
        {/* Animated Background Gradients */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 right-0 w-[50%] h-[100%] bg-emerald-500/10 blur-[100px] animate-pulse"></div>
          <div className="absolute bottom-0 left-0 w-[50%] h-[100%] bg-amber-500/5 blur-[100px] animate-pulse delay-1000"></div>
          <div
            className="absolute inset-0 opacity-[0.03] dark:opacity-[0.07]"
            style={{
              backgroundImage:
                "radial-gradient(circle at 2px 2px, white 1px, transparent 0)",
              backgroundSize: "40px 40px",
            }}
          ></div>
        </div>

        <div className="relative z-10 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-3 px-5 py-2 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-[10px] font-black uppercase tracking-[0.3em] mb-8">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            Stay Freshly Updated
          </div>

          <h2 className="text-3xl sm:text-5xl md:text-6xl font-black text-white leading-[1.1] mb-6 font-poppins">
            Get Fresh Deals <br className="hidden sm:block" />
            <span className="text-emerald-400">Delivered Daily.</span>
          </h2>

          <p className="text-slate-400 dark:text-emerald-100/60 text-lg sm:text-xl leading-relaxed mb-12">
            Subscribe to our weekly newsletter and enjoy{" "}
            <span className="text-white font-bold">20% OFF</span> your first
            harvest + exclusive early access to flash sales.
          </p>

          <form
            onSubmit={onSubmitHandler}
            className="relative max-w-2xl mx-auto"
          >
            <div className="flex flex-col sm:flex-row items-center gap-4 bg-white/5 backdrop-blur-md p-2 rounded-3xl border border-white/10 group-focus-within:border-emerald-500/50 transition-all">
              <div className="flex-1 w-full relative">
                <i className="fa-regular fa-envelope absolute left-6 top-1/2 -translate-y-1/2 text-slate-500 text-lg"></i>
                <input
                  type="email"
                  placeholder="name@example.com"
                  required
                  className="w-full bg-transparent pl-14 pr-6 py-4 text-white outline-none placeholder:text-slate-600 font-medium"
                />
              </div>
              <button
                type="submit"
                className="w-full sm:w-auto px-10 py-4 bg-emerald-500 hover:bg-emerald-400 text-slate-900 font-black rounded-2xl shadow-xl shadow-emerald-500/20 transition-all hover:scale-[1.02] active:scale-95 uppercase tracking-widest text-xs"
              >
                Subscribe Now
              </button>
            </div>
            <p className="mt-6 text-[11px] font-bold text-slate-500 dark:text-emerald-500/40 uppercase tracking-widest flex items-center justify-center gap-2">
              <i className="fa-solid fa-circle-check text-emerald-500/50"></i>
              No spam. Just pure value. Unsubscribe anytime.
            </p>
          </form>
        </div>
      </div>
    </section>
  );
};

export default NewsletterBox;
