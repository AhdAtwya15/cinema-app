import React, { useMemo } from 'react';
import { motion } from 'framer-motion';
import { Trash2, CheckCircle2, Loader2 } from 'lucide-react';
import type { ISeat } from '../../types';
import { Button } from '../ui/Button';

interface BookingSummaryProps {
    selectedSeats: Set<string>;
    seats: ISeat[];
    standardPrice: number;
    reclinerPrice: number;
    totalPrice: number;
    onClear: () => void;
    onConfirm: () => void;
    isPending: boolean;
}

const BookingSummary = React.memo(function BookingSummary({
    selectedSeats,
    seats,
    standardPrice,
    reclinerPrice,
    totalPrice,
    onClear,
    onConfirm,
    isPending,
}: BookingSummaryProps) {
    const selectedList = useMemo(
        () => seats.filter(s => selectedSeats.has(s.id)).sort((a, b) => a.id.localeCompare(b.id)),
        [seats, selectedSeats]
    );
    const count = selectedList.length;

    return (
        <div className="bg-[#1E2240]/40 rounded-2xl border border-white/5 p-6 flex flex-col gap-5 h-full">
            <h3 className="text-lg font-serif font-bold text-white flex items-center gap-3">
                <span className="w-6 h-0.5 bg-[#C5A059] rounded-full" />
                Booking Summary
            </h3>

            <div className="flex-1 flex flex-col gap-3">
                <div className="flex items-center justify-between">
                    <span className="text-sm text-slate-400 font-sans">Selected Seats</span>
                    <span className="text-sm font-bold text-white font-sans">
                        {count} {count === 1 ? 'seat' : 'seats'}
                    </span>
                </div>

                {count > 0 ? (
                    <div className="flex flex-wrap gap-1.5">
                        {selectedList.map(seat => (
                            <span
                                key={seat.id}
                                className={`px-2.5 py-1 rounded-lg text-xs font-bold font-sans ${seat.type === 'recliner'
                                    ? 'bg-[#C5A059]/15 border border-[#C5A059]/40 text-[#C5A059]'
                                    : 'bg-slate-700/40 border border-slate-600/40 text-slate-300'
                                    }`}
                            >
                                {seat.id}
                                <span className="opacity-50 font-normal ml-1 text-[9px]">
                                    {(seat.type === 'recliner' ? reclinerPrice : standardPrice).toLocaleString('en-US')} EGP
                                </span>
                            </span>
                        ))}
                    </div>
                ) : (
                    <p className="text-xs text-slate-600 italic font-sans">No seats selected yet.</p>
                )}
            </div>

            <div className="h-px bg-white/5" />

            <div className="flex items-center justify-between">
                <span className="text-sm text-slate-400 font-sans">Total</span>
                <motion.span
                    key={totalPrice}
                    initial={{ opacity: 0, y: -6 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.25 }}
                    className="text-2xl font-bold font-serif text-white"
                >
                    {totalPrice.toLocaleString('en-US')} EGP
                </motion.span>
            </div>

            <div className="flex gap-3">
                <button
                    onClick={onClear}
                    disabled={count === 0}
                    className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-sm font-semibold font-sans
                        bg-slate-700/30 border border-slate-600/30 text-slate-400
                        hover:bg-red-500/10 hover:border-red-500/30 hover:text-red-400
                        disabled:opacity-30 disabled:cursor-not-allowed transition-all duration-200"
                >
                    <Trash2 className="w-4 h-4" />
                    Clear
                </button>

                <Button
                    onClick={onConfirm}
                    disabled={count === 0}
                    size='lg'
                    className=" w-full flex-1 items-center justify-center gap-3
                        disabled:opacity-30 disabled:cursor-not-allowed disabled:shadow-none
                        transition-all duration-200 active:scale-[0.98]"
                >
                    {
                        isPending ? <Loader2 className="w-4 h-4 animate-spin" /> : <CheckCircle2 className="w-4 h-4" />
                    }
                    Confirm Booking
                </Button>
            </div>
        </div>
    );
});

export default BookingSummary;
