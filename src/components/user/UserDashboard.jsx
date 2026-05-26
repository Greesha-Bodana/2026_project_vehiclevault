import React, { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import API from "../../services/api";
import { resolveImageUrl } from "../../utils/resolveImageUrl";

export const UserDashboard = () => {
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const carsRes = await API.get("/car");

        const carsPayload = carsRes.data;

        setCars(
          Array.isArray(carsPayload)
            ? carsPayload
            : carsPayload?.data || carsPayload?.cars || []
        );
      } catch {
        setCars([]);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboard();
  }, []);

  const availableCars = useMemo(
    () => cars.filter((car) => car.isAvailable !== false),
    [cars]
  );

  const latestCars = useMemo(
    () =>
      [...availableCars]
        .sort(
          (a, b) =>
            new Date(b.createdAt || 0).getTime() - new Date(a.createdAt || 0).getTime()
        )
        .slice(0, 3),
    [availableCars]
  );
  const brandCount = useMemo(
    () => new Set(cars.map((car) => car.brand).filter(Boolean)).size,
    [cars]
  );
  const unavailableCars = cars.length - availableCars.length;

  const formatPrice = (price) => {
    if (price === undefined || price === null || price === "") return "Price on request";

    try {
      return new Intl.NumberFormat("en-IN", {
        style: "currency",
        currency: "INR",
        maximumFractionDigits: 0
      }).format(Number(price));
    } catch {
      return `Rs. ${price}`;
    }
  };

  const stats = [
    { label: "Total cars", value: cars.length.toString() },
    { label: "Available", value: availableCars.length.toString() },
    { label: "Brands", value: brandCount.toString() },
    { label: "Sold", value: unavailableCars.toString() }
  ];

  return (
    <div className="space-y-8">
      <section className="overflow-hidden rounded-[2rem] border border-white/10 bg-[radial-gradient(circle_at_top_left,rgba(6,182,212,0.22),transparent_38%),linear-gradient(135deg,rgba(2,6,23,0.98),rgba(15,23,42,0.96))] shadow-2xl">
        <div className="grid gap-8 p-8 lg:grid-cols-[1.15fr_0.85fr] lg:items-center lg:p-10">
          <div className="space-y-5">
            <p className="text-sm uppercase tracking-[0.35em] text-cyan-300">
              VehicleVault Dashboard
            </p>
            <h1 className="max-w-3xl text-4xl font-black leading-tight text-white sm:text-5xl">
              Find, compare, and track the cars that matter to you.
            </h1>
            <p className="max-w-2xl text-base leading-7 text-white/70">
              This dashboard keeps the VehicleVault experience focused on the core
              workflow: browse inventory, compare two cars, and open detailed
              listings without extra clutter.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link
                to="/user/cars"
                className="inline-flex items-center justify-center rounded-full bg-cyan-500 px-5 py-3 text-sm font-semibold text-slate-950 transition hover:bg-cyan-400"
              >
                Browse cars
              </Link>
              <Link
                to="/user/cars"
                className="inline-flex items-center justify-center rounded-full border border-white/15 bg-white/5 px-5 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
              >
                Choose cars to compare
              </Link>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {stats.map((item) => (
              <article
                key={item.label}
                className="rounded-[1.5rem] border border-white/10 bg-slate-950/75 p-6 shadow-xl shadow-cyan-500/5 backdrop-blur"
              >
                <p className="text-xs uppercase tracking-[0.28em] text-white/55">
                  {item.label}
                </p>
                <p className="mt-4 text-4xl font-black text-white">{item.value}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-3">
        <Link
          to="/user/cars"
          className="rounded-[1.75rem] border border-white/10 bg-slate-950/80 p-6 shadow-xl transition hover:-translate-y-1 hover:border-cyan-400/40 hover:bg-slate-950"
        >
          <p className="text-sm uppercase tracking-[0.28em] text-cyan-300">Catalog</p>
          <h2 className="mt-3 text-2xl font-semibold text-white">Explore all cars</h2>
          <p className="mt-3 text-sm leading-6 text-white/70">
            Search by brand, model, or keyword and open any listing for more details.
          </p>
        </Link>
        <Link
          to="/user/cars"
          className="rounded-[1.75rem] border border-white/10 bg-slate-950/80 p-6 shadow-xl transition hover:-translate-y-1 hover:border-cyan-400/40 hover:bg-slate-950"
        >
          <p className="text-sm uppercase tracking-[0.28em] text-cyan-300">Compare</p>
          <h2 className="mt-3 text-2xl font-semibold text-white">Two cars side by side</h2>
          <p className="mt-3 text-sm leading-6 text-white/70">
            Start from the catalog, select two cars, and then open the comparison view.
          </p>
        </Link>
        <Link
          to="/user/cars"
          className="rounded-[1.75rem] border border-white/10 bg-slate-950/80 p-6 shadow-xl transition hover:-translate-y-1 hover:border-cyan-400/40 hover:bg-slate-950"
        >
          <p className="text-sm uppercase tracking-[0.28em] text-cyan-300">Latest</p>
          <h2 className="mt-3 text-2xl font-semibold text-white">New inventory first</h2>
          <p className="mt-3 text-sm leading-6 text-white/70">
            See the newest available cars at the top of the dashboard.
          </p>
        </Link>
      </section>

      <section className="rounded-[2rem] border border-white/10 bg-slate-950/80 p-8 shadow-2xl">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.3em] text-cyan-300">
              Featured Cars
            </p>
            <h2 className="mt-2 text-3xl font-bold text-white">Latest available inventory</h2>
          </div>
          <Link
            to="/user/cars"
            className="text-sm font-medium text-cyan-300 transition hover:text-cyan-200"
          >
            View all
          </Link>
        </div>

        {loading ? (
          <p className="mt-6 text-white/70">Loading dashboard...</p>
        ) : latestCars.length === 0 ? (
          <div className="mt-6 rounded-[1.5rem] border border-white/10 bg-white/5 p-6 text-white/75">
            No available cars yet. Check back after an admin adds inventory.
          </div>
        ) : (
          <div className="mt-6 grid gap-5 md:grid-cols-3">
            {latestCars.map((car) => (
              <article
                key={car._id}
                className="overflow-hidden rounded-[1.5rem] border border-white/10 bg-white/5 shadow-lg transition hover:-translate-y-1 hover:border-cyan-400/40"
              >
                <div className="relative aspect-[16/10] bg-slate-950">
                  {car.image ? (
                    <img
                      src={resolveImageUrl(car.image)}
                      alt={car.name}
                      loading="lazy"
                      decoding="async"
                      className="h-full w-full object-cover object-center"
                    />
                  ) : (
                    <div className="flex h-full items-center justify-center text-white/50">
                      No image available
                    </div>
                  )}
                  <div className="absolute left-4 top-4 rounded-full border border-white/10 bg-slate-950/80 px-3 py-1 text-xs uppercase tracking-[0.24em] text-cyan-200">
                    {car.brand || "Vehicle"}
                  </div>
                </div>
                <div className="space-y-3 p-5">
                  <h3 className="text-xl font-semibold text-white">
                    {car.name || "Untitled model"}
                  </h3>
                  <p className="text-sm leading-6 text-white/65">
                    {car.description || "VehicleVault listing"}
                  </p>
                  <div className="flex items-center justify-between gap-3 text-sm text-white/75">
                    <span>{car.year || "Year N/A"}</span>
                    <span>{formatPrice(car.price)}</span>
                  </div>
                  <Link
                    to={`/user/cars/${car._id}`}
                    className="inline-flex rounded-full bg-cyan-500 px-4 py-2 text-sm font-semibold text-slate-950 transition hover:bg-cyan-400"
                  >
                    View details
                  </Link>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>

      <section className="rounded-[2rem] border border-white/10 bg-[linear-gradient(135deg,rgba(6,182,212,0.08),rgba(15,23,42,0.95))] p-8 shadow-2xl">
        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <Link
            to="/user/cars"
            className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-5 py-3 text-sm text-white transition hover:bg-white/10"
          >
            Open car catalog
          </Link>
          <p className="text-sm text-white/60">
            Keep the experience simple: browse, compare, and decide.
          </p>
        </div>
      </section>
    </div>
  );
};
