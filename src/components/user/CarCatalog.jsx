import React, { useEffect, useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import API from "../../services/api";
import { resolveImageUrl } from "../../utils/resolveImageUrl";

export const CarCatalog = () => {
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const [selectedBrand, setSelectedBrand] = useState("all");
  const [sortBy, setSortBy] = useState("latest");
  const [compareSelection, setCompareSelection] = useState([]);
  const navigate = useNavigate();

  const selectedCount = compareSelection.length;
  const canCompare = selectedCount === 2;

  const toggleCompare = (id) => {
    setCompareSelection((prev) => {
      if (prev.includes(id)) {
        return prev.filter((item) => item !== id);
      }

      if (prev.length >= 2) {
        return prev;
      }

      return [...prev, id];
    });
  };

  const compareCars = () => {
    if (!canCompare) return;
    navigate(`/user/compare?first=${compareSelection[0]}&second=${compareSelection[1]}`);
  };

  useEffect(() => {
    const fetchCars = async () => {
      try {
        const response = await API.get("/car");
        const payload = response.data;
        const carList = Array.isArray(payload)
          ? payload
          : payload?.cars || payload?.data || [];
        setCars(carList);
      } catch (err) {
        console.error(err);
        setError("Unable to load car catalog. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchCars();
  }, []);

  const brandOptions = useMemo(() => {
    const brands = cars.map((car) => car.brand).filter(Boolean);
    return ["all", ...Array.from(new Set(brands))];
  }, [cars]);

  const filteredCars = useMemo(() => {
    return cars.filter((car) => {
      const query = search.trim().toLowerCase();
      const matchesSearch =
        !query ||
        car.name?.toLowerCase().includes(query) ||
        car.brand?.toLowerCase().includes(query) ||
        car.model?.toLowerCase().includes(query) ||
        car.bodyType?.toLowerCase().includes(query);

      const matchesBrand = selectedBrand === "all" || car.brand === selectedBrand;
      return matchesSearch && matchesBrand;
    });
  }, [cars, search, selectedBrand]);

  const sortedCars = useMemo(() => {
    const list = [...filteredCars];

    switch (sortBy) {
      case "price-low":
        return list.sort((a, b) => Number(a.price || 0) - Number(b.price || 0));
      case "price-high":
        return list.sort((a, b) => Number(b.price || 0) - Number(a.price || 0));
      case "brand":
        return list.sort((a, b) => (a.brand || "").localeCompare(b.brand || ""));
      case "latest":
      default:
        return list.sort(
          (a, b) =>
            new Date(b.createdAt || 0).getTime() - new Date(a.createdAt || 0).getTime()
        );
    }
  }, [filteredCars, sortBy]);

  const formatPrice = (price) => {
    if (price === undefined || price === null || price === "") return "Price on request";

    try {
      return new Intl.NumberFormat("en-IN", {
        style: "currency",
        currency: "INR",
        maximumFractionDigits: 0
      }).format(Number(price));
    } catch {
      return `Rs. ${price}`;
    }
  };

  return (
    <div className="space-y-8">
      <div className="rounded-[2rem] border border-white/10 bg-white/6 p-8 shadow-2xl backdrop-blur">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl">
            <p className="text-sm uppercase tracking-[0.3em] text-cyan-300">Car Library</p>
            <h1 className="mt-3 text-4xl font-bold">Browse and compare cars</h1>
            <p className="mt-3 text-white/70">
              Explore available vehicles, compare specifications, and open each model for
              more detailed comparison-ready information.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="rounded-2xl border border-white/10 bg-slate-950/70 p-4">
              <p className="text-sm uppercase tracking-[0.28em] text-white/60">Total cars</p>
              <p className="mt-2 text-3xl font-semibold text-white">{cars.length}</p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-slate-950/70 p-4">
              <p className="text-sm uppercase tracking-[0.28em] text-white/60">Showing</p>
              <p className="mt-2 text-3xl font-semibold text-white">
                {loading ? "..." : sortedCars.length}
              </p>
            </div>
          </div>
        </div>
      </div>

      {selectedCount > 0 && (
        <div className="rounded-[2rem] border border-cyan-400/20 bg-slate-950/80 p-5 shadow-2xl">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-sm text-white/80">
              {selectedCount} car{selectedCount === 1 ? "" : "s"} selected for comparison.
              {selectedCount === 2
                ? " Ready to create a brief comparison report."
                : " Select one more car to compare."}
            </p>
            <div className="flex flex-wrap gap-3">
              <button
                type="button"
                onClick={compareCars}
                disabled={!canCompare}
                className={`rounded-full px-6 py-3 text-sm font-semibold transition ${
                  canCompare
                    ? "bg-cyan-500 text-slate-950 hover:bg-cyan-400"
                    : "cursor-not-allowed bg-white/5 text-white/40"
                }`}
              >
                Compare selected
              </button>
              <button
                type="button"
                onClick={() => setCompareSelection([])}
                className="rounded-full border border-white/10 bg-white/5 px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
              >
                Clear selection
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="grid gap-4 md:grid-cols-[1.5fr_1fr]">
        <input
          type="search"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search by model, brand, or keyword"
          className="rounded-3xl border border-white/10 bg-slate-950/80 px-5 py-4 text-white outline-none transition focus:border-cyan-400"
        />
        <div className="grid gap-4 sm:grid-cols-2">
          <select
            value={selectedBrand}
            onChange={(e) => setSelectedBrand(e.target.value)}
            className="rounded-3xl border border-white/10 bg-slate-950/80 px-5 py-4 text-white outline-none transition focus:border-cyan-400"
          >
            {brandOptions.map((brand) => (
              <option key={brand} value={brand} className="bg-slate-950 text-white">
                {brand === "all" ? "All brands" : brand}
              </option>
            ))}
          </select>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="rounded-3xl border border-white/10 bg-slate-950/80 px-5 py-4 text-white outline-none transition focus:border-cyan-400"
          >
            <option value="latest" className="bg-slate-950 text-white">
              Latest
            </option>
            <option value="price-low" className="bg-slate-950 text-white">
              Price low to high
            </option>
            <option value="price-high" className="bg-slate-950 text-white">
              Price high to low
            </option>
            <option value="brand" className="bg-slate-950 text-white">
              Brand A-Z
            </option>
          </select>
        </div>
      </div>

      {loading ? (
        <div className="rounded-[2rem] border border-white/10 bg-slate-900/80 p-10 text-center text-white shadow-2xl">
          Loading cars...
        </div>
      ) : error ? (
        <div className="rounded-[2rem] border border-red-500/20 bg-red-500/10 p-10 text-center text-red-200 shadow-2xl">
          {error}
        </div>
      ) : sortedCars.length === 0 ? (
        <div className="rounded-[2rem] border border-white/10 bg-white/6 p-10 text-center text-white shadow-2xl">
          <p className="text-xl font-semibold">No cars found</p>
          <p className="mt-2 text-white/70">
            Try another search term or select a different brand.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <button
              type="button"
              onClick={() => {
                setSearch("");
                setSelectedBrand("all");
                setSortBy("latest");
              }}
              className="rounded-full border border-white/15 bg-white/5 px-5 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
            >
              Reset filters
            </button>
            <Link
              to="/user/dashboard"
              className="rounded-full bg-cyan-500 px-5 py-3 text-sm font-semibold text-slate-950 transition hover:bg-cyan-400"
            >
              Back to dashboard
            </Link>
          </div>
        </div>
      ) : (
        <div className="grid items-stretch gap-6 md:grid-cols-2 xl:grid-cols-3">
          {sortedCars.map((car) => (
            <article
              key={car._id}
              className={`flex h-full flex-col overflow-hidden rounded-[1.75rem] border bg-slate-900/80 shadow-xl transition hover:-translate-y-1 ${
                compareSelection.includes(car._id)
                  ? "border-cyan-400/60"
                  : "border-white/10 hover:border-cyan-400"
              }`}
            >
              <div className="relative aspect-[16/10] min-h-[270px] overflow-hidden bg-slate-950">
                <div className="absolute right-4 top-4 z-20 flex items-center gap-2 rounded-full bg-slate-950/90 px-3 py-2 text-sm text-white shadow-lg shadow-black/20">
                  <input
                    type="checkbox"
                    checked={compareSelection.includes(car._id)}
                    onChange={() => toggleCompare(car._id)}
                    className="h-4 w-4 accent-cyan-400"
                  />
                  <span>Compare</span>
                </div>
                {car.image ? (
                  <img
                    src={resolveImageUrl(car.image)}
                    alt={car.name}
                    className="h-full w-full object-cover object-center"
                  />
                ) : (
                  <div className="flex h-full items-center justify-center bg-slate-800 text-white/60">
                    No image available
                  </div>
                )}
              </div>
              <div className="flex flex-1 flex-col space-y-4 p-6">
                <div>
                  <p className="text-xs uppercase tracking-[0.25em] text-cyan-300">
                    {car.brand || "Unknown brand"}
                  </p>
                  <h2 className="mt-3 text-2xl font-semibold text-white">
                    {car.name || "Untitled model"}
                  </h2>
                </div>

                <div className="flex-1 space-y-4 text-sm text-white/70">
                  <p>{car.description || car.summary || "No description available."}</p>
                  <div className="grid gap-2 sm:grid-cols-2">
                    <span className="rounded-2xl bg-white/5 px-3 py-2">
                      Price: {formatPrice(car.price)}
                    </span>
                    <span className="rounded-2xl bg-white/5 px-3 py-2">
                      Year: {car.year || "N/A"}
                    </span>
                    <span className="rounded-2xl bg-white/5 px-3 py-2">
                      Status: {car.isAvailable === false ? "Sold" : "Available"}
                    </span>
                  </div>
                </div>

                <div className="mt-auto flex flex-wrap items-center justify-between gap-3 pt-2">
                  <Link
                    to={`/user/cars/${car._id}`}
                    className="inline-flex rounded-full bg-cyan-500 px-5 py-3 text-sm font-semibold text-slate-950 transition hover:bg-cyan-400"
                  >
                    View details
                  </Link>
                  <span className="text-sm text-white/50">VehicleVault listing</span>
                </div>
              </div>
            </article>
          ))}
        </div>
      )}
    </div>
  );
};
