import React, { useEffect, useMemo, useState } from "react";
import API from "../../services/api";
import { toast } from "react-toastify";

const initialForm = {
  name: "",
  brand: "",
  price: "",
  image: ""
};

const formatPrice = (value) => {
  if (!value && value !== 0) return "N/A";
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0
  }).format(value);
};

export const VehicleVaultAdminCars = () => {
  const [cars, setCars] = useState([]);
  const [form, setForm] = useState(initialForm);
  const [editing, setEditing] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [query, setQuery] = useState("");

  const fetchCars = async () => {
    try {
      setLoading(true);
      const res = await API.get("/car");
      setCars(res.data || []);
    } catch (err) {
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
    setForm(initialForm);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setSaving(true);

    try {
      const payload = {
        name: form.name.trim(),
        brand: form.brand.trim(),
        price: Number(form.price),
        image: form.image.trim()
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

  const filteredCars = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();
    if (!normalizedQuery) return cars;

    return cars.filter((car) =>
      [car.name, car.brand].some((value) =>
        (value || "").toLowerCase().includes(normalizedQuery)
      )
    );
  }, [cars, query]);

  return (
    <div className="space-y-8">
      <section className="rounded-[2.25rem] border border-white/10 bg-[linear-gradient(135deg,rgba(14,116,144,0.2),rgba(15,23,42,0.96)_38%,rgba(30,41,59,0.96))] p-8 shadow-[0_30px_120px_rgba(2,6,23,0.45)]">
        <div className="grid gap-8 xl:grid-cols-[1.1fr_0.9fr] xl:items-end">
          <div>
            <p className="text-sm uppercase tracking-[0.32em] text-cyan-300">Inventory Control</p>
            <h1 className="mt-3 text-4xl font-black text-white sm:text-5xl">
              Manage VehicleVault car listings with a proper admin workflow.
            </h1>
            <p className="mt-4 max-w-3xl text-white/70">
              Create, edit, search, and clean up inventory from a panel that feels more like a real product dashboard.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-3">
            <article className="rounded-[1.7rem] border border-white/10 bg-slate-950/65 p-5">
              <p className="text-sm uppercase tracking-[0.28em] text-cyan-300">Total cars</p>
              <p className="mt-4 text-3xl font-black text-white">{cars.length}</p>
            </article>
            <article className="rounded-[1.7rem] border border-white/10 bg-slate-950/65 p-5">
              <p className="text-sm uppercase tracking-[0.28em] text-cyan-300">Visible now</p>
              <p className="mt-4 text-3xl font-black text-white">{filteredCars.length}</p>
            </article>
            <article className="rounded-[1.7rem] border border-white/10 bg-slate-950/65 p-5">
              <p className="text-sm uppercase tracking-[0.28em] text-cyan-300">Mode</p>
              <p className="mt-4 text-3xl font-black text-white">
                {editing ? "Edit" : "Create"}
              </p>
            </article>
          </div>
        </div>
      </section>

      <section className="grid gap-6 xl:grid-cols-[0.95fr_1.05fr]">
        <form
          onSubmit={handleSubmit}
          className="rounded-[2rem] border border-white/10 bg-white/6 p-6 shadow-2xl backdrop-blur"
        >
          <div className="mb-6">
            <p className="text-sm uppercase tracking-[0.28em] text-cyan-300">
              {editing ? "Edit listing" : "Create listing"}
            </p>
            <h2 className="mt-3 text-2xl font-bold text-white">
              {editing ? "Update the selected car" : "Add a new car to the catalog"}
            </h2>
          </div>

          <div className="grid gap-4">
            <div>
              <label className="mb-2 block text-sm font-medium text-white/80">Name</label>
              <input
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="w-full rounded-2xl border border-white/10 bg-slate-950/80 px-4 py-3 text-white outline-none placeholder:text-white/35"
                placeholder="Mercedes C-Class"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-white/80">Brand</label>
              <input
                value={form.brand}
                onChange={(e) => setForm({ ...form, brand: e.target.value })}
                className="w-full rounded-2xl border border-white/10 bg-slate-950/80 px-4 py-3 text-white outline-none placeholder:text-white/35"
                placeholder="Mercedes-Benz"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-white/80">Price</label>
              <input
                type="number"
                value={form.price}
                onChange={(e) => setForm({ ...form, price: e.target.value })}
                className="w-full rounded-2xl border border-white/10 bg-slate-950/80 px-4 py-3 text-white outline-none placeholder:text-white/35"
                placeholder="5800000"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-white/80">Image URL</label>
              <input
                value={form.image}
                onChange={(e) => setForm({ ...form, image: e.target.value })}
                className="w-full rounded-2xl border border-white/10 bg-slate-950/80 px-4 py-3 text-white outline-none placeholder:text-white/35"
                placeholder="https://example.com/car.jpg"
              />
            </div>
          </div>

          <div className="mt-6 flex flex-wrap gap-3">
            <button
              type="submit"
              disabled={saving}
              className="rounded-full bg-cyan-300 px-6 py-3 text-sm font-bold text-slate-950 transition hover:bg-cyan-200 disabled:opacity-50"
            >
              {saving ? "Saving..." : editing ? "Update car" : "Create car"}
            </button>
            {editing && (
              <button
                type="button"
                onClick={resetForm}
                className="rounded-full border border-white/10 bg-white/5 px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
              >
                Cancel edit
              </button>
            )}
          </div>
        </form>

        <section className="rounded-[2rem] border border-white/10 bg-slate-950/75 p-6 shadow-2xl">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-sm uppercase tracking-[0.28em] text-cyan-300">Inventory list</p>
              <h2 className="mt-3 text-2xl font-bold text-white">Current car collection</h2>
            </div>
            <div className="w-full max-w-sm">
              <label className="mb-2 block text-sm font-medium text-white/70">Search by name or brand</label>
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none placeholder:text-white/35"
                placeholder="Search inventory"
              />
            </div>
          </div>

          {loading ? (
            <div className="mt-8 rounded-[1.6rem] border border-white/10 bg-white/5 px-4 py-10 text-center text-white/70">
              Loading cars...
            </div>
          ) : filteredCars.length === 0 ? (
            <div className="mt-8 rounded-[1.6rem] border border-white/10 bg-white/5 px-4 py-10 text-center text-white/70">
              No cars found for this search.
            </div>
          ) : (
            <div className="mt-8 grid gap-4">
              {filteredCars.map((car) => (
                <article
                  key={car._id}
                  className="grid gap-4 rounded-[1.75rem] border border-white/10 bg-white/5 p-4 md:grid-cols-[120px_1fr_auto] md:items-center"
                >
                  <div className="h-24 overflow-hidden rounded-[1.3rem] border border-white/10 bg-slate-900">
                    {car.image ? (
                      <img
                        src={car.image}
                        alt={car.name}
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <div className="flex h-full items-center justify-center text-sm text-white/45">
                        No image
                      </div>
                    )}
                  </div>

                  <div>
                    <p className="text-sm uppercase tracking-[0.28em] text-cyan-300">
                      {car.brand || "Vehicle"}
                    </p>
                    <h3 className="mt-2 text-2xl font-bold text-white">{car.name}</h3>
                    <p className="mt-2 text-white/70">{formatPrice(car.price)}</p>
                  </div>

                  <div className="flex flex-wrap gap-3 md:justify-end">
                    <button
                      type="button"
                      onClick={() => handleEdit(car)}
                      className="rounded-full border border-cyan-400/25 bg-cyan-400/10 px-4 py-2 text-sm font-semibold text-cyan-200 transition hover:bg-cyan-400/20"
                    >
                      Edit
                    </button>
                    <button
                      type="button"
                      onClick={() => handleDelete(car._id)}
                      className="rounded-full border border-red-400/25 bg-red-500/10 px-4 py-2 text-sm font-semibold text-red-200 transition hover:bg-red-500/20"
                    >
                      Delete
                    </button>
                  </div>
                </article>
              ))}
            </div>
          )}
        </section>
      </section>
    </div>
  );
};
