"use client";

import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Upload, ArrowLeft } from "lucide-react";

export default function Editform() {
    const { id } = useParams();
const router = useRouter();

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
});
  
       
useEffect(() => {
  const fetchData = async () => {
    const res = await fetch(`http://localhost:5002/api/complaints/${id}`);
    const data = await res.json();

    setForm(data);
  };

  if (id) fetchData();
}, [id]);
      

  const handleChange = (e) => {
  const { name, value } = e.target;

  setForm((prev) => ({
    ...prev,
    [name]: value,
  }));
};
const handleSubmit = async (e) => {
  e.preventDefault();

  const res = await fetch(
    `http://localhost:5002/api/complaints/${id}`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(form),
    }
  );

  const data = await res.json();

  if (res.ok) {
    toast.success("Updated Successfully");
    router.push("/dashboard/user/my-complaints");
  } else {
    toast.error("Update failed");
  }
};
     


           
                

        
    return (
        <div className="min-h-screen bg-gradient-to-br from-[#eef1ff] to-[#f7f8fc] flex items-center justify-center px-3 py-6">

            <form onSubmit={handleSubmit}
                className="w-full max-w-5xl bg-white rounded-3xl shadow-xl overflow-hidden"
            >

                {/* HEADER */}
                <div className="bg-[#14297a] px-6 py-6 text-center relative">
                    <h2 className="text-2xl font-bold text-white">
                        University Complaint Form
                    </h2>
                    <p className="text-[#F4C751] mt-1 text-sm">
                        Submit your issue, we will resolve it quickly
                    </p>
                </div>


                <div className="p-6 space-y-6">

                    {/* STUDENT INFO */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                         <input
                            className="input"
                            name="name"
                            placeholder="Full Name"
                            value={form.name}
                            onChange={handleChange}
                           
                        />
                      
                        <input
                            className="input"
                            name="roll"
                            placeholder="Roll No."
                            value={form.roll}
                            onChange={handleChange}
                           
                        />
                    
                        <input
                            className="input"
                            name="department"
                            placeholder="Department"
                            value={form.department}
                            onChange={handleChange}
                         
                        />
                       
                        <input
                            className="input"
                            name="semester"
                            placeholder="Semester"
                            value={form.semester}
                            onChange={handleChange}
                           
                        />
                      
                        <input
                            className="input"
                            name="email"
                            placeholder="Email"
                            value={form.email}
                            onChange={handleChange}
                            
                        />
                        
                        <input
                            className="input"
                            name="phone"
                            placeholder="Phone"
                            value={form.phone}
                            onChange={handleChange}
                           
                        />
                        
                        <input
                            className="input"
                            name="college"
                            placeholder="College"
                            value={form.college}
                            onChange={handleChange}

                        />
                       
                    </div>

                    {/* COMPLAINT */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <select className="input" name="category">
                            <option value="">Select Category</option>
                            <option>Academic Issue</option>
                            <option>Hostel Issue</option>
                            <option>Fee Related</option>
                            <option>Faculty Issue</option>
                            <option>Exam Issue</option>
                        </select>

                        <input className="input" name="subject" placeholder="Subject" />

                        <input className="input" type="date" name="date" />

                        <input className="input" name="campus" placeholder="Campus"/>
                    </div>

                    {/* DESCRIPTION */}
                    <div>
                        <textarea
                            rows="4"
                            name="description"
                
                            placeholder="Explain your issue..."
                            className="input w-full min-h-[120px]"
                        />

                      
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
                          
                        />
                        I confirm all information is correct
                    </label>

                
                   
                    {/* BUTTON */}
                    <button
                        type="submit"
                        className="w-full bg-[#14297a] text-white py-3 rounded-xl font-semibold hover:bg-[#F4C751] hover:text-[#14297a] cursor-pointer"
                    >
                       Update Complaint
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