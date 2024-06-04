import { ComponentPropsWithoutRef, FC } from "react";
import { clsx } from "clsx";

import add from "src/assets/svg/add.svg";

import calendarEmpty from "src/assets/svg/calendar-empty.svg";
import carDark from "src/assets/svg/car-dark.svg";
import debitCard from "src/assets/svg/debit-card.svg";
import debitCardActive from "src/assets/svg/debit-card-active.svg";
import filter from "src/assets/svg/filter.svg";
import go from "src/assets/svg/go.svg";
import goActive from "src/assets/svg/go-active.svg";
import greaterThan from "src/assets/svg/greater-than.svg";
import headphones from "src/assets/svg/headphones.svg";
import headphonesActive from "src/assets/svg/headphones-active.svg";
import help from "src/assets/svg/help.svg";
import locationPin from "src/assets/svg/mountain-top.svg";
import notification from "src/assets/svg/notification.svg";
import search from "src/assets/svg/search.svg";
import settings from "src/assets/svg/settings.svg";
import settingsActive from "src/assets/svg/settings-active.svg";
import share from "src/assets/svg/share.svg";
import shareActive from "src/assets/svg/share-active.svg";
import logo from "src/assets/svg/logo.svg";
import clock from "src/assets/svg/clock.svg";
import clockActive from "src/assets/svg/clock-active.svg";
import logo2 from "src/assets/svg/logo2.svg";
import ticket from "src/assets/svg/ticket.svg";

const iconTypes = {
  add,
  calendarEmpty,
  carDark,
  debitCard,
  debitCardActive,
  filter,
  go,
  goActive,
  greaterThan,
  headphones,
  headphonesActive,
  help,
  locationPin,
  notification,
  search,
  settings,
  settingsActive,
  share,
  shareActive,
  logo,
  logo2,
  clock,
  clockActive,
  ticket,
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
