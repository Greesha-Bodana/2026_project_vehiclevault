import React from "react";
import { NavLink, Outlet } from "react-router-dom";

export const AdminLayout = () => {
  const navItemClass = ({ isActive }) =>
    `block rounded-xl px-4 py-3 transition ${
      isActive
        ? "bg-cyan-400/15 text-cyan-300"
        : "text-white/75 hover:bg-white/10 hover:text-white"
    }`;

  return (
    <div className="min-h-screen bg-slate-950 text-white lg:flex">
      <aside className="lg:min-h-screen lg:w-72 lg:border-r lg:border-white/10 lg:bg-slate-950/90">
        <div className="border-b border-white/10 px-6 py-6">
          <p className="text-xs uppercase tracking-[0.3em] text-cyan-300">
            VehicleVault
          </p>
          <h1 className="mt-2 text-2xl font-bold">Admin Panel</h1>
        </div>

        <nav className="space-y-2 px-4 py-6 text-sm font-medium">
          <NavLink to="/admin/dashboard" className={navItemClass}>
            Dashboard
          </NavLink>
          <NavLink to="/admin/users" className={navItemClass}>
            Users
          </NavLink>
          <NavLink to="/admin/cars" className={navItemClass}>
            Cars
          </NavLink>
          <NavLink to="/" className={navItemClass}>
            Back to site
          </NavLink>
        </nav>
      </aside>

      <main className="w-full p-6 lg:p-8">
        <Outlet />
      </main>
    </div>
  );
};
