import { useState, useContext, useEffect } from "react";
import { ShopContext } from "../context/ShopContext";
import axios from "axios";
import { toast } from "react-toastify";
import { auth } from "../firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  signInWithPopup,
  GoogleAuthProvider,
  GithubAuthProvider,
} from "firebase/auth";

const Login = () => {
  const [currentState, setCurrentState] = useState("Login");
  const { token, setToken, navigate, backendUrl } = useContext(ShopContext);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (token) navigate("/");
  }, [token, navigate]);

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (currentState === "Sign Up") {
        await createUserWithEmailAndPassword(auth, email, password);

        const res = await axios.post(`${backendUrl}/api/user/register`, {
          name,
          email,
          password,
        });

        if (!res.data.success) throw new Error(res.data.message);

        setToken(res.data.token);
        localStorage.setItem("token", res.data.token);
        toast.success("Account created successfully!");
        setTimeout(() => navigate("/"), 1500);
      } else {
        await signInWithEmailAndPassword(auth, email, password);

        const res = await axios.post(`${backendUrl}/api/user/login`, {
          email,
          password,
        });

        if (!res.data.success) throw new Error(res.data.message);

        setToken(res.data.token);
        localStorage.setItem("token", res.data.token);
        toast.success("Welcome back!");
        setTimeout(() => navigate("/"), 1500);
      }
    } catch (err) {
      toast.error(err.message);
      await signOut(auth);
    } finally {
      setLoading(false);
    }
  };

  const socialAuth = async (provider, label) => {
    setLoading(true);
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      await axios.post(`${backendUrl}/api/user/register`, {
        name: user.displayName || `${label} User`,
        email: user.email || `${user.uid}@social.com`,
        password: user.uid,
        profileImage: user.photoURL || "",
      });

      const loginRes = await axios.post(`${backendUrl}/api/user/login`, {
        email: user.email || `${user.uid}@social.com`,
        password: user.uid,
      });

      setToken(loginRes.data.token);
      localStorage.setItem("token", loginRes.data.token);
      toast.success(`Welcome ${user.displayName || ""}`);
      setTimeout(() => navigate("/"), 1500);
    } catch (err) {
      toast.error(err.message);
      await signOut(auth);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-gradient-to-br from-emerald-50 via-white to-white dark:from-slate-900 dark:to-slate-950">
      <div className="w-full max-w-md">
        <div className="bg-white dark:bg-slate-900 rounded-[2.5rem] p-10 shadow-2xl border border-gray-100 dark:border-slate-800">
          {/* Header */}
          <h1 className="text-3xl font-black text-center text-slate-900 dark:text-white mb-2">
            {currentState === "Login" ? "Welcome Back" : "Create Account"}
          </h1>
          <p className="text-center text-sm text-slate-500 dark:text-slate-400 mb-8">
            {currentState === "Login"
              ? "Sign in to continue shopping"
              : "Join us to start your journey"}
          </p>

          {/* Form */}
          <form onSubmit={onSubmitHandler} className="space-y-5">
            {currentState === "Sign Up" && (
              <input
                className="w-full h-14 px-6 rounded-2xl bg-gray-50 dark:bg-slate-800 border-2 border-transparent focus:border-emerald-500 focus:bg-white dark:focus:bg-slate-900 outline-none font-bold transition-all"
                placeholder="Full Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            )}

            <input
              className="w-full h-14 px-6 rounded-2xl bg-gray-50 dark:bg-slate-800 border-2 border-transparent focus:border-emerald-500 focus:bg-white dark:focus:bg-slate-900 outline-none font-bold transition-all"
              type="email"
              placeholder="Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            <input
              className="w-full h-14 px-6 rounded-2xl bg-gray-50 dark:bg-slate-800 border-2 border-transparent focus:border-emerald-500 focus:bg-white dark:focus:bg-slate-900 outline-none font-bold transition-all"
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />

            {currentState === "Login" && (
              <div className="text-right">
                <button
                  type="button"
                  onClick={() => navigate("/forgot-password")}
                  className="text-xs font-bold text-emerald-600 hover:text-emerald-700 transition-colors"
                >
                  Forgot password?
                </button>
              </div>
            )}

            <button
              disabled={loading}
              className="w-full py-4 bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 text-white font-black rounded-2xl shadow-xl transition-all active:scale-95"
            >
              {loading
                ? "Processing..."
                : currentState === "Login"
                  ? "Sign In"
                  : "Create Account"}
            </button>
          </form>

          {/* Divider */}
          <div className="my-6 text-center text-[11px] font-black text-slate-400 uppercase tracking-widest">
            Or continue with
          </div>

          {/* Social Auth */}
          <div className="grid grid-cols-2 gap-4">
            {/* Google */}
            <button
              onClick={() => socialAuth(new GoogleAuthProvider(), "Google")}
              className="h-12 rounded-xl border border-slate-200 dark:border-slate-700 
               hover:bg-slate-100 dark:hover:bg-slate-800 
               font-bold text-sm transition-all flex items-center justify-center gap-3"
            >
              {/* Google SVG */}
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path
                  fill="#EA4335"
                  d="M12 10.2v3.6h5.1c-.2 1.3-1.5 3.8-5.1 3.8-3.1 0-5.6-2.6-5.6-5.6S8.9 6.4 12 6.4c1.8 0 3 .7 3.7 1.3l2.5-2.4C16.6 3.8 14.5 2.8 12 2.8 6.9 2.8 2.8 6.9 2.8 12s4.1 9.2 9.2 9.2c5.3 0 8.8-3.7 8.8-9 0-.6-.1-1-.1-1.4H12z"
                />
              </svg>
              Google
            </button>

            {/* GitHub */}
            <button
              onClick={() => socialAuth(new GithubAuthProvider(), "GitHub")}
              className="h-12 rounded-xl border border-slate-200 dark:border-slate-700 
               hover:bg-slate-900 hover:text-white 
               font-bold text-sm transition-all flex items-center justify-center gap-3"
            >
              {/* GitHub SVG */}
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M12 0C5.37 0 0 5.5 0 12.3c0 5.4 3.44 10 8.21 11.6.6.1.82-.3.82-.6v-2.2c-3.34.7-4.04-1.6-4.04-1.6-.55-1.4-1.34-1.8-1.34-1.8-1.1-.8.1-.8.1-.8 1.22.1 1.87 1.3 1.87 1.3 1.08 1.9 2.84 1.3 3.54 1 .1-.8.42-1.3.76-1.6-2.66-.3-5.46-1.4-5.46-6.2 0-1.4.48-2.5 1.25-3.4-.12-.3-.55-1.6.12-3.3 0 0 1.02-.3 3.34 1.3a11 11 0 013.04-.4c1.03 0 2.06.1 3.04.4 2.32-1.6 3.34-1.3 3.34-1.3.67 1.7.24 3 .12 3.3.78.9 1.25 2 1.25 3.4 0 4.8-2.8 5.9-5.47 6.2.44.4.82 1.1.82 2.2v3.3c0 .3.22.7.83.6C20.56 22.3 24 17.7 24 12.3 24 5.5 18.63 0 12 0z"
                />
              </svg>
              GitHub
            </button>
          </div>

          {/* Switch */}
          <p className="text-center text-sm mt-8 text-slate-600 dark:text-slate-400">
            {currentState === "Login"
              ? "Don't have an account?"
              : "Already have an account?"}
            <button
              onClick={() =>
                setCurrentState(currentState === "Login" ? "Sign Up" : "Login")
              }
              className="ml-2 text-emerald-600 font-black hover:text-emerald-700"
            >
              {currentState === "Login" ? "Sign Up" : "Sign In"}
            </button>
          </p>
        </div>

        <p className="text-center text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-6">
          By continuing, you agree to our{" "}
          <span className="text-emerald-500">Terms & Privacy</span>
        </p>
      </div>
    </div>
  );
};

export default Login;
