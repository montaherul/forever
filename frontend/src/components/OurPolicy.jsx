import React from "react";

const OurPolicy = () => {
  const policies = [
    {
      title: "Swift Delivery",
      desc: "Order by 2 PM for same-day harvest delivery.",
      icon: "fa-truck-fast",
      color: "bg-emerald-500",
      shadow: "shadow-emerald-500/20",
    },
    {
      title: "100% Guaranteed",
      desc: "Farm-fresh quality or your money back instantly.",
      icon: "fa-certificate",
      color: "bg-amber-500",
      shadow: "shadow-amber-500/20",
    },
    {
      title: "Expert Support",
      desc: "Our lifestyle experts are here for you 24/7.",
      icon: "fa-headset",
      color: "bg-blue-500",
      shadow: "shadow-blue-500/20",
    },
  ];

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 my-24">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {policies.map((policy, idx) => (
          <div
            key={idx}
            className="group relative p-8 sm:p-10 rounded-[2.5rem] bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 shadow-xl shadow-black/[0.02] hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 overflow-hidden"
          >
            {/* Background Accent */}
            <div
              className={`absolute -right-4 -bottom-4 w-24 h-24 rounded-full ${policy.color} opacity-[0.03] group-hover:scale-[3] transition-transform duration-700`}
            ></div>

            <div className="relative z-10">
              <div
                className={`w-16 h-16 rounded-2xl ${policy.color} ${policy.shadow} shadow-xl flex items-center justify-center mb-8 group-hover:rotate-6 transition-transform duration-500`}
              >
                <i
                  className={`fa-solid ${policy.icon} text-2xl text-white`}
                ></i>
              </div>

              <h3 className="text-xl font-black text-slate-800 dark:text-white mb-3 font-poppins">
                {policy.title}
              </h3>

              <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed font-medium">
                {policy.desc}
              </p>

              <div className="mt-8 flex items-center gap-2 text-[10px] font-black text-emerald-600 dark:text-emerald-400 uppercase tracking-[0.2em] opacity-0 group-hover:opacity-100 transition-opacity translate-x-[-10px] group-hover:translate-x-0 duration-500">
                Learn More <i className="fa-solid fa-arrow-right-long"></i>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default OurPolicy;
