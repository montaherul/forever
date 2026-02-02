import React, { useContext } from "react";
import { ShopContext } from "../context/ShopContext";
import Title from "./Title";

const CartTotal = () => {
  const {
    delivery_fee,
    calculateCartSubtotal,
    appliedCoupon,
    clearCoupon,
    formatCurrency,
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
    <div className="w-full bg-white dark:bg-slate-900 p-8 rounded-[2.5rem] border border-slate-100 dark:border-slate-800 shadow-xl shadow-black/[0.02]">
      <div className="mb-8">
        <Title text1="CART" text2="SUMMARY" />
      </div>

      <div className="space-y-6">
        <div className="flex justify-between items-center group">
          <span className="text-slate-500 dark:text-slate-400 font-bold text-sm uppercase tracking-widest">
            Subtotal
          </span>
          <span className="text-lg font-black text-slate-900 dark:text-white">
            {formatCurrency(subtotal)}
          </span>
        </div>

        <div className="flex justify-between items-start">
          <div>
            <span className="text-slate-500 dark:text-slate-400 font-bold text-sm uppercase tracking-widest">
              Shipping
            </span>
            <p className="text-[10px] font-bold text-emerald-600 dark:text-emerald-400 mt-1 uppercase tracking-[0.2em]">
              Priority Delivery
            </p>
          </div>
          <span className="text-lg font-black text-slate-900 dark:text-white">
            {subtotal === 0 ? formatCurrency(0) : formatCurrency(delivery_fee)}
          </span>
        </div>

        {appliedCoupon && (
          <div className="p-4 rounded-2xl bg-emerald-50 dark:bg-emerald-900/10 border border-emerald-100 dark:border-emerald-800/30 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-emerald-500 flex items-center justify-center text-white">
                <i className="fa-solid fa-tag text-xs"></i>
              </div>
              <div>
                <p className="text-[10px] font-black text-emerald-800 dark:text-emerald-400 uppercase tracking-widest">
                  Coupon Applied
                </p>
                <p className="text-xs font-bold text-slate-600 dark:text-slate-300">
                  {appliedCoupon.code}
                </p>
              </div>
            </div>
            <button
              onClick={clearCoupon}
              className="text-[10px] font-black text-rose-500 uppercase tracking-widest hover:text-rose-600 transition-colors"
            >
              Remove
            </button>
          </div>
        )}

        {couponSavings > 0 && (
          <div className="flex justify-between items-center text-emerald-600 dark:text-emerald-400 font-black">
            <span className="text-sm uppercase tracking-widest">Discounts</span>
            <span className="text-lg">-{formatCurrency(couponSavings)}</span>
          </div>
        )}

        <div className="pt-8 border-t dark:border-slate-800">
          <div className="flex justify-between items-center mb-1">
            <span className="text-xl font-black text-slate-900 dark:text-white uppercase tracking-tight">
              Total Payable
            </span>
            <span className="text-3xl font-black text-emerald-600 dark:text-emerald-400">
              {formatCurrency(total)}
            </span>
          </div>
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest text-right">
            Includes VAT & Taxes
          </p>
        </div>
      </div>
    </div>
  );
};

export default CartTotal;
