import React from "react";
import AdminMovieCard from "./AdminMovieCard";
import type { IMovie } from "../../../types";
import { motion, AnimatePresence } from "framer-motion";
import { slideInLeftVariant } from "../../../utils/animations";
import { Clapperboard } from "lucide-react";

interface MoviesGridProps {
  movies: IMovie[];
  isLoading: boolean;
  selectedMovieId?: string;
  onSelectMovie: (movie: IMovie) => void;
  onRemoveMovie: (id: string) => void;
  onOpenTrailer: (url: string) => void;
}

const MoviesGrid: React.FC<MoviesGridProps> = ({
  movies,
  isLoading,
  selectedMovieId,
  onSelectMovie,
  onRemoveMovie,
  onOpenTrailer,
}) => {
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="bg-[#1A1A24]/40 border border-white/5 rounded-2xl aspect-2/3.5 animate-pulse"
          >
            <div className="w-full h-2/3 bg-white/5 rounded-t-2xl" />
            <div className="p-4 space-y-3">
              <div className="h-4 bg-white/5 rounded w-3/4" />
              <div className="h-3 bg-white/5 rounded w-1/2" />
              <div className="flex gap-2 pt-2">
                <div className="h-8 bg-white/5 rounded flex-1" />
                <div className="h-8 bg-white/5 rounded w-10" />
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (movies.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center">
        <div className="w-20 h-20 bg-white/5 rounded-full flex items-center justify-center mb-4">
       
            <Clapperboard  className="w-10 h-10"/>
        
        </div>
        <h3 className="text-xl font-serif  font-semibold text-white mb-2">No movies found</h3>
        <p className="text-gray-400 max-w-xs">
          Try adjusting your search or category filters to find what you're looking for.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      <AnimatePresence mode="popLayout">
        {movies.map((movie, index) => (
          <motion.div
            key={movie._id}
            variants={slideInLeftVariant}
            initial="hidden"
            animate="visible"
            exit="hidden"
            transition={{ delay: index * 0.05 }}
            layout
          >
            <AdminMovieCard
              movie={movie}
              isSelected={selectedMovieId === movie._id}
              onSelect={onSelectMovie}
              onRemove={onRemoveMovie}
              onOpenTrailer={onOpenTrailer}
            />
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};

export default MoviesGrid;
