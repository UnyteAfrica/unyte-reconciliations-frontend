import { PageContent } from "@/components/shared/page-content";
import { MerchantSoldPolicy, policyCategories } from "@/types/types";
import { useState } from "react";
import { MerchantSoldPoliciesTable } from "../tables/policy-tables";
import { generateRandomAffiliate } from "@/utils/data-generator";

export const MerchantSoldPolicies = () => {
  const [page, setPage] = useState(1);
  const policies: MerchantSoldPolicy[] = [
    {
      policyNo: "123jkf5402",
      policyCategory: policyCategories[1],
      userEmail: "john@doe.com",
      date: "May 7, 2023",
      premium: 40000,
      affiliate: generateRandomAffiliate(),
    },
    {
      policyNo: "123jkf5402",
      policyCategory: policyCategories[1],
      userEmail: "john@doe.com",
      date: "May 7, 2023",
      premium: 40000,
      affiliate: generateRandomAffiliate(),
    },
    {
      policyNo: "123jkf5402",
      policyCategory: policyCategories[1],
      userEmail: "fortunate@unyte.africa",
      date: "May 7, 2023",
      premium: 40000,
      affiliate: generateRandomAffiliate(),
    },
    {
      policyNo: "123jkf5402",
      policyCategory: policyCategories[1],
      userEmail: "dro@tech.com",
      date: "May 7, 2023",
      premium: 40000,
      affiliate: generateRandomAffiliate(),
    },
    {
      policyNo: "123jkf5402",
      policyCategory: policyCategories[1],
      userEmail: "fortunateanozie@gmail.com",
      date: "May 7, 2023",
      premium: 40000,
      affiliate: generateRandomAffiliate(),
    },
  ];

  return (
    <PageContent
      title="Sold Policies"
      searchbarPlaceholder="Find policy type"
      pageTable={<MerchantSoldPoliciesTable policies={policies} />}
      page={page}
      totalItems={2}
      onPageChange={(page: number) => setPage(page)}
    />
  );
};
