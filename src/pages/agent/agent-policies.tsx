import { AgentPoliciesTable } from "../../components/tables/policy-tables";
import { AgentPolicy } from "@/types/types";
import { PageContent } from "@/components/shared/page-content";

const policies: AgentPolicy[] = [
  {
    policyRef: "#WP62F3E8F93",
    policyNo: "123jkf5402",
    product: "Comprehensive",
    date: "May 7, 2023",
    price: "₦40,000.00",
  },
  {
    policyRef: "#WP62F3E8F93",
    policyNo: "123jkf5402",
    product: "Credit Life",
    date: "May 7, 2023",
    price: "₦40,000.00",
  },
  {
    policyRef: "#WP62F3E8F93",
    policyNo: "123jkf5402",
    product: "Card Protect",
    date: "May 7, 2023",
    price: "₦40,000.00",
  },
  {
    policyRef: "#WP62F3E8F93",
    policyNo: "123jkf5402",
    product: "Student",
    date: "May 7, 2023",
    price: "₦40,000.00",
  },
  {
    policyRef: "#WP62F3E8F93",
    policyNo: "123jkf5402",
    product: "Travel",
    date: "May 7, 2023",
    price: "₦40,000.00",
  },
  {
    policyRef: "#WP62F3E8F93",
    policyNo: "123jkf5402",
    product: "Device",
    date: "May 7, 2023",
    price: "₦40,000.00",
  },
];

export const AgentPolicies = () => {
  return (
    <PageContent
      title="Policies"
      pageTable={<AgentPoliciesTable policies={policies} />}
    />
  );
};
