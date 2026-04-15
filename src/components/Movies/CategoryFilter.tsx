import { motion, AnimatePresence } from "framer-motion";
import type { CategoryType } from "../../types";

interface CategoryFilterProps {
    categories: CategoryType[];
    selectedCategory: CategoryType;
    onSelectCategory: (category: CategoryType) => void;
}

const CategoryFilter = ({ categories, selectedCategory, onSelectCategory }: CategoryFilterProps) => {
    return (
        <div className="flex flex-wrap items-center justify-center gap-3 mb-12 ">
            {categories.map((category) => (
                <motion.button
                layout
                    key={category}
                    onClick={() => onSelectCategory(category)}
                    className={`relative px-6 py-2.5 rounded-full text-sm font-semibold uppercase tracking-widest outline-none group`}
                >
                    
                    <AnimatePresence>
                        {selectedCategory === category && (
                            <motion.div
                                layoutId="activeCategory"
                                className="absolute inset-0 bg-linear-to-br from-[#D4A853] via-[#F0C97A] to-[#B8892F] rounded-full shadow-lg shadow-[#D4A853]/40"
                                initial={false}
                                transition={{ type: "spring", stiffness: 500, damping: 35 }}
                            />
                        )}
                    </AnimatePresence>

                    <motion.span
                        className="relative z-10 block"
                        animate={{
                            color: selectedCategory === category ? "#070715" : "white"
                        }}
                        transition={{ duration: 0.2 }}
                    >
                        {category}
                    </motion.span>

                    {selectedCategory !== category && (
                        <div className="absolute inset-0 border border-white/10 rounded-full group-hover:border-white/20 group-hover:bg-blue-500/10 transition-colors duration-200 shadow-lg shadow-blue-500/20" />
                    )}
                </motion.button>
            ))}
        </div>
    );
};


export default CategoryFilter;
