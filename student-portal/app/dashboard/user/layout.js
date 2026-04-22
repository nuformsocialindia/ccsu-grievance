"use client"
import NotificationBell from "../components/NotificationBell/page"
import Sidebar from "../components/user/Sidebar"

export default function UserLayout({ children }) {
  return (
    <div className="flex">
      <Sidebar />
      <main className="flex-1 p-6 bg-gray-100 min-h-screen ml-64">
        <div className="flex justify-end p-4 bg-white shadow rounded-lg">
          <NotificationBell />
        </div>

        {children}
       
      </main>
    </div>
  )
}