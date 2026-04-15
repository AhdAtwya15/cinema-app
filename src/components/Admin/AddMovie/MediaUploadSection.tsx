import { memo, useCallback, useRef, useState } from "react";
import { Upload, X, Loader2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import type { IPhotoFile } from "../../../types";

import { compressImage } from "../../../utils/compressImage";

interface MediaUploadSectionProps {
  label: string;
  value: IPhotoFile[];
  onChange: (files: IPhotoFile[]) => void;
}

const MediaUploadSection = memo(function MediaUploadSection({
  label,
  value,
  onChange,
}: MediaUploadSectionProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [isCompressing, setIsCompressing] = useState(false);

  const handleFiles = useCallback(
    async (fileList: FileList) => {
      const files = Array.from(fileList);
      
      try {
        setIsCompressing(true);
        const compressedEntries = await Promise.all(
          files.map(async (file) => {
            const processedFile = await compressImage(file);
            return { 
              file: processedFile, 
              preview: URL.createObjectURL(processedFile) 
            };
          })
        );

        onChange([...value, ...compressedEntries]);
      } finally {
        setIsCompressing(false);
      }
    },
    [value, onChange]
  );

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      if (isCompressing) return;
      if (e.target.files?.length) handleFiles(e.target.files);
      e.target.value = "";
    },
    [handleFiles, isCompressing]
  );

  const remove = useCallback(
    (index: number) => {
      if (isCompressing) return;
      const next = [...value];
      URL.revokeObjectURL(next[index].preview);
      next.splice(index, 1);
      onChange(next);
    },
    [value, onChange, isCompressing]
  );

  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center justify-between">
        <label className="text-[12px] font-semibold tracking-[0.08em] uppercase text-white/60">
          {label}
        </label>
        <button
          type="button"
          disabled={isCompressing}
          onClick={() => !isCompressing && inputRef.current?.click()}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[11px] font-semibold tracking-wide border transition-all duration-200 ${
            isCompressing 
              ? "bg-[rgba(212,168,83,0.1)] border-[rgba(212,168,83,0.3)] text-[#D4A853] cursor-not-allowed" 
              : "bg-white/4 border-white/12 text-white/55 hover:border-[rgba(212,168,83,0.35)] hover:text-[#D4A853] cursor-pointer"
          }`}
        >
          {isCompressing ? (
            <>
              <Loader2 size={11} className="animate-spin" />
              Processing...
            </>
          ) : (
            <>
              <Upload size={11} strokeWidth={2.5} />
              Upload
            </>
          )}
        </button>
        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          multiple
          className="hidden"
          onChange={handleChange}
          disabled={isCompressing}
        />
      </div>

      {value.length > 0 && (
        <div className="flex flex-wrap gap-2">
          <AnimatePresence>
            {value.map((item, i) => (
              <motion.div
                key={item.preview}
                layout
                initial={{ opacity: 0, scale: 0.88 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.88 }}
                transition={{ type: "spring", stiffness: 360, damping: 28 }}
                className="relative group w-16 h-16 rounded-xl overflow-hidden border border-white/10"
              >
                <img
                  src={item.preview}
                  alt=""
                  className="w-full h-full object-cover"
                />
                <button
                  type="button"
                  onClick={() => remove(i)}
                  className="absolute inset-0 flex items-center justify-center bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-150"
                >
                  <X size={14} className="text-red-400" strokeWidth={2.5} />
                </button>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      )}

      {value.length === 0 && (
        <p className="text-[11px] text-white/20 italic">No photos uploaded yet</p>
      )}
    </div>
  );
});

export default MediaUploadSection;
