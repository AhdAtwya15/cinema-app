
interface DateSelectorProps {
    dates: string[];
    selectedDate: string;
    onSelectDate: (date: string) => void;
}

const DateSelector = ({ dates, selectedDate, onSelectDate }: DateSelectorProps) => {

    const formatDate = (dateStr: string) => {
        const date = new Date(dateStr);
        const dayName = date.toLocaleDateString('en-US', { weekday: 'short' });
        const month = date.toLocaleDateString('en-US', { month: 'short' });
        const day = date.getDate();
        return { dayName, month, day };
    };

    return (
        <div className=" flex gap-4 overflow-x-auto pb-4 scrollbar-hide">
            {dates.map((dateStr) => {
                const { dayName, month, day } = formatDate(dateStr);
                const isSelected = selectedDate === dateStr;

                return (
                    <button
                        key={dateStr}
                        onClick={() => onSelectDate(dateStr)}
                        className={`
                            ml-1 mt-1 flex flex-col items-center justify-center min-w-[80px] p-3 rounded-2xl
                            transition-all duration-300 border
                            ${isSelected
                                ? 'bg-[#C5A059] border-[#C5A059] text-[#191C32] shadow-lg shadow-[#C5A059]/20 scale-105'
                                : 'bg-[#1E223D]/50 border-slate-700/50 text-slate-400 hover:border-slate-500 hover:bg-[#1E223D]'
                            }
                        `}
                    >
                        <span className="text-[10px] uppercase font-bold tracking-wider">{dayName}</span>
                        <span className="text-lg font-serif font-bold">{day}</span>
                        <span className="text-[10px] uppercase opacity-80">{month}</span>
                    </button>
                );
            })}
        </div>
    );
};

export default DateSelector;
