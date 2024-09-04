import { CompanyPolicy } from "@/types/types";
import { PageContent } from "@/components/shared/page-content";
import { CompanyPoliciesTable } from "@/components/tables/policy-tables";
import { useQuery } from "@tanstack/react-query";
import { CompanyQueryKeys } from "@/utils/query-keys";
import { getPolicies } from "@/services/api/api-company";
import { descendingDateComparator, flattenApiPolicies } from "@/utils/utils";
import { useState } from "react";
import { PAGE_COUNT } from "@/utils/constants";

export const CompanyPolicies = () => {
  const {
    isPending: isLoadingPolicies,
    data: policiesData,
    error: policiesError,
  } = useQuery({
    queryKey: [CompanyQueryKeys.policies],
    queryFn: () => getPolicies(),
  });
  const [page, setPage] = useState(1);

  if (isLoadingPolicies)
    return (
      <PageContent
        title="Policies"
        pageTable={<CompanyPoliciesTable policies={[]} />}
        isLoading={true}
      />
    );

  const apiPolicies = policiesData?.data;
  const policies = flattenApiPolicies(apiPolicies?.slice(0, -1)!);
  policies.sort((policy1, policy2) =>
    descendingDateComparator(policy1.date, policy2.date)
  );

  const totalPages = policies.length;
  const paginatedMap: { [key: number]: CompanyPolicy[] } = {};
  for (let i = 0; i < totalPages; i++) {
    paginatedMap[i + 1] = policies.slice(
      i * PAGE_COUNT,
      i * PAGE_COUNT + (PAGE_COUNT - 1)
    );
  }

  return (
    <PageContent
      title="Policies"
      pageTable={<CompanyPoliciesTable policies={paginatedMap[page]} />}
      error={policiesError}
      isLoading={isLoadingPolicies}
      page={page}
      pageCount={PAGE_COUNT}
      totalItems={totalPages}
      onPageChange={(page: number) => setPage(page)}
    />
  );
};
