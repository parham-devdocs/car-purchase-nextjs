"use client";
import { useState } from "react";
import PhoneInput from 'react-phone-number-input';
import 'react-phone-number-input/style.css';

interface InputProps {
  id?: string;
  color?: string;
}

const PhoneNumberInput: React.FC<InputProps> = ({ id, color }) => {
  const [isFocused, setIsFocused] = useState(false);
  const [phone, setPhone] = useState<string | undefined>('');

  const handleFocus = () => setIsFocused(true);
  const handleBlur = () => setIsFocused(false);

  return (
    <div className="relative w-full">
      {/* Label */}
      <label
        htmlFor={id}
        className={`absolute left-2 transition-colors duration-200 px-1 pointer-events-none top-1  text-[14px] ${color ? `text-${color}` : 'text-violet-500'} `}
      >
        Phone Number
      </label>

      {/* Phone Input with custom styling */}
      <PhoneInput
        country="US"
        value={phone}
        onChange={setPhone}
        onFocus={handleFocus}
        onBlur={handleBlur}
        className="
          block w-full px-4 py-3 mt-2 rounded-md
          border-2 border-violet-500
          focus:outline-none focus:ring-0 focus:border-transparent
          placeholder:text-gray-400
        "
        style={{
          boxShadow: 'none',
          borderColor: 'transparent',
        }}
      />

      {/* Custom border highlight on focus */}
      {isFocused && (
        <div className={`absolute top-0 left-0 h-full w-2 ${color ? `bg-${color}` : 'bg-violet-500'} rounded-l-md`}></div>
      )}

      {/* Custom border base */}
      <div className="absolute top-0 left-0 h-full w-full pointer-events-none border-2 border-violet-500 rounded-md"></div>
    </div>
  );
};

export default PhoneNumberInput;