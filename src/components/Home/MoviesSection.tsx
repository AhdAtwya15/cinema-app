import UseGetDataQuery from '../../hooks/useGetDataQuery';
import MovieCard from '../Movies/MovieCard';
import { m } from "framer-motion";
import { slideInLeftVariant, slideInRightVariant } from "../../utils/animations";
import { useNavigate } from "react-router-dom";
import type { IMovie } from '../../types';

const MoviesSection = () => {
    const navigate = useNavigate();
    const { data: response, isLoading } = UseGetDataQuery({ 
        queryKey: ['movies'], 
        url: '/movies' 
    });

    const latestMovies = response?.items?.slice(0, 4) || [];

    if (isLoading) {
        return (
            <section className="py-20 px-6 sm:px-10 lg:px-20 min-h-[400px]">
                <div className="max-w-7xl mx-auto flex flex-col gap-12">
                    <div className="space-y-5">
                        <div className="h-4 w-32 bg-white/5 rounded-full animate-pulse" />
                        <div className="h-10 w-full md:w-[400px] bg-white/5 rounded-xl animate-pulse" />
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
                        {[1, 2, 3, 4].map((n) => (
                            <div key={n} className="aspect-[2/3] bg-white/5 rounded-2xl animate-pulse" />
                        ))}
                    </div>
                </div>
            </section>
        );
    }

    return (
        <section className=" py-20 px-6 sm:px-10 lg:px-20 min-h-screen" aria-labelledby="movies-heading">
            <div className="max-w-7xl mx-auto flex flex-col gap-12">

                <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 overflow-hidden">
                    <m.div
                        className="space-y-5"
                        variants={slideInLeftVariant}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.2 }}
                    >
                        <div className="flex items-center gap-3">
                            <span className="h-0.5 w-8 bg-[#C5A059]"></span>
                            <p className="text-[#C5A059] text-lg uppercase tracking-[0.2em]  font-bold">Now Showing</p>
                        </div>
                        <h2 id="movies-heading" className="text-white text-xl md:text-3xl font-serif font-semibold">
                            Book your tickets for the <br className="hidden md:block" />
                            <span className="italic font-light text-neutral-300">latest blockbusters</span>
                        </h2>
                    </m.div>

                    <m.button
                        className="self-start md:self-auto text-neutral-300 hover:text-[#C5A059] border-b border-transparent hover:border-[#C5A059] pb-1 transition-colors text-sm font-medium uppercase tracking-wider"
                        variants={slideInRightVariant}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.2 }}
                        aria-label="View all movies"
                        onClick={() => navigate('/movies')}
                    >
                        View All Movies
                    </m.button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8  py-4">
                    {latestMovies.map((movie: IMovie, index: number) => (
                        <m.div
                            key={movie._id}
                            variants={index % 2 === 0 ? slideInLeftVariant : slideInRightVariant}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true, amount: 0.1 }}
                        >
                            <MovieCard movie={movie} />
                        </m.div>
                    ))}
                </div>

            </div>
        </section>
    );
};


export default MoviesSection;