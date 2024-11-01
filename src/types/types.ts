import { IconType } from "@/components/shared/icon";

export const ClaimStatus = {
  Processing: "Processing",
  Submitted: "Submitted",
  Completed: "Completed",
} as const;

export type ClaimStatusType = keyof typeof ClaimStatus;

export const UserType = {
  INSURER: "INSURER",
  AGENT: "AGENT",
  MERCHANT: "MERCHANT",
} as const;

export enum ApiType {
  Insurer,
  Agent,
}

export type Claim = {
  policyNo: string;
  email: string;
  date: string;
  insurer: string;
  status: ClaimStatusType;
  estimate: number;
};

export type AgentPolicy = {
  policyRef: string;
  policyNo: string;
  product: string;
  date: string;
  price: number;
};

export type CompanyPolicy = {
  agent: string;
  policyCategory: string;
  policyName: string;
  policyType: string;
  date: string;
  price: string;
};

export type ApiCompanyPolicy = {
  agent: string;
  policies_sold: {
    date_sold: string;
    flat_fee: string;
    name: string;
    premium: string;
  }[];
  policy_category: string;
  policy_name: string;
};

export type Commission = {
  policyRef: string;
  policyNo: string;
  product: string;
  premium: number;
  date: string;
  commission: number;
};

export type PolicyType = {
  name: string;
  description: string;
  iconType: IconType;
};

export type Customer = {
  name: string;
  phoneNo: string;
  email: string;
  activePolicies: CustomerPolicy[];
  inactivePolicies: CustomerPolicy[];
};

export type CustomerPolicy = {
  policyName: string;
  price: number;
};

export type DeviceTableEntry = {
  policyNo: string;
  policyType: string;
  device: {
    name: string;
    model: string;
    imei: string;
  };
};

export type Agent = {
  id: string;
  name: string;
  email: string;
  commissions: number;
  policiesSold: number;
};

export type ApiCompanyAgent = {
  email: string;
  first_name: string;
  id: number;
  last_name: string;
};

export type PaginationWrapper<T> = {
  count: number;
  next: string | null;
  previous: string | null;
  results: T[];
};

export type FlatFeeStatus = "NO" | "YES";

export type DateRangePolicy = {
  agent: string;
  date_sold: string;
  flat_fee: FlatFeeStatus;
  name: string;
  policy_category: string;
  policy_name: string;
  premium: string;
};

export type Policy = {
  agent: string;
  date_sold: string;
  flat_fee: FlatFeeStatus;
  name: string;
  policy_category: string;
  policy_name: string;
  premium: string;
};

export type BasePolicy = {
  policyType: string;
  policyNo: string;
  date: string;
  premium: number;
};

export type InsurerPolicy = BasePolicy & { insurer: string };

export type SoldPolicy = BasePolicy & { userEmail: string };
