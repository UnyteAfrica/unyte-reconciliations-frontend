import { Loader } from "@/components/loader";
import { CustomInput } from "@/components/shared/input";
import { getDetails } from "@/services/api/api-base";
import { AgentQueryKeys } from "@/utils/query-keys";
import { getInitials } from "@/utils/utils";
import { useQuery } from "@tanstack/react-query";
import { MdEdit } from "react-icons/md";

// const formSchema = z.object({
//   firstName: z.string().min(3, "First name cannot be less than 3 characters"),
//   lastName: z.string().min(3, "Last name cannot be less than 3 characters"),
//   email: z.string().email("Invalid email entered"),
// });

export const AgentProfile = () => {
  const { data: agentDetailsData, isPending: isAgentDetailsLoading } = useQuery(
    {
      queryKey: [AgentQueryKeys.details],
      queryFn: () => getDetails(),
    }
  );

  const agentDetails = agentDetailsData?.data;

  if (isAgentDetailsLoading)
    return <Loader className="mx-auto w-16 h-16 mt-40" />;

  return (
    <div className="px-5 py-6 max-w-[768px] mx-auto space-y-8 lg:max-w-6xl lg:px-0 lg:my-12 lg:space-y-16">
      <h1 className="text-3xl text-[#333333] font-semibold mb-8">Profile</h1>
      <section className="w-full lg:flex">
        <div className="lg:shrink-0 lg:mr-52 lg:w-[200px]">
          <h2 className="text-textDim text-sm mb-1">Avatar</h2>
          <em className="not-italic text-[#9c9c9c] text-sm">
            Edit your profile picture
          </em>
        </div>
        <div className="w-32 h-32 bg-[#e0e0e0] rounded-full flex justify-center items-center my-4 relative lg:shrink-0 lg:my-0">
          <div className="w-8 h-8 rounded-full bg-black text-white absolute bottom-2 right-2 flex justify-center items-center">
            <MdEdit className="text-xl" />
          </div>
          <em className="not-italic font-semibold text-3xl">
            {getInitials(agentDetails.first_name, agentDetails.last_name)}
          </em>
        </div>
      </section>
      <section className="w-full lg:flex">
        <div className="mb-4 lg:shrink-0 lg:mr-52 lg:mb-0 lg:w-[200px]">
          <h2 className="text-textDim text-sm mb-1">Personal Information</h2>
          <em className="not-italic text-[#9c9c9c] text-sm">
            Edit your personal information
          </em>
        </div>
        <div className="space-y-4 w-full max-w-[600px]">
          <CustomInput
            disabled
            value={agentDetails.first_name}
            placeholder="John"
            label="First Name"
          />
          <CustomInput
            disabled
            value={agentDetails.last_name}
            placeholder="Doe"
            label="Last Name"
          />
          <CustomInput
            disabled
            value={agentDetails.email}
            placeholder="johndoe@gmail.com"
            label="Email"
          />
        </div>
      </section>
    </div>
  );
};
