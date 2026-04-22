"use client"
import { useState } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { User, Mail, Phone, Book, Eye, EyeOff, Lock } from "lucide-react"
import toast from "react-hot-toast";


export default function Register() {

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    mobile: "",
    gender: "",
    enrollment: "",
    department: "",
    college: "",
    course: ""
  });
  const [showPassword, setShowPassword] = useState(false)
  const [errors, setErrors] = useState({})
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    let newErrors = {};

    if (!formData.email) {
      newErrors.email = "Email is required";
    }

    if (!formData.mobile) {
      newErrors.mobile = "Mobile is required";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({}); // clear errors if valid

    try {
      const res = await fetch("http://localhost:5002/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (res.ok) {
        toast.success("Registered Successfully");
      } else {
        toast.error(data.message || "Registration failed");
      }
    } catch (error) {
      toast.error("Something went wrong");
    }
  };
  return (
    <div className="min-h-screen flex flex-col lg:flex-row bg-[#0b1437]">

      {/* LEFT SIDE */}
      <div className="flex w-full lg:w-1/2 relative flex-col justify-between p-6 xl:p-12 text-white overflow-hidden">

        {/* Background Glow */}
        <div className="absolute w-[300px] xl:w-[400px] h-[300px] xl:h-[400px] bg-blue-600/30 blur-3xl rounded-full top-[-100px] left-[-100px]" />
        <div className="absolute w-[250px] xl:w-[300px] h-[250px] xl:h-[300px] bg-purple-600/30 blur-3xl rounded-full bottom-[-80px] right-[-80px]" />

        {/* Logo / Title */}
        <div className="z-10">
          <h1 className="text-3xl xl:text-4xl font-bold">Smart Portal</h1>
          <p className="text-white/70 mt-2 text-sm xl:text-base">
            Manage everything in one place
          </p>
        </div>

        {/* Middle Content */}
        <div className="z-10 max-w-md space-y-6 mt-8 lg:mt-0">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-3xl xl:text-5xl font-bold leading-tight"
          >
            Create your <br /> digital identity
          </motion.h2>

          <p className="text-white/70 text-sm xl:text-base">
            Register to access a secure dashboard where you can manage your
            academic details, upload documents, and submit ideas easily.
          </p>

          <div className="space-y-3 text-sm">
            <p>✔ Fast & Secure Registration</p>
            <p>✔ Easy Document Upload</p>
            <p>✔ Track Your Submissions</p>
            <p>✔ Clean Dashboard Access</p>
          </div>
        </div>

        <p className="z-10 text-white/40 text-xs xl:text-sm mt-6 lg:mt-0">
          © 2026 Smart Portal
        </p>
      </div>

      {/* RIGHT SIDE */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-4 sm:p-6">

        <div className="w-full max-w-3xl h-auto lg:h-[96vh]  scroll-smooth rounded-3xl bg-white/10 backdrop-blur-3xl border border-white/20 shadow-[0_20px_60px_rgba(0,0,0,0.4)] p-4 sm:p-6 lg:p-8">

          <h2 className="text-2xl sm:text-3xl font-bold text-white text-center mb-6 sm:mb-8">
            Create Account
          </h2>

          <form onSubmit={handleSubmit}
            className="space-y-6 sm:space-y-8 px-4 sm:px-6 md:px-10">

            {/* PERSONAL */}
            <Section title="Personal Info">

              <Input name="name" onChange={handleChange} icon={<User size={18} />} label="Full Name" />
              <Input
                name="email"
                onChange={handleChange}
                icon={<Mail size={18} />}
                label="Email"
                type="email"
                error={errors.email}
              />
              <div className="relative">
                <Input
                  name="password"
                  onChange={handleChange}
                  icon={<Lock size={18} />}
                  label="Password"
                  type={showPassword ? "text" : "password"}
                />

                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 cursor-pointer"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
              <Input
                name="mobile"
                onChange={handleChange}
                icon={<Phone size={18} />}
                label="Mobile"
                type="tel"
                error={errors.mobile}
              />
              <select
                name="gender"
                onChange={handleChange}
                className="input bg-white/10 text-white"
              >
                <option value="">Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>
            </Section>

            {/* ACADEMIC */}
            <Section title="Academic Info">
              <Input name="enrollment" onChange={handleChange} icon={<Book size={18} />} label="Enrollment No." />
              <Input name="department" onChange={handleChange} icon={<Book size={18} />} label="Department" />
              <Input name="college" onChange={handleChange} icon={<Book size={18} />} label="College" />
              <Input name="course" onChange={handleChange} icon={<Book size={18} />} label="Course" />
            </Section>

            {/* BTN */}
            <button type="submit"
              className="btn hover:scale-[1.02] transition-all duration-300 shadow-lg cursor-pointer">
              Register
            </button>

          </form>

          <p className="text-center text-white/70 mt-6 text-sm">
            Already have account?{" "}
            <Link href="/login" className="text-blue-300 underline">
              Login
            </Link>
          </p>
        </div>
      </div>

      <style jsx>{styles}</style>
    </div>
  )
}

/* SECTION */
function Section({ title, children }) {
  return (
    <div>
      <h3 className="text-white font-semibold mb-4 text-base sm:text-lg px-3">
        {title}
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {children}
      </div>
    </div>
  )
}

/* INPUT */
function Input({ icon, label, name, type = "text", onChange, error }) {
  return (
    <div className="relative">

      {/* ERROR MESSAGE (TOP RED TEXT) */}
      {error && (
        <p className="text-red-400 text-xs mb-1 ml-1">
          {error}
        </p>
      )}

      <div className="relative flex items-center h-[50px] border border-white/20 rounded-xl px-3 bg-white/10 focus-within:border-blue-400 transition">

        <span className="text-white/70 mr-2">{icon}</span>

        <input
          type={type}
          name={name}
          onChange={onChange}
          placeholder={label}
          className="w-full bg-transparent h-full text-white outline-none placeholder-white/60"
        />
      </div>
    </div>
  )
}

/* STYLES */
const styles = `
.input {
  height:50px;
  width:100%;
  padding:0 12px;
  border-radius:12px;
  background:rgba(255,255,255,0.1);
  border:1px solid rgba(255,255,255,0.2);
  color:white;
  outline:none;
}

.input:focus {
  border-color:#4f7cff;
}

select option {
  color: black;
}

.btn {
  width:100%;
  height:55px;
  border-radius:12px;
  background:#14297a;
  color:white;
  font-weight:600;
  letter-spacing:0.5px;
}
  .section-title {
  padding: 0 12px;
  margin-bottom: 8px;
  font-size: 18px;
  font-weight: 600;
  color: white;
}
`