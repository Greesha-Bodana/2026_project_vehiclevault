import React from "react";
import { Link } from "react-router-dom";

const stats = [
  { label: "Cars tracked", value: "240+" },
  { label: "Comparison sessions", value: "1.2K" },
  { label: "Buyer confidence", value: "98%" }
];

const features = [
  {
    title: "Comparison cockpit",
    description:
      "Review specs, price bands, fuel economy, and feature highlights side by side before you shortlist."
  },
  {
    title: "Buyer-first guidance",
    description:
      "Turn a messy buying journey into a clear decision with practical insights for city, family, and premium use cases."
  },
  {
    title: "Curated vehicle stories",
    description:
      "Each listing is presented like a premium showroom card so users understand what makes every car special."
  }
];

const collections = [
  {
    eyebrow: "Urban Moves",
    title: "City cars for everyday efficiency",
    description: "Compact, easy to park, and fuel-aware options for busy weekday driving."
  },
  {
    eyebrow: "Family Ready",
    title: "SUVs and spacious cabins",
    description: "Comfort-forward picks with better practicality, road presence, and road-trip value."
  },
  {
    eyebrow: "Performance Edge",
    title: "Premium machines with personality",
    description: "For buyers who care about feel, design, and an elevated driving experience."
  }
];

export const VehicleVaultHome = () => {
  return (
    <div className="space-y-12 pb-10">
      <section className="relative overflow-hidden rounded-[2.25rem] border border-white/10 bg-[linear-gradient(135deg,rgba(14,116,144,0.22),rgba(15,23,42,0.96)_35%,rgba(30,41,59,0.94)_100%)] p-8 shadow-[0_30px_120px_rgba(2,6,23,0.45)] sm:p-10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(34,211,238,0.18),transparent_26%),radial-gradient(circle_at_bottom_left,rgba(59,130,246,0.18),transparent_30%)]" />
        <div className="relative grid gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:items-center">
          <div className="space-y-7 text-white">
            <div className="flex flex-wrap gap-3">
              <span className="inline-flex rounded-full border border-cyan-300/20 bg-cyan-400/10 px-4 py-2 text-xs font-medium uppercase tracking-[0.35em] text-cyan-200">
                VehicleVault
              </span>
              <span className="inline-flex rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs font-medium uppercase tracking-[0.35em] text-white/70">
                Premium comparison platform
              </span>
            </div>

            <div className="space-y-4">
              <h1 className="max-w-4xl text-4xl font-black leading-tight text-white sm:text-5xl lg:text-6xl">
                Find the right car with a cleaner, smarter buying experience.
              </h1>
              <p className="max-w-2xl text-base leading-8 text-slate-300 sm:text-lg">
                VehicleVault turns scattered car research into one polished journey. Explore standout models, compare what matters, and move from curiosity to confidence faster.
              </p>
            </div>

            <div className="flex flex-wrap gap-4">
              <Link
                to="/cars"
                className="rounded-full bg-gradient-to-r from-cyan-300 to-blue-400 px-7 py-3 text-sm font-bold text-slate-950 transition hover:scale-[1.02]"
              >
                Explore inventory
              </Link>
              <Link
                to="/signup"
                className="rounded-full border border-white/15 bg-white/5 px-7 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
              >
                Start free
              </Link>
            </div>

            <div className="grid gap-4 sm:grid-cols-3">
              {stats.map((item) => (
                <article
                  key={item.label}
                  className="rounded-[1.6rem] border border-white/10 bg-slate-950/40 p-5 backdrop-blur"
                >
                  <p className="text-sm uppercase tracking-[0.28em] text-cyan-200/80">
                    {item.label}
                  </p>
                  <p className="mt-4 text-3xl font-black text-white">{item.value}</p>
                </article>
              ))}
            </div>
          </div>

          <div className="grid gap-4">
            <div className="overflow-hidden rounded-[2rem] border border-white/10 bg-slate-950/80 p-4 backdrop-blur">
              <img
                src="/car-hero.svg"
                alt="VehicleVault car comparison illustration"
                className="h-full w-full rounded-[1.5rem] object-cover"
              />
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <article className="rounded-[1.75rem] border border-white/10 bg-white/5 p-5">
                <p className="text-sm uppercase tracking-[0.28em] text-amber-200/80">
                  Fast shortlist
                </p>
                <h3 className="mt-3 text-xl font-bold text-white">
                  Move from browsing to decision-ready in minutes
                </h3>
              </article>
              <article className="rounded-[1.75rem] border border-white/10 bg-cyan-400/10 p-5">
                <p className="text-sm uppercase tracking-[0.28em] text-cyan-200">
                  Built for clarity
                </p>
                <h3 className="mt-3 text-xl font-bold text-white">
                  Specs, value, and feel presented in one place
                </h3>
              </article>
            </div>
          </div>
        </div>
      </section>

      <section className="rounded-[2.1rem] border border-white/10 bg-white/5 p-8 shadow-2xl backdrop-blur">
        <div className="space-y-8">
          <div>
            <p className="text-sm uppercase tracking-[0.32em] text-cyan-300">Why VehicleVault</p>
            <h2 className="mt-3 text-3xl font-black text-white">
              A home page that feels like a modern vehicle marketplace
            </h2>
            <p className="max-w-3xl text-white/70">
              VehicleVault is designed to make trust visible. The layout highlights the inventory, keeps decisions simple, and gives the whole project a more professional identity.
            </p>
          </div>
          <div className="grid gap-5 md:grid-cols-3">
            {features.map((item) => (
              <article
                key={item.title}
                className="rounded-[1.75rem] border border-white/10 bg-slate-950/90 p-6 shadow-[0_20px_60px_rgba(2,6,23,0.3)]"
              >
                <h3 className="text-xl font-semibold text-white">{item.title}</h3>
                <p className="mt-3 text-white/70">{item.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="rounded-[2.1rem] border border-white/10 bg-slate-950/80 p-8 shadow-2xl backdrop-blur">
        <div className="mb-8">
          <p className="text-sm uppercase tracking-[0.32em] text-cyan-300">Collections</p>
          <h2 className="mt-3 text-3xl font-black text-white">Browse by the way people actually shop</h2>
        </div>
        <div className="grid gap-8 lg:grid-cols-3">
          {collections.map((item) => (
            <div
              key={item.title}
              className="rounded-[2rem] border border-white/10 bg-[linear-gradient(180deg,rgba(15,23,42,0.95),rgba(2,6,23,0.95))] p-6"
            >
              <p className="text-sm uppercase tracking-[0.32em] text-cyan-300">{item.eyebrow}</p>
              <h3 className="mt-5 text-2xl font-semibold text-white">{item.title}</h3>
              <p className="mt-3 text-white/70">{item.description}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="rounded-[2.1rem] border border-white/10 bg-[linear-gradient(135deg,rgba(8,145,178,0.2),rgba(15,23,42,0.92))] p-10 shadow-2xl backdrop-blur">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.32em] text-cyan-300">Get started</p>
            <h2 className="mt-3 text-3xl font-black text-white">
              Bring buyers into a cleaner VehicleVault experience.
            </h2>
            <p className="mt-4 max-w-2xl text-white/70">
              Browse the catalog, compare top options, and make the home page feel like a polished car-tech product instead of a starter screen.
            </p>
          </div>
          <div className="flex flex-wrap gap-4">
            <Link
              to="/signup"
              className="inline-flex rounded-full bg-cyan-300 px-7 py-3 text-sm font-bold text-slate-950 transition hover:bg-cyan-200"
            >
              Sign up now
            </Link>
            <Link
              to="/cars"
              className="inline-flex rounded-full border border-white/15 px-7 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
            >
              See cars
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};
