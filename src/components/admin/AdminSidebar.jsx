import React from "react";
import { Outlet, NavLink } from "react-router-dom";

export const AdminSidebar = () => {
  return (
    <div className="flex">
      {/* SIDEBAR */}
      <aside className="w-64 h-screen bg-gray-900 text-white fixed left-0 top-0">

        {/* LOGO */}
        <div className="h-16 flex items-center justify-center border-b border-gray-700">
          <span className="text-2xl mr-2">🚗</span>
          <h1 className="text-xl font-bold tracking-wide">
            Vehicle<span className="text-blue-500">Vault</span>
          </h1>
        </div>

        {/* MENU */}
        <nav className="mt-6 px-4">
          <ul className="space-y-2 text-sm font-medium">

            <NavLink
              to="dashboard"
              className={({ isActive }) =>
                `block px-4 py-2 rounded-md ${
                  isActive ? "bg-gray-800 text-blue-400" : "hover:bg-gray-800"
                }`
              }
            >
              📊 Dashboard
            </NavLink>

            <NavLink to="vehicles" className="block px-4 py-2 rounded-md hover:bg-gray-800">
              🚘 Vehicles
            </NavLink>

            <NavLink to="users" className="block px-4 py-2 rounded-md hover:bg-gray-800">
              👤 Users
            </NavLink>

            <NavLink to="bookings" className="block px-4 py-2 rounded-md hover:bg-gray-800">
              📅 Bookings
            </NavLink>

            <NavLink to="settings" className="block px-4 py-2 rounded-md hover:bg-gray-800">
              ⚙️ Settings
            </NavLink>

          </ul>
        </nav>
      </aside>

      {/* PAGE CONTENT */}
      <main className="ml-64 w-full min-h-screen bg-gray-100 p-6">
        <Outlet />
      </main>
    </div>
  );
};