import React from "react";

function Header() {
  return (
    <header className="w-full text-center py-16 mt-3 mb-3 rounded-3xl bg-white/70 dark:bg-gray-900/60 backdrop-blur-md shadow-md border border-gray-200 dark:border-gray-800 transition-all duration-300 hover:shadow-lg">
      <p className="inline-block mb-3 px-5 py-1.5 rounded-full text-sm font-medium border border-gray-300 dark:border-gray-600 bg-gray-100/50 dark:bg-gray-800/50">
        #1 in India for Blogs
      </p>
      <h1 className="text-5xl md:text-7xl font-extrabold text-balance tracking-tight">
        Read with <span className="text-indigo-600">Facts</span>
      </h1>
      <p className="mt-3 text-gray-600 dark:text-gray-400 text-lg">
        The only platform you’ll ever love.
      </p>
    </header>
  );
}

export default Header;
