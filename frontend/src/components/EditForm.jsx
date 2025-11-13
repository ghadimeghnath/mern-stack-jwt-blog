import React from "react";
import { useState } from "react";
import { useAppContext } from "../context/AppContext";
import { useEffect } from "react";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";
import { AlignLeftIcon, ArrowLeft } from "lucide-react";

function EditForm() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const { id } = useParams();
  const [form, setForm] = useState({
    title: "",
    subtitle: "",
    content: "",
  });

  const { fetchBlogs } = useAppContext();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const request = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}blogs/api/blogs/updatebyid`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ id, form }),
          credentials: "include",
        }
      );

      const data = await request.json();

      if (!data.success) {
        toast.error(data.message);
      } else {
        toast.success(data.message || "Blog updated successfully!");
        fetchBlogs();
        navigate("/admin/update");
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };
  const handleCancel = (e) => {
    e.preventDefault();
    setForm({
      title: "",
      subtitle: "",
      content: "",
    });
  };

  const fetchById = async (e) => {
    try {
      console.log(id);

      const request = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}blogs/api/blogs/blogbyid`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ id }),
          credentials: "include",
        }
      );

      const data = await request.json();

      if (!data.success) {
        toast.error(data.message);
      } else {
        setForm({
          title: data.blog.title,
          subtitle: data.blog.subtitle,
          content: data.blog.content,
        });
      }
    } catch (error) {
      toast.error("Something went wrong!");
    }
  };
  useEffect(() => {
    if (id) {
      fetchById();
    }
  }, []);
  return (
    <div className="w-full h-full flex flex-col gap-6">
      {/* Form Container */}
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-5 bg-white/80 dark:bg-gray-900/70 backdrop-blur-lg border border-gray-200 dark:border-gray-800 rounded-2xl p-5 shadow-md transition-all duration-300 hover:shadow-lg w-full"
      >
        {/* Title */}
        <div className="flex flex-col gap-2">
          <button
            type="button"
            className="w-fit flex gap-1 items-center justify-between border  rounded py-1 px-3 text-indigo-600 dark:text-indigo-400 cursor-pointer"
            onClick={(e) => {
              navigate("/admin/update");
            }}
          >
            <ArrowLeft className="" />
            <h1>Go Back</h1>
          </button>
          <label
            htmlFor="title"
            className="text-sm font-medium text-gray-700 dark:text-gray-300"
          >
            Title
          </label>
          <input
            id="title"
            type="text"
            value={form.title}
            onChange={(e) => setForm({ title: e.target.value })}
            placeholder="Enter blog title"
            className="w-full rounded-xl border border-gray-300 dark:border-gray-700 bg-white/70 dark:bg-gray-800/50 px-4 py-2.5 text-gray-900 dark:text-gray-100 placeholder:text-gray-400 focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all duration-200"
          />
        </div>

        {/* Subtitle */}
        <div className="flex flex-col gap-2">
          <label
            htmlFor="subtitle"
            className="text-sm font-medium text-gray-700 dark:text-gray-300"
          >
            Subtitle
          </label>
          <input
            id="subtitle"
            type="text"
            value={form.subtitle}
            onChange={(e) => setForm({ subtitle: e.target.value })}
            placeholder="Enter blog subtitle"
            className="w-full rounded-xl border border-gray-300 dark:border-gray-700 bg-white/70 dark:bg-gray-800/50 px-4 py-2.5 text-gray-900 dark:text-gray-100 placeholder:text-gray-400 focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all duration-200"
          />
        </div>

        {/* Content */}
        <div className="flex flex-col gap-2 flex-1">
          <label
            htmlFor="content"
            className="text-sm font-medium text-gray-700 dark:text-gray-300"
          >
            Content
          </label>
          <textarea
            id="content"
            value={form.content}
            onChange={(e) => setForm({ content: e.target.value })}
            rows={7}
            placeholder="Write your blog content here..."
            className="w-full rounded-xl border border-gray-300 dark:border-gray-700 bg-white/70 dark:bg-gray-800/50 px-4 py-3 text-gray-900 dark:text-gray-100 placeholder:text-gray-400 focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all duration-200 resize-none"
          />
        </div>

        {/* Buttons */}
        <div className="flex justify-end gap-3 mt-2">
          <button
            type="button"
            onClick={handleCancel}
            disabled={!form.title && !form.subtitle && !form.content}
            className={`px-5 py-2.5 rounded-xl border border-gray-400 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 transition-all duration-200
              ${
                !form.title && !form.subtitle && !form.content
                  ? "cursor-not-allowed"
                  : ""
              }
              `}
          >
            Clear
          </button>
          <button
            type="submit"
            disabled={loading || !form.title && !form.subtitle && !form.content}
            className={`px-6 py-2.5 rounded-xl text-white font-medium shadow-md active:scale-[0.98] transition-all duration-200 ${
              loading || !form.title || !form.subtitle || !form.content
                ? "bg-indigo-400 cursor-not-allowed"
                : "bg-indigo-600 hover:bg-indigo-700"
            }`}
          >
            {loading ? "Editing..." : "Edit"}
          </button>
        </div>
      </form>
    </div>
  );
}

export default EditForm;
