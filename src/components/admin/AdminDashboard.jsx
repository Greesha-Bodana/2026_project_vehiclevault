import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import API from "../../services/api";

export const AdminDashboard = () => {
  const [userCount, setUserCount] = useState(0);
  const [activeUserCount, setActiveUserCount] = useState(0);
  const [carCount, setCarCount] = useState(0);
  const [notificationCount, setNotificationCount] = useState(0);
  const [recentCars, setRecentCars] = useState([]);
  const [recentUsers, setRecentUsers] = useState([]);

  useEffect(() => {
    const fetchSummary = async () => {
      try {
        const [usersRes, carsRes, activeUsersRes] = await Promise.all([
          API.get("/user"),
          API.get("/car"),
          API.get("/user/active")
        ]);
        const users = Array.isArray(usersRes.data) ? usersRes.data : usersRes.data?.data || [];
        const cars = Array.isArray(carsRes.data) ? carsRes.data : carsRes.data?.cars || carsRes.data?.data || [];
        const activeUsers = activeUsersRes.data?.count || 0;

        setUserCount(users.length);
        setActiveUserCount(activeUsers);
        setCarCount(cars.length);
        setRecentUsers(users.slice(0, 5));
        setRecentCars(cars.slice(0, 5));
      } catch (err) {
        console.error(err);
      }
    };

    const notifications = localStorage.getItem("vehiclevault_notifications");
    const parsed = notifications ? JSON.parse(notifications) : [];
    setNotificationCount(Array.isArray(parsed) ? parsed.length : 0);

    fetchSummary();
  }, []);

  return (
    <div className="space-y-10">
      <section className="rounded-[2rem] border border-white/10 bg-slate-950/90 p-8 shadow-2xl backdrop-blur-xl">
        <div className="grid gap-8 lg:grid-cols-[1.4fr_1fr] lg:items-center">
          <div className="space-y-5">
            <p className="text-sm uppercase tracking-[0.35em] text-cyan-300">Admin Console</p>
            <h1 className="text-5xl font-black text-white leading-tight">VehicleVault Admin Dashboard</h1>
            <p className="max-w-3xl text-white/70 text-base leading-7">
              Monitor your marketplace, manage users and car listings, and publish announcements from a single admin control center.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link
                to="/admin/cars"
                className="inline-flex items-center justify-center rounded-full bg-cyan-500 px-6 py-3 text-sm font-semibold text-slate-950 transition hover:bg-cyan-400"
              >
                Add new car
              </Link>
              <Link
                to="/admin/users"
                className="inline-flex items-center justify-center rounded-full border border-white/15 bg-white/5 px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
              >
                User management
              </Link>
              <Link
                to="/admin/notifications"
                className="inline-flex items-center justify-center rounded-full border border-white/15 bg-white/5 px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
              >
                Publish announcement
              </Link>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <article className="rounded-[1.75rem] border border-white/10 bg-white/5 p-6 shadow-lg shadow-cyan-500/10">
              <p className="text-sm uppercase tracking-[0.28em] text-white/60">Active users (24h)</p>
              <p className="mt-4 text-4xl font-bold text-white">{activeUserCount}</p>
              <p className="mt-2 text-sm text-white/60">Logged in recently • Total: {userCount}</p>
            </article>
            <article className="rounded-[1.75rem] border border-white/10 bg-white/5 p-6 shadow-lg shadow-cyan-500/10">
              <p className="text-sm uppercase tracking-[0.28em] text-white/60">Car listings</p>
              <p className="mt-4 text-4xl font-bold text-white">{carCount}</p>
              <p className="mt-2 text-sm text-white/60">Vehicle inventory live</p>
            </article>
            <article className="rounded-[1.75rem] border border-white/10 bg-white/5 p-6 shadow-lg shadow-cyan-500/10">
              <p className="text-sm uppercase tracking-[0.28em] text-white/60">Announcements</p>
              <p className="mt-4 text-4xl font-bold text-white">{notificationCount}</p>
              <p className="mt-2 text-sm text-white/60">Messages delivered</p>
            </article>
          </div>
        </div>
      </section>

      <section className="grid gap-6 xl:grid-cols-[1.45fr_0.95fr]">
        <div className="rounded-[2rem] border border-white/10 bg-slate-950/90 p-8 shadow-2xl backdrop-blur-xl">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-sm uppercase tracking-[0.28em] text-cyan-300">Admin actions</p>
              <h2 className="mt-2 text-3xl font-bold text-white">Control panel</h2>
            </div>
            <span className="rounded-full border border-cyan-400/20 bg-cyan-400/10 px-4 py-2 text-xs uppercase tracking-[0.3em] text-cyan-200">
              Instant updates
            </span>
          </div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-2">
            <Link
              to="/admin/users"
              className="rounded-[1.75rem] border border-white/10 bg-slate-950/80 p-6 text-left text-white transition hover:border-cyan-400/40 hover:bg-slate-950/95"
            >
              <p className="text-sm uppercase tracking-[0.28em] text-cyan-300">Users</p>
              <p className="mt-3 text-xl font-semibold">Review and manage buyers</p>
            </Link>
            <Link
              to="/admin/cars"
              className="rounded-[1.75rem] border border-white/10 bg-slate-950/80 p-6 text-left text-white transition hover:border-blue-400/40 hover:bg-slate-950/95"
            >
              <p className="text-sm uppercase tracking-[0.28em] text-blue-300">Cars</p>
              <p className="mt-3 text-xl font-semibold">Approve inventory changes</p>
            </Link>
            <Link
              to="/admin/notifications"
              className="rounded-[1.75rem] border border-white/10 bg-slate-950/80 p-6 text-left text-white transition hover:border-white/30 hover:bg-slate-950/95"
            >
              <p className="text-sm uppercase tracking-[0.28em] text-white/60">Notifications</p>
              <p className="mt-3 text-xl font-semibold">Send buyer alerts</p>
            </Link>
            <Link
              to="/admin/dashboard"
              className="rounded-[1.75rem] border border-white/10 bg-emerald-500/10 p-6 text-left text-white transition hover:bg-emerald-500/15"
            >
              <p className="text-sm uppercase tracking-[0.28em] text-emerald-200">Overview</p>
              <p className="mt-3 text-xl font-semibold">Return to dashboard summary</p>
            </Link>
          </div>
        </div>

        <div className="space-y-6 rounded-[2rem] border border-white/10 bg-slate-950/90 p-8 shadow-2xl backdrop-blur-xl">
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="text-sm uppercase tracking-[0.28em] text-cyan-300">Recent activity</p>
              <h2 className="mt-2 text-3xl font-bold text-white">Latest updates</h2>
            </div>
          </div>

          <div className="space-y-4">
            <div className="rounded-[1.75rem] border border-white/10 bg-white/5 p-5">
              <p className="text-sm text-white/60">New users</p>
              {recentUsers.length === 0 ? (
                <p className="mt-3 text-sm text-white/70">No new user activity yet.</p>
              ) : (
                <ul className="mt-3 space-y-3 text-white/80">
                  {recentUsers.map((user) => (
                    <li key={user._id} className="flex items-center justify-between rounded-2xl bg-slate-950/80 px-4 py-3">
                      <div>
                        <p className="font-semibold text-white">{user.name || user.email}</p>
                        <p className="text-xs text-white/50">{user.email}</p>
                      </div>
                      <span className="rounded-full bg-white/5 px-3 py-1 text-xs uppercase tracking-[0.25em] text-cyan-200">
                        {user.role || "USER"}
                      </span>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            <div className="rounded-[1.75rem] border border-white/10 bg-white/5 p-5">
              <p className="text-sm text-white/60">New car listings</p>
              {recentCars.length === 0 ? (
                <p className="mt-3 text-sm text-white/70">No recent car updates yet.</p>
              ) : (
                <ul className="mt-3 space-y-3 text-white/80">
                  {recentCars.map((car) => (
                    <li key={car._id} className="rounded-2xl bg-slate-950/80 px-4 py-3">
                      <p className="font-semibold text-white">{car.name || "Untitled"}</p>
                      <p className="text-sm text-white/60">{car.brand || "Brand"} • ₹{car.price || "N/A"}</p>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
