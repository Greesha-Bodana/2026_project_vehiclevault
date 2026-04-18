import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import API from "../services/api";

const Login = () => {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm();

  const parseJwtPayload = (token) => {
    if (!token) return null;
    try {
      const payload = token.split(".")[1];
      if (!payload) return null;
      const decoded = atob(payload.replace(/-/g, "+").replace(/_/g, "/"));
      return JSON.parse(decodeURIComponent(escape(decoded)));
    } catch {
      return null;
    }
  };

  const getRoleFromResponse = (response, token) => {
    const roleCandidate =
      response?.role ||
      response?.data?.role ||
      response?.user?.role ||
      response?.data?.user?.role;

    if (roleCandidate) {
      return roleCandidate.toString().trim();
    }

    const payload = parseJwtPayload(token);
    if (!payload) return null;

    return (
      payload.role || payload.roles || payload.user?.role || payload.user?.roles || null
    )?.toString()?.trim();
  };

  const submitHandler = async (data) => {
    try {
      const res = await API.post("/user/login", data);

      if (res.status === 200) {
        const token =
          res.data.token ||
          res.data.data?.token ||
          res.data.accessToken ||
          res.data.data?.accessToken ||
          res.data.user?.token ||
          res.data.data?.user?.token;
        let role = getRoleFromResponse(res.data, token);

        if (!token) {
          toast.error("Login succeeded but token was not returned.");
          return;
        }

        role = role?.toString().trim();
        if (!role) {
          role = "USER";
        }

        localStorage.setItem("vehiclevault_token", token);
        localStorage.setItem("vehiclevault_role", role.toUpperCase());

        toast.success(res.data.message || "Login successful");

        if (["USER", "user"].includes(role)) {
          navigate("/user/dashboard", { replace: true });
        } else if (["ADMIN", "admin", "OWNER", "owner"].includes(role)) {
          navigate("/admin/dashboard", { replace: true });
        } else {
          navigate("/user/dashboard", { replace: true });
        }
      }
    } catch (err) {
      console.error(err);
      toast.error(err?.response?.data?.message || "Invalid email or password");
    }
  };

  return (
    <div
      className="relative min-h-screen overflow-hidden bg-cover bg-center"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1617814076367-b759c7d7e738')",
      }}
    >
      <div className="absolute inset-0 bg-slate-950/75"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_rgba(34,211,238,0.2),_transparent_35%),radial-gradient(circle_at_bottom_left,_rgba(59,130,246,0.2),_transparent_30%)]"></div>

      <div className="relative mx-auto flex min-h-screen max-w-6xl items-center px-6 py-10">
        <div className="mx-auto w-full max-w-lg">
          <section className="relative w-full rounded-[2rem] border border-white/15 bg-white/10 p-8 text-white shadow-2xl backdrop-blur-xl">
            <p className="text-center text-sm font-semibold uppercase tracking-[0.35em] text-cyan-300">
              Login
            </p>
            <h2 className="mt-3 text-center text-3xl font-bold">
              Welcome back to VehicleVault
            </h2>
            <p className="mx-auto mt-3 max-w-md text-center text-sm leading-6 text-white/70">
              Sign in to search cars, compare two vehicles, and review the best options for your next purchase.
            </p>

            <div className="my-8 rounded-2xl border border-white/15 bg-black/20 p-4 text-sm text-white/80">
              VehicleVault is a car comparison system where buyers compare features, analyze benefits and defects, and discover accessory recommendations. Admin controls car postings and notifications.
            </div>
            <div className="rounded-2xl border border-cyan-400/20 bg-cyan-400/10 p-4 text-sm text-cyan-100">
              Admin accounts can sign in to manage car listings, review users, and publish notifications from the admin panel.
            </div>

            <form onSubmit={handleSubmit(submitHandler)} className="space-y-6">
              {/* EMAIL */}
              <div className="relative">
                <input
                  type="email"
                  placeholder=" "
                  className="peer w-full rounded-xl border border-white/30 bg-transparent px-4 py-3 outline-none transition focus:border-blue-400"
                  {...register("email", {
                    required: "Email is required"
                  })}
                />
                <label
                  className="absolute left-4 top-3 rounded bg-black/50 px-1 text-sm text-white/60 transition-all
                  peer-focus:-top-2 peer-focus:text-xs peer-focus:text-blue-400
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

              {/* PASSWORD */}
              <div className="relative">
                <input
                  type="password"
                  placeholder=" "
                  className="peer w-full rounded-xl border border-white/30 bg-transparent px-4 py-3 outline-none transition focus:border-blue-400"
                  {...register("password", {
                    required: "Password is required",
                    minLength: {
                      value: 6,
                      message: "Minimum 6 characters"
                    }
                  })}
                />
                <label
                  className="absolute left-4 top-3 rounded bg-black/50 px-1 text-sm text-white/60 transition-all
                  peer-focus:-top-2 peer-focus:text-xs peer-focus:text-blue-400
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

              <button
                type="submit"
                className="w-full rounded-xl bg-gradient-to-r from-blue-500 via-sky-500 to-cyan-500 py-3 font-semibold shadow-lg shadow-cyan-900/30 transition hover:scale-[1.02]"
              >
                Sign In
              </button>

              <div className="mt-4 flex items-center justify-between text-sm text-white/70">
                <button
                  type="button"
                  className="text-cyan-300 underline"
                  onClick={() => navigate("/forgot-password")}
                >
                  Forgot password?
                </button>
                <span>
                  Don&apos;t have an account?
                  <button
                    type="button"
                    className="ml-1 text-cyan-400 underline"
                    onClick={() => navigate("/signup")}
                  >
                    Create one
                  </button>
                </span>
              </div>
            </form>
          </section>
        </div>
      </div>
    </div>
  );
};
export default Login;