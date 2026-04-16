import React, { useEffect, useState } from "react";
import API from "../../services/api";
import { toast } from "react-toastify";

export const AdminUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const res = await API.get("/user");
      setUsers(res.data || []);
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
    <div className="space-y-6">
      <div>
        <p className="text-sm uppercase tracking-[0.3em] text-cyan-300">Admin</p>
        <h1 className="mt-2 text-4xl font-bold">All Users</h1>
      </div>

      <div className="overflow-hidden rounded-[2rem] border border-white/10 bg-white/6 shadow-2xl backdrop-blur">
        <table className="w-full text-left">
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
                <tr key={user._id} className="border-b border-white/5 text-white/80">
                  <td className="px-6 py-4">{user.name}</td>
                  <td className="px-6 py-4">{user.email}</td>
                  <td className="px-6 py-4">{user.role}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};
