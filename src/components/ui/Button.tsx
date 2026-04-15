import React,{ type ButtonHTMLAttributes }from 'react';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'primary' | 'outline' | 'ghost';
    size?: 'sm' | 'md' | 'lg';
}

export const Button: React.FC<ButtonProps> = ({
    variant = 'primary',
    size = 'md',
    className,
    children,
    ...props
}) => {
    // Base styles applicable to all buttons
    const baseStyles = 'inline-flex items-center justify-center rounded-full font-bold transition-all duration-300 focus:outline-none';

    const variants = {
        primary: 'bg-linear-to-br from-[#D4A853] via-[#F0C97A] to-[#B8892F] hover:bg-[#b38f4a] text-[#191C32] shadow-lg hover:shadow-[rgba(212,168,83,0.45)]  transform hover:-translate-y-0.5',
        outline: 'bg-transparent border border-[#C5A059]/40 hover:border-[#C5A059] text-[#C5A059] backdrop-blur-sm shadow-[0_0_15px_rgba(197,160,89,0)] hover:shadow-[0_0_15px_rgba(197,160,89,0.2)]',
        ghost: 'bg-transparent text-[#C5A059] hover:bg-[#C5A059]/10 hover:text-white',
    };

    const sizes = {
        sm: 'px-6 py-2 text-xs',
        md: 'px-8 py-3 text-sm',
        lg: 'px-10 py-3.5 text-base',
    };

    return (
        <button
            className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className || ''}`}
            {...props}
        >
            {children}
        </button>
    );
};
