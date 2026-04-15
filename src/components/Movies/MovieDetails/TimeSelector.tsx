import type { IMovieSlot } from '../../../types';

interface TimeSelectorProps {
    slots: IMovieSlot[];
    selectedSlot: IMovieSlot | null;
    onSelectSlot: (slot: IMovieSlot) => void;
}

const TimeSelector = ({ slots, selectedSlot, onSelectSlot }: TimeSelectorProps) => {
   
    const formatTime = (timeStr: string, ampm: string) => {
        if (timeStr.includes(':')) {
            return `${timeStr} ${ampm}`;
        }
        try {
            const date = new Date(timeStr);
            if (!isNaN(date.getTime())) {
                return date.toLocaleTimeString('en-US', {
                    hour: '2-digit',
                    minute: '2-digit',
                    hour12: true
                });
            }
        } catch (e) {
        }
        return timeStr;
    };

    return (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {slots.map((slot, index) => {
                const isSelected = selectedSlot?.time === slot.time && selectedSlot?.date === slot.date;

                return (
                    <button
                        key={index}
                        onClick={() => onSelectSlot(slot)}
                        className={`
                            py-3 px-4 rounded-xl text-sm font-medium transition-all duration-300
                            border flex flex-col items-center gap-1
                            ${isSelected
                                ? 'bg-[#C5A059] border-[#C5A059] text-[#191C32] shadow-lg shadow-[#C5A059]/20'
                                : 'bg-transparent border-slate-700/50 text-slate-300 hover:border-[#C5A059]/50 hover:text-[#C5A059]'
                            }
                        `}
                    >
                        <span>{formatTime(slot.time, slot.ampm)}</span>
                        <span className="text-[10px] opacity-70 uppercase tracking-tighter"></span>
                    </button>
                );
            })}
        </div>
    );

};

export default TimeSelector;
