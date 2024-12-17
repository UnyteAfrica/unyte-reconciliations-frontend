import { formatToNaira } from "@/utils/utils";
import { MerchantProduct } from "../../types/types";
import { Table } from "../table";
import { useMediaQuery } from "@/utils/hooks";

type MerchantProductsTableProps = {
  products: MerchantProduct[];
};

export const MerchantProductsTable: React.FC<MerchantProductsTableProps> = ({
  products,
}) => {
  const { isMediaQueryMatched } = useMediaQuery(1024);

  if (!isMediaQueryMatched)
    return (
      <div>
        {products.map((product, idx) => (
          <div key={idx} className="border-b py-2">
            <div className="flex justify-between items-center mb-2">
              <em className="not-italic font-semibold text-[#333]">
                {product.name}
              </em>
              <em className="not-italic font-semibold text-[#333]">
                {formatToNaira(product.premium)}
              </em>
            </div>
            <div className="flex justify-between items-center mb-2">
              <em className="not-italic font-semibold text-[#333]">
                {product.productCategory}
              </em>
              <em className="not-italic font-semibold text-[#333]">
                {product.insurer.name}
              </em>
            </div>
          </div>
        ))}
      </div>
    );

  return (
    <Table
      headers={["Product ID", "Product Name", "Insurer", "Category", "Premium"]}
    >
      {products.map((product, idx) => (
        <tr key={idx} className="border-b font-medium">
          <td className="p-4 text-center">{product.id}</td>
          <td className="p-4 text-center">{product.name}</td>
          <td className="p-4 text-center">{product.insurer.name}</td>
          <td className="p-4 text-center">{product.productCategory}</td>
          <td className="p-4 text-center">{formatToNaira(product.premium)}</td>
        </tr>
      ))}
    </Table>
  );
};
