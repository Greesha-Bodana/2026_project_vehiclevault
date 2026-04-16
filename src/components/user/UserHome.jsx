import React from "react";
import { Link } from "react-router-dom";

export const UserHome = () => {
  return (
    <section className="mx-auto max-w-6xl rounded-[2rem] border border-white/10 bg-slate-950/90 p-8 shadow-2xl">
      <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
        <div className="space-y-6 text-white">
          <span className="inline-flex rounded-full border border-cyan-400/20 bg-cyan-400/10 px-4 py-2 text-sm uppercase tracking-[0.35em] text-cyan-300">
            VehicleVault
          </span>
          <h1 className="text-4xl font-bold leading-tight sm:text-5xl">
            VehicleVault Car Comparison System
          </h1>
          <p className="max-w-2xl text-white/70 text-lg leading-8">
            Compare two cars side-by-side, review their features and defects, and get a recommendation-ready report before buying.
          </p>
          <p className="max-w-2xl text-cyan-200 text-sm leading-6">
            Admin has sole control to add cars, manage listings, and post notifications, while buyers search models, compare options, and view accessory suggestions.
          </p>
          <div className="flex flex-wrap gap-4">
            <Link
              to="/cars"
              className="rounded-full bg-cyan-500 px-7 py-3 text-sm font-semibold text-slate-950 transition hover:bg-cyan-400"
            >
              Compare cars
            </Link>
            <Link
              to="/signup"
              className="rounded-full border border-white/15 bg-white/5 px-7 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
            >
              Sign up
            </Link>
          </div>
        </div>

        <div className="relative overflow-hidden rounded-[2rem] border border-white/10 shadow-2xl">
          <img
            src="https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1200&q=80"
            alt="Premium car on road"
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/95 via-slate-950/30 to-transparent" />
          <div className="absolute left-6 bottom-6 rounded-3xl bg-slate-950/80 px-5 py-4 text-white shadow-lg">
            <p className="text-sm uppercase tracking-[0.3em] text-cyan-300">Start your search</p>
            <p className="mt-2 text-lg font-semibold">Compare top vehicles in seconds.</p>
          </div>
        </div>
      </div>
    </section>
  );
};

