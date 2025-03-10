import { cn } from "@/lib/utils";
import { ReactNode } from "react";

// Define button variants
const buttonVariants = {
  default: "bg-primary text-white hover:bg-primary/90",
  outline: "border border-gray-300 text-gray-700 hover:bg-gray-100",
  ghost: "text-gray-700 hover:bg-gray-200",
  destructive: "bg-red-500 text-white hover:bg-red-600",
};

type TButtonProps = {
  children: ReactNode;
  size?: "default" | "sm" | "lg";
  variant?: keyof typeof buttonVariants;
  className?: string;
  onClick?: () => void;
  disabled?: boolean;
};

const Button = ({
  children,
  size = "default",
  variant = "default",
  className,
  onClick,
  disabled,
}: TButtonProps) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={cn(
        "flex items-center justify-center gap-2 rounded-md font-medium transition-all cursor-pointer",
        {
          "h-10 px-4 py-2": size === "default",
          "h-9 rounded-md px-3 text-sm": size === "sm",
          "h-11 rounded-md px-8 text-lg": size === "lg",
          "opacity-50 cursor-not-allowed": disabled,
        },
        buttonVariants[variant],
        className
      )}
    >
      {children}
    </button>
  );
};

export default Button;
