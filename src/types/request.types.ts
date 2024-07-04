export type CompanySignupType = {
  business_name: string;
  admin_name: string;
  business_registration_number: string;
  email: string;
  password: string;
  gampId: string | undefined;
};

export type CompanyLoginType = {
  email: string;
  password: string;
};

export type CompanyVerifyOTPType = {
  email: string;
  otp: string;
};

export type AgentSignupType = {
  firstName: string;
  lastName: string;
  middleName: string;
  homeAddress: string;
  email: string;
  bankName: string;
  accountNo: string;
  bvn: string;
  affiliatedCompany: string;
  agent_gampID: string;
  password: string;
};

export type CompanyPasswordResetType = {
  newPassword: string;
  token: string;
  idBase64: string;
};
