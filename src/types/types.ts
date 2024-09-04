export const ClaimStatus = {
  Processing: "Processing",
  Submitted: "Submitted",
  Completed: "Completed",
} as const;

export type ClaimStatusType = keyof typeof ClaimStatus;

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

export enum UserType {
  company,
  agent,
}

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
  date: string;
  commission: number;
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
