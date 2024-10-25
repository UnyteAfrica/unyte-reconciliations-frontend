export type CompanySignupType = {
  business_name: string;
  admin_name: string;
  business_registration_number: string;
  email: string;
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
  password: string;
  companyInviteCode: string;
};

export type LoginType = {
  email: string;
  password: string;
};

export type VerifyOTPType = {
  email: string;
  otp: string;
};

export type PasswordResetType = {
  newPassword: string;
  token: string;
  idBase64: string;
};

export type InviteAgentType = { names: string; emails: string }[];
