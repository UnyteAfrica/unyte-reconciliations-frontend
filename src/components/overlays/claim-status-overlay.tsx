import { Loader } from "../loader";

import { ClaimStatus, ClaimStatusType } from "@/types/types";
import { RadioInput } from "../shared/radio-input";
import { useState } from "react";

export const ClaimStatusOverlay: React.FC = () => {
  // const { isPending: isInviteLoading } = useMutation({
  //   mutationKey: [MutationKeys.companyInviteAgent],
  //   mutationFn: (data: InviteAgentType) => inviteAgent(data),
  //   onSuccess: () => {
  //     toast.success("Invite Email sent to agent");
  //   },
  // });

  const isStatusLoading = false;

  const [claimStatus, setClaimStatus] = useState<ClaimStatusType | null>(null);

  return (
    <form
      className="p-8 space-y-4 w-full z-50 relative"
      onClick={(e) => {
        e.stopPropagation();
      }}
      data-testid="update-claim"
    >
      <h1 className="text-center text-2xl font-bold">Update Claim Status</h1>
      <div>
        {Object.values(ClaimStatus).map((status, idx) => (
          <RadioInput
            key={idx}
            label={status}
            onClick={() => setClaimStatus(status)}
            onChange={(e) =>
              setClaimStatus((claimStatus) =>
                e.target.checked ? status : claimStatus
              )
            }
            checked={claimStatus == status}
            name="claim-status"
          />
        ))}
      </div>
      <button className="block rounded-lg text-white font-medium text-lg bg-mPrimary p-5 w-full  font-poppins text-center mx-auto">
        {isStatusLoading ? (
          <Loader className="mx-auto" />
        ) : (
          "Update Claim Status"
        )}
      </button>
    </form>
  );
};
