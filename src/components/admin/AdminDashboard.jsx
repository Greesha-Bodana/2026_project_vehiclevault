import React from "react";

const cards = [
  { label: "Total users", value: "128" },
  { label: "Cars listed", value: "24" },
  { label: "Active notifications", value: "06" }
];

export const AdminDashboard = () => {
  return (
    <div className="space-y-8">
      <div>
        <p className="text-sm uppercase tracking-[0.3em] text-cyan-300">
          Admin Dashboard
        </p>
        <h1 className="mt-2 text-4xl font-bold">Manage VehicleVault</h1>
        <p className="mt-3 max-w-2xl text-white/65">
          Review the main platform metrics and manage user-facing content from
          one place.
        </p>
      </div>

      <div className="grid gap-5 md:grid-cols-3">
        {cards.map((card) => (
          <article
            key={card.label}
            className="rounded-[1.75rem] border border-white/10 bg-white/6 p-6 shadow-2xl backdrop-blur"
          >
            <p className="text-sm text-white/60">{card.label}</p>
            <p className="mt-3 text-4xl font-bold">{card.value}</p>
          </article>
        ))}
      </div>
    </div>
  );
};
