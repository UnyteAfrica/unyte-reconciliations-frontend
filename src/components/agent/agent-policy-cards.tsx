import { Product } from "@/types/types";
import { PolicyCard } from "./agent-policy-card";
import { FaAngleLeft } from "react-icons/fa";

export const AgentPolicyCards: React.FC<{
  products: Product[];
  onBack: () => void;
}> = ({ products, onBack }) => {
  return (
    <main className="space-y-4">
      {products.map((product, idx) => (
        <PolicyCard policyType={product.name} key={idx} />
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
