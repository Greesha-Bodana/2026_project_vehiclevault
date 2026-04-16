import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import API from "../../services/api";

export const CarDetails = () => {
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

  const addToWishlist = async () => {
    try {
      await API.post("/wishlist/add", { car: id });
      toast.success("Added to wishlist");
    } catch (err) {
      console.error(err);
      toast.error(err?.response?.data?.message || "Unable to add to wishlist");
    }
  };

  return (
    <div className="space-y-6">
      <div className="rounded-[2rem] border border-white/10 bg-white/6 p-8 shadow-2xl backdrop-blur">
        <p className="text-sm uppercase tracking-[0.3em] text-cyan-300">{car.brand || "Vehicle"}</p>
        <h1 className="mt-3 text-4xl font-bold text-white">{car.name}</h1>
        <p className="mt-4 text-white/80">Price: {car.price ? `₹${car.price}` : "Not available"}</p>
        {car.image && (
          <img
            src={car.image}
            alt={car.name}
            className="mt-6 w-full rounded-[1.75rem] object-cover"
          />
        )}
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <section className="rounded-[1.75rem] border border-emerald-400/20 bg-emerald-400/10 p-6">
          <h2 className="text-2xl font-semibold text-white">Key details</h2>
          <div className="mt-4 space-y-3 text-white/75">
            <p>Brand: {car.brand || "N/A"}</p>
            <p>Price: {car.price ? `₹${car.price}` : "N/A"}</p>
            <p>User ID: {car.user || "N/A"}</p>
          </div>
        </section>

        <section className="rounded-[1.75rem] border border-cyan-400/20 bg-cyan-400/10 p-6">
          <h2 className="text-2xl font-semibold text-slate-950">Actions</h2>
          <div className="mt-4 space-y-4 text-slate-950">
            <button
              onClick={addToWishlist}
              className="w-full rounded-full bg-slate-950 px-5 py-3 font-semibold text-white transition hover:bg-slate-800"
            >
              Add to wishlist
            </button>
          </div>
        </section>
      </div>

      <section className="rounded-[1.75rem] border border-white/10 bg-slate-950/80 p-6 shadow-2xl">
        <h2 className="text-2xl font-semibold text-white">Accessory suggestions</h2>
        <p className="mt-3 text-white/70">
          Recommended accessories help buyers choose the right add-ons for this model.
        </p>
        <div className="mt-4 grid gap-3 sm:grid-cols-2">
          {(Array.isArray(car.accessories) ? car.accessories : car.accessories ? [car.accessories] : [
            `${car.brand || "Vehicle"} floor mats`,
            `${car.brand || "Vehicle"} phone charger`,
            "Roof rack", 
            "Windshield sunshade"
          ])
            .slice(0, 6)
            .map((item, index) => (
              <span
                key={index}
                className="rounded-2xl bg-white/5 px-4 py-3 text-sm text-white/80"
              >
                {item}
              </span>
            ))}
        </div>
      </section>

      <Link
        to="/cars"
        className="inline-flex rounded-full border border-white/15 px-5 py-2 text-white/80 transition hover:bg-white/10"
      >
        Back to car list
      </Link>
    </div>
  );
};
