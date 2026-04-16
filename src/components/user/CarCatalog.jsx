import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import API from "../../services/api";

export const CarCatalog = () => {
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

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

  return (
    <div className="space-y-8">
      <div className="rounded-[2rem] border border-white/10 bg-white/6 p-8 shadow-2xl backdrop-blur">
        <p className="text-sm uppercase tracking-[0.3em] text-cyan-300">Car Library</p>
        <h1 className="mt-3 text-4xl font-bold">Browse and compare cars</h1>
        <p className="mt-3 max-w-2xl text-white/65">
          Explore available cars, review their features, and open each model for more detailed comparison-ready information.
        </p>
      </div>

      {loading ? (
        <div className="rounded-[2rem] border border-white/10 bg-slate-900/80 p-8 text-white shadow-2xl">
          Loading cars...
        </div>
      ) : error ? (
        <div className="rounded-[2rem] border border-red-500/20 bg-red-500/10 p-8 text-red-200 shadow-2xl">
          {error}
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {cars.map((car) => (
            <article
              key={car._id}
              className="rounded-[1.75rem] border border-white/10 bg-slate-900/80 p-6 shadow-xl"
            >
              <p className="text-xs uppercase tracking-[0.25em] text-cyan-300">
                {car.brand || "Vehicle"}
              </p>
              <h2 className="mt-3 text-2xl font-semibold">{car.name}</h2>
              <div className="mt-5 space-y-2 text-sm text-white/70">
                <p>Price: {car.price ? `₹${car.price}` : "N/A"}</p>
                {car.image && (
                  <img
                    src={car.image}
                    alt={car.name}
                    className="mt-3 h-40 w-full rounded-2xl object-cover"
                  />
                )}
              </div>
              <Link
                to={`/cars/${car._id}`}
                className="mt-6 inline-flex rounded-full bg-cyan-500 px-4 py-2 text-sm font-semibold text-slate-950 transition hover:bg-cyan-400"
              >
                View details
              </Link>
            </article>
          ))}
        </div>
      )}
    </div>
  );
};
