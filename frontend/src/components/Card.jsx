import { useState, useEffect } from "react";
import { ArrowRight } from "lucide-react";
import blogImg from "/images/blog.webp";
import { useAppContext } from "../context/AppContext";

function Card() {
  const {blogs, setBlogs} = useAppContext();

  return (
    <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4">
      {blogs.map((blog) => (
        <div
          key={blog._id}
          className="group relative bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
        >
          {/* Image */}
          <div className="h-48 w-full overflow-hidden">
            <img
              src={blogImg}
              alt={blog.title}
              className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
          </div>

          {/* Content */}
          <div className="p-4 flex flex-col justify-between min-h-[150px]">
            <h1 className="text-lg font-semibold mb-1 line-clamp-1 text-gray-900 dark:text-gray-100">
              {blog.title}
            </h1>
            <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2">
              {blog.subtitle}
            </p>
          </div>

          {/* Gradient Overlay + Icon */}
          <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-b from-transparent to-white dark:to-gray-900 pointer-events-none"></div>
          <ArrowRight
            className="absolute bottom-3 right-3 text-indigo-600 dark:text-indigo-400 transform rotate-45 group-hover:translate-x-1 group-hover:translate-y-1 transition-all duration-300"
            size={28}
          />
        </div>
      ))}
    </div>
  );
}

export default Card;
