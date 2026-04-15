import { useState, useMemo, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import UseGetDataQuery from '../../hooks/useGetDataQuery';
import { fadeSlideUpVariant, slideInLeftVariant, slideInRightVariant } from '../../utils/animations';
import type { IBookingRequest, IBookingResponse, IMovie } from '../../types';
import { buildSeatGrid, formatSlot, DEFAULT_BASE_PRICE } from '../../components/Seats/seatUtils';
import ScreenIndicator from '../../components/Seats/ScreenIndicator';
import SeatGrid from '../../components/Seats/SeatGrid';
import Legend from '../../components/Seats/Legend';
import BookingSummary from '../../components/Seats/BookingSummary';
import PricingInfo from '../../components/Seats/PricingInfo';
import { useMutation } from '@tanstack/react-query';
import { useAuth } from '../../hooks/Auth/useAuth';
import axiosInstance from '../../axios';

import { showToast } from '../../utils/CustomToast';


const SeatsPage = () => {
    const { id, slot } = useParams<{ id: string; slot: string }>();
    const navigate = useNavigate();
    const { isLoggedIn,token,role } = useAuth();

    const { data: response } = UseGetDataQuery({
        queryKey: ['movies'],
        url: '/movies'
    });
    
    const movies = response?.items || [];
    const movie = useMemo(() => movies.find((m: IMovie) => m._id === id) || null, [movies, id]);

    const { data: occupiedData } = UseGetDataQuery({
        queryKey: ['occupied-seats', id || '', slot || ''],
        url: `/bookings/occupied`,
        config: {
            params: {
                movieId: id,
                showtime: slot
            }
        },
        enabled: !!id && !!slot
    });

    const occupiedSeatsIds :string[] = useMemo(() => occupiedData?.occupied || [], [occupiedData]);

    const seats = useMemo(() => buildSeatGrid(occupiedSeatsIds), [occupiedSeatsIds]);
    const [selectedSeats, setSelectedSeats] = useState<Set<string>>(new Set());

    const toggleSeat = useCallback((seatId: string) => {
        if (!isLoggedIn) {
            showToast.warning("Please login to book your seats");
            navigate('/login');
            return;
        }
        if(role==="admin")
        {
            showToast.error("Admin can't book seats");
            return;
        }
        setSelectedSeats(prev => {
            const next = new Set(prev);
            if (next.has(seatId)) next.delete(seatId); else next.add(seatId);
            return next;
        });
    }, [isLoggedIn, navigate]);

    const clearSeats = useCallback(() => setSelectedSeats(new Set()), []);

    const handleConfirm = useCallback(() => {
        bookingMutation.mutate({
            movieId: id || '',
            showtime: slot || '',
            seats: [...selectedSeats].map(seatId => ({
                seatId,
                type: seats.find(s => s.id === seatId)?.type || 'standard',
                price: seats.find(s => s.id === seatId)?.type === 'recliner' ? reclinerPrice : standardPrice
            }))
        });
    }, [selectedSeats]);
    
    const standardPrice = movie?.seatPrices?.standard ?? DEFAULT_BASE_PRICE;
    const reclinerPrice = movie?.seatPrices?.recliner ?? (DEFAULT_BASE_PRICE + 75);

    const totalPrice = useMemo(
        () => seats.filter(s => selectedSeats.has(s.id)).reduce((sum, s) => {
            return sum + (s.type === 'recliner' ? reclinerPrice : standardPrice);
        }, 0),
        [seats, selectedSeats, standardPrice, reclinerPrice]
    );

    const { date: showDate, time: showTime } = useMemo(() => formatSlot(slot ?? ''), [slot]);
    const audiLabel = movie?.auditorium ?? 'Audi 1';

    const bookingMutation = useMutation({
        mutationFn: async (bookingData:IBookingRequest) => {
            const { data } = await axiosInstance.post("/bookings", bookingData, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            return data;

        },
        onSuccess: (result: IBookingResponse) => {
          
            window.location.assign(result.checkout.url);
        },
        onError: () => {
        showToast.error("Failed to book seats, please try again");
        

        },
    });


    return (
        <div className="min-h-screen bg-[#191C33] pt-24 pb-20 px-4 md:px-8 lg:px-12 relative overflow-hidden">
            <div className="pointer-events-none absolute top-0 left-1/4 w-[500px] h-[500px] bg-blue-500/10 blur-[130px] rounded-full" />
            <div className="pointer-events-none absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-[#C5A059]/6 blur-[120px] rounded-full" />

            <div className="max-w-5xl mx-auto relative z-10">

                <motion.div
                    variants={fadeSlideUpVariant}
                    initial="hidden"
                    animate="visible"
                    className="flex flex-col items-center mb-10 relative"
                >
                    <button
                        onClick={() => navigate(-1)}
                        className="absolute left-0 top-0 p-3 rounded-full bg-white/5 hover:bg-[#C5A059] text-white hover:text-[#191C33] transition-all duration-300 group"
                        aria-label="Go back"
                    >
                        <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
                    </button>

                    <h1 className="text-3xl md:text-5xl font-serif font-bold text-white uppercase tracking-tighter text-center mb-3">
                        {movie?.movieName ?? 'Select Seats'}
                    </h1>

                    <div className="flex flex-wrap justify-center gap-2 mt-1">
                        {showDate && (
                            <span className="px-3 py-1 rounded-full text-xs font-sans font-semibold bg-[#C5A059]/10 border border-[#C5A059]/25 text-[#C5A059]">
                                {showDate}
                            </span>
                        )}
                        {showTime && (
                            <span className="px-3 py-1 rounded-full text-xs font-sans font-semibold bg-[#C5A059]/10 border border-[#C5A059]/25 text-[#C5A059]">
                                {showTime}
                            </span>
                        )}
                        <span className="px-3 py-1 rounded-full text-xs font-sans font-semibold bg-blue-500/10 border border-blue-500/25 text-blue-400">
                            {audiLabel}
                        </span>
                    </div>
                </motion.div>

                <motion.div
                    variants={fadeSlideUpVariant}
                    initial="hidden"
                    animate="visible"
                    className="bg-[#1E2240]/30 rounded-3xl border border-white/5 p-6 sm:p-10 mb-8 flex flex-col items-center"
                >
                    <ScreenIndicator />
                    <SeatGrid seats={seats} selectedSeats={selectedSeats} onToggle={toggleSeat} />
                    <Legend />

                    <div className="flex flex-wrap justify-center gap-6 mt-6 text-xs text-slate-500 font-sans select-none">
                        <span><span className="text-slate-300 font-semibold">A – C</span>  Standard</span>
                        <span className="text-[#C5A059]/70"><span className="text-[#C5A059] font-semibold">D – E</span>  Recliner</span>
                    </div>
                </motion.div>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <motion.div variants={slideInLeftVariant} initial="hidden" animate="visible">
                        <BookingSummary
                            selectedSeats={selectedSeats}
                            seats={seats}
                            standardPrice={standardPrice}
                            reclinerPrice={reclinerPrice}
                            totalPrice={totalPrice}
                            onClear={clearSeats}
                            onConfirm={handleConfirm}
                            isPending={bookingMutation.isPending}
                        />
                    </motion.div>

                    <motion.div variants={slideInRightVariant} initial="hidden" animate="visible">
                        <PricingInfo standardPrice={standardPrice} reclinerPrice={reclinerPrice} />
                    </motion.div>
                </div>

            </div>
        </div>
    );
};

export default SeatsPage;