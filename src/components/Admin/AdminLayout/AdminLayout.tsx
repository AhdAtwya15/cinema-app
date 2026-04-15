import { Outlet, useLocation } from "react-router-dom";
import AdminNavBar from "./AdminNavBar";
import { useEffect } from "react";

const AdminLayout = () => {
   const { pathname } = useLocation();



    useEffect(() => {
      window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
    }, [pathname]);
  
  return (
    <div className="min-h-screen bg-[#191C33] text-white font-['Montserrat',sans-serif]">
      <AdminNavBar />
      <main className="max-w-7xl mx-auto px-4 py-6">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;