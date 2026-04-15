import { memo } from "react";

interface ICategoryBadgeProps {
    category: string;
}

const CategoryBadge = memo(function CategoryBadge({ category }: ICategoryBadgeProps) {
    return (
        <span className="inline-block w-fit bg-[#C5A059]/20 text-[#C5A059] border border-[#C5A059]/30 text-[10px] font-bold uppercase tracking-[0.15em] px-2.5 py-1 rounded-full">
            {category} 
        </span>
    );
});

export default CategoryBadge;
