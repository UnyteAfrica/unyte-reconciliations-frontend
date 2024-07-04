const BaseRoutes = {
  signup: "/sign-up",
  login: "/sign-in",
  verify: "/verify-otp",
  newOTP: "/new-otp",
  confirmEmail: "/confirm-email",
  passwordReset: "/password-reset",
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
  forgotPassword: RouteTypes.company + BaseRoutes.confirmEmail,
  resetPassword: RouteTypes.company + BaseRoutes.passwordReset,
};

export const AgentApiRoutes = {
  signup: RouteTypes.agent + BaseRoutes.signup,
};
