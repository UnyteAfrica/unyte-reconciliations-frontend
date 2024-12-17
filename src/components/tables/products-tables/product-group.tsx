import { Table } from "@/components/table";
import { Product } from "@/types/types";
import { useMediaQuery } from "@/utils/hooks";
import { formatToNaira } from "@/utils/utils";
import { useState } from "react";
import { FaAngleDown } from "react-icons/fa";
import { twMerge } from "tailwind-merge";

export const ProductGroup: React.FC<{ products: Product[]; title: string }> = ({
  products,
  title,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const { isMediaQueryMatched } = useMediaQuery(1024);
  return (
    <div>
      <div
        className="bg-[#ccc] p-2 mb-2 rounded-lg flex justify-between items-center"
        onClick={() => setIsOpen((isOpen) => !isOpen)}
      >
        <h3 className="font-semibold text-lg">{title}</h3>
        <FaAngleDown />
      </div>
      {!isMediaQueryMatched && (
        <div
          className={twMerge(
            "transition-all overflow-hidden",
            isOpen && "opacity-100",
            !isOpen && "opacity-0"
          )}
          style={{
            maxHeight: isOpen ? 73 * products.length + 50 : 0,
          }}
        >
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

              <div className="flex justify-between items-center">
                <em className="not-italic text-[#828282]">
                  {product.productCategory}
                </em>
              </div>
            </div>
          ))}
        </div>
      )}
      {isMediaQueryMatched && (
        <div
          className={twMerge(
            "transition-all overflow-hidden",
            isOpen && "opacity-100",
            !isOpen && "opacity-0"
          )}
          style={{
            maxHeight: isOpen ? 60 * (products.length + 1) + 50 : 0,
          }}
        >
          <Table
            headers={["Product ID", "Product Name", "Category", "Premium"]}
          >
            {products.map((product, idx) => (
              <tr key={idx} className="border-b font-medium">
                <td className="p-4 text-center">{product.id}</td>
                <td className="p-4 text-center">{product.name}</td>
                <td className="p-4 text-center">{product.productCategory}</td>
                <td className="p-4 text-center">
                  {formatToNaira(product.premium)}
                </td>
              </tr>
            ))}
          </Table>
        </div>
      )}
    </div>
  );
};
