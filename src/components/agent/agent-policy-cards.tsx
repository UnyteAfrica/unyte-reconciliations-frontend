import { Product } from "@/types/types";
import { PolicyCard } from "./agent-policy-card";
import { FaAngleLeft } from "react-icons/fa";
import { useQuery } from "@tanstack/react-query";
import { AgentQueryKeys } from "@/utils/query-keys";
import { AgentApi } from "@/services/api/api-agent";

export const AgentPolicyCards: React.FC<{
  policyCategory: string;
  products: Product[];
  onBack: () => void;
}> = ({ products, onBack, policyCategory }) => {
  const {} = useQuery({
    queryKey: [AgentQueryKeys.quoteParams],
    queryFn: () => AgentApi.getQuoteParams(policyCategory),
  });

  return (
    <main className="space-y-4">
      {products.map((product, idx) => (
        <PolicyCard
          product={product.name}
          policyCategory={policyCategory}
          key={idx}
        />
      ))}
      <button
        className="w-full text-white text-sm font-medium bg-[#25D366] rounded-xl p-4 flex justify-center items-center"
        onClick={onBack}
      >
        <FaAngleLeft />
        Back
      </button>
    </main>
  );
};
