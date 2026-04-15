import React from "react";
import { Search } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface MoviesHeaderProps {
  title: string;
  totalItems: number;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  activeCategory: string;
  setActiveCategory: (category: string) => void;
}

const categories = ["All", "Normal", "Featured", "Coming Soon", "Trailers"];

const MoviesHeader: React.FC<MoviesHeaderProps> = ({
  title,
  totalItems,
  searchQuery,
  setSearchQuery,
  activeCategory,
  setActiveCategory,
}) => {
  return (
    <div className="flex flex-col gap-6 mb-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white mb-1 font-serif">{title}</h1>
          <p className="text-gray-400 text-sm font-sans">{totalItems} items</p>
        </div>

        <div className="relative group">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 group-focus-within:text-[#D4A853] transition-colors" />
          <input
            type="text"
            placeholder="Search movies..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="bg-[#1A1A2E]/60 border border-white/5 rounded-xl py-2.5 pl-10 pr-4 text-sm text-white placeholder:text-gray-600 focus:outline-none focus:ring-1 focus:ring-[#D4A853]/20 focus:border-[#D4A853]/50 transition-all w-[240px] md:w-[300px]"
          />
        </div>
      </div>

      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
        {categories.map((category) => (
          <motion.button
            layout
            key={category}
            onClick={() => setActiveCategory(category)}
            className={`relative px-6 py-2.5 rounded-full text-sm font-semibold uppercase tracking-widest outline-none group whitespace-nowrap`}
          >
            <AnimatePresence>
              {activeCategory === category && (
                <motion.div
                  layoutId="activeMoviesListCategory"
                  className="absolute inset-0 bg-linear-to-br from-[#D4A853] via-[#F0C97A] to-[#B8892F] rounded-full shadow-lg shadow-[#D4A853]/40"
                  initial={false}
                  transition={{ type: "spring", stiffness: 500, damping: 35 }}
                />
              )}
            </AnimatePresence>

            <motion.span
              className="relative z-10 block"
              animate={{
                color: activeCategory === category ? "#070715" : "white",
              }}
              transition={{ duration: 0.2 }}
            >
              {category}
            </motion.span>

            {activeCategory !== category && (
              <div className="absolute inset-0 border border-white/10 rounded-full group-hover:border-white/20 group-hover:bg-blue-500/10 transition-colors duration-200 shadow-lg shadow-blue-500/20" />
            )}
          </motion.button>
        ))}
      </div>
    </div>
  );
};

export default MoviesHeader;
