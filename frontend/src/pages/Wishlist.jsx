import { useContext } from "react";
import { ShopContext } from "../context/ShopContext";
import { useNavigate } from "react-router-dom";
import Title from "../components/Title";

const Wishlist = () => {
  const { wishlist, products, toggleWishlist, addToCart, currency } =
    useContext(ShopContext);

  const navigate = useNavigate();

  const wishlistProducts = products.filter((p) => wishlist?.includes(p._id));

  return (
    <div className="min-h-screen bg-gray-50 border-t pt-16 pb-24">
      <div className="max-w-7xl mx-auto px-4">
        <Title text1="MY" text2="WISHLIST" />

        {wishlistProducts.length === 0 ? (
          <div className="text-center py-24">
            <p className="text-gray-500 text-lg font-semibold">
              Your wishlist is empty 💔
            </p>
            <button
              onClick={() => navigate("/")}
              className="mt-6 px-6 py-3 bg-emerald-600 text-white rounded-xl font-bold"
            >
              Continue Shopping
            </button>
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-10">
            {wishlistProducts.map((product) => (
              <div
                key={product._id}
                className="bg-white rounded-2xl shadow-lg p-4 flex flex-col"
              >
                <div
                  onClick={() => navigate(`/product/${product._id}`)}
                  className="cursor-pointer bg-gray-50 rounded-xl h-56 flex items-center justify-center"
                >
                  <img
                    src={product.images?.[0]}
                    alt={product.name}
                    className="max-h-48 object-contain"
                  />
                </div>

                <h3 className="mt-4 font-black text-slate-900">
                  {product.name}
                </h3>

                <p className="text-emerald-600 font-bold mt-1">
                  {currency}
                  {product.price}
                </p>

                <div className="mt-auto pt-4 flex gap-3">
                  <button
                    onClick={() => addToCart(product._id)}
                    className="flex-1 py-2 bg-orange-500 hover:bg-orange-600 text-white rounded-lg font-bold"
                  >
                    Add to Cart
                  </button>

                  <button
                    onClick={() => toggleWishlist(product._id)}
                    className="px-4 py-2 border rounded-lg font-bold hover:bg-gray-900 hover:text-white"
                  >
                    ✕
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Wishlist;
