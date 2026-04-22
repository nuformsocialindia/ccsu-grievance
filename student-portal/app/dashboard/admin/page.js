"use client"
import { FiClipboard, FiActivity, FiCheckCircle  ,FiClock} from "react-icons/fi"

export default function DashboardCard() {

  const cards = [
    {
      title: "Total Complaints",
      value: "120",
      icon: FiClipboard,
      color: "bg-[#14297A]",
      progress: 80
    },
 {
  title: "Active Complaints",
  value: "45",
  icon: FiActivity,
  color: "bg-yellow-500",
  progress: 50
},
  {
  title: "Inprogress Complaints",
  value: "75",
  icon: FiClock,
  color: "bg-yellow-500",
  progress: 70
}
  ,
{
  title: "Completed Complaints",
  value: "10",
  icon: FiCheckCircle,
  color: "bg-green-500",
  progress: 30
}
  ]
  const recentComplaints = [
  { id: 1, title: "Login not working", status: "Pending", date: "20 Apr" },
  { id: 2, title: "Server error on dashboard", status: "Resolved", date: "19 Apr" },
  { id: 3, title: "Payment issue", status: "Pending", date: "18 Apr" },
  { id: 4, title: "UI not responsive", status: "Resolved", date: "17 Apr" },
  { id: 5, title: "Data not loading", status: "Pending", date: "16 Apr" },
  { id: 6, title: "Login not working", status: "Pending", date: "20 Apr" },
  { id: 7, title: "Server error on dashboard", status: "Resolved", date: "19 Apr" },
  { id: 8, title: "Payment issue", status: "Pending", date: "18 Apr" },
  { id: 9, title: "UI not responsive", status: "Resolved", date: "17 Apr" },
  { id: 10, title: "Data not loading", status: "Pending", date: "16 Apr" },
];

  return (
    <div className="p-4 sm:p-6 lg:p-10 bg-gray-100 min-h-screen">

      <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold mb-6">
        Admin Dashboard
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">

        {cards.map((card, index) => {
          const Icon = card.icon

          return (
            <div
              key={index}
              className="bg-white rounded-2xl shadow-md p-5 flex flex-col justify-between hover:shadow-xl transition"
            >

              {/* TOP */}
              <div className="flex justify-between items-center">

                <div>
                  <p className="text-gray-500 text-sm">{card.title}</p>
                  <h2 className="text-2xl font-bold mt-2">{card.value}</h2>
                </div>

                {/* ICON BOX FIX (IMPORTANT PART) */}
                <div className={`w-12 h-12 rounded-full ${card.color} grid place-items-center`}>
                  <Icon className="text-white w-6 h-6" />
                </div>

              </div>

              {/* PROGRESS */}
              <div className="mt-6">

                <div className="w-full bg-gray-200 h-2 rounded-full overflow-hidden">
                  <div
                    className={`h-2 ${card.color}`}
                    style={{ width: `${card.progress}%` }}
                  />
                </div>

                <p className="text-xs text-gray-500 mt-2">
                  Updated just now
                </p>

              </div>

            </div>
          )
        })}

      </div>
      <div className="mt-10 grid grid:-cols-1 lg:grid-cols-2 gap-6">
{/* left div  */}
  <div className="bg-white shadow-md rounded-2xl p-5">
      <h2 className="text-lg font-semibold mb-4">Recent Complaints</h2>

      <div className="space-y-3">
        {recentComplaints.map((item) => (
          <div
            key={item.id}
            className="flex items-center justify-between border-b pb-2 last:border-b-0"
          >
            <div>
              <p className="text-sm font-medium">{item.title}</p>
              <p className="text-xs text-gray-500">{item.date}</p>
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
        ))}
      </div>
    </div>
  {/* rigth div  */}
<div className="bg-white shadow-md rounded-2xl p-5 overflow-x-auto">
  <h2 className="text-lg font-semibold mb-4">Recent Reports</h2>

  <table className="w-full text-sm text-left">
    <thead>
      <tr className="border-b">
        <th className="py-2">Report ID</th>
        <th className="py-2">Report Title</th>
        <th className="py-2">Category</th>
        <th className="py-2">Status</th>
      </tr>
    </thead>

    <tbody>
      <tr className="border-b">
        <td className="py-2">#R201</td>
        <td>Water Supply Maintenance Report</td>
        <td>Infrastructure</td>
        <td className="text-yellow-500">Pending Review</td>
      </tr>

      <tr className="border-b">
        <td className="py-2">#R202</td>
        <td>Electricity Grid Upgrade Analysis</td>
        <td>Energy</td>
        <td className="text-green-500">Approved</td>
      </tr>

      <tr>
        <td className="py-2">#R203</td>
        <td>Road Repair Progress Report</td>
        <td>Transport</td>
        <td className="text-blue-500">In Progress</td>
      </tr>
    </tbody>
  </table>
</div>
        </div>

      </div>
   
  )
} 