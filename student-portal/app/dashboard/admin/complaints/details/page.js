"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

export default function ComplaintDetailsPage() {
  const { id } = useParams();
  const [complaint, setComplaint] = useState(null);

  useEffect(() => {
    fetchComplaint();
  }, []);

  const fetchComplaint = async () => {
    try {
      const res = await fetch(`http://localhost:5002/api/complaints/${id}`);
      const data = await res.json();
      setComplaint(data);
    } catch (err) {
      console.log(err);
    }
  };

  if (!complaint) {
    return <div className="p-6">Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50 flex justify-center items-center p-6">
      
      {/* SAME CARD DESIGN */}
      <div className="bg-white w-full max-w-2xl rounded-2xl shadow-2xl overflow-hidden">

        {/* HEADER */}
        <div className="bg-[#14297a] px-6 py-4">
          <h2 className="text-white text-lg font-semibold">
            Complaint Details
          </h2>
        </div>

        {/* BODY */}
        <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">

          {[
            { label: "Name", value: complaint.name },
            { label: "Enrollment", value: complaint.enrollment },
            { label: "College", value: complaint.college },
            { label: "Phone", value: complaint.phone },
            { label: "Department", value: complaint.department },
            { label: "Semester", value: complaint.semester },
            { label: "Email", value: complaint.email },
            { label: "Category", value: complaint.category },
            { label: "Subject", value: complaint.subject },
          ].map((item, i) => (
            <div key={i} className="border rounded-xl p-3 bg-gray-50">
              <p className="text-xs text-gray-500 uppercase">
                {item.label}
              </p>
              <p className="font-medium mt-1">
                {item.value || "Not provided"}
              </p>
            </div>
          ))}

          {/* STATUS */}
          <div className="border rounded-xl p-3 bg-gray-50">
            <p className="text-xs text-gray-500 uppercase">Status</p>

            <span
              className={`inline-block mt-2 px-3 py-1 rounded-full text-xs font-semibold
                ${
                  complaint.status === "Pending"
                    ? "bg-yellow-100 text-yellow-700"
                    : complaint.status === "Resolved"
                    ? "bg-green-100 text-green-700"
                    : "bg-red-100 text-red-700"
                }`}
            >
              {complaint.status}
            </span>
          </div>

          {/* DESCRIPTION */}
          <div className="md:col-span-2 border rounded-xl p-3 bg-gray-50">
            <p className="text-xs text-gray-500 uppercase">Description</p>
            <p className="mt-2">{complaint.description}</p>
          </div>
        </div>
      </div>
    </div>
  );
}