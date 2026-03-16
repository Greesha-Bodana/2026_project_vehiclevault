import React from "react";
import { NavLink, Outlet } from "react-router-dom";

export const UserNavbar = () => {
  return (
    <>
      {/* NAVBAR */}
      <nav className="w-full bg-gray-900 text-white shadow-md">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center justify-between h-16">

            {/* LEFT LOGO */}
            <div className="flex items-center gap-2">
              <span className="text-2xl">🚗</span>
              <h1 className="text-xl font-bold tracking-wide">
                Vehicle<span className="text-blue-500">Vault</span>
              </h1>
            </div>

            {/* CENTER MENU */}
            <ul className="hidden md:flex gap-8 text-sm font-medium">
              <li>
                <NavLink
                  to="/"
                  className={({ isActive }) =>
                    isActive ? "text-blue-400" : "hover:text-blue-400"
                  }
                >
                  Home
                </NavLink>
              </li>

              <li>
                <NavLink
                  to="useeffectdemo"
                  className={({ isActive }) =>
                    isActive ? "text-blue-400" : "hover:text-blue-400"
                  }
                >
                  UseEffectDemo
                </NavLink>
              </li>

              <li>
                <NavLink
                  to="getapidemo"
                  className={({ isActive }) =>
                    isActive ? "text-blue-400" : "hover:text-blue-400"
                  }
                >
                  GetApiDemo
                </NavLink>
              </li>

              <li className="hover:text-blue-400 cursor-pointer">
                About
              </li>
            </ul>

            <li>
              <NavLink
                to="comparecars"
                className={({ isActive }) =>
                  isActive ? "text-blue-400" : "hover:text-blue-400"
                }
              >
                Compare Cars
              </NavLink>
            </li>

            {/* RIGHT ACTIONS */}
            <div className="flex items-center gap-4">
              <button className="px-4 py-1.5 border border-blue-500 text-blue-500 rounded-md hover:bg-blue-500 hover:text-white transition">
                Login
              </button>
              <button className="px-4 py-1.5 bg-blue-500 rounded-md hover:bg-blue-600 transition">
                Signup
              </button>
            </div>

          </div>
        </div>
      </nav>

      {/* PAGE CONTENT */}
      <main className="p-6">
        <Outlet />
      </main>
    </>
  );
};