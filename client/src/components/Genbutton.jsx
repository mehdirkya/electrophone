export default function Genbutton({
  w,
  h,
  bg,
  text,
  textsz,
  textco,
  hover,
  type = "button",       // default type is "button"
  onClick,
  disabled = false,
  className = "",
}) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`
        ${w} ${h} ${bg} ${textsz} ${textco} ${hover} font-medium font-Inter rounded-lg
        transition-all duration-300 ease-in-out
        active:scale-95 cursor-pointer
        disabled:cursor-not-allowed disabled:opacity-50 border border-black
        ${className}
      `}
    >
      {text}
    </button>
  );
}
