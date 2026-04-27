"use client"

import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { Pencil } from "lucide-react"

export default function MyComplaints() {
  const router = useRouter()
  const [complaints, setComplaints] = useState([])

  useEffect(() => {
    fetchComplaints();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    const d = new Date();

    const formattedDate = `${String(d.getDate()).padStart(2, "0")}-${String(
      d.getMonth() + 1
    ).padStart(2, "0")}-${d.getFullYear()}`;

    const newComplaint = {
      name,
      email,
      subject,
      message,
      date: formattedDate,
    };

    const existing = JSON.parse(localStorage.getItem("complaints")) || [];

    existing.push(newComplaint);

    localStorage.setItem("complaints", JSON.stringify(existing));

    router.push("/dashboard/user/my-complaints");
  };

  const fetchComplaints = async () => {
    try {
      const res = await fetch("http://localhost:5002/api/complaints/get-complaints");
      console.log("Response receieved", res)
      const data = await res.json();
      console.log("Data from API", data)
      if (res.ok) {
        setComplaints(data);
      }
    } catch (error) {
      console.log("Error fetching complaints", error);
    }
  };

  const handleEdit = (item) => {
    router.push(`/dashboard/user/edit-complaints-form/${item.id}`)
  }
  return (
    <div className="w-full max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-10 py-6">

      {/* Header + Add Button */}
      <div className="flex items-end justify-end mb-4 sm:mb-6">


        <button
          onClick={() => router.push("/dashboard/user/add-complaints-form")}
          className="bg-[#14297A] text-white px-4 py-2 rounded-lg text-sm hover:bg-[#0f1f5c] transition cursor-pointer"
        >
          + Add Complaint
        </button>
      </div>

      <div className="w-full max-w-[1400px] mx-auto bg-white shadow rounded-lg">
        <table className="w-full table-auto text-sm text-left">
          <thead className="bg-gray-200 text-gray-700 uppercase text-sm">
            <tr>
              <th className="px-4 py-3">Name</th>
              <th className="px-4 py-3">Roll No</th>
              <th className="px-4 py-3">Department</th>
              <th className="px-4 py-3">Semester</th>
              <th className="px-4 py-3">Phone</th>

              <th className="px-4 py-3">Subject</th>
              <th className="px-4 py-3">Date</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3">Action</th>
            </tr>
          </thead>
          <tbody>
            {complaints.length > 0 ? (
              complaints.map((item, index) => (
                <tr key={index} className="border-t">
                  <td className="px-4 py-3">{item.name}</td>
                  <td className="px-4 py-3">{item.roll}</td>
                  <td className="px-4 py-3">{item.department}</td>
                  <td className="px-4 py-3">{item.semester}</td>
                  <td className="px-4 py-3">{item.phone}</td>

                  <td className="px-4 py-3">{item.subject}</td>
                  <td className="px-4 py-3">{item.date}</td>
                  <td className="px-4 py-3">
                    <span className="bg-yellow-100 text-yellow-700 px-2 py-1 rounded text-xs">
                      Pending
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <button
                      onClick={() => handleEdit(item)}
                      className="text-[#14297a] hover:scale-110 transition cursor-pointer" 
                      title="Edit"
                    >
                      <Pencil size={18} />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" className="text-center py-4 text-gray-500">
                  No Complaints found
                </td>
              </tr>
            )}
          </tbody>
        </table>

      </div>


    </div>
  )
}