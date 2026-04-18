import { Outlet, useLocation } from "react-router-dom";
import React, { useEffect } from "react";
import Navbar from "../utility/Navbar";
import Footer from "../utility/Footer";
import StructuredData from "../utility/StructuredData"; // Added

const THEATER_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "MovieTheater",
  "name": "Luxure Cinema",
  "url": "https://luxurecinema.com",
  "image": "https://res.cloudinary.com/df2nbeovz/image/upload/f_auto,q_auto,w_800/v1771713434/MovieBannerVideo_i9t2uk.jpg",
  "description": "Experience cinema like never before. Book tickets for the latest blockbusters.",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "123 Cinema Blvd",
    "addressLocality": "Hollywood",
    "addressRegion": "CA",
    "postalCode": "90210",
    "addressCountry": "US"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": 34.0928,
    "longitude": -118.3287
  },
  "telephone": "+18001234567"
};

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

      <StructuredData data={THEATER_SCHEMA} />
      <Navbar />

      <main>
        <Outlet />
      </main>

      <Footer />
    </div>
  );
};

export default Layout;