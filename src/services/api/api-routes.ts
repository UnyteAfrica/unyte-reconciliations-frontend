const BaseRoutes = {
  signup: "/sign-up",
  login: "/sign-in",
  verify: "/verify-otp",
  newOTP: "/new-otp",
  forgotPassword: "/forgot-password",
  passwordReset: "/reset-password",
  details: "/user-details",
  inviteAgent: "/generate-agent-sign-up",
  inviteAgentsThroughCSV: "/generate-agent-sign-up-csv",
  profile: "/user-profile",
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
  user: "user",
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
