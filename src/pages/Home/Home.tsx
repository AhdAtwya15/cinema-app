import React, { Suspense } from 'react';
import Banner from "../../components/Home/Banner";
import ScrollToTop from "../../components/utility/ScrollToTop";
import { LazyMotion, domAnimation } from "framer-motion";


const MoviesSection = React.lazy(() => import("../../components/Home/MoviesSection"));
const LatestTrailers = React.lazy(() => import("../../components/Home/LatestTrailers"));
const NewsSection = React.lazy(() => import("../../components/Home/News"));


const MoviesFallback = () => (
    <section className="py-20 px-6 sm:px-10 lg:px-20 min-h-[600px] bg-[#191C33]">
        <div className="max-w-7xl mx-auto flex flex-col gap-12">
            <div className="space-y-4">
                <div className="h-4 w-32 bg-white/5 rounded-full animate-pulse" />
                <div className="h-10 w-full md:w-[400px] bg-white/5 rounded-xl animate-pulse" />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                {[1, 2, 3, 4].map((n) => (
                    <div key={n} className="aspect-[2/3] bg-white/5 rounded-2xl animate-pulse" />
                ))}
            </div>
        </div>
    </section>
);

const TrailersFallback = () => (
    <section className="py-20 px-6 sm:px-10 lg:px-20 min-h-[500px] bg-[#1A1A2E]">
        <div className="max-w-7xl mx-auto flex flex-col gap-10">
            <div className="space-y-4">
                <div className="h-4 w-32 bg-white/5 rounded-full animate-pulse" />
                <div className="h-10 w-64 bg-white/5 rounded-xl animate-pulse" />
            </div>
            <div className="flex flex-col lg:flex-row gap-8">
                <div className="w-full lg:w-2/3 aspect-video bg-white/5 rounded-3xl animate-pulse" />
                <div className="w-full lg:w-1/3 flex flex-col gap-4">
                    {[1, 2, 3].map(n => (
                        <div key={n} className="h-32 bg-white/5 rounded-2xl animate-pulse" />
                    ))}
                </div>
            </div>
        </div>
    </section>
);

const NewsFallback = () => (
    <section className="py-20 px-6 sm:px-10 lg:px-20 min-h-[400px] bg-[#0D0D1F]">
        <div className="max-w-7xl mx-auto flex flex-col gap-10">
            <div className="space-y-4">
                <div className="h-4 w-32 bg-white/5 rounded-full animate-pulse" />
                <div className="h-10 w-48 bg-white/5 rounded-xl animate-pulse" />
            </div>
            <div className="flex flex-col lg:flex-row gap-8">
                <div className="w-full lg:w-[65%] h-[400px] bg-white/5 rounded-3xl animate-pulse" />
                <div className="w-full lg:w-[35%] flex flex-col gap-6">
                    {[1, 2].map(n => (
                        <div key={n} className="h-40 bg-white/5 rounded-2xl animate-pulse" />
                    ))}
                </div>
            </div>
        </div>
    </section>
);

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