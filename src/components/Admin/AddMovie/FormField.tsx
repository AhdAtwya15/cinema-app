import { memo } from "react";
import { AnimatePresence } from "framer-motion";
import ErrorMsg from "../../ui/ErrorMsg";

interface FormFieldProps {
  label: string;
  error?: string;
  required?: boolean;
  htmlFor?: string;
  children: React.ReactNode;
  hint?: string;
}

const FormField = memo(function FormField({
  label,
  error,
  required,
  htmlFor,
  children,
  hint,
}: FormFieldProps) {
  return (
    <div className="flex flex-col gap-1.5">
      <label
        htmlFor={htmlFor}
        className="text-[12px] font-semibold tracking-[0.08em] uppercase text-white/60"
      >
        {label}
        {required && <span className="text-[#D4A853] ml-0.5">*</span>}
      </label>

      {children}

      {hint && !error && (
        <p className="text-[11px] text-white/30">{hint}</p>
      )}

      <AnimatePresence>
        {error && <ErrorMsg msg={error} />}
      </AnimatePresence>
    </div>
  );
});

export default FormField;


export const inputCls = (error?: string) =>
  `w-full rounded-xl px-4 py-2.5 text-[13px] font-medium bg-[rgba(255,255,255,0.04)] border ${
    error
      ? "border-red-500/50 focus:border-red-500/80"
      : "border-white/10 focus:border-[rgba(212,168,83,0.5)]"
  } text-white placeholder:text-white/25 outline-none transition-all duration-200 focus:bg-[rgba(212,168,83,0.04)]`;
