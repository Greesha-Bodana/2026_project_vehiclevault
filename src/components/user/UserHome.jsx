export { VehicleVaultHome as UserHome } from "./VehicleVaultHome";
/*
import React from "react";
import { Link } from "react-router-dom";

const stats = [
  { label: "Cars compared", value: "24+" },
  { label: "Trusted decisions", value: "120+" },
  { label: "Active buyers", value: "40+" }
];

const features = [
  {
    title: "Side-by-side comparison",
    description:
      "Compare specs, fuel efficiency, safety, and pricing across top vehicle models in one place."
  },
  {
    title: "Smart recommendation",
    description:
      "Get data-backed guidance for the best car based on your budget, usage, and lifestyle."
  },
  {
    title: "Save your favorites",
    description:
      "Bookmark models, compare your top picks, and revisit them whenever you are ready to decide."
  }
];

const steps = [
  {
    step: "01",
    title: "Explore the catalog",
    description: "Browse our curated car list built for city, family, and performance buyers."
  },
  {
    step: "02",
    title: "Compare details",
    description: "Review each vehicle’s strengths, engine specs, and cost-of-ownership data."
  },
  {
    step: "03",
    title: "Choose confidently",
    description: "Make the right decision with clear data and practical buyer insights."
  }
];

export const UserHome = () => {
  return (
    <div className="space-y-12">
      <section className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-[radial-gradient(circle_at_top_left,_rgba(6,182,212,0.18),_transparent_35%),radial-gradient(circle_at_bottom_right,_rgba(59,130,246,0.16),_transparent_35%)] p-8 shadow-2xl">
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(15,23,42,0.95),rgba(15,23,42,0.55))]" />
        <div className="relative mx-auto grid gap-10 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
          <div className="space-y-6 text-white">
            <span className="inline-flex rounded-full border border-cyan-400/20 bg-cyan-400/10 px-4 py-2 text-sm uppercase tracking-[0.35em] text-cyan-300">
              VehicleVault
            </span>
            <h1 className="text-4xl font-bold leading-tight text-white sm:text-5xl">
              Drive smarter with the ultimate car comparison platform.
            </h1>
            <p className="max-w-3xl text-white/70 text-lg leading-8">
              VehicleVault helps you compare cars clearly, choose with confidence, and unlock the best model for your budget, style, and needs.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                to="/cars"
                className="rounded-full bg-cyan-500 px-7 py-3 text-sm font-semibold text-slate-950 transition hover:bg-cyan-400"
              >
                Explore cars
              </Link>
              <Link
                to="/signup"
                className="rounded-full border border-white/15 bg-white/5 px-7 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
              >
                Create account
              </Link>
            </div>
          </div>

          <div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-slate-950/90 p-5 shadow-2xl">
            <img
              src="/car-hero.svg"
              alt="VehicleVault car comparison illustration"
              className="h-full w-full rounded-[1.75rem] object-cover"
            />
          </div>
        </div>
      </section>

      <section className="grid gap-6 lg:grid-cols-3">
        {stats.map((item) => (
          <article
            key={item.label}
            className="rounded-[2rem] border border-white/10 bg-slate-950/80 p-8 shadow-2xl backdrop-blur"
          >
            <p className="text-sm uppercase tracking-[0.32em] text-cyan-300">{item.label}</p>
            <p className="mt-6 text-4xl font-bold text-white">{item.value}</p>
          </article>
        ))}
      </section>

      <section className="rounded-[2rem] border border-white/10 bg-white/5 p-8 shadow-2xl backdrop-blur">
        <div className="space-y-6">
          <div>
            <p className="text-sm uppercase tracking-[0.32em] text-cyan-300">Why VehicleVault</p>
            <h2 className="mt-3 text-3xl font-bold text-white">Compare faster. Decide better.</h2>
            <p className="max-w-3xl text-white/70">
              Use VehicleVault to instantly evaluate car performance, safety, pricing, and more — all on a single dashboard.
            </p>
          </div>
          <div className="grid gap-5 md:grid-cols-3">
            {features.map((item) => (
              <article key={item.title} className="rounded-[1.75rem] border border-white/10 bg-slate-950/90 p-6">
                <h3 className="text-xl font-semibold text-white">{item.title}</h3>
                <p className="mt-3 text-white/70">{item.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="rounded-[2rem] border border-white/10 bg-slate-950/90 p-8 shadow-2xl backdrop-blur">
        <div className="grid gap-8 lg:grid-cols-3">
          {steps.map((item) => (
            <div key={item.step} className="rounded-[2rem] border border-white/10 bg-slate-950/80 p-6">
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-cyan-500 text-lg font-bold text-slate-950">
                {item.step}
              </div>
              <h3 className="mt-5 text-2xl font-semibold text-white">{item.title}</h3>
              <p className="mt-3 text-white/70">{item.description}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="rounded-[2rem] border border-white/10 bg-white/5 p-10 shadow-2xl backdrop-blur">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.32em] text-cyan-300">Get started</p>
            <h2 className="mt-3 text-3xl font-bold text-white">Your next car decision begins here.</h2>
            <p className="mt-4 max-w-2xl text-white/70">
              Join VehicleVault and compare the best car models side-by-side with trusted detail and speed.
            </p>
          </div>
          <div className="flex flex-wrap gap-4">
            <Link
              to="/signup"
              className="inline-flex rounded-full bg-cyan-500 px-7 py-3 text-sm font-semibold text-slate-950 transition hover:bg-cyan-400"
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
*/
