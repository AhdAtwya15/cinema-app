import React, { useMemo } from 'react';
import type { ISeat } from '../../types';
import { ROWS } from './seatUtils';
import SeatButton from './SeatButton';

interface SeatGridProps {
    seats: ISeat[];
    selectedSeats: Set<string>;
    onToggle: (id: string) => void;
}

const SeatGrid = React.memo(function SeatGrid({ seats, selectedSeats, onToggle }: SeatGridProps) {

    const byRow = useMemo(() => {
        const map: Record<string, ISeat[]> = {};
        for (const seat of seats) {
            if (!map[seat.row]) map[seat.row] = [];
            map[seat.row].push(seat);
        }
        return map;
    }, [seats]);
  
    return (
        <div className="flex flex-col items-center gap-2 w-full">
            {ROWS.map(row => {
                const isRecliner = row.type === 'recliner';
                const rowSeats = byRow[row.id] ?? [];

                return (
                    <div key={row.id} className="flex items-center gap-1 sm:gap-2">
                        <span className={`w-5 text-xs font-bold font-sans text-right mr-1 shrink-0 ${isRecliner ? 'text-[#C5A059]' : 'text-slate-400'}`}>
                            {row.id}
                        </span>
                        <div className="flex gap-1 sm:gap-1.5">
                            {rowSeats.slice(0, Math.ceil(row.count / 2)).map((seat: ISeat) => (
                                <SeatButton
                                    key={seat.id}
                                    seat={seat}
                                    isSelected={selectedSeats.has(seat.id)}
                                    onToggle={onToggle}
                                    isRecliner={isRecliner}
                                />
                            ))}
                        </div>

                        <div className="w-4 sm:w-6" />

                        <div className="flex gap-1 sm:gap-1.5">
                            {rowSeats.slice(Math.ceil(row.count / 2)).map((seat: ISeat) => (
                                <SeatButton
                                    key={seat.id}
                                    seat={seat}
                                    isSelected={selectedSeats.has(seat.id)}
                                    onToggle={onToggle}
                                    isRecliner={isRecliner}
                                />
                            ))}
                        </div>

                        <span className={`w-5 text-xs font-bold font-sans text-left ml-1 shrink-0 ${isRecliner ? 'text-[#C5A059]' : 'text-slate-400'}`}>
                            {row.id}
                        </span>
                    </div>
                );
            })}

            <div className="flex items-center gap-1 sm:gap-2 mt-1 opacity-40 select-none">
                <div className="w-6" />
                <div className="flex gap-1 sm:gap-1.5">
                    {[1, 2, 3, 4].map(n => (
                        <div key={n} className="w-8 sm:w-9 text-center text-[9px] text-slate-400">{n}</div>
                    ))}
                </div>
                <div className="w-4 sm:w-6" />
                <div className="flex gap-1 sm:gap-1.5">
                    {[5, 6, 7, 8].map(n => (
                        <div key={n} className="w-8 sm:w-9 text-center text-[9px] text-slate-400">{n}</div>
                    ))}
                </div>
                <div className="w-6" />
            </div>
        </div>
    );
});

export default SeatGrid;
