import React from "react";
import { Link } from "react-router-dom";

const overviewCards = [
  { label: "Active users", value: "128", detail: "People researching and comparing cars" },
  { label: "Cars listed", value: "24", detail: "Inventory currently visible in the platform" },
  { label: "Actions today", value: "86", detail: "Edits, uploads, and content updates completed" }
];

const activity = [
  "Refresh premium car listings and images",
  "Review new user registrations and support issues",
  "Keep homepage content aligned with inventory quality"
];

export const VehicleVaultAdminDashboard = () => {
  return (
    <div className="space-y-8">
      <section className="rounded-[2.25rem] border border-white/10 bg-[linear-gradient(135deg,rgba(14,116,144,0.2),rgba(15,23,42,0.96)_38%,rgba(30,41,59,0.96))] p-8 shadow-[0_30px_120px_rgba(2,6,23,0.45)]">
        <div className="grid gap-8 xl:grid-cols-[1.2fr_0.8fr] xl:items-end">
          <div>
            <p className="text-sm uppercase tracking-[0.32em] text-cyan-300">Admin Dashboard</p>
            <h1 className="mt-3 text-4xl font-black text-white sm:text-5xl">
              Control the VehicleVault experience from one modern panel.
            </h1>
            <p className="mt-4 max-w-3xl text-white/70">
              This admin area is now styled like the rest of the product, with a cleaner overview and faster access to the core management screens.
            </p>
          </div>

          <div className="rounded-[1.9rem] border border-white/10 bg-slate-950/70 p-6 backdrop-blur">
            <p className="text-sm uppercase tracking-[0.28em] text-cyan-300">Quick actions</p>
            <div className="mt-5 flex flex-wrap gap-3">
              <Link
                to="/admin/cars"
                className="rounded-full bg-cyan-300 px-5 py-3 text-sm font-bold text-slate-950 transition hover:bg-cyan-200"
              >
                Manage cars
              </Link>
              <Link
                to="/admin/users"
                className="rounded-full border border-white/10 bg-white/5 px-5 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
              >
                Review users
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="grid gap-5 lg:grid-cols-3">
        {overviewCards.map((card) => (
          <article
            key={card.label}
            className="rounded-[1.8rem] border border-white/10 bg-white/6 p-6 shadow-2xl backdrop-blur"
          >
            <p className="text-sm uppercase tracking-[0.28em] text-cyan-300">{card.label}</p>
            <p className="mt-4 text-4xl font-black text-white">{card.value}</p>
            <p className="mt-3 text-sm text-white/65">{card.detail}</p>
          </article>
        ))}
      </section>

      <section className="grid gap-5 xl:grid-cols-[0.9fr_1.1fr]">
        <article className="rounded-[2rem] border border-white/10 bg-slate-950/80 p-6 shadow-2xl">
          <p className="text-sm uppercase tracking-[0.28em] text-cyan-300">Operations focus</p>
          <h2 className="mt-4 text-2xl font-bold text-white">Keep the marketplace sharp</h2>
          <div className="mt-6 space-y-3">
            {activity.map((item) => (
              <div
                key={item}
                className="rounded-[1.4rem] border border-white/10 bg-white/5 px-4 py-4 text-white/75"
              >
                {item}
              </div>
            ))}
          </div>
        </article>

        <article className="rounded-[2rem] border border-white/10 bg-white/6 p-6 shadow-2xl backdrop-blur">
          <p className="text-sm uppercase tracking-[0.28em] text-cyan-300">Panel direction</p>
          <h2 className="mt-4 text-2xl font-bold text-white">What changed in this admin panel</h2>
          <p className="mt-4 max-w-3xl text-white/70">
            The admin side now uses the same visual language as the main site, so the whole project feels like one product. Clear hierarchy, stronger cards, and better inventory management make it feel more complete.
          </p>
        </article>
      </section>
    </div>
  );
};
