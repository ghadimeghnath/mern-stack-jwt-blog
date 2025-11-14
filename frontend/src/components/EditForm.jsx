import { useState } from "react";
import { useAppContext } from "../context/AppContext";
import { useEffect } from "react";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";
import {ArrowLeft } from "lucide-react";

function EditForm() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [fileName, setFileName] = useState("Upload Image Here");
  const { id } = useParams();
  const [form, setForm] = useState({
    file: null,
    title: "",
    subtitle: "",
    content: "",
    imgUrl: "",
  });

  const { fetchBlogs } = useAppContext();

  const handleFileChange = (e) => {
    setForm((prev) => ({ ...prev, file: e.target.files[0]}))
    setFileName(e.target.files[0].name);
    setForm((prev)=>({...prev,imgUrl: ""}));
  };

  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();
       const formData = new FormData();
    formData.append("id",id);
    formData.append("blog_image",form.file)
    formData.append("title", form.title);
    formData.append("subtitle", form.subtitle);
    formData.append("content", form.content);

    try {
      const request = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}blogs/api/blogs/updatebyid`,
        {
          method: "POST",
          body: formData,
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
      file: null,
      title: "",
      subtitle: "",
      content: "",
    });
  };

  const fetchById = async (e) => {
    setLoading(true);
    try {

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
          imgUrl: data.blog.img_url,
        });
      }
    } catch (error) {
      toast.error("Something went wrong!");
    } finally {
      setLoading(false);
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
        <div className="flex flex-col gap-2">
          <button
            type="button"
            className="w-fit flex gap-1 items-center justify-between border  rounded py-1 px-3 text-indigo-600 dark:text-indigo-400 cursor-pointer"
            onClick={(e) => {
              fetchBlogs()
              navigate("/admin/update");
            }}
            >
            <ArrowLeft className="" />
            <h1>Go Back</h1>
          </button>

          {/* upload Image */}
                  <div className="relative w-full min-h-15 max-h-15 flex justify-center items-center text-white  border-2 border-indigo-400 border-dashed rounded-xl font-light cursor-pointer">
          {form.imgUrl && <img src={form.imgUrl} className="absolute left-0 top-0 w-fit h-full rounded-xl" alt="image" />}
          <h1>{fileName}</h1>
          <input
            type="file"
            name="blog_image"
            className="absolute opacity-0 top-0 left-0 h-full w-full "
            onChange={handleFileChange}
          />
        </div>
          {/* Title */}
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
            onChange={(e) => setForm((prev)=>({...prev, title: e.target.value }))}
            placeholder={loading ? "fetching Title..." : "Enter blog title"}
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
            onChange={(e) => setForm((prev)=>({...prev, subtitle: e.target.value }))}
            placeholder={
              loading ? "fetching Sub-title..." : "Enter blog sub-title"
            }
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
            onChange={(e) => setForm((prev)=>({...prev, content: e.target.value }))}
            rows={7}
            placeholder={
              loading
                ? "fetching Content..."
                : "Write your blog content here..."
            }
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
            disabled={
              loading || (!form.title && !form.subtitle && !form.content)
            }
            className={`px-6 py-2.5 rounded-xl text-white font-medium shadow-md active:scale-[0.98] transition-all duration-200 ${
              loading || !form.title && !form.subtitle && !form.content
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
