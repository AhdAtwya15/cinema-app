import { useParams, useNavigate } from "react-router-dom";
import UseGetDataQuery from "../../hooks/useGetDataQuery";
import type { IBookingsResponse} from "../../types";
import { motion, AnimatePresence } from "framer-motion";
import { fadeSlideUpVariant, fadeScaleVariant } from "../../utils/animations";
import { 
  ChevronLeft, 
  Calendar, 
  User, 
  Armchair, 
  CreditCard, 
  Clock, 
  MapPin, 
  Filter,
  Ticket,
  AlertCircle
} from "lucide-react";
import { useState, useMemo } from "react";
import { useAuth } from "../../hooks/Auth/useAuth";

const BookingDetailsPage = () => {
  const { movieId } = useParams();
  const navigate = useNavigate();
  const [activeShowtime, setActiveShowtime] = useState<string>("All");

  const { token } = useAuth();

  const { data, isLoading ,isError,error,refetch} = UseGetDataQuery({
    queryKey: ["bookings", movieId || ""],
    url: `/bookings?movieId=${movieId}`,
    config: {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  });

  const bookingsResponse = data as IBookingsResponse;
  const bookings = bookingsResponse?.items || [];

  const showtimes = useMemo(() => {
    const times = bookings.map((b) => b.showtime);
    return ["All", ...Array.from(new Set(times))];
  }, [bookings]);

  const filteredBookings = useMemo(() => {
    if (activeShowtime === "All") return bookings;
    return bookings.filter((b) => b.showtime === activeShowtime);
  }, [bookings, activeShowtime]);

  const formatDateTime = (isoString: string) => {
    const date = new Date(isoString);
    return {
      date: date.toLocaleDateString("en-US", { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' }),
      time: date.toLocaleTimeString("en-US", { hour: '2-digit', minute: '2-digit' })
    };
  };

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen ">
        <div className="relative">
          <div className=" mb-5 animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
        
      </div>
    );

  }

  if(isError){
    return (
      <motion.div
        initial="hidden"
        animate="visible"
        variants={fadeScaleVariant}
        className="bg-red-500/5 border border-red-500/20 rounded-3xl p-12 flex flex-col items-center justify-center text-center my-8 backdrop-blur-xl"
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
    )
  }


  return (
    <div className="w-full min-h-screen bg-transparent p-6 md:p-10 text-white">
     
      <motion.div 
        initial="hidden"
        animate="visible"
        variants={fadeSlideUpVariant}
        className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12"
      >
        <div className="flex items-center gap-6">
          <button 
            onClick={() => navigate(-1)}
            className="p-3 bg-white/5 border border-white/5 rounded-2xl hover:bg-white/10 hover:border-[#D4A853]/30 transition-all active:scale-95 group"
          >
            <ChevronLeft className="w-6 h-6 text-gray-400 group-hover:text-[#D4A853] transition-colors" />
          </button>
          <div>
             <h1 className="text-3xl md:text-4xl font-black font-serif italic uppercase tracking-tighter">
               Order <span className="text-[#D4A853]">Details</span>
             </h1>
             <p className="text-gray-500 text-sm mt-1 flex items-center gap-2">
               Showing {filteredBookings.length} bookings {bookings[0]?.movie?.title ? `for ${bookings[0].movie.title}` : ""}
             </p>
          </div>
        </div>

        
        <div className="flex flex-col gap-2">
          <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest flex items-center gap-2">
            <Filter className="w-3 h-3 text-[#D4A853]" /> Filter by Showtime
          </label>
          <select 
             value={activeShowtime}
             onChange={(e) => setActiveShowtime(e.target.value)}
             className="bg-[#1A1A2E]/80 border border-white/5 text-gray-300 text-sm py-2.5 px-4 rounded-xl focus:outline-none focus:border-[#D4A853]/50 transition-all font-sans"
          >
            {showtimes.map((time, idx) => (
              <option key={idx} value={time}>
                {time === "All" ? "All Showtimes" : `${formatDateTime(time).date}  ${formatDateTime(time).time}`}
              </option>
            ))}
          </select>
        </div>
      </motion.div>

     
      <div className="grid grid-cols-1 gap-6">
        <AnimatePresence mode="popLayout">
          {filteredBookings.map((booking, index) => {
            const dt = formatDateTime(booking.showtime);
            return (
              <motion.div
                layout
                key={booking._id}
                initial="hidden"
                animate="visible"
                exit={{ opacity: 0, scale: 0.95 }}
                variants={{
                  hidden: { opacity: 0, y: 30 },
                  visible: { 
                    opacity: 1, 
                    y: 0, 
                    transition: { delay: index * 0.05, duration: 0.5 } 
                  }
                }}
                className="relative group bg-[#1A1A2E]/60 backdrop-blur-xl border border-white/5 rounded-3xl p-6 md:p-8 overflow-hidden shadow-2xl shadow-black/40 hover:border-[#D4A853]/30 transition-all"
              >
               
                <div className="absolute top-0 right-0 p-8 pt-6">
                   <span className={`text-[10px] font-black py-1.5 px-4 rounded-full uppercase tracking-tighter shadow-lg 
                      ${booking.status === 'paid' ? 'bg-green-500/60 text-white shadow-green-500/20' : 'bg-red-500 text-white shadow-red-500/20'}`}>
                     {booking.status}
                   </span>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                  
                 
                  <div className="lg:col-span-4 space-y-6">
                    <div>
                      <span className="text-[10px] font-bold text-[#D4A853] uppercase tracking-widest mb-2 block">Booking Reference</span>
                     
                    </div>

                    <div className="flex flex-col gap-4">
                      <div className="flex items-center gap-4 text-gray-300">
                        <div className="p-2.5 bg-white/5 rounded-xl"><User className="w-5 h-5 text-[#D4A853]" /></div>
                        <div>
                          <p className="text-gray-500 text-[10px] font-bold uppercase">Customer</p>
                          <p className="font-semibold">{booking.customer}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-4 text-gray-300">
                        <div className="p-2.5 bg-white/5 rounded-xl"><Calendar className="w-5 h-5 text-[#D4A853]" /></div>
                        <div>
                          <p className="text-gray-500 text-[10px] font-bold uppercase">Showtime</p>
                          <p className="font-semibold">{dt.date} <span className="text-gray-500 mx-1">•</span> {dt.time}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-4 text-gray-300">
                        <div className="p-2.5 bg-white/5 rounded-xl"><MapPin className="w-5 h-5 text-[#D4A853]" /></div>
                        <div>
                          <p className="text-gray-500 text-[10px] font-bold uppercase">Auditorium</p>
                          <p className="font-semibold">{booking.auditorium}</p>
                        </div>
                      </div>
                    </div>
                  </div>

        
                  <div className="lg:col-span-8 bg-white/2 border border-white/5 rounded-2xl p-6">
                    <div className="flex items-center justify-between mb-6">
                      <h4 className="text-sm font-black uppercase tracking-widest flex items-center gap-3">
                        <Armchair className="w-4 h-4 text-[#D4A853]" /> Reserved Seats ({booking.seats.length})
                      </h4>
                      <div className="flex items-center gap-2 text-[#D4A853] bg-[#D4A853]/10 py-1 px-3 rounded-lg border border-[#D4A853]/10">
                        <CreditCard className="w-3.5 h-3.5" />
                        <span className="text-[10px] font-black uppercase">{booking.paymentStatus}</span>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 mb-8">
                      {booking.seats.map((seat, sIdx) => (
                        <div key={sIdx} className="bg-white/5 border border-white/5 rounded-xl p-3 flex items-center justify-between group-hover:border-[#D4A853]/10 transition-colors">
                          <div>
                            <p className="text-white font-bold">{seat.seatId}</p>
                            <p className="text-gray-500 text-[9px] uppercase font-bold tracking-tighter">{seat.type}</p>
                          </div>
                          <p className="text-[#F0C97A] font-sans font-bold text-xs">EGP {seat.price}</p>
                        </div>
                      ))}
                    </div>

                    <div className="pt-6 border-t border-white/5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-blue-500/10 rounded-lg"><Clock className="w-4 h-4 text-blue-400" /></div>
                        <p className="text-gray-500 text-[10px]">Booked on {new Date(booking.createdAt).toLocaleDateString()}</p>
                      </div>
                      <div className="flex items-center gap-4">
                        <p className="text-gray-500 text-xs font-bold uppercase">Total Amount</p>
                        <p className="text-3xl font-black font-serif text-white italic tracking-tighter">
                          EGP {booking.amount.toLocaleString()}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}

          {filteredBookings.length === 0 && (
            <motion.div 
               initial="hidden"
               animate="visible"
               variants={fadeScaleVariant}
               className="flex flex-col items-center justify-center py-32 text-center"
            >
              <Ticket className="w-16 h-16 text-gray-700 mb-4" />
              <p className="text-gray-500 font-serif italic text-lg">No bookings found for this criteria.</p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default BookingDetailsPage;