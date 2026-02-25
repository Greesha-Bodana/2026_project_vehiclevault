import React, { useEffect, useState } from "react";

export const UseEffectDemo = () => {
  const [count, setCount] = useState(0);
  const [effectRuns, setEffectRuns] = useState(0);

  // Runs every time `count` changes
  useEffect(() => {
    console.log("useEffect called...");
    setEffectRuns((prev) => prev + 1);
  }, [count]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-gray-900 to-black flex items-center justify-center">
      <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl shadow-2xl p-8 w-[420px] text-center">

        <h1 className="text-2xl font-bold text-white mb-2">
          ⚙️ useEffect Demo
        </h1>
        <p className="text-gray-400 text-sm mb-6">
          Demonstrating dependency-based side effects
        </p>

        {/* Count Display */}
        <div className="mb-6">
          <p className="text-gray-300 text-sm">Current Count</p>
          <p className="text-4xl font-bold text-white">{count}</p>
        </div>

        {/* Button */}
        <button
          onClick={() => setCount(count + 1)}
          className="w-full py-3 rounded-xl bg-gradient-to-r from-indigo-500 to-blue-500 text-white font-semibold hover:opacity-90 transition"
        >
          ➕ Increment Count
        </button>

        {/* Effect Info */}
        <div className="mt-6 bg-white/5 rounded-xl p-4">
          <p className="text-gray-400 text-sm">
            useEffect executed
          </p>
          <p className="text-xl font-bold text-indigo-400">
            {effectRuns} times
          </p>
        </div>

        {/* Explanation */}
        <p className="text-xs text-gray-500 mt-4">
          useEffect runs on initial render and whenever
          <span className="text-gray-300"> count </span>
          changes
        </p>
      </div>
    </div>
  );
};