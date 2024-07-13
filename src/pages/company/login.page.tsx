import { CustomInput, PasswordInput } from "@/components/shared/input";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { BrowserComboRoutes } from "@/utils/routes";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { MutationKeys } from "@/utils/mutation-keys";
import { companyLogin } from "@/services/api/api-company";
import { Loader } from "@/components/loader";
import { useContext } from "react";
import { CompanyLoginType } from "@/types/request.types";
import { CompanyContext } from "@/context/company.context";
import { LocalStorage } from "@/services/local-storage";

const formSchema = z.object({
  email: z.string().email("Admin Email is invalid"),
  password: z.string().min(6, "Password cannot be less than 6 characters"),
});

export const CompanyLoginPage = () => {
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const { setCompanyEmail, setIsLoggedIn } = useContext(CompanyContext);

  const navigate = useNavigate();

  const { mutate: mLogin, isPending: isLoginLoading } = useMutation({
    mutationKey: [MutationKeys.companyLogin],
    mutationFn: (data: CompanyLoginType) => companyLogin(data),
    onSuccess: (data) => {
      console.log(data);
      LocalStorage.setItem("companyAccessToken", data.data.access_token);
      LocalStorage.setItem("companyRefreshToken", data.data.refresh_token);
      setIsLoggedIn(true);
      setCompanyEmail(getValues("email"));
      navigate(BrowserComboRoutes.companyVerify);
    },
  });

  const onSubmit = (data: z.infer<typeof formSchema>) => {
    mLogin(data);
  };

  return (
    <div className="flex justify-center items-center  bg-[#f5f5f5] min-h-screen">
      <div className="p-10 bg-white flex justify-center items-center w-[700px] h-[700px] rounded-2xl">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="text-[#333] w-[560px]"
        >
          <header>
            <p className="text-center mb-11 font-medium text-[28px]">
              Company Login
            </p>
            <p className="mb-11 text-xl">Sign in to your account.</p>
          </header>
          <div className="space-y-6">
            <CustomInput
              label="Admin Email"
              placeholder="johndoe@gmail.com"
              error={errors.email?.message?.toString()}
              {...register("email")}
            />
            <PasswordInput
              label="Password"
              placeholder="******"
              error={errors.password?.message?.toString()}
              {...register("password")}
            />
            <div>
              <p className="mb-2">
                Don&apos;t have an account?{" "}
                <Link
                  to={BrowserComboRoutes.companySignup}
                  className="text-primary"
                >
                  Sign up
                </Link>
              </p>
              <div className="flex justify-end">
                <Link
                  to={BrowserComboRoutes.companyForgotPassword}
                  className="text-primary mb-2 inline-block"
                >
                  Forgotten Password?
                </Link>
              </div>
              <button
                className="w-full font-medium text-xl leading-[24px] bg-primary h-[72px] text-white rounded-2xl"
                disabled={isLoginLoading}
              >
                {isLoginLoading ? (
                  <Loader className="mx-auto h-6 w-6" />
                ) : (
                  "Sign In"
                )}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
