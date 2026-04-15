import React from 'react';
import type { ISeat } from '../../types';
import { Armchair } from 'lucide-react';

export interface SeatButtonProps {
    seat: ISeat;
    isSelected: boolean;
    onToggle: (id: string) => void;
    isRecliner?: boolean;
}

const SeatButton = React.memo(
    function SeatButton({ seat, isSelected, onToggle, isRecliner }: SeatButtonProps) {
        const isBooked = seat.status === 'booked';

        const handleClick = () => {
            if (!isBooked) onToggle(seat.id);
        };

        let cls =
            'relative w-8 h-7 sm:w-9 sm:h-8 rounded-t-lg flex items-center justify-center text-[10px] font-semibold transition-all duration-200 ';

        if (isBooked) {
            cls += 'bg-slate-700/30 border border-slate-700/40 text-slate-600 cursor-not-allowed';
        } else if (isSelected) {
            cls += 'bg-[#C5A059] border border-[#D4A853] text-[#191C33] shadow-[0_0_12px_rgba(197,160,89,0.6)] scale-105 cursor-pointer';
        } else {
            cls +=
                'bg-[#1E2240]/60 border border-slate-600/50 text-slate-400 cursor-pointer ' +
                'hover:border-[#C5A059]/70 hover:text-[#C5A059] hover:bg-[#C5A059]/10 hover:shadow-[0_0_8px_rgba(197,160,89,0.25)]';
        }

        return (
            <button
                onClick={handleClick}
                disabled={isBooked}
                aria-label={`Seat ${seat.id} — ${isBooked ? 'booked' : isSelected ? 'selected' : 'available'}`}
                title={`${seat.id} (${seat.type})`}
                className={cls}
            >
                <span className="relative z-10 leading-none">{seat.number}</span>
                {isRecliner ? <Armchair className='absolute bottom-[-15%] left-[25%] right-1 w-4 h-4 ' /> : <span className="absolute bottom-0 left-1 right-1 h-[3px] rounded-full bg-current opacity-30" />}
            </button>
        );
    },
    (prev, next) =>
        prev.isSelected === next.isSelected &&
        prev.seat.id === next.seat.id &&
        prev.seat.status === next.seat.status
);

export default SeatButton;
