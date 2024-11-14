import { ComponentPropsWithoutRef, FC } from "react";
import { clsx } from "clsx";

import logo from "@/assets/Icons/UnyteLogo.svg";
import receipt from "@/assets/Icons/receipt.svg";
import dollar from "@/assets/Icons/dollar.svg";
import healthInsurance from "@/assets/Icons/health-insurance.svg";
import motorInsurance from "@/assets/Icons/motor-insurance.svg";
import travelInsurance from "@/assets/Icons/travel-insurance.svg";
import deviceInsurance from "@/assets/Icons/device-insurance.svg";
import verified from "@/assets/Icons/verified.svg";
import qr from "@/assets/Icons/qr.svg";
import travel from "@/assets/Icons/travel.svg";
import whiteReceipt from "@/assets/Icons/white-receipt.svg";
import arrowBack from "@/assets/Icons/arrow-back.svg";
import close from "@/assets/Icons/close.svg";
import call from "@/assets/Icons/call.svg";
import arrowForward from "@/assets/Icons/arrow-forward.svg";
import mail from "@/assets/Icons/mail.svg";
import cancel from "@/assets/Icons/Cancel.svg";

export const iconTypes = {
  logo,
  receipt,
  dollar,
  healthInsurance,
  motorInsurance,
  travelInsurance,
  deviceInsurance,
  verified,
  qr,
  travel,
  whiteReceipt,
  arrowBack,
  close,
  call,
  arrowForward,
  mail,
  cancel,
};

export type IconType = keyof typeof iconTypes;

typeof iconTypes;

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
