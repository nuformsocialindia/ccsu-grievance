"use client";

import { FiEye, FiEdit } from "react-icons/fi";
import { useEffect, useState } from "react";

export default function AllComplaints() {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetchComplaints();
  }, []);
const fetchComplaints = async () => {
    let finalData = []; 
  try {
    console.log("Fetching all the complaints")
   const res = await fetch("http://localhost:5002/api/complaints/create", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    roll: form.roll,
    college: form.college,
    name: form.name,
    subject: form.subject,
    phone: form.phone,
  }),
});
    if (!res.ok) {
      throw new Error(`HTTP error! Status: ${res.status}`);
    }

    const text = await res.text();
    console.log("RAW RESPONSE:", text);

    let data;
    try {
      data = text ? JSON.parse(text) : [];
      console.log("Parsed data", data)
    } catch (err) {
      console.log("JSON parse error:", err);
      data = [];
    }

    // handle both array or object response
    const finalData = Array.isArray(data)
      ? data
      : data?.data || [];

    setData(finalData);
  } catch (error) {
    console.log("Fetch error:", error);
    console.log("Final data", finalData)
    setData([]);
  }
};

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-800">
          All Complaints
        </h1>

        <input
          type="text"
          placeholder="Search complaints..."
          className="border px-3 py-2 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
      </div>

      {/* Table */}
      <div className="bg-white shadow-lg rounded-2xl overflow-hidden">
        <table className="w-full text-sm text-left">
          <thead className="bg-gray-100 text-gray-700 uppercase text-xs">
            <tr>
              <th className="px-5 py-3">Enrollment ID</th>
              <th className="px-5 py-3">College</th>
              <th className="px-5 py-3">Name</th>
              <th className="px-5 py-3">Title</th>
              <th className="px-5 py-3">Phone</th>
              <th className="px-5 py-3">Status</th>
              <th className="px-5 py-3 text-center">Action</th>
            </tr>
          </thead>

          <tbody>
            {data.map((item, index) => (
              <tr
                key={item.id || index}
                className="border-b hover:bg-gray-50 transition"
              >
                <td className="px-5 py-4 font-medium">
                  {item.enrollment}
                </td>
                <td className="px-5 py-4">{item.college}</td>
                <td className="px-5 py-4 text-gray-700">
                  {item.name}
                </td>
                <td className="px-5 py-4">{item.title}</td>
                <td className="px-5 py-4">{item.phone}</td>

                {/* Status */}
                <td className="px-5 py-4">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-medium ${
                      item.status === "Pending"
                        ? "bg-yellow-100 text-yellow-700"
                        : item.status === "Resolved"
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {item.status}
                  </span>
                </td>

                {/* Actions */}
                <td className="px-5 py-4">
                  <div className="flex justify-center items-center gap-3">
                    <button className="text-blue-600 hover:text-blue-800 transition">
                      <FiEye size={18} />
                    </button>

                    <button className="text-green-600 hover:text-green-800 transition">
                      <FiEdit size={18} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Empty State */}
        {data.length === 0 && (
          <div className="p-6 text-center text-gray-500">
            No complaints found
          </div>
        )}
      </div>
    </div>
  );
}