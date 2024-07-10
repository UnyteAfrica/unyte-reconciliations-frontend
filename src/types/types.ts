export const ClaimStatus = {
  Processing: "Processing",
  Submitted: "Submitted",
  Completed: "Completed",
} as const;

type ClaimStatusType = keyof typeof ClaimStatus;

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
  policyRef: string;
  policyNo: string;
  agentId: string;
  date: string;
  price: number;
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
  commissions: number;
  policiesSold: number;
};
