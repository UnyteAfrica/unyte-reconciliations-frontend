import { CompanyPolicy } from "@/types/types";
import { PageContent } from "@/components/shared/page-content";
import { CompanyPoliciesTable } from "@/components/tables/policy-tables";

const policies: CompanyPolicy[] = [
  {
    policyRef: "#WP62F3E8F93",
    policyNo: "123jkf5402",
    date: "May 7, 2023",
    price: 40000,
    agentId: "ID-023535393",
  },
  {
    policyRef: "#WP62F3E8F93",
    policyNo: "123jkf5402",
    date: "May 7, 2023",
    price: 40000,
    agentId: "ID-023535394",
  },
  {
    policyRef: "#WP62F3E8F93",
    policyNo: "123jkf5402",
    date: "May 7, 2023",
    price: 40000,
    agentId: "ID-023535395",
  },
  {
    policyRef: "#WP62F3E8F93",
    policyNo: "123jkf5402",
    date: "May 7, 2023",
    price: 40000,
    agentId: "ID-023535396",
  },
  {
    policyRef: "#WP62F3E8F93",
    policyNo: "123jkf5402",
    date: "May 7, 2023",
    price: 40000,
    agentId: "ID-023535397",
  },
  {
    policyRef: "#WP62F3E8F93",
    policyNo: "123jkf5402",
    date: "May 7, 2023",
    price: 40000,
    agentId: "ID-023535398",
  },
];

export const CompanyPolicies = () => {
  return (
    <PageContent
      title="Policies"
      pageTable={<CompanyPoliciesTable policies={policies} />}
    />
  );
};
