import React from "react";
import { Link, useParams } from "react-router-dom";

const carDetails = {
  "1": {
    name: "Hyundai Creta",
    type: "SUV",
    overview:
      "A balanced family SUV with strong comfort, features, and road presence.",
    strengths: ["Premium cabin", "Smooth city driving", "Strong feature list"],
    weaknesses: [
      "Rear seat under-thigh support could be better",
      "Top variants cost more"
    ]
  },
  "2": {
    name: "Honda City",
    type: "Sedan",
    overview:
      "A refined sedan known for comfort, reliability, and long-distance driving.",
    strengths: ["Spacious cabin", "Refined engine", "Great comfort"],
    weaknesses: ["Lower ground clearance", "Less SUV-like stance"]
  },
  "3": {
    name: "Tata Nexon",
    type: "Compact SUV",
    overview:
      "A safety-focused compact SUV with bold design and practical features.",
    strengths: ["Strong safety package", "Solid build quality", "Modern design"],
    weaknesses: ["Infotainment can feel busy", "Rear visibility is moderate"]
  }
};

export const CarDetailsPage = () => {
  const { id } = useParams();
  const car = carDetails[id];

  if (!car) {
    return (
      <div className="rounded-[2rem] border border-white/10 bg-white/6 p-8 text-white shadow-2xl backdrop-blur">
        <h1 className="text-3xl font-bold">Car not found</h1>
        <Link to="/cars" className="mt-4 inline-flex text-cyan-300">
          Back to cars
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="rounded-[2rem] border border-white/10 bg-white/6 p-8 shadow-2xl backdrop-blur">
        <p className="text-sm uppercase tracking-[0.3em] text-cyan-300">
          {car.type}
        </p>
        <h1 className="mt-3 text-4xl font-bold text-white">{car.name}</h1>
        <p className="mt-4 max-w-3xl text-white/70">{car.overview}</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <section className="rounded-[1.75rem] border border-emerald-400/20 bg-emerald-400/10 p-6">
          <h2 className="text-2xl font-semibold text-white">Benefits</h2>
          <div className="mt-4 space-y-3 text-white/75">
            {car.strengths.map((item) => (
              <p key={item}>{item}</p>
            ))}
          </div>
        </section>

        <section className="rounded-[1.75rem] border border-amber-400/20 bg-amber-400/10 p-6">
          <h2 className="text-2xl font-semibold text-white">Defects</h2>
          <div className="mt-4 space-y-3 text-white/75">
            {car.weaknesses.map((item) => (
              <p key={item}>{item}</p>
            ))}
          </div>
        </section>
      </div>

      <Link
        to="/cars"
        className="inline-flex rounded-full border border-white/15 px-5 py-2 text-white/80 transition hover:bg-white/10"
      >
        Back to car list
      </Link>
    </div>
  );
};
