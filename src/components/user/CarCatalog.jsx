import React from "react";
import { Link } from "react-router-dom";

const cars = [
  {
    id: "1",
    name: "Hyundai Creta",
    type: "SUV",
    engine: "1497 cc",
    mileage: "17.4 km/l",
    transmission: "Automatic"
  },
  {
    id: "2",
    name: "Honda City",
    type: "Sedan",
    engine: "1498 cc",
    mileage: "18.4 km/l",
    transmission: "Manual"
  },
  {
    id: "3",
    name: "Tata Nexon",
    type: "Compact SUV",
    engine: "1199 cc",
    mileage: "17.1 km/l",
    transmission: "Automatic"
  }
];

export const CarCatalog = () => {
  return (
    <div className="space-y-8">
      <div className="rounded-[2rem] border border-white/10 bg-white/6 p-8 shadow-2xl backdrop-blur">
        <p className="text-sm uppercase tracking-[0.3em] text-cyan-300">
          Car Library
        </p>
        <h1 className="mt-3 text-4xl font-bold">Browse and compare cars</h1>
        <p className="mt-3 max-w-2xl text-white/65">
          Explore available cars, review their features, and open each model
          for more detailed comparison-ready information.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {cars.map((car) => (
          <article
            key={car.id}
            className="rounded-[1.75rem] border border-white/10 bg-slate-900/80 p-6 shadow-xl"
          >
            <p className="text-xs uppercase tracking-[0.25em] text-cyan-300">
              {car.type}
            </p>
            <h2 className="mt-3 text-2xl font-semibold">{car.name}</h2>
            <div className="mt-5 space-y-2 text-sm text-white/70">
              <p>Engine: {car.engine}</p>
              <p>Mileage: {car.mileage}</p>
              <p>Transmission: {car.transmission}</p>
            </div>
            <Link
              to={`/cars/${car.id}`}
              className="mt-6 inline-flex rounded-full bg-cyan-500 px-4 py-2 text-sm font-semibold text-slate-950 transition hover:bg-cyan-400"
            >
              View details
            </Link>
          </article>
        ))}
      </div>
    </div>
  );
};
