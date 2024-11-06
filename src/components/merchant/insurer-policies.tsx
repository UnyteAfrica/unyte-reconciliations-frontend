import { PageContent } from "@/components/shared/page-content";
import { useState } from "react";
import { PAGE_COUNT } from "@/utils/constants";
import { MerchantInsurerPoliciesTable } from "../tables/policy-tables";
import { MerchantInsurerPolicy } from "@/types/types";

export const MerchantInsurerPolicies = () => {
  const [page, setPage] = useState(1);
  const policies: MerchantInsurerPolicy[] = [
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
      searchbarPlaceholder="Find policy type"
      pageTable={<MerchantInsurerPoliciesTable policies={policies} />}
      page={page}
      pageCount={PAGE_COUNT}
      totalItems={2}
      onPageChange={(page: number) => setPage(page)}
    />
  );
};
