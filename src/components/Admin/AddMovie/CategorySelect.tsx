import { memo, useCallback } from "react";
import type { MovieCategory } from "../../../types";

const ALL_CATEGORIES: { value: MovieCategory; label: string }[] = [
  { value: "action",    label: "Action" },
  { value: "horror",    label: "Horror" },
  { value: "comedy",    label: "Comedy" },
  { value: "adventure", label: "Adventure" },
];

interface CategorySelectProps {
  value: MovieCategory[];
  onChange: (cats: MovieCategory[]) => void;
  error?: string;
}

const CategorySelect = memo(function CategorySelect({
  value,
  onChange,
  error,
}: CategorySelectProps) {
  const toggle = useCallback(
    (cat: MovieCategory) => {
      if (value.includes(cat)) {
        onChange(value.filter((c) => c !== cat));
      } else {
        onChange([...value, cat]);
      }
    },
    [value, onChange]
  );

  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-[12px] font-semibold tracking-[0.08em] uppercase text-white/60">
        Categories<span className="text-[#D4A853] ml-0.5">*</span>
      </label>

      <div className="flex flex-wrap gap-2">
        {ALL_CATEGORIES.map(({ value: cat, label }) => {
          const active = value.includes(cat);
          return (
            <button
              key={cat}
              type="button"
              onClick={() => toggle(cat)}
              className={`px-4 py-2 rounded-full text-[12px] font-semibold tracking-wide transition-all duration-200 border select-none ${
                active
                  ? "bg-[rgba(212,168,83,0.15)] border-[rgba(212,168,83,0.5)] text-[#D4A853] shadow-[0_0_12px_rgba(212,168,83,0.12)]"
                  : "bg-white/4 border-white/10 text-white/45 hover:border-white/25 hover:text-white/70"
              }`}
            >
              {label}
            </button>
          );
        })}
      </div>

      {error && (
        <p className="text-[11px] text-red-400 flex items-center gap-1">
          <span className="inline-block w-1 h-1 rounded-full bg-red-400 shrink-0" />
          {error}
        </p>
      )}
    </div>
  );
});

export default CategorySelect;
