"use client"

export default function Settings() {
  return (
    <div className="w-full min-h-screen flex items-center justify-center bg-gray-50 px-4 sm:px-6 lg:px-10 py-10">
      
      <div className="w-full max-w-xl bg-white shadow-lg rounded-2xl p-6 sm:p-8">
        
        {/* Header */}
        <h1 className="text-2xl font-bold text-gray-800 mb-6 text-center">
          Settings
        </h1>

        {/* Card */}
        <div className="space-y-4">

          {/* Current Password */}
       

          {/* New Password */}
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-2">
              New Password
            </label>
            <input
              type="password"
              placeholder="Enter new password"
              className="w-full border border-gray-200 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#14297A] focus:border-transparent"
            />
          </div>

          {/* Confirm Password */}
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-2">
              Confirm Password
            </label>
            <input
              type="password"
              placeholder="Re-enter new password"
              className="w-full border border-gray-200 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#14297A] focus:border-transparent"
            />
          </div>

          {/* Button */}
          <button className="w-full bg-[#14297A] text-white py-3 rounded-lg font-medium hover:opacity-90 transition-all duration-200 shadow-md cursor-pointer">
            Update Password
          </button>

        </div>
      </div>
    </div>
  )
} 