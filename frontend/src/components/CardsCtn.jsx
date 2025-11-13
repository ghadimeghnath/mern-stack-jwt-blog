import React, { lazy, Suspense, useState } from "react";
import Loading from "./Loding";
import { useAppContext } from "../context/AppContext";
const Card = lazy(() => import("./Card"));

function CardsCtn({ isAdmin = false, admin }) {
  const [height, setHeight] = useState(50);
  const { blogCount } = useAppContext();

  const maxHeight = 150;

  const toggleExpand = (e) => {
    e.preventDefault();
    if (height < maxHeight) {
      const newHeight = height + 50;
      setHeight(newHeight);
    } else {
      setHeight(50);
    }
  };

  return (
    <section
      className={`w-full rounded-2xl bg-white/80 dark:bg-gray-900/70 backdrop-blur-lg border border-gray-200 dark:border-gray-800 shadow-md transition-all duration-500 flex flex-col ${
        isAdmin ? "p-4" : "p-8"
      }`}
    >
      {/* Header (Admin only) */}
      {isAdmin && (
        <header className="flex justify-between mb-4 border-b border-gray-200 dark:border-gray-800 pb-2">
          <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
            Admin Dashboard
          </h2>
          <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
            blogs : {blogCount}
          </h2>
        </header>
      )}

      {/* Cards or Admin Outlet */}
      <div
        className={`transition-all duration-500 overflow-hidden ${
          isAdmin
            ? "flex-1 overflow-y-auto max-h-[75vh] pr-2 scrollbar-thin scrollbar-thumb-gray-400 dark:scrollbar-thumb-gray-600"
            : ""
        }`}
        style={!isAdmin ? { maxHeight: `${height}vh` } : {}}
      >
        {isAdmin ? (
          <div className="flex-1">{admin}</div>
        ) : (
          <Suspense fallback={<Loading />}>
            
            <Card />
          </Suspense>
        )}
      </div>

      {/* View More Button (Client Only) */}
      {!isAdmin && (
        <div className="flex justify-center mt-6 pb-4">
          <button
            onClick={toggleExpand}
            className="px-6 py-2 rounded-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium shadow-md hover:shadow-lg active:scale-95 transition-all duration-200"
          >
            {height >= maxHeight ? "View Less" : "View More"}
          </button>
        </div>
      )}
    </section>
  );
}

export default CardsCtn;
