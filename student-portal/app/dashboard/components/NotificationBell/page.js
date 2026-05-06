"use client";
import { FiBell, FiSearch, FiLogOut } from "react-icons/fi";
import { useRouter } from "next/navigation";
import Link from "next/link"
import { useEffect, useState } from "react";
import axios from "axios";





export default function Navbar() {
  const [count, setCount] = useState(0);
  const [open, setOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [notifications, setNotifications] = useState([])
  const [showDropdown, setShowDropdown] = useState(false)
  const [categoryData, setCategoryData] = useState([]);
  const router = useRouter();


  const fetchCategoryCount = async () => {
    const res = await axios.get(
      "http://localhost:5002/api/notifications/admin/category-count"
    );
    console.log("Category API response", res.data)

    setCategoryData(res.data);
  };
  const fetchNotifications = async () => {
    if (!user) return;

    let url = "";

    if (user.role === "admin") {
      url = "http://localhost:5002/api/notifications/admin";
    } else {
      url = `http://localhost:5002/api/notifications/user/${user.id}`;
    }

    const res = await axios.get(url);
    console.log("Name milega name", res.data)
    setNotifications(res.data);
  };

  useEffect(() => {
    const storedUser = localStorage.getItem("user");

    if (storedUser) {
      const parsedUser = JSON.parse(storedUser)
      console.log("User Data", parsedUser)
      setUser(JSON.parse(storedUser));

    }
  }, []);
  console.log("OPEN", open)
  console.log("USER", user)
  // useEffect(() => {
  //   setUser({ role: "user" });
  // }, []);
  useEffect(() => {
    console.log("UPDATED CATEGORY STATE 👉", categoryData);
  }, [categoryData]);
  const fetchCount = async () => {
    if (!user) return;

    let url = "";

    if (user.role === "admin") {
      url = "http://localhost:5002/api/notifications/admin-count";
    } else {
      url = `http://localhost:5002/api/notifications/user-count/${user.id}`;
    }

    const res = await axios.get(url);
    setCount(res.data.count);
  };
  useEffect(() => {
    if (!user) return;

    fetchCount();
    fetchNotifications();
    fetchCategoryCount();

    const interval = setInterval(() => {
      fetchCount();
      fetchNotifications();
      fetchCategoryCount();
    }, 5000);

    return () => clearInterval(interval);
  }, [user]);
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
        <div className="relative cursor-pointer group"
          onClick={() => setShowDropdown(!showDropdown)}
        >
          <div className="p-2 rounded-full hover:bg-gray-100 transition">
            <FiBell size={20} className="text-gray-700" />
          </div>


          {count > 0 && (
            <span className="absolute top-0 right-0 translate-x-1 -translate-y-1 bg-red-500 text-white text-[10px] w-4 h-4 flex items-center justify-center rounded-full shadow">
              {count}
            </span>
          )}
        </div>
        {showDropdown && (
          <div className="absolute right-0 mt-3 w-80 bg-white shadow-xl rounded-xl border border-gray-100 overflow-hidden z-50">

            <div className="px-4 py-3 border-b bg-gray-50">
              <h3 className="text-sm font-bold text-gray-800">Notifications</h3>
            </div>

            <div className="max-h-80 overflow-y-auto">
              {categoryData.length > 0 && (
                <div className="px-4 py-3 border-b">
                  <p className="text-xs font-semibold text-gray-900 uppercase mb-2 tracking-wide">
                    Categories
                  </p>

                  {categoryData.map((cat, i) => (
                    <div
                      key={i}
                      className="flex justify-between items-center py-1"
                    >
                      <span className="text-sm font-bold text-gray-800">
                        {cat.category}
                      </span>
                      <span className="text-xs font-bold bg-blue-100 text-blue-600 px-2 py-0.5 rounded-full">
                        {cat.count}
                      </span>
                    </div>
                  ))}
                </div>
              )}
    
              {notifications.length === 0 ? (
                <p className="text-center text-gray-500 py-6 text-sm">
                  No notifications
                </p>
              ) : (
                notifications.map((item, index) => {
                  console.log("Notification name Hai bhaiya", item.name)
                  return(
                  <div
                    key={index}
                    className="px-4 py-3 border-b hover:bg-gray-50 transition cursor-pointer"
                  >
                      <p className="text-sm text-gray-600 mt-1 leading-relaxed">
                      {item.name}
                    </p>
                   
                    <p className="text-xs font-bold text-gray-800">
                      {item.category}
                    </p>
                  
                  </div>
                  )
})
              )}
            </div>


            {/* <div className="text-center py-2 bg-gray-50">
              <button className="text-xs text-blue-600 font-semibold hover:underline">
                View All
              </button>
            </div> */}

          </div>
        )}

        {/* PROFILE */}
        <div className="relative">
          <img
            src={
              user?.profile_pic
                ? `http://localhost:5002/uploads/${user.profile_pic}`
                : user?.role === "admin"
                  ? "/admin.png"
                  : "/default.png"
            }
            alt="user"
            onClick={() => setOpen(!open)}
            className="w-9 h-9 sm:w-10 sm:h-10 rounded-full object-cover cursor-pointer border-2 border-black shadow-2xl hover:scale-105 transition"
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
                  <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-black">
                    <Link href="/dashboard/admin/users">View Profile</Link>
                  </li>

                  <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-black">
                    <Link href="/dashboard/admin/settings">Settings</Link>
                  </li>
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