import { PageContent } from "@/components/shared/page-content";
import { CommissionsTable } from "@/components/tables/commissions-table";
import { Commission } from "@/types/types";

const commissions: Commission[] = [
  {
    policyRef: "#WP62F3E8F93",
    policyNo: "123jkf5402",
    product: "Comprehensive",
    date: "May 7, 2023",
    commission: 40000,
  },
  {
    policyRef: "#WP62F3E8F93",
    policyNo: "123jkf5402",
    product: "Credit Life",
    date: "May 7, 2023",
    commission: 40000,
  },
  {
    policyRef: "#WP62F3E8F93",
    policyNo: "123jkf5402",
    product: "Card Protect",
    date: "May 7, 2023",
    commission: 40000,
  },
  {
    policyRef: "#WP62F3E8F93",
    policyNo: "123jkf5402",
    product: "Student",
    date: "May 7, 2023",
    commission: 40000,
  },
  {
    policyRef: "#WP62F3E8F93",
    policyNo: "123jkf5402",
    product: "Travel",
    date: "May 7, 2023",
    commission: 40000,
  },
  {
    policyRef: "#WP62F3E8F93",
    policyNo: "123jkf5402",
    product: "Device",
    date: "May 7, 2023",
    commission: 40000,
  },
];

export const Commissions = () => {
  return (
    <PageContent
      title="Commissions"
      pageTable={<CommissionsTable commissions={commissions} />}
    />
  );
};
