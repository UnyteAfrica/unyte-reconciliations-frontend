import { BuyPolicyForm } from "@/components/agent/agent-buy-policy-form";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";

export const PolicyCard: React.FC<{ policyType: string }> = ({
  policyType,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [isOpen]);

  return (
    <div
      onClick={() => setIsOpen(true)}
      className="bg-white rounded-2xl p-4 cursor-pointer"
    >
      {createPortal(
        <BuyPolicyForm
          isOpen={isOpen}
          policyType={policyType}
          onClose={() => setIsOpen(false)}
        />,
        document.body
      )}

      <div className="flex">
        <div>
          <h3 className="not-italic text-sm font-medium inline-block mb-1 text-[#101323]">
            {policyType}
          </h3>
        </div>
      </div>
    </div>
  );
};