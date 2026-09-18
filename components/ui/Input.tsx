import { FC, ReactNode } from "react";

interface InputProps {
  icon?: ReactNode;
  placeholder: string;
  type: "email" | "text" | "password";
  name: string;
  /** Browser-level validation so empty submissions never reach EmailJS. */
  required?: boolean;
  disabled?: boolean;
  autoComplete?: string;
}

const Input: FC<InputProps> = ({
  icon,
  placeholder,
  type,
  name,
  required,
  disabled,
  autoComplete,
}) => {
  return (
    <div className="relative w-full">
      {/* Icon */}
      <div className="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
        {icon}
      </div>
      <input
        type={type}
        name={name}
        placeholder={placeholder}
        required={required}
        disabled={disabled}
        autoComplete={autoComplete}
        aria-label={placeholder}
        className="gradient-ring gradient-ring--field text-primary-foreground w-full text-sm ps-10 px-2.5 py-4 focus:outline-none disabled:opacity-60"
      />
    </div>
  );
};

export default Input;
