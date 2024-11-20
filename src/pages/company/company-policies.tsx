import { PageContent } from "@/components/shared/page-content";
import { CompanyPoliciesTable } from "@/components/tables/policy-tables";
import { useQuery } from "@tanstack/react-query";
import { CompanyQueryKeys } from "@/utils/query-keys";
import { getPolicies } from "@/services/api/api-company";
import { useState } from "react";
import { PAGE_COUNT } from "@/utils/constants";
import { BasePolicy } from "@/types/types";
import { LocalStorage } from "@/services/local-storage";

const faker = true;
const policies: BasePolicy[] = [
  {
    policyNo: "123jkf5402",
    policyType: "Health Insurance",
    date: "May 7, 2023",
    premium: 50000,
  },
  {
    policyNo: "123jkf5402",
    policyType: "Health Insurance",
    date: "May 7, 2023",
    premium: 40000,
  },
  {
    policyNo: "123jkf5402",
    policyType: "Health Insurance",
    date: "May 7, 2023",
    premium: 40000,
  },
  {
    policyNo: "123jkf5402",
    policyType: "Health Insurance",
    date: "May 7, 2023",
    premium: 40000,
  },
  {
    policyNo: "123jkf5402",
    policyType: "Health Insurance",
    date: "May 7, 2023",
    premium: 40000,
  },
];

export const CompanyPolicies = () => {
  const [page, setPage] = useState(1);
  const uid = LocalStorage.getItem("uid");
  const {
    isPending: isLoadingPolicies,
    data: policiesData,
    error: policiesError,
  } = useQuery({
    queryKey: [CompanyQueryKeys.policies, page],
    queryFn: () => getPolicies(uid ?? "", page),
  });

  if (faker)
    return (
      <PageContent
        title="Policies"
        pageTable={<CompanyPoliciesTable policies={policies} />}
      />
    );

  if (isLoadingPolicies)
    return (
      <PageContent
        title="Policies"
        pageTable={<CompanyPoliciesTable policies={[]} />}
        isLoading={true}
      />
    );

  const activePolicies = policiesData?.data.results || policies;

  const totalPages = policiesData?.data.count;

  return (
    <PageContent
      title="Policies"
      pageTable={<CompanyPoliciesTable policies={activePolicies!} />}
      error={policiesError}
      isLoading={isLoadingPolicies}
      page={page}
      pageCount={PAGE_COUNT}
      totalItems={totalPages}
      onPageChange={(page: number) => setPage(page)}
    />
  );
};
