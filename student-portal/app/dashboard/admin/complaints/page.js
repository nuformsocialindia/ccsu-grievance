"use client"

import { FiCheckCircle, FiXCircle } from "react-icons/fi"

export default function AllComplaints() {
  const data = [
    { id: 1, user: "John", title: "Login Issue", status: "Pending" },
    { id: 2, user: "Amit", title: "Payment Failed", status: "Resolved" },
  ]

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-800">All Complaints</h1>

        <input
          type="text"
          placeholder="Search complaints..."
          className="border px-3 py-2 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
      </div>

      {/* Table Card */}
      <div className="bg-white shadow-lg rounded-2xl overflow-hidden">
        <table className="w-full text-sm text-left">

          <thead className="bg-gray-100 text-gray-700 uppercase text-xs">
            <tr>
              <th className="px-5 py-3">ID</th>
              <th className="px-5 py-3">User</th>
              <th className="px-5 py-3">Title</th>
              <th className="px-5 py-3">Status</th>
              <th className="px-5 py-3 text-center">Action</th>
            </tr>
          </thead>

          <tbody>
            {data.map((item) => (
              <tr
                key={item.id}
                className="border-b hover:bg-gray-50 transition"
              >
                <td className="px-5 py-4 font-medium">{item.id}</td>
                <td className="px-5 py-4">{item.user}</td>
                <td className="px-5 py-4 text-gray-700">{item.title}</td>

                {/* Status */}
                <td className="px-5 py-4">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-medium ${
                      item.status === "Pending"
                        ? "bg-yellow-100 text-yellow-700"
                        : "bg-green-100 text-green-700"
                    }`}
                  >
                    {item.status}
                  </span>
                </td>

                {/* Actions */}
                <td className="px-5 py-4">
                  <div className="flex justify-center gap-2">

                    <button className="flex items-center gap-1 bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded-lg text-xs transition">
                      <FiCheckCircle />
                      Resolve
                    </button>

                    <button className="flex items-center gap-1 bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-lg text-xs transition">
                      <FiXCircle />
                      Reject
                    </button>

                  </div>
                </td>
              </tr>
            ))}
          </tbody>

        </table>

        {/* Empty State (future ready) */}
        {data.length === 0 && (
          <div className="p-6 text-center text-gray-500">
            No complaints found
          </div>
        )}
      </div>
    </div>
  )
}