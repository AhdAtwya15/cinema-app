import React from "react";
import { Play, X, Star, Clock } from "lucide-react";
import type { IMovie } from "../../../types";
import { Button } from "../../ui/Button";

interface AdminMovieCardProps {
  movie: IMovie;
  isSelected: boolean;
  onSelect: (movie: IMovie) => void;
  onRemove: (id: string) => void;
  onOpenTrailer: (url: string) => void;
}

const AdminMovieCard: React.FC<AdminMovieCardProps> = ({
  movie,
  isSelected,
  onSelect,
  onRemove,
  onOpenTrailer,
}) => {
  return (
    <div
      className={`group relative flex flex-col bg-[#1A1A2E]/50 border-2 rounded-2xl overflow-hidden transition-all duration-500 hover:shadow-2xl hover:shadow-[#D4A853]/10 hover:-translate-y-1 ${
        isSelected
        ? "border-[#D4A853]/40 shadow-2xl shadow-[#D4A853]/20"
          : "border-white/5 hover:border-[#D4A853]/30"
      }`}
      onClick={() => onSelect(movie)}
    >
      <button
        onClick={(e) => {
          e.stopPropagation();
          onRemove(movie._id);
        }}
        className="absolute top-3 right-3 z-10 p-1.5 bg-[#1A1A2E]/60 backdrop-blur-md border border-white/10 rounded-full text-white/40 hover:text-red-400 hover:bg-[#1A1A2E]/80 hover:border-red-400/30 transition-all duration-300 opacity-0 group-hover:opacity-100"
      >
        <X className="w-4 h-4" />
      </button>

      <div className="relative aspect-2/3 overflow-hidden">
        <img
          src={movie.poster}
          alt={movie.movieName}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-linear-to-t from-[#1A1A24] via-transparent to-transparent opacity-60 group-hover:opacity-80 transition-opacity" />
        
        <div className="absolute top-3 left-3 flex flex-wrap gap-2">
          {movie.rating > 0 && (
            <div className="flex items-center gap-1 px-2 py-1 bg-[#D4A853] text-black text-[10px] font-bold rounded-lg shadow-lg">
              <Star className="w-3 h-3 fill-black" />
              {movie.rating}
            </div>
          )}
          <div className="bg-blue-500/30 border border-blue-500/25 text-white backdrop-blur-md  text-xs font-bold px-2 py-1 rounded-md uppercase tracking-wider">
            {movie.type.replace("-", " ").toUpperCase()}
          </div>
        </div>
      </div>

      <div className="p-4 flex flex-col gap-3">
        <div className="flex flex-col gap-1">
          <h3 className="text-white font-semibold text-lg line-clamp-1 group-hover:text-[#D4A853] transition-colors">
            {movie.movieName}
          </h3>
          <div className="flex flex-col items-start gap-3 text-slate-400 text-xs">
            <div className="flex gap-1">
              {movie.categories?.map((cat) => (
                <span key={cat} className="px-1.5 py-0.5 border border-slate-600 rounded text-[10px] uppercase font-semibold">
                  {cat}
                </span>
              ))}
            </div>
          
            <span className="flex items-center gap-1">
              <Clock className="w-3 h-3" />
              {Math.floor(movie.duration / 60) === 0 ? "" : Math.floor(movie.duration / 60) + "h"} {movie.duration % 60 === 0 ? "" : movie.duration % 60 + "m"}
            </span>
          </div>
        </div>

        <div className="flex justify-center items-center">
         
          <Button
          variant="primary"
            onClick={() => onOpenTrailer(movie.trailerUrl || '')}
            className="flex items-center gap-2 "
            title="Watch Trailer"
          >
            View Trailer
            <Play className="w-4 h-4 fill-current" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AdminMovieCard;
