"use client"

export default function Settings() {
  return (
    <div className="p-6 max-w-xl">
      <h1 className="text-2xl font-bold mb-6">Settings</h1>

      <div className="bg-white shadow rounded-xl p-5 space-y-4">
        <button className="w-full bg-gray-200 p-3 rounded cursor-pointer">
          Change Admin Password
        </button>

        <button className="w-full bg-red-100 text-red-600 p-3 rounded cursor-pointer">
          Delete System Data
        </button>
      </div>
    </div>
  )
}