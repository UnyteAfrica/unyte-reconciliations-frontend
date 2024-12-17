import { PageContent } from "@/components/shared/page-content";
import { useQuery } from "@tanstack/react-query";
import { CompanyQueryKeys } from "@/utils/query-keys";
import { CompanyApi } from "@/services/api/api-company";
import { groupObjects } from "@/utils/utils";
import { CompanyProductsTable } from "@/components/tables/products-tables/company-products-table";

const companyHandler = new CompanyApi();

export const CompanyProducts = () => {
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
  //     companyFaker.filterProducts(filter);
  //     queryClient.invalidateQueries({
  //       queryKey: [CompanyQueryKeys.products, page],
  //     });
  //     setPage(1);
  //   }
  // }, [filter]);

  const {
    isPending: isLoadingProducts,
    data: productsData,
    error: productsError,
  } = useQuery({
    queryKey: [CompanyQueryKeys.products],
    queryFn: () => companyHandler.getProducts(),
  });

  if (isLoadingProducts)
    return (
      <PageContent
        title="Products"
        pageTable={<CompanyProductsTable groupedProducts={{}} />}
        isLoading={true}
      />
    );

  // API Fetching
  const activeProducts = productsData?.products;
  const groupedProducts = groupObjects(activeProducts || [], "productCategory");

  // Faker fetching
  // const activeProducts = productsData!;
  // const totalPages = companyFaker.totalItems;

  return (
    <PageContent
      title="Products"
      pageTable={<CompanyProductsTable groupedProducts={groupedProducts} />}
      error={productsError}
      isLoading={isLoadingProducts}
    />
  );
};
