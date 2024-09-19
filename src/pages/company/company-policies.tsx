import { PageContent } from "@/components/shared/page-content";
import { CompanyPoliciesTable } from "@/components/tables/policy-tables";
import { useQuery } from "@tanstack/react-query";
import { CompanyQueryKeys } from "@/utils/query-keys";
import { getPolicies } from "@/services/api/api-company";
import { useState } from "react";
import { PAGE_COUNT } from "@/utils/constants";

export const CompanyPolicies = () => {
  const [page, setPage] = useState(1);
  const {
    isPending: isLoadingPolicies,
    data: policiesData,
    error: policiesError,
  } = useQuery({
    queryKey: [CompanyQueryKeys.policies, page],
    queryFn: () => getPolicies(page),
  });

  if (isLoadingPolicies)
    return (
      <PageContent
        title="Policies"
        pageTable={<CompanyPoliciesTable policies={[]} />}
        isLoading={true}
      />
    );

  const policies = policiesData?.data.results;

  const totalPages = policiesData?.data.count;

  return (
    <PageContent
      title="Policies"
      pageTable={<CompanyPoliciesTable policies={policies!} />}
      error={policiesError}
      isLoading={isLoadingPolicies}
      page={page}
      pageCount={PAGE_COUNT}
      totalItems={totalPages}
      onPageChange={(page: number) => setPage(page)}
    />
  );
};
