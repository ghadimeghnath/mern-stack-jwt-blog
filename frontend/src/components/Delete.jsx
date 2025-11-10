import { useState, useEffect } from "react";
import { ArrowRight, Trash2Icon } from "lucide-react";
import tshirt from "/images/tshirt.jpg";


function Delete() {
  const [blogs, setBlogs] = useState([]);
  const [blogId, setBlogId] = useState('');

  const fetchBlogs = async () => {
    try {
      const response = await fetch("http://localhost:3001/blogs/api/allblogs", {
        method: "GET",
        credentials: "include",
      });
      const data = await response.json();

      if (response.ok) {
        setBlogs(data.data);
      } else {
        console.error(data.message);
      }
    } catch (error) {
      console.error("Failed to fetch blogs:", error);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  return (
    <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4">
      {blogs.map((blog) => (
        <div onClick={()=>setBlogId(blog._id)} className={`${blogId === blog._id ? "opacity-30": ""}`}>
          <div
            key={blog._id}
            className="group relative bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
          >
            {/* Image */}
            <div className="h-48 w-full overflow-hidden">
              <img
                src={tshirt}
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
            <Trash2Icon
              className="absolute bottom-3 right-3 text-red-400  group-hover:translate-x-1 group-hover:translate-y-1 transition-all duration-300"
              size={28}
            />
          </div>
        </div>
      ))}
    </div>
  );
}

export default Delete;
