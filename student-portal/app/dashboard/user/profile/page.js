"use client";

import { useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function Profile() {
  const [user, setUser] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    email:"",
    mobile:"",
    address:"",
    city:"",
    enrollment:""
  })


  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  // get the data 
    useEffect(() => {
    const token = localStorage.getItem("token");

    console.log("TOKEN FROM LOCALSTORAGE:", token);

    fetch("http://localhost:5002/api/user/profile", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("PROFILE API RESPONSE:", data);
        setUser(data);
        setFormData(data);
      })
      .catch((err) => console.log(err));
  }, []);

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading...
      </div>
    );
  }

// update profile data
const handleUpdate = async () => {
  const token = localStorage.getItem("token");

  const res = await fetch("http://localhost:5002/api/user/update-profile", {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(formData), 
  });

  const data = await res.json();
  console.log("UPDATE RESPONSE:", data); 
  toast.success("Profile updated");
console.log("Profile API Response",formData)
  setUser(formData);
  
};
  return (
    <div className="min-h-screen flex items-start justify-center px-4 py-10">

      <div className="w-full flex items-center justify-center">

        <div className="w-full max-w-6xl bg-white/70 backdrop-blur-xl rounded-3xl shadow-2xl overflow-hidden grid grid-cols-1 md:grid-cols-3 border border-white/40">

          {/* LEFT SIDE */}
          <div className="relative p-6 sm:p-8 flex flex-col items-center justify-between bg-gradient-to-br from-[#14297A] to-[#3b4d9c] text-white min-h-[350px] md:min-h-full">

            <div className="absolute top-0 left-0 w-40 h-40 bg-white/10 rounded-full blur-2xl"></div>
            <div className="absolute bottom-0 right-0 w-40 h-40 bg-white/10 rounded-full blur-2xl"></div>

            <div className="flex flex-col items-center z-10 text-center">

              <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-full bg-white text-[#14297A] flex items-center justify-center text-3xl sm:text-4xl font-bold shadow-xl border-4 border-white/30">
                {user.name?.charAt(0)}
              </div>

              <h2 className="text-lg sm:text-xl font-semibold mt-4">
                {user.name}
              </h2>

              <p className="text-xs sm:text-sm text-white/80 break-all">
                {user.email}
              </p>

              <div className="w-16 h-[2px] bg-white/40 my-5 rounded-full"></div>

              <div className="w-full text-sm space-y-3">
                <Info label="City" value={user.city || "N/A"} />
                <Info label="Phone" value={user.mobile || "N/A"} />
              </div>

              <div className="w-full text-sm space-y-3">
                <Info label="Address" value={user.address || "N/A"} />
                <Info label="Enrollment" value={user.enrollment || "N/A"} />
              </div>
            </div>
          </div>

          {/* RIGHT SIDE (FORM DYNAMIC) */}
          <div className="md:col-span-2 p-5 sm:p-8 md:p-10 flex flex-col justify-center">

            <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-6 text-center md:text-left">
              Edit Profile
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">

              <Input label="Full Name" name="name" value={formData.name} onChange={handleChange} />
              <Input label="Email" name="email" value={formData.email} onChange={handleChange} />

              <Input label="Mobile" name="mobile" value={formData.mobile} onChange={handleChange} />

              <Input label="City" name="city" value={formData.city} onChange={handleChange} />

              <Input label="Address" name="address" value={formData.address} onChange={handleChange} />

              <Input label="Enrollment No" name="enrollment" value={formData.enrollment} onChange={handleChange} />


            </div>

            <div className="mt-8">
              <button onClick={handleUpdate} className="w-full bg-gradient-to-r from-[#14297A] to-[#3b4d9c] text-white py-3 rounded-xl font-medium shadow-lg hover:scale-[1.02] hover:shadow-2xl transition-all duration-300 cursor-pointer">
                Update Profile
              </button>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}

function Input({ label, name, value, onChange }) {
  return (
    <div className="relative">
      <input
        name={name}
        value={value || ""}
        onChange={onChange}
        placeholder=" "
        className="peer w-full border border-gray-300 rounded-xl px-4 pt-5 pb-2 outline-none focus:ring-2 focus:ring-[#14297A] focus:border-[#14297A] transition-all shadow-sm text-sm"
      />
      <label
        className="absolute left-4 top-2 text-xs text-gray-500 transition-all 
        peer-placeholder-shown:top-3.5 
        peer-placeholder-shown:text-sm 
        peer-focus:top-2 
        peer-focus:text-xs"
      >
        {label}
      </label>
    </div>
  );
}

/* INFO */
function Info({ label, value }) {
  return (
    <div className="flex justify-between border-b border-white/20 pb-2 text-xs sm:text-sm">
      <span className="text-white/70">{label}</span>
      <span className="font-medium">{value}</span>
    </div>
  );
}