"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Code2,
  FileText,
  User,
  LogOut,
} from "lucide-react";

const menuItems = [
  {
    name: "Dashboard",
    href: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    name: "Submit Code",
    href: "/submit-code",
    icon: Code2,
  },
  {
    name: "Reviews",
    href: "/reviews",
    icon: FileText,
  },
  {
    name: "Profile",
    href: "/profile",
    icon: User,
  },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <div className="w-64 min-h-screen bg-gray-900 text-white p-5">
      <h1 className="text-2xl font-bold mb-8">
        AI Code Review
      </h1>

      <div className="space-y-2">
        {menuItems.map((item) => {
          const Icon = item.icon;

          return (
            <Link
              key={item.name}
              href={item.href}
              className={`flex items-center gap-3 p-3 rounded-lg ${
                pathname === item.href
                  ? "bg-blue-600"
                  : "hover:bg-gray-800"
              }`}
            >
              <Icon size={20} />
              {item.name}
            </Link>
          );
        })}
      </div>

      <button className="flex items-center gap-3 mt-10 p-3 w-full hover:bg-red-600 rounded-lg">
        <LogOut size={20} />
        Logout
      </button>
    </div>
  );
}