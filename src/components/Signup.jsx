import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Signup = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors }
  } = useForm();

  const submitHandler = (data) => {
    console.log("Signup form data:", data);
    toast.success("Signup form ready. Connect your backend to create users.");
    navigate("/login");
  };

  return (
    <div
      className="relative min-h-screen overflow-hidden bg-cover bg-center"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1492144534655-ae79c964c9d7')",
      }}
    >
      <div className="absolute inset-0 bg-slate-950/75"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(16,185,129,0.22),_transparent_35%),radial-gradient(circle_at_bottom_right,_rgba(250,204,21,0.16),_transparent_35%)]"></div>

      <div className="relative mx-auto flex min-h-screen max-w-6xl items-center px-6 py-10">
        <div className="mx-auto w-full max-w-lg">
          <section className="relative w-full rounded-[2rem] border border-white/15 bg-white/10 p-8 text-white shadow-2xl backdrop-blur-xl">
            <p className="text-center text-sm font-semibold uppercase tracking-[0.35em] text-emerald-300">
              Signup
            </p>
            <h2 className="mt-3 text-center text-3xl font-bold">
              Build your VehicleVault account
            </h2>
            <p className="mx-auto mt-3 max-w-lg text-center text-sm leading-6 text-white/70">
              Register to save your experience, compare vehicles more easily,
              and explore the right car with confidence.
            </p>

            <form
              onSubmit={handleSubmit(submitHandler)}
              className="mt-8 space-y-5"
            >
              <div className="relative">
                <input
                  type="text"
                  placeholder=" "
                  className="peer w-full rounded-xl border border-white/30 bg-transparent px-4 py-3 outline-none transition focus:border-emerald-400"
                  {...register("fullName", {
                    required: "Full name is required"
                  })}
                />
                <label
                  className="absolute left-4 top-3 rounded bg-black/45 px-1 text-sm text-white/60 transition-all
                  peer-focus:-top-2 peer-focus:text-xs peer-focus:text-emerald-400
                  peer-valid:-top-2 peer-valid:text-xs"
                >
                  Full Name
                </label>
                {errors.fullName && (
                  <p className="mt-1 text-sm text-red-400">
                    {errors.fullName.message}
                  </p>
                )}
              </div>

              <div className="relative">
                <input
                  type="email"
                  placeholder=" "
                  className="peer w-full rounded-xl border border-white/30 bg-transparent px-4 py-3 outline-none transition focus:border-emerald-400"
                  {...register("email", {
                    required: "Email is required"
                  })}
                />
                <label
                  className="absolute left-4 top-3 rounded bg-black/45 px-1 text-sm text-white/60 transition-all
                  peer-focus:-top-2 peer-focus:text-xs peer-focus:text-emerald-400
                  peer-valid:-top-2 peer-valid:text-xs"
                >
                  Email Address
                </label>
                {errors.email && (
                  <p className="mt-1 text-sm text-red-400">
                    {errors.email.message}
                  </p>
                )}
              </div>

              <div className="grid gap-5 md:grid-cols-2">
                <div className="relative">
                  <input
                    type="password"
                    placeholder=" "
                    className="peer w-full rounded-xl border border-white/30 bg-transparent px-4 py-3 outline-none transition focus:border-emerald-400"
                    {...register("password", {
                      required: "Password is required",
                      minLength: {
                        value: 6,
                        message: "Minimum 6 characters"
                      }
                    })}
                  />
                  <label
                    className="absolute left-4 top-3 rounded bg-black/45 px-1 text-sm text-white/60 transition-all
                    peer-focus:-top-2 peer-focus:text-xs peer-focus:text-emerald-400
                    peer-valid:-top-2 peer-valid:text-xs"
                  >
                    Password
                  </label>
                  {errors.password && (
                    <p className="mt-1 text-sm text-red-400">
                      {errors.password.message}
                    </p>
                  )}
                </div>

                <div className="relative">
                  <input
                    type="password"
                    placeholder=" "
                    className="peer w-full rounded-xl border border-white/30 bg-transparent px-4 py-3 outline-none transition focus:border-emerald-400"
                    {...register("confirmPassword", {
                      required: "Please confirm your password",
                      validate: (value) =>
                        value === getValues("password") ||
                        "Passwords do not match"
                    })}
                  />
                  <label
                    className="absolute left-4 top-3 rounded bg-black/45 px-1 text-sm text-white/60 transition-all
                    peer-focus:-top-2 peer-focus:text-xs peer-focus:text-emerald-400
                    peer-valid:-top-2 peer-valid:text-xs"
                  >
                    Confirm Password
                  </label>
                  {errors.confirmPassword && (
                    <p className="mt-1 text-sm text-red-400">
                      {errors.confirmPassword.message}
                    </p>
                  )}
                </div>
              </div>

              <div className="rounded-2xl border border-emerald-400/20 bg-emerald-400/10 p-4 text-sm leading-6 text-white/75">
                Your account gives you a smoother path to compare cars, review
                features, and discover better choices faster.
              </div>

              <button
                type="submit"
                className="w-full rounded-xl bg-gradient-to-r from-emerald-500 via-green-500 to-lime-500 py-3 font-semibold shadow-lg shadow-emerald-900/30 transition hover:scale-[1.02]"
              >
                Create Account
              </button>
            </form>

            <p className="mt-6 text-center text-sm text-white/70">
              Already have an account?
              <span
                className="ml-1 cursor-pointer text-emerald-400"
                onClick={() => navigate("/login")}
              >
                Sign in
              </span>
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Signup;