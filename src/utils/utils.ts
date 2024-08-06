import { LocalStorage } from "@/services/local-storage";
import { UserType } from "@/types/types";
import { useEffect, useRef, useState } from "react";

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

export const useMediaQuery: (minPx: number) => {
  isMediaQueryMatched: boolean;
} = (minPx) => {
  const [isMediaQueryMatched, setIsMediaQueryMatched] = useState(false);
  const hasSetInitially = useRef(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia(`(min-width: ${minPx}px)`);
    if (!hasSetInitially.current) {
      setIsMediaQueryMatched(mediaQuery.matches);
      hasSetInitially.current = true;
    }
    window
      .matchMedia(`(min-width: ${minPx}px)`)
      .addEventListener("change", (ev) => {
        if (ev.matches) {
          setIsMediaQueryMatched(true);
        } else {
          setIsMediaQueryMatched(false);
        }
      });
  }, [minPx]);

  return {
    isMediaQueryMatched,
  };
};
