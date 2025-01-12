import { ReactNode } from "react";

export const Label = ({ children, className = '', ...props }: {children: ReactNode, className?: string}) => {
    return (
      <label
        className={`text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 ${className}`}
        {...props}
      >
        {children}
      </label>
    );
  };