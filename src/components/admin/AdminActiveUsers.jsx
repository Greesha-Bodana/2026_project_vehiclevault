import React, { useEffect, useMemo, useState } from "react";
import API from "../../services/api";
import { toast } from "react-toastify";

const getUserList = (payload) =>
  Array.isArray(payload) ? payload : payload?.data || payload?.users || [];

const getActiveUserIds = (payload) => {
  const possibleLists = [
    payload?.users,
    payload?.data?.users,
    payload?.data,
    payload?.activeUsers,
    payload?.activeUserIds
  ];

  const list = possibleLists.find((item) => Array.isArray(item));
  if (!list) return new Set();

  return new Set(
    list
      .map((item) => {
        if (typeof item === "string") return item;
        return item?._id || item?.id || item?.userId || null;
      })
      .filter(Boolean)
  );
};

export const AdminActiveUsers = () => {
  const [users, setUsers] = useState([]);
  const [activeUserCount, setActiveUserCount] = useState(0);
  const [activeUserIds, setActiveUserIds] = useState(new Set());
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState("");

  const fetchActivity = async () => {
    try {
      setLoading(true);
      const [usersRes, activeUsersRes] = await Promise.all([
        API.get("/user"),
        API.get("/user/active")
      ]);

      const userList = getUserList(usersRes.data);
      setUsers(userList);
      setActiveUserCount(activeUsersRes.data?.count || 0);
      setActiveUserIds(getActiveUserIds(activeUsersRes.data));
    } catch (err) {
      console.error(err);
      toast.error("Unable to load login activity.");
      setUsers([]);
      setActiveUserCount(0);
      setActiveUserIds(new Set());
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchActivity();
  }, []);

  const deleteUser = async (id) => {
    if (!id || deletingId) return;

    try {
      setDeletingId(id);
      await API.delete(`/user/${id}`);
      toast.success("User deleted.");
      setUsers((prev) => prev.filter((user) => user._id !== id));
      setActiveUserIds((prev) => {
        const next = new Set(prev);
        next.delete(id);
        return next;
      });
    } catch (err) {
      console.error(err);
      toast.error(err?.response?.data?.message || "Unable to delete user.");
    } finally {
      setDeletingId("");
    }
  };

  const tableRows = useMemo(
    () =>
      users.map((user, index) => {
        const id = user._id || user.id || `${index}`;
        const hasKnownStatus = activeUserIds.size > 0;
        const isLoggedIn = hasKnownStatus ? activeUserIds.has(id) : null;

        return {
          id,
          no: index + 1,
          name: user.name || "Unknown user",
          email: user.email || "No email",
          role: user.role || "USER",
          isLoggedIn
        };
      }),
    [users, activeUserIds]
  );

  return (
    <div className="space-y-8">
      <section className="rounded-[2.25rem] border border-white/10 bg-[linear-gradient(135deg,rgba(14,116,144,0.18),rgba(15,23,42,0.96)_40%,rgba(30,41,59,0.96))] p-8 shadow-[0_30px_120px_rgba(2,6,23,0.45)]">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.32em] text-cyan-300">Login Activity</p>
            <h1 className="mt-3 text-4xl font-black text-white sm:text-5xl">
              User login status overview
            </h1>
            <p className="mt-4 max-w-3xl text-white/70">
              Review users in a clean table with login status and quick actions.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <div className="rounded-full border border-cyan-400/20 bg-cyan-400/10 px-4 py-2 text-sm text-cyan-100">
              {loading ? "..." : activeUserCount} logged in
            </div>
            <div className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-white/75">
              {loading ? "..." : users.length} users
            </div>
          </div>
        </div>
      </section>

      <section className="overflow-hidden rounded-[2rem] border border-white/10 bg-white/6 shadow-2xl backdrop-blur">
        <div className="border-b border-white/10 px-6 py-5">
          <p className="text-sm uppercase tracking-[0.28em] text-cyan-300">Activity Table</p>
          <h2 className="mt-2 text-2xl font-bold text-white">Logged in users</h2>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[900px] text-left">
            <thead className="bg-white/[0.03] text-sm text-white/65">
              <tr>
                <th className="px-6 py-4">No.</th>
                <th className="px-6 py-4">Name</th>
                <th className="px-6 py-4">Email</th>
                <th className="px-6 py-4">Role</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4">Action</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan={6} className="px-6 py-10 text-center text-white/60">
                    Loading login activity...
                  </td>
                </tr>
              ) : tableRows.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-6 py-10 text-center text-white/70">
                    No users found.
                  </td>
                </tr>
              ) : (
                tableRows.map((user) => (
                  <tr
                    key={user.id}
                    className="border-t border-white/5 text-white/80 transition hover:bg-white/[0.03]"
                  >
                    <td className="px-6 py-4 text-white/60">{user.no}</td>
                    <td className="px-6 py-4 font-medium text-white">{user.name}</td>
                    <td className="px-6 py-4">{user.email}</td>
                    <td className="px-6 py-4">
                      <span className="rounded-full border border-cyan-400/20 bg-cyan-400/10 px-3 py-1 text-xs uppercase tracking-[0.24em] text-cyan-200">
                        {user.role}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      {user.isLoggedIn === true ? (
                        <span className="rounded-full border border-emerald-400/25 bg-emerald-400/10 px-3 py-1 text-xs font-medium text-emerald-200">
                          Logged In
                        </span>
                      ) : user.isLoggedIn === false ? (
                        <span className="rounded-full border border-rose-400/25 bg-rose-400/10 px-3 py-1 text-xs font-medium text-rose-200">
                          Not Logged In
                        </span>
                      ) : (
                        <span className="rounded-full border border-amber-400/25 bg-amber-400/10 px-3 py-1 text-xs font-medium text-amber-200">
                          Count Only
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      <button
                        type="button"
                        onClick={() => deleteUser(user.id)}
                        disabled={deletingId === user.id}
                        className={`rounded-full px-4 py-2 text-xs font-semibold transition ${
                          deletingId === user.id
                            ? "cursor-not-allowed bg-white/10 text-white/40"
                            : "bg-rose-500/15 text-rose-200 hover:bg-rose-500/25"
                        }`}
                      >
                        {deletingId === user.id ? "Deleting..." : "Delete"}
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        <div className="border-t border-white/10 px-6 py-4 text-sm text-white/55">
          Status note: exact row-wise login state depends on `/user/active` returning user IDs.
        </div>
      </section>
    </div>
  );
};
