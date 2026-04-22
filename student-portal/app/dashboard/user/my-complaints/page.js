"use client"

import { useRouter } from "next/navigation"

export default function MyComplaints() {
  const router = useRouter()


  return (
    <div className="w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-10 py-6">
      
      {/* Header + Add Button */}
      <div className="flex items-center justify-between mb-4 sm:mb-6">
        <h1 className="text-lg sm:text-xl md:text-2xl font-bold">
          Add Complaints
        </h1>

        <button
         onClick={() => router.push("/dashboard/user/add-complaints-form")}
          className="bg-[#14297A] text-white px-4 py-2 rounded-lg text-sm hover:bg-[#0f1f5c] transition cursor-pointer"
        >
          + Add Complaint
        </button>
      </div>

   
    </div>
  )
}