import { useState } from "react";
import { Info, Ticket } from "lucide-react";
import { Button } from "../ui/Button";
import { m } from "framer-motion";
import { slideInLeftVariant, slideInRightVariant } from "../../utils/animations";
import { getOptimizedCloudinaryUrl, getCloudinarySrcSet } from "../../utils/cloudinary";

const VIDEO_URL =
  "https://res.cloudinary.com/df2nbeovz/video/upload/f_auto,q_auto/v1771713434/MovieBannerVideo_i9t2uk.mp4";
const VIDEO_POSTER =
  "https://res.cloudinary.com/df2nbeovz/video/upload/so_1/f_auto,q_auto/v1771713434/MovieBannerVideo_i9t2uk.jpg";

const Banner = () => {
  const [videoReady, setVideoReady] = useState(false);

  return (
    <section
      aria-label="Hero Promotional Banner"
      className="relative w-full h-screen min-h-150 overflow-hidden shadow-2xl transition-all duration-500"
    >
      <img
        src={getOptimizedCloudinaryUrl(VIDEO_POSTER, { width: 1920 })}
        srcSet={getCloudinarySrcSet(VIDEO_POSTER, [640, 1024, 1920])}
        sizes="100vw"
        alt=""
        loading="eager"
        fetchPriority="high"
        className="absolute inset-0 w-full h-full object-cover"
        width="1920"
        height="1080"
      />

      <video
        autoPlay
        loop
        muted
        playsInline
        preload="none"
        aria-hidden="true"
        onCanPlay={() => setVideoReady(true)}
        className={`absolute inset-0 w-full h-full object-cover scale-105 transition-opacity duration-700 ${videoReady ? "opacity-100" : "opacity-0"
          }`}
      >
        <source src={VIDEO_URL} type="video/mp4" />
      </video>

      <div className="absolute inset-0 bg-linear-to-b from-black/60 via-black/40 to-black/80 z-10" />

      <div className="relative z-20 h-full flex flex-col items-center justify-center text-center px-6 max-w-5xl mx-auto space-y-8 overflow-hidden">

     
        <m.p
          className=" tracking-[0.3em] text-[#C5A059] uppercase text-xs md:text-sm font-semibold"
          variants={slideInLeftVariant}
          initial={false}
          animate="visible"
        >
          Welcome to Luxeure Cinema
        </m.p>

       
        <m.h1
          className="text-white text-5xl md:text-8xl font-serif leading-[0.9]"
          variants={slideInRightVariant}
          initial={false}
          animate="visible"
        >
          <span className="block font-semibold mb-2">Experience Cinema</span>
          <span className="relative  italic font-light tracking-tight">
            Like Never Before
          
            <span className="absolute top-12  md:top-25 left-0 w-full h-1.25 bg-[#C5A059] opacity-70"></span>
          </span>
        </m.h1>

        <m.p
          className="text-gray-300 text-base md:text-lg max-w-2xl leading-relaxed font-light"
          variants={slideInLeftVariant}
          initial={false}
          animate="visible"
        >
          Immerse yourself in state-of-the-art technology, premium comfort, and curated storytelling.
        </m.p>

        <m.div
          className="flex flex-col sm:flex-row items-center gap-5 pt-4"
          variants={slideInRightVariant}
          initial="hidden"
          animate="visible"
        >
          <Button variant="primary" className="flex items-center gap-2">
            <Ticket aria-hidden="true" focusable="false" className="w-5 h-5" />
            Book Movies
          </Button>

          <Button variant="outline" className="flex items-center gap-2">
            <Info aria-hidden="true" focusable="false" className="w-5 h-5" />
            More Info
          </Button>
        </m.div>
      </div>
    </section>
  );
};

export default Banner;
