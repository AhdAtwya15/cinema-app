import { memo } from "react";
import { m } from "framer-motion";
import { Newspaper, Rss } from "lucide-react";
import { sampleNews } from "../../data/sampleNews";
import { slideInLeftVariant, slideInRightVariant } from "../../utils/animations";
import HeroNews from "../News/HeroNews";
import NewsCard from "../News/NewsCard";
import SideNewsCard from "../News/SideNewsCard";
import NewsletterBox from "../News/NewsletterBox";


const NewsTicker = memo(function NewsTicker({ title }: { title: string }) {
    return (
        <div className="flex items-center gap-3 bg-[#C5A059]/10 border border-[#C5A059]/20 rounded-full px-4 py-1.5 overflow-hidden max-w-full">
            <span className="shrink-0 flex items-center gap-1.5 text-[#C5A059] text-[11px] font-bold uppercase tracking-widest">
                <span className="w-1.5 h-1.5 rounded-full bg-[#C5A059] animate-pulse shrink-0" aria-hidden="true" />
                Live
            </span>
            <span className="text-neutral-300 text-xs truncate">{title}</span>
        </div>
    );
});


const NewsSection = memo(function NewsSection() {

    const hero = sampleNews[0];
    const gridItems = sampleNews.slice(1, 4);
    const sideCards = sampleNews.slice(4, 6);

    return (
        <section aria-labelledby="news-heading" className="py-20 px-6 sm:px-10 lg:px-20">
            <div className="max-w-7xl mx-auto flex flex-col gap-10">

                <m.div
                    className="flex flex-col md:flex-row md:items-end justify-between gap-4 overflow-hidden"
                    variants={slideInLeftVariant}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.2 }}
                >
                    <div className="flex flex-col gap-4">
                        <div className="flex items-center gap-3">
                            <span className="h-0.5 w-8 bg-[#C5A059]" aria-hidden="true" />
                            <p className="text-[#C5A059] uppercase tracking-[0.2em] font-bold text-lg">Cinema News</p>
                        </div>
                        <h2 id="news-heading" className="text-white text-3xl md:text-5xl font-serif font-semibold">
                            Cine<span className="italic font-light text-neutral-300">News</span>
                        </h2>
                        <NewsTicker title={hero.title} />
                    </div>

                    <m.button
                        className="self-start md:self-auto flex items-center gap-2 text-neutral-300 hover:text-[#C5A059] border-b border-transparent hover:border-[#C5A059] pb-1 transition-colors text-sm font-medium uppercase tracking-wider"
                        variants={slideInRightVariant}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.2 }}
                        aria-label="View all latest news"
                    >
                        <Rss className="w-4 h-4" aria-hidden="true" focusable="false" />
                        Latest News
                    </m.button>
                </m.div>

                <div className="flex flex-col lg:flex-row gap-8 items-start">
                    <div className="w-full lg:w-[65%] xl:w-[68%] flex flex-col gap-8">
                        <HeroNews item={hero} />

                        <div
                            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
                            role="list"
                            aria-label="Recent news articles"
                        >
                            {gridItems.map((item, idx) => (
                                <div key={item.id} role="listitem">
                                    <NewsCard item={item} index={idx} />
                                </div>
                            ))}
                        </div>
                    </div>

                    <aside
                        className="w-full lg:w-[35%] xl:w-[32%] flex flex-col gap-6"
                        aria-label="News sidebar"
                    >
                  
                        <m.div
                            className="flex items-center gap-3"
                            variants={slideInRightVariant}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true, amount: 0.2 }}
                        >
                            <Newspaper className="w-5 h-5 text-[#C5A059]" aria-hidden="true" focusable="false" />
                            <h3 className="text-white font-semibold text-lg">Highlight Stories</h3>
                        </m.div>

                        {sideCards.map((item) => (
                            <SideNewsCard key={item.id} item={item} />
                        ))}

                        <NewsletterBox />
                    </aside>
                </div>

            </div>
        </section>
    );
});

export default NewsSection;