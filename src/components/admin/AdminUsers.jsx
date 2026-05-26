import React, { useEffect, useState } from "react";
import API from "../../services/api";
import { toast } from "react-toastify";

export const AdminUsers = () => {
  const [users, setUsers] = useState([]);
  const [activeUserCount, setActiveUserCount] = useState(0);
  const [loading, setLoading] = useState(true);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const [usersRes, activeUsersRes] = await Promise.all([
        API.get("/user"),
        API.get("/user/active")
      ]);

      const usersPayload = usersRes.data;
      const userList = Array.isArray(usersPayload)
        ? usersPayload
        : usersPayload?.data || usersPayload?.users || [];

      setUsers(userList);
      setActiveUserCount(activeUsersRes.data?.count || 0);
    } catch (err) {
      console.error(err);
      toast.error("Unable to load users.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div className="space-y-8">
      <section className="rounded-[2.25rem] border border-white/10 bg-[linear-gradient(135deg,rgba(14,116,144,0.18),rgba(15,23,42,0.96)_40%,rgba(30,41,59,0.96))] p-8 shadow-[0_30px_120px_rgba(2,6,23,0.45)]">
        <p className="text-sm uppercase tracking-[0.32em] text-cyan-300">User Management</p>
        <h1 className="mt-3 text-4xl font-black text-white sm:text-5xl">Review VehicleVault users clearly</h1>
        <p className="mt-4 max-w-3xl text-white/70">
          Monitor the registered audience, confirm roles, and keep the admin side aligned with the upgraded product design.
        </p>
      </section>

      <section className="overflow-hidden rounded-[2rem] border border-white/10 bg-white/6 shadow-2xl backdrop-blur">
        <div className="flex items-center justify-between gap-4 border-b border-white/10 px-6 py-5">
          <div>
            <p className="text-sm uppercase tracking-[0.28em] text-cyan-300">Directory</p>
            <h2 className="mt-2 text-2xl font-bold text-white">Registered users</h2>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <div className="rounded-full border border-cyan-400/20 bg-cyan-400/10 px-4 py-2 text-sm text-cyan-100">
              {activeUserCount} logged in
            </div>
            <div className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-white/75">
              {users.length} users
            </div>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[640px] text-left">
            <thead className="border-b border-white/10 text-sm text-white/60">
              <tr>
                <th className="px-6 py-4">Name</th>
                <th className="px-6 py-4">Email</th>
                <th className="px-6 py-4">Role</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan={3} className="px-6 py-10 text-center text-white/60">
                    Loading users...
                  </td>
                </tr>
              ) : users.length === 0 ? (
                <tr>
                  <td colSpan={3} className="px-6 py-10 text-center text-white/70">
                    No users found.
                  </td>
                </tr>
              ) : (
                users.map((user) => (
                  <tr
                    key={user._id}
                    className="border-b border-white/5 text-white/80 transition hover:bg-white/[0.03]"
                  >
                    <td className="px-6 py-4 font-medium text-white">{user.name}</td>
                    <td className="px-6 py-4">{user.email}</td>
                    <td className="px-6 py-4">
                      <span className="rounded-full border border-cyan-400/20 bg-cyan-400/10 px-3 py-1 text-xs uppercase tracking-[0.24em] text-cyan-200">
                        {user.role}
                      </span>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
};
