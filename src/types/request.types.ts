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

export type CompanyPasswordResetType = {
  newPassword: string;
  token: string;
  idBase64: string;
};

export type InviteAgentType = { names: string; emails: string }[];

export type AgentVerifyOTPType = {
  email: string;
  otp: string;
};

export type AgentLoginType = {
  emailOrGampID: string;
  password: string;
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
  agent_gampID: string;
  password: string;
  companyInviteCode: string;
};

export type AgentPasswordResetType = {
  newPassword: string;
  token: string;
  idBase64: string;
};
