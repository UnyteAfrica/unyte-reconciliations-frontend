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
  product: string;
  date: string;
  price: string;
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
