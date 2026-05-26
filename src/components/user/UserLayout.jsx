import React from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";

export const UserLayout = () => {
  const navigate = useNavigate();

  const navLinkClass = ({ isActive }) =>
    `rounded-full border border-transparent px-4 py-2.5 text-sm font-medium transition-all ${
      isActive
        ? "border-cyan-400/30 bg-cyan-400/10 text-cyan-100 shadow-lg shadow-cyan-500/10"
        : "text-white/70 hover:border-white/20 hover:bg-white/10 hover:text-white"
    }`;

  const handleLogout = () => {
    localStorage.removeItem("vehiclevault_token");
    localStorage.removeItem("vehiclevault_role");
    navigate("/login", { replace: true });
  };

  return (
    <div className="min-h-screen bg-transparent text-white">
      <div className="fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute left-[-8rem] top-[-6rem] h-72 w-72 rounded-full bg-cyan-500/15 blur-3xl" />
        <div className="absolute bottom-[-6rem] right-[-4rem] h-96 w-96 rounded-full bg-blue-500/10 blur-3xl" />
        <div className="absolute inset-0 bg-[linear-gradient(rgba(148,163,184,0.06)_1px,transparent_1px),linear-gradient(90deg,rgba(148,163,184,0.06)_1px,transparent_1px)] bg-[size:84px_84px] opacity-20" />
      </div>

      <nav className="sticky top-0 z-20 border-b border-white/10 bg-slate-950/95 shadow-lg shadow-slate-950/20 backdrop-blur-xl">
        <div className="mx-auto flex flex-wrap items-center justify-between gap-4 px-6 py-4 max-w-7xl">
          <NavLink to="/user" className="flex items-center gap-3">
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

          <div className="flex flex-1 flex-wrap items-center justify-center gap-3 px-2">
            <NavLink to="/user" end className={navLinkClass}>
              Home
            </NavLink>
            <NavLink to="/user/cars" className={navLinkClass}>
              Cars
            </NavLink>
            <NavLink to="/user/dashboard" className={navLinkClass}>
              Dashboard
            </NavLink>
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={handleLogout}
              className="rounded-full bg-white/10 px-4 py-2 text-sm text-white transition hover:bg-white/20"
            >
              Logout
            </button>
          </div>
        </div>
      </nav>

      <main className="mx-auto max-w-7xl px-6 py-8">
        <Outlet />
      </main>
    </div>
  );
};
