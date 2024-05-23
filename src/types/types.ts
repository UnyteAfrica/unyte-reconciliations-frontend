export type Claim = {
  policyNo: string;
  email: string;
  date: string;
  insurer: string;
  status: string;
  estimate: string;
};

export type Policy = {
  policyRef: string;
  policyNo: string;
  insurer: string;
  date: string;
  price: string;
};
