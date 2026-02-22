import React from "react";

const Login = () => {
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

        <form className="space-y-6">
          {/* Email Address */}
          <div className="relative">
            <input
              type="email"
              name="email"
              required
              className="peer w-full bg-transparent border border-white/30 rounded-xl px-4 py-3 outline-none focus:border-blue-400"
            />
            <label
              className="absolute left-4 top-3 text-white/60 text-sm
              peer-focus:-top-2 peer-focus:text-xs peer-focus:text-blue-400
              peer-valid:-top-2 peer-valid:text-xs transition-all
              bg-black/50 px-1 rounded"
            >
              Email Address
            </label>
          </div>

          {/* Password */}
          <div className="relative">
            <input
              type="password"
              name="password"
              required
              className="peer w-full bg-transparent border border-white/30 rounded-xl px-4 py-3 outline-none focus:border-blue-400"
            />
            <label
              className="absolute left-4 top-3 text-white/60 text-sm
              peer-focus:-top-2 peer-focus:text-xs peer-focus:text-blue-400
              peer-valid:-top-2 peer-valid:text-xs transition-all
              bg-black/50 px-1 rounded"
            >
              Password
            </label>
          </div>

          {/* Login Button */}
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-blue-500 to-cyan-500 py-3 rounded-xl font-semibold hover:scale-[1.03] transition"
          >
            Sign In
          </button>
        </form>

        {/* Footer */}
        <p className="text-sm text-center mt-6 text-white/70">
          Don’t have an account?
          <span className="text-cyan-400 cursor-pointer">
            {" "}Create one
          </span>
        </p>
      </div>
    </div>
  );
};

export default Login;