import React from "react";
import { Link } from "react-router-dom";

const stats = [
  { label: "Cars available", value: "24+" },
  { label: "Comparison insights", value: "100+" },
  { label: "Accessory suggestions", value: "40+" }
];

const featuredCars = [
  {
    id: "1",
    name: "Hyundai Creta",
    summary: "Comfort-focused SUV with premium features."
  },
  {
    id: "2",
    name: "Honda City",
    summary: "Refined sedan with great comfort and reliability."
  },
  {
    id: "3",
    name: "Tata Nexon",
    summary: "Safety-first compact SUV for practical buyers."
  }
];

export const UserDashboard = () => {
  return (
    <div className="space-y-8">
      <section className="rounded-[2rem] border border-white/10 bg-[linear-gradient(135deg,rgba(6,182,212,0.18),rgba(15,23,42,0.95))] p-8 shadow-2xl">
        <p className="text-sm uppercase tracking-[0.3em] text-cyan-300">
          Dashboard
        </p>
        <h1 className="mt-3 max-w-3xl text-4xl font-bold">
          Compare cars, understand differences, and choose better.
        </h1>
        <p className="mt-4 max-w-2xl text-white/70">
          VehicleVault helps buyers evaluate cars by features, benefits,
          drawbacks, and suitable accessories before making a purchase.
        </p>
        <div className="mt-6 flex flex-wrap gap-3">
          <Link
            to="/cars"
            className="rounded-full bg-cyan-500 px-5 py-3 font-semibold text-slate-950 transition hover:bg-cyan-400"
          >
            Explore Cars
          </Link>
          <Link
            to="/signup"
            className="rounded-full border border-white/15 px-5 py-3 text-white/85 transition hover:bg-white/10"
          >
            Create Account
          </Link>
        </div>
      </section>

      <section className="grid gap-5 md:grid-cols-3">
        {stats.map((item) => (
          <article
            key={item.label}
            className="rounded-[1.75rem] border border-white/10 bg-white/6 p-6 shadow-xl backdrop-blur"
          >
            <p className="text-sm text-white/60">{item.label}</p>
            <p className="mt-3 text-4xl font-bold text-white">{item.value}</p>
          </article>
        ))}
      </section>

      <section className="rounded-[2rem] border border-white/10 bg-white/6 p-8 shadow-2xl backdrop-blur">
        <div className="flex items-center justify-between gap-4">
          <div>
            <p className="text-sm uppercase tracking-[0.3em] text-cyan-300">
              Featured Cars
            </p>
            <h2 className="mt-2 text-3xl font-bold">Start with these models</h2>
          </div>
          <Link to="/cars" className="text-sm text-cyan-300">
            View all
          </Link>
        </div>

        <div className="mt-6 grid gap-5 md:grid-cols-3">
          {featuredCars.map((car) => (
            <article
              key={car.id}
              className="rounded-[1.5rem] border border-white/10 bg-slate-900/80 p-5"
            >
              <h3 className="text-xl font-semibold">{car.name}</h3>
              <p className="mt-3 text-sm leading-6 text-white/65">
                {car.summary}
              </p>
              <Link
                to={`/cars/${car.id}`}
                className="mt-5 inline-flex rounded-full border border-cyan-400/25 px-4 py-2 text-sm text-cyan-300 transition hover:bg-cyan-400/10"
              >
                Open details
              </Link>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
};
