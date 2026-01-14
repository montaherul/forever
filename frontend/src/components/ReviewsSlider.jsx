import { useEffect, useRef, useState } from "react";
import axios from "axios";
import { useContext } from "react";
import { ShopContext } from "../context/ShopContext";

const ReviewsSlider = () => {
  const { backendUrl } = useContext(ShopContext);
  const [reviews, setReviews] = useState([]);
  const [index, setIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const timerRef = useRef(null);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        setLoading(true);
        const res = await axios.get(`${backendUrl}/api/review/recent`);
        if (
          res.data.success &&
          res.data.reviews &&
          Array.isArray(res.data.reviews)
        ) {
          // Filter reviews to ensure they have required fields
          const validReviews = res.data.reviews.filter(
            (review) => review.comment && review.rating
          );
          setReviews(validReviews);
          console.log("Reviews loaded:", validReviews);
        } else {
          console.log("No reviews or invalid response:", res.data);
          setReviews([]);
        }
      } catch (error) {
        console.error("Error fetching reviews:", error);
        setReviews([]);
      } finally {
        setLoading(false);
      }
    };
    fetchReviews();
  }, [backendUrl]);

  // Auto-slide effect
  useEffect(() => {
    if (reviews.length === 0) {
      clearInterval(timerRef.current);
      return;
    }

    timerRef.current = setInterval(() => {
      setIndex((prev) => (prev + 1) % reviews.length);
    }, 5000); // Changed to 5 seconds for better readability

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [reviews.length]);

  // Handle manual navigation
  const goToSlide = (i) => {
    setIndex(i);
    // Reset timer when user clicks
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }
    timerRef.current = setInterval(() => {
      setIndex((prev) => (prev + 1) % reviews.length);
    }, 5000);
  };

  if (loading) {
    return (
      <div className="bg-gradient-to-r from-green-50 to-white rounded-2xl p-6 shadow-lg border-2 border-green-100 h-32 flex items-center justify-center">
        <p className="text-gray-500">Loading customer reviews...</p>
      </div>
    );
  }

  if (!reviews.length) {
    return (
      <div className="bg-gradient-to-r from-green-50 to-white rounded-2xl p-6 shadow-lg border-2 border-green-100">
        <p className="text-gray-600 text-center">
          No customer reviews yet. Be the first to review!
        </p>
      </div>
    );
  }

  const review = reviews[index];
  const ratingNumber = Number(review.rating) || 5;

  return (
    <div className="bg-gradient-to-r from-green-50 to-white rounded-2xl p-8 shadow-lg border-2 border-green-100 overflow-hidden">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        {/* Review Content */}
        <div className="flex-1">
          <div className="mb-4">
            <p className="text-sm text-gray-500 font-semibold uppercase tracking-wide mb-3">
              ⭐ Customer Stories
            </p>
            <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-4 italic">
              &quot;{review.comment}&quot;
            </h3>
          </div>

          {/* Reviewer Info */}
          <div className="space-y-2">
            <p className="text-gray-800 font-semibold text-lg">
              {review.userName || "Anonymous Customer"}
            </p>
            <div className="flex items-center gap-1">
              <span className="text-yellow-500 text-xl">
                {"★".repeat(ratingNumber)}
                {"☆".repeat(5 - ratingNumber)}
              </span>
              <span className="text-gray-600 text-sm ml-2">
                ({ratingNumber}/5)
              </span>
            </div>
          </div>
        </div>

        {/* Slide Navigation Dots */}
        <div className="flex items-center gap-2 md:flex-col">
          <span className="text-sm text-gray-600 mr-2 md:mr-0 md:mb-3">
            {index + 1} / {reviews.length}
          </span>
          <div className="flex md:flex-col gap-2">
            {reviews.map((_, i) => (
              <button
                key={i}
                onClick={() => goToSlide(i)}
                className={`rounded-full transition-all duration-300 ${
                  i === index
                    ? "bg-green-600 h-3 w-8 md:w-3 md:h-8"
                    : "bg-gray-300 h-2 w-6 md:w-2 md:h-6 hover:bg-gray-400"
                }`}
                title={`Review ${i + 1}`}
              ></button>
            ))}
          </div>
        </div>
      </div>

      {/* Auto-play indicator */}
      <div className="mt-4 h-1 bg-gray-200 rounded-full overflow-hidden">
        <div
          className="h-full bg-green-500 rounded-full transition-all"
          style={{
            width: "100%",
            animation: "shrink 5s linear forwards",
          }}
        ></div>
      </div>

      <style>{`
        @keyframes shrink {
          from {
            width: 100%;
          }
          to {
            width: 0%;
          }
        }
      `}</style>
    </div>
  );
};

export default ReviewsSlider;
