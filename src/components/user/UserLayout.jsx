import React from "react";
import { NavLink, Outlet } from "react-router-dom";

export const UserLayout = () => {
  const navLinkClass = ({ isActive }) =>
    `rounded-full px-4 py-2 transition ${
      isActive
        ? "bg-cyan-400/15 text-cyan-200 shadow-[0_0_0_1px_rgba(103,232,249,0.15)]"
        : "text-white/75 hover:bg-white/8 hover:text-white"
    }`;

  return (
    <div className="min-h-screen bg-transparent text-white">
      <div className="fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute left-[-8rem] top-[-6rem] h-72 w-72 rounded-full bg-cyan-500/15 blur-3xl" />
        <div className="absolute bottom-[-6rem] right-[-4rem] h-96 w-96 rounded-full bg-blue-500/10 blur-3xl" />
        <div className="absolute inset-0 bg-[linear-gradient(rgba(148,163,184,0.06)_1px,transparent_1px),linear-gradient(90deg,rgba(148,163,184,0.06)_1px,transparent_1px)] bg-[size:84px_84px] opacity-20" />
      </div>

      <nav className="sticky top-0 z-20 border-b border-white/10 bg-slate-950/75 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-6 py-4">
          <NavLink to="/" className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-cyan-300 via-cyan-400 to-blue-500 text-sm font-black text-slate-950 shadow-lg shadow-cyan-500/20">
              VV
            </div>
            <div>
              <p className="text-xs uppercase tracking-[0.3em] text-cyan-300">
                VehicleVault
              </p>
              <p className="text-sm text-white/60">Premium Car Discovery</p>
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
              className="rounded-full bg-gradient-to-r from-cyan-400 to-blue-500 px-4 py-2 text-sm font-semibold text-slate-950 transition hover:opacity-90"
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
