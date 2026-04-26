import React, { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import API from "../../services/api";

export const CompareCars = () => {
  const [searchParams] = useSearchParams();
  const firstId = searchParams.get("first");
  const secondId = searchParams.get("second");

  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!firstId || !secondId || firstId === secondId) {
      setError("Please select two different cars for comparison.");
      setLoading(false);
      return;
    }

    const fetchCars = async () => {
      try {
        const responses = await Promise.all([
          API.get(`/car/${firstId}`),
          API.get(`/car/${secondId}`)
        ]);

        setCars([
          responses[0].data?.data || responses[0].data,
          responses[1].data?.data || responses[1].data
        ]);
      } catch (err) {
        console.error(err);
        setError("Unable to load both cars for comparison. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchCars();
  }, [firstId, secondId]);

  if (loading) {
    return (
      <div className="rounded-[2rem] border border-white/10 bg-white/6 p-8 text-white shadow-2xl backdrop-blur">
        Loading comparison...
      </div>
    );
  }

  if (error) {
    return (
      <div className="space-y-6 rounded-[2rem] border border-white/10 bg-white/6 p-8 shadow-2xl backdrop-blur">
        <h1 className="text-3xl font-bold text-white">Comparison unavailable</h1>
        <p className="text-white/70">{error}</p>
        <Link
          to="/user/cars"
          className="inline-flex rounded-full border border-cyan-400/40 bg-cyan-500/10 px-5 py-3 text-sm text-cyan-200 transition hover:bg-cyan-500/20"
        >
          Back to catalog
        </Link>
      </div>
    );
  }

  const [carA, carB] = cars;
  const rows = [
    ["Brand", carA.brand || "N/A", carB.brand || "N/A"],
    ["Model", carA.model || "N/A", carB.model || "N/A"],
    ["Year", carA.year || "N/A", carB.year || "N/A"],
    ["Price", carA.price ? `Rs. ${carA.price}` : "N/A", carB.price ? `Rs. ${carB.price}` : "N/A"],
    ["Description", carA.description || "No description available.", carB.description || "No description available."]
  ];

  return (
    <div className="space-y-8">
      <div>
        <p className="text-sm uppercase tracking-[0.3em] text-cyan-300">Car Comparison</p>
        <h1 className="mt-3 text-4xl font-bold">Compare two cars side by side</h1>
        <p className="mt-3 max-w-3xl text-white/70">
          Review the core details of both vehicles to make a confident decision.
        </p>
      </div>

      <div className="grid gap-6 xl:grid-cols-2">
        {[carA, carB].map((car, index) => (
          <article
            key={car._id || index}
            className="overflow-hidden rounded-[1.75rem] border border-white/10 bg-slate-900/80 shadow-2xl"
          >
            <div className="relative h-72 overflow-hidden bg-slate-950">
              {car.image ? (
                <img
                  src={car.image}
                  alt={car.name}
                  className="h-full w-full object-cover"
                />
              ) : (
                <div className="flex h-full items-center justify-center bg-slate-800 text-white/60">
                  No image available
                </div>
              )}
            </div>
            <div className="space-y-4 p-6">
              <p className="text-sm uppercase tracking-[0.28em] text-cyan-300">
                {car.brand || "Vehicle"}
              </p>
              <h2 className="text-3xl font-semibold text-white">
                {car.name || car.model || "Untitled model"}
              </h2>
              <p className="text-white/70">
                {car.description || "Compare this car with the other selection."}
              </p>
              <div className="grid gap-2 text-sm text-white/70">
                <p>Price: {car.price ? `Rs. ${car.price}` : "N/A"}</p>
                <p>Year: {car.year || "N/A"}</p>
              </div>
            </div>
          </article>
        ))}
      </div>

      <div className="overflow-hidden rounded-[2rem] border border-white/10 bg-white/5 p-6 shadow-2xl">
        <h2 className="text-2xl font-semibold text-white">Comparison report</h2>
        <div className="mt-6 grid gap-4 text-sm text-white/80 sm:grid-cols-3">
          <div className="font-semibold">Feature</div>
          <div className="font-semibold">Car 1</div>
          <div className="font-semibold">Car 2</div>
        </div>
        <div className="mt-4 space-y-3">
          {rows.map(([label, valueA, valueB]) => (
            <div key={label} className="grid gap-4 text-sm sm:grid-cols-3 rounded-3xl bg-slate-950/70 p-4">
              <div className="font-semibold text-white">{label}</div>
              <div className="text-white/80">{valueA}</div>
              <div className="text-white/80">{valueB}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <Link
          to="/user/cars"
          className="inline-flex justify-center rounded-full border border-white/15 bg-cyan-500/10 px-5 py-3 text-sm text-cyan-200 transition hover:bg-cyan-500/20"
        >
          Compare other cars
        </Link>
        <Link
          to="/user"
          className="inline-flex justify-center rounded-full bg-cyan-500 px-6 py-3 text-sm font-semibold text-slate-950 transition hover:bg-cyan-400"
        >
          Back to home
        </Link>
      </div>
    </div>
  );
};
