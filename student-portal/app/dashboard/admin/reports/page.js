"use client"

import { FiBarChart2, FiUsers } from "react-icons/fi"

export default function Reports() {
  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Reports Dashboard</h1>
        <p className="text-gray-500 mt-1">
          Visual insights of complaints and user activity
        </p>
      </div>

      {/* Top Stats Cards */}
      <div className="grid md:grid-cols-2 gap-6 mb-6">
        
        <div className="bg-gradient-to-r from-blue-500 to-blue-700 text-white p-6 rounded-2xl shadow-lg flex items-center justify-between">
          <div>
            <p className="text-sm opacity-80">Total Complaints Trend</p>
            <h2 className="text-2xl font-bold mt-1">1,240</h2>
          </div>
          <FiBarChart2 size={40} className="opacity-80" />
        </div>

        <div className="bg-gradient-to-r from-purple-500 to-pink-500 text-white p-6 rounded-2xl shadow-lg flex items-center justify-between">
          <div>
            <p className="text-sm opacity-80">Active Users</p>
            <h2 className="text-2xl font-bold mt-1">320</h2>
          </div>
          <FiUsers size={40} className="opacity-80" />
        </div>

      </div>

      {/* Charts Section */}
      <div className="grid md:grid-cols-2 gap-6">

        {/* Complaint Trends */}
        <div className="bg-white p-6 rounded-2xl shadow-md border hover:shadow-lg transition">
          <div className="flex justify-between items-center mb-4">
            <h2 className="font-semibold text-gray-800">Complaint Trends</h2>
            <span className="text-xs bg-blue-100 text-blue-600 px-3 py-1 rounded-full">
              Monthly
            </span>
          </div>

          <div className="h-64 flex items-center justify-center bg-gray-50 rounded-lg border border-dashed">
            <p className="text-gray-400">📊 Chart will appear here</p>
          </div>
        </div>

        {/* User Activity */}
     <div className="bg-white p-6 rounded-2xl shadow-md border hover:shadow-lg transition">
  <div className="flex justify-between items-center mb-4">
    <h2 className="font-semibold text-gray-800">User Activity</h2>
    <span className="text-xs bg-purple-100 text-purple-600 px-3 py-1 rounded-full">
      Real-time
    </span>
  </div>

  {/* Static Bar Chart */}
  <div className="h-64 flex items-end justify-between gap-3 bg-gray-50 rounded-lg border p-4">

    <div className="flex flex-col items-center w-full">
      <div className="bg-purple-500 w-6 rounded-t-lg" style={{ height: "40%" }}></div>
      <span className="text-xs mt-2 text-gray-500">Mon</span>
    </div>

    <div className="flex flex-col items-center w-full">
      <div className="bg-purple-500 w-6 rounded-t-lg" style={{ height: "70%" }}></div>
      <span className="text-xs mt-2 text-gray-500">Tue</span>
    </div>

    <div className="flex flex-col items-center w-full">
      <div className="bg-purple-500 w-6 rounded-t-lg" style={{ height: "55%" }}></div>
      <span className="text-xs mt-2 text-gray-500">Wed</span>
    </div>

    <div className="flex flex-col items-center w-full">
      <div className="bg-purple-500 w-6 rounded-t-lg" style={{ height: "85%" }}></div>
      <span className="text-xs mt-2 text-gray-500">Thu</span>
    </div>

    <div className="flex flex-col items-center w-full">
      <div className="bg-purple-500 w-6 rounded-t-lg" style={{ height: "60%" }}></div>
      <span className="text-xs mt-2 text-gray-500">Fri</span>
    </div>

    <div className="flex flex-col items-center w-full">
      <div className="bg-purple-500 w-6 rounded-t-lg" style={{ height: "30%" }}></div>
      <span className="text-xs mt-2 text-gray-500">Sat</span>
    </div>

    <div className="flex flex-col items-center w-full">
      <div className="bg-purple-500 w-6 rounded-t-lg" style={{ height: "50%" }}></div>
      <span className="text-xs mt-2 text-gray-500">Sun</span>
    </div>

  </div>
</div>
      </div>
    </div>
  )
}