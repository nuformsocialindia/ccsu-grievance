"use client";

import { FiEye, FiEdit } from "react-icons/fi";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function AllComplaints() {
  const [data, setData] = useState([]);
  const [status, setStatus] = useState("pending")
  const [openIndex, setOpenIndex] = useState(null)
  const [selectedComplaint, setSelectedComplaint] = useState(null)
  // const [showModal, setShowModal] = useState(false)
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedEditComplaint, setSelectedEditComplaint] = useState(null);
  const [editForm, setEditForm] = useState(null);
  const router = useRouter();

  useEffect(() => {
    fetchComplaints();
  }, []);

  const handleStatusChange = async (id, newStatus) => {
    try {
      const res = await fetch(
        `http://localhost:5002/api/complaints/status/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ status: newStatus }),
        }
      );

      if (!res.ok) throw new Error("Failed");

      fetchComplaints();
      setOpenIndex(null);
    } catch (err) {
      console.log(err);
    }
  };
  const fetchComplaints = async () => {
    try {
      const res = await fetch("http://localhost:5002/api/complaints/all");

      if (!res.ok) {
        throw new Error("Failed to fetch");
      }

      const data = await res.json();

      console.log("Fetched Data:", data);

      setData(data);
    } catch (error) {
      console.log("Fetch error:", error);
      setData([]);
    }
  };
  const handleUpdate = async () => {
    try {
      const res = await fetch(
        `http://localhost:5002/api/complaints/update/${editForm.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(editForm),
        }
      );

      if (!res.ok) throw new Error("Update failed");

      await fetchComplaints();
      setShowEditModal(false);
      setEditForm(null);
    } catch (err) {
      console.log(err);
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
            {data.map((item, index) => {
              console.log("Row data:", item);

              return (
                <tr key={item.id || index} className="border-b hover:bg-gray-50">

                  <td className="px-5 py-4 font-medium">
                    {item.enrollment}
                  </td>

                  <td className="px-5 py-4">
                    {item.college}
                  </td>

                  <td className="px-5 py-4">
                    {item.name}
                  </td>

                  <td className="px-5 py-4">
                    {item.subject}
                  </td>

                  <td className="px-5 py-4">
                    {item.phone}
                  </td>

                  <td className="px-5 py-4">
                    <span
                      onClick={() => setOpenIndex(!openIndex === index ? null : index)

                      }
                      className={`px-3 py-1 rounded-full text-xs font-medium cursor-pointer ${item.status === "Pending"
                        ? "bg-yellow-100 text-yellow-700"
                        : item.status === "Resolved"
                          ? "bg-green-100 text-green-700"
                          : "bg-red-100 text-red-700"
                        }`}
                    >
                      {item.status}
                    </span>
                    {openIndex === index && (
                      <div className="absolute mt-2 bg-white border rounded shadow-md z-10">
                        <div
                          onClick={() => handleStatusChange(item.id, "Pending")}
                          className="px-4 py-2 text-sm hover:bg-gray-100 cursor-pointer"
                        >
                          Pending
                        </div>

                        <div
                          onClick={() => handleStatusChange(item.id, "Resolved")}
                          className="px-4 py-2 text-sm hover:bg-gray-100 cursor-pointer"
                        >
                          Resolved
                        </div>

                        <div
                          onClick={() => handleStatusChange(item.id, "Rejected")}
                          className="px-4 py-2 text-sm hover:bg-gray-100 cursor-pointer"
                        >
                          Rejected
                        </div>
                      </div>
                    )}
                  </td>
                  <td className="px-5 py-4">
                    <div className="flex items-center justify-center gap-3">
                      <button
                        onClick={() => {
                         router.push("/dashboard/admin/complaint/details");
                        }}
                        className="p-2 rounded-full bg-blue-60 transition cursor-pointer"
                      >
                        <FiEye className="text-[#14297a] text-base" />
                      </button>
                      <button
                        onClick={() => {
                          setSelectedEditComplaint(item);
                          setEditForm(item);
                          setShowEditModal(true);
                        }}
                        className="p-2 rounded-full bg-green-50 hover:bg-green-100 transition cursor-pointer"
                      >
                        <FiEdit className="text-green-600 text-base" />
                      </button>


                    </div>

                  </td>
                </tr>
              );
            })}
          </tbody>

        </table>


        {/* Empty State */}
        {data.length === 0 && (
          <div className="p-6 text-center text-gray-500">
            No complaints found
          </div>
        )}

      </div>


      {showEditModal && selectedEditComplaint && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">

          <div className="bg-white w-full max-w-2xl max-h-[90vh] rounded-2xl shadow-2xl overflow-y-auto no-scrollbar flex flex-col">

            {/* HEADER */}
            <div className="bg-[#14297a] px-6 py-4 flex justify-between items-center">
              <h2 className="text-white text-lg font-semibold">
                Edit Complaint
              </h2>

              <button
                onClick={() => setShowEditModal(false)}
                className="text-white hover:text-[#F4C751] text-xl cursor-pointer">
                ✕
              </button>
            </div>


            {/* BODY */}
            <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-5 text-sm overflow-y-auto flex-1">

              {/* Enrollment */}
              <div>
                <label className="block text-xs text-gray-500 uppercase tracking-wide mb-1">
                  Enrollment
                </label>
                <input
                  value={editForm?.enrollment || ""}
                  onChange={(e) =>
                    setEditForm({ ...editForm, enrollment: e.target.value })
                  }
                  className="w-full p-2 border border-gray-200 rounded-lg bg-gray-50 outline-none focus:ring-2 focus:ring-[#14297a]"
                />
              </div>

              {/* College */}
              <div>
                <label className="block text-xs text-gray-500 uppercase tracking-wide mb-1">
                  College
                </label>
                <input
                  value={editForm?.college || ""}
                  onChange={(e) =>
                    setEditForm({ ...editForm, college: e.target.value })
                  }
                  className="w-full p-2 border border-gray-200 rounded-lg bg-gray-50 outline-none focus:ring-2 focus:ring-[#14297a]"
                />
              </div>

              {/* Name */}
              <div>
                <label className="block text-xs text-gray-500 uppercase tracking-wide mb-1">
                  Name
                </label>
                <input
                  value={editForm?.name || ""}
                  onChange={(e) =>
                    setEditForm({ ...editForm, name: e.target.value })
                  }
                  className="w-full p-2 border border-gray-200 rounded-lg bg-gray-50 outline-none focus:ring-2 focus:ring-[#14297a]"
                />
              </div>

              {/* Subject */}
              <div>
                <label className="block text-xs text-gray-500 uppercase tracking-wide mb-1">
                  Subject
                </label>
                <input
                  value={editForm?.subject || ""}
                  onChange={(e) =>
                    setEditForm({ ...editForm, subject: e.target.value })
                  }
                  className="w-full p-2 border border-gray-200 rounded-lg bg-gray-50 outline-none focus:ring-2 focus:ring-[#14297a]"
                />
              </div>

              {/* Phone */}
              <div>
                <label className="block text-xs text-gray-500 uppercase tracking-wide mb-1">
                  Phone
                </label>
                <input
                  value={editForm?.phone || ""}
                  onChange={(e) =>
                    setEditForm({ ...editForm, phone: e.target.value })
                  }
                  className="w-full p-2 border border-gray-200 rounded-lg bg-gray-50 outline-none focus:ring-2 focus:ring-[#14297a]"
                />
              </div>

            </div>


            <div className="p-4 flex justify-end gap-3">
              <button className="px-4 py-2 bg-gray-200 rounded-lg cursor-pointer">
                Cancel
              </button>

              <button
                onClick={handleUpdate}
                className="px-4 py-2 bg-[#14297a] text-white rounded-lg cursor-pointer"
              >
                Update
              </button>
            </div>

          </div>
        </div>
      )}
    </div>

  );

}