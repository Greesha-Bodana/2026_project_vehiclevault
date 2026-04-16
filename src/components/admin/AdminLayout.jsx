import React from "react";
import { NavLink, Outlet } from "react-router-dom";

export const AdminLayout = () => {
  const navItemClass = ({ isActive }) =>
    `block rounded-2xl px-4 py-3 transition ${
      isActive
        ? "bg-cyan-400/15 text-cyan-200 shadow-[0_0_0_1px_rgba(103,232,249,0.15)]"
        : "text-white/75 hover:bg-white/10 hover:text-white"
    }`;

  return (
    <div className="min-h-screen bg-transparent text-white lg:grid lg:grid-cols-[290px_1fr]">
      <div className="fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute left-[-8rem] top-[-6rem] h-72 w-72 rounded-full bg-cyan-500/12 blur-3xl" />
        <div className="absolute right-[-8rem] top-1/3 h-96 w-96 rounded-full bg-blue-500/10 blur-3xl" />
      </div>

      <aside className="border-b border-white/10 bg-slate-950/80 backdrop-blur-xl lg:min-h-screen lg:border-b-0 lg:border-r">
        <div className="border-b border-white/10 px-6 py-6">
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-cyan-300 via-cyan-400 to-blue-500 font-black text-slate-950 shadow-lg shadow-cyan-500/20">
              VV
            </div>
            <div>
              <p className="text-xs uppercase tracking-[0.3em] text-cyan-300">
                VehicleVault
              </p>
              <h1 className="mt-1 text-2xl font-black">Admin Panel</h1>
            </div>
          </div>
        </div>

        <div className="px-4 py-6">
          <div className="rounded-[1.75rem] border border-white/10 bg-white/5 p-3">
            <p className="px-3 pb-3 text-xs uppercase tracking-[0.28em] text-white/45">
              Navigation
            </p>
            <nav className="space-y-2 text-sm font-medium">
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
          </div>

          <div className="mt-6 rounded-[1.75rem] border border-cyan-400/20 bg-cyan-400/10 p-5">
            <p className="text-xs uppercase tracking-[0.28em] text-cyan-200">
              Workspace status
            </p>
            <h2 className="mt-3 text-xl font-bold text-white">VehicleVault control center</h2>
            <p className="mt-3 text-sm leading-6 text-white/70">
              Manage listings, monitor users, and keep the premium car-shopping experience consistent across the project.
            </p>
          </div>
        </div>
      </aside>

      <main className="w-full p-6 lg:p-8">
        <div className="mx-auto w-full max-w-7xl">
          <Outlet />
        </div>
      </main>
    </div>
  );
};
