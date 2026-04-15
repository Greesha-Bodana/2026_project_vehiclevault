import React from "react";

const users = [
  { id: "U001", name: "Aarav Sharma", email: "aarav@gmail.com", role: "User" },
  { id: "U002", name: "Riya Patel", email: "riya@gmail.com", role: "User" },
  {
    id: "U003",
    name: "Admin One",
    email: "admin@vehiclevault.com",
    role: "Admin"
  }
];

export const AdminUsers = () => {
  return (
    <div className="space-y-6">
      <div>
        <p className="text-sm uppercase tracking-[0.3em] text-cyan-300">
          Admin
        </p>
        <h1 className="mt-2 text-4xl font-bold">All Users</h1>
      </div>

      <div className="overflow-hidden rounded-[2rem] border border-white/10 bg-white/6 shadow-2xl backdrop-blur">
        <table className="w-full text-left">
          <thead className="border-b border-white/10 text-sm text-white/60">
            <tr>
              <th className="px-6 py-4">ID</th>
              <th className="px-6 py-4">Name</th>
              <th className="px-6 py-4">Email</th>
              <th className="px-6 py-4">Role</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id} className="border-b border-white/5 text-white/80">
                <td className="px-6 py-4">{user.id}</td>
                <td className="px-6 py-4">{user.name}</td>
                <td className="px-6 py-4">{user.email}</td>
                <td className="px-6 py-4">{user.role}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
