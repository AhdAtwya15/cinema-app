import React, { Suspense } from 'react';
import Banner from "../../components/Home/Banner";
import ScrollToTop from "../../components/utility/ScrollToTop";
import { LazyMotion, domAnimation } from "framer-motion";


const MoviesSection = React.lazy(() => import("../../components/Home/MoviesSection"));
const LatestTrailers = React.lazy(() => import("../../components/Home/LatestTrailers"));
const NewsSection = React.lazy(() => import("../../components/Home/News"));


const MoviesFallback = () => <div role="status" aria-busy="true" aria-label="Loading movies" className="w-full min-h-[600px] bg-[#191C33] flex items-center justify-center text-[#C5A059]">Loading Movies...</div>;
const TrailersFallback = () => <div role="status" aria-busy="true" aria-label="Loading trailers" className="w-full min-h-[500px] bg-[#1A1A2E] flex items-center justify-center text-[#C5A059]">Loading Trailers...</div>;
const NewsFallback = () => <div role="status" aria-busy="true" aria-label="Loading news" className="w-full min-h-[400px] bg-[#0D0D1F] flex items-center justify-center text-[#C5A059]">Loading News...</div>;

const HomePage = () => {
  return (
    <LazyMotion features={domAnimation}>
      <main className="min-h-screen">
        <Banner />
        <div className="bg-[#191C33]">
          <Suspense fallback={<MoviesFallback />}>
            <MoviesSection />
          </Suspense>
        </div>

        <div className="bg-[#1A1A2E]">
          <Suspense fallback={<TrailersFallback />}>
            <LatestTrailers />
          </Suspense>
        </div>

        <div className="bg-[#191C33]">
          <Suspense fallback={<NewsFallback />}>
            <NewsSection />
          </Suspense>
        </div>
      </main>
      <ScrollToTop />
    </LazyMotion>
  );
};

export default HomePage;