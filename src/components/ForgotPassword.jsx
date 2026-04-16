import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import API from "../services/api";

const ForgotPassword = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm();

  const submitHandler = async (data) => {
    try {
      const res = await API.post("/user/forgot-password", { email: data.email });
      toast.success(res.data.message || "Password reset link sent to your email.");
      navigate("/login", { replace: true });
    } catch (err) {
      console.error(err);
      toast.error(err?.response?.data?.message || "Unable to send reset link.");
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 px-6 py-16 text-white">
      <div className="mx-auto max-w-md rounded-[2rem] border border-white/10 bg-slate-900/80 p-10 shadow-2xl backdrop-blur-xl">
        <p className="text-sm uppercase tracking-[0.35em] text-cyan-300">Forgot Password</p>
        <h1 className="mt-4 text-3xl font-bold">Reset your VehicleVault password</h1>
        <p className="mt-3 text-sm leading-6 text-white/70">
          Enter your account email and we will send you a secure password reset link.
        </p>

        <form onSubmit={handleSubmit(submitHandler)} className="mt-8 space-y-5">
          <div className="relative">
            <input
              type="email"
              placeholder=""
              className="peer w-full rounded-xl border border-white/20 bg-slate-950/80 px-4 py-3 outline-none transition focus:border-cyan-400"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[^@\s]+@[^@\s]+\.[^@\s]+$/,
                  message: "Enter a valid email address"
                }
              })}
            />
            <label className="pointer-events-none absolute left-4 top-3 rounded bg-slate-900/80 px-1 text-sm text-white/60 transition-all peer-focus:-top-2 peer-focus:text-xs peer-focus:text-cyan-400 peer-valid:-top-2 peer-valid:text-xs">
              Email Address
            </label>
            {errors.email && <p className="mt-1 text-sm text-red-400">{errors.email.message}</p>}
          </div>

          <button type="submit" className="w-full rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-500 px-5 py-3 font-semibold text-slate-950 shadow-lg shadow-cyan-500/25 transition hover:scale-[1.02]">
            Send Reset Link
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-white/70">
          Remembered your password?
          <button type="button" className="ml-1 text-cyan-300 underline" onClick={() => navigate("/login")}>Sign in</button>
        </p>
      </div>
    </div>
  );
};

export default ForgotPassword;
