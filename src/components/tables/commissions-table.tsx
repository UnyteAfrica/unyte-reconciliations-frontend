import { formatToNaira } from "@/utils/utils";
import { Commission } from "../../types/types";
import { Table } from "../table";
import { useMediaQuery } from "@/utils/hooks";
import { createPortal } from "react-dom";
import { useState } from "react";
import { twMerge } from "tailwind-merge";
import { MdOutlineCancel } from "react-icons/md";

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
            <CommissionCard commission={commission} key={idx} />
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

type CommissionCardProps = {
  commission: Commission;
};

const CommissionCard: React.FC<CommissionCardProps> = ({ commission }) => {
  const [isShowingBottomSheet, setIsShowingBottomSheet] = useState(false);

  const handleContentClick = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  return (
    <div className="border-b py-2">
      {createPortal(
        <div
          className={twMerge(
            "h-screen w-screen bg-black/30 fixed inset-0 transition ",
            isShowingBottomSheet && "z-50 opacity-100 translate-y-0",
            !isShowingBottomSheet && "-z-20 opacity-0 translate-y-[100%]"
          )}
          onClick={() => {
            setIsShowingBottomSheet(false);
          }}
        >
          <div
            className={twMerge(
              "bg-white w-screen absolute bottom-0 rounded-t-2xl transition"
              // isShowingBottomSheet && "translate-y-0"
            )}
            onClick={handleContentClick}
          >
            <div className="p-6">
              <header className="flex justify-between items-center mb-6">
                <h2 className="font-semibold text-xl">More Information</h2>
                <button>
                  <MdOutlineCancel
                    className="w-6 h-6"
                    onClick={() => {
                      setIsShowingBottomSheet(false);
                    }}
                  />
                </button>
              </header>
              <div>
                <div className="flex justify-between items-center mb-2 py-2 border-b border-dotted">
                  <em className="not-italic text-[#333] text-sm">
                    Policy Type
                  </em>
                  <em className="not-italic font-medium text-[#333] text-sm">
                    Health Insurance
                  </em>
                </div>
                <div className="flex justify-between items-center mb-2 py-2 border-b border-dotted">
                  <em className="not-italic text-[#333] text-sm">Amount</em>
                  <em className="not-italic font-medium text-[#333] text-sm">
                    {formatToNaira(50000)}
                  </em>
                </div>
                <div className="flex justify-between items-center mb-2 py-2 border-b border-dotted">
                  <em className="not-italic text-[#333] text-sm">Commission</em>
                  <em className="not-italic font-medium text-white bg-[#25D366] p-1 px-2 rounded-lg text-sm">
                    {formatToNaira(5000)}
                  </em>
                </div>
                <div className="flex justify-between items-center mb-2 py-2 border-b border-dotted">
                  <em className="not-italic text-[#333] text-sm">
                    Date Purchased
                  </em>
                  <em className="not-italic font-medium text-[#333] text-sm">
                    21 Jun 2024
                  </em>
                </div>
                <div className="flex mt-2 bg-[#F9FAFB] p-4 rounded-md justify-between items-center">
                  <div className="bg-[#F5A623] w-10 h-10 rounded-full text-white shrink-0 flex justify-center items-center">
                    C
                  </div>
                  <div className="flex flex-col">
                    <em className="not-italic text-sm">John Doe</em>
                    <em className="not-italic text-xs text-[#4F4F4F]">
                      +23456789012
                    </em>
                  </div>
                  <div className="bg-[#222] flex items-center py-1 px-2 rounded-sm">
                    <div className="w-4 h-4 bg-[#25D366] rounded-full mr-1" />
                    <em className="not-italic text-white text-sm">
                      Recurring Policy
                    </em>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>,
        document.body
      )}
      <div onClick={() => setIsShowingBottomSheet(true)}>
        <div className="flex justify-between items-center mb-2">
          <em className="not-italic font-semibold text-sm text-[#333]">
            {commission.product}
          </em>
          <em className="not-italic font-semibold text-sm text-[#333]">
            {formatToNaira(commission.premium)}
          </em>
        </div>
        <div className="flex justify-between items-center">
          <em className="not-italic text-sm text-[#828282]">
            {commission.date}
          </em>
          <em className="not-italic font-medium text-sm text-[#4F4F4F]">
            Commission: {formatToNaira(commission.commission)}
          </em>
        </div>
      </div>
    </div>
  );
};
