import React from "react";
import Title from "../components/Title";
import NewsletterBox from "../components/NewsletterBox";
import { assets } from "../assets/assets";

const About = () => {
  return (
    <div>
      <div className="text-3xl text-center pt-10 pb-6 border-t">
        <Title text1={"ABOUT"} text2={"US"} />
        <p className="text-sm text-gray-600 mt-3 max-w-2xl mx-auto">
          Your trusted partner for fresh, organic groceries
        </p>
      </div>

      <div className="my-12 flex flex-col md:flex-row gap-16 items-center">
        <div className="w-full md:w-1/2">
          <img
            className="w-full rounded-2xl shadow-2xl hover:shadow-3xl transition-shadow duration-300"
            src={assets.about_img}
            alt="About Us"
          />
        </div>
        <div className="flex flex-col justify-center gap-6 md:w-1/2 text-gray-600">
          <div className="bg-green-50 p-6 rounded-xl border-l-4 border-green-600">
            <h3 className="text-2xl font-bold text-green-900 mb-3">
              Our Story
            </h3>
            <p className="leading-relaxed">
              Smart Grocery was born out of a passion for fresh, healthy living
              and a desire to revolutionize the way people shop for groceries
              online. Our journey began with a simple idea: to connect local
              farms directly to your doorstep, ensuring maximum freshness and
              quality.
            </p>
          </div>

          <div className="bg-orange-50 p-6 rounded-xl border-l-4 border-orange-600">
            <h3 className="text-2xl font-bold text-orange-900 mb-3">
              Our Mission
            </h3>
            <p className="leading-relaxed">
              We're dedicated to providing farm-fresh, organic groceries that
              nourish your family and support local farmers. Every product is
              carefully selected for quality, freshness, and nutritional value.
            </p>
          </div>

          <div className="bg-blue-50 p-6 rounded-xl border-l-4 border-blue-600">
            <h3 className="text-2xl font-bold text-blue-900 mb-3">
              Our Promise
            </h3>
            <p className="leading-relaxed">
              100% fresh guarantee, same-day delivery, and complete transparency
              about where your food comes from. Your health and satisfaction are
              our top priorities.
            </p>
          </div>
        </div>
      </div>

      <div className="text-3xl text-center py-8">
        <Title text1={"WHY"} text2={"CHOOSE US"} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
        <div className="group bg-gradient-to-br from-green-50 to-green-100 hover:from-green-100 hover:to-green-200 border-2 border-green-200 rounded-2xl px-8 py-12 flex flex-col gap-5 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
          <h3 className="text-xl font-bold text-green-900">
            Farm-Fresh Quality
          </h3>
          <p className="text-gray-700 leading-relaxed">
            We meticulously select and source each product directly from trusted
            local farms to ensure it meets our stringent quality standards.
            Every item is checked for freshness before delivery.
          </p>
        </div>

        <div className="group bg-gradient-to-br from-orange-50 to-orange-100 hover:from-orange-100 hover:to-orange-200 border-2 border-orange-200 rounded-2xl px-8 py-12 flex flex-col gap-5 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
          <h3 className="text-xl font-bold text-orange-900">
            Lightning-Fast Delivery
          </h3>
          <p className="text-gray-700 leading-relaxed">
            With our user-friendly interface and streamlined ordering process,
            shopping has never been easier. Order before 2 PM for same-day
            delivery to your doorstep!
          </p>
        </div>

        <div className="group bg-gradient-to-br from-blue-50 to-blue-100 hover:from-blue-100 hover:to-blue-200 border-2 border-blue-200 rounded-2xl px-8 py-12 flex flex-col gap-5 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
          <h3 className="text-xl font-bold text-blue-900">
            24/7 Customer Support
          </h3>
          <p className="text-gray-700 leading-relaxed">
            Our team of dedicated professionals is here to assist you every step
            of the way, ensuring your satisfaction is our top priority. We're
            always just a message away!
          </p>
        </div>
      </div>

      <div className="bg-gradient-to-r from-green-100 to-orange-100 rounded-2xl p-10 mb-12 text-center">
        <h3 className="text-3xl font-bold text-green-900 mb-4">
          Our Achievements
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-8">
          <div className="bg-white rounded-xl p-6 shadow-md">
            <p className="text-4xl font-bold text-green-600">10K+</p>
            <p className="text-gray-600 mt-2">Happy Customers</p>
          </div>
          <div className="bg-white rounded-xl p-6 shadow-md">
            <p className="text-4xl font-bold text-orange-600">50+</p>
            <p className="text-gray-600 mt-2">Local Farm Partners</p>
          </div>
          <div className="bg-white rounded-xl p-6 shadow-md">
            <p className="text-4xl font-bold text-blue-600">500+</p>
            <p className="text-gray-600 mt-2">Fresh Products</p>
          </div>
          <div className="bg-white rounded-xl p-6 shadow-md">
            <p className="text-4xl font-bold text-yellow-600">99%</p>
            <p className="text-gray-600 mt-2">Satisfaction Rate</p>
          </div>
        </div>
      </div>

      <NewsletterBox />
    </div>
  );
};

export default About;
