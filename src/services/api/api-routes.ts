const BaseRoutes = {
  signup: "/sign-up",
  login: "/sign-in",
  verify: "/verify-otp",
  newOTP: "/new-otp",
  forgotPassword: "/forgot-password",
  passwordReset: "/password-reset",
  details: "/details",
  inviteAgent: "/generate-agent-sign-up",
  insurerProfile: "/insurer-profile",
  resetToken: "/refresh-access-token",
  updateProfilePicture: "/update-profile-picture",
  agents: "/all-agents",
  policies: (page: number) => `/view-all-policies?page=${page}`,
  dateRangePolicies: (startDate: string, endDate: string) =>
    `/view-all-policies-date-range?start_date=${startDate}&end_date=${endDate}`,
};

const RouteTypes = {
  company: "insurer",
  agent: "agent",
};

export const CompanyApiRoutes = {
  signup: RouteTypes.company + BaseRoutes.signup,
  login: RouteTypes.company + BaseRoutes.login,
  verifyOTP: RouteTypes.company + BaseRoutes.verify,
  resendOTP: RouteTypes.company + BaseRoutes.newOTP,
  forgotPassword: RouteTypes.company + BaseRoutes.forgotPassword,
  resetPassword: RouteTypes.company + BaseRoutes.passwordReset,
  details: RouteTypes.company + BaseRoutes.details,
  profile: RouteTypes.company + BaseRoutes.insurerProfile,
  inviteAgent: RouteTypes.company + BaseRoutes.inviteAgent,
  resetToken: RouteTypes.company + BaseRoutes.resetToken,
  updateProfilePicture: RouteTypes.company + BaseRoutes.updateProfilePicture,
  getAllAgents: RouteTypes.company + BaseRoutes.agents,
  getPolicies: (page: number) => RouteTypes.company + BaseRoutes.policies(page),
  getDateRangePolicies: (startDate: string, endDate: string) =>
    RouteTypes.company + BaseRoutes.dateRangePolicies(startDate, endDate),
};

export const AgentApiRoutes = {
  signup: RouteTypes.agent + BaseRoutes.signup,
  login: RouteTypes.agent + BaseRoutes.login,
  verifyOTP: RouteTypes.agent + BaseRoutes.verify,
  resendOTP: RouteTypes.agent + BaseRoutes.newOTP,
  forgotPassword: RouteTypes.agent + BaseRoutes.forgotPassword,
  resetPassword: RouteTypes.agent + BaseRoutes.passwordReset,
  details: RouteTypes.agent + BaseRoutes.details,
  profile: RouteTypes.agent + BaseRoutes.insurerProfile,
  inviteAgent: RouteTypes.agent + BaseRoutes.inviteAgent,
  resetToken: RouteTypes.agent + BaseRoutes.resetToken,
};

export const COMPANY_UNPROTECTED_ROUTES = [
  CompanyApiRoutes.signup,
  CompanyApiRoutes.login,
  CompanyApiRoutes.verifyOTP,
  CompanyApiRoutes.resendOTP,
  CompanyApiRoutes.forgotPassword,
  CompanyApiRoutes.resetPassword,
  CompanyApiRoutes.resetToken,
];

export const AGENT_UNPROTECTED_ROUTES = [
  AgentApiRoutes.signup,
  AgentApiRoutes.login,
  AgentApiRoutes.verifyOTP,
  AgentApiRoutes.resendOTP,
  AgentApiRoutes.forgotPassword,
  AgentApiRoutes.resetPassword,
  AgentApiRoutes.resetToken,
];
