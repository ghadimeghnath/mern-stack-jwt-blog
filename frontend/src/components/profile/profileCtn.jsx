import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAppContext } from "../../context/AppContext";
import toast from "react-hot-toast";

function ProfileCtn() {
  const { user, setUser, admin, setAdmin } = useAppContext();
  const navigate = useNavigate();
  const adminLocation = useLocation().pathname.includes("/admin");

  const handleUserLogout = async () => {
    try {
      const request = await fetch(`${import.meta.env.VITE_BACKEND_URL}api/auth/logout`, {
        method: "GET",
        credentials: "include",
      });
      const response = await request.json();
      if (response.success) {
        toast.success(response.message);
        navigate("/");
        setUser(false);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const handleAdminLogout = async () => {
    try {
      const req = await fetch(`${import.meta.env.VITE_BACKEND_URL}api/auth/admin/logout`, {
        method: "GET",
        credentials: "include",
      });
      const data = await req.json();
      if (data.success) {
        toast.success(data.message);
        navigate("/admin/login");
        setAdmin(false);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div className="animate-fade-in w-48 rounded-2xl bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl border border-gray-200 dark:border-gray-700 shadow-xl flex flex-col overflow-hidden">
      {admin ? (
        <>
          {adminLocation ? (
            <Link
              to="/"
              className="px-4 py-2 text-center text-sm font-medium text-gray-800 dark:text-gray-200 hover:bg-red-100/60 dark:hover:bg-indigo-900/30 transition-all duration-200"
            >
              Go to Home
            </Link>
          ) : (
            <Link
              to="/admin"
              className="px-4 py-2 text-center text-sm font-medium text-gray-800 dark:text-gray-200 hover:bg-red-100/60 dark:hover:bg-indigo-900/30 transition-all duration-200"
            >
              Go to admin
            </Link>
          )}
          <Link
            to="/admin/login"
            onClick={handleAdminLogout}
            className="px-4 py-2 text-center text-sm font-medium text-gray-800 dark:text-gray-200 hover:bg-red-100/60 dark:hover:bg-red-900/30 transition-all duration-200"
          >
            Admin Log out
          </Link>
        </>
      ) : user ? (
        <Link
          to="/"
          onClick={handleUserLogout}
          className="px-4 py-2 text-center text-sm font-medium text-gray-800 dark:text-gray-200 hover:bg-red-100/60 dark:hover:bg-red-900/30 transition-all duration-200"
        >
          Log out
        </Link>
      ) : (
        <>
          <Link
            to="/profile/register"
            className="px-4 py-2 text-center text-sm font-medium text-gray-800 dark:text-gray-200 hover:bg-indigo-100/60 dark:hover:bg-indigo-900/30 transition-all duration-200"
          >
            Sign up
          </Link>
          <Link
            to="/profile/login"
            className="px-4 py-2 text-center text-sm font-medium text-gray-800 dark:text-gray-200 hover:bg-indigo-100/60 dark:hover:bg-indigo-900/30 transition-all duration-200"
          >
            Log in
          </Link>
        </>
      )}
    </div>
  );
}

export default ProfileCtn;
