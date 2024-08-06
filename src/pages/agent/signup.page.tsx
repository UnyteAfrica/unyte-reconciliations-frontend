import { CustomInput, PasswordInput } from "@/components/shared/input";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { BrowserComboRoutes } from "@/utils/routes";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { MutationKeys } from "@/utils/mutation-keys";
import { agentSignup } from "@/services/api/api-agent";
import { AgentSignupType } from "@/types/request.types";
import { Loader } from "@/components/loader";
import toast from "react-hot-toast";
import { useEffect } from "react";
import { splitQueryParams } from "@/utils/utils";
import { Icon } from "@/components/shared/icon";
import { useMediaQuery } from "@/utils/hooks";

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
      gampId: "",
      password: "",
      confirmPassword: "",
    },
  });

  const location = useLocation();
  const inviteCode = splitQueryParams(location.search)["invite"];

  const navigate = useNavigate();

  useEffect(() => {
    if (!inviteCode) navigate(BrowserComboRoutes.agentLogin);
  }, []);

  const { mutate: mSignup, isPending: isSignupLoading } = useMutation({
    mutationKey: [MutationKeys.agentSignup],
    mutationFn: (data: AgentSignupType) => agentSignup(data),
    onSuccess: (data) => {
      const message = data.data.message;
      toast.success(message);
      navigate(BrowserComboRoutes.agentLogin);
    },
  });

  const onSubmit = (data: z.infer<typeof formSchema>) => {
    console.log(data);
    const {
      accountNo,
      bankName,
      bvn,
      email,
      firstName,
      homeAddress,
      lastName,
      middleName,
      password,
      gampId,
    } = data;
    mSignup({
      accountNo,
      bankName,
      bvn,
      password,
      email,
      firstName,
      homeAddress,
      lastName,
      middleName,
      agent_gampID: gampId ?? "",
      companyInviteCode: inviteCode!,
    });
  };

  const { isMediaQueryMatched } = useMediaQuery(1024);

  return (
    <div>
      {!isMediaQueryMatched && (
        <div className="px-5 py-10 max-w-[600px] mx-auto">
          <Icon type="logo" className="mb-6 block" />
          <form onSubmit={handleSubmit(onSubmit)}>
            <header>
              <p className="mb-2 font-semibold text-[20px]">Agent Sign Up</p>
              <p className="mb-6 text-sm text-[#4F4F4F]">
                Create your account by entering a username and password.
              </p>
            </header>
            <div className="space-y-6">
              <CustomInput
                label="First Name"
                placeholder="John"
                labelClassName="text-sm text-[#333"
                className="h-[58px] border-[#E0E0E0]"
                error={errors.firstName?.message?.toString()}
                {...register("firstName")}
              />
              <CustomInput
                label="Middle Name"
                placeholder="Janet"
                labelClassName="text-sm text-[#333"
                className="h-[58px] border-[#E0E0E0]"
                error={errors.middleName?.message?.toString()}
                {...register("middleName")}
              />
              <CustomInput
                label="Last Name"
                placeholder="Doe"
                labelClassName="text-sm text-[#333"
                className="h-[58px] border-[#E0E0E0]"
                error={errors.lastName?.message?.toString()}
                {...register("lastName")}
              />
              <CustomInput
                label="Home Address"
                placeholder="2, Sizwe Street"
                labelClassName="text-sm text-[#333"
                className="h-[58px] border-[#E0E0E0]"
                error={errors.homeAddress?.message?.toString()}
                {...register("homeAddress")}
              />
              <CustomInput
                label="Email"
                placeholder="johndoe@gmail.com"
                labelClassName="text-sm text-[#333"
                className="h-[58px] border-[#E0E0E0]"
                error={errors.email?.message?.toString()}
                {...register("email")}
              />
              <CustomInput
                label="Bank Name"
                placeholder="Access Bank"
                labelClassName="text-sm text-[#333"
                className="h-[58px] border-[#E0E0E0]"
                error={errors.bankName?.message?.toString()}
                {...register("bankName")}
              />
              <CustomInput
                label="Account No"
                placeholder="1234567890"
                labelClassName="text-sm text-[#333"
                className="h-[58px] border-[#E0E0E0]"
                error={errors.accountNo?.message?.toString()}
                {...register("accountNo")}
              />
              <CustomInput
                label="BVN"
                placeholder="12345678901"
                labelClassName="text-sm text-[#333"
                className="h-[58px] border-[#E0E0E0]"
                error={errors.bvn?.message?.toString()}
                {...register("bvn")}
              />
              <CustomInput
                label="Company ID"
                labelClassName="text-sm text-[#333"
                className="h-[58px] border-[#E0E0E0]"
                disabled
                placeholder="A034529"
                value={inviteCode!}
              />

              <CustomInput
                label="GAMP ID"
                optional
                labelClassName="text-sm text-[#333"
                className="h-[58px] border-[#E0E0E0]"
                placeholder="A034529"
                error={errors.gampId?.message?.toString()}
                {...register("gampId")}
              />
              <PasswordInput
                label="Password"
                placeholder="******"
                labelClassName="text-sm text-[#333"
                className="p-2 h-[58px] border-[#E0E0E0]"
                inputClassname="h-[56px]"
                error={errors.password?.message?.toString()}
                {...register("password")}
              />
              <PasswordInput
                label="Confirm Password"
                placeholder="******"
                labelClassName="text-sm text-[#333"
                className="p-2 h-[58px] border-[#E0E0E0]"
                inputClassname="h-[56px]"
                error={errors.confirmPassword?.message?.toString()}
                {...register("confirmPassword")}
              />
              <div>
                <button
                  className="w-full font-medium text-xl leading-[24px] bg-primary h-[72px] text-white rounded-2xl mb-4"
                  disabled={isSignupLoading}
                >
                  {isSignupLoading ? <Loader className="mx-auto" /> : "Sign Up"}
                </button>
                <p className="text-center">
                  Already have an account?{" "}
                  <Link
                    to={BrowserComboRoutes.agentLogin}
                    className="text-primary"
                  >
                    Sign In
                  </Link>
                </p>
              </div>
            </div>
          </form>
        </div>
      )}

      {isMediaQueryMatched && (
        <div className="justify-center items-center  bg-[#f5f5f5] min-h-screen flex">
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
                  label="Company ID"
                  disabled
                  placeholder="A034529"
                  value={inviteCode!}
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
                  <button
                    className="w-full font-medium text-xl leading-[24px] bg-primary h-[72px] text-white rounded-2xl"
                    disabled={isSignupLoading}
                  >
                    {isSignupLoading ? (
                      <Loader className="mx-auto" />
                    ) : (
                      "Sign Up"
                    )}
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
