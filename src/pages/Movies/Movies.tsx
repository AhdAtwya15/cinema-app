import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import UseGetDataQuery from "../../hooks/useGetDataQuery";
import type { CategoryType, IMovie } from "../../types";
import CategoryFilter from "../../components/Movies/CategoryFilter";
import MovieCard from "../../components/Movies/MovieCard";
import { slideInLeftVariant, slideInRightVariant } from "../../utils/animations";


const CATEGORIES: CategoryType[] = ["All Movies", "action", "horror", "comedy", "adventure"];

const MoviesPage = () => {
    const [selectedCategory, setSelectedCategory] = useState<CategoryType>("All Movies");

    const { data: response, isLoading } = UseGetDataQuery({ 
        queryKey: ['movies'], 
        url: '/movies' 
    });

    const movies = response?.items || [];

    const filteredMovies = useMemo(() => {
        if (selectedCategory === "All Movies") return movies;
        return movies.filter((movie: IMovie) => 
            movie.categories?.some(cat => cat.toLowerCase() === selectedCategory.toLowerCase())
        );
    }, [selectedCategory, movies]);

    if (isLoading) {
        return (
            <div className="min-h-screen bg-[#191C33]  pb-20 px-4 md:px-8 lg:px-12 relative flex items-center justify-center">
                <div className="flex justify-center items-center h-screen">
                    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
                </div>
            </div>
        );
    }


    return (
        <div className="min-h-screen bg-[#191C33] pt-28 pb-20 px-4 md:px-8 lg:px-12 relative overflow-hidden">
            
           <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-blue-500/11 blur-[120px] rounded-full pointer-events-none" />
            <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-blue-500/11 blur-[120px] rounded-full pointer-events-none" />

            <div className="max-w-7xl mx-auto relative z-10">
               
                <div className="text-center mb-16">
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-white mb-6 tracking-tight"
                    >
                        DISCOVER <span className="text-[#D4A853]">MOVIES</span>
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-slate-400 text-lg max-w-2xl mx-auto font-light"
                    >
                        Explore our curated collection of cinematic masterpieces across all genres.
                    </motion.p>
                </div>

                <CategoryFilter
                    categories={CATEGORIES}
                    selectedCategory={selectedCategory}
                    onSelectCategory={setSelectedCategory}
                />

                <motion.div
                    layout
                    className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 md:gap-8"
                >
                    <AnimatePresence mode="popLayout">
                        {filteredMovies.map((movie: IMovie, index: number) => (
                            <motion.div
                                key={movie._id}
                                layout

                                initial="hidden"
                                animate="visible"
                                exit="hidden"
                                variants={index % 2 === 0 ? slideInLeftVariant : slideInRightVariant}
                                transition={{
                                    duration: 0.8,
                                    delay: (index % 10) * 0.1,
                                    ease: "easeOut"
                                }}
                            >
                                <MovieCard movie={movie} isSmall={true} showPrice={true} />
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </motion.div>


                {filteredMovies.length === 0 && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="text-center py-20"
                    >
                        <p className="text-slate-400 text-2xl font-serif italic">No movies found in this category.</p>
                    </motion.div>
                )}
            </div>
        </div>
    );
};

export default MoviesPage;
