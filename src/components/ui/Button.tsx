import React from 'react';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
}

/**
 * Andrew Lessman Design System Button Component
 * 
 * Variants:
 * - primary: Teal background (#009296) with white text
 * - secondary: White background with teal text
 * - outline: Transparent with teal border and text
 * - ghost: Transparent with teal text, no border
 * 
 * Sizes:
 * - sm: 40px height
 * - md: 50px height (default)
 * - lg: 60px height
 * 
 * Usage:
 * <Button variant="primary">Shop Now</Button>
 * <Button variant="outline" size="sm">Learn More</Button>
 */
export function Button({ 
  variant = 'primary', 
  size = 'md',
  className = '',
  children,
  type = 'button',
  ...props 
}: ButtonProps) {
  // Base styles - shared across all variants
  const baseStyles = `
    inline-flex items-center justify-center gap-xxs
    rounded-button 
    font-['Inter',sans-serif] font-medium 
    text-base tracking-[1.92px] uppercase
    leading-normal
    transition-all duration-200 ease-out
    disabled:opacity-50 disabled:cursor-not-allowed
    focus:outline-none
  `.replace(/\s+/g, ' ').trim();

  // Variant styles
  const variantStyles = {
    primary: `
      bg-teal-dark text-white
      hover:bg-hover-teal
    `.replace(/\s+/g, ' ').trim(),
    
    secondary: `
      bg-white text-teal-dark
      border border-teal-dark
      hover:bg-cream
    `.replace(/\s+/g, ' ').trim(),
    
    outline: `
      bg-transparent text-teal-dark
      border border-teal-dark
      hover:bg-teal-dark hover:text-white
    `.replace(/\s+/g, ' ').trim(),
    
    ghost: `
      bg-transparent text-teal-dark
      hover:bg-cream
    `.replace(/\s+/g, ' ').trim(),
  };

  // Size styles
  const sizeStyles = {
    sm: 'h-[40px] px-sm py-xxs',
    md: 'h-[50px] px-[39px] py-[15px]',
    lg: 'h-[60px] px-[48px] py-[18px]',
  };

  const combinedClassName = `${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${className}`;

  return (
    <button
      type={type}
      className={combinedClassName}
      {...props}
    >
      {children}
    </button>
  );
}