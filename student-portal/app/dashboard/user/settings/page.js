"use client"
import { useState } from "react"
import axios from "axios"
import { FiEye, FiEyeOff } from "react-icons/fi"
import toast from "react-hot-toast"

export default function Settings() {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("")
  const [loading, setLoading] = useState(false)


  const [showNewPassword, setShowNewPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  const handleUpdatePassword = async () => {
    const token = localStorage.getItem("token");

    try {
      setLoading(true);

      const res = await axios.put(
        "http://localhost:5002/api/user/update-password",
        {
          newPassword,
          confirmPassword,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      toast.success(res.data.message || "Password updated successfully");

      setNewPassword("");
      setConfirmPassword("");
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Error updating password"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full min-h-screen flex items-start justify-center bg-gray-50 px-4 sm:px-6 lg:px-10 py-10">

      <div className="w-full max-w-xl bg-white shadow-lg rounded-2xl p-6 sm:p-8">

        <h1 className="text-2xl font-bold text-gray-800 mb-6 text-center">
          Settings
        </h1>

        <div className="space-y-4">

          {/* New Password */}
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-2">
              New Password
            </label>

            <div className="relative">
              <input
                type={showNewPassword ? "text" : "password"}
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="Enter new password"
                className="w-full border border-gray-200 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#14297A]"
              />

              <span
                onClick={() => setShowNewPassword(!showNewPassword)}
                className="absolute right-3 top-3.5 cursor-pointer text-gray-500"
              >
                {showNewPassword ? <FiEyeOff /> : <FiEye />}
              </span>
            </div>
          </div>

          {/* Confirm Password */}
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-2">
              Confirm Password
            </label>

            <div className="relative">
              <input
                type={showConfirmPassword ? "text" : "password"}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Re-enter new password"
                className="w-full border border-gray-200 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#14297A]"
              />

              <span
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-3 top-3.5 cursor-pointer text-gray-500"
              >
                {showConfirmPassword ? <FiEyeOff /> : <FiEye />}
              </span>
            </div>
          </div>

          {/* Button */}
          <button
            onClick={handleUpdatePassword}
            disabled={loading}
            className="w-full bg-[#14297A] text-white py-3 rounded-lg font-medium hover:opacity-90 transition-all cursor-pointer"
          >
            {loading ? "Updating..." : "Update Password"}
          </button>

        </div>
      </div>
    </div>
  )
}