
import { motion, AnimatePresence } from "framer-motion";
import UseGetDataQuery from "../../hooks/useGetDataQuery";
import type { IBooking } from "../../types";
import BookingTicket from "../../components/Bookings/BookingTicket";
import { Link, useNavigate } from "react-router-dom";
import { AlertCircle, Ticket } from "lucide-react";
import { useAuth } from "../../hooks/Auth/useAuth";
import { Button } from "../../components/ui/Button";
import { fadeScaleVariant } from "../../utils/animations";


const BookingsPage = () => {
    const { token, isLoggedIn }=useAuth()
    const { data: response, isLoading, isError,error,refetch } = UseGetDataQuery({
        queryKey: ['my-bookings'],
        url: '/bookings/my',
        config: {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        },
    
    });

    const bookings = response?.items || [];
    const navigate = useNavigate();

   
    if (!isLoggedIn) {
        return (
            <div className="min-h-screen bg-[#191C33] pt-28 pb-20 px-4 flex items-center justify-center relative overflow-hidden">
                <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/10 blur-[120px] rounded-full pointer-events-none" />
                <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#D4A853]/5 blur-[120px] rounded-full pointer-events-none" />

                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="max-w-md w-full bg-[#1E2240]/40 backdrop-blur-xl border border-white/10 rounded-[2.5rem] p-10 text-center relative z-10 shadow-2xl"
                >
                    <div className="w-24 h-24 bg-linear-to-br from-[#D4A853]/20 to-[#D4A853]/5 rounded-3xl flex items-center justify-center mx-auto mb-8 transform rotate-12 group-hover:rotate-0 transition-transform duration-500">
                        <Ticket className="w-12 h-12 text-[#D4A853]" />
                    </div>

                    <h2 className="text-3xl font-serif font-bold text-white mb-4 tracking-tight">
                        Unlock Your <span className="text-[#D4A853]">Tickets</span>
                    </h2>
                    
                    <p className="text-slate-400 text-lg font-light leading-relaxed mb-10">
                        Join our community to view and manage your cinematic bookings. Sign in to see your upcoming experiences!
                    </p>

                    <Button
                        onClick={() => navigate('/login')}
                        className="w-full py-4 bg-linear-to-r from-[#D4A853] to-[#B88E3D] hover:from-[#E5B964] hover:to-[#D4A853] text-[#191C33] font-bold text-sm uppercase tracking-[0.2em] rounded-2xl shadow-lg shadow-[#D4A853]/20 active:scale-[0.98] transition-all"
                    >
                        Sign In Now
                    </Button>

                    <p className="mt-8 text-slate-500 text-sm">
                        Don't have an account?{" "}
                        <Link to="/signup" className="text-[#D4A853] hover:underline transition-all">
                            Create one here
                        </Link>
                    </p>
                </motion.div>
            </div>
        );
    }
    if (isLoading) {
        return (
            <div className="min-h-screen bg-[#191C33] flex items-center justify-center">
                <div className="relative">
                    <div className="w-16 h-16 border-4 border-[#D4A853]/20 border-t-[#D4A853] rounded-full animate-spin" />
                    <div className="absolute inset-0 flex items-center justify-center">
                        <Ticket className="w-6 h-6 text-[#D4A853] animate-pulse" />
                    </div>
                </div>
            </div>
        );
    }

    if (isError) {
        return (
            <div className="min-h-screen bg-[#191C33] pt-28 pb-20 px-4 md:px-8 lg:px-12 relative overflow-hidden">
            <motion.div
                initial="hidden"
                animate="visible"
                variants={fadeScaleVariant}
                    className="bg-red-500/5  max-w-5xl mx-auto border border-red-500/20 rounded-3xl p-12 flex flex-col items-center justify-center text-center my-8 backdrop-blur-xl"
            >
                <div className="p-6 bg-red-500/10 rounded-full mb-6">
                    <AlertCircle className="w-12 h-12 text-red-500/60" />
                </div>
                <h3 className="text-2xl font-bold text-white font-serif mb-3"> Failed</h3>
                <p className="text-gray-500 mb-8 max-w-sm font-sans text-sm leading-relaxed">
                    {error instanceof Error ? error.message : "We encountered a cinematic glitch while fetching the data. Please try again."}
                </p>
                <button
                    onClick={() => refetch()}
                    className="px-8 py-3.5 bg-linear-to-r from-red-600 to-red-800 text-white font-black uppercase tracking-widest text-[10px] rounded-xl hover:shadow-lg hover:shadow-red-900/20 transition-all active:scale-95"
                >
                    Retry Connection
                </button>
            </motion.div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#191C33] pt-28 pb-20 px-4 md:px-8 lg:px-12 relative overflow-hidden">
            <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-blue-500/11 blur-[120px] rounded-full pointer-events-none" />
            <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-blue-500/11 blur-[120px] rounded-full pointer-events-none" />
           

            <div className="max-w-5xl mx-auto relative z-10">


               
                <header >
                    <div className="text-center mb-10">
                        <motion.h1
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-white mb-6 tracking-tight"
                        >
                            MY <span className="text-[#D4A853]">BOOKINGS</span>
                        </motion.h1>
                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 }}
                            className="text-slate-400 text-lg max-w-2xl mx-auto font-light"
                        >
                           Your gateway to cinematic experiences. View and manage all your movie tickets in one place.
                        </motion.p>
                    </div>
                </header>
                <div className="flex justify-start mb-8">
                    <span className="px-4 py-1.5 bg-white/5 border border-white/10 rounded-full text-xs font-bold text-slate-400 uppercase tracking-[0.2em]">
                            {bookings.length} {bookings.length===1?"Ticket":"Tickets"}   Found
                        </span>
                </div>

                <div className="space-y-8">
                    <AnimatePresence mode="popLayout">
                        {bookings.length > 0 ? (
                            bookings.map((booking: IBooking, index: number) => (
                                <BookingTicket key={booking._id} booking={booking} index={index} />
                            ))
                        ) : (
                            <motion.div
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className="flex flex-col items-center justify-center py-24 px-6  rounded-3xl border border-white/5 text-center"
                            >
                                    <div className="w-20 h-20 bg-[#D4A853]/20 rounded-full flex items-center justify-center mb-6">
                                    <Ticket className="w-10 h-10 text-[#D4A853]" />
                                </div>
                                <h3 className="text-2xl font-bold text-white mb-2">No bookings yet</h3>
                                <p className="text-slate-400 mb-8 max-w-sm">
                                    You haven't booked any movies yet. Catch the latest blockbusters and start your journey!
                                </p>
                                <Button 
                                  onClick={() => navigate('/movies')} 
                                >
                                    Explore Movies
                                </Button>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>

                {bookings.length > 0 && (
                  <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.8 }}
                    className="mt-16 text-center"
                  >
                    <p className="text-slate-500 text-sm font-medium">
                      Need help with your bookings? <Link to="/contact" className="text-[#D4A853] hover:underline">Contact Support</Link>
                    </p>
                  </motion.div>
                )}
            </div>
        </div>
    );
};

export default BookingsPage;