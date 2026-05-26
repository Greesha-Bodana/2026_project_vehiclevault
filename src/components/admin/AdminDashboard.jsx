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
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSummary = async () => {
      try {
        const [usersRes, carsRes, activeUsersRes, notificationsRes] = await Promise.all([
          API.get("/user"),
          API.get("/car"),
          API.get("/user/active"),
          API.get("/notification")
        ]);

        const users = Array.isArray(usersRes.data) ? usersRes.data : usersRes.data?.data || [];
        const cars = Array.isArray(carsRes.data)
          ? carsRes.data
          : carsRes.data?.cars || carsRes.data?.data || [];
        const activeUsers = activeUsersRes.data?.count || 0;
        const notifications = Array.isArray(notificationsRes.data)
          ? notificationsRes.data
          : notificationsRes.data?.data || [];

        setUserCount(users.length);
        setActiveUserCount(activeUsers);
        setCarCount(cars.length);
        setNotificationCount(notifications.length);
        setRecentUsers(users.slice(0, 5));
        setRecentCars(cars.slice(0, 5));
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchSummary();
  }, []);

  return (
    <div className="space-y-10">
      <section className="overflow-hidden rounded-[2rem] border border-white/10 bg-[radial-gradient(circle_at_top_left,rgba(6,182,212,0.22),transparent_38%),linear-gradient(135deg,rgba(2,6,23,0.98),rgba(15,23,42,0.96))] shadow-2xl">
        <div className="grid gap-8 p-8 lg:grid-cols-[1.35fr_0.95fr] lg:items-center lg:p-10">
          <div className="space-y-5">
            <p className="text-sm uppercase tracking-[0.35em] text-cyan-300">Admin Console</p>
            <h1 className="max-w-3xl text-5xl font-black leading-tight text-white">
              VehicleVault control center.
            </h1>
            <p className="max-w-3xl text-base leading-7 text-white/70">
              Monitor marketplace activity, manage users and listings, and publish
              announcements from one clean admin workspace.
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

          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-2">
            <article className="rounded-[1.5rem] border border-white/10 bg-slate-950/75 p-6 shadow-lg shadow-cyan-500/5">
              <p className="text-xs uppercase tracking-[0.28em] text-white/55">Active users</p>
              <p className="mt-4 text-4xl font-black text-white">{activeUserCount}</p>
              <p className="mt-2 text-sm text-white/60">Logged in recently - Total: {userCount}</p>
              <Link
                to="/admin/active-users"
                className="mt-4 inline-flex text-sm font-medium text-cyan-300 transition hover:text-cyan-200"
              >
                View login activity
              </Link>
            </article>
            <article className="rounded-[1.5rem] border border-white/10 bg-slate-950/75 p-6 shadow-lg shadow-cyan-500/5">
              <p className="text-xs uppercase tracking-[0.28em] text-white/55">Car listings</p>
              <p className="mt-4 text-4xl font-black text-white">{carCount}</p>
              <p className="mt-2 text-sm text-white/60">Vehicle inventory live</p>
            </article>
            <article className="rounded-[1.5rem] border border-white/10 bg-slate-950/75 p-6 shadow-lg shadow-cyan-500/5">
              <p className="text-xs uppercase tracking-[0.28em] text-white/55">Announcements</p>
              <p className="mt-4 text-4xl font-black text-white">{notificationCount}</p>
              <p className="mt-2 text-sm text-white/60">Messages delivered</p>
            </article>
            <article className="rounded-[1.5rem] border border-cyan-400/15 bg-cyan-400/10 p-6 shadow-lg shadow-cyan-500/5">
              <p className="text-xs uppercase tracking-[0.28em] text-cyan-100">Workspace</p>
              <p className="mt-4 text-4xl font-black text-white">Live</p>
              <p className="mt-2 text-sm text-white/70">Everything is synced to the current admin session</p>
            </article>
          </div>
        </div>
      </section>

      <section className="grid gap-6 xl:grid-cols-[1.25fr_1fr]">
        <div className="rounded-[2rem] border border-white/10 bg-slate-950/90 p-8 shadow-2xl backdrop-blur-xl">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-sm uppercase tracking-[0.3em] text-cyan-300">Admin actions</p>
              <h2 className="mt-2 text-3xl font-bold text-white">Control panel</h2>
            </div>
            <span className="rounded-full border border-cyan-400/20 bg-cyan-400/10 px-4 py-2 text-xs uppercase tracking-[0.3em] text-cyan-200">
              Instant updates
            </span>
          </div>

          <div className="mt-6 grid gap-4 md:grid-cols-2">
            <Link
              to="/admin/users"
              className="rounded-[1.5rem] border border-white/10 bg-slate-950/80 p-6 text-left text-white transition hover:-translate-y-1 hover:border-cyan-400/40 hover:bg-slate-950"
            >
              <p className="text-sm uppercase tracking-[0.28em] text-cyan-300">Users</p>
              <p className="mt-3 text-xl font-semibold">Review and manage buyers</p>
            </Link>
            <Link
              to="/admin/active-users"
              className="rounded-[1.5rem] border border-white/10 bg-slate-950/80 p-6 text-left text-white transition hover:-translate-y-1 hover:border-cyan-400/40 hover:bg-slate-950"
            >
              <p className="text-sm uppercase tracking-[0.28em] text-cyan-300">Activity</p>
              <p className="mt-3 text-xl font-semibold">See logged-in users count</p>
            </Link>
            <Link
              to="/admin/cars"
              className="rounded-[1.5rem] border border-white/10 bg-slate-950/80 p-6 text-left text-white transition hover:-translate-y-1 hover:border-blue-400/40 hover:bg-slate-950"
            >
              <p className="text-sm uppercase tracking-[0.28em] text-blue-300">Cars</p>
              <p className="mt-3 text-xl font-semibold">Approve inventory changes</p>
            </Link>
            <Link
              to="/admin/notifications"
              className="rounded-[1.5rem] border border-white/10 bg-slate-950/80 p-6 text-left text-white transition hover:-translate-y-1 hover:border-white/30 hover:bg-slate-950"
            >
              <p className="text-sm uppercase tracking-[0.28em] text-white/60">Notifications</p>
              <p className="mt-3 text-xl font-semibold">Send buyer alerts</p>
            </Link>
          </div>
        </div>

        <div className="space-y-6 rounded-[2rem] border border-white/10 bg-slate-950/90 p-8 shadow-2xl backdrop-blur-xl">
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="text-sm uppercase tracking-[0.3em] text-cyan-300">Recent activity</p>
              <h2 className="mt-2 text-3xl font-bold text-white">Latest updates</h2>
            </div>
          </div>

          {loading ? (
            <div className="rounded-[1.5rem] border border-white/10 bg-white/5 p-5 text-white/70">
              Loading dashboard...
            </div>
          ) : (
            <div className="space-y-4">
              <div className="rounded-[1.5rem] border border-white/10 bg-white/5 p-5">
                <p className="text-sm uppercase tracking-[0.24em] text-white/60">New users</p>
                {recentUsers.length === 0 ? (
                  <p className="mt-3 text-sm text-white/70">No new user activity yet.</p>
                ) : (
                  <ul className="mt-3 space-y-3 text-white/80">
                    {recentUsers.map((user) => (
                      <li
                        key={user._id}
                        className="flex items-center justify-between rounded-2xl bg-slate-950/80 px-4 py-3"
                      >
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

              <div className="rounded-[1.5rem] border border-white/10 bg-white/5 p-5">
                <p className="text-sm uppercase tracking-[0.24em] text-white/60">New car listings</p>
                {recentCars.length === 0 ? (
                  <p className="mt-3 text-sm text-white/70">No recent car updates yet.</p>
                ) : (
                  <ul className="mt-3 space-y-3 text-white/80">
                    {recentCars.map((car) => (
                      <li key={car._id} className="rounded-2xl bg-slate-950/80 px-4 py-3">
                        <p className="font-semibold text-white">{car.name || "Untitled"}</p>
                        <p className="text-sm text-white/60">
                          {car.brand || "Brand"} - Rs. {car.price || "N/A"}
                        </p>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};
