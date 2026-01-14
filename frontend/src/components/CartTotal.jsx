import React, { useContext } from "react";
import { ShopContext } from "../context/ShopContext";
import Title from "./Title";

const CartTotal = () => {
  const {
    currency,
    delivery_fee,
    calculateCartSubtotal,
    appliedCoupon,
    couponMessage,
  } = useContext(ShopContext);

  const subtotal = calculateCartSubtotal();
  const couponSavings = appliedCoupon
    ? subtotal >= (appliedCoupon.minPurchase || 0)
      ? Number(((appliedCoupon.discountPercent / 100) * subtotal).toFixed(2))
      : 0
    : 0;
  const total =
    subtotal === 0 ? 0 : Math.max(0, subtotal - couponSavings) + delivery_fee;

  return (
    <div className="w-full">
      <div className="text-2xl mb-6">
        <Title text1={"CART"} text2={"TOTALS"} />
      </div>
      <div className="space-y-4">
        <div className="flex justify-between items-center py-3 border-b-2 border-gray-200">
          <p className="text-gray-700 font-medium">Subtotal</p>
          <p className="text-lg font-semibold text-gray-800">
            {currency} {subtotal.toFixed(2)}
          </p>
        </div>

        <div className="flex justify-between items-center py-3 border-b-2 border-gray-200">
          <div>
            <p className="text-gray-700 font-medium">Shipping Fee</p>
            <p className="text-xs text-gray-500 mt-1">Same-day delivery</p>
          </div>
          <p className="text-lg font-semibold text-green-600">
            {subtotal === 0
              ? `${currency} 0.00`
              : `${currency} ${delivery_fee.toFixed(2)}`}
          </p>
        </div>

        {couponSavings > 0 && (
          <div className="flex justify-between items-center py-3 border-b-2 border-gray-200 text-green-700">
            <p className="font-semibold flex items-center gap-2">
              Coupon ({appliedCoupon.code})
            </p>
            <p className="text-lg font-semibold">
              - {currency} {couponSavings.toFixed(2)}
            </p>
          </div>
        )}
        {appliedCoupon === null && couponMessage && (
          <div className="text-sm text-red-600">{couponMessage}</div>
        )}

        <div className="flex justify-between items-center py-4 bg-gradient-to-r from-green-50 to-green-100 -mx-4 px-4 rounded-lg border-2 border-green-200">
          <p className="text-xl font-bold text-green-900">Total</p>
          <p className="text-2xl font-bold text-green-700">
            {currency} {total.toFixed(2)}
          </p>
        </div>

        {subtotal > 50 && (
          <div className="bg-orange-50 p-3 rounded-lg border-l-4 border-orange-500">
            <p className="text-sm text-orange-800 font-medium">
              You've earned free delivery on orders over ${currency}50!
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CartTotal;
