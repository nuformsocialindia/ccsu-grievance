"use client";
import { useState } from "react";
import toast from "react-hot-toast";
import { FaEye , FaEyeSlash } from "react-icons/fa"

export default function Settings() {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showNew, setShowNew] = useState(false)
  const [showConfirm, setShowConfirm] = useState(false)

  const userId = 41;

  const changePassword = async () => {
    console.log("Button clicked");

    if (newPassword !== confirmPassword) {
      console.log("password mismatch");
      toast.error("Passwords do not match");
      return;
    }

    try {
      console.log("API call start");
      const token = localStorage.getItem("token")

      const res = await fetch("http://localhost:5002/api/admin/changePassword", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          userId,
          newPassword,
        }),
      });

      const data = await res.json();
      console.log("Response from backend");

      if (res.ok) {
        toast.success(data.message || "Password changed successfully");
        setNewPassword("")
        setConfirmPassword("")
      } else {
        toast.error(data.message || "Something went wrong");
      }
    } catch (error) {
      console.log(error);
      toast.error("Server error");
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Settings</h1>
      <div className="grid md:grid-cols-2 gap-6">
      <div className="bg-[#f4f7fe] rounded-xl p-6 shadow">
  <h2 className="text-xl font-semibold mb-4">Account Settings</h2>

  <p className="text-gray-600 mb-3">
    Manage your account settings securely. You can update your password regularly
    to keep your account safe.
  </p>

  <ul className="space-y-2 text-gray-700 text-sm">
    <li>✔ Use strong password</li>
    <li>✔ Don't share credentials</li>
    <li>✔ Update password regularly</li>
    <li>✔ Enable security features</li>
  </ul>
</div>

      <div className="bg-white shadow rounded-xl p-5 space-y-4">
        <div className="relative">
          <input
            type={showNew ? "text" : "password"}
            placeholder="New Password"
            className="w-full p-2 border"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
          <span className="absolute right-3 top-3 cursor-pointer"
            onClick={() => setShowNew(!showNew)}

          >
            {showNew ? <FaEyeSlash /> : <FaEye />}

          </span>
        </div>

        <div className="relative">
          <input
            type={showConfirm ? "text" : "password"}
            placeholder="Confirm New Password"
            className="w-full p-2 border pr-10"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />

          <span
            className="absolute right-3 top-3 cursor-pointer"
            onClick={() => setShowConfirm(!showConfirm)}
          >
            {showConfirm ? <FaEyeSlash /> : <FaEye  />}
          </span>
        </div>
        <button
          onClick={changePassword}
          className="w-full bg-[#14297a] p-3 rounded cursor-pointer text-white"
        >
          Change Password
        </button>
      </div>
      </div>
    </div>
  );
}