"use client";
import { ChangeEvent, useState } from "react";
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css'

interface InputProps {
  id?: string;
  color?: string;
  onChangeHandler?: (value: string) => void;

}

const PhoneNumberInput = ({ id, color ,onChangeHandler}: InputProps) => {
  const [isFocused, setIsFocused] = useState(false);
  const [phone, setPhone] = useState<string >('');

  const handleFocus = () => setIsFocused(true);
  const handleBlur = () => setIsFocused(false);
  const handleChange = (e: string) => {
    setPhone(e)
    
if (onChangeHandler) {onChangeHandler(e)}
  };
  return (
<div className={`relative w-full `}>     
      <label
        htmlFor={id}
        className={`absolute left-2 transition-colors duration-200 px-1 pointer-events-none top-1 text-[14px] ${
          color ? `text-${color}` : 'text-violet-500'
        }`}
      >
        Phone Number
      </label>

      
      <PhoneInput
  country="US"
  value={phone}
  onChange={(phone) => handleChange(phone)}
  onBlur={handleBlur}
  onFocus={handleFocus}
  containerClass="w-full max-w-md mx-auto mt-4"
  inputClass="w-full h-16 px-5 py-3 pl-16 border-0 rounded-lg shadow-sm focus:outline-none  text-base"
  buttonClass="bg-gray-100 border-0 focus:outline-none"
  dropdownClass="absolute top-full left-0 z-20 mt-1 w-64 bg-white border border-gray-300 rounded-lg shadow-lg overflow-hidden"
  searchClass="w-full px-4 py-2 border-b border-gray-200 focus:outline-none"
/>
  
      {isFocused && (
        <div className={`absolute top-0 left-0 h-full w-2 ${color ? `bg-${color}` : 'bg-violet-500'} rounded-l-md`}></div>
      )}

      {/* Custom border base */}
      <div className="absolute top-0 left-0 h-full w-full pointer-events-none border-2 border-violet-500 rounded-md"></div>
    </div>
  );
};

export default PhoneNumberInput;