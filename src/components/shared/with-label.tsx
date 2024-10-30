import { PropsWithChildren } from "react";
import { twMerge } from "tailwind-merge";

type WithLabelProps = {
  label: string;
  className?: string;
  labelClassName?: string;
};

export const WithLabel: React.FC<PropsWithChildren<WithLabelProps>> = ({
  label,
  children,
  className,
  labelClassName,
}) => {
  return (
    <div className={className}>
      <label
        className={twMerge(
          "mb-2 inline-block",
          !!labelClassName && labelClassName
        )}
      >
        {label}
      </label>
      {children}
    </div>
  );
};
