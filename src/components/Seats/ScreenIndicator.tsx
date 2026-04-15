import React from 'react';

const ScreenIndicator = React.memo(function ScreenIndicator() {
    return (
        <div className="flex flex-col items-center mb-8 select-none">
            <div
                className="relative w-full max-w-[480px] h-12"
                aria-label="Screen"
            >
                <div className="
                    absolute inset-0
                    rounded-[50%_50%_0_0/100%_100%_0_0]
                    bg-[linear-gradient(180deg,rgba(197,160,89,0.22)_0%,transparent_100%)]
                    shadow-[0_-6px_40px_4px_rgba(197,160,89,0.25)]
                    border-[1.5px] border-[rgba(197,160,89,0.55)]
                    border-b-0
"/>
            </div>
            <p className="text-xs font-sans uppercase tracking-[0.35em] text-[#C5A059]/70 mt-2">
                S C R E E N
            </p>
        </div>
    );
});

export default ScreenIndicator;
