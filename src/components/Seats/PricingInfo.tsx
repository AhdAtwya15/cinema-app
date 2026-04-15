import React from 'react';
import { Armchair } from 'lucide-react';

interface PricingInfoProps {
    standardPrice: number;
    reclinerPrice: number;
}

const PricingInfo = React.memo(function PricingInfo({ standardPrice, reclinerPrice }: PricingInfoProps) {

    return (
        <div className="bg-[#1E2240]/40 rounded-2xl border border-white/5 p-6 flex flex-col gap-4 h-full">
            <h3 className="text-lg font-serif font-bold text-white flex items-center gap-3">
                <span className="w-6 h-0.5 bg-[#C5A059] rounded-full" />
                Pricing Info
            </h3>

            <div className="flex flex-col gap-3">
                <div className="flex items-center justify-between p-4 rounded-xl bg-[#191C33]/60 border border-slate-700/40">
                    <div className="flex items-center gap-3">
                        <div className="w-8 h-7 rounded-t-lg bg-[#1E2240]/60 border border-slate-600/50 flex items-center justify-center">
                            <Armchair className="w-3.5 h-3.5 text-slate-400" />
                        </div>
                        <div>
                            <p className="text-sm font-semibold text-white font-sans">Standard</p>
                            <p className="text-xs text-slate-500 font-sans">
                                Rows A – C
                            </p>
                        </div>
                    </div>
                    <div className="text-right">
                        <span className="text-xl font-bold text-slate-200 font-serif">
                            {standardPrice.toLocaleString('en-US')}
                        </span>
                        <span className="text-xs text-slate-400 font-sans ml-1">EGP</span>
                    </div>
                </div>

                <div className="flex items-center justify-between p-4 rounded-xl bg-[#C5A059]/5 border border-[#C5A059]/20">
                    <div className="flex items-center gap-3">
                        <div className="w-8 h-7 rounded-t-lg bg-[#C5A059] border border-[#D4A853] flex items-center justify-center">
                            <Armchair className="w-3.5 h-3.5 text-[#191C33]" />
                        </div>
                        <div>
                            <p className="text-sm font-semibold text-[#C5A059] font-sans">Recliner</p>
                            <p className="text-xs text-slate-500 font-sans">
                                Rows D – E
                                <span className="text-[#C5A059] ml-1">(+{(reclinerPrice - standardPrice).toLocaleString('en-US')} EGP)</span>
                            </p>
                        </div>
                    </div>
                    <div className="text-right">
                        <span className="text-xl font-bold text-[#C5A059] font-serif">
                            {reclinerPrice.toLocaleString('en-US')}
                        </span>
                        <span className="text-xs text-[#C5A059]/70 font-sans ml-1">EGP</span>
                    </div>
                </div>

                <div className="p-3 rounded-xl bg-white/3 border border-white/5 text-xs text-slate-500 font-sans leading-relaxed">
                    <span className="text-slate-400">Base ticket price:</span>
                    <span className="text-white font-bold mx-1">{standardPrice.toLocaleString('en-US')} EGP</span>
                    + seat type surcharge
                </div>
            </div>

            <p className="text-xs text-slate-500 font-sans leading-relaxed mt-auto">
                Prices include all taxes. Each ticket is valid for one seat on the selected showtime.
            </p>
        </div>
    );
});

export default PricingInfo;
