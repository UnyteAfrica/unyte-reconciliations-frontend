import { PageContent } from "@/components/shared/page-content";
import { useState } from "react";
import { MerchantInsurerPoliciesTable } from "../tables/policy-tables";
import { MerchantInsurerPolicy, policyCategories } from "@/types/types";
import { generateRandomAffiliate } from "@/utils/data-generator";

export const MerchantInsurerPolicies = () => {
  const [page, setPage] = useState(1);
  const policies: MerchantInsurerPolicy[] = [
    {
      policyNo: "123jkf5402",
      policyCategory: policyCategories[1],
      insurer: "AXA Mansard",
      date: "May 7, 2023",
      premium: 40000,
      affiliate: generateRandomAffiliate(),
    },
    {
      policyNo: "123jkf5402",
      policyCategory: policyCategories[0],
      insurer: "AXA Mansard",
      date: "May 7, 2023",
      premium: 40000,
      affiliate: generateRandomAffiliate(),
    },
    {
      policyNo: "123jkf5402",
      policyCategory: policyCategories[0],
      insurer: "AXA Mansard",
      date: "May 7, 2023",
      premium: 40000,
      affiliate: generateRandomAffiliate(),
    },
    {
      policyNo: "123jkf5402",
      policyCategory: policyCategories[0],
      insurer: "AXA Mansard",
      date: "May 7, 2023",
      premium: 40000,
      affiliate: generateRandomAffiliate(),
    },
    {
      policyNo: "123jkf5402",
      policyCategory: policyCategories[0],
      insurer: "AXA Mansard",
      date: "May 7, 2023",
      premium: 40000,
      affiliate: generateRandomAffiliate(),
    },
  ];

  return (
    <PageContent
      title="Insurer Policies"
      searchbarPlaceholder="Find policy type"
      pageTable={<MerchantInsurerPoliciesTable policies={policies} />}
      page={page}
      totalItems={2}
      onPageChange={(page: number) => setPage(page)}
    />
  );
};
