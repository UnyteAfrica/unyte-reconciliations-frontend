import { UserType } from "@/types/types";

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
    localStorage.removeItem("companyAccessToken");
    localStorage.removeItem("companyRefreshToken");
  }
  if (userType == UserType.agent) {
    localStorage.removeItem("agentAccessToken");
    localStorage.removeItem("agentRefreshToken");
  }
};
