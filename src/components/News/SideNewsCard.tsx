import { memo } from "react";
import { m } from "framer-motion";
import { Calendar, Clock } from "lucide-react";

import CategoryBadge from "./CategoryBadge";
import { slideInRightVariant } from "../../utils/animations";
import { getOptimizedCloudinaryUrl } from "../../utils/cloudinary";
import type { INewsItem } from "@/types";

interface ISideNewsCardProps {
    item: INewsItem;
}

const SideNewsCard = memo(function SideNewsCard({ item }: ISideNewsCardProps) {
    return (
        <m.article
            className="flex gap-4 p-4 rounded-2xl bg-[#1A1A2E] border border-neutral-800 hover:border-[#C5A059]/30 shadow-md shadow-blue-500/20 hover:shadow-[#C5A059]/20 hover:-translate-y-1 transition-all duration-300 group cursor-pointer"
            variants={slideInRightVariant}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            aria-label={item.title}
        >
        
            <div className="w-24 h-24 shrink-0 rounded-xl overflow-hidden shadow-lg">
                <img
                    src={getOptimizedCloudinaryUrl(item.image, { width: 200 })}
                    alt={item.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    loading="lazy"
                    decoding="async"
                    width="96"
                    height="96"
                />
            </div>

            <div className="flex flex-col gap-1.5 min-w-0">
                <CategoryBadge category={item.category} />

                <h5 className="text-white text-sm font-semibold leading-snug line-clamp-2 group-hover:text-[#C5A059] transition-colors duration-200">
                    {item.title}
                </h5>

                <p className="text-neutral-400 text-xs leading-relaxed line-clamp-2">
                    {item.excerpt}
                </p>

                {(item.time || item.date) && (
                    <div className="flex flex-wrap items-center gap-3 text-[11px] text-neutral-500 mt-auto">
                        {item.time && (
                            <span className="flex items-center gap-1">
                                <Clock className="w-3 h-3 text-[#C5A059]/60" aria-hidden="true" focusable="false" />
                                {item.time}
                            </span>
                        )}
                        {item.date && (
                            <span className="flex items-center gap-1">
                                <Calendar className="w-3 h-3 text-[#C5A059]/60" aria-hidden="true" focusable="false" />
                                {item.date}
                            </span>
                        )}
                    </div>
                )}
            </div>
        </m.article>
    );
});

export default SideNewsCard;
