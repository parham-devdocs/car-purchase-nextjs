"use client";
import React, { forwardRef, useState } from 'react';
interface InputProps {
  label: string;
  id?: string;
  type?: string;
  placeholder?: string;
  required?: boolean;
  color?: string;
  onChangeHandler?:any;
  className?:string;
  defaultValue?:string;
  value?:string
}
const Input = (
  ({ label, type = 'text', placeholder = '', color, required = false,defaultValue, ...props }:InputProps) => {
    const [isFocused, setIsFocused] = useState(false);
    const [value,setValue]=useState("")
    const handleFocus = () => setIsFocused(true);
    const handleBlur = () => setIsFocused(false);

   

    return (
      <div className={`relative w-full border-2 ${ color ? color : "border-violet-500"} rounded-md px-4 py-2 `}>
        {/* Label */}
        <label
          className={`absolute left-2 transition-all duration-200 px-1 pointer-events-none top-1 text-[14px] ${
            color ? `text-${color}` : 'text-violet-500'
          } ${isFocused  ? 'top-0 text-xs' : ''}`}
        >
          {label} {required && <span className="text-red-500">*</span>}
        </label>

        {/* Input */}
        <input
          type={type}
          placeholder={placeholder}
          required={required}
          onFocus={handleFocus}
          onBlur={handleBlur}
          value={value ? value : defaultValue }
          onChange={(e)=>setValue(e.target.value)}
          {...props} // This includes value, onChange, onBlur, etc., from react-hook-form
          className={`
            outline-none w-5/6 mt-3 bg-transparent
            focus:border-${color || 'blue-600'} transition-colors relative z-10
            ${props.className || ''}
          `}
        />

        {/* Focus indicator bar */}
        {isFocused && (
          <div className={`absolute top-0 left-0 h-full w-2 ${color ? `bg-${color}` : 'bg-violet-500'} rounded-l-md z-0`}></div>
        )}
      </div>
    );
  }
);


export default Input;