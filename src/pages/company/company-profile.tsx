import { Loader } from "@/components/loader";
import { EditableProfileImage } from "@/components/shared/editable-image";
import { CustomInput } from "@/components/shared/input";
import { getProfile } from "@/services/api/api-base";
import { companyApi } from "@/services/api/api-company";

import { CompanyQueryKeys } from "@/utils/query-keys";
import { getCompanyInitials } from "@/utils/utils";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

// const formSchema = z.object({
//   firstName: z.string().min(3, "First name cannot be less than 3 characters"),
//   lastName: z.string().min(3, "Last name cannot be less than 3 characters"),
//   email: z.string().email("Invalid email entered"),
// });

export const CompanyProfile = () => {
  const { data: companyDetailsData, isPending: isCompanyDetailsLoading } =
    useQuery({
      queryKey: [CompanyQueryKeys.profile],
      queryFn: () => getProfile(),
    });

  const { mutate: updateProfilePicture, isPending: isUpdatingProfilePicture } =
    useMutation({
      mutationFn: (data: FormData) =>
        companyApi.updateCompanyProfilePicture(data),
      onSuccess: () =>
        queryClient.invalidateQueries({ queryKey: [CompanyQueryKeys.profile] }),
    });

  const queryClient = useQueryClient();

  const companyDetails = companyDetailsData?.data;

  if (isCompanyDetailsLoading)
    return <Loader className="mx-auto w-16 h-16 mt-40" />;

  const handleInfoClick = () => {
    toast("Reach out to us at tech@unyte.africa to edit your information.");
  };

  const handleImageChange = (image: File) => {
    const data = new FormData();
    data.append("profile_image", image);
    updateProfilePicture(data);
  };

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
        <EditableProfileImage
          extImageUrl={companyDetails.profile_image}
          initials={getCompanyInitials(companyDetails.business_name)}
          isLoading={isUpdatingProfilePicture}
          onImageChange={handleImageChange}
        />
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
            placeholder="Dro Corp"
            className="cursor-not-allowed caret-white"
            label="Business Name"
            onClick={handleInfoClick}
          />
          <CustomInput
            value={companyDetails.email}
            placeholder="johndoe@gmail.com"
            label="Email"
            className="cursor-not-allowed caret-white"
            onClick={handleInfoClick}
          />
          {/* <CustomInput placeholder="07031234567" label="Phone Number" /> */}
        </div>
      </section>
    </div>
  );
};
