import { PageContent } from "@/components/shared/page-content";
import { CompanyPoliciesTable } from "@/components/tables/policy-tables";
import { useQuery } from "@tanstack/react-query";
import { CompanyQueryKeys } from "@/utils/query-keys";
import { useState } from "react";
import { PAGE_COUNT } from "@/utils/constants";
import { CompanyApi } from "@/services/api/api-company";

const companyHandler = new CompanyApi();

export const CompanyPolicies = () => {
  const [page, setPage] = useState(1);

  // Need to get the min and max dates as well as the min and max amounts
  // const { setFilter, filter } = useContext(PageContentContext);
  // const queryClient = useQueryClient();

  // useEffect(() => {
  //   setFilter({
  //     ...filter,
  //     startDate: companyFaker.earliestPolicyDate,
  //     endDate: companyFaker.latestPolicyDate,
  //     minAmount: companyFaker.minPolicyPremium.toString(),
  //     maxAmount: companyFaker.maxPolicyPremium.toString(),
  //     active: true,
  //   });
  // }, []);

  // useEffect(() => {
  //   if (filter.active) {
  //     companyFaker.filterPolicies(filter);
  //     queryClient.invalidateQueries({
  //       queryKey: [CompanyQueryKeys.policies, page],
  //     });
  //     setPage(1);
  //   }
  // }, [filter]);

  const {
    isPending: isLoadingPolicies,
    data: policiesData,
    error: policiesError,
  } = useQuery({
    queryKey: [CompanyQueryKeys.policies, page],
    queryFn: () => companyHandler.getPolicies(page),
  });

  if (isLoadingPolicies)
    return (
      <PageContent
        title="Policies"
        pageTable={<CompanyPoliciesTable policies={[]} />}
        isLoading={true}
      />
    );

  // API Fetching
  const activePolicies = policiesData?.policies;

  const totalPages = policiesData?.total;

  // Faker fetching
  // const activePolicies = policiesData!;
  // const totalPages = companyFaker.totalItems;

  return (
    <PageContent
      title="Policies"
      pageTable={<CompanyPoliciesTable policies={activePolicies || []} />}
      error={policiesError}
      isLoading={isLoadingPolicies}
      page={page}
      pageSize={PAGE_COUNT}
      totalItems={totalPages}
      onPageChange={(page: number) => setPage(page)}
    />
  );
};
