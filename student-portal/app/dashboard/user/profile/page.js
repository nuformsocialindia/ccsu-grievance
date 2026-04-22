"use client";

export default function Profile() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center p-4">

      <div className="w-full max-w-5xl bg-white rounded-3xl shadow-2xl grid md:grid-cols-3 overflow-hidden">

        {/* LEFT SIDE - PROFILE CARD */}
        <div className="bg-gradient-to-b from-[#D6DDFF]  text-black p-6 flex flex-col items-center justify-center relative">
          
          <div className="w-24 h-24 rounded-full bg-white text-[#14297A] flex items-center justify-center text-3xl font-bold shadow-lg mb-4">
            S
          </div>

          <h2 className="text-xl font-semibold">Shubhi Sharma</h2>
          <p className="text-sm opacity-90">shubhi@email.com</p>

          <div className="mt-6 w-full text-sm space-y-2">
            <p className="flex justify-between border-b border-white/30 pb-1">
              <span>City</span> <span>Ghaziabad</span>
            </p>
            <p className="flex justify-between border-b border-white/30 pb-1">
              <span>Phone</span> <span>9876543210</span>
            </p>
          </div>

          {/* subtle glow */}
          <div className="absolute inset-0 bg-white/10 blur-3xl opacity-20"></div>
        </div>

        {/* RIGHT SIDE - FORM */}
        <div className="md:col-span-2 p-6 sm:p-8 space-y-6">

          <h2 className="text-2xl font-bold text-gray-800">
            Edit Profile
          </h2>

          {/* FORM GRID */}
          <div className="grid sm:grid-cols-2 gap-5">

            <Input label="Full Name" placeholder="Enter your name" />
            <Input label="Email" placeholder="Enter your email" />
            <Input label="Mobile" placeholder="Enter mobile number" />
            <Input label="City" placeholder="Enter city" />
            <Input label="Address" placeholder="Enter address" />
            <Input label="Pincode" placeholder="Enter pincode" />

          </div>

          {/* BUTTON */}
          <div className="pt-4">
            <button className="w-full bg-gradient-to-r from-[#14297A] to-[#14297A] text-white py-3 rounded-xl font-medium shadow-lg hover:scale-[1.02] transition">
              Update Profile
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}

/* INPUT COMPONENT */
function Input({ label, ...props }) {
  return (
    <div className="relative">
      <label className="text-sm text-gray-600 mb-1 block">
        {label}
      </label>
      <input
        {...props}
        className="w-full border border-gray-300 rounded-xl px-4 py-2.5 outline-none focus:ring-2 focus:ring-[#14297a] focus:border-[#14297a] transition shadow-sm"
      />
    </div>
  );
}