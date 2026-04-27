"use client";
import { Upload, ArrowLeft } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation"

export default function ComplaintForm() {
    const [status, setStatus] = useState("");
    const router = useRouter()
    const [errors, setErrors] = useState({});
    const [form, setForm] = useState({
        name: "",
        roll: "",
        department: "",
        semester: "",
        email: "",
        phone: "",
        college: "",
        category: "",
        subject: "",
        description: "",
        date: "",
        campus: "",
        resolution: "",
        file: null,
        agree: false,
    });

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;

        let newValue = type === "checkbox" ? checked : value;

        // 150 words limit
        if (name === "description") {
            let words = newValue.trim().split(/\s+/).filter(Boolean);
            if (words.length > 150) {
                newValue = words.slice(0, 150).join(" ");
            }
        }

        setForm((prev) => ({
            ...prev,
            [name]: newValue,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validate()) return;

        const formData = new FormData();

        Object.keys(form).forEach((key) => {
            if (key === "file" && form.file) {
                for (let i = 0; i < form.file.length; i++) {
                    formData.append("files", form.file[i]);
                }
            } else {
                formData.append(key, form[key]);
            }
        });

        try {
            const res = await fetch("http://localhost:5002/api/complaints/create", {
                method: "POST",
                body: formData,
            });

            const data = await res.json();

            if (res.ok) {
                toast.success("Complaint submitted successfully!");
                setErrors({});
                setForm({
                    name: "",
                    roll: "",
                    department: "",
                    semester: "",
                    email: "",
                    phone: "",
                    college: "",
                    category: "",
                    subject: "",
                    description: "",
                    date: "",
                    campus: "",
                    resolution: "",
                    file: null,
                    agree: false,
                });
                setTimeout(() => {
                    router.push("/dashboard/user/my-complaints");
                }, 1500);

            } else {
                setStatus("Submission failed!");
            }
        } catch (error) {
            setStatus("Server error!");
        }
    };

    // validation 
    const validate = () => {
        let newErrors = {};

        if (!form.name) newErrors.name = "Name is required";
        if (!form.roll) newErrors.roll = "Roll No is required";
        if (!form.department) newErrors.department = "Department is required";
        if (!form.semester) newErrors.semester = "Semester is required";
        if (!form.email) newErrors.email = "Email is required";
        if (!form.phone) newErrors.phone = "Phone is required";
        if (!form.college) newErrors.college = "College is required";


        setErrors(newErrors);

        return Object.keys(newErrors).length === 0;
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-[#eef1ff] to-[#f7f8fc] flex items-center justify-center px-3 py-6">

            <form
                onSubmit={handleSubmit}
                className="w-full max-w-5xl bg-white rounded-3xl shadow-xl overflow-hidden"
            >


                {/* HEADER */}
                <div className="bg-[#14297a] px-6 py-6 text-center relative flex items-center justify-center">

                    {/* Back Arrow */}
                    <button
                        onClick={() => router.push("/dashboard/user/my-complaints")}
                        className="absolute left-4 text-white hover:text-[#F4C751] transition"
                    >
                        <ArrowLeft size={24} />
                    </button>

                    <div>
                        <h2 className="text-2xl font-bold text-white">
                            University Complaint Form
                        </h2>
                        <p className="text-[#F4C751] mt-1 text-sm">
                            Submit your issue, we will resolve it quickly
                        </p>
                    </div>
                </div>

                <div className="p-6 space-y-6">

                    {/* STUDENT INFO */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <input
                            className={`input ${errors.name ? "border-red-500" : ""}`}
                            name="name"
                            placeholder="Full Name"
                            value={form.name}
                            onChange={handleChange}
                        />
                        {errors.name && (
                            <p className="text-red-500 text-xs mt-1">{errors.name}</p>
                        )}
                        <input
                            className="input"
                            name="roll"
                            placeholder="Roll No."
                            value={form.roll}
                            onChange={handleChange}
                        />
                        {errors.roll && (
                            <p className="text-red-500 text-xs mt-1">{errors.roll}</p>
                        )}
                        <input
                            className="input"
                            name="department"
                            placeholder="Department"
                            value={form.department}
                            onChange={handleChange}
                        />
                        {errors.department && (
                            <p className="text-red-500 text-xs mt-1">{errors.department}</p>
                        )}
                        <input
                            className="input"
                            name="semester"
                            placeholder="Semester"
                            value={form.semester}
                            onChange={handleChange}
                        />
                        {errors.semester && (
                            <p className="text-red-500 text-xs mt-1">{errors.semester}</p>
                        )}
                        <input
                            className="input"
                            name="email"
                            placeholder="Email"
                            value={form.email}
                            onChange={handleChange}
                        />
                        {errors.email && (
                            <p className="text-red-500 text-xs mt-1">{errors.email}</p>
                        )}
                        <input
                            className="input"
                            name="phone"
                            placeholder="Phone"
                            value={form.phone}
                            onChange={handleChange}
                        />
                        {errors.phone && (
                            <p className="text-red-500 text-xs mt-1">{errors.phone}</p>
                        )}
                        <input
                            className="input"
                            name="college"
                            placeholder="College"
                            value={form.college}
                            onChange={handleChange}
                        />
                        {errors.college && (
                            <p className="text-red-500 text-xs mt-1">{errors.college}</p>
                        )}
                    </div>

                    {/* COMPLAINT */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <select className="input" name="category" value={form.category} onChange={handleChange}>
                            <option value="">Select Category</option>
                            <option>Academic Issue</option>
                            <option>Hostel Issue</option>
                            <option>Fee Related</option>
                            <option>Faculty Issue</option>
                            <option>Exam Issue</option>
                        </select>

                        <input className="input" name="subject" placeholder="Subject" value={form.subject} onChange={handleChange} />

                        <input className="input" type="date" name="date" value={form.date} onChange={handleChange} />

                        <input className="input" name="campus" placeholder="Campus" value={form.campus} onChange={handleChange} />
                    </div>

                    {/* DESCRIPTION */}
                    <div>
                        <textarea
                            rows="4"
                            name="description"
                            value={form.description}
                            onChange={handleChange}
                            placeholder="Explain your issue..."
                            className="input w-full min-h-[120px]"
                        />

                        <p className="text-xs text-gray-500 mt-1">
                            {(form.description || "").trim().split(/\s+/).filter(Boolean).length} / 150 words
                        </p>
                    </div>

                    {/* FILE */}
                    <label className="flex items-center gap-3 border-2 border-dashed p-4 rounded-xl cursor-pointer">
                        <Upload />
                        <span>Upload File</span>
                        <input
                            type="file"
                            multiple
                            className="hidden"
                            onChange={(e) =>
                                setForm((prev) => ({
                                    ...prev,
                                    file: e.target.files,
                                }))
                            }
                        />
                    </label>

                    {/* CHECKBOX */}
                    <label className="flex gap-2 text-sm">
                        <input
                            type="checkbox"
                            name="agree"
                            checked={form.agree}
                            onChange={handleChange}
                            required
                        />
                        I confirm all information is correct
                    </label>

                    {/* STATUS */}
                    {status && (
                        <p className="text-center font-medium text-sm text-[#14297a]">
                            {status}
                        </p>
                    )}

                    {/* BUTTON */}
                    <button
                        type="submit"
                        className="w-full bg-[#14297a] text-white py-3 rounded-xl font-semibold hover:bg-[#F4C751] hover:text-[#14297a] cursor-pointer"
                    >
                        Submit Complaint
                    </button>

                </div>
            </form>

            {/* STYLE */}
            <style jsx>{`
                .input {
                    width: 100%;
                    padding: 12px;
                    border: 1px solid #e5e7eb;
                    border-radius: 12px;
                    outline: none;
                    transition: 0.3s;
                }

                .input:focus {
                    border-color: #14297a;
                    box-shadow: 0 0 0 3px #F4C751;
                }
            `}</style>
        </div>
    );
}