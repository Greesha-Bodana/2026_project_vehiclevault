import React, { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import API from "../../services/api";

const formatPrice = (value) => {
  if (!value && value !== 0) return "Price on request";

  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0
  }).format(value);
};

export const VehicleVaultCarCatalog = () => {
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [query, setQuery] = useState("");

  useEffect(() => {
    const fetchCars = async () => {
      try {
        const response = await API.get("/car");
        setCars(response.data || []);
      } catch (err) {
        console.error(err);
        setError("Unable to load car catalog. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchCars();
  }, []);

  const filteredCars = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    if (!normalizedQuery) return cars;

    return cars.filter((car) =>
      [car.name, car.brand].some((value) =>
        (value || "").toLowerCase().includes(normalizedQuery)
      )
    );
  }, [cars, query]);

  return (
    <div className="space-y-8 pb-10">
      <section className="relative overflow-hidden rounded-[2.25rem] border border-white/10 bg-[linear-gradient(135deg,rgba(14,116,144,0.18),rgba(15,23,42,0.96)_40%,rgba(30,41,59,0.95))] p-8 shadow-[0_30px_120px_rgba(2,6,23,0.45)]">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(34,211,238,0.16),transparent_26%),radial-gradient(circle_at_bottom_left,rgba(59,130,246,0.18),transparent_30%)]" />
        <div className="relative grid gap-8 xl:grid-cols-[1.1fr_0.9fr] xl:items-end">
          <div>
            <p className="text-sm uppercase tracking-[0.32em] text-cyan-300">VehicleVault Inventory</p>
            <h1 className="mt-3 text-4xl font-black text-white sm:text-5xl">
              Browse a cleaner, premium catalog of cars.
            </h1>
            <p className="mt-4 max-w-3xl text-white/70">
              Explore standout models, search quickly by brand or name, and move into the details page with a better browsing experience.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-3">
            <article className="rounded-[1.75rem] border border-white/10 bg-slate-950/55 p-5 backdrop-blur">
              <p className="text-sm uppercase tracking-[0.28em] text-cyan-300">Cars listed</p>
              <p className="mt-4 text-3xl font-black text-white">{cars.length}</p>
            </article>
            <article className="rounded-[1.75rem] border border-white/10 bg-slate-950/55 p-5 backdrop-blur">
              <p className="text-sm uppercase tracking-[0.28em] text-cyan-300">Showing</p>
              <p className="mt-4 text-3xl font-black text-white">{filteredCars.length}</p>
            </article>
            <article className="rounded-[1.75rem] border border-white/10 bg-slate-950/55 p-5 backdrop-blur">
              <p className="text-sm uppercase tracking-[0.28em] text-cyan-300">Experience</p>
              <p className="mt-4 text-3xl font-black text-white">Pro</p>
            </article>
          </div>
        </div>
      </section>

      <section className="rounded-[2rem] border border-white/10 bg-white/6 p-6 shadow-2xl backdrop-blur">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.28em] text-cyan-300">Search inventory</p>
            <h2 className="mt-2 text-2xl font-bold text-white">Find the right model faster</h2>
          </div>

          <div className="w-full max-w-xl">
            <label className="mb-2 block text-sm font-medium text-white/70">Search by model or brand</label>
            <input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search BMW, Tata, SUV, sedan..."
              className="w-full rounded-2xl border border-white/10 bg-slate-950/80 px-4 py-3 text-white outline-none placeholder:text-white/35"
            />
          </div>
        </div>
      </section>

      {loading ? (
        <div className="rounded-[2rem] border border-white/10 bg-slate-900/80 p-8 text-white shadow-2xl">
          Loading cars...
        </div>
      ) : error ? (
        <div className="rounded-[2rem] border border-red-500/20 bg-red-500/10 p-8 text-red-200 shadow-2xl">
          {error}
        </div>
      ) : filteredCars.length === 0 ? (
        <div className="rounded-[2rem] border border-white/10 bg-white/6 p-10 text-center text-white shadow-2xl backdrop-blur">
          <h2 className="text-2xl font-bold">No matching cars found</h2>
          <p className="mt-3 text-white/70">
            Try a different brand or model name to explore the catalog.
          </p>
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {filteredCars.map((car) => (
            <article
              key={car._id}
              className="group overflow-hidden rounded-[1.9rem] border border-white/10 bg-[linear-gradient(180deg,rgba(15,23,42,0.96),rgba(2,6,23,0.96))] shadow-xl transition hover:-translate-y-1 hover:border-cyan-300/20"
            >
              <div className="p-5">
                <div className="overflow-hidden rounded-[1.5rem] border border-white/10 bg-slate-950/80">
                  {car.image ? (
                    <img
                      src={car.image}
                      alt={car.name}
                      className="h-52 w-full object-cover transition duration-500 group-hover:scale-105"
                    />
                  ) : (
                    <div className="flex h-52 items-center justify-center text-sm text-white/40">
                      No preview image
                    </div>
                  )}
                </div>

                <div className="mt-5">
                  <p className="text-xs uppercase tracking-[0.28em] text-cyan-300">
                    {car.brand || "Vehicle"}
                  </p>
                  <h2 className="mt-3 text-2xl font-bold text-white">{car.name}</h2>
                  <p className="mt-3 text-lg font-semibold text-white/85">
                    {formatPrice(car.price)}
                  </p>
                  <p className="mt-3 text-sm leading-6 text-white/60">
                    Explore this model in more detail, compare it with your shortlist, and review the listing in the VehicleVault experience.
                  </p>
                </div>

                <div className="mt-6 flex items-center justify-between gap-4">
                  <span className="rounded-full border border-white/10 bg-white/5 px-3 py-2 text-xs uppercase tracking-[0.24em] text-white/65">
                    Premium listing
                  </span>
                  <Link
                    to={`/cars/${car._id}`}
                    className="inline-flex rounded-full bg-cyan-300 px-5 py-2.5 text-sm font-bold text-slate-950 transition hover:bg-cyan-200"
                  >
                    View details
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      )}
    </div>
  );
};
