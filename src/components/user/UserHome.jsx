import React from "react";
import { Link } from "react-router-dom";

export const UserHome = () => {
  return (
    <section className="overflow-hidden rounded-[2rem] border border-white/10 bg-[radial-gradient(circle_at_top_left,rgba(6,182,212,0.2),transparent_28%),radial-gradient(circle_at_bottom_right,rgba(34,197,94,0.12),transparent_26%),linear-gradient(135deg,rgba(2,6,23,0.98),rgba(9,14,28,0.98))] shadow-2xl">
      <div className="grid items-center gap-6 px-5 py-6 sm:px-8 lg:min-h-[calc(100vh-13.5rem)] lg:grid-cols-[0.82fr_1.18fr] lg:px-10 lg:py-8">
        <div className="max-w-md space-y-6">
          <span className="inline-flex rounded-full border border-cyan-400/20 bg-cyan-400/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.32em] text-cyan-200">
            VehicleVault
          </span>

          <div className="space-y-4">
            <h1 className="text-4xl font-black leading-[1.02] text-white sm:text-5xl xl:text-[3.6rem]">
              Discover the right car in one clean place.
            </h1>
            <p className="max-w-md text-sm leading-7 text-white/65 sm:text-base">
              Browse, compare, and shortlist cars with a simple VehicleVault experience.
            </p>
          </div>

          <div className="flex flex-wrap gap-4">
            <Link
              to="/user/cars"
              className="inline-flex items-center justify-center rounded-full bg-cyan-400 px-6 py-3 text-sm font-semibold text-slate-950 transition hover:bg-cyan-300"
            >
              Explore cars
            </Link>
            <Link
              to="/user/cars"
              className="inline-flex items-center justify-center rounded-full border border-white/15 bg-white/5 px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
            >
              Choose cars to compare
            </Link>
          </div>

          <div className="flex flex-wrap gap-3 text-xs uppercase tracking-[0.24em] text-white/50">
            <span className="rounded-full border border-white/10 bg-white/5 px-4 py-2">Smart search</span>
            <span className="rounded-full border border-white/10 bg-white/5 px-4 py-2">Side by side compare</span>
            <span className="rounded-full border border-white/10 bg-white/5 px-4 py-2">Clean details</span>
          </div>
        </div>

        <div className="relative">
          <div className="absolute inset-0 scale-95 rounded-[2rem] bg-cyan-400/10 blur-3xl" />
          <div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.08),rgba(255,255,255,0.02))] p-3 shadow-[0_32px_80px_rgba(0,0,0,0.35)] sm:p-4">
            <img
              src="https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&fit=crop&w=1400&q=80"
              alt="Sports car on an open road"
              className="h-full max-h-[62vh] w-full rounded-[1.5rem] border border-white/10 bg-slate-950/50 object-cover"
            />

            <div className="absolute inset-x-7 bottom-7 rounded-[1.4rem] border border-white/10 bg-slate-950/70 px-5 py-4 backdrop-blur">
              <p className="text-xs uppercase tracking-[0.28em] text-cyan-200">Featured drive</p>
              <p className="mt-2 text-lg font-semibold text-white">A stronger homepage with a real car image.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
