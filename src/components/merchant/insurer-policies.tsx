import { PageContent } from "@/components/shared/page-content";
import { InsurerPolicy } from "@/types/types";
import { useState } from "react";
import { PAGE_COUNT } from "@/utils/constants";
import { InsurerPoliciesTable } from "../tables/policy-tables";

export const MerchantInsurerPolicies = () => {
  const [page, setPage] = useState(1);
  const policies: InsurerPolicy[] = [
    {
      policyNo: "123jkf5402",
      policyType: "Health Insurance",
      insurer: "AXA Mansard",
      date: "May 7, 2023",
      premium: 40000,
    },
    {
      policyNo: "123jkf5402",
      policyType: "Health Insurance",
      insurer: "AXA Mansard",
      date: "May 7, 2023",
      premium: 40000,
    },
    {
      policyNo: "123jkf5402",
      policyType: "Health Insurance",
      insurer: "AXA Mansard",
      date: "May 7, 2023",
      premium: 40000,
    },
    {
      policyNo: "123jkf5402",
      policyType: "Health Insurance",
      insurer: "AXA Mansard",
      date: "May 7, 2023",
      premium: 40000,
    },
    {
      policyNo: "123jkf5402",
      policyType: "Health Insurance",
      insurer: "AXA Mansard",
      date: "May 7, 2023",
      premium: 40000,
    },
  ];

  return (
    <PageContent
      title="Insurer Policies"
      pageTable={<InsurerPoliciesTable policies={policies} />}
      page={page}
      pageCount={PAGE_COUNT}
      totalItems={2}
      onPageChange={(page: number) => setPage(page)}
    />
  );
};
