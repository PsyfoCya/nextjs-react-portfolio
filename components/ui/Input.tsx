import { ReactNode } from "react";

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

const Input = ({
  icon,
  placeholder,
  type,
  name,
  required,
  disabled,
  autoComplete,
}: InputProps) => {
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
        // The ring, not a `bg-*` utility: `gradient-ring` paints through
        // `background-image`, so any background class on the same element
        // wipes it out. `--card-surface` is how the fill is set instead.
        className="gradient-ring gradient-ring--field w-full px-2.5 py-4 ps-10 text-sm text-primary-foreground focus:outline-none disabled:opacity-60"
      />
    </div>
  );
};

export default Input;
