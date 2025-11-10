import { NavLink } from "react-router-dom";
import { useAppContext } from "../context/AppContext";
import { TrashIcon, Globe, Edit2 } from "lucide-react";

function Sidebar() {
  const { active, setActive } = useAppContext();

  const SideBarLinks = [
    {
      id: "1",
      SideBarLink: "/admin",
      title: "All Blogs",
      icon: <Globe size={22} />,
    },
    {
      id: "2",
      SideBarLink: "/admin/create",
      title: "Create",
      icon: <Edit2 size={21} />,
    },
    {
      id: "3",
      SideBarLink: "/admin/delete",
      title: "Delete",
      icon: <TrashIcon size={22} />,
    },
  ];

  return (
    <>
      {/* 🌐 Desktop Sidebar */}
      <aside className="hidden md:flex flex-col w-60 bg-white/80 dark:bg-gray-900/70 backdrop-blur-lg border border-gray-200 dark:border-gray-800 rounded-2xl shadow-md p-4 transition-all duration-300">
        <ul className="flex flex-col gap-1">
          {SideBarLinks.map((sideBtn) => (
            <NavLink
              key={sideBtn.id}
              to={sideBtn.SideBarLink}
              end
              className={({ isActive }) =>
                `group flex items-center gap-3 rounded-xl px-4 py-2.5 text-sm font-medium transition-all duration-300 ${
                  isActive
                    ? "bg-indigo-600 text-white shadow-md"
                    : "text-gray-700 dark:text-gray-300 hover:bg-indigo-100 dark:hover:bg-gray-800 hover:text-indigo-600 dark:hover:text-indigo-400"
                }`
              }
            >
              <span
                className={`transition-transform duration-300 ${
                  active === sideBtn.id ? "scale-110" : "group-hover:scale-110"
                }`}
              >
                {sideBtn.icon}
              </span>
              <span>{sideBtn.title}</span>
            </NavLink>
          ))}
        </ul>
      </aside>

      {/* 📱 Mobile Bottom Navbar */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 z-[9999] flex justify-around items-center bg-white/95 dark:bg-gray-900/95 backdrop-blur-lg border-t border-gray-300 dark:border-gray-700 shadow-lg py-2">
        {SideBarLinks.map((sideBtn) => (
          <NavLink
            key={sideBtn.id}
            to={sideBtn.SideBarLink}
            end
            className={({ isActive }) =>
              `flex flex-col items-center justify-center gap-1 px-2 py-1 transition-all duration-200 ${
                isActive
                  ? "text-indigo-600 dark:text-indigo-400"
                  : "text-gray-600 dark:text-gray-400 hover:text-indigo-500"
              }`
            }
          >
            <span>{sideBtn.icon}</span>
            <span className="text-[10px] font-medium">{sideBtn.title}</span>
          </NavLink>
        ))}
      </nav>
    </>
  );
}

export default Sidebar;
