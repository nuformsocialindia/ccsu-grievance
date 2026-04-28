"use client"
import Link from "next/link"
import { useRouter } from "next/navigation"
import {
  FiHome,
  FiFileText,
  FiCheckCircle,
  FiClock,
  FiUser,
  FiBarChart2,
  FiSettings,

  FiLogOut,
  FiRepeat
} from "react-icons/fi"
import { FaBuilding } from "react-icons/fa";
export default function AdminSidebar() {
  const router = useRouter()
  const handleLogout = () => {
    // optional: clear auth token/session
    localStorage.removeItem("token")
    sessionStorage.clear()

    // redirect to login page
    router.push("/auth/login")
  }
  return (
    <aside className="fixed top-0 left-0 w-64 h-screen bg-[#0B1E59] text-white flex flex-col justify-between p-5">

      {/* Top */}
      <div>
        <h2 className="text-2xl font-bold mb-8 tracking-wide">
          Admin Panel
        </h2>

        <ul className="space-y-3 text-[15px]">

          <li className="flex items-center gap-3 p-2 rounded-lg hover:bg-[#1E3A8A] transition">
            <FiHome />
            <Link href="/dashboard/admin">Dashboard</Link>
          </li>

          <li className="flex items-center gap-3 p-2 rounded-lg hover:bg-[#1E3A8A] transition">
            <FiFileText />
            <Link href="/dashboard/admin/complaints">Complaints</Link>
          </li>
           <li className="flex items-center gap-3 p-2 rounded-lg hover:bg-[#1E3A8A] transition">
            <FiUser />
            <Link href="/dashboard/admin/adminuser">Admin User</Link>
          </li>
    <li className="flex items-center gap-3 p-2 rounded-lg hover:bg-[#1E3A8A] transition">
            <FaBuilding  />
            <Link href="/dashboard/admin/department">Department</Link>
          </li>

          <li className="flex items-center gap-3 p-2 rounded-lg hover:bg-[#1E3A8A] transition">
            <FiRepeat />
            <Link href="/dashboard/admin/transfer">Transfer</Link>
          </li>


          <li className="flex items-center gap-3 p-2 rounded-lg hover:bg-[#1E3A8A] transition">
            <FiBarChart2 />
            <Link href="/dashboard/admin/reports">Reports</Link>
          </li>

         

        </ul>
      </div>



    </aside>
  )
}