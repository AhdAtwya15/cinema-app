import { useState, useRef } from 'react';
import { PlayCircle, Clock, CalendarDays, ChevronLeft, ChevronRight, TrendingUp, Clapperboard } from 'lucide-react';
import { m } from "framer-motion";
import { slideInLeftVariant, slideInRightVariant } from "../../utils/animations";
import type { IMovie, Trailer } from '../../types';
import UseGetDataQuery from '../../hooks/useGetDataQuery';
import { useEffect } from 'react';
import { getOptimizedCloudinaryUrl } from '../../utils/cloudinary';

const LatestTrailers = () => {

    const { data: response, isLoading, isError } = UseGetDataQuery({
        queryKey: ['movies-trailers'],
        url: '/movies?type=latest-trailer'
    });

    const movies: IMovie[] = response?.items || [];

    const mapMovieToTrailer = (movie: IMovie): Trailer => ({
        id: movie._id,
        title: movie.movieName,
        genre: movie.categories.join(', '),
        duration: `${Math.floor(movie.duration / 60)}h ${movie.duration % 60}m`,
        year: movie.createdAt ? new Date(movie.createdAt).getFullYear().toString() : '2024',
        description: movie.story,
        thumbnail: getOptimizedCloudinaryUrl(movie.poster, { width: 1280 }),
        videoUrl: movie.videoUrl || movie.trailerUrl || '',
        credits: {
            director: movie.directors?.[0] ? { name: movie.directors[0].name, image: getOptimizedCloudinaryUrl(movie.directors[0].preview, { width: 100 }) } : undefined,
            producer: movie.producers?.[0] ? { name: movie.producers[0].name, image: getOptimizedCloudinaryUrl(movie.producers[0].preview, { width: 100 }) } : undefined,
            singer: movie.cast?.[0] ? { name: movie.cast[0].name, image: getOptimizedCloudinaryUrl(movie.cast[0].preview, { width: 100 }) } : undefined,
        }
    });

    const displayTrailers: Trailer[] = movies.length > 0 
        ? movies.map(mapMovieToTrailer) 
        : []

    const [activeTrailer, setActiveTrailer] = useState<Trailer | null>(null);

    useEffect(() => {
        if (displayTrailers.length > 0 && !activeTrailer) {
            setActiveTrailer(displayTrailers[0]);
        }
    }, [displayTrailers]);

    const trendingMovies: Trailer[] = displayTrailers.slice(0, 3);

    const scrollRef = useRef<HTMLDivElement>(null);


    const handleScroll = (direction: 'left' | 'right') => {
        if (scrollRef.current) {
            const scrollAmount = 300; 
            const newScrollPosition = direction === 'left'
                ? scrollRef.current.scrollLeft - scrollAmount
                : scrollRef.current.scrollLeft + scrollAmount;

            scrollRef.current.scrollTo({
                left: newScrollPosition,
                behavior: 'smooth'
            });
        }
    };


    const getYouTubeId = (url: string) => {
        const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
        const match = url.match(regExp);
        return match && match[2].length === 11 ? match[2] : null;
    };

    return (
        <section className=" py-20 px-6 sm:px-10 lg:px-20" aria-labelledby="trailers-heading">
            <div className="max-w-7xl mx-auto flex flex-col gap-10">


                <m.div
                    className="flex flex-col gap-5"
                    variants={slideInLeftVariant}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.2 }}
                >
                    <div className="flex items-center gap-3">
                        <span className="h-0.5 w-8 bg-[#C5A059]"></span>
                        <p className="text-[#C5A059] uppercase tracking-[0.2em] font-bold text-lg">Sneak Peeks</p>
                    </div>
                    <h2 id="trailers-heading" className="text-white text-3xl md:text-5xl font-serif font-semibold">
                        Latest <span className="italic font-light text-neutral-300">Trailers</span>
                    </h2>
                </m.div>

                {isLoading ? (
                    <div className="flex items-center justify-center py-40">
                        <div className="w-16 h-16 border-4 border-[#C5A059]/30 border-t-[#C5A059] rounded-full animate-spin"></div>
                    </div>
                ) : isError || displayTrailers.length === 0 ? (
                    <div className="bg-[#1A2232] border border-neutral-800 rounded-3xl p-20 text-center">
                        <Clapperboard className="w-16 h-16 text-neutral-600 mx-auto mb-6" />
                        <h3 className="text-2xl text-white font-bold mb-2">No Trailers Found</h3>
                        <p className="text-neutral-400">Our cinematic collection is currently being updated. Please check back later.</p>
                    </div>
                ) : (
                    <div className="flex flex-col lg:flex-row gap-8 items-start overflow-hidden py-4">


                    <m.div
                        className="w-full lg:w-[60%] xl:w-[65%] flex flex-col bg-[#1A2232] rounded-3xl overflow-hidden border border-neutral-800 shadow-2xl"
                        variants={slideInLeftVariant}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.1 }}
                    >

                        <div className="relative w-full aspect-video bg-black">
                            {activeTrailer && getYouTubeId(activeTrailer.videoUrl) ? (
                                <iframe
                                    className="absolute inset-0 w-full h-full"
                                    src={`https://www.youtube.com/embed/${getYouTubeId(activeTrailer.videoUrl)}?autoplay=0&rel=0`}
                                    srcDoc={`<style>*{padding:0;margin:0;overflow:hidden}html,body{height:100%}img,span{position:absolute;width:100%;top:0;bottom:0;margin:auto}span{height:1.5em;text-align:center;font:48px/1.5 sans-serif;color:white;text-shadow:0 0 0.5em black}</style><a href=https://www.youtube.com/embed/${getYouTubeId(activeTrailer.videoUrl)}?autoplay=1><img src=${activeTrailer.thumbnail} alt='${activeTrailer.title}'><span>▶</span></a>`}
                                    title={activeTrailer.title}
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                    allowFullScreen
                                ></iframe>
                            ) : (
                                <div className="flex items-center justify-center h-full text-neutral-500">
                                    Video not available
                                </div>
                            )}
                        </div>

                        <div className="p-6 md:p-8 flex flex-col gap-6">
                            <div>
                                <div className="flex items-center gap-3 mb-3">
                                    <span className="bg-[#C5A059]/20 text-[#C5A059] px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider border border-[#C5A059]/30">
                                        {activeTrailer?.genre}
                                    </span>
                                </div>
                                <h3 className="text-2xl lg:text-3xl text-white font-bold mb-4">{activeTrailer?.title}</h3>

                                <div className="flex flex-wrap items-center gap-4 text-sm text-neutral-400 font-medium font-sans mb-4">
                                    <span className="flex items-center gap-2">
                                        <Clock className="w-4 h-4 text-[#C5A059]" aria-hidden="true" focusable="false" /> {activeTrailer?.duration}
                                    </span>
                                    <span className="flex items-center gap-2">
                                        <CalendarDays className="w-4 h-4 text-[#C5A059]" aria-hidden="true" focusable="false" /> {activeTrailer?.year}
                                    </span>
                                </div>

                                <p className="text-neutral-300 leading-relaxed text-sm">
                                    {activeTrailer?.description}
                                </p>
                            </div>


                            <div className="flex flex-col sm:flex-row gap-6 pt-6 border-t border-neutral-800 mt-auto">
                                {activeTrailer?.credits.director && (
                                    <div className="flex items-center gap-3">
                                        <img src={activeTrailer.credits.director.image} alt={`${activeTrailer.credits.director.name} - Director`} loading="lazy" decoding="async" className="w-10 h-10 rounded-full object-cover border border-[#C5A059]/50" width="40" height="40" />
                                        <div className="flex flex-col gap-[0.9px]">
                                            <span className="text-xs text-neutral-400 uppercase tracking-wider">Director</span>
                                            <span className="text-sm text-white font-medium">{activeTrailer.credits.director.name}</span>
                                        </div>
                                    </div>
                                )}
                                {activeTrailer?.credits.producer && (
                                    <div className="flex items-center gap-3">
                                        <img src={activeTrailer.credits.producer.image} alt={`${activeTrailer.credits.producer.name} - Producer`} loading="lazy" decoding="async" className="w-10 h-10 rounded-full object-cover border border-[#C5A059]/50" width="40" height="40" />
                                        <div className="flex flex-col gap-[0.9px]">
                                            <span className="text-xs text-neutral-400 uppercase tracking-wider">Producer</span>
                                            <span className="text-sm text-white font-medium">{activeTrailer.credits.producer.name}</span>
                                        </div>
                                    </div>
                                )}
                                {activeTrailer && (activeTrailer.credits.singer || (activeTrailer.credits).stars) && (
                                    <div className="flex items-center gap-3">
                                        <img
                                            src={activeTrailer.credits.singer?.image || (activeTrailer.credits).stars?.image}
                                            alt={activeTrailer.credits.singer?.name || (activeTrailer.credits).stars?.name}
                                            loading="lazy" decoding="async"
                                            className="w-10 h-10 rounded-full object-cover border border-[#C5A059]/50"
                                            width="40" height="40"
                                        />
                                        <div className="flex flex-col gap-[0.9px] ">
                                            <span className="text-xs text-neutral-400 uppercase tracking-wider ">
                                                {activeTrailer.credits.singer ? 'Music' : 'Star'}
                                            </span>
                                            <span className="text-sm text-white font-medium">
                                                {activeTrailer.credits.singer?.name || (activeTrailer.credits).stars?.name}
                                            </span>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </m.div>


                    <div className="w-full lg:w-[40%] xl:w-[35%] flex flex-col gap-8">


                        <m.div
                            className="bg-[#1A2232] rounded-3xl p-6 border border-neutral-800 shadow-xl flex flex-col"
                            variants={slideInRightVariant}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true, amount: 0.2 }}
                        >
                            <div className="flex justify-between items-center mb-6">
                                <h4 className="text-lg text-white font-semibold flex items-center gap-3">
                                    <Clapperboard className="w-5 h-5 text-[#C5A059]" aria-hidden="true" focusable="false" />
                                    Latest Trailers
                                </h4>
                                <div className="flex items-center gap-2">
                                    <button
                                        onClick={() => handleScroll('left')}
                                        className="p-1.5 rounded-full bg-[#191C33] text-neutral-400 hover:text-[#C5A059] hover:bg-[#1A2232] border-[0.5px] border-[#C5A059]/20 transition-colors"
                                        aria-label="Scroll left"
                                    >
                                        <ChevronLeft className="w-5 h-5" aria-hidden="true" focusable="false" />
                                    </button>
                                    <button
                                        onClick={() => handleScroll('right')}
                                        className="p-1.5 rounded-full bg-[#191C33] text-neutral-400 hover:text-[#C5A059] hover:bg-[#1A2232] border-[0.5px] border-[#C5A059]/20 transition-colors"
                                        aria-label="Scroll right"
                                    >
                                        <ChevronRight className="w-5 h-5" aria-hidden="true" focusable="false" />
                                    </button>
                                </div>
                            </div>


                            <div
                                ref={scrollRef}
                                className="flex overflow-x-auto gap-4 pb-2 scrollbar-none snap-x"
                                style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                            >
                                {displayTrailers.map((trailer) => (
                                    <div
                                        key={trailer.id}
                                        onClick={() => setActiveTrailer(trailer)}
                                        className={`group w-[260px]   flex flex-col gap-3 p-3 rounded-2xl shadow-md  cursor-pointer transition-all duration-300 snap-start shrink-0 ${activeTrailer?.id === trailer.id
                                            ? 'bg-[#C5A059]/10 border border-[#C5A059]/30 shadow-md shadow-[#C5A059]/30' 
                                            : 'hover:bg-[#1A1A2E] border border-transparent shadow-md shadow-blue-500/30'
                                            }`}
                                    >
                                        
                                        <div className="relative w-full h-32 rounded-xl overflow-hidden shrink-0">
                                            <img
                                                src={getOptimizedCloudinaryUrl(trailer.thumbnail, { width: 400 })}
                                                alt={trailer.title}
                                                className={`w-full h-full object-cover transition-transform duration-500 ${activeTrailer?.id !== trailer.id && 'group-hover:scale-110'}`}
                                                loading="lazy"
                                                decoding="async"
                                                width="260"
                                                height="128"
                                            />
                                            <div className={`absolute inset-0 flex items-center justify-center bg-black/40 transition-opacity duration-300 ${activeTrailer?.id === trailer.id ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}`}>
                                                <PlayCircle className={`w-10 h-10 ${activeTrailer?.id === trailer.id ? 'text-[#C5A059]' : 'text-white'}`} aria-hidden="true" focusable="false" />
                                            </div>
                                        </div>


                                        <div className="flex flex-col min-w-0">
                                            <p className={`font-bold truncate text-sm mb-1 ${activeTrailer?.id === trailer.id ? 'text-[#C5A059]' : 'text-white group-hover:text-[#C5A059] transition-colors'}`}>
                                                {trailer.title}
                                            </p>
                                            <p className="text-xs text-neutral-400 truncate mb-1">{trailer.genre}</p>
                                            <p className="text-xs font-medium text-neutral-500">{trailer.duration}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </m.div>


                        <m.div
                            className="bg-[#1A2232] rounded-3xl p-6 border border-neutral-800 shadow-xl flex flex-col grow"
                            variants={slideInLeftVariant}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true, amount: 0.2 }}
                        >
                            <h4 className="text-lg text-white font-semibold mb-6 flex items-center gap-3">
                                <TrendingUp className="w-5 h-5 text-[#C5A059]" aria-hidden="true" focusable="false" />
                                Trending Now
                            </h4>


                            <div className="flex flex-col gap-4 overflow-y-auto">
                                {trendingMovies.map((movie) => (
                                    <div key={movie.id} className="flex gap-4 p-3 rounded-2xl bg-[#1A1A2E] border border-neutral-800 shadow-md shadow-blue-500/30 hover:shadow-md hover:shadow-[#C5A059]/30 mb-1 transition-all duration-300">
                                        <div className="w-35 h-32 shrink-0 rounded-xl overflow-hidden shadow-lg">
                                            <img src={getOptimizedCloudinaryUrl(movie.thumbnail, { width: 300 })} alt={movie.title} className="w-full h-full object-cover" loading="lazy" decoding="async" width="140" height="128" />
                                        </div>
                                        <div className="flex flex-col justify-center gap-2">

                                            <h5 className="text-white font-bold text-base mb-1">{movie.title}</h5>
                                            <span className="text-[10px] text-[#C5A059] uppercase tracking-wider font-bold mb-1  px-2 py-0.5 rounded-full w-fit">
                                                {movie.genre}
                                            </span>
                                            

                                        </div>
                                    </div>
                                ))}
                            </div>
                        </m.div>

                        </div>
                    </div>
                )}
            </div>
        </section >
    );
};

export default LatestTrailers;