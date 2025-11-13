import { useState, useEffect } from "react";
import { ArrowRight, Trash2Icon, X } from "lucide-react";
import blogImg from "/images/blog.webp";
import toast from "react-hot-toast";
import { useAppContext } from "../context/AppContext";

function Delete() {
  const [blogId, setBlogId] = useState("");
  const [blogTitle, setBlogTitle] = useState("");
  const [deleteForm, setDeleteForm] = useState(false);
  const {blogs, setBlogs, fetchBlogs} = useAppContext()

  const handleDelete = async (e) => {
    e.preventDefault()
    try {
      const req = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}blogs/api/blogs/deleteBlog`,
        {
          method: "POST",
          body: JSON.stringify({ blogId, blogTitle }),
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        }
      );
      const data = await req.json();
      if (data.success) {
        setBlogId("")
        setDeleteForm(false);
        fetchBlogs();
        toast.success(data.message);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const DeleteForm = () => {
    return (
      <div className="flex justify-center items-center absolute h-full w-full justify-self-center z-50 bg-black/70" >
        <form onClick={(e)=> e.stopPropagation()} className="flex flex-col-reverse xl:flex-row  gap-2 justify-center items-center text-white">
          <button
            onClick={(e) => {
              e.preventDefault();
              setDeleteForm(false);
            }}
            className="py-2 px-3 rounded border flex justify-center items-center gap-1 cursor-pointer hover:bg-blue-800 transition-all duration-300"
          >
            <X/>
            Cancel
          </button>
          <button
            type="submit"
            onClick={(e) => {handleDelete(e)}}
            className="py-2 px-3 rounded border flex justify-center items-center gap-1 cursor-pointer bg-red-600 hover:bg-red-400 transition-all duration-300"
          >
            <Trash2Icon/>
            Delete
          </button>
        </form>
      </div>
    );
  };
  return (
    <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4">
      {blogs.map((blog) => (
        <div
         onClick={() => {
            setDeleteForm(true);
            setBlogId(blog._id);
            setBlogTitle(blog.title);
          }}
          key={blog._id}
          className={`group relative bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 `}
        >
          {blogId === blog._id && deleteForm && <DeleteForm/>}
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
          <Trash2Icon
            className="absolute bottom-3 right-3 text-red-400  group-hover:translate-x-1 group-hover:translate-y-1 transition-all duration-300"
            size={28}
           
          />
        </div>
      ))}
    </div>
  );
}

export default Delete;
