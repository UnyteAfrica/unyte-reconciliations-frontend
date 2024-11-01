import { LocalStorage } from "@/services/local-storage";
import { ApiCompanyPolicy, CompanyPolicy, Policy } from "@/types/types";
import { clsx, type ClassValue } from "clsx";
import { Moment } from "moment";
import { twMerge } from "tailwind-merge";
import * as changeCase from "change-case";
import hashIt from "hash-it";

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

export const addNaira = (amount: string) => nairaSign + amount;

export const clearCredentials = () => {
  LocalStorage.removeItem("accessToken");
  LocalStorage.removeItem("refreshToken");
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

export const getWeekValue = (date: Moment, isCondensed: boolean = false) => {
  const startOfWeek = date.clone().startOf("week");
  const startOfWeekMonthStr = isCondensed
    ? startOfWeek.format("MM")
    : startOfWeek.format("MMMM");
  const startOfWeekYearStr = startOfWeek.format("YYYY");
  const startOfMonth = startOfWeek.clone().startOf("month");

  const startOfMonthWeek = startOfMonth.week();
  let currWeek = startOfWeek.week();
  let weekInMonth = currWeek - startOfMonthWeek + 1;

  //This is where we handle an edge case for the first week of the year.
  // If the last week of the year goes past week 52, its week value becomes 1
  if (currWeek == 1) {
    currWeek = 53;
    weekInMonth = currWeek - startOfMonthWeek + 1;
  }

  return isCondensed
    ? `Wk ${weekInMonth} ${startOfWeekMonthStr}/${startOfWeekYearStr}`
    : `${startOfWeekMonthStr} Week ${weekInMonth} ${startOfWeekYearStr}`;
};

export const flattenApiPolicy = (
  apiPolicy: ApiCompanyPolicy
): CompanyPolicy[] => {
  const { agent, policies_sold, policy_category, policy_name } = apiPolicy;
  const basePolicy = {
    agent,
    policyCategory: policy_category,
    policyName: policy_name,
  };

  const result = [];
  for (let policy of policies_sold) {
    const newPolicy: CompanyPolicy = {
      ...basePolicy,
      date: policy.date_sold,
      policyType: policy.name,
      price: policy.premium,
    };
    result.push(newPolicy);
  }

  return result;
};

export const flattenApiPolicies = (
  apiPolicies: ApiCompanyPolicy[]
): CompanyPolicy[] => {
  const result = [];
  const nestedPolicies = apiPolicies.map(flattenApiPolicy);
  for (let policies of nestedPolicies) {
    for (let policy of policies) {
      result.push(policy);
    }
  }
  return result;
};

export const ascendingDateComparator = (date1: string, date2: string) => {
  if (date1 == date2) return 0;
  const [year1, month1, day1] = date1.split("-").map((str) => Number(str));
  const [year2, month2, day2] = date2.split("-").map((str) => Number(str));

  // -ve val means 1 before 2
  // +ve val means 2 before 1

  if (year1 < year2) return -1;
  if (year2 < year1) return 1;

  if (month1 < month2) return -1;
  if (month2 < month1) return 1;

  if (day1 < day2) return -1;
  if (day2 < day1) return 1;

  return 0;
};

export const descendingDateComparator = (date1: string, date2: string) => {
  if (date1 == date2) return 0;
  const [year1, month1, day1] = date1.split("-").map((str) => Number(str));
  const [year2, month2, day2] = date2.split("-").map((str) => Number(str));

  // -ve val means 1 before 2
  // +ve val means 2 before 1

  if (year1 < year2) return 1;
  if (year2 < year1) return -1;

  if (month1 < month2) return 1;
  if (month2 < month1) return -1;

  if (day1 < day2) return 1;
  if (day2 < day1) return -1;

  return 0;
};

export const sanitizePremium = (premium: string): string => {
  const alphaSet = new Set("abcdefghijklmnopqrstuvwxyz");
  const numSet = new Set("0123456789");
  const result = [];
  for (let char of premium) {
    if (numSet.has(char)) {
      result.push(char);
    }
    if (char == ".") {
      break;
    }
    if (alphaSet.has(char)) {
      return "";
    }
  }

  return result.join("");
};

export const createPolicyId = (policy: Policy) => {
  const type = changeCase.snakeCase(policy.name);
  const name = changeCase.snakeCase(policy.policy_name);

  const hash = hashIt(policy);
  return `${name}-${type}-${hash}`;
};
