import React, { useEffect, useState } from "react";
import API from "../../services/api";
import { toast } from "react-toastify";

export const AdminCars = () => {
  const [cars, setCars] = useState([]);
  const [form, setForm] = useState({ name: "", brand: "", price: "", image: "" });
  const [editing, setEditing] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const fetchCars = async () => {
    try {
      setLoading(true);
      const res = await API.get("/car");
      const payload = res.data;
      const carList = Array.isArray(payload)
        ? payload
        : payload?.cars || payload?.data || [];
      setCars(carList);
    } catch (err) {IS
      console.error(err);
      toast.error("Unable to fetch cars.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCars();
  }, []);

  const resetForm = () => {
    setEditing(null);
    setForm({ name: "", brand: "", price: "", image: "" });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setSaving(true);

    try {
      const payload = {
        name: form.name,
        brand: form.brand,
        price: Number(form.price),
        image: form.image
      };

      if (editing) {
        await API.put(`/car/${editing._id}`, payload);
        toast.success("Car updated successfully.");
      } else {
        await API.post("/car", payload);
        toast.success("Car created successfully.");
      }

      resetForm();
      fetchCars();
    } catch (err) {
      console.error(err);
      toast.error(err?.response?.data?.message || "Unable to save car.");
    } finally {
      setSaving(false);
    }
  };

  const handleEdit = (car) => {
    setEditing(car);
    setForm({
      name: car.name || "",
      brand: car.brand || "",
      price: car.price?.toString() || "",
      image: car.image || ""
    });
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this car permanently?")) return;

    try {
      await API.delete(`/car/${id}`);
      toast.success("Car deleted.");
      fetchCars();
    } catch (err) {
      console.error(err);
      toast.error("Unable to delete car.");
    }
  };

  return (
    <div className="space-y-8">
      <div>
        <p className="text-sm uppercase tracking-[0.3em] text-cyan-300">Admin</p>
        <h1 className="mt-2 text-4xl font-bold">Manage Cars</h1>
        <p className="mt-3 max-w-2xl text-white/65">
          Create, update, and remove car listings for VehicleVault.
        </p>
      </div>

      <form
        onSubmit={handleSubmit}
        className="grid gap-4 rounded-[2rem] border border-white/10 bg-white/6 p-6 shadow-2xl backdrop-blur md:grid-cols-[1.2fr_0.8fr]"
      >
        <div className="space-y-4">
          <div>
            <label className="mb-2 block text-sm font-medium text-white/80">
              Name
            </label>
            <input
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="w-full rounded-2xl border border-white/10 bg-slate-950/80 px-4 py-3 text-white outline-none"
              placeholder="Car model name"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-white/80">
              Brand
            </label>
            <input
              value={form.brand}
              onChange={(e) => setForm({ ...form, brand: e.target.value })}
              className="w-full rounded-2xl border border-white/10 bg-slate-950/80 px-4 py-3 text-white outline-none"
              placeholder="Brand name"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-white/80">
              Price
            </label>
            <input
              type="number"
              value={form.price}
              onChange={(e) => setForm({ ...form, price: e.target.value })}
              className="w-full rounded-2xl border border-white/10 bg-slate-950/80 px-4 py-3 text-white outline-none"
              placeholder="Price"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-white/80">
              Image URL
            </label>
            <input
              value={form.image}
              onChange={(e) => setForm({ ...form, image: e.target.value })}
              className="w-full rounded-2xl border border-white/10 bg-slate-950/80 px-4 py-3 text-white outline-none"
              placeholder="https://..."
            />
          </div>
        </div>

        <div className="rounded-[2rem] border border-white/10 bg-slate-950/80 p-6">
          <p className="text-sm text-cyan-300">{editing ? "Edit car" : "Create car"}</p>
          <p className="mt-3 text-white/75">
            {editing
              ? "Update the existing car details and save changes."
              : "Add a new car listing to your inventory."}
          </p>
          <button
            type="submit"
            disabled={saving}
            className="mt-6 w-full rounded-full bg-cyan-500 px-5 py-3 font-semibold text-slate-950 transition hover:bg-cyan-400 disabled:opacity-50"
          >
            {editing ? "Update Car" : "Create Car"}
          </button>
          {editing && (
            <button
              type="button"
              onClick={resetForm}
              className="mt-3 w-full rounded-full border border-white/10 bg-white/5 px-5 py-3 text-white transition hover:bg-white/10"
            >
              Cancel edit
            </button>
          )}
        </div>
      </form>

      <div className="rounded-[2rem] border border-white/10 bg-white/6 p-6 shadow-2xl backdrop-blur">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <h2 className="text-2xl font-bold text-white">Car Listings</h2>
          <p className="text-sm text-white/70">{cars.length} cars</p>
        </div>

        {loading ? (
          <div className="mt-8 text-white/70">Loading cars...</div>
        ) : cars.length === 0 ? (
          <div className="mt-8 text-white/70">No cars found.</div>
        ) : (
          <div className="mt-8 space-y-4">
            {cars.map((car) => (
              <div
                key={car._id}
                className="flex flex-col gap-4 rounded-[1.75rem] border border-white/10 bg-slate-950/80 p-4 md:flex-row md:items-center md:justify-between"
              >
                <div className="space-y-2">
                  <p className="text-sm text-cyan-300">{car.brand || "Vehicle"}</p>
                  <h3 className="text-xl font-semibold text-white">{car.name}</h3>
                  <p className="text-sm text-white/70">Price: {car.price ? `₹${car.price}` : "N/A"}</p>
                </div>
                <div className="flex gap-3">
                  <button
                    type="button"
                    onClick={() => handleEdit(car)}
                    className="rounded-full border border-cyan-400/30 bg-cyan-500/10 px-4 py-2 text-sm text-cyan-300 transition hover:bg-cyan-500/20"
                  >
                    Edit
                  </button>
                  <button
                    type="button"
                    onClick={() => handleDelete(car._id)}
                    className="rounded-full border border-red-500/30 bg-red-500/10 px-4 py-2 text-sm text-red-300 transition hover:bg-red-500/20"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};