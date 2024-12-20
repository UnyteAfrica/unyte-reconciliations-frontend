import { PageContent } from "@/components/shared/page-content";
import { useState } from "react";
import { MerchantSoldPoliciesTable } from "../tables/policy-tables";
import { MerchantApi } from "@/services/api/api-merchant";
import { MerchantQueryKeys } from "@/utils/query-keys";
import { useQuery } from "@tanstack/react-query";
import { PAGE_COUNT } from "@/utils/constants";

const merchantHandler = new MerchantApi();
export const MerchantSoldPolicies = () => {
  const [page, setPage] = useState(1);
  const {
    isPending: isLoadingProducts,
    data: productsData,
    error: policiesError,
  } = useQuery({
    queryKey: [MerchantQueryKeys.policies, page],
    queryFn: () => merchantHandler.getPolicies(page),
  });

  if (isLoadingProducts)
    return (
      <PageContent
        title="Sold Policies"
        pageTable={<MerchantSoldPoliciesTable policies={[]} />}
        isLoading={true}
      />
    );

  const policies = productsData?.policies;
  const totalItems = productsData?.total;

  return (
    <PageContent
      title="Sold Policies"
      searchbarPlaceholder="Find policy type"
      pageTable={<MerchantSoldPoliciesTable policies={policies || []} />}
      error={policiesError}
      page={page}
      pageSize={PAGE_COUNT}
      totalItems={totalItems}
      onPageChange={(page: number) => setPage(page)}
    />
  );
};
