import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

const STORAGE_KEY = "vehiclevault_notifications";

const loadNotifications = () => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
};

const saveNotifications = (notifications) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(notifications));
};

export const AdminNotifications = () => {
  const [notifications, setNotifications] = useState([]);
  const [message, setMessage] = useState("");

  useEffect(() => {
    setNotifications(loadNotifications());
  }, []);

  const publishNotification = (event) => {
    event.preventDefault();
    if (!message.trim()) {
      toast.error("Enter a notification message.");
      return;
    }

    const next = [
      {
        id: Date.now().toString(),
        message: message.trim(),
        createdAt: new Date().toISOString()
      },
      ...notifications
    ];

    setNotifications(next);
    saveNotifications(next);
    setMessage("");
    toast.success("Notification posted.");
  };

  const deleteNotification = (id) => {
    const next = notifications.filter((note) => note.id !== id);
    setNotifications(next);
    saveNotifications(next);
    toast.success("Notification removed.");
  };

  return (
    <div className="space-y-8">
      <div>
        <p className="text-sm uppercase tracking-[0.3em] text-cyan-300">Notifications</p>
        <h1 className="mt-2 text-4xl font-bold">Admin Notifications</h1>
        <p className="mt-3 max-w-2xl text-white/65">
          Create announcements for users and manage the notification feed for VehicleVault.
        </p>
      </div>

      <form
        onSubmit={publishNotification}
        className="rounded-[2rem] border border-white/10 bg-white/6 p-6 shadow-2xl backdrop-blur"
      >
        <label className="mb-3 block text-sm font-medium text-white/80">
          Publish a notification
        </label>
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          rows={4}
          className="w-full rounded-3xl border border-white/10 bg-slate-950/80 px-4 py-4 text-white outline-none transition focus:border-cyan-400"
          placeholder="Enter the notification text for buyers..."
        />
        <div className="mt-4 flex flex-wrap gap-3">
          <button
            type="submit"
            className="rounded-full bg-cyan-500 px-6 py-3 text-sm font-semibold text-slate-950 transition hover:bg-cyan-400"
          >
            Publish
          </button>
          <button
            type="button"
            onClick={() => setMessage("")}
            className="rounded-full border border-white/15 bg-white/5 px-6 py-3 text-sm text-white transition hover:bg-white/10"
          >
            Clear
          </button>
        </div>
      </form>

      <div className="rounded-[2rem] border border-white/10 bg-slate-950/80 p-6 shadow-2xl">
        <div className="flex items-center justify-between gap-4">
          <h2 className="text-2xl font-semibold text-white">Published notifications</h2>
          <span className="rounded-full bg-white/5 px-3 py-1 text-sm text-white/70">
            {notifications.length}
          </span>
        </div>

        {notifications.length === 0 ? (
          <p className="mt-6 text-white/70">No notifications published yet.</p>
        ) : (
          <div className="mt-6 space-y-4">
            {notifications.map((note) => (
              <div
                key={note.id}
                className="rounded-[1.75rem] border border-white/10 bg-white/5 p-5"
              >
                <div className="flex items-center justify-between gap-4">
                  <p className="text-sm text-white/70">
                    {new Date(note.createdAt).toLocaleString()}
                  </p>
                  <button
                    type="button"
                    onClick={() => deleteNotification(note.id)}
                    className="rounded-full border border-red-500/30 bg-red-500/10 px-3 py-1 text-sm text-red-300 transition hover:bg-red-500/20"
                  >
                    Remove
                  </button>
                </div>
                <p className="mt-3 text-white/80">{note.message}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
