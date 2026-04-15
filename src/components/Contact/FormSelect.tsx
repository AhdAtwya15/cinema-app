import React, { forwardRef } from 'react';
import { AnimatePresence } from 'framer-motion';
import ErrorMsg from '../ui/ErrorMsg';

interface FormSelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
    label: string;
    error?: string;
    options: { value: string; label: string }[];
}

const FormSelect = forwardRef<HTMLSelectElement, FormSelectProps>(({ label, error, options, className, id, ...props }, ref) => {
    return (
        <div className="flex flex-col gap-1.5 w-full">
            <label
                htmlFor={id}
                className="text-slate-300 text-sm font-medium ml-1"
            >
                {label} {props.required && <span className="text-red-500">*</span>}
            </label>
            <div className="relative">
                <select
                    ref={ref}
                    id={id}
                    className={`
                        w-full bg-[#1E223D] border border-slate-700/50 rounded-xl px-4 py-3
                        text-white outline-none appearance-none
                        transition-all duration-300 focus:border-[#C5A059]/50
                        focus:ring-1 focus:ring-[#C5A059]/20
                        ${error ? 'border-red-500/50' : ''}
                        ${className || ''}
                    `}
                    {...props}
                >
                    <option value="" disabled className="bg-[#1E223D]">Select an option</option>
                    {options.map((option) => (
                        <option
                            key={option.value}
                            value={option.value}
                            className="bg-[#1E223D]"
                        >
                            {option.label}
                        </option>
                    ))}
                </select>
                <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-slate-500">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                    </svg>
                </div>
            </div>
            <AnimatePresence>
                {error && <ErrorMsg msg={error} />}
            </AnimatePresence>
        </div>
    );
});

FormSelect.displayName = 'FormSelect';

export default React.memo(FormSelect);
