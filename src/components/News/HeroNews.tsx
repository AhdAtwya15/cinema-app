import { memo } from "react";
import { m } from "framer-motion";
import { Calendar, Clock } from "lucide-react";
import CategoryBadge from "./CategoryBadge";
import { slideInLeftVariant } from "../../utils/animations";
import { getOptimizedCloudinaryUrl } from "../../utils/cloudinary";
import type { INewsItem } from "@/types";

interface IHeroNewsProps {
    item: INewsItem;
}

const HeroNews = memo(function HeroNews({ item }: IHeroNewsProps) {
    return (
        <m.article
            className="relative w-full rounded-3xl overflow-hidden border border-neutral-800 shadow-lg shadow-blue-500/20 hover:shadow-[#C5A059]/20 hover:-translate-y-1 transition-all duration-300 group cursor-pointer"
            variants={slideInLeftVariant}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            aria-label={`Hero news: ${item.title}`}
        >
            <div className="relative w-full aspect-video sm:aspect-21/9 overflow-hidden">
                <img
                    src={getOptimizedCloudinaryUrl(item.image, { width: 800 })}
                    alt={item.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    loading="eager"
                    decoding="async"
                    width="800"
                    height="450"
                />
                <div className="absolute inset-0 bg-linear-to-t from-[#0D0D1F] via-black/40 to-transparent" />

                <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8 flex flex-col gap-3">
                    <CategoryBadge category={item.category} />

                    <h3 className="text-white text-xl sm:text-2xl md:text-3xl font-serif font-semibold leading-tight line-clamp-2">
                        {item.title}
                    </h3>

                    <p className="text-neutral-300 text-sm leading-relaxed line-clamp-2 max-w-2xl">
                        {item.excerpt}
                    </p>

                    {(item.time || item.date || item.source) && (
                        <div className="flex flex-wrap items-center gap-4 text-xs text-neutral-400 font-medium pt-1">
                            {item.time && (
                                <span className="flex items-center gap-1.5">
                                    <Clock className="w-3.5 h-3.5 text-[#C5A059]" aria-hidden="true" focusable="false" />
                                    {item.time}
                                </span>
                            )}
                            {item.date && (
                                <span className="flex items-center gap-1.5">
                                    <Calendar className="w-3.5 h-3.5 text-[#C5A059]" aria-hidden="true" focusable="false" />
                                    {item.date}
                                </span>
                            )}
                            {item.source && (
                                <span className="text-[#C5A059]/80">— {item.source}</span>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </m.article>
    );
});

export default HeroNews;
