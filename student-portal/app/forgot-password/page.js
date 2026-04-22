"use client";
import { useState } from "react"
import { motion, setStyle } from "framer-motion"
import { FiMail } from "react-icons/fi";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useRef } from "react"

export default function Password() {
    const [email, setEmail] = useState("")
    const [step, setStep] = useState("email")
    const [otp, setOtp] = useState(new Array(6).fill(""));
    const [successMsg, setSuccessMsg] = useState("")
    const [otpMessage, setOtpMessage] = useState("");
    const [otpStatus, setOtpStatus] = useState("");
    const [newPassword, setNewPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const [resetMsg, setResetMsg] = useState("")
    const router = useRouter();
    const inputRefs = useRef([])


    const handleSubmit = async () => {
        try {
            const res = await fetch("http://localhost:5002/api/sendOtp", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email })
            });

            const data = await res.json();
            return data;

        } catch (error) {
            console.error(error)
            alert("Server Error");
        }
    };
    // varify otp
    const handleVerifyOtp = async () => {
        try {
            const enteredOtp = otp.join("");

            const res = await fetch("http://localhost:5002/api/verifyOtp", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    email,
                    otp: enteredOtp
                })
            });

            const data = await res.json();

            if (data?.success) {
                setOtpMessage("OTP Verified Successfully");
                setOtpStatus("success");
                setTimeout(() => {
                    setStep("reset")
                }, 1000)
            } else {
                setOtpMessage("Invalid OTP");
                setOtpStatus("error");
            }

        } catch (error) {
            setOtpMessage("Server Error");
            setOtpStatus("error");
        }
    };
    // reset password 
    const handleResetPassword = async () => {
        if (!newPassword || !confirmPassword) {
            setResetMsg("Please fill all fields");
            return;
        }

        if (newPassword !== confirmPassword) {
            setResetMsg("Passwords do not match");
            return;
        }

        try {
            const res = await fetch("http://localhost:5002/api/resetPassword", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    email,
                    newPassword,
                    confirmPassword
                })
            });

            const data = await res.json();

            if (data.success) {
                setResetMsg("Password updated successfully");

                setTimeout(() => {
                    router.push("/login");
                }, 2000);

            } else {
                setResetMsg(data.message);
            }

        } catch (error) {
            setResetMsg("Server error");
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo">

            <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                className="w-full max-w-md bg-white/10 backdrop-blur-xl rounded-2xl shadow-2xl p-8 border border-white/20"
            >

                {step === "email" && (
                    <>
                        <h2 className="text-3xl font-bold text-black text-center mb-2">
                            Forgot Password
                        </h2>

                        <p className="text-gray-600 text-center mb-6 text-sm">
                            Enter your email to receive reset link
                        </p>

                        <div className="relative mb-6">
                            <FiMail className="absolute top-1/2 left-3 -translate-y-1/2 text-gray-700 text-lg" />

                            <input
                                type="email"
                                placeholder="Enter Your Email"
                                className="w-full pl-10 pr-4 py-3 rounded-lg bg-white/20 text-gray-800 placeholder-gray-500 border focus:ring-2"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                        {successMsg && (
                            <p className="text-green-700 text-sm text-center mb-3">
                                {successMsg}
                            </p>
                        )}

                        <button
                            onClick={async () => {
                                const res = await handleSubmit();

                                if (res?.success) {
                                    setSuccessMsg("OTP sent to your email");

                                    setTimeout(() => {
                                        setStep("otp");
                                    }, 1500); // 1.5 sec delay
                                } else {
                                    alert(res?.message || "Failed to send OTP");
                                }
                            }}
                            className="w-full py-3 rounded-lg bg-[#162f8a] text-white cursor-pointer"
                        >
                            Send OTP
                        </button>

                    </>
                )}

                {step === "otp" && (
                    <>

                        <h2 className="text-2xl font-bold text-black mb-2 text-center cursor-pointer">
                            Verify OTP
                        </h2>

                        <p className="text-sm text-gray-600 mb-6 text-center">
                            Enter the 6-digit code sent to your email
                        </p>

                        <div className="flex justify-center gap-2 mb-6">
                            {[...Array(6)].map((_, i) => (
                                <input
                                    key={i}
                                    ref={(el) => (inputRefs.current[i] = el)}
                                    type="text"
                                    maxLength={1}
                                    value={otp[i]}
                                    onChange={(e) => {
                                        const value = e.target.value;

                                        if (!/^[0-9]?$/.test(value)) return;

                                        const newOtp = [...otp];
                                        newOtp[i] = value;
                                        setOtp(newOtp);

                                        // 👉 move to next box automatically
                                        if (value && i < 5) {
                                            inputRefs.current[i + 1]?.focus();
                                        }
                                    }}
                                    onKeyDown={(e) => {
                                        // 👉 backspace behavior
                                        if (e.key === "Backspace") {
                                            if (!otp[i] && i > 0) {
                                                inputRefs.current[i - 1]?.focus();
                                            }
                                        }

                                        // arrow navigation (optional but nice UX)
                                        if (e.key === "ArrowLeft" && i > 0) {
                                            inputRefs.current[i - 1]?.focus();
                                        }
                                        if (e.key === "ArrowRight" && i < 5) {
                                            inputRefs.current[i + 1]?.focus();
                                        }
                                    }}
                                    onClick={() => {
                                        inputRefs.current[i]?.focus();
                                    }}
                                    className="w-12 h-12 text-center text-lg rounded-lg bg-white/20 border focus:outline-none focus:ring-2"
                                />
                            ))}
                        </div>
                        <button
                            onClick={handleSubmit}
                            className="text-sm text-[#162f8a] cursor-pointer w-full"
                        >
                            Resend OTP
                        </button>

                        <button
                            onClick={handleVerifyOtp}
                            className="w-full py-3 rounded-lg bg-[#162f8a] text-white cursor-pointer"
                        >
                            Verify OTP
                        </button>
                        {otpMessage && (
                            <p
                                className={`text-sm mt-3 text-center font-medium ${otpStatus === "success" ? "text-green-600" : "text-red-600"
                                    }`}
                            >
                                {otpMessage}
                            </p>
                        )}


                    </>
                )}
                {/* for reset password  */}
                {step === "reset" && (
                    <>
                        <h2 className="text-2xl font-bold text-black mb-2 text-center">
                            Reset Password
                        </h2>

                        <p className="text-sm text-gray-600 mb-6 text-center">
                            Enter your new password
                        </p>

                        <div className="mb-4">
                            <input
                                type="password"
                                placeholder="New Password"
                                value={newPassword}
                                onChange={(e) => setNewPassword(e.target.value)}
                                className="w-full px-4 py-3 rounded-lg bg-white/20 border focus:ring-2"
                            />

                        </div>

                        <div className="mb-6">
                            <input
                                type="password"
                                placeholder="Confirm Password"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                className="w-full px-4 py-3 rounded-lg bg-white/20 border focus:ring-2"
                            />
                        </div>

                        <button
                            onClick={handleResetPassword}
                            className="w-full py-3 rounded-lg bg-[#162f8a] text-white cursor-pointer"
                        >
                            Update Password
                        </button>
                        {resetMsg && (
                            <p className="text-center text-sm mt-3 text-green-600">
                                {resetMsg}
                            </p>
                        )}
                    </>
                )}
            </motion.div>
        </div>
    );
}