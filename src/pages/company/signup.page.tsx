import { CustomInput, PasswordInput } from "@/components/shared/input";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { BrowserComboRoutes } from "@/utils/routes";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { MutationKeys } from "@/utils/mutation-keys";
import { companySignup } from "@/api/api-company";
import { SignupType } from "@/types/api-types";
import { Loader } from "@/components/loader";

const formSchema = z
  .object({
    businessName: z
      .string()
      .min(3, "Business name must be 3 or more characters"),
    adminName: z.string().min(3, "Admin name must be 3 or more characters"),
    businessRegNo: z
      .string()
      .min(5, "Business Reg No must be 5 or more characters"),
    adminEmail: z.string().email("The email you entered is invalid"),
    gampId: z
      .string()
      .min(5, "GAMP ID cannot be less than 5 characters")
      .optional()
      .or(z.literal("")),
    password: z.string().min(6, "Password cannot be less than 6 characters"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password == data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

export const CompanySignupPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      adminName: "",
      businessName: "",
      businessRegNo: "",
      gampId: "",
      adminEmail: "",
      password: "",
      confirmPassword: "",
    },
  });

  const { mutate: signup, isPending } = useMutation({
    mutationKey: [MutationKeys.companySignup],
    mutationFn: (data: SignupType) => companySignup(data),
    onSuccess: console.log,
  });

  const onSubmit = (data: z.infer<typeof formSchema>) => {
    console.log(data);
    signup({
      admin_name: data.adminName,
      business_name: data.businessName,
      business_registration_number: data.businessRegNo,
      email: data.adminEmail,
      gampId: data.gampId,
      password: data.password,
    });
  };

  return (
    <div className="flex justify-center items-center  bg-[#f5f5f5] min-h-screen">
      <div className="p-10 bg-white w-[720px] overflow-y-auto h-[750px] rounded-2xl">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="text-[#333] w-[560px] mx-auto my-10"
          noValidate
        >
          <header>
            <p className="text-center mb-11 font-medium text-[28px]">
              Company Signup
            </p>
            <p className="mb-11 text-xl">
              Create your account by entering a username and password.
            </p>
          </header>
          <div className="space-y-6">
            <CustomInput
              label="Company Name"
              placeholder="John Doe Ltd"
              error={errors.businessName?.message?.toString()}
              {...register("businessName")}
            />
            <CustomInput
              label="Company Registration No."
              placeholder="A034529"
              error={errors.businessRegNo?.message?.toString()}
              {...register("businessRegNo")}
            />
            <CustomInput
              label="Admin Name"
              placeholder="John Doe"
              error={errors.adminName?.message?.toString()}
              {...register("adminName")}
            />
            <CustomInput
              label="Admin Email"
              placeholder="insurancefirm@company.com"
              error={errors.adminEmail?.message?.toString()}
              {...register("adminEmail")}
            />
            <CustomInput
              label="GAMP ID"
              optional
              placeholder="GP-4739349"
              error={errors.gampId?.message?.toString()}
              {...register("gampId")}
            />

            <PasswordInput
              label="Password"
              placeholder="******"
              error={errors.password?.message?.toString()}
              {...register("password")}
            />
            <PasswordInput
              label="Confirm Password"
              placeholder="******"
              error={errors.confirmPassword?.message?.toString()}
              {...register("confirmPassword")}
            />
            <div>
              <p className="mb-2">
                Already have an account?{" "}
                <Link
                  to={BrowserComboRoutes.companyLogin}
                  className="text-primary"
                >
                  Sign In
                </Link>
              </p>
              <button className="w-full font-medium text-xl leading-[24px] bg-primary h-[72px] text-white rounded-2xl">
                {isPending ? <Loader className="mx-auto" /> : "Sign Up"}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
