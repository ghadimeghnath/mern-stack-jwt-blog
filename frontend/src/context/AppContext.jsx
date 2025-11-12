import { useContext } from "react";
import { useEffect } from "react";
import { useState } from "react";
import { createContext } from "react";
import toast from "react-hot-toast";
import { Navigate, useLocation } from "react-router-dom";

export const AppContext = createContext();

export const AppContextProvider = ({ children }) => {
  const [showComponent, setShowComponent] = useState(false);
  const [blogs, setBlogs] = useState([]);
  const [blogCount, setBlogCount] = useState(0);
  const [active, setActive] = useState("");
  const [user, setUser] = useState(false);
  const [admin, setAdmin] = useState(false);


  // user authentication
  const checkUserAuthStatus = async () => {
    try {
      const request = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}api/auth/is-auth`,
        {
          method: "GET",
          credentials: "include",
        }
      );
      const data = await request.json();
      if (data.success) {
        setUser(true);
      }
    } catch (error) {
      toast.error(error.message);
      setUser(false);
    }
  };

  //admin authentication

  const checkAdminAuthentication = async () => {
    try {
      const req = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}api/auth/admin/is-admin`,
        {
          method: "GET",
          credentials: "include",
        }
      );
      const data = await req.json();

      if (data.success) {
        setAdmin(true);
        return <Navigate to={"/admin"} replace />;
      }
    } catch (error) {
      toast.error(error.message);
      setAdmin(false);
    }
  };

  //fetch blogs on every render

  const fetchBlogs = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}blogs/api/allblogs`,
        {
          method: "GET",
          credentials: "include",
        }
      );
      const data = await response.json();

      if (response.ok) {
        setBlogs(data.data);
        setBlogCount(data.blogCount);
      } else {
        console.error(data.message);
      }
    } catch (error) {
      console.error("Failed to fetch blogs:", error);
    }
  };

  useEffect(() => {
    fetchBlogs();
    checkUserAuthStatus();
    checkAdminAuthentication();
  }, []);

  const value = {
    showComponent,
    setShowComponent,
    active,
    setActive,
    user,
    setUser,
    admin,
    setAdmin,
    checkUserAuthStatus,
    checkAdminAuthentication,
    fetchBlogs,
    blogs,
    setBlogs,
    blogCount,
    setBlogCount,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useAppContext = () => {
  return useContext(AppContext);
};
