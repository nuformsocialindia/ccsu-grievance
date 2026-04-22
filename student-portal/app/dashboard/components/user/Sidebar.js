"use client"
import Link from "next/link"
import { FiHome, FiUser, FiFileText, FiPlusCircle, FiBell, FiHelpCircle, FiSettings, FiLogOut } from "react-icons/fi"
import { useRouter } from "next/navigation";

export default function Sidebar() {
  const router = useRouter();

  const handleLogout = () => {

    localStorage.removeItem("token");
    localStorage.removeItem("user");

    router.push("/login");
  };
  return (
    <aside className="fixed top-0 left-0 w-64 h-screen bg-[#14297A] text-white p-5 flex flex-col justify-between">

      {/* Top Section */}
      <div>
        <h2 className="text-2xl font-bold mb-8">User Panel</h2>

        <ul className="space-y-5 text-[15px]">

          <li className="flex items-center gap-3 hover:text-yellow-300 cursor-pointer">
            <FiHome />
            <Link href="/dashboard/user">Dashboard</Link>
          </li>



          <li className="flex items-center gap-3 hover:text-yellow-300 cursor-pointer">
            <FiFileText />
            <Link href="/dashboard/user/my-complaints">My Complaints</Link>
          </li>

          <li className="flex items-center gap-3 hover:text-yellow-300 cursor-pointer">
            <FiUser />
            <Link href="/dashboard/user/profile">User Profile</Link>
          </li>

          <li className="flex items-center gap-3 hover:text-yellow-300 cursor-pointer">
            <FiHelpCircle />
            <Link href="/dashboard/user/settings">Settings</Link>
          </li>




        </ul>
      </div>

      {/* Bottom Section */}
      <div className="border-t border-gray-400 pt-4">
        <div
          onClick={handleLogout}
          className="flex items-center gap-3 hover:text-red-400 cursor-pointer"
        >
          <FiLogOut />
          <span>Logout</span>
        </div>
      </div>

    </aside>
  )
}