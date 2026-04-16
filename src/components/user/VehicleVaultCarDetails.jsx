import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import API from "../../services/api";

const formatPrice = (value) => {
  if (!value && value !== 0) return "Price on request";

  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0
  }).format(value);
};

export const VehicleVaultCarDetails = () => {
  const { id } = useParams();
  const [car, setCar] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchCar = async () => {
      try {
        const response = await API.get(`/car/${id}`);
        setCar(response.data);
      } catch (err) {
        console.error(err);
        setError(err?.response?.data?.message || "Car not found.");
      } finally {
        setLoading(false);
      }
    };

    fetchCar();
  }, [id]);

  const addToWishlist = async () => {
    try {
      await API.post("/wishlist/add", { car: id });
      toast.success("Added to wishlist");
    } catch (err) {
      console.error(err);
      toast.error(err?.response?.data?.message || "Unable to add to wishlist");
    }
  };

  if (loading) {
    return (
      <div className="rounded-[2rem] border border-white/10 bg-white/6 p-8 text-white shadow-2xl backdrop-blur">
        <p>Loading car details...</p>
      </div>
    );
  }

  if (error || !car) {
    return (
      <div className="rounded-[2rem] border border-white/10 bg-white/6 p-8 text-white shadow-2xl backdrop-blur">
        <h1 className="text-3xl font-bold">Car not found</h1>
        <p className="mt-4 text-white/70">{error || "Unable to find this car."}</p>
        <Link to="/cars" className="mt-4 inline-flex text-cyan-300">
          Back to cars
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-8 pb-10">
      <section className="rounded-[2.25rem] border border-white/10 bg-[linear-gradient(135deg,rgba(14,116,144,0.18),rgba(15,23,42,0.96)_40%,rgba(30,41,59,0.95))] p-8 shadow-[0_30px_120px_rgba(2,6,23,0.45)]">
        <div className="grid gap-8 xl:grid-cols-[1.1fr_0.9fr] xl:items-center">
          <div>
            <p className="text-sm uppercase tracking-[0.3em] text-cyan-300">
              {car.brand || "Vehicle"}
            </p>
            <h1 className="mt-3 text-4xl font-black text-white sm:text-5xl">{car.name}</h1>
            <p className="mt-4 text-lg font-semibold text-white/85">{formatPrice(car.price)}</p>
            <p className="mt-4 max-w-2xl text-white/70">
              Review the listing, scan the essentials quickly, and save this car to your wishlist directly from VehicleVault.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <button
                onClick={addToWishlist}
                className="rounded-full bg-cyan-300 px-6 py-3 text-sm font-bold text-slate-950 transition hover:bg-cyan-200"
              >
                Add to wishlist
              </button>
              <Link
                to="/cars"
                className="rounded-full border border-white/15 px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
              >
                Back to catalog
              </Link>
            </div>
          </div>

          <div className="overflow-hidden rounded-[2rem] border border-white/10 bg-slate-950/70 p-4">
            {car.image ? (
              <img
                src={car.image}
                alt={car.name}
                className="w-full rounded-[1.5rem] object-cover"
              />
            ) : (
              <div className="flex min-h-[320px] items-center justify-center rounded-[1.5rem] bg-slate-900 text-white/45">
                No image available
              </div>
            )}
          </div>
        </div>
      </section>

      <section className="grid gap-6 md:grid-cols-2">
        <article className="rounded-[1.9rem] border border-white/10 bg-white/6 p-6 shadow-2xl backdrop-blur">
          <p className="text-sm uppercase tracking-[0.28em] text-cyan-300">Vehicle profile</p>
          <h2 className="mt-3 text-2xl font-bold text-white">Key details</h2>
          <div className="mt-5 space-y-3 text-white/75">
            <p>Brand: {car.brand || "N/A"}</p>
            <p>Price: {formatPrice(car.price)}</p>
            <p>Listing ID: {car._id}</p>
            <p>Owner ID: {car.user || "N/A"}</p>
          </div>
        </article>

        <article className="rounded-[1.9rem] border border-white/10 bg-slate-950/80 p-6 shadow-2xl">
          <p className="text-sm uppercase tracking-[0.28em] text-cyan-300">Why it stands out</p>
          <h2 className="mt-3 text-2xl font-bold text-white">VehicleVault summary</h2>
          <p className="mt-5 leading-7 text-white/70">
            This screen now mirrors the polished catalog experience, giving users a cleaner transition from search to details while keeping the wishlist action clear and easy to reach.
          </p>
        </article>
      </section>
    </div>
  );
};
