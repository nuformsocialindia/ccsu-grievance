"use client";
import { FiBell } from "react-icons/fi";

export default function NotificationBell() {
  return (
    <div className="relative cursor-pointer">
      <FiBell size={22} />

      {/* red dot badge */}
      <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] px-1 rounded-full">
        6
      </span>
    </div>
  );
}