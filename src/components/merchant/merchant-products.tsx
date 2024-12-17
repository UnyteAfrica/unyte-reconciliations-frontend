import { PageContent } from "@/components/shared/page-content";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { MerchantQueryKeys } from "@/utils/query-keys";
import { MerchantProductsTable } from "../tables/products-table";
import { MerchantApi } from "@/services/api/api-merchant";
import { PAGE_COUNT } from "@/utils/constants";

const merchantHandler = new MerchantApi();
export const MerchantProducts = () => {
  const [page, setPage] = useState(1);

  const {
    isPending: isLoadingProducts,
    data: productsData,
    error: policiesError,
  } = useQuery({
    queryKey: [MerchantQueryKeys.products, page],
    queryFn: () => merchantHandler.getProducts(page),
  });

  if (isLoadingProducts)
    return (
      <PageContent
        title="Insurer Policies"
        pageTable={<MerchantProductsTable products={[]} />}
        isLoading={true}
      />
    );

  const products = productsData?.products;
  const totalItems = productsData?.total;

  return (
    <PageContent
      title="Insurer Policies"
      searchbarPlaceholder="Find policy type"
      pageTable={<MerchantProductsTable products={products || []} />}
      error={policiesError}
      page={page}
      pageSize={PAGE_COUNT}
      totalItems={totalItems}
      onPageChange={(page: number) => setPage(page)}
    />
  );
};
