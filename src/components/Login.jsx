import axios from "axios";
import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Login = () => {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm();

  const submitHandler = async (data) => {
    try {
      const res = await axios.post(
        "https://node5.onrender.com/user/login",
        data
      );

      if (res.status === 200) {
        toast.success("Login successful 🚗");
        navigate("/user");
      }
    } catch (err) {
      console.error(err);
      toast.error("Invalid email or password");
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-cover bg-center relative"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1617814076367-b759c7d7e738')",
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/70"></div>

      {/* Login Card */}
      <div className="relative w-full max-w-md bg-white/10 backdrop-blur-xl border border-white/20 p-8 rounded-3xl shadow-2xl text-white">
        <h2 className="text-3xl font-bold text-center">
          Login to Vehicle Vault
        </h2>
        <p className="text-center text-white/70 mt-2 mb-8">
          Secure access to your vehicle data
        </p>

        <form onSubmit={handleSubmit(submitHandler)} className="space-y-6">

          {/* EMAIL */}
          <div className="relative">
            <input
              type="email"
              className="peer w-full bg-transparent border border-white/30 rounded-xl px-4 py-3 outline-none focus:border-blue-400"
              {...register("email", {
                required: "Email is required"
              })}
            />
            <label
              className="absolute left-4 top-3 text-white/60 text-sm
              peer-focus:-top-2 peer-focus:text-xs peer-focus:text-blue-400
              peer-valid:-top-2 peer-valid:text-xs transition-all
              bg-black/50 px-1 rounded"
            >
              Email Address
            </label>
            {errors.email && (
              <p className="text-red-400 text-sm mt-1">
                {errors.email.message}
              </p>
            )}
          </div>

          {/* PASSWORD */}
          <div className="relative">
            <input
              type="password"
              className="peer w-full bg-transparent border border-white/30 rounded-xl px-4 py-3 outline-none focus:border-blue-400"
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 6,
                  message: "Minimum 6 characters"
                }
              })}
            />
            <label
              className="absolute left-4 top-3 text-white/60 text-sm
              peer-focus:-top-2 peer-focus:text-xs peer-focus:text-blue-400
              peer-valid:-top-2 peer-valid:text-xs transition-all
              bg-black/50 px-1 rounded"
            >
              Password
            </label>
            {errors.password && (
              <p className="text-red-400 text-sm mt-1">
                {errors.password.message}
              </p>
            )}
          </div>

          {/* LOGIN BUTTON */}
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-blue-500 to-cyan-500 py-3 rounded-xl font-semibold hover:scale-[1.03] transition"
          >
            Sign In
          </button>
        </form>

        {/* FOOTER */}
        <p className="text-sm text-center mt-6 text-white/70">
          Don’t have an account?
          <span
            className="text-cyan-400 cursor-pointer ml-1"
            onClick={() => navigate("/signup")}
          >
            Create one
          </span>
        </p>
      </div>
    </div>
  );
};

export default Login;