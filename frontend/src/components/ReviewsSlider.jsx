import React, { useEffect, useState, useContext, useRef } from "react";
import axios from "axios";
import { ShopContext } from "../context/ShopContext";

const VISIBLE = 3;

const ReviewsSlider = () => {
  const { backendUrl } = useContext(ShopContext);

  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [index, setIndex] = useState(VISIBLE);
  const trackRef = useRef(null);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const res = await axios.get(`${backendUrl}/api/review/recent`);
        setReviews(res.data.reviews || []);
        setLoading(false);
      } catch (err) {
        console.error(err);
        setLoading(false);
      }
    };
    fetchReviews();
  }, [backendUrl]);

  useEffect(() => {
    if (reviews.length <= VISIBLE) return;
    const interval = setInterval(() => {
      setIndex((prev) => prev + 1);
    }, 4000);
    return () => clearInterval(interval);
  }, [reviews]);

  useEffect(() => {
    if (!trackRef.current || reviews.length <= VISIBLE) return;
    const total = reviews.length;
    if (index === total + VISIBLE) {
      setTimeout(() => {
        if (trackRef.current) trackRef.current.style.transition = "none";
        setIndex(VISIBLE);
      }, 700);
    }
  }, [index, reviews]);

  useEffect(() => {
    if (trackRef.current) {
      requestAnimationFrame(() => {
        if (trackRef.current) {
          trackRef.current.style.transition =
            "transform 0.7s cubic-bezier(0.16, 1, 0.3, 1)";
        }
      });
    }
  }, [index]);

  if (loading) {
    return (
      <div className="grid grid-cols-3 gap-4">
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            className="h-48 bg-slate-100 dark:bg-slate-800 rounded-3xl animate-pulse"
          />
        ))}
      </div>
    );
  }

  if (reviews.length === 0) return null;

  const extended = [
    ...reviews.slice(-VISIBLE),
    ...reviews,
    ...reviews.slice(0, VISIBLE),
  ];

  return (
    <div className="relative w-full overflow-hidden py-10">
      <div
        ref={trackRef}
        className="flex"
        style={{
          transform: `translateX(-${index * (100 / VISIBLE)}%)`,
        }}
      >
        {extended.map((review, idx) => {
          const ratingNumber = Number(review.rating) || 5;

          return (
            <div key={idx} className="w-1/3 flex-shrink-0 px-4">
              <div className="h-full bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 p-8 rounded-[2.5rem] shadow-xl shadow-black/[0.02] flex flex-col justify-between group transition-all hover:border-emerald-500/30">
                <div className="mb-6">
                  <div className="flex gap-1 mb-4">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <i
                        key={i}
                        className={`fa-solid fa-star text-[10px] ${
                          i < ratingNumber
                            ? "text-emerald-500"
                            : "text-slate-200"
                        }`}
                      ></i>
                    ))}
                  </div>
                  <p className="text-slate-800 dark:text-slate-200 font-medium italic leading-relaxed line-clamp-3">
                    &ldquo;{review.comment}&rdquo;
                  </p>
                </div>

                <div className="flex items-center gap-4 pt-6 border-t border-slate-50 dark:border-slate-800">
                  <div className="w-10 h-10 rounded-full bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center font-black text-emerald-700 dark:text-emerald-400 text-xs">
                    {review.userName?.[0]?.toUpperCase()}
                  </div>
                  <div>
                    <h4 className="text-sm font-black text-slate-900 dark:text-white uppercase tracking-wider">
                      {review.userName}
                    </h4>
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                      Verified Buyer
                    </p>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ReviewsSlider;
