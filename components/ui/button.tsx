import { cn } from "@/lib/utils";
import { ReactNode } from "react";

type TButtonProps = {
  children: ReactNode;
  size: "default" | "sm" | "lg";
  className: React.ComponentProps<"button">["className"];
};

const Button = ({ children, size = "default" }: TButtonProps) => {
  return (
    <button
      className={cn({
        "h-10 px-4 py-2": size === "default",
        "h-9 rounded-md px-3": size === "sm",
        "h-11 rounded-md px-8": size === "lg",
      })}
    >
      {children}
    </button>
  );
};

export default Button;
