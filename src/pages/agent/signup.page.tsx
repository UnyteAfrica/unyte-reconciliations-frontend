import { CustomInput, PasswordInput } from "@/components/shared/input";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { BrowserComboRoutes } from "@/utils/routes";
import { zodResolver } from "@hookform/resolvers/zod";

const formSchema = z
  .object({
    firstName: z.string().min(3, "First name cannot be less than 3 characters"),
    middleName: z
      .string()
      .min(3, "Middle name cannot be less than 3 characters"),
    lastName: z.string().min(3, "Last name cannot be less than 3 characters"),
    homeAddress: z
      .string()
      .min(10, "Home Address cannot be less than 10 characters"),
    email: z.string().email("Invalid email entered"),
    gampId: z
      .string()
      .min(5, "GAMP ID cannot be less than 5 characters")
      .optional()
      .or(z.literal("")),
    bvn: z
      .string()
      .min(11, "BVN must be 11 characters")
      .max(11, "BVN must be 11 characters"),
    bankName: z.string().min(3, "Bank name cannot be less than 3 characters"),
    accountNo: z
      .string()
      .min(10, "Account number must be 10 characters")
      .max(10, "Account number must be 10 characters"),
    affiliatedCompany: z
      .string()
      .min(5, "Company name must be more than 5 characters"),
    password: z.string().min(6, "Password cannot be less than 6 characters"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password == data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

export const AgentSignupPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: "",
      middleName: "",
      lastName: "",
      homeAddress: "",
      email: "",
      bvn: "",
      accountNo: "",
      bankName: "",
      affiliatedCompany: "",
      gampId: "",
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
        >
          <header>
            <p className="text-center mb-11 font-medium text-[28px]">
              Agent Signup
            </p>
            <p className="mb-11 text-xl">
              Create your account by entering a username and password.
            </p>
          </header>
          <div className="space-y-6">
            <CustomInput
              label="First Name"
              placeholder="John"
              error={errors.firstName?.message?.toString()}
              {...register("firstName")}
            />
            <CustomInput
              label="Middle Name"
              placeholder="Janet"
              error={errors.middleName?.message?.toString()}
              {...register("middleName")}
            />
            <CustomInput
              label="Last Name"
              placeholder="Doe"
              error={errors.lastName?.message?.toString()}
              {...register("lastName")}
            />
            <CustomInput
              label="Home Address"
              placeholder="2, Sizwe Street"
              error={errors.homeAddress?.message?.toString()}
              {...register("homeAddress")}
            />
            <CustomInput
              label="Email"
              placeholder="johndoe@gmail.com"
              error={errors.email?.message?.toString()}
              {...register("email")}
            />
            <CustomInput
              label="Bank Name"
              placeholder="Access Bank"
              error={errors.bankName?.message?.toString()}
              {...register("bankName")}
            />
            <CustomInput
              label="Account No"
              placeholder="1234567890"
              error={errors.accountNo?.message?.toString()}
              {...register("accountNo")}
            />
            <CustomInput
              label="BVN"
              placeholder="12345678901"
              error={errors.bvn?.message?.toString()}
              {...register("bvn")}
            />
            <CustomInput
              label="Affiliated Company"
              placeholder="JohnDoe Insurance"
              error={errors.affiliatedCompany?.message?.toString()}
              {...register("affiliatedCompany")}
            />
            <CustomInput
              label="GAMP ID"
              optional
              placeholder="A034529"
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
                  to={BrowserComboRoutes.agentLogin}
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
