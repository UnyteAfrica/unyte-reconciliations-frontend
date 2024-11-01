export const BrowserRoutes = {
  login: "/login",
  signup: "/sign-up",
  agent: "/agent",
  company: "/company",
  merchant: "/merchant",
  overview: "/overview",
  dashboard: "/dashboard",
  policies: "/policies",
  commissions: "/commissions",
  insurer: "/insurer",
  sold: "/sold",
  customers: "/customers",
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
  agentSignup: BrowserRoutes.agent + BrowserRoutes.signup,
  agentDashboard: BrowserRoutes.agent + BrowserRoutes.dashboard,
  agentOverview:
    BrowserRoutes.agent + BrowserRoutes.dashboard + BrowserRoutes.overview,
  companySignup: BrowserRoutes.company + BrowserRoutes.signup,
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
  merchantSignup: BrowserRoutes.merchant + BrowserRoutes.signup,
  merchantDashboard: BrowserRoutes.merchant + BrowserRoutes.dashboard,
  merchantViewClaim: BrowserRoutes.merchant + BrowserRoutes.viewClaim,
  merchantOverview:
    BrowserRoutes.merchant + BrowserRoutes.dashboard + BrowserRoutes.overview,
  pendingMerchantClaims:
    BrowserRoutes.merchant +
    BrowserRoutes.dashboard +
    BrowserRoutes.claims +
    BrowserRoutes.pending,
  completedMerchantClaims:
    BrowserRoutes.merchant +
    BrowserRoutes.dashboard +
    BrowserRoutes.claims +
    BrowserRoutes.completed,
  merchantInsurerPolicies:
    BrowserRoutes.merchant +
    BrowserRoutes.dashboard +
    BrowserRoutes.policies +
    BrowserRoutes.insurer,
  merchantSoldPolicies:
    BrowserRoutes.merchant +
    BrowserRoutes.dashboard +
    BrowserRoutes.policies +
    BrowserRoutes.sold,
};
