import { useState, useMemo, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Play, Star, Clock, Film } from 'lucide-react';
import UseGetDataQuery from '../../hooks/useGetDataQuery';
import { fadeSlideUpVariant, slideInLeftVariant, slideInRightVariant } from '../../utils/animations';
import { Button } from '../../components/ui/Button';
import CastCard from '../../components/Movies/MovieDetails/CastCard';
import InfoCard from '../../components/Movies/MovieDetails/InfoCard';
import DateSelector from '../../components/Movies/MovieDetails/DateSelector';
import TimeSelector from '../../components/Movies/MovieDetails/TimeSelector';
import TrailerModal from '../../components/Movies/MovieDetails/TrailerModal';
import { getOptimizedCloudinaryUrl } from '../../utils/cloudinary';
import type { ISlot, IMovie, ICastMember } from '../../types';
import MovieDetailsSkeleton from '../../components/Movies/MovieDetailsSkeleton';

const MovieDetailsPage = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();

    const { data: response, isLoading } = UseGetDataQuery({
        queryKey: ['movies'],
        url: '/movies'
    });

    const movies = response?.items || [];
    const movie = movies.find((m: IMovie) => m._id === id);

    const [selectedDate, setSelectedDate] = useState<string>('');
    const [selectedSlot, setSelectedSlot] = useState<ISlot | null>(null);
    const [isTrailerOpen, setIsTrailerOpen] = useState(false);


    const groupedSlots = useMemo(() => {
        if (!movie?.slots) return {};
        const groups: Record<string, ISlot[]> = {};
        movie.slots.forEach((slot: ISlot) => {
            const date = slot.date;
            if (!groups[date]) groups[date] = [];
            groups[date].push(slot);
        });
        return groups;
    }, [movie?.slots]);

    const dates = useMemo(() => Object.keys(groupedSlots).sort(), [groupedSlots]);


    useEffect(() => {
        if (dates.length > 0 && !selectedDate) {
            setSelectedDate(dates[0]);
        }
    }, [dates, selectedDate]);

    if (isLoading) {
        return <MovieDetailsSkeleton />;
    }

    if (!movie) {
        return <div className="min-h-screen bg-[#191C33] flex items-center justify-center">
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-20"
            >
                <p className="text-slate-400 text-2xl font-serif italic">Movie not found.</p>
            </motion.div>
        </div>;
    }

    const handleTimeSelect = (slot: ISlot) => {
        setSelectedSlot(slot);
        navigate(`/movies/${movie._id}/seats/${slot.date}T${slot.time}`);
    };


    return (
        <div className="min-h-screen bg-[#191C33] pt-28 pb-20 px-4 md:px-8 lg:px-12 relative overflow-hidden">
            <div className="absolute top-0 left-1/4 w-125 h-125 bg-blue-500/11 blur-[120px] rounded-full pointer-events-none" />
            <div className="absolute top-0 right-1/4 w-125 h-125 bg-blue-500/11 blur-[120px] rounded-full pointer-events-none" />



            <div className="max-w-7xl mx-auto relative z-10">

                <div className="flex flex-col items-center mb-12">
                    <button
                        onClick={() => navigate(-1)}
                        className="absolute left-0 top-0 p-3 rounded-full bg-white/5 hover:bg-[#C5A059] text-white hover:text-[#191C33] transition-all duration-300 group"
                    >
                        <ArrowLeft className="w-6 h-6 group-hover:-translate-x-1 transition-transform" />
                    </button>

                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-4xl md:text-6xl lg:text-7xl font-serif font-bold text-center text-white mb-6 uppercase tracking-tighter"

                    >
                        {movie.movieName}
                    </motion.h1>

                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.2 }}
                        className="flex flex-wrap justify-center gap-3"
                    >
                        {movie.rating > 0 && (
                            <div className="flex items-center gap-1.5 px-4 py-1.5 bg-[#c59f59c2] border border-[#C5A059]/20 rounded-full text-[#191C33] text-sm font-bold">
                                <Star className="w-4 h-4 fill-[#191C33]" /> {movie.rating}
                            </div>
                        )}
                        {movie.duration > 0 && (
                            <div className="flex items-center gap-1.5 px-4 py-1.5 bg-[#C5A059]/10 border border-[#C5A059]/20 rounded-full text-[#C5A059] text-sm font-bold">
                                <Clock className="w-4 h-4" /> {movie.duration} min
                            </div>
                        )}
                        <div className="flex items-center gap-1.5 px-4 py-1.5 bg-blue-500/10 border border-blue-500/20 rounded-full text-blue-500 text-sm font-bold uppercase tracking-wider">
                            <Film className="w-4 h-4" /> {movie.categories?.join(', ')}
                        </div>
                    </motion.div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-16">
                    <motion.div
                        variants={slideInLeftVariant}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        className="lg:col-span-4 flex flex-col gap-6"
                    >
                        <div className="aspect-2/3 rounded-3xl overflow-hidden border border-white/10 shadow-2xl relative group">
                            <img
                                src={getOptimizedCloudinaryUrl(movie.poster || movie.thumbnail, { width: 800 })}
                                alt={movie.movieName}
                                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                loading="eager"
                             
                                fetchPriority="high"
                            />
                            <div className="absolute inset-0 bg-linear-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                        </div>

                        <Button
                            onClick={() => setIsTrailerOpen(true)}
                            size="lg"
                            className="w-full flex items-center gap-3 py-6"
                        >
                            <Play className="w-5 h-5 fill-current" /> Watch Trailer
                        </Button>
                    </motion.div>

                    <motion.div
                        variants={slideInRightVariant}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        className="lg:col-span-8 flex flex-col gap-10"
                    >
                        <div className="flex flex-col gap-6 bg-[#1E223D]/30 p-8 rounded-3xl border border-white/5 backdrop-blur-sm">
                            <h2 className="text-2xl font-serif font-bold text-white flex items-center gap-3">
                                <span className="w-8 h-1 bg-[#C5A059] rounded-full" /> SELECT SHOWTIME
                            </h2>

                            <DateSelector
                                dates={dates}
                                selectedDate={selectedDate}
                                onSelectDate={setSelectedDate}
                            />


                            {selectedDate && (
                                <TimeSelector
                                    slots={groupedSlots[selectedDate] || []}
                                    selectedSlot={selectedSlot}
                                    onSelectSlot={handleTimeSelect}
                                />
                            )}
                        </div>
                        {movie.story && (
                            <div className="flex flex-col gap-4 max-w-4xl">
                                <h2 className="text-2xl font-serif font-bold uppercase tracking-widest text-[#C5A059]">The Story</h2>
                                <p className="text-slate-400 text-lg leading-relaxed font-light">{movie.story}</p>
                            </div>
                        )}

                        <div className="flex flex-col gap-6">
                            <h2 className="text-2xl font-serif font-bold text-white flex items-center gap-3">
                                <span className="w-8 h-1 bg-[#C5A059] rounded-full" /> THE CAST
                            </h2>
                            <div className="flex gap-6 overflow-x-auto pb-4 scrollbar-hide">
                                {movie.cast?.map((member: ICastMember, index: number) => (
                                    <CastCard key={index} member={member} />
                                ))}
                            </div>
                        </div>
                    </motion.div>
                </div>


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
                                />
                            )}
                            {movie.producers?.length > 0 && (
                                <InfoCard
                                    title="Produced By"
                                    items={movie.producers}
                                />
                            )}
                        </div>
                    )}
                </motion.div>
            </div>

            <TrailerModal
                isOpen={isTrailerOpen}
                onClose={() => setIsTrailerOpen(false)}
                trailerUrl={movie.trailerUrl || ''}
            />
        </div>
    );

};

export default MovieDetailsPage;