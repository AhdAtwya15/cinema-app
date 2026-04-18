
import { motion } from "framer-motion";
import { Calendar, Clock, MapPin, Armchair, QrCode, Star, Ticket } from "lucide-react";
import type { IBooking } from "../../types";

interface BookingTicketProps {
    booking: IBooking;
    index: number;
    priority?: boolean;
}

const BookingTicket = ({ booking, index, priority = false }: BookingTicketProps) => {
   
    const dateObj = new Date(booking.showtime);
    const dateStr = dateObj.toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric' });
    const timeStr = dateObj.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });

    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="group relative flex flex-col md:flex-row w-full bg-[#1A2232] rounded-2xl overflow-hidden border border-neutral-800 hover:border-[#D4A853]/40 transition-all duration-500 shadow-xl"
        >
            <div className="absolute top-0 right-0 w-32 h-32 bg-[#D4A853]/5 blur-3xl -z-10 group-hover:bg-[#D4A853]/10 transition-all" />

            <div className="relative w-full md:w-48 h-64 md:h-auto overflow-hidden">
                <img
                    src={booking.movie.poster + "?w=400&c=fill&f=auto&q=auto"}
                    alt={booking.movie.title}
                    loading={priority ? "eager" : "lazy"}
                    // @ts-ignore
                    fetchpriority={priority ? "high" : "auto"}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    width="400"
                    height="600"
                />
                <div className="absolute inset-0 bg-linear-to-t from-[#1A2232] via-transparent to-transparent md:bg-linear-to-r" />
                
                <div className="absolute top-3 left-3">
                    <span className="flex items-center gap-1 bg-[#D4A853]/30 backdrop-blur-md px-2 py-1 rounded-md border border-[#D4A853]/40 text-[10px] font-bold text-[#D4A853]">
                        <Star className="w-3 h-3 fill-[#D4A853]" />
                        {booking.movie.rating}
                    </span>
                </div>
            </div>

            <div className="flex-1 p-6 flex flex-col justify-between">
                <div>
                    <div className="flex justify-between items-start mb-2">
                        <h3 className="text-xl md:text-2xl font-bold text-white group-hover:text-[#D4A853] transition-colors duration-300">
                            {booking.movie.title}
                        </h3>
                        <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider border ${
                            booking.paymentStatus === 'paid' 
                            ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' 
                            : 'bg-amber-500/10 text-amber-400 border-amber-500/20'
                        }`}>
                            {booking.paymentStatus}
                        </span>
                    </div>
                    
                    <div className="flex flex-wrap gap-4 text-sm text-neutral-400 mt-4">
                        <div className="flex items-center gap-2">
                            <Calendar className="w-4 h-4 text-[#D4A853]" />
                            <span>{dateStr}</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <Clock className="w-4 h-4 text-[#D4A853]" />
                            <span>{timeStr}</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <MapPin className="w-4 h-4 text-[#D4A853]" />
                            <span>{booking.auditorium}</span>
                        </div>
                    </div>

                    <div className="mt-6">
                        <div className="flex items-center gap-2 mb-2 text-xs font-semibold uppercase tracking-wider text-neutral-500">
                            <Armchair className="w-3.5 h-3.5" />
                            <span>Selected Seats ({booking.seats.length})</span>
                        </div>
                        <div className="flex flex-wrap gap-2">
                            {booking.seats.map((seat) => (
                                <span 
                                    key={seat.seatId}
                                    className={` px-2.5 py-1 rounded-full flex items-center gap-1.5 text-xs font-mono
                                        ${seat.type === 'recliner' ? 'bg-[#D4A853]/30 border border-[#D4A853]/40 text-neutral-200' : 'bg-blue-400/30 border border-blue-400/40 text-neutral-200'}`}
                                >
                                    <span className={`w-1.5 h-1.5 rounded-full ${seat.type === 'recliner' ? 'bg-[#D4A853]' : 'bg-blue-400'}`} />
                                    {seat.seatId}
                                </span>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="mt-6 pt-4 border-t border-neutral-800/50 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <Ticket className="w-4 h-4 text-[#D4A853]" />
                        <span className="text-xs text-neutral-500">Booking ID: <span className="text-neutral-300 font-mono">{index+1}</span></span>
                    </div>
                    <div className="text-right">
                        <p className="text-[10px] text-neutral-500 uppercase font-bold tracking-tighter">Total Price</p>
                        <p className="text-lg font-bold text-white">
                            <span className="text-[#D4A853] text-sm mr-1">{booking.currency}</span>
                            {booking.amount}
                        </p>
                    </div>
                </div>
            </div>

            <div className="hidden md:flex flex-col items-center justify-between py-4 relative">
                <div className="w-6 h-6 rounded-full bg-[#191C33] absolute -top-3 left-1/2 -translate-x-1/2 border border-neutral-800" />
                <div className="flex-1 w-px border-l border-dashed border-neutral-700 mx-6" />
                <div className="w-6 h-6 rounded-full bg-[#191C33] absolute -bottom-3 left-1/2 -translate-x-1/2 border border-neutral-800" />
            </div>

         
            <div className="w-full md:w-32 bg-black/20 p-6 flex flex-col items-center justify-center border-t md:border-t-0 md:border-l border-neutral-800">
                <div className="relative group/qr p-2 bg-white rounded-lg transition-transform duration-300 hover:scale-110">
                    <QrCode className="w-16 h-16 text-black" />
                    <div className="absolute inset-0 bg-white/20 animate-pulse rounded-lg pointer-events-none" />
                </div>
                <p className="mt-4 text-[9px] text-neutral-500 text-center font-bold uppercase tracking-[0.2em]">Scan at Entrance</p>
            </div>
        </motion.div>
    );
};

export default BookingTicket;
