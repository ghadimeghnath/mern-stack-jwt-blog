import React, { useEffect, useRef } from "react";
import { Search, User, Shield } from "lucide-react";
import { useAppContext } from "../context/AppContext";
import SwitchTheme from "./SwitchTheme";
import ProfileCtn from "./profile/profileCtn";
import { Link } from "react-router-dom";

function Nav({ title }) {
  const { showComponent, setShowComponent, admin } = useAppContext();
  const dropdownRef = useRef(null);

  const toggleComponent = (e) => {
    e.preventDefault();
    setShowComponent((prev) => !prev);
  };

  // 🔒 Auto-close profile dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target) &&
        !event.target.closest(".profile-trigger")
      ) {
        setShowComponent(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [setShowComponent]);

  return (
    <nav
      className={`relative z-40 flex items-center justify-between px-6 py-3 rounded-2xl backdrop-blur-xl border shadow-md transition-all duration-300 
        ${admin
          ? "bg-indigo-100/60 dark:bg-indigo-950/40 border-indigo-400/40 dark:border-indigo-700/40 text-gray-800 dark:text-gray-100 mt-2"
          : "bg-white/70 dark:bg-gray-900/70 border-gray-200 dark:border-gray-800 text-gray-900 dark:text-gray-100 mb-3"
        }`}
    >
      {/* Left: Title / Logo */}
        <Link to='/' className="flex items-center gap-2">
        {admin && (
          <Shield
          size={22}
          className="text-indigo-600 dark:text-indigo-400 drop-shadow-sm"
          />
        )}
        <h1
          className={`text-2xl font-semibold tracking-tight ${
            admin
            ? "text-indigo-700 dark:text-indigo-300"
            : "text-gray-800 dark:text-gray-100"
          }`}
          >
          {title || (admin ? "Admin Dashboard" : "Dashboard")}
        </h1>
          </Link>

      {/* Right Controls */}
      <ul className="flex items-center gap-4">
        {/* Search */}
        <li>
          <button
            type="button"
            className={`p-2 rounded-full transition-all duration-200 ${
              admin
                ? "hover:bg-indigo-200/50 dark:hover:bg-indigo-800/50"
                : "hover:bg-gray-100 dark:hover:bg-gray-800"
            }`}
          >
            <Search size={20} />
          </button>
        </li>

        {/* Theme Toggle */}
        <li>
          <SwitchTheme />
        </li>

        {/* Profile */}
        <li>
          <button
            type="button"
            onClick={toggleComponent}
            className={`profile-trigger relative p-2 border-2 rounded-full transition-all duration-200 ${
              admin
                ? "border-indigo-400 hover:border-indigo-600 dark:border-indigo-500 dark:hover:border-indigo-300"
                : "border-gray-300 dark:border-gray-600 hover:border-indigo-500"
            }`}
          >
            <User size={20} />
          </button>
        </li>
      </ul>

      {/* Dropdown */}
      <div ref={dropdownRef} className="absolute right-0 top-14">
        {showComponent && <ProfileCtn />}
      </div>
    </nav>
  );
}

export default Nav;
