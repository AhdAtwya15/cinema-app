import React, { forwardRef } from 'react';
import { AnimatePresence } from 'framer-motion';
import ErrorMsg from '../ui/ErrorMsg';

interface FormInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label: string;
    error?: string;
}

const FormInput = forwardRef<HTMLInputElement, FormInputProps>(({ label, error, className, id, ...props }, ref) => {
    return (
        <div className="flex flex-col gap-1.5 w-full">
            <label
                htmlFor={id}
                className="text-slate-300 text-sm font-medium ml-1"
            >
                {label} {props.required && <span className="text-red-500">*</span>}
            </label>
            <input
                ref={ref}
                id={id}
                className={`
                    bg-[#1E223D] border border-slate-700/50 rounded-xl px-4 py-3
                    text-white placeholder:text-slate-500 outline-none
                    transition-all duration-300 focus:border-[#C5A059]/50
                    focus:ring-1 focus:ring-[#C5A059]/20
                    ${error ? 'border-red-500/50' : ''}
                    ${className || ''}
                `}
                {...props}
            />
            <AnimatePresence>
                {error && <ErrorMsg msg={error} />}
            </AnimatePresence>
        </div>
    );
});

FormInput.displayName = 'FormInput';

export default React.memo(FormInput);
