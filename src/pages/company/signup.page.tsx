import { CustomInput, PasswordInput } from "@/components/shared/input";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { BrowserComboRoutes } from "@/utils/routes";
import { zodResolver } from "@hookform/resolvers/zod";

const formSchema = z
  .object({
    businessName: z
      .string()
      .min(3, "Business name must be 3 or more characters")
      .max(50, "Business name cannot be more than 50 characters"),
    adminName: z
      .string()
      .min(3, "Admin name must be 3 or more characters")
      .max(50, "Admin name cannot be more than 50 characters"),
    businessRegNo: z
      .string()
      .min(5, "Business Reg No must be 5 or more characters")
      .max(50, "Business Reg No cannot be more than 50 characters"),
    email: z.string().email("The email you entered is invalid"),
    gampId: z.string().min(5, "GAMP ID cannot be less than 5 characters"),
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
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = (data: z.infer<typeof formSchema>) => {
    console.log(data);
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
              placeholder="A034529"
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
              label="Company Name"
              placeholder="A034529"
              error={errors.businessName?.message?.toString()}
              {...register("businessName")}
            />
            <CustomInput
              label="Email"
              type="email"
              placeholder="insurancefirm@company.com"
              error={errors.email?.message?.toString()}
              {...register("email")}
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
                Sign Up
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
