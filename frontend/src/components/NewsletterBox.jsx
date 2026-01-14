import React from "react";

const NewsletterBox = () => {
  const onSubmitHandler = (event) => {
    event.preventDefault();
  };
  return (
    <div className="text-center bg-gradient-to-r from-green-600 to-green-700 text-white py-16 px-4 rounded-2xl my-10 shadow-xl">
      <p className="text-3xl font-poppins font-bold">
        Get Fresh Deals Delivered!
      </p>
      <p className="text-green-100 mt-3 text-lg">
        Subscribe now & get 20% off your first order + exclusive weekly offers
      </p>
      <form
        onSubmit={onSubmitHandler}
        className="w-full sm:w-1/2 flex items-center gap-3 mx-auto my-6 bg-white rounded-button overflow-hidden shadow-lg"
      >
        <input
          className="w-full sm:flex-1 outline-none px-6 py-4 text-gray-700"
          type="email"
          placeholder="Enter your email address"
          required
        />
        <button
          className="bg-orange-500 hover:bg-orange-600 text-white font-bold text-sm px-8 py-4 transition-colors"
          type="submit"
        >
          SUBSCRIBE
        </button>
      </form>
      <p className="text-sm text-green-100 mt-2">
        ✅ No spam, just fresh deals and grocery tips!
      </p>
    </div>
  );
};

export default NewsletterBox;
