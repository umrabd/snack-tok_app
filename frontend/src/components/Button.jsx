import React from "react";

const Button = ({ btnText, type = "button", disabled = false, className = "", ...props }) => {
  return (
    <button
      type={type}
      disabled={disabled}
      className={`w-full py-2 rounded-[var(--radius)] font-medium text-white transition
        ${disabled
          ? "bg-gray-400 cursor-not-allowed opacity-70"
          : "bg-primary hover:opacity-95 cursor-pointer"}
        ${className}`}
      {...props}
    >
      {btnText}
    </button>
  );
};

export default Button;
