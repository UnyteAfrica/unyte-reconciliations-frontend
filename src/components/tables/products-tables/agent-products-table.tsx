import { Product } from "@/types/types";
import { ProductGroup } from "./product-group";

type AgentProductsTableProps = {
  groupedProducts: Record<string, Product[]>;
};

export const AgentProductsTable: React.FC<AgentProductsTableProps> = ({
  groupedProducts,
}) => {
  return (
    <div className="space-y-4">
      {Object.keys(groupedProducts).map((key) => (
        <ProductGroup products={groupedProducts[key]} title={key} key={key} />
      ))}
    </div>
  );
};
