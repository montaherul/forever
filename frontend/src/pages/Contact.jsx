import { useState, useContext, useEffect } from "react";
import { ShopContext } from "../context/ShopContext";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate, useSearchParams } from "react-router-dom";
import { motion } from "framer-motion";

const ForgotPassword = () => {
  const { token, backendUrl } = useContext(ShopContext);
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const [step, setStep] = useState("request");
  const [email, setEmail] = useState("");
  const [resetToken, setResetToken] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const tokenParam = searchParams.get("token");
    if (tokenParam) {
      setResetToken(tokenParam);
      setStep("reset");
    }
  }, [searchParams]);

  useEffect(() => {
    if (token) navigate("/");
  }, [token, navigate]);

  const handleForgotPassword = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (!email) throw new Error("Please enter your email");

      const response = await axios.post(
        `${backendUrl}/api/user/forgot-password`,
        { email },
      );

      if (response.data.success) {
        toast.success("Reset link sent to your email!");
        if (response.data.resetToken) {
          setResetToken(response.data.resetToken);
          setStep("reset");
          toast.info("Use the form below to reset your password");
        }
        setEmail("");
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (!newPassword || !confirmPassword)
        throw new Error("Please fill in all fields");

      if (newPassword !== confirmPassword)
        throw new Error("Passwords do not match");

      if (newPassword.length < 6)
        throw new Error("Password must be at least 6 characters");

      const response = await axios.post(
        `${backendUrl}/api/user/reset-password`,
        { resetToken, newPassword },
      );

      if (response.data.success) {
        toast.success("Password reset successfully! Redirecting...");
        setTimeout(() => navigate("/login"), 2000);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white dark:bg-slate-950 flex items-center justify-center py-12 px-4 transition-colors">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md"
      >
        <div className="bg-white dark:bg-slate-900 rounded-[3rem] p-10 sm:p-14 border border-gray-100 dark:border-slate-800 shadow-2xl">
          <div className="text-center mb-10">
            <div className="w-16 h-16 bg-emerald-100 dark:bg-emerald-900/30 rounded-2xl flex items-center justify-center mx-auto mb-6 text-emerald-600">
              <i className="fa-solid fa-key text-2xl"></i>
            </div>

            <h1 className="text-3xl font-black text-slate-900 dark:text-white mb-3">
              {step === "request" ? "Recover Password" : "Reset Password"}
            </h1>

            <p className="text-gray-500 dark:text-slate-400 text-sm">
              {step === "request"
                ? "Enter your email to receive reset instructions."
                : "Choose a strong new password."}
            </p>
          </div>

          <form
            onSubmit={
              step === "request" ? handleForgotPassword : handleResetPassword
            }
            className="space-y-6"
          >
            {step === "request" ? (
              <input
                type="email"
                placeholder="Email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full h-14 px-6 rounded-2xl bg-gray-50 dark:bg-slate-800 border-2 border-transparent focus:border-emerald-500 outline-none font-bold"
              />
            ) : (
              <>
                <input
                  type="password"
                  placeholder="New password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  required
                  className="w-full h-14 px-6 rounded-2xl bg-gray-50 dark:bg-slate-800 border-2 border-transparent focus:border-emerald-500 outline-none font-bold"
                />

                <input
                  type="password"
                  placeholder="Confirm password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                  className="w-full h-14 px-6 rounded-2xl bg-gray-50 dark:bg-slate-800 border-2 border-transparent focus:border-emerald-500 outline-none font-bold"
                />
              </>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full py-5 bg-emerald-600 hover:bg-emerald-700 text-white font-black rounded-2xl shadow-xl transition-all uppercase tracking-widest text-xs"
            >
              {loading
                ? "Processing..."
                : step === "request"
                  ? "Send Reset Link"
                  : "Reset Password"}
            </button>

            <button
              type="button"
              onClick={() =>
                step === "request" ? navigate("/login") : setStep("request")
              }
              className="block mx-auto text-emerald-600 text-xs font-black uppercase tracking-widest"
            >
              ← Back
            </button>
          </form>
        </div>
      </motion.div>
    </div>
  );
};

export default ForgotPassword;
