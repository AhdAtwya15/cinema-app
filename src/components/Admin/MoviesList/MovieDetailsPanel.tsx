import React from "react";
import type { IMovie } from "../../../types";
import { Star, Clock, MapPin, Play,  Film } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { fadeSlideUpVariant } from "../../../utils/animations";
import InfoCard from "../../Movies/MovieDetails/InfoCard";

interface MovieDetailsPanelProps {
  movie: IMovie | null;
}

const MovieDetailsPanel: React.FC<MovieDetailsPanelProps> = ({ movie }) => {
  return (
    <div className="sticky top-8 bg-[#1A1A2E]/50 backdrop-blur-xl border border-white/5 rounded-3xl overflow-hidden shadow-2xl h-[calc(100vh-8rem)] flex flex-col">
      <AnimatePresence mode="wait">
        {!movie ? (
          <motion.div
            key="placeholder"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex-1 flex flex-col items-center justify-center p-8 text-center"
          >
            <div className="w-20 h-20 bg-white/5 rounded-2xl flex items-center justify-center mb-6 rotate-12 group-hover:rotate-0 transition-transform duration-500">
              <Film className="w-10 h-10 text-[#D4A853]/40" />
            </div>
            <h3 className="text-xl font-semibold text-white mb-2">Movie Details</h3>
            <p className="text-gray-500 text-sm max-w-[200px]">
              Click "View Details" on a movie card to see more information here.
            </p>
          </motion.div>
        ) : (
          <motion.div
            key={movie._id}
            variants={fadeSlideUpVariant}
            initial="hidden"
            animate="visible"
            className="flex-1 overflow-y-auto details-panel p-6 sm:p-8"
          >
            <div className="flex items-center gap-2 mb-6">
              <span className={`w-2 h-2 ${movie.type==="featured" ? "bg-red-600" : movie.type==="coming-soon" ? "bg-yellow-500" : movie.type==="latest-trailer" ? "bg-green-600" : "bg-red-600"} rounded-full animate-pulse`} />
              <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">
                {movie.type==="featured" ? "Live" : movie.type==="coming-soon" ? "Coming Soon" : movie.type==="latest-trailer" ? "Latest Trailer" : "Live"}
              </span>
            </div>

            <div className="flex flex-col gap-6 mb-8">
              <div className="relative aspect-3/4 rounded-2xl overflow-hidden shadow-2xl">
                <img
                  src={movie.poster}
                  alt={movie.movieName}
                  width="600"
                  height="800"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-linear-to-t from-[#1A1A2E] via-transparent to-transparent opacity-80" />
              </div>
              
              <div>
                <h2 className="text-3xl font-bold text-white mb-3 font-serif leading-tight">
                  {movie.movieName}
                </h2>
                <div className="flex flex-wrap gap-3">
                  {movie.categories.map((cat) => (
                    <span
                      key={cat}
                      className="px-3 py-1 bg-white/5 border border-white/10 rounded-lg text-xs text-gray-400 capitalize"
                    >
                      {cat}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-8">
              <div className="p-4 bg-white/5 rounded-2xl border border-white/5">
                <div className="flex items-center gap-2 text-[#D4A853] mb-1">
                  <Star className="w-4 h-4 fill-current" />
                  <span className="text-sm font-bold">{movie.rating}</span>
                </div>
                <p className="text-[10px] text-gray-500 uppercase font-bold tracking-wider">Rating</p>
              </div>
              <div className="p-4 bg-white/5 rounded-2xl border border-white/5">
                <div className="flex items-center gap-2 text-blue-400 mb-1">
                  <Clock className="w-4 h-4" />
                  <span className="text-sm font-bold">{Math.floor(movie.duration / 60) === 0 ? "" : Math.floor(movie.duration / 60) + "h"} {movie.duration % 60 === 0 ? "" : movie.duration % 60 + "m"}</span>
                </div>
                <p className="text-[10px] text-gray-500 uppercase font-bold tracking-wider">Duration</p>
              </div>
            </div>

            <div className="space-y-6 mb-8">
              <div className="flex items-start gap-4">
                <div className="p-2.5 bg-white/5 rounded-xl">
                  <MapPin className="w-5 h-5 text-[#D4A853]" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white mb-1">Auditorium</h4>
                  <p className="text-sm text-gray-400">{movie.auditorium}</p>
                </div>
              </div>

              <div className="space-y-4">
                <h4 className="text-sm font-bold text-white">Pricing Breakdown</h4>
                <div className="grid grid-cols-1 gap-2">
                  <div className="flex items-center justify-between p-3 bg-white/5 rounded-xl border border-white/5">
                    <span className="text-sm text-gray-400">Standard Seat</span>
                    <span className="text-md font-bold text-[#D4A853] flex items-center">
                       {movie.seatPrices.standard} EGP
                    </span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-white/5 rounded-xl border border-white/5">
                    <span className="text-sm text-gray-400">Recliner Seat</span>
                    <span className="text-md font-bold text-[#D4A853] flex items-center">
                      {movie.seatPrices.recliner} EGP
                    </span>
                  </div>
                </div>
              </div>

              {movie.story && (
                  <div className="space-y-3 pt-4 border-t border-white/5">
                      <h4 className="text-sm font-bold text-white">The Story</h4>
                      <p className="text-sm text-gray-400 leading-relaxed font-light">{movie.story}</p>
                  </div>
              )}

              {movie.cast && movie.cast.length > 0 && (
                  <div className="space-y-3 pt-4 border-t border-white/5">
                    <h4 className="text-sm uppercase tracking-wider font-serif font-bold text-white">Cast</h4>
                      <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-none">
                          {movie.cast.map((member, idx) => (
                              <div key={idx} className="flex flex-col items-center gap-2 min-w-[60px]">
                                  <div className="w-12 h-12 rounded-full overflow-hidden border border-white/10">
                                      <img src={member.preview} alt={member.name} width="48" height="48" className="w-full h-full object-cover" />
                                  </div>
                                  <span className="text-[10px] text-gray-400 text-center line-clamp-1">{member.name}</span>
                              </div>
                          ))}
                      </div>
                  </div>
              )}

               <motion.div
                                 variants={fadeSlideUpVariant}
                                 initial="hidden"
                                 whileInView="visible"
                                 viewport={{ once: true }}
                                 className="flex flex-col gap-16"
                             >
             
                                 {(movie.directors?.length > 0 || movie.producers?.length > 0) && (
                                     <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                                         {movie.directors?.length > 0 && (
                                             <InfoCard
                                                 title="Directed By"
                                                 items={movie.directors}
                                                 isSmall={true}
                                             />
                                         )}
                                         {movie.producers?.length > 0 && (
                                             <InfoCard
                                                 title="Produced By"
                                                 items={movie.producers}
                                                 isSmall={true}
                                             />
                                         )}
                                     </div>
                                 )}
                             </motion.div>
            </div>

            <a
              href={movie.trailerUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-3 w-full py-4 bg-linear-to-br from-[#D4A853] via-[#F0C97A] to-[#B8892F] hover:bg-[#b38f4a] text-[#191C32] font-bold rounded-2xl shadow-lg hover:shadow-[rgba(212,168,83,0.45)] transform hover:-translate-y-0.5 transition-all duration-300 group"
            >
              <Play className="w-5 h-5 fill-current transition-transform group-hover:scale-110" />
              Watch Official Trailer
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default MovieDetailsPanel;
