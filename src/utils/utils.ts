import { LocalStorage } from "@/services/local-storage";
import { UserType } from "@/types/types";
import { clsx, type ClassValue } from "clsx";
import { Moment } from "moment";
import { twMerge } from "tailwind-merge";

export const nairaSign = "₦";

export const formatAmount = (amount: number) => {
  const amountStr = amount.toString();
  const res = [];
  let count = 0;
  for (let i = amountStr.length - 1; i >= 0; i--) {
    res.unshift(amountStr[i]);
    count++;
    if (count == 3 && i != 0) {
      res.unshift(",");
      count = 0;
    }
  }
  return res.join("");
};

export const formatToNaira = (amount: number) =>
  nairaSign + formatAmount(amount);

export const clearCredentials = (userType: UserType) => {
  if (userType == UserType.company) {
    LocalStorage.removeItem("companyAccessToken");
    LocalStorage.removeItem("companyRefreshToken");
  }
  if (userType == UserType.agent) {
    LocalStorage.removeItem("agentAccessToken");
    LocalStorage.removeItem("agentRefreshToken");
  }
};

export const splitQueryParams = (query: string) => {
  const queries = query.split("&");
  const queryParamObj: { [key: string]: string } = {};
  for (let query of queries) {
    const querySplit = query.split("=");
    const key = querySplit[0].startsWith("?")
      ? querySplit[0].substring(1)
      : querySplit[0];
    const value = querySplit[1];
    queryParamObj[key] = value;
  }

  return queryParamObj;
};

export const getInitials = (firstName: string, lastName: string) =>
  firstName.substring(0, 1).toUpperCase() +
  lastName.substring(0, 1).toUpperCase();

export const getCompanyInitials = (companyName: string) => {
  let words = companyName.split(" ");
  let initals = "";
  for (let word of words) {
    initals += word[0].toUpperCase();
  }
  return initals;
};

export const dateOffset = (dayOffset: number): number => {
  const currDateInMilliseconds = new Date().getTime();
  const oneDayInMilliSeconds = 24 * 60 * 60 * 1000;
  const offsetInMilliseconds = dayOffset * oneDayInMilliSeconds;
  return currDateInMilliseconds - offsetInMilliseconds;
};

export const formatMillisecondsDateToDDMM = (
  milliSecondsDate: number
): string => {
  const date = new Date(milliSecondsDate);
  let finalDate = "";
  const day = date.getDate();
  finalDate = day >= 10 ? day.toString() : "0" + day.toString();

  const month = date.getMonth() + 1;
  finalDate += "/" + (month >= 10 ? month.toString() : "0" + month.toString());

  return finalDate;
};

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const getWeekValue = (date: Moment) => {
  const month = date.format("MMMM");
  const startOfMonth = date.clone().startOf("month");

  const startOfMonthWeek = startOfMonth.week();
  const currWeek = date.week();
  const weekInMonth = currWeek - startOfMonthWeek + 1;

  return `${month} Week ${weekInMonth}`;
};
