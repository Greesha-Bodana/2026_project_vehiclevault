import React from "react";
import { NavLink, Outlet } from "react-router-dom";

export const UserLayout = () => {
  const navLinkClass = ({ isActive }) =>
    `rounded-full px-4 py-2 transition ${
      isActive
        ? "bg-cyan-400/15 text-cyan-300"
        : "text-white/75 hover:bg-white/8 hover:text-white"
    }`;

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <nav className="sticky top-0 z-10 border-b border-white/10 bg-slate-950/90 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-6 py-4">
          <NavLink to="/" className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-to-br from-cyan-400 to-blue-500 text-sm font-bold text-slate-950">
              VV
            </div>
            <div>
              <p className="text-xs uppercase tracking-[0.3em] text-cyan-300">
                VehicleVault
              </p>
              <p className="text-sm text-white/60">Car Comparison System</p>
            </div>
          </NavLink>

          <div className="hidden items-center gap-2 md:flex">
            <NavLink to="/" end className={navLinkClass}>
              Home
            </NavLink>
            <NavLink to="/cars" className={navLinkClass}>
              Cars
            </NavLink>
            <NavLink to="/dashboard" className={navLinkClass}>
              Dashboard
            </NavLink>
            <NavLink to="/admin" className={navLinkClass}>
              Admin
            </NavLink>
          </div>

          <div className="flex items-center gap-3">
            <NavLink
              to="/login"
              className="rounded-full border border-cyan-400/40 px-4 py-2 text-sm text-cyan-300 transition hover:bg-cyan-400/10"
            >
              Login
            </NavLink>
            <NavLink
              to="/signup"
              className="rounded-full bg-gradient-to-r from-cyan-500 to-blue-500 px-4 py-2 text-sm font-semibold text-white transition hover:opacity-90"
            >
              Signup
            </NavLink>
          </div>
        </div>
      </nav>

      <main className="mx-auto max-w-7xl px-6 py-8">
        <Outlet />
      </main>
    </div>
  );
};
