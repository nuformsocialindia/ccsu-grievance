"use client";

import { usePathname, useRouter } from "next/navigation";
import Image from "next/image";
import { useState } from "react";
import axios from "axios";
import { FiMail } from "react-icons/fi"
import { motion } from "framer-motion"
import { FiEye, FiEyeOff, FiLock } from "react-icons/fi";
import toast from "react-hot-toast";



export default function Login() {
  const router = useRouter();
  const pathname = usePathname()
  const [showPassword, setShowPassword] = useState(false)

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({
    email: "",
    password: "",
    general: ""
  })

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await axios.post("http://localhost:5002/api/auth/login", {
        email,
        password,
      });
      console.log("Login response", res.data)

      toast.success(res.data.message || "Login successfull");

      if (!res.data.token) {
        console.error("Token missing!");
        return;
      }

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));
      document.cookie = `token=${res.data.token}; path=/`


      // redirect
      const role = res.data.user.role
      if (role === "admin") {
        router.push("/dashboard/admin")

      } else {
        router.push("/dashboard/user")
      }

    } catch (err) {
      const msg = err.response?.data?.message || "Login Failed"
      if (msg.toLowerCase().includes("email")) {
        setErrors({ email: msg, password: msg, general: "" })
      }
      else if (msg.toLowerCase().includes("password")) {
        setErrors({ email: "", password: msg, general: "" });
      }
      else {
        setErrors({ email: "", password: "", general: msg })
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col md:flex-row h-screen">

      {/* LEFT IMAGE SECTION */}
      <div className="w-full md:w-1/2 h-64 md:h-full relative">
        <Image
          src="/images/ccsulogin1.jpg"
          alt="Login"
          fill
          className="object-cover object-center  transition-transform scale-100 duration-700"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-black/10"></div>
        <div className="absolute inset-[1] backdrop-blur-[1px] bg-black/10"></div>

        <motion.div
          key={pathname}
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{
            duration: 0.3,
            ease: "easeOut"
          }}
          className="absolute top-1/2 left-6 md:left-10 transform -translate-y-1/2 text-white">
          <h1 className="text-3xl md:text-5xl font-bold leading-tight">
            CCSU Grievance Portal
          </h1>

          <p className="mt-3 text-sm md:text-base text-white/80">
            Register and track your complaints easily
          </p>
        </motion.div>
      </div>

      {/* RIGHT FORM SECTION */}
      <div className="w-full md:w-1/2 flex justify-center items-center bg-gradient-to-br from-[#0f1b3d] via-[#1c2f6b] to-[#1c2f6b] p-6">

        <div className="w-full max-w-md bg-white/10 backdrop-blur-2xl 
border border-white/20 rounded-2xl p-8 
shadow-[0_10px_40px_rgba(0,0,0,0.4)] hover:shadow-[0_15px_50px_rgba(0,0,0,0.5)] transition">

          {/* LOGO */}
          <div className="flex justify-center mb-6">
            <img
              src="/images/abstract.jpg"
              alt="logo"
              className="w-16 h-16 rounded-full border border-white/30"
            />
          </div>

          <h2 className="text-2xl font-bold text-white text-center mb-6">
            Login
          </h2>
          <p className="text-white/60 text-center text-sm mb-4">Enter your credentials to access dashboard</p>
          {errors.general && (
            <div className="mb-4 text-red-400 text-sm text-center">
              {errors.general}
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-5">

            {/* EMAIL */}
            <div className="relative">
              <FiMail className="absolute left-3 top-1/2 -translate-y-1/2 text-white/60" />

              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-3 pl-9 rounded-md bg-white/10 border border-white/20 
text-white placeholder-white/60 
focus:outline-none focus:ring-2 focus:ring-[#D9B85C] focus:border-[#D9B85C] 
transitio"
              />

              {errors.email && (
                <p className="text-red-400 text-xs mt-1">{errors.email}</p>
              )}
            </div>
            {/* PASSWORD */}
            <div className="relative">
              <FiLock className="absolute left-3 top-1/2 -translate-y-1/2 text-white/60" />

              <input
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full p-3 pl-9 rounded-md bg-white/10 border border-white/20 
text-white placeholder-white/60 
focus:outline-none focus:ring-2 focus:ring-[#D9B85C] focus:border-[#D9B85C] 
transitio"
              />

              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-white/70"
              >
                {showPassword ? <FiEyeOff /> : <FiEye />}
              </button>
            </div>
            {/* BUTTON */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#D9B85C] text-[#14297A] font-bold py-3 rounded-lg 
             hover:bg-yellow-400 hover:scale-[1.02] transition-all duration-300 shadow-lg cursor-pointer"
            >
              {loading ? "Logging in..." : "Login"}
            </button>
          </form>


          {/* ACTION BUTTONS */}
          <div className="flex flex-col sm:flex-row justify-center gap-3 mt-6">

            <button
              onClick={() => router.push("/register")}
              className="bg-[#D9B85C] text-[#14297A] px-5 py-2 rounded-lg font-semibold hover:scale-105 transition cursor-pointer"
            >
              New Registration
            </button>

            <button
              onClick={() => router.push("/forgot-password")}
              className="border border-[#D9B85C] text-[#14297a] px-5 py-2 rounded-lg hover:bg-[#D9B85C] hover:text-[#14297A] transition cursor-pointer"
            >
              Forgot Password ?
            </button>

          </div>

        </div>
      </div>
    </div>
  );
}