import React, {
  useContext,
  useEffect,
  useState,
  useCallback,
  useMemo,
} from "react";
import { useNavigate } from "react-router-dom";


import { useParams } from "react-router-dom";
import { motion } from "framer-motion";
import axios from "axios";
import { toast } from "react-toastify";

import { ShopContext } from "../context/ShopContext";
import RelatedProducts from "../components/RelatedProducts";
import { assets } from "../assets/assets";

/* =========================================================
   PRODUCT PAGE
========================================================= */

const Product = () => {
  const { productId } = useParams();

  const {
    products,
    currency,
    addToCart,
    token,
    backendUrl,
    user,
    wishlist,
    compareList,
    toggleWishlist,
    toggleCompare,
    normalizePricing,
  } = useContext(ShopContext);
const navigate = useNavigate();

  /* -------------------- STATE -------------------- */
  const [productData, setProductData] = useState(null);
  const [image, setImage] = useState("");
  const [size, setSize] = useState("");
  const [currentPrice, setCurrentPrice] = useState(0);

  const [activeTab, setActiveTab] = useState("description");

  const [reviews, setReviews] = useState([]);
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");
  const [submitting, setSubmitting] = useState(false);

  /* -------------------- DERIVED -------------------- */
  const hasSpecs = useMemo(
    () => Object.keys(productData?.specs || {}).length > 0,
    [productData],
  );

  const isInStock =
    productData?.inStock !== false &&
    Number(productData?.stockQuantity ?? 0) > 0;

  const hasDiscount = Number(productData?.discount || 0) > 0;

  const actualPrice = Number(currentPrice || 0);
  const finalPrice = (
    actualPrice *
    (1 - Number(productData?.discount || 0) / 100)
  ).toFixed(2);

  /* -------------------- FETCH PRODUCT -------------------- */
  const fetchProductData = useCallback(() => {
    let product = products.find((p) => p._id === productId);
    if (!product) return;

    product = normalizePricing(product);
    setProductData(product);

    setImage(
      product.images?.[0] ||
        "https://via.placeholder.com/600x600?text=No+Image",
    );

    if (product.sizes?.length) {
      setSize(Object.keys(product.sizePricing || {})[0] || product.sizes[0]);
    }
  }, [productId, products, normalizePricing]);

  useEffect(() => {
    fetchProductData();
  }, [fetchProductData]);

  /* -------------------- PRICE UPDATE -------------------- */
  useEffect(() => {
    if (!productData || !size) return;
    setCurrentPrice(productData.sizePricing?.[size] || productData.price);
  }, [productData, size]);

  /* -------------------- REVIEWS -------------------- */
  useEffect(() => {
    if (!productId) return;
    axios
      .post(`${backendUrl}/api/review/product`, { productId })
      .then((res) => {
        if (res.data.success) setReviews(res.data.reviews || []);
      })
      .catch(() => setReviews([]));
  }, [productId, backendUrl]);

  /* -------------------- SUBMIT REVIEW -------------------- */
  const submitReview = async (e) => {
    e.preventDefault();

    if (!token) return toast.error("Login required");
    if (!comment.trim()) return toast.error("Comment required");

    setSubmitting(true);
    try {
      const res = await axios.post(
        `${backendUrl}/api/review/add`,
        { productId, rating, comment, userName: user?.name },
        { headers: { token } },
      );

      if (res.data.success) {
        toast.success("Review added");
        setComment("");
        setRating(5);

        const list = await axios.post(`${backendUrl}/api/review/product`, {
          productId,
        });
        setReviews(list.data.reviews || []);
      }
    } catch {
      toast.error("Failed to submit review");
    } finally {
      setSubmitting(false);
    }
  };

  if (!productData) {
    return (
      <p className="text-center py-20 text-gray-500">Loading product...</p>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 25 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-gray-50 border-t pt-10 pb-32"
    >
      {/* =====================================================
          MAIN PRODUCT CARD
      ====================================================== */}
      <div className="max-w-7xl mx-auto px-4">
        <div className="bg-white rounded-3xl shadow-lg p-6 md:p-8 grid lg:grid-cols-[420px_1fr] gap-10">
          {/* ================= LEFT : IMAGES ================= */}
          <div className="flex gap-4">
            <div className="flex flex-col gap-3">
              {productData.images?.map((img, i) => (
                <img
                  key={i}
                  src={img}
                  onClick={() => setImage(img)}
                  className={`w-20 h-20 object-cover rounded-xl cursor-pointer border-2 transition
                    ${
                      image === img
                        ? "border-emerald-500"
                        : "border-gray-200 hover:border-emerald-300"
                    }`}
                  alt="thumb"
                />
              ))}
            </div>

            <div className="flex-1 h-[420px] flex items-center justify-center bg-gray-50 rounded-2xl border">
              <img
                src={image}
                alt="product"
                className="max-h-[360px] max-w-full object-contain transition-transform duration-300 hover:scale-105"
              />
            </div>
          </div>

          {/* ================= RIGHT : INFO ================= */}
          <div className="flex flex-col gap-6">
            <h1 className="text-3xl font-black text-slate-900">
              {productData.name}
            </h1>

            {/* PRICE */}
            <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-4 flex items-center gap-4">
              <span className="text-3xl font-black text-emerald-700">
                {currency}
                {finalPrice}
              </span>

              {hasDiscount && (
                <span className="line-through text-gray-500">
                  {currency}
                  {actualPrice.toFixed(2)}
                </span>
              )}

              <span
                className={`ml-auto px-3 py-1 rounded-full text-xs font-bold
                  ${
                    isInStock
                      ? "bg-emerald-200 text-emerald-800"
                      : "bg-rose-200 text-rose-800"
                  }`}
              >
                {isInStock ? "In Stock" : "Out of Stock"}
              </span>
            </div>

            {/* DESCRIPTION */}
            <table className="w-full text-sm">
              <tbody>
                {Object.entries(productData.specs || {}).map(([k, v]) => (
                  <tr key={k}>
                    <td className="border px-4 py-3 font-bold w-1/3">{k}</td>
                    <td className="border px-4 py-3">{v}</td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* SIZES */}
            {productData.sizes?.length > 0 && (
              <div>
                <p className="font-bold mb-2 text-sm">Select Size</p>
                <div className="flex flex-wrap gap-3">
                  {productData.sizes.map((s) => (
                    <button
                      key={s}
                      onClick={() => setSize(s)}
                      className={`px-5 py-2 rounded-lg border font-bold text-sm transition
                        ${
                          size === s
                            ? "bg-emerald-600 text-white border-emerald-600"
                            : "bg-white border-gray-300 hover:border-emerald-400"
                        }`}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* CTA */}
            <button
              onClick={() => addToCart(productData._id, size)}
              disabled={!isInStock || !size}
              className="w-full py-4 bg-orange-500 hover:bg-orange-600 disabled:opacity-50
                         text-white font-black rounded-xl transition"
            >
              Add to Cart
            </button>

            {/* WISHLIST / COMPARE */}
            <div className="grid grid-cols-2 gap-3">
              {/* WISHLIST */}
              <button
                onClick={() => {
                  if (wishlist?.includes(productData._id)) {
                    navigate("/wishlist");
                  } else {
                    toggleWishlist(productData._id);
                  }
                }}
                className={`border py-3 rounded-xl text-sm font-bold transition
      ${
        wishlist?.includes(productData._id)
          ? "bg-rose-50 border-rose-500 text-rose-600 hover:bg-rose-600 hover:text-white"
          : "hover:bg-gray-900 hover:text-white"
      }`}
              >
                {wishlist?.includes(productData._id)
                  ? "View Wishlist"
                  : "Add to Wishlist"}
              </button>

              {/* COMPARE */}
              <button
                onClick={() => {
                  if (compareList?.includes(productData._id)) {
                    navigate("/compare");
                  } else {
                    toggleCompare(productData._id);
                  }
                }}
                className={`border py-3 rounded-xl text-sm font-bold transition
      ${
        compareList?.includes(productData._id)
          ? "bg-amber-50 border-amber-500 text-amber-600 hover:bg-amber-600 hover:text-white"
          : "hover:bg-gray-900 hover:text-white"
      }`}
              >
                {compareList?.includes(productData._id)
                  ? "View Compare"
                  : "Add to Compare"}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* =====================================================
          TABS
      ====================================================== */}
      <div className="max-w-7xl mx-auto mt-14 bg-white rounded-3xl shadow-lg">
        <div className="flex border-b">
          {["description", hasSpecs && "specs", "reviews"]
            .filter(Boolean)
            .map((t) => (
              <button
                key={t}
                onClick={() => setActiveTab(t)}
                className={`px-8 py-4 font-bold text-sm
                  ${
                    activeTab === t
                      ? "border-b-4 border-emerald-600 text-emerald-600"
                      : "text-gray-500 hover:text-emerald-600"
                  }`}
              >
                {t.toUpperCase()}
              </button>
            ))}
        </div>

        <div className="p-8">
          {activeTab === "description" && (
            <div className="space-y-4 text-gray-700">
              {(productData.description || "")
                .split("\n")
                .filter(Boolean)
                .map((line, index) => {
                  const hasTitle = line.includes(":");

                  if (hasTitle) {
                    const [title, content] = line.split(":");

                    return (
                      <div key={index} className="space-y-2">
                        <h4 className="text-lg font-bold text-slate-900">
                          {title.trim()}
                        </h4>
                        {content && (
                          <p className="pl-4 border-l-2 border-emerald-500 leading-relaxed">
                            {content.trim()}
                          </p>
                        )}
                      </div>
                    );
                  }

                  return (
                    <div key={index} className="flex items-start gap-3">
                      <span className="mt-2 w-2 h-2 bg-emerald-500 rounded-full flex-shrink-0"></span>
                      <p className="leading-relaxed">{line}</p>
                    </div>
                  );
                })}
            </div>
          )}

          {activeTab === "specs" && (
            <table className="w-full text-sm">
              <tbody>
                {Object.entries(productData.specs || {}).map(([k, v]) => (
                  <tr key={k}>
                    <td className="border px-4 py-3 font-bold w-1/3">{k}</td>
                    <td className="border px-4 py-3">{v}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}

          {activeTab === "reviews" && (
            <>
              {reviews.map((r, i) => (
                <div key={i} className="border-b py-4">
                  <p className="font-bold">{r.userName}</p>
                  <p className="text-sm text-gray-600">{r.comment}</p>
                </div>
              ))}

              {token && (
                <form onSubmit={submitReview} className="mt-6 space-y-3">
                  <textarea
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    className="w-full border p-4 rounded-xl"
                    placeholder="Write a review..."
                  />
                  <button
                    disabled={submitting}
                    className="px-6 py-3 bg-emerald-600 text-white rounded-xl font-bold"
                  >
                    Submit Review
                  </button>
                </form>
              )}
            </>
          )}
        </div>
      </div>

      {/* =====================================================
          RELATED PRODUCTS
      ====================================================== */}
      <div className="max-w-7xl mx-auto mt-20">
        <RelatedProducts
          category={productData.category}
          subCategory={productData.subCategory}
        />
      </div>

      {/* =====================================================
          STICKY CART BAR
      ====================================================== */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t shadow-lg p-4 flex items-center gap-4 z-50">
        <div className="flex-1">
          <p className="text-xs text-gray-500 truncate">{productData.name}</p>
          <p className="font-black text-emerald-700">
            {currency}
            {finalPrice}
          </p>
        </div>
        <button
          onClick={() => addToCart(productData._id, size)}
          className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-xl font-bold"
        >
          Add to Cart
        </button>
      </div>
    </motion.div>
  );
};

export default Product;
