export const BrowserRoutes = {
  login: "/login",
  signup: "/sign-up",
  agent: "/agent",
  company: "/company",
  overview: "/overview",
  dashboard: "/dashboard",
  policies: "/policies",
  commissions: "/commissions",
  devices: "/devices",
  profile: "/profile",
  claims: "/claims",
  agents: "/agents",
  pending: "/pending",
  completed: "/completed",
  forgotPassword: "/forgot-password",
  resetPassword: "/reset-password",
  viewClaim: "/view-claim",
  verify: "/verify",
  wildcard: "/*",
};

export const BrowserComboRoutes = {
  agentLogin: BrowserRoutes.agent + BrowserRoutes.login,
  agentSignup: BrowserRoutes.agent + BrowserRoutes.signup,
  agentForgotPassword: BrowserRoutes.agent + BrowserRoutes.forgotPassword,
  agentResetPassword: BrowserRoutes.agent + BrowserRoutes.resetPassword,
  agentVerify: BrowserRoutes.agent + BrowserRoutes.verify,
  agentDashboard: BrowserRoutes.agent + BrowserRoutes.dashboard,
  agentOverview:
    BrowserRoutes.agent + BrowserRoutes.dashboard + BrowserRoutes.overview,
  companyLogin: BrowserRoutes.company + BrowserRoutes.login,
  companySignup: BrowserRoutes.company + BrowserRoutes.signup,
  companyForgotPassword: BrowserRoutes.company + BrowserRoutes.forgotPassword,
  companyResetPassword: BrowserRoutes.company + BrowserRoutes.resetPassword,
  companyVerify: BrowserRoutes.company + BrowserRoutes.verify,
  companyDashboard: BrowserRoutes.company + BrowserRoutes.dashboard,
  companyViewClaim: BrowserRoutes.company + BrowserRoutes.viewClaim,
  companyOverview:
    BrowserRoutes.company + BrowserRoutes.dashboard + BrowserRoutes.overview,
  pendingCompanyClaims:
    BrowserRoutes.company +
    BrowserRoutes.dashboard +
    BrowserRoutes.claims +
    BrowserRoutes.pending,
  completedCompanyClaims:
    BrowserRoutes.company +
    BrowserRoutes.dashboard +
    BrowserRoutes.claims +
    BrowserRoutes.completed,
};
