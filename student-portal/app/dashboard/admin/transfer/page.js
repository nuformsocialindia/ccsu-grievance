"use client"

export default function Transfer() {
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

          {/* Complaint */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Select Complaint
            </label>
            <select className="w-full border border-gray-300 px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#14297A] focus:border-transparent transition">
              <option>-- Choose Complaint --</option>
              <option>#1 Login Issue</option>
              <option>#2 Payment Failed</option>
            </select>
          </div>

          {/* Department */}
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
          <button
            className="w-full bg-[#14297A] hover:bg-[#0f1f5c] text-white font-semibold py-3 rounded-xl transition shadow-md cursor-pointer"
          >
            Transfer Complaint
          </button>

        </div>
      </div>
    </div>
  )
}