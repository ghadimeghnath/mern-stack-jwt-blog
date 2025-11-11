import Nav from "../components/Nav";
import Sidebar from "../components/Sidebar";
import CardsCtn from "../components/CardsCtn";
import { Outlet } from "react-router-dom";

function Admin() {
  return (
    <div className="relative min-h-screen flex flex-col bg-gradient-to-br from-gray-50 via-white to-gray-100 dark:from-gray-900 dark:via-gray-950 dark:to-black transition-all duration-300">
      {/* Navbar */}
      <Nav title="Admin" />

      {/* Main Content */}
      <div className="flex flex-1 mt-3 gap-3 px-4 md:px-6 pb-4 overflow-hidden">
        {/* Sidebar */}
        <div className="md:flex shrink-0">
          <Sidebar />
        </div>

        {/* Main Cards / Admin Content */}
        <main className="flex-1 overflow-hidden">
          <CardsCtn isAdmin={true} admin={<Outlet />} />
        </main>
      </div>
      
    </div>
  );
}

export default Admin;
