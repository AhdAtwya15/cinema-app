import { memo, useCallback, useRef, useState } from "react";
import { ImagePlus, X, Loader2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { compressImage } from "../../../utils/compressImage";

interface PosterUploadProps {
  value: File | null;
  onChange: (file: File | null) => void;
  error?: string;
}

const PosterUpload = memo(function PosterUpload({
  value,
  onChange,
  error,
}: PosterUploadProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [dragOver, setDragOver] = useState(false);
  const [isCompressing, setIsCompressing] = useState(false);
  const preview = value ? URL.createObjectURL(value) : null;

  const handleFile = useCallback(
    async (file: File | undefined) => {
      if (file && file.type.startsWith("image/")) {
        try {
          setIsCompressing(true);
          const compressedFile = await compressImage(file);
          onChange(compressedFile);
        } finally {
          setIsCompressing(false);
        }
      }
    },
    [onChange]
  );

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      if (isCompressing) return;
      setDragOver(false);
      handleFile(e.dataTransfer.files[0]);
    },
    [handleFile, isCompressing]
  );

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      if (isCompressing) return;
      handleFile(e.target.files?.[0]);
      e.target.value = "";
    },
    [handleFile, isCompressing]
  );

  const remove = useCallback(
    (e: React.MouseEvent) => {
      e.stopPropagation();
      if (isCompressing) return;
      onChange(null);
    },
    [onChange, isCompressing]
  );

  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-[12px] font-semibold tracking-[0.08em] uppercase text-white/60">
        Movie Poster<span className="text-[#D4A853] ml-0.5">*</span>
      </label>

      <div
        onClick={() => !isCompressing && inputRef.current?.click()}
        onDragOver={(e) => { e.preventDefault(); if (!isCompressing) setDragOver(true); }}
        onDragLeave={() => setDragOver(false)}
        onDrop={handleDrop}
        className={`relative group flex flex-col items-center justify-center rounded-2xl border-2 border-dashed transition-all duration-300 h-64 ${
          isCompressing ? "cursor-not-allowed opacity-80" : "cursor-pointer"
        } ${
          dragOver
            ? "border-[#D4A853] bg-[rgba(212,168,83,0.08)]"
            : error
            ? "border-red-500/40 bg-[rgba(248,113,113,0.04)]"
            : "border-white/12 bg-[rgba(255,255,255,0.03)] hover:border-[rgba(212,168,83,0.4)] hover:bg-[rgba(212,168,83,0.04)]"
        }`}
      >
        <AnimatePresence mode="wait">
          {isCompressing ? (
            <motion.div
              key="compressing"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex flex-col items-center gap-3"
            >
              <div className="w-12 h-12 rounded-2xl bg-[rgba(212,168,83,0.08)] border border-[rgba(212,168,83,0.2)] flex items-center justify-center">
                <Loader2 size={24} className="text-[#D4A853] animate-spin" />
              </div>
              <p className="text-[12px] font-medium text-[#D4A853]/90 animate-pulse">
                Optimizing Image...
              </p>
            </motion.div>
          ) : preview ? (
            <motion.div
              key="preview"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0"
            >
              <img
                src={preview}
                alt="Poster preview"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center">
                <span className="text-white/80 text-[13px] font-medium">
                  Click to change
                </span>
              </div>
              <button
                type="button"
                onClick={remove}
                className="absolute top-2 right-2 w-7 h-7 rounded-full bg-black/70 border border-white/20 flex items-center justify-center text-white/70 hover:text-red-400 hover:border-red-400/40 transition-all z-10"
              >
                <X size={13} strokeWidth={2.5} />
              </button>
            </motion.div>
          ) : (
            <motion.div
              key="placeholder"
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              className="flex flex-col items-center gap-3 px-6 text-center pointer-events-none select-none"
            >
              <div className="w-14 h-14 rounded-2xl bg-[rgba(212,168,83,0.08)] border border-[rgba(212,168,83,0.2)] flex items-center justify-center">
                <ImagePlus size={22} className="text-[#D4A853]/70" strokeWidth={1.5} />
              </div>
              <div>
                <p className="text-[13px] font-medium text-white/50">
                  Drag &amp; drop or{" "}
                  <span className="text-[#D4A853]/80">browse</span>
                </p>
                <p className="text-[11px] text-white/25 mt-0.5">
                  PNG, JPG, WEBP • Recommended 2:3 ratio
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handleChange}
          disabled={isCompressing}
        />
      </div>

      {error && !isCompressing && (
        <p className="text-[11px] text-red-400 flex items-center gap-1">
          <span className="inline-block w-1 h-1 rounded-full bg-red-400 shrink-0" />
          {error}
        </p>
      )}
    </div>
  );
});

export default PosterUpload;
