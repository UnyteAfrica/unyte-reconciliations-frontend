import { useMediaQuery } from "@/utils/hooks";

import { useState } from "react";
import { AgentQueryKeys } from "@/utils/query-keys";
import { useQuery } from "@tanstack/react-query";
import { AgentApi } from "@/services/api/api-agent";
import { PageContent } from "@/components/shared/page-content";
import { AgentProductsTable } from "@/components/tables/products-tables/agent-products-table";
import { groupObjects } from "@/utils/utils";
import { AgentPolicyCategories } from "@/components/agent/agent-policy-categories";
import { Loader } from "@/components/loader";
import { AgentPolicyCards } from "@/components/agent/agent-policy-cards";
import { Product } from "@/types/types";

const agentHandler = new AgentApi();
export const AgentPolicies = () => {
  const { isMediaQueryMatched } = useMediaQuery(1024);

  const {
    isPending: isLoadingProducts,
    data: productsData,
    error: productsError,
  } = useQuery({
    queryKey: [AgentQueryKeys.products],
    queryFn: () => agentHandler.getProducts(),
  });

  if (isLoadingProducts && isMediaQueryMatched)
    return (
      <PageContent
        title="Policies"
        pageTable={<AgentProductsTable groupedProducts={{}} />}
        isLoading={true}
      />
    );

  const activeProducts = productsData?.products;
  const groupedProducts = groupObjects(activeProducts || [], "productCategory");

  return (
    <>
      <div className="lg:hidden">
        <AgentPoliciesMobile
          groupedProducts={groupedProducts}
          isLoading={isLoadingProducts}
        />
      </div>

      <div className="hidden lg:block">
        <PageContent
          title="Policies"
          pageTable={<AgentProductsTable groupedProducts={groupedProducts} />}
          error={productsError}
        />
      </div>
    </>
  );
};

const AgentPoliciesMobile: React.FC<{
  groupedProducts: Record<string, Product[]>;
  isLoading: boolean;
}> = ({ groupedProducts, isLoading }) => {
  const [selectionPage, setSelectionPage] = useState(1);
  const [policyCategory, setPolicyCategory] = useState("");
  return (
    <div className="px-5 pb-6 max-w-[850px] mx-auto min-h-dvh bg-[#F8F8F8]">
      <header className="mb-7">
        <h1 className="font-semibold text-2xl mb-5">Policies</h1>

        {selectionPage == 1 && (
          <p>Choose from any of the available policy categories</p>
        )}
        {selectionPage == 2 && (
          <p>
            {" "}
            Choose any of our available policies to sell to potential customers
          </p>
        )}
      </header>
      {isLoading ? (
        <Loader className="mx-auto w-16 h-16 mt-20" />
      ) : selectionPage == 1 ? (
        <AgentPolicyCategories
          policyCategories={Object.keys(groupedProducts)}
          onSelect={(page: number, category: string) => {
            setSelectionPage(page);
            setPolicyCategory(category);
          }}
        />
      ) : (
        <AgentPolicyCards
          policyCategory={policyCategory}
          products={groupedProducts[policyCategory]}
          onBack={() => setSelectionPage(1)}
        />
      )}
    </div>
  );
};
