const BaseRoutes = {
  signup: "/sign-up",
};

const RouteTypes = {
  company: "insurer",
  agent: "agent",
};

export const CompanyApiRoutes = {
  companySignup: RouteTypes.company + BaseRoutes.signup,
};
