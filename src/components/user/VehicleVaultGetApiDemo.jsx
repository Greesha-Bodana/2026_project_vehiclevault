import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import API from "../../services/api";

export const VehicleVaultGetApiDemo = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const getUsers = async () => {
    try {
      setLoading(true);
      setError("");
      const res = await API.get("/user");
      setUsers(res.data || []);
    } catch (requestError) {
      console.error(requestError);
      setError("Unable to load users right now.");
      toast.error("Unable to load users");
    } finally {
      setLoading(false);
    }
  };

  const deleteUser = async (id) => {
    try {
      const res = await API.delete(`/user/${id}`);
      if (res.status === 200 || res.status === 204) {
        toast.success("User removed successfully.");
        getUsers();
      }
    } catch (requestError) {
      console.error(requestError);
      toast.error("Delete failed");
    }
  };

  useEffect(() => {
    getUsers();
  }, []);

  return (
    <div className="space-y-8 pb-10">
      <section className="rounded-[2.25rem] border border-white/10 bg-[linear-gradient(135deg,rgba(14,116,144,0.18),rgba(15,23,42,0.96)_40%,rgba(30,41,59,0.95))] p-8 shadow-[0_30px_120px_rgba(2,6,23,0.45)]">
        <div className="grid gap-6 lg:grid-cols-[1.15fr_0.85fr] lg:items-end">
          <div>
            <p className="text-sm uppercase tracking-[0.32em] text-cyan-300">
              API Demo
            </p>
            <h1 className="mt-3 text-4xl font-black text-white sm:text-5xl">
              Fetch users with a cleaner VehicleVault demo screen.
            </h1>
            <p className="mt-4 max-w-3xl text-white/70">
              This page demonstrates a simple GET request workflow while keeping
              the UI aligned with the rest of the frontend.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <article className="rounded-[1.75rem] border border-white/10 bg-slate-950/60 p-5 backdrop-blur">
              <p className="text-sm uppercase tracking-[0.28em] text-cyan-300">
                Users loaded
              </p>
              <p className="mt-4 text-3xl font-black text-white">{users.length}</p>
            </article>
            <article className="rounded-[1.75rem] border border-white/10 bg-slate-950/60 p-5 backdrop-blur">
              <p className="text-sm uppercase tracking-[0.28em] text-cyan-300">
                Request type
              </p>
              <p className="mt-4 text-3xl font-black text-white">GET</p>
            </article>
          </div>
        </div>
      </section>

      <section className="overflow-hidden rounded-[2rem] border border-white/10 bg-white/6 shadow-2xl backdrop-blur">
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/10 px-6 py-5">
          <div>
            <p className="text-sm uppercase tracking-[0.28em] text-cyan-300">
              Demo result
            </p>
            <h2 className="text-lg font-semibold text-white">Registered Users</h2>
          </div>
          <div className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-white/70">
            Total: {users.length}
          </div>
        </div>

        {loading ? (
          <div className="p-10 text-center text-white/70">Loading users...</div>
        ) : error ? (
          <div className="p-10 text-center text-red-200">{error}</div>
        ) : users.length === 0 ? (
          <div className="p-10 text-center text-white/60">No users available.</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[720px] text-left">
              <thead className="border-b border-white/10 text-sm uppercase text-white/55">
                <tr>
                  <th className="px-6 py-4">User</th>
                  <th className="px-6 py-4">Email</th>
                  <th className="px-6 py-4">Id</th>
                  <th className="px-6 py-4 text-right">Action</th>
                </tr>
              </thead>

              <tbody>
                {users.map((user) => (
                  <tr
                    key={user._id}
                    className="border-b border-white/5 text-white/80 transition hover:bg-white/[0.03]"
                  >
                    <td className="px-6 py-5">
                      <div className="flex items-center gap-3">
                        <div className="flex h-11 w-11 items-center justify-center rounded-full bg-gradient-to-r from-cyan-400 to-blue-500 font-bold text-slate-950">
                          {user.name?.charAt(0).toUpperCase() || "U"}
                        </div>
                        <div>
                          <p className="font-semibold text-white">{user.name || "Unknown user"}</p>
                          <p className="text-sm text-white/45">{user.role || "user"}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-5 text-white/70">{user.email}</td>
                    <td className="px-6 py-5 text-white/50">
                      {user._id ? `${user._id.slice(0, 8)}...` : "N/A"}
                    </td>
                    <td className="px-6 py-5 text-right">
                      <button
                        onClick={() => deleteUser(user._id)}
                        className="rounded-full border border-red-400/25 bg-red-500/10 px-4 py-2 text-sm font-semibold text-red-200 transition hover:bg-red-500/20"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </div>
  );
};
