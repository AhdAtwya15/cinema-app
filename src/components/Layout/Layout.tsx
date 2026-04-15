import { Outlet, useLocation } from "react-router-dom";
import React, { useEffect } from "react";
import Navbar from "../utility/Navbar";
import Footer from "../utility/Footer";

// adjust path to match your project

const Layout: React.FC = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  }, [pathname]);

  return (
    <div
      className="min-h-screen flex flex-col"
      style={{
        background: "linear-gradient(160deg, #1A1A2E 0%, #0D0D1F 55%, #111120 100%)",
        color: "white",
      }}
    >

      <Navbar />

      <main>
        <Outlet />
      </main>

      <Footer />
    </div>
  );
};

export default Layout;