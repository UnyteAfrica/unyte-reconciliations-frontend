import { formatToNaira } from "@/utils/utils";
import { Commission } from "../../types/types";
import { Table } from "../table";
import { useMediaQuery } from "@/utils/hooks";

type CommissionsTableProps = {
  commissions: Commission[];
};

export const CommissionsTable: React.FC<CommissionsTableProps> = ({
  commissions,
}) => {
  const { isMediaQueryMatched } = useMediaQuery(1024);

  return (
    <>
      {!isMediaQueryMatched && (
        <div>
          {commissions.map((commission, idx) => (
            <div key={idx} className="border-b py-2">
              <div className="flex justify-between items-center mb-2">
                <em className="not-italic font-semibold text-[#333]">
                  {commission.policyRef}
                </em>
                <em className="not-italic font-semibold text-[#333]">
                  {commission.product}
                </em>
              </div>
              <div className="flex justify-between items-center">
                <em className="not-italic text-[#828282]">{commission.date}</em>
                <em className="not-italic text-[#828282]">
                  {formatToNaira(commission.commission)}
                </em>
              </div>
            </div>
          ))}
        </div>
      )}
      {isMediaQueryMatched && (
        <Table
          headers={[
            "Policy Ref.",
            "Policy No.",
            "Product",
            "Date",
            "Commission",
          ]}
        >
          {commissions.map((commission, idx) => (
            <tr key={idx} className="border-b font-medium">
              <td className="p-4 text-center">{commission.policyRef}</td>
              <td className="p-4 text-center">{commission.policyNo}</td>
              <td className="p-4 text-center">{commission.product}</td>
              <td className="p-4 text-center">{commission.date}</td>
              <td className="p-4 text-center">
                {formatToNaira(commission.commission)}
              </td>
            </tr>
          ))}
        </Table>
      )}
    </>
  );
};
