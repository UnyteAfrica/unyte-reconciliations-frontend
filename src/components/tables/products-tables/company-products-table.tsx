import { Product } from "@/types/types";
import { ProductGroup } from "./product-group";

type CompanyProductsTableProps = {
  groupedProducts: Record<string, Product[]>;
};

export const CompanyProductsTable: React.FC<CompanyProductsTableProps> = ({
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
