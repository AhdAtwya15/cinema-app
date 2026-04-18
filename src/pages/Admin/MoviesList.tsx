import { useState, useMemo } from "react";

import UseGetDataQuery from "../../hooks/useGetDataQuery";
import useDeleteItemHook from "../../hooks/useDeleteItemHook";
import ConfirmModal from "../../components/ui/ConfirmModal";
import MoviesHeader from "../../components/Admin/MoviesList/MoviesHeader";
import MoviesGrid from "../../components/Admin/MoviesList/MoviesGrid";
import MovieDetailsPanel from "../../components/Admin/MoviesList/MovieDetailsPanel";
import TrailerModal from "../../components/Movies/MovieDetails/TrailerModal";
import type { IMovie } from "../../types";
import { motion } from "framer-motion";
import { fadeScaleVariant } from "../../utils/animations";
import { useAuth } from "../../hooks/Auth/useAuth";
import { showToast } from "../../utils/CustomToast";
import { useDebounce } from "../../hooks/useDebounce";

const MoviesList: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const debouncedSearchQuery = useDebounce(searchQuery, 500);
  const [activeCategory, setActiveCategory] = useState("All");
  const [selectedMovie, setSelectedMovie] = useState<IMovie | null>(null);
  const [movieToDelete, setMovieToDelete] = useState<string | null>(null);
  const [isTrailerOpen, setIsTrailerOpen] = useState(false);
  const [trailerUrl, setTrailerUrl] = useState("");
  const { token } = useAuth();

  
  const { data, isLoading } = UseGetDataQuery({
    queryKey: ["admin-movies"],
    url: "/movies",
  });

  const filteredMovies = useMemo(() => {
    const movies: IMovie[] = data?.items || [];
    return movies.filter((movie) => {
      const matchesSearch = movie.movieName
        .toLowerCase()
        .includes(debouncedSearchQuery.toLowerCase());
      
      const categoryMap: { [key: string]: string } = {
        "Normal": "normal",
        "Featured": "featured",
        "Coming Soon": "coming-soon",
        "Trailers": "latest-trailer",
      };

      const matchesCategory =
        activeCategory === "All" || movie.type === categoryMap[activeCategory];

      return matchesSearch && matchesCategory;
    });
  }, [data, debouncedSearchQuery, activeCategory]);

  const handleSelectMovie = (movie: IMovie) => {
    setSelectedMovie(movie);
  };

  const { mutate: deleteMovie, isPending: isDeleting } = useDeleteItemHook({
    url: "/movies",
    queryKey: ["admin-movies"] ,
    config: {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  });

  const handleRemoveMovie = (id: string) => {
    setMovieToDelete(id);
  };

  const handleOpenTrailer = (url: string) => {
    setTrailerUrl(url);
    setIsTrailerOpen(true);
  };

  const confirmDelete = () => {
    if (movieToDelete) {
      deleteMovie(movieToDelete, {
        onSuccess: () => {
           showToast.success("Movie deleted successfully");
           if (selectedMovie?._id === movieToDelete) {
               setSelectedMovie(null);
           }
           setMovieToDelete(null);
        },
        onError: () => {
          showToast.error("Failed to delete movie. Please try again.");
        }
      });
    }
  };

  return (
    <motion.div
      variants={fadeScaleVariant}
      initial="hidden"
      animate="visible"
      className="p-4 sm:p-8 min-h-screen  "
    >
      <div className="max-w-400 mx-auto">
        <div className="flex flex-col lg:flex-row gap-8">
          <div className="flex-1 w-full lg:w-[60%]">
            <MoviesHeader
              title="Movies Management"
              totalItems={filteredMovies.length}
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
              activeCategory={activeCategory}
              setActiveCategory={setActiveCategory}
            />

            <MoviesGrid
              movies={filteredMovies}
              isLoading={isLoading}
              selectedMovieId={selectedMovie?._id}
              onSelectMovie={handleSelectMovie}
              onRemoveMovie={handleRemoveMovie}
              onOpenTrailer={handleOpenTrailer}
            />
          </div>

          <div className="w-full lg:w-[40%] xl:w-[35%] lg:min-w-112.5">
            <MovieDetailsPanel movie={selectedMovie} />
          </div>
        </div>
      </div>

      <ConfirmModal 
          isOpen={!!movieToDelete}
          title="Delete Movie"
          message="Are you sure you want to delete this movie? This action cannot be undone."
          onConfirm={confirmDelete}
          onCancel={() => setMovieToDelete(null)}
          isLoading={isDeleting}
      />

      <TrailerModal
          isOpen={isTrailerOpen}
          onClose={() => setIsTrailerOpen(false)}
          trailerUrl={trailerUrl}
      />
    </motion.div>
  );
};

export default MoviesList;