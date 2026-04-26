import React, { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import API from "../../services/api";

export const UserDashboard = () => {
  const [cars, setCars] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const [carsRes, notificationsRes] = await Promise.all([
          API.get("/car"),
          API.get("/notification")
        ]);

        const carsPayload = carsRes.data;
        const notificationsPayload = notificationsRes.data;

        setCars(
          Array.isArray(carsPayload)
            ? carsPayload
            : carsPayload?.data || carsPayload?.cars || []
        );
        setNotifications(
          Array.isArray(notificationsPayload)
            ? notificationsPayload
            : notificationsPayload?.data || []
        );
      } catch {
        setCars([]);
        setNotifications([]);
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

  const latestCars = cars.slice(0, 3);
  const latestNotifications = notifications.slice(0, 3);

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
    { label: "Cars available", value: cars.length.toString() },
    { label: "Ready to buy", value: availableCars.length.toString() },
    { label: "Announcements", value: notifications.length.toString() }
  ];

  return (
    <div className="space-y-8">
      <section className="rounded-[2rem] border border-white/10 bg-[linear-gradient(135deg,rgba(6,182,212,0.18),rgba(15,23,42,0.95))] p-8 shadow-2xl">
        <p className="text-sm uppercase tracking-[0.3em] text-cyan-300">
          Dashboard
        </p>
        <h1 className="mt-3 max-w-3xl text-4xl font-bold">
          Compare cars, review updates, and choose better.
        </h1>
        <p className="mt-4 max-w-2xl text-white/70">
          VehicleVault helps buyers review the latest cars, compare vehicles side by side, and keep up with admin announcements from one place.
        </p>
        <div className="mt-6 flex flex-wrap gap-3">
          <Link
            to="/user/cars"
            className="rounded-full bg-cyan-500 px-5 py-3 font-semibold text-slate-950 transition hover:bg-cyan-400"
          >
            Explore Cars
          </Link>
          <Link
            to="/user/compare"
            className="rounded-full border border-white/15 px-5 py-3 text-white/85 transition hover:bg-white/10"
          >
            Compare cars
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

      <section className="rounded-[2rem] border border-white/10 bg-slate-950/80 p-8 shadow-2xl">
        <div className="flex items-center justify-between gap-4">
          <div>
            <p className="text-sm uppercase tracking-[0.3em] text-cyan-300">
              Latest Cars
            </p>
            <h2 className="mt-2 text-3xl font-bold">Recent inventory</h2>
          </div>
          <Link to="/user/cars" className="text-sm text-cyan-300">
            View all
          </Link>
        </div>

        {loading ? (
          <p className="mt-6 text-white/70">Loading dashboard...</p>
        ) : latestCars.length === 0 ? (
          <div className="mt-6 rounded-[1.75rem] border border-white/10 bg-white/5 p-6 text-white/75">
            No cars are available yet. Check back after an admin adds new inventory.
          </div>
        ) : (
          <div className="mt-6 grid gap-5 md:grid-cols-3">
            {latestCars.map((car) => (
              <article
                key={car._id}
                className="overflow-hidden rounded-[1.5rem] border border-white/10 bg-white/5"
              >
                <div className="h-44 bg-slate-950">
                  {car.image ? (
                    <img
                      src={car.image}
                      alt={car.name}
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <div className="flex h-full items-center justify-center text-white/50">
                      No image available
                    </div>
                  )}
                </div>
                <div className="space-y-3 p-5">
                  <p className="text-xs uppercase tracking-[0.28em] text-cyan-300">
                    {car.brand || "Vehicle"}
                  </p>
                  <h3 className="text-xl font-semibold text-white">
                    {car.name || "Untitled model"}
                  </h3>
                  <p className="text-sm text-white/65">
                    {car.description || "A new car listing from the VehicleVault inventory."}
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

      <section className="rounded-[2rem] border border-white/10 bg-slate-950/80 p-8 shadow-2xl">
        <div className="flex items-center justify-between gap-4">
          <div>
            <p className="text-sm uppercase tracking-[0.3em] text-cyan-300">
              Announcements
            </p>
            <h2 className="mt-2 text-3xl font-bold">Latest updates</h2>
          </div>
        </div>

        {latestNotifications.length === 0 ? (
          <p className="mt-6 text-white/70">
            No notifications yet. Check back after the admin publishes announcements.
          </p>
        ) : (
          <div className="mt-6 space-y-4">
            {latestNotifications.map((note) => (
              <article
                key={note._id}
                className="rounded-[1.5rem] border border-white/10 bg-white/5 p-5"
              >
                <p className="text-sm text-white/60">
                  {new Date(note.createdAt).toLocaleDateString()}{" "}
                  {new Date(note.createdAt).toLocaleTimeString()}
                </p>
                <p className="mt-2 text-sm font-semibold text-white">{note.title}</p>
                <p className="mt-2 text-white/80">{note.message}</p>
              </article>
            ))}
          </div>
        )}
      </section>
    </div>
  );
};
