import { Loader } from "@/components/loader";
import { CustomInput } from "@/components/shared/input";
import { getCompanyDetails } from "@/services/api/api-company";
import { logger } from "@/utils/logger";
import { CompanyQueryKeys } from "@/utils/query-keys";
import { getCompanyInitials } from "@/utils/utils";
import { useQuery } from "@tanstack/react-query";
import { MdEdit } from "react-icons/md";

// const formSchema = z.object({
//   firstName: z.string().min(3, "First name cannot be less than 3 characters"),
//   lastName: z.string().min(3, "Last name cannot be less than 3 characters"),
//   email: z.string().email("Invalid email entered"),
// });

export const CompanyProfile = () => {
  const { data: companyDetailsData, isPending: isCompanyDetailsLoading } =
    useQuery({
      queryKey: [CompanyQueryKeys.details],
      queryFn: () => getCompanyDetails(),
    });

  const companyDetails = companyDetailsData?.data;

  if (isCompanyDetailsLoading)
    return <Loader className="mx-auto w-16 h-16 mt-40" />;

  logger.log(companyDetails);

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
            {getCompanyInitials(companyDetails.business_name)}
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
            value={companyDetails.business_name}
            disabled
            placeholder="Dro Corp"
            label="Business Name"
          />
          <CustomInput
            value={companyDetails.email}
            placeholder="johndoe@gmail.com"
            label="Email"
            disabled
          />
          {/* <CustomInput placeholder="07031234567" label="Phone Number" /> */}
        </div>
      </section>
    </div>
  );
};
