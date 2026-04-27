"use client";
import { FiBell, FiSearch, FiLogOut } from "react-icons/fi";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import Link from "next/link"
// import { FiHelpCircle } from "react-icons/fi"




export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [user, setUser] = useState(null);
  const router = useRouter();



  useEffect(() => {
  const storedUser = localStorage.getItem("user");

  if (storedUser) {
    const parsedUser = JSON.parse(storedUser)
    console.log("User Data",parsedUser )
    setUser(JSON.parse(storedUser));
    
  }
}, []);
// useEffect(() => {
//   setUser({ role: "user" });
// }, []);

  const handleLogout = () => {

    localStorage.removeItem("token");
    localStorage.removeItem("user");

    router.push("/login");
  };
  

  return (
    <div className="fixed top-0 left-64 w-[calc(100%-16rem)] z-50 bg-white/70 backdrop-blur-md px-4 sm:px-6 py-3 flex items-center justify-between">

      {/* LEFT - SEARCH */}
      <div className="hidden sm:flex items-center gap-2 bg-gray-100/80 px-4 py-3 rounded-xl w-full max-w-md focus-within:ring-2 focus-within:ring-blue-400 transition">
        <FiSearch className="text-gray-500" />
        <input
          type="text"
          placeholder="Search here..."
          className="bg-transparent outline-none w-full text-sm text-gray-700 placeholder-gray-400"
        />
      </div>

      {/* MOBILE SEARCH ICON */}
      <div className="sm:hidden bg-gray-200 p-2 rounded-full">
        <FiSearch className="text-gray-600" />
      </div>

      {/* RIGHT SIDE */}
      <div className="flex items-center gap-4 sm:gap-6 relative">

        {/* NOTIFICATION */}
        <div className="relative cursor-pointer group">
          <div className="p-2 rounded-full hover:bg-gray-100 transition">
            <FiBell size={20} className="text-gray-700" />
          </div>

          <span className="absolute top-0 right-0 translate-x-1 -translate-y-1 bg-red-500 text-white text-[10px] w-4 h-4 flex items-center justify-center rounded-full shadow">
            6
          </span>
        </div>

        {/* PROFILE */}
        <div className="relative">
          <img
            src="https://i.pravatar.cc/40"
            alt="user"
            onClick={() => setOpen(!open)}
            className="w-9 h-9 sm:w-10 sm:h-10 rounded-full cursor-pointer border-2 border-black shadow-2xl hover:scale-105 transition"
          />

          {/* DROPDOWN */}
          {open && user && (
            <ul className="absolute right-0 mt-2 z-50 w-44 text-sm text-gray-700 bg-white rounded-lg overflow-hidden shadow-md">

              {/* USER MENU */}
              {user?.role === "user" && (
                <>
                  <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-black">
                    <Link href="/dashboard/user/profile">User Profile</Link>
                  </li>

                  <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
                    <Link href="/dashboard/user/settings">Settings</Link>
                  </li>
                </>
              )}

              {/* ADMIN MENU */}
              {user?.role === "admin" && (
                <>
                  <li className="px-4 py-2 flex items-center gap-2 hover:bg-gray-100 cursor-pointer">
            {/* <FiUsers /> */}
            <Link href="/dashboard/admin/users"> View Profile</Link>
          </li>
                 <li className="px-4 py-2 flex items-center gap-2 hover:bg-gray-100 cursor-pointer"> 
                  {/* <FiHelpCircle /> */}
                   <Link href="/dashboard/admin/settings" className="w-full"> Settings </Link> </li>
                </>
              )}

              {/* LOGOUT */}
              <li
                onClick={handleLogout}
                className="px-4 py-2 flex items-center gap-2 hover:bg-red-100 text-red-500 cursor-pointer"
              >
                Logout <FiLogOut />
              </li>

            </ul>
          )}
        </div>
      </div>

      {/* ANIMATION STYLE */}
      <style jsx>{`
        .animate-fadeIn {
          animation: fadeIn 0.2s ease-in-out;
        }
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(8px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
}