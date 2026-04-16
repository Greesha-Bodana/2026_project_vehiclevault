import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import API from "../services/api";

const ResetPassword = () => {
  const { token } = useParams();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors }
  } = useForm();

  const submitHandler = async (data) => {
    try {
      const res = await API.post(`/user/reset-password/${token}`, {
        password: data.password
      });
      toast.success(res.data.message || "Password reset successfully.");
      navigate("/login", { replace: true });
    } catch (err) {
      console.error(err);
      toast.error(err?.response?.data?.message || "Unable to reset password.");
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 px-6 py-16 text-white">
      <div className="mx-auto max-w-md rounded-[2rem] border border-white/10 bg-slate-900/80 p-10 shadow-2xl backdrop-blur-xl">
        <p className="text-sm uppercase tracking-[0.35em] text-cyan-300">Reset Password</p>
        <h1 className="mt-4 text-3xl font-bold">Create a new password</h1>
        <p className="mt-3 text-sm leading-6 text-white/70">
          Use the link from your email to set a secure new password for your VehicleVault account.
        </p>

        <form onSubmit={handleSubmit(submitHandler)} className="mt-8 space-y-5">
          <div className="relative">
            <input
              type="password"
              placeholder=""
              className="peer w-full rounded-xl border border-white/20 bg-slate-950/80 px-4 py-3 outline-none transition focus:border-cyan-400"
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 6,
                  message: "Minimum 6 characters"
                }
              })}
            />
            <label className="pointer-events-none absolute left-4 top-3 rounded bg-slate-900/80 px-1 text-sm text-white/60 transition-all peer-focus:-top-2 peer-focus:text-xs peer-focus:text-cyan-400 peer-valid:-top-2 peer-valid:text-xs">
              New Password
            </label>
            {errors.password && <p className="mt-1 text-sm text-red-400">{errors.password.message}</p>}
          </div>

          <div className="relative">
            <input
              type="password"
              placeholder=""
              className="peer w-full rounded-xl border border-white/20 bg-slate-950/80 px-4 py-3 outline-none transition focus:border-cyan-400"
              {...register("confirmPassword", {
                required: "Confirm your password",
                validate: (value) => value === getValues("password") || "Passwords do not match"
              })}
            />
            <label className="pointer-events-none absolute left-4 top-3 rounded bg-slate-900/80 px-1 text-sm text-white/60 transition-all peer-focus:-top-2 peer-focus:text-xs peer-focus:text-cyan-400 peer-valid:-top-2 peer-valid:text-xs">
              Confirm Password
            </label>
            {errors.confirmPassword && <p className="mt-1 text-sm text-red-400">{errors.confirmPassword.message}</p>}
          </div>

          <button type="submit" className="w-full rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-500 px-5 py-3 font-semibold text-slate-950 shadow-lg shadow-cyan-500/25 transition hover:scale-[1.02]">
            Update Password
          </button>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;
