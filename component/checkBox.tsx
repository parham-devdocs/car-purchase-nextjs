import { FaCheck } from "react-icons/fa";

type CheckboxProps = {
  disabled?: boolean;
  defaultChecked?: boolean;
  id?: number | string;
  label?: string;
  checked:boolean
  onChangeHandler?: (checked: boolean) => void;
};

const Checkbox = ({
  disabled = false,
  defaultChecked = false,
  id,
  label,
  onChangeHandler,
  checked=true,
  ...restProps
}: CheckboxProps) => {
  const generatedId = id || label || "checkbox";
  const changeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const checked = event.target.checked;
   
    if (onChangeHandler) {
      onChangeHandler(checked);
    }
  };

  return (
    <div className=" flex items-center">
     <input
  type="checkbox"
  id={generatedId as string}
  className="absolute appearance-none opacity-0"
  defaultChecked={defaultChecked}
  disabled={disabled}
  onChange={changeHandler}  // ✅ Uses your main handler
  checked={checked}
  
/>

      <label
        htmlFor={generatedId as string}
        className={`
           w-8 h-8
          border-2 border-violet-500
          rounded
          flex items-center justify-center
          transition-all duration-200
          ${checked ? 'bg-violet-500 border-transparent' : 'bg-white'}
          ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
          focus-within:ring-2 focus-within:ring-violet-300
        `}
      >
        {checked && <FaCheck className="text-yellow-300" size={20} />}
      </label>

      {label && (
        <label htmlFor={generatedId as string} className="ml-2 cursor-pointer font-semibold text-white">
          {label}
        </label>
      )}
    </div>
  );
};

export default Checkbox;