import React from "react";

const Signup = () => {
  return (
    <div
      className="min-h-screen flex items-center justify-center bg-cover bg-center relative"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1500530855697-b586d89ba3ee')",
      }}
    >
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/55"></div>

      {/* Form Card */}
      <div className="relative w-full max-w-md bg-white/10 backdrop-blur-xl border border-white/20 p-8 rounded-3xl shadow-2xl text-white">
        <h2 className="text-3xl font-bold text-center mb-1">
          Create Your Vehicle Vault Account
        </h2>
        <p className="text-center text-white/70 mb-8">
          Start managing your vehicles today
        </p>

        <form className="space-y-6">
          {/* Full Name */}
          <div className="relative">
            <input
              type="text"
              name="fullName"
              required
              className="peer w-full bg-transparent border border-white/30 rounded-xl px-4 py-3 outline-none focus:border-green-400"
            />
            <label className="absolute left-4 top-3 text-white/60 text-sm
              peer-focus:-top-2 peer-focus:text-xs peer-focus:text-green-400
              peer-valid:-top-2 peer-valid:text-xs transition-all
              bg-black/40 px-1 rounded">
              Full Name
            </label>
          </div>

          {/* Email */}
          <div className="relative">
            <input
              type="email"
              name="email"
              required
              className="peer w-full bg-transparent border border-white/30 rounded-xl px-4 py-3 outline-none focus:border-green-400"
            />
            <label className="absolute left-4 top-3 text-white/60 text-sm
              peer-focus:-top-2 peer-focus:text-xs peer-focus:text-green-400
              peer-valid:-top-2 peer-valid:text-xs transition-all
              bg-black/40 px-1 rounded">
              Email Address
            </label>
          </div>

          {/* Password */}
          <div className="relative">
            <input
              type="password"
              name="password"
              required
              className="peer w-full bg-transparent border border-white/30 rounded-xl px-4 py-3 outline-none focus:border-green-400"
            />
            <label className="absolute left-4 top-3 text-white/60 text-sm
              peer-focus:-top-2 peer-focus:text-xs peer-focus:text-green-400
              peer-valid:-top-2 peer-valid:text-xs transition-all
              bg-black/40 px-1 rounded">
              Create Password
            </label>
          </div>

          {/* Button */}
          <button className="w-full bg-gradient-to-r from-green-500 to-emerald-500 py-3 rounded-xl font-semibold hover:scale-[1.02] transition">
            Create Account
          </button>
        </form>

        <p className="text-sm text-center mt-6 text-white/70">
          Already have an account?
          <span className="text-emerald-400 cursor-pointer"> Sign in</span>
        </p>
      </div>
    </div>
  );
};

export default Signup;