import { useNavigate } from "react-router-dom";
import type { IMovieStat } from "../../../types";
import { motion } from "framer-motion";
import { fadeSlideUpDelayedVariant } from "../../../utils/animations";

interface IMoviesTableProps {
  movieStats: IMovieStat[];
}

const MoviesTable = ({ movieStats }: IMoviesTableProps) => {
  const navigate = useNavigate();

  const handleRowClick = (movieId: string) => {
    if (movieId) {
      navigate(`/admin/bookings/${movieId}`);
    }
  };

  return (
    <motion.div 
      initial="hidden"
      animate="visible"
      variants={fadeSlideUpDelayedVariant}
      className="bg-[#1A1A2E]/60 backdrop-blur-xl border border-white/5 rounded-2xl overflow-hidden shadow-2xl shadow-black/50"
    >
      <div className="p-7 border-b border-white/5 flex justify-between items-center bg-white/2">
        <div>
          <h2 className="text-xl font-bold text-white font-serif">Movies — Bookings & Earnings</h2>
          <p className="text-slate-400 text-xs font-sans mt-1">Detailed performance breakdown per title</p>
        </div>
        <span className="bg-linear-to-br from-[#D4A853] via-[#F0C97A] to-[#B8892F] text-[#1A1A2E] text-[10px] font-black py-1.5 px-4 rounded-full uppercase tracking-tighter shadow-lg shadow-[#D4A853]/20">
          {movieStats.length} Total Movies
        </span>
      </div>
      
      <div className="overflow-x-auto overflow-y-auto max-h-[500px] scrollbar-thin scrollbar-thumb-[#D4A853]">
        <table className="w-full text-left border-separate border-spacing-0">
          <thead>
            <tr className="bg-white/3 text-gray-400 text-[10px] tracking-[0.2em] uppercase font-bold">
              <th className="p-5 border-b border-white/5 font-sans">Movie Name</th>
              <th className="p-5 border-b border-white/5 font-sans text-right">Bookings</th>
              <th className="p-5 border-b border-white/5 font-sans text-right">Total Earnings</th>
              <th className="p-5 border-b border-white/5 font-sans text-right">Avg / Booking</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5 text-sm">
            {movieStats.map((movie, index) => (
              <tr 
                key={index} 
                onClick={() => handleRowClick(movie.movieId)}
                className="hover:bg-white/4 transition-all group cursor-pointer"
              >
                <td className="p-5">
                  <span className="font-semibold text-white group-hover:text-[#D4A853] transition-colors duration-300 block">
                    {movie.movieName}
                  </span>
                </td>
                <td className="p-5 text-right">
                  <span className="text-gray-300 font-medium">{movie.bookings.toLocaleString()}</span>
                </td>
                <td className="p-5 text-right">
                  <span className="font-bold text-[#F0C97A]">
                  EGP {movie.earnings.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </span>
                </td>
                <td className="p-5 text-right">
                  <span className="text-gray-500 font-medium">
                    EGP {movie.avgPerBooking.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </span>
                </td>
              </tr>
            ))}
            {movieStats.length === 0 && (
              <tr>
                <td colSpan={4} className="p-16 text-center">
                  <p className="text-gray-600 font-serif italic text-lg">No movie statistics found in the archive.</p>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </motion.div>
  );
};

export default MoviesTable;
