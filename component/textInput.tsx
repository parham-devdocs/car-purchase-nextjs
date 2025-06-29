"use client";
import React, { ChangeEvent, forwardRef, useState } from 'react';
interface InputProps {
  label: string;
  id?: string;
  type?: string;
  placeholder?: string;
  required?: boolean;
  color?: string;
  onChangeHandler?:(e:string)=>void;
  className?:string;
  defaultValue?:string;
  value?:string
  name:string
}
const Input = (
  ({ label,onChangeHandler, type = 'text', placeholder = '', color, required = false,defaultValue }:InputProps) => {
    const [isFocused, setIsFocused] = useState(false);
    const [value,setValue]=useState("")
    const handleFocus = () => setIsFocused(true);
    const handleBlur = () => {setIsFocused(false)};
console.log(isFocused)
    function inputChangeHandler(value:ChangeEvent<HTMLInputElement>) {
      setValue(value.target.value)
    if (onChangeHandler) {
      onChangeHandler(value.target.value)
    }  
    }

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
          onChange={(e)=>inputChangeHandler(e)}
          className={`
            outline-none w-5/6 mt-3 bg-transparent
            focus:border-${color || 'blue-600'} transition-colors dark:text-white relative z-10
          `}
        />

        {/* Focus indicator bar */}
       
        {isFocused ? <div className={`absolute top-0 left-0 h-full rounded-l-sm w-2 ${color ? `bg-${color}` : 'bg-violet-500'} rounded-l-md z-0`}></div> : <div className=' absolute left-0 h-full w-2'></div>}  
     
      </div>
    );
  }
);


export default Input;