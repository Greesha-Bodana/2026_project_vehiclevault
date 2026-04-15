import axios from "axios";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

export const GetApiDemo = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  

  const getUsers = async () => {
    try {
      const res = await axios.get("https://node5.onrender.com/user/user/");
      setUsers(res.data.data || []);
    } catch (error) {
      toast.error("Unable to load users");
    } finally {
      setLoading(false);
    }
  };

  const deleteUser = async (id) => {
    try {
      const res = await axios.delete(
        `https://node5.onrender.com/user/user/${id}`
      );
      if (res.status === 204) {
        toast.success("User removed successfully 🚀");
        getUsers();
      }
    } catch (error) {
      toast.error("Delete failed");
    }
  };

  useEffect(() => {
    getUsers();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-black p-8">
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-white tracking-wide">
            🚗 Vehicle Vault
          </h1>
          <p className="text-gray-400 mt-1">
            User Management Dashboard
          </p>
        </div>

        {/* Glass Card */}
        <div className="backdrop-blur-xl bg-white/10 border border-white/20 rounded-3xl shadow-2xl overflow-hidden">

          {/* Table Header */}
          <div className="px-6 py-4 border-b border-white/10 flex justify-between items-center">
            <h2 className="text-lg font-semibold text-white">
              Registered Users
            </h2>
            <span className="text-sm text-gray-300">
              Total: {users.length}
            </span>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            {loading ? (
              <div className="p-10 text-center text-gray-300 animate-pulse">
                Loading users...
              </div>
            ) : users.length === 0 ? (
              <div className="p-10 text-center text-gray-400">
                No users available
              </div>
            ) : (
              <table className="w-full border-separate border-spacing-y-3 px-4">
                <thead>
                  <tr className="text-gray-300 text-sm uppercase">
                    <th className="text-left px-4">User</th>
                    <th className="text-left px-4">Email</th>
                    <th className="text-center px-4">Action</th>
                  </tr>
                </thead>

                <tbody>
                  {users.map((user) => (
                    <tr
                      key={user._id}
                      className="bg-white/5 hover:bg-white/10 transition rounded-xl"
                    >
                      {/* User */}
                      <td className="px-4 py-4 flex items-center gap-3 rounded-l-xl">
                        <div className="h-10 w-10 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold">
                          {user.name?.charAt(0).toUpperCase()}
                        </div>
                        <div>
                          <p className="text-white font-medium">
                            {user.name}
                          </p>
                          <p className="text-xs text-gray-400">
                            ID: {user._id.slice(0, 8)}...
                          </p>
                        </div>
                      </td>

                      {/* Email */}
                      <td className="px-4 py-4 text-gray-300">
                        {user.email}
                      </td>

                      {/* Action */}
                      <td className="px-4 py-4 text-center rounded-r-xl">
                        <button
                          onClick={() => deleteUser(user._id)}
                          className="px-4 py-2 rounded-full bg-red-500/80 hover:bg-red-600 text-white text-sm font-semibold shadow-lg hover:shadow-red-500/40 transition"
                        >
                          🗑 Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};