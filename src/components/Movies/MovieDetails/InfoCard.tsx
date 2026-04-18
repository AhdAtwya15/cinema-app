import type { ICreditsMember } from '../../../types';

interface InfoCardProps {
    title: string;
    items: ICreditsMember[];
    isSmall?: boolean;
}

const InfoCard = ({ title, items, isSmall = false }: InfoCardProps) => {
    return (
        <div className="flex flex-col gap-4">
            <h3 className={`text-white font-serif font-bold uppercase tracking-wider ${isSmall ? "text-sm" : "text-xl"}`}>{title}</h3>
            <div className="flex flex-wrap gap-6">
                {(items || []).map((item, index) => (
                    <div key={index} className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-lg overflow-hidden border border-[#C5A059]/20">
                            <img
                                src={item.preview}
                                alt={item.name}
                                width="48"
                                height="48"
                                className="w-full h-full object-cover"
                                loading="lazy"
                            />
                        </div>
                        <span className="text-slate-300 font-medium">{item.name}</span>
                    </div>
                ))}
            </div>
        </div>
    );
};


export default InfoCard;
