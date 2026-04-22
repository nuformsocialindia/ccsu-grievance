"use client"
import NotificationBell from "../components/NotificationBell/page"
import AdminSidebar from "../components/admin/Sidebar"

export default function AdminLayout({ children }) {
  return (
    <div className="flex">
      <AdminSidebar />
      <main className="flex-1 p-6 bg-gray-100 min-h-screen ml-64">
        <div className="flex justify-end p-4 bg-white shadow rounded-lg">
          <NotificationBell />
        </div>

        {children}
       
      </main>
    </div>
  )
}