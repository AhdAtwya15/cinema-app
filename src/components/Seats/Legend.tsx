import React from 'react';

const LEGEND_ITEMS = [
    { color: 'bg-[#1E2240]/60 border border-slate-600/50', label: 'Available' },
    { color: 'bg-[#C5A059] border border-[#D4A853]', label: 'Selected' },
    { color: 'bg-slate-700/30 border border-slate-700/40', label: 'Booked' },
] as const;

const Legend = React.memo(function Legend() {
    return (
        <div className="flex flex-wrap justify-center gap-4 mt-6 select-none">
            {LEGEND_ITEMS.map(({ color, label }) => (
                <div key={label} className="flex items-center gap-2">
                    <div className={`w-5 h-5 rounded-md ${color}`} />
                    <span className="text-xs text-slate-400 font-sans">{label}</span>
                </div>
            ))}
        </div>
    );
});

export default Legend;
