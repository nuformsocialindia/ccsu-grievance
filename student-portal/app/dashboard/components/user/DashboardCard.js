"use client"
import { useEffect, useState } from "react"
import { FiClipboard, FiActivity, FiCheckCircle, FiPauseCircle } from "react-icons/fi"

export default function DashboardCard() {
  const [data, setData] = useState(null)
  const [recentComplaints, setRecentComplaints] = useState([])

  const total = data?.total || 1

  // Dashboard Data
  useEffect(() => {
    fetch("http://localhost:5002/api/dashboard/user-dashboard?userId=1")
      .then(res => res.json())
      .then(data => setData(data))
      .catch(err => console.log(err))
  }, [])

  // Recent Complaints
  useEffect(() => {
    fetch("http://localhost:5002/api/dashboard/recent-complaints")
      .then((res) => res.json())
      .then((data) => {
        console.log("API DATA:", data)
        if (Array.isArray(data)) {
          setRecentComplaints(data)
        } else if (Array.isArray(data.data)) {
          setRecentComplaints(data.data) 
        } else {
          setRecentComplaints([])
        }
      })
      .catch((err) => {
        console.log(err)
        setRecentComplaints([])
      })
  }, [])

  if (!data) return <p>Loading...</p>

  const formatDate = (date) => {
    if (!date) return ""
    return new Date(date).toLocaleDateString("en-GB", {
      day: "numeric",
      month: "short",
    })
  }

  const cards = [
    {
      title: "Total Complaints",
      value: data.total,
      icon: FiClipboard,
      color: "bg-[#14297A]",
      progress: 100
    },
    {
      title: "Active Complaints",
      value: data.active,
      icon: FiActivity,
      color: "bg-yellow-500",
      progress: Math.round((data.active / total) * 100)
    },
    {
      title: "Inactive Complaints",
      value: data.inactive,
      icon: FiPauseCircle,
      color: "bg-orange-500",
      progress: Math.round((data.inactive / total) * 100)
    },
    {
      title: "Resolved Complaints",
      value: data.resolved,
      icon: FiCheckCircle,
      color: "bg-green-500",
      progress: Math.round((data.resolved / total) * 100)
    }
  ]

  return (
    <div className="p-4 sm:p-6 lg:p-10 bg-gray-100 min-h-screen">

      <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold mb-6">
        Complaint Dashboard
      </h1>

      {/* CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {cards.map((card, index) => {
          const Icon = card.icon

          return (
            <div
              key={index}
              className="bg-white rounded-2xl shadow-md p-5 flex flex-col justify-between hover:shadow-xl transition"
            >
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-gray-500 text-sm">{card.title}</p>
                  <h2 className="text-2xl font-bold mt-2">{card.value}</h2>
                </div>

                <div className={`w-12 h-12 rounded-full ${card.color} grid place-items-center`}>
                  <Icon className="text-white w-6 h-6" />
                </div>
              </div>

              <div className="mt-6">
                <div className="w-full bg-gray-200 h-2 rounded-full overflow-hidden">
                  <div
                    className={`h-2 ${card.color}`}
                    style={{ width: `${card.progress}%` }}
                  />
                </div>

                <p className="text-xs text-gray-500 mt-2">
                  {card.progress}% of total complaints
                </p>
              </div>
            </div>
          )
        })}
      </div>

      {/* BOTTOM SECTION */}
      <div className="mt-10 grid grid-cols-1 lg:grid-cols-2 gap-6">

        {/* LEFT - RECENT COMPLAINTS */}
        <div className="bg-white shadow-md rounded-2xl p-5">
          <h2 className="text-lg font-semibold mb-4">Recent Complaints</h2>

          <div className="space-y-3">
            {Array.isArray(recentComplaints) && recentComplaints.length > 0 ? (
              recentComplaints.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center justify-between border-b pb-2 last:border-b-0"
                >
                  <div>
                    <p className="text-sm font-medium">{item.title}</p>
                    <p className="text-xs text-gray-500">
                      {formatDate(item.created_at)}
                    </p>
                  </div>

                  <span
                    className={`text-xs font-semibold px-2 py-1 rounded-full ${
                      item.status === "Resolved"
                        ? "bg-green-100 text-green-600"
                        : "bg-yellow-100 text-yellow-600"
                    }`}
                  >
                    {item.status}
                  </span>
                </div>
              ))
            ) : (
              <p className="text-sm text-gray-500">No complaints found</p>
            )}
          </div>
        </div>

        {/* RIGHT - NEWS TABLE */}
        <div className="bg-white shadow-md rounded-2xl p-5 overflow-x-auto">
          <h2 className="text-lg font-semibold mb-4">Recent News & Events</h2>

          <table className="w-full text-sm text-left">
            <thead>
              <tr className="border-b">
                <th className="py-2">ID</th>
                <th className="py-2">Title</th>
                <th className="py-2">Type</th>
                <th className="py-2">Status</th>
              </tr>
            </thead>

            <tbody>
              <tr className="border-b">
                <td className="py-2">#201</td>
                <td>Water Supply Maintenance</td>
                <td>News</td>
                <td className="text-yellow-500">Upcoming</td>
              </tr>

              <tr className="border-b">
                <td className="py-2">#202</td>
                <td>Electricity Grid Upgrade</td>
                <td>Event</td>
                <td className="text-green-500">Completed</td>
              </tr>

              <tr>
                <td className="py-2">#203</td>
                <td>Road Repair Drive</td>
                <td>Event</td>
                <td className="text-blue-500">Ongoing</td>
              </tr>
            </tbody>
          </table>
        </div>

      </div>
    </div>
  )
}