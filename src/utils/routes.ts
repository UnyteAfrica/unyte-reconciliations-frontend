export const BrowserRoutes = {
  login: "/login",
  signup: "/signup",
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
};

export const BrowserComboRoutes = {
  agentLogin: BrowserRoutes.agent + BrowserRoutes.login,
  agentSignup: BrowserRoutes.agent + BrowserRoutes.signup,
  companyLogin: BrowserRoutes.company + BrowserRoutes.login,
  companySignup: BrowserRoutes.company + BrowserRoutes.signup,
  agentDashboard: BrowserRoutes.agent + BrowserRoutes.dashboard,
  companyDashboard: BrowserRoutes.company + BrowserRoutes.dashboard,
};
