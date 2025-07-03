"use client";
import React, { useState, ChangeEvent, InputHTMLAttributes } from 'react';

// Define the props by extending native input attributes
interface CustomInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  color?: string;
}

const Input = ({ label, color = "violet-500", required = false, ...props }: CustomInputProps) => {
  const [isFocused, setIsFocused] = useState(false);

  const handleFocus = () => setIsFocused(true);
  const handleBlur = () => setIsFocused(false);

  return (
    <div className={`relative w-full border-2 border-${color} rounded-md px-4 py-2`}>
      {/* Label */}
      <label
        className={`absolute left-2 transition-all duration-200 px-1 pointer-events-none top-1 text-[14px] text-${color} ${
          isFocused || props.value ? 'top-0 text-xs' : ''
        }`}
      >
        {label} {required && <span className="text-red-500">*</span>}
      </label>

      {/* Input */}
      <input
        {...props}
        onFocus={handleFocus}
        onBlur={handleBlur}
        className={`
          outline-none w-5/6 mt-3 bg-transparent
          focus:border-${color || 'blue-600'} transition-colors dark:text-white relative z-10
          ${props.className || ''}
        `}
      />

      {/* Focus indicator bar */}
      {isFocused ? (
        <div className={`absolute top-0 left-0 h-full w-2 bg-${color} rounded-l-md z-0`}></div>
      ) : (
        <div className="absolute left-0 h-full w-2"></div>
      )}
    </div>
  );
};

export default Input;