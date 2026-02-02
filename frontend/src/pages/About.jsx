import React from "react";
import Title from "../components/Title";
import NewsletterBox from "../components/NewsletterBox";
import { assets } from "../assets/assets";

const About = () => {
  return (
    <div className="bg-white dark:bg-slate-950 transition-colors">
      <div className="text-center pt-16 pb-12 border-t dark:border-slate-800 bg-gradient-to-b from-gray-50 to-transparent dark:from-slate-900/20">
        <Title text1={"ABOUT"} text2={"US"} />
        <p className="text-base text-gray-500 dark:text-slate-400 mt-4 max-w-2xl mx-auto px-4 leading-relaxed font-medium">
          Cultivating a healthier future by delivering the finest farm-fresh,
          organic groceries directly to your neighborhood.
        </p>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 my-16 flex flex-col lg:flex-row gap-16 items-center">
        <div className="w-full lg:w-1/2 relative group">
          <div className="absolute -inset-4 bg-emerald-500/10 rounded-3xl blur-2xl group-hover:bg-emerald-500/20 transition-all duration-500"></div>
          <img
            className="relative w-full rounded-2xl shadow-2xl transition-transform duration-500 hover:scale-[1.02]"
            src={assets.about_img}
            alt="About Us"
          />
        </div>
        <div className="flex flex-col justify-center gap-8 lg:w-1/2">
          <div className="bg-white dark:bg-slate-900 p-8 rounded-2xl shadow-sm border border-gray-100 dark:border-slate-800 hover:border-emerald-200 dark:hover:border-emerald-900 transition-all">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-emerald-100 dark:bg-emerald-900/30 rounded-lg flex items-center justify-center text-emerald-600">
                <i className="fa-solid fa-book-open"></i>
              </div>
              <h3 className="text-2xl font-black text-slate-900 dark:text-white font-poppins">
                Our Story
              </h3>
            </div>
            <p className="text-gray-600 dark:text-slate-400 leading-relaxed font-medium">
              Smart Grocery was born out of a passion for fresh, healthy living
              and a desire to revolutionize the way people shop for groceries
              online. Our journey began with a simple idea: to connect local
              farms directly to your doorstep, ensuring maximum freshness and
              quality.
            </p>
          </div>

          <div className="bg-white dark:bg-slate-900 p-8 rounded-2xl shadow-sm border border-gray-100 dark:border-slate-800 hover:border-orange-200 dark:hover:border-orange-900 transition-all">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-orange-100 dark:bg-orange-900/30 rounded-lg flex items-center justify-center text-orange-600">
                <i className="fa-solid fa-bullseye"></i>
              </div>
              <h3 className="text-2xl font-black text-slate-900 dark:text-white font-poppins">
                Our Mission
              </h3>
            </div>
            <p className="text-gray-600 dark:text-slate-400 leading-relaxed font-medium">
              We're dedicated to providing farm-fresh, organic groceries that
              nourish your family and support local farmers. Every product is
              carefully selected for quality, freshness, and nutritional value.
            </p>
          </div>

          <div className="bg-white dark:bg-slate-900 p-8 rounded-2xl shadow-sm border border-gray-100 dark:border-slate-800 hover:border-blue-200 dark:hover:border-blue-900 transition-all">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center text-blue-600">
                <i className="fa-solid fa-handshake-angle"></i>
              </div>
              <h3 className="text-2xl font-black text-slate-900 dark:text-white font-poppins">
                Our Promise
              </h3>
            </div>
            <p className="text-gray-600 dark:text-slate-400 leading-relaxed font-medium">
              100% fresh guarantee, same-day delivery, and complete transparency
              about where your food comes from. Your health and satisfaction are
              our top priorities.
            </p>
          </div>
        </div>
      </div>

      <div className="bg-gray-50 dark:bg-slate-900/50 py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <Title text1={"WHY"} text2={"CHOOSE US"} />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
            <div className="group bg-white dark:bg-slate-900 border border-gray-100 dark:border-slate-800 rounded-3xl p-10 shadow-sm hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2">
              <div className="w-16 h-16 bg-emerald-50 dark:bg-emerald-900/20 rounded-2xl flex items-center justify-center mb-8 group-hover:bg-emerald-500 group-hover:text-white transition-colors duration-500">
                <i className="fa-solid fa-leaf text-2xl text-emerald-600 group-hover:text-white"></i>
              </div>
              <h3 className="text-xl font-black text-slate-900 dark:text-white mb-4 uppercase tracking-tight">
                Farm-Fresh Quality
              </h3>
              <p className="text-gray-500 dark:text-slate-400 leading-relaxed font-medium">
                We meticulously select and source each product directly from
                trusted local farms to ensure it meets our stringent quality
                standards. Every item is checked for freshness before delivery.
              </p>
            </div>

            <div className="group bg-white dark:bg-slate-900 border border-gray-100 dark:border-slate-800 rounded-3xl p-10 shadow-sm hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2">
              <div className="w-16 h-16 bg-orange-50 dark:bg-orange-900/20 rounded-2xl flex items-center justify-center mb-8 group-hover:bg-orange-500 group-hover:text-white transition-colors duration-500">
                <i className="fa-solid fa-bolt text-2xl text-orange-600 group-hover:text-white"></i>
              </div>
              <h3 className="text-xl font-black text-slate-900 dark:text-white mb-4 uppercase tracking-tight">
                Lightning Delivery
              </h3>
              <p className="text-gray-500 dark:text-slate-400 leading-relaxed font-medium">
                With our user-friendly interface and streamlined ordering
                process, shopping has never been easier. Order before 2 PM for
                same-day delivery to your doorstep!
              </p>
            </div>

            <div className="group bg-white dark:bg-slate-900 border border-gray-100 dark:border-slate-800 rounded-3xl p-10 shadow-sm hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2">
              <div className="w-16 h-16 bg-blue-50 dark:bg-blue-900/20 rounded-2xl flex items-center justify-center mb-8 group-hover:bg-blue-500 group-hover:text-white transition-colors duration-500">
                <i className="fa-solid fa-headset text-2xl text-blue-600 group-hover:text-white"></i>
              </div>
              <h3 className="text-xl font-black text-slate-900 dark:text-white mb-4 uppercase tracking-tight">
                24/7 Support
              </h3>
              <p className="text-gray-500 dark:text-slate-400 leading-relaxed font-medium">
                Our team of dedicated professionals is here to assist you every
                step of the way, ensuring your satisfaction is our top priority.
                We're always just a message away!
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 my-24">
        <div className="bg-gradient-to-br from-emerald-600 to-green-700 dark:from-emerald-900 dark:to-green-950 rounded-[3rem] p-12 sm:p-20 text-center relative overflow-hidden shadow-2xl">
          <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_2px_2px,#fff_1px,transparent_0)] bg-[size:40px_40px]"></div>
          <h3 className="text-3xl sm:text-5xl font-black text-white mb-6 font-poppins relative z-10">
            Our Achievements
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-12 relative z-10">
            <div className="bg-white/10 backdrop-blur-md rounded-3xl p-8 border border-white/20 hover:bg-white/20 transition-all cursor-default group">
              <p className="text-4xl sm:text-5xl font-black text-white mb-2 group-hover:scale-110 transition-transform">
                10K+
              </p>
              <p className="text-emerald-100 text-sm font-bold uppercase tracking-widest">
                Happy Customers
              </p>
            </div>
            <div className="bg-white/10 backdrop-blur-md rounded-3xl p-8 border border-white/20 hover:bg-white/20 transition-all cursor-default group">
              <p className="text-4xl sm:text-5xl font-black text-white mb-2 group-hover:scale-110 transition-transform">
                50+
              </p>
              <p className="text-emerald-100 text-sm font-bold uppercase tracking-widest">
                Local Partners
              </p>
            </div>
            <div className="bg-white/10 backdrop-blur-md rounded-3xl p-8 border border-white/20 hover:bg-white/20 transition-all cursor-default group">
              <p className="text-4xl sm:text-5xl font-black text-white mb-2 group-hover:scale-110 transition-transform">
                500+
              </p>
              <p className="text-emerald-100 text-sm font-bold uppercase tracking-widest">
                Fresh Products
              </p>
            </div>
            <div className="bg-white/10 backdrop-blur-md rounded-3xl p-8 border border-white/20 hover:bg-white/20 transition-all cursor-default group">
              <p className="text-4xl sm:text-5xl font-black text-white mb-2 group-hover:scale-110 transition-transform">
                99%
              </p>
              <p className="text-emerald-100 text-sm font-bold uppercase tracking-widest">
                Satisfaction
              </p>
            </div>
          </div>
        </div>
      </div>

      <NewsletterBox />
    </div>
  );
};

export default About;
