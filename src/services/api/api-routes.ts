import { urlPageWrapper } from "@/utils/utils";

const BaseRoutes = {
  signup: "/sign-up",
  login: "/sign-in",
  verify: "/verify-otp",
  newOTP: "/request-new-otp",
  forgotPassword: "/forgot-password",
  passwordReset: "/reset-password",
  details: "/user-details",
  inviteAgent: "/generate-agent-sign-up",
  inviteAgentsThroughCSV: "/generate-agent-sign-up-csv",
  profile: "/user-profile",
  resetToken: "/refresh-access-token",
  updateProfilePicture: "/update-profile-picture",
  dashboard: "/dashboard",
  response: "/response",
  agents: "/all-agents",
  quoteParams: (policyCategory: string) => `/response/${policyCategory}`,
  policies: (page?: number) => urlPageWrapper(`/policies`, page),
  products: (page?: number) => urlPageWrapper(`/products`, page),
  claims: (page?: number) => urlPageWrapper(`/claims`, page),
  dateRangePolicies: (startDate: string, endDate: string) =>
    `/view-all-policies-date-range?start_date=${startDate}&end_date=${endDate}`,
};

const RouteTypes = {
  company: "insurer",
  agent: "agent",
  user: "user",
  merchant: "merchants",
};

export const AuthApiRoutes = {
  login: RouteTypes.user + BaseRoutes.login,
  verifyOTP: RouteTypes.user + BaseRoutes.verify,
  resendOTP: RouteTypes.user + BaseRoutes.newOTP,
  forgotPassword: RouteTypes.user + BaseRoutes.forgotPassword,
  resetPassword: RouteTypes.user + BaseRoutes.passwordReset,
  resetToken: RouteTypes.user + BaseRoutes.resetToken,
  profile: RouteTypes.user + BaseRoutes.profile,
  details: RouteTypes.user + BaseRoutes.details,
};

export const CompanyDashboardApiRoutes = {
  policies: (page?: number) =>
    BaseRoutes.dashboard + "/" + RouteTypes.company + BaseRoutes.policies(page),
  claims: (page?: number) =>
    BaseRoutes.dashboard + "/" + RouteTypes.company + BaseRoutes.claims(page),
  products: (page?: number) =>
    BaseRoutes.dashboard + "/" + RouteTypes.company + BaseRoutes.products(page),
};

export const MerchantDashboardApiRoutes = {
  policies: (page?: number) =>
    BaseRoutes.dashboard +
    "/" +
    RouteTypes.merchant +
    BaseRoutes.policies(page),
  products: (page?: number) =>
    BaseRoutes.dashboard +
    "/" +
    RouteTypes.merchant +
    BaseRoutes.products(page),
};

export const CompanyApiRoutes = {
  signup: RouteTypes.company + BaseRoutes.signup,
  inviteAgent: RouteTypes.company + BaseRoutes.inviteAgent,
  inviteAgentsThroughCSV:
    RouteTypes.company + BaseRoutes.inviteAgentsThroughCSV,

  updateProfilePicture: RouteTypes.company + BaseRoutes.updateProfilePicture,
  getAllAgents: RouteTypes.company + BaseRoutes.agents,
  getPolicies: (page: number) => RouteTypes.company + BaseRoutes.policies(page),
  getDateRangePolicies: (startDate: string, endDate: string) =>
    RouteTypes.company + BaseRoutes.dateRangePolicies(startDate, endDate),
};

export const AgentApiRoutes = {
  signup: RouteTypes.agent + BaseRoutes.signup,
  policies: (page?: number) => RouteTypes.agent + BaseRoutes.policies(page),
  products: (page?: number) => RouteTypes.agent + BaseRoutes.products(page),
  quoteParams: (policyCategory: string) =>
    RouteTypes.agent + BaseRoutes.quoteParams(policyCategory),
};

export const MerchantApiRoutes = {
  signup: RouteTypes.merchant + BaseRoutes.signup,
};

export const UNPROTECTED_ROUTES = [
  CompanyApiRoutes.signup,
  AgentApiRoutes.signup,
  AuthApiRoutes.login,
  AuthApiRoutes.verifyOTP,
  AuthApiRoutes.resendOTP,
  AuthApiRoutes.forgotPassword,
  AuthApiRoutes.resetPassword,
  AuthApiRoutes.resetToken,
];
