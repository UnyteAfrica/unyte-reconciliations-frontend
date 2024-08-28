import { ComponentPropsWithoutRef, FC } from "react";
import { clsx } from "clsx";

import logo from "@/assets/Icons/UnyteLogo.svg";

const iconTypes = {
  logo,
};

export type IconType = keyof typeof iconTypes;

type IconProps = Omit<ComponentPropsWithoutRef<"img">, "src" | "alt"> & {
  alt?: string;
  type: IconType;
  className?: string;
};

export const Icon: FC<IconProps> = ({ type, alt, className, ...props }) => {
  return (
    <img
      {...props}
      src={iconTypes[type]}
      alt={alt ? alt : ""}
      className={clsx("", className ? className : "")}
    />
  );
};
