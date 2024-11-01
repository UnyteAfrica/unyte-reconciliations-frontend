import { PageContent } from "@/components/shared/page-content";
import { SoldPolicy } from "@/types/types";
import { useState } from "react";
import { PAGE_COUNT } from "@/utils/constants";
import { SoldPoliciesTable } from "../tables/policy-tables";

export const MerchantSoldPolicies = () => {
  const [page, setPage] = useState(1);
  const policies: SoldPolicy[] = [
    {
      policyNo: "123jkf5402",
      policyType: "Health Insurance",
      userEmail: "john@doe.com",
      date: "May 7, 2023",
      premium: 40000,
    },
    {
      policyNo: "123jkf5402",
      policyType: "Health Insurance",
      userEmail: "john@doe.com",
      date: "May 7, 2023",
      premium: 40000,
    },
    {
      policyNo: "123jkf5402",
      policyType: "Health Insurance",
      userEmail: "fortunate@unyte.africa",
      date: "May 7, 2023",
      premium: 40000,
    },
    {
      policyNo: "123jkf5402",
      policyType: "Health Insurance",
      userEmail: "dro@tech.com",
      date: "May 7, 2023",
      premium: 40000,
    },
    {
      policyNo: "123jkf5402",
      policyType: "Health Insurance",
      userEmail: "fortunateanozie@gmail.com",
      date: "May 7, 2023",
      premium: 40000,
    },
  ];

  return (
    <PageContent
      title="Sold Policies"
      pageTable={<SoldPoliciesTable policies={policies} />}
      page={page}
      pageCount={PAGE_COUNT}
      totalItems={2}
      onPageChange={(page: number) => setPage(page)}
    />
  );
};
