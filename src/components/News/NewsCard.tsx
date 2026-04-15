import { memo } from "react";
import { m } from "framer-motion";
import CategoryBadge from "./CategoryBadge";
import type { INewsItem } from "@/types";
import { getOptimizedCloudinaryUrl } from "../../utils/cloudinary";

interface INewsCardProps {
    item: INewsItem;
    index: number;
}

const CARD_VARIANTS = {
    hidden: { opacity: 0, y: 24 },
    visible: (i: number) => ({
        opacity: 1,
        y: 0,
        transition: { duration: 0.5, delay: i * 0.1, ease: "easeOut" as const },
    }),
};

const NewsCard = memo(function NewsCard({ item, index }: INewsCardProps) {
    return (
        <m.article
            className="bg-[#1A2232] rounded-2xl overflow-hidden border border-neutral-800 hover:border-[#C5A059]/30 transition-all duration-300 shadow-lg shadow-blue-500/20 hover:shadow-[#C5A059]/20 hover:-translate-y-1 group cursor-pointer flex flex-col"
            custom={index}
            variants={CARD_VARIANTS}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.15 }}
            aria-label={item.title}
        >
            <div className="relative w-full aspect-video overflow-hidden shrink-0">
                <img
                    src={getOptimizedCloudinaryUrl(item.image, { width: 500 })}
                    alt={item.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                    decoding="async"
                    width="400"
                    height="225"
                />
                <div className="absolute top-3 left-3">
                    <CategoryBadge category={item.category} />
                </div>
            </div>

            <div className="p-5 flex flex-col gap-2.5 flex-grow">
                <h4 className="text-white font-semibold text-sm md:text-base leading-snug line-clamp-2 group-hover:text-[#C5A059] transition-colors duration-200">
                    {item.title}
                </h4>
                <p className="text-neutral-400 text-xs leading-relaxed line-clamp-3 flex-grow">
                    {item.excerpt}
                </p>
                {item.source && (
                    <p className="text-[#C5A059]/70 text-[11px] font-medium tracking-wider uppercase mt-auto pt-2 border-t border-neutral-800">
                        {item.source}
                    </p>
                )}
            </div>
        </m.article>
    );
});

export default NewsCard;
