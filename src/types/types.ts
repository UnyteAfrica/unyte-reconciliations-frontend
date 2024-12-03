import { IconType } from "@/components/shared/icon";

export const ClaimStatus = {
  Processing: "Processing",
  Submitted: "Submitted",
  Completed: "Completed",
} as const;

export const AgentStatus = {
  Active: "Active",
  Inactive: "Inactive",
} as const;

export const policyCategories = [
  "",
  "Health Policy",
  "Accident Policy",
  "Property Policy",
  "Fire Policy",
  "Life Policy",
  "Motor Policy",
  "Comprehensive Policy",
  "Investment Policy",
  "Education Policy",
  "Credit Policy",
  "Travel Policy",
  "Marine Policy",
  "Business Policy",
  "Bond Policy",
] as const;

export const affiliateTypes = ["Agent", "Merchant"] as const;

export type PolicyCategory = (typeof policyCategories)[number];
export type AffiliateType = (typeof affiliateTypes)[number];
export type ClaimStatusType = keyof typeof ClaimStatus;
export type AgentStatusType = keyof typeof AgentStatus;

export type Filter = {
  selectedPolicyCategories: Partial<Record<PolicyCategory, boolean>>;
  startDate: Date;
  endDate: Date;
  minAmount: string;
  maxAmount: string;
  searchText: string;
  active: boolean;
};

export const UserType = {
  INSURER: "INSURER",
  AGENT: "AGENT",
  MERCHANT: "MERCHANT",
} as const;

export enum ApiType {
  Insurer,
  Agent,
}

export type BaseClaim = {
  policyNo: string;
  email: string;
  date: string;
  claimType: string;
  status: ClaimStatusType;
};

export type Claim = BaseClaim & { estimate: number };

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
  dateAdded: string;
  commissions: number;
  policiesSold: number;
  agentStatus: AgentStatusType;
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

export type Affiliate = {
  id: string;
  name: string;
  type: AffiliateType;
};

export type BasePolicy = {
  policyCategory: PolicyCategory;
  policyNo: string;
  affiliate: Affiliate;
  date: string;
  premium: number;
};

export type MerchantInsurerPolicy = BasePolicy & { insurer: string };

export type MerchantSoldPolicy = BasePolicy & { userEmail: string };
