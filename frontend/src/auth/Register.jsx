import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAppContext } from "../context/AppContext";
import toast from "react-hot-toast";
import { ArrowLeft } from "lucide-react";

function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { setUser, setShowComponent } = useAppContext();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const request = await fetch(`${import.meta.env.VITE_BACKEND_URL}api/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
        credentials: "include",
      });

      const response = await request.json();

      if (response.success) {
        toast.success(response.message);
        setShowComponent(false);
        setUser(true);
        navigate("/");
      } else {
        toast.error(response.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 via-white to-gray-100 dark:from-gray-900 dark:via-gray-950 dark:to-black p-6">
      <form
        onSubmit={handleSubmit}
        className="relative w-full max-w-sm p-8 rounded-2xl bg-white/80 dark:bg-gray-900/70 backdrop-blur-xl shadow-xl border border-gray-200 dark:border-gray-700 transition-all duration-300 hover:shadow-2xl"
      >
      <Link to='/' className=" absolute -top-9 left-0 flex  gap-2 items-center  px-1 py-0.5 w-fit text-indigo-600 rounded-full dark:text-indigo-400  ">
          <ArrowLeft
          size={22}
          className="  drop-shadow-sm"
          />
          Back to home
          </Link>
        <h2 className="text-3xl font-semibold text-center text-gray-800 dark:text-white mb-6">
          Create Account ✨
        </h2>

        {/* Name Field */}
        <div className="mb-4">
          <label
            htmlFor="name"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
          >
            Full Name
          </label>
          <input
            type="text"
            id="name"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full rounded-xl border border-gray-300 dark:border-gray-700 bg-white/70 dark:bg-gray-800/50 px-4 py-2.5 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200 placeholder:text-gray-400"
            placeholder="John Doe"
          />
        </div>

        {/* Email Field */}
        <div className="mb-4">
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
          >
            Email Address
          </label>
          <input
            type="email"
            id="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full rounded-xl border border-gray-300 dark:border-gray-700 bg-white/70 dark:bg-gray-800/50 px-4 py-2.5 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200 placeholder:text-gray-400"
            placeholder="you@example.com"
          />
        </div>

        {/* Password Field */}
        <div className="mb-5">
          <label
            htmlFor="password"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
          >
            Password
          </label>
          <input
            type="password"
            id="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full rounded-xl border border-gray-300 dark:border-gray-700 bg-white/70 dark:bg-gray-800/50 px-4 py-2.5 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200 placeholder:text-gray-400"
            placeholder="••••••••"
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full py-2.5 mt-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-semibold shadow-md hover:shadow-lg transition-all duration-300 active:scale-[0.98]"
        >
          Sign Up
        </button>

        {/* Divider */}
        <div className="flex items-center my-6">
          <span className="h-px flex-1 bg-gray-200 dark:bg-gray-700"></span>
          <span className="mx-3 text-sm text-gray-500 dark:text-gray-400">
            or
          </span>
          <span className="h-px flex-1 bg-gray-200 dark:bg-gray-700"></span>
        </div>

        {/* Login Link */}
        <p className="text-center text-sm text-gray-600 dark:text-gray-400">
          Already have an account?{" "}
          <Link
            to="/profile/login"
            className="text-indigo-600 dark:text-indigo-400 hover:underline font-medium"
          >
            Sign in
          </Link>
        </p>
      </form>
    </div>
  );
}

export default Register;
