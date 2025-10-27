import React from "react";

const Checkbox = ({ label, value, onChange, className = "" }) => {
  return (
    <label className={`flex items-center cursor-pointer gap-2 ${className}`}>
      <input
        type="checkbox"
        checked={value}
        onChange={onChange}
        className="appearance-none w-5 h-5 border border-[#15144E] rounded bg-white checked:bg-[#15144E]"
        style={{
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          backgroundSize: "100%",
          backgroundImage: value
            ? "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' stroke='%23FFF' stroke-width='4' fill='none' viewBox='0 0 24 24'%3E%3Cpath d='M5 12l5 5L20 7'/%3E%3C/svg%3E\")"
            : "none",
        }}
      />
      <span className="font-normal text-[#15144E]">{label}</span>
    </label>
  );
};

export default Checkbox;
