import { useState } from "react";
import toast from "react-hot-toast";

function Create() {
  const [title, setTitle] = useState("");
  const [subtitle, setSubTitle] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);
  const baseUrl = "http://localhost:3001/blogs/";

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const request = await fetch(`${baseUrl}api/blogs/addBlogs/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, subtitle, content }),
      });

      const response = await request.json();

      if (!request.ok) {
        toast.error(response.err || "Failed to create blog");
      } else {
        toast.success(response.msg || "Blog created successfully!");
        setTitle("");
        setSubTitle("");
        setContent("");
      }
    } catch (error) {
      toast.error("Something went wrong!");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    setTitle("");
    setSubTitle("");
    setContent("");
  };

  return (
    <div className="w-full h-full flex flex-col gap-6">

      {/* Form Container */}
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-5 bg-white/80 dark:bg-gray-900/70 backdrop-blur-lg border border-gray-200 dark:border-gray-800 rounded-2xl p-5 shadow-md transition-all duration-300 hover:shadow-lg w-full"
      >
        {/* Title */}
        <div className="flex flex-col gap-2">
          <label
            htmlFor="title"
            className="text-sm font-medium text-gray-700 dark:text-gray-300"
          >
            Title
          </label>
          <input
            id="title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
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
            value={subtitle}
            onChange={(e) => setSubTitle(e.target.value)}
            required
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
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
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
            className="px-5 py-2.5 rounded-xl border border-gray-400 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 transition-all duration-200"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={loading}
            className={`px-6 py-2.5 rounded-xl text-white font-medium shadow-md active:scale-[0.98] transition-all duration-200 ${
              loading
                ? "bg-indigo-400 cursor-not-allowed"
                : "bg-indigo-600 hover:bg-indigo-700"
            }`}
          >
            {loading ? "Submitting..." : "Submit"}
          </button>
        </div>
      </form>
    </div>
  );
}

export default Create;
