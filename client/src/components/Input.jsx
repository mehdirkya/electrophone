import { useRef } from "react";

export default function Input({ name, type = "text", value, onChange, placeholder , w }) {
  const inputRef = useRef(null);

  const handleClick = () => {
    inputRef.current?.focus();
  };

  return (
    <div
      onClick={handleClick}
      className={`${w} border h-[60px] border-gray-300 rounded-md flex-col flex justify-center  gap-1 items-center-safe cursor-text`}
    >
      <label htmlFor={name} className="text-sm font-semibold text-black w-[95%]">
        {name}
      </label>
      <input
        ref={inputRef}
        id={name}
        type={type}
        placeholder={placeholder || name}
        value={value}
        onChange={onChange}
        className="w-[95%] rounded-md placeholder-gray-400 text-sm focus:outline-none focus:ring-0"
      />
    </div>
  );
}
