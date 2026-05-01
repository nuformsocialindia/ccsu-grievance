"use client"
import { useEffect, useState } from "react";

export default function Transfer() {

  const [complaints, setComplaints] = useState([]);
  const [selectedComplaint, setSelectedComplaint] = useState("");

  // Fetch complaints
useEffect(() => {
  const fetchComplaints = async () => {
    try {
      const res = await fetch(
        "http://localhost:5002/api/complaints/transfercomplaints"
      );

      const data = await res.json();

      console.log("API response:", data);

      const list = data.data || data.complaints || data;

      setComplaints(Array.isArray(list) ? list : []);
    } catch (error) {
      console.log("Error fetching complaints:", error);
      setComplaints([]);
    }
  };

  fetchComplaints();
}, []);

  return (
    <div className="p-6 bg-gray-100 min-h-screen">

      {/* Page Title */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-800">
          Transfer Complaint
        </h1>
        <p className="text-gray-500 text-sm mt-1">
          Reassign complaints to the appropriate department or team
        </p>
      </div>

      {/* Card */}
      <div className="bg-white shadow-xl rounded-2xl p-8 max-w-2xl border border-gray-100">

        <div className="space-y-6">

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Select Complaint
            </label>

            <select
              value={selectedComplaint}
              onChange={(e) => setSelectedComplaint(e.target.value)}
              className="w-full border border-gray-300 px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#14297A] focus:border-transparent transition"
            >
              <option value="">-- Choose Complaint --</option>

              {complaints.map((item) => (
                <option key={item.id} value={item.id}>
                  #{item.id} {item.title}
                </option>
              ))}
            </select>
          </div>

    
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Transfer To
            </label>
            <select className="w-full border border-gray-300 px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#14297A] focus:border-transparent transition">
              <option>-- Select Department --</option>
              <option>Support Team</option>
              <option>Billing Team</option>
              <option>Technical Team</option>
            </select>
          </div>

          {/* Note */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Transfer Note
            </label>
            <textarea
              rows="4"
              placeholder="Write reason for transfer..."
              className="w-full border border-gray-300 px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#14297A] focus:border-transparent transition resize-none"
            />
          </div>

          {/* Button */}
          <button className="w-full bg-[#14297A] hover:bg-[#0f1f5c] text-white font-semibold py-3 rounded-xl transition shadow-md cursor-pointer">
            Transfer Complaint
          </button>

        </div>
      </div>
    </div>
  );
}