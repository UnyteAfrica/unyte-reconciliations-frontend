import { PropsWithChildren } from "react";

type WithLabelProps = {
  label: string;
};

export const WithLabel: React.FC<PropsWithChildren<WithLabelProps>> = ({
  label,
  children,
}) => {
  return (
    <div>
      <label className="mb-2 inline-block">{label}</label>
      {children}
    </div>
  );
};
