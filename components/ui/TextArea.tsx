import { ReactNode } from "react";

interface TextAreaProps {
  icon?: ReactNode;
  placeholder: string;
  name: string;
  /** Browser-level validation so empty submissions never reach EmailJS. */
  required?: boolean;
  disabled?: boolean;
}

const TextArea = ({
  icon,
  placeholder,
  name,
  required,
  disabled,
}: TextAreaProps) => {
  return (
    <div className="relative w-full">
      {/* Icon */}
      <div className="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none cursor-none">
        {icon}
      </div>
      <textarea
        name={name}
        placeholder={placeholder}
        required={required}
        disabled={disabled}
        aria-label={placeholder}
        className="gradient-ring gradient-ring--field w-full p-2.5 pt-9 ps-10 text-sm text-primary-foreground focus:outline-none disabled:opacity-60"
      />
    </div>
  );
};

export default TextArea;
