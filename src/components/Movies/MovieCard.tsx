import { Star, Clock, Ticket } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../ui/Button';
import type { IMovie, MovieCategory } from '../../types';
import { getOptimizedCloudinaryUrl, getCloudinarySrcSet } from '../../utils/cloudinary';

interface IProps {
    movie: IMovie;
    isSmall?: boolean;
    showPrice?: boolean;
    isRelease?: boolean;
    priority?: boolean;
}

const MovieCard = ({ movie, isSmall, showPrice, isRelease = false, priority = false }: IProps) => {
    const navigate = useNavigate();

    return (
        <article
            onClick={() => isRelease ? null : navigate(`/movies/${movie._id}`)}
            className="bg-[#1A2232] group relative rounded-2xl overflow-hidden cursor-pointer transition-all hover:-translate-y-2 border border-neutral-800 flex flex-col h-full duration-300 will-change-transform shadow-lg shadow-blue-500/10"
        >
          
            <div className="absolute inset-0 border border-[#C5A059]/30 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-30" />
            <div className="absolute inset-0 shadow-2xl shadow-[#C5A059]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-30" />

            <div className="relative aspect-4/5 md:aspect-2/3 w-full overflow-hidden">
                {
                    movie.poster && (
                        <img
                            src={getOptimizedCloudinaryUrl(movie.poster, { width: 300 })}
                            srcSet={getCloudinarySrcSet(movie.poster, [300, 400, 600, 800])}
                            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 300px"
                            alt={movie.movieName}
                            className="w-full h-full object-cover transition-transform duration-700 ease-in-out group-hover:scale-105 will-change-transform"
                            loading={priority ? "eager" : "lazy"}
                         
                            fetchPriority={priority ? "high" : "auto"}
                            decoding={priority ? "sync" : "async"}
                            width="300"
                            height="450"
                        />
                    )
                }

                <div className="absolute top-3 left-3 flex items-center justify-between w-[calc(100%-24px)]">
                    <span className="bg-blue-500/30 border border-blue-500/25 text-white backdrop-blur-md  text-xs font-bold px-2 py-1 rounded-md uppercase tracking-wider">
                        {movie.categories?.[0] ?? "Movie"}
                    </span>

                    {
                        !isRelease && (
                            <span className="bg-[#C5A059] text-black text-xs font-bold px-2 py-1 rounded-md flex items-center gap-1 shadow-lg">
                                <Star className="w-3 h-3 fill-black text-black" aria-hidden="true" focusable="false" />
                                {movie.rating}
                            </span>
                        )
                    }
                </div>

                <div className="absolute inset-0 bg-linear-to-t from-neutral-900 via-neutral-900/40 to-transparent opacity-80" />

                {
                    !isSmall && (
                        <div className=" absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black/40  z-10">
                            <Button variant="primary" size="sm" className="hidden lg:flex gap-2" aria-label={`Book ${movie.movieName} now`}>
                                <Ticket className="w-4 h-4" aria-hidden="true" focusable="false" />
                                Book Now
                            </Button>
                        </div>
                    )
                }
            </div>


            <div className="p-5 flex flex-col grow relative z-20 -mt-1">
                <h3 className={`text-xl font-bold text-white mb-1 line-clamp-1 ${isRelease ? 'text-center' : ''}`}>{movie.movieName}</h3>

                <div className={`flex items-center gap-5 text-xs text-neutral-400 ${isRelease ? 'mb-0' : 'mb-3'}`}>
                    {
                        !isRelease && (
                            <span className="flex items-center gap-1.5 font-medium">
                                <Clock className="w-3.5 h-3.5 text-[#C5A059]" aria-hidden="true" focusable="false" />
                                {Math.floor(movie.duration / 60)===0 ? "" : Math.floor(movie.duration / 60) + "h"} {movie.duration % 60===0 ? "" : movie.duration % 60 + "m"}
                            </span>
                        )
                    }
                    <div className='flex gap-1'>
                    {
                        !isSmall && (
                            movie?.categories?.map((cat: MovieCategory) => (
                              
                                    <span key={cat} className="px-1.5 py-0.5 border border-neutral-700 rounded text-[10px] uppercase font-semibold">
                                        {typeof cat === 'string' ? cat.trim() : cat}
                                    </span>
                               
                            ))
                        )
                    }
                    </div>
                </div>


                <p className={`text-sm text-neutral-300 line-clamp-2 ${isRelease ? 'mb-0' : 'mb-4'}`}>
                    {movie.story}
                </p>

                {
                    showPrice && (
                        <div className="mt-auto flex items-center justify-between ">
                            <span className="text-[#C5A059] font-bold">EGP {movie.seatPrices.standard}</span>
                            {
                                !isSmall && (
                                    <Button variant="outline" size="sm" className="lg:hidden text-xs py-1.5 px-4 h-auto" aria-label={`Book ${movie.movieName} now`}>
                                        Book
                                    </Button>
                                )
                            }
                        </div>
                    )
                }
            </div>


        </article>
    );
};

export default MovieCard;