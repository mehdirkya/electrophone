import { useRef } from "react";

export default function Input({ ...props }) {
  const inputRef = useRef(null);

  const handleContainerClick = (e) => {
    // Only focus if click wasn't directly on the input
    if (e.target !== inputRef.current) {
      inputRef.current?.focus();
    }
  };

  return (
    <div
      onClick={handleContainerClick}
      className={`${props.w} border border-gray-300 rounded-md flex flex-col justify-center cursor-text ${props.className} p-2 sm:p-3`}
      style={{ minHeight: 60 }}
    >
      <label htmlFor={props.name} className="text-sm font-semibold text-black mb-1 select-none">
        {props.name}
      </label>
      <input
        ref={inputRef}
        id={props.name}
        type={props.type}
        placeholder={props.placeholder || props.name}
        value={props.value}
        onChange={props.onChange}
        disabled={props.disabled}
        className="w-full rounded-md placeholder-gray-400 text-lg focus:outline-none focus:ring-0"
        autoComplete="off"
      />
    </div>
  );
}
