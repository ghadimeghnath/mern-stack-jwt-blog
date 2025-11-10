import React from "react";

function Loading() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-gray-50 via-white to-gray-100 dark:from-gray-900 dark:via-gray-950 dark:to-black text-gray-800 dark:text-gray-100 transition-all duration-300">
      {/* Spinner */}
      <div className="relative flex items-center justify-center">
        <div className="w-16 h-16 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin"></div>
        <div className="absolute inset-0 blur-xl bg-indigo-500/20 rounded-full animate-pulse"></div>
      </div>

      {/* Loading text */}
      <h1 className="mt-8 text-2xl font-semibold tracking-wide animate-pulse">
        Loading<span className="text-indigo-600 dark:text-indigo-400">...</span>
      </h1>

      {/* Subtext */}
      <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
        Please wait while we prepare everything for you.
      </p>
    </div>
  );
}

export default Loading;
