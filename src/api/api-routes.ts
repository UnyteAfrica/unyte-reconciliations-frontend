const BaseRoutes = {
  signup: "/sign-up",
  login: "/sign-in",
  verify: "/verify-otp",
  newOTP: "/new-otp",
  forgotPassword: "/forgot-password",
  passwordReset: "/password-reset",
  details: "/details",
  inviteAgent: "/gen-agent-sign-up",
  insurerProfile: "/insurer-profile",
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
};

export const AgentApiRoutes = {
  signup: RouteTypes.agent + BaseRoutes.signup,
  login: RouteTypes.agent + BaseRoutes.login,
  verifyOTP: RouteTypes.agent + BaseRoutes.verify,
  resendOTP: RouteTypes.agent + BaseRoutes.newOTP,
  forgotPassword: RouteTypes.agent + BaseRoutes.forgotPassword,
  resetPassword: RouteTypes.agent + BaseRoutes.passwordReset,
};
