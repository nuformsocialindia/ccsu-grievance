"use client"
import { useState } from "react"
import axios from "axios"
import { FiEye, FiEyeOff } from "react-icons/fi"
import toast from "react-hot-toast"

export default function Settings() {
  const [newPassword, setNewPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [loading, setLoading] = useState(false)

  const [showNewPassword, setShowNewPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  const handleUpdatePassword = async () => {
    const token = localStorage.getItem("token")

    try {
      setLoading(true)

      const res = await axios.put(
        "http://localhost:5002/api/user/update-password",
        { newPassword, confirmPassword },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )

      toast.success(res.data.message || "Password updated successfully")
      setNewPassword("")
      setConfirmPassword("")
    } catch (error) {
      toast.error(error.response?.data?.message || "Error updating password")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Main Content */}
      <div className="flex-1 p-6">

        <h1 className="text-2xl font-bold mb-6">Settings</h1>

        {/* SECTION GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

          {/* LEFT SECTION */}
          <div className="bg-white p-6 rounded-xl shadow">
            <h2 className="text-lg font-semibold mb-3">Settings Info</h2>

            <p className="text-gray-600 text-sm leading-6">
              Manage your account settings from here. You can update your password anytime
              to keep your account safe and up to date.
            </p>

            <p className="mt-4 text-sm text-gray-500">
              Make sure to remember your new password after updating it.
            </p>
          </div>

          {/* RIGHT SECTION */}
          <div className="bg-white p-6 rounded-xl shadow">

            <h2 className="text-lg font-semibold mb-4">Change Password</h2>

            <div className="space-y-4">

              {/* New Password */}
              <div>
                <label className="text-sm text-gray-600 block mb-1">
                  New Password
                </label>

                <div className="relative">
                  <input
                    type={showNewPassword ? "text" : "password"}
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    className="w-full border p-3 rounded-lg focus:ring-2 focus:ring-[#14297A]"
                  />

                  <span
                    onClick={() => setShowNewPassword(!showNewPassword)}
                    className="absolute right-3 top-3 cursor-pointer"
                  >
                    {showNewPassword ? <FiEyeOff /> : <FiEye />}
                  </span>
                </div>
              </div>

              {/* Confirm Password */}
              <div>
                <label className="text-sm text-gray-600 block mb-1">
                  Confirm Password
                </label>

                <div className="relative">
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="w-full border p-3 rounded-lg focus:ring-2 focus:ring-[#14297A]"
                  />

                  <span
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-3 cursor-pointer"
                  >
                    {showConfirmPassword ? <FiEyeOff /> : <FiEye />}
                  </span>
                </div>
              </div>

              {/* Button */}
              <button
                onClick={handleUpdatePassword}
                disabled={loading}
                className="w-full bg-[#14297A] text-white py-3 rounded-lg hover:opacity-90 cursor-pointer"
              >
                {loading ? "Updating..." : "Update Password"}
              </button>

            </div>
          </div>

        </div>
      </div>
    </div>
  )
}