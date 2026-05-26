import React, { useEffect, useState } from "react";
import API from "../../services/api";
import { toast } from "react-toastify";
import { resolveImageUrl } from "../../utils/resolveImageUrl";

const emptyForm = {
  name: "",
  brand: "",
  model: "",
  year: "",
  price: "",
  image: "",
  description: "",
  isAvailable: true
};

export const AdminCars = () => {
  const [cars, setCars] = useState([]);
  const [form, setForm] = useState(emptyForm);
  const [editing, setEditing] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [selectedImageFile, setSelectedImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState("");

  const fetchCars = async () => {
    try {
      setLoading(true);
      const res = await API.get("/car");
      const payload = res.data;
      const carList = Array.isArray(payload)
        ? payload
        : payload?.cars || payload?.data || [];
      setCars(carList);
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

  useEffect(() => {
    return () => {
      if (imagePreview && imagePreview.startsWith("blob:")) {
        URL.revokeObjectURL(imagePreview);
      }
    };
  }, [imagePreview]);

  const resetForm = () => {
    setEditing(null);
    setForm(emptyForm);
    setSelectedImageFile(null);
    setImagePreview("");
  };

  const handleImageChange = (event) => {
    const file = event.target.files?.[0] || null;
    setSelectedImageFile(file);

    if (imagePreview && imagePreview.startsWith("blob:")) {
      URL.revokeObjectURL(imagePreview);
    }

    setImagePreview(file ? URL.createObjectURL(file) : editing?.image || "");
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setSaving(true);

    try {
      if (!editing && !selectedImageFile) {
        toast.error("Car image is required.");
        setSaving(false);
        return;
      }

      const payload = new FormData();
      payload.append("name", form.name.trim());
      payload.append("brand", form.brand.trim());
      payload.append("model", form.model.trim());
      payload.append("year", String(form.year));
      payload.append("price", String(form.price));
      payload.append("description", form.description.trim());
      payload.append("isAvailable", String(form.isAvailable));

      if (selectedImageFile) {
        payload.append("image", selectedImageFile);
      }

      if (editing) {
        await API.put(`/car/${editing._id}`, payload, {
          headers: {
            "Content-Type": "multipart/form-data"
          }
        });
        toast.success("Car updated successfully.");
      } else {
        await API.post("/car", payload, {
          headers: {
            "Content-Type": "multipart/form-data"
          }
        });
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
      model: car.model || "",
      year: car.year?.toString() || "",
      price: car.price?.toString() || "",
      image: car.image || "",
      description: car.description || "",
      isAvailable: car.isAvailable !== false
    });
    setSelectedImageFile(null);
    setImagePreview(resolveImageUrl(car.image) || "");
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this car permanently?")) return;

    try {
      await API.delete(`/car/${id}`);
      toast.success("Car deleted.");
      fetchCars();
    } catch (err) {
      console.error(err);
      toast.error(err?.response?.data?.message || "Unable to delete car.");
    }
  };

  const inputClass =
    "w-full rounded-2xl border border-white/10 bg-slate-950/80 px-4 py-3 text-white outline-none transition focus:border-cyan-400";

  const formatPrice = (price) => {
    if (price === undefined || price === null || price === "") return "Price on request";
    return `Rs. ${price}`;
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
        className="grid gap-6 rounded-[2rem] border border-white/10 bg-white/6 p-6 shadow-2xl backdrop-blur"
      >
        <div className="grid gap-4 md:grid-cols-2">
          <div>
            <label className="mb-2 block text-sm font-medium text-white/80">Name</label>
            <input
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className={inputClass}
              placeholder="Car model name"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-white/80">Brand</label>
            <input
              value={form.brand}
              onChange={(e) => setForm({ ...form, brand: e.target.value })}
              className={inputClass}
              placeholder="Brand name"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-white/80">Model</label>
            <input
              value={form.model}
              onChange={(e) => setForm({ ...form, model: e.target.value })}
              className={inputClass}
              placeholder="Model name"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-white/80">Year</label>
            <input
              type="number"
              value={form.year}
              onChange={(e) => setForm({ ...form, year: e.target.value })}
              className={inputClass}
              placeholder="2024"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-white/80">Price</label>
            <input
              type="number"
              value={form.price}
              onChange={(e) => setForm({ ...form, price: e.target.value })}
              className={inputClass}
              placeholder="Price"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-white/80">Car Image</label>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className={inputClass}
            />
            <p className="mt-2 text-xs text-white/50">
              Upload a car image. The file will go to Cloudinary and the URL will be saved.
            </p>
          </div>
        </div>

        {imagePreview && (
          <div className="grid gap-3 md:max-w-md">
            <p className="text-sm font-medium text-white/80">Image Preview</p>
            <div className="overflow-hidden rounded-[1.25rem] border border-white/10 bg-slate-950/80">
              <img
                src={imagePreview}
                alt="Selected car"
                className="h-56 w-full object-cover"
              />
            </div>
          </div>
        )}

        <div>
          <label className="mb-2 block text-sm font-medium text-white/80">Description</label>
          <textarea
            rows={4}
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
            className={inputClass}
            placeholder="Short vehicle description"
          />
        </div>

        <label className="flex items-center gap-3 rounded-2xl border border-white/10 bg-slate-950/80 px-4 py-3 text-sm text-white/80">
          <input
            type="checkbox"
            checked={form.isAvailable}
            onChange={(e) => setForm({ ...form, isAvailable: e.target.checked })}
            className="h-4 w-4 accent-cyan-400"
          />
          Available for listing
        </label>

        <div className="flex flex-wrap gap-3">
          <button
            type="submit"
            disabled={saving}
            className="rounded-full bg-cyan-500 px-6 py-3 font-semibold text-slate-950 transition hover:bg-cyan-400 disabled:opacity-50"
          >
            {editing ? "Update Car" : "Create Car"}
          </button>
          {editing && (
            <button
              type="button"
              onClick={resetForm}
              className="rounded-full border border-white/10 bg-white/5 px-6 py-3 text-white transition hover:bg-white/10"
            >
              Cancel edit
            </button>
          )}
        </div>
      </form>

      <div className="rounded-[2rem] border border-white/10 bg-white/6 p-6 shadow-2xl backdrop-blur">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold text-white">Car Listings</h2>
            <p className="mt-2 text-sm text-white/70">{cars.length} cars</p>
          </div>
        </div>

        {loading ? (
          <div className="mt-8 text-white/70">Loading cars...</div>
        ) : cars.length === 0 ? (
          <div className="mt-8 rounded-[1.5rem] border border-white/10 bg-slate-950/80 p-6 text-white/70">
            No cars found. Create the first listing above.
          </div>
        ) : (
          <div className="mt-8 grid gap-4">
            {cars.map((car) => (
              <div
                key={car._id}
                className="grid gap-4 rounded-[1.75rem] border border-white/10 bg-slate-950/80 p-4 md:grid-cols-[220px_1fr_auto]"
              >
                <div className="h-44 overflow-hidden rounded-[1.25rem] bg-slate-900">
                  {car.image ? (
                    <img
                      src={resolveImageUrl(car.image)}
                      alt={car.name}
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <div className="flex h-full items-center justify-center text-white/50">
                      No image
                    </div>
                  )}
                </div>

                <div className="space-y-3">
                  <div className="flex flex-wrap items-center gap-2">
                    <p className="text-sm text-cyan-300">{car.brand || "Vehicle"}</p>
                    <span className="rounded-full bg-white/5 px-3 py-1 text-xs text-white/70">
                      {car.isAvailable === false ? "Sold" : "Available"}
                    </span>
                  </div>
                  <h3 className="text-2xl font-semibold text-white">{car.name}</h3>
                  <p className="text-sm text-white/70">{car.description || "No description available."}</p>
                  <div className="grid gap-2 text-sm text-white/70 sm:grid-cols-2">
                    <span>Model: {car.model || "N/A"}</span>
                    <span>Year: {car.year || "N/A"}</span>
                    <span>Price: {formatPrice(car.price)}</span>
                    <span>Updated: {new Date(car.updatedAt || car.createdAt).toLocaleDateString()}</span>
                  </div>
                </div>

                <div className="flex flex-col gap-3 md:items-end">
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
