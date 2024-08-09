import { CustomInput, PasswordInput } from "@/components/shared/input";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { BrowserComboRoutes } from "@/utils/routes";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { MutationKeys } from "@/utils/mutation-keys";
import { Loader } from "@/components/loader";
import { agentLogin } from "@/services/api/api-agent";
import { AgentLoginType } from "@/types/request.types";
import { useContext } from "react";
import { AgentContext } from "@/context/agent.context";
import { LocalStorage } from "@/services/local-storage";
import { Icon } from "@/components/shared/icon";
import { useMediaQuery } from "@/utils/hooks";

const GAMPID_WITHOUT_NAME_LENGTH = 22;
const formSchema = z.object({
  emailOrGampId: z.string().refine(
    (val) => {
      if (val.endsWith("@getgamp.com")) {
        return val.length > GAMPID_WITHOUT_NAME_LENGTH + 3;
      }

      return z.string().email().safeParse(val).success;
    },
    {
      message: "Email / GAMP ID Invalid",
    }
  ),

  password: z.string().min(6, "Password cannot be less than 6 characters"),
});

export const AgentLoginPage = () => {
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      emailOrGampId: "",
      password: "",
    },
  });

  const navigate = useNavigate();
  const { setAgentEmail, setIsLoggedIn } = useContext(AgentContext);

  const { mutate: mLogin, isPending: isLoginLoading } = useMutation({
    mutationKey: [MutationKeys.agentLogin],
    mutationFn: (data: AgentLoginType) => agentLogin(data),
    onSuccess: (data) => {
      console.log(data);
      LocalStorage.setItem("agentAccessToken", data.data.access_token);
      LocalStorage.setItem("agentRefreshToken", data.data.refresh_token);
      setIsLoggedIn(true);
      setAgentEmail(getValues("emailOrGampId"));
      navigate(BrowserComboRoutes.agentVerify);
    },
  });

  const onSubmit = ({
    emailOrGampId,
    password,
  }: z.infer<typeof formSchema>) => {
    mLogin({
      emailOrGampID: emailOrGampId,
      password,
    });
  };

  const { isMediaQueryMatched } = useMediaQuery(1024);

  return (
    <div>
      {!isMediaQueryMatched && (
        <div className="px-5 py-10 max-w-[600px] mx-auto min-h-screen flex flex-col">
          <Icon type="logo" className="mb-6 block w-28" />
          <div className="grow" />
          <form onSubmit={handleSubmit(onSubmit)}>
            <header>
              <p className="mb-2 font-semibold text-[20px] text-center">
                Agent Login
              </p>
              <p className="mb-6 text-sm text-[#4F4F4F] text-center">
                Sign in to your account.
              </p>
            </header>
            <div className="space-y-6">
              <CustomInput
                label="Email / GAMP ID"
                labelClassName="text-sm text-[#333"
                className="h-[58px] border-[#E0E0E0]"
                placeholder="johndoe@gmail.com / A034529"
                error={errors.emailOrGampId?.message?.toString()}
                {...register("emailOrGampId")}
              />
              <PasswordInput
                placeholder="******"
                labelClassName="text-sm text-[#333"
                className="p-2 h-[58px] border-[#E0E0E0]"
                inputClassname="h-[56px]"
                error={errors.password?.message?.toString()}
                {...register("password")}
              />
              <div>
                <div className="flex justify-end">
                  <Link
                    to={BrowserComboRoutes.agentForgotPassword}
                    className="text-primary text-sm mb-2 inline-block"
                  >
                    Forgotten Password?
                  </Link>
                </div>
                <button
                  className="w-full font-medium text-xl leading-[24px] bg-primary h-[58px] text-white rounded-2xl"
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
          <div className="grow" />
        </div>
      )}

      {isMediaQueryMatched && (
        <div className="justify-center items-center  bg-[#f5f5f5] min-h-screen flex">
          <div className="p-10 bg-white flex justify-center items-center w-[700px] h-[700px] rounded-2xl">
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="text-[#333] w-[560px]"
            >
              <header>
                <p className="text-center mb-11 font-medium text-[28px]">
                  Agent Login
                </p>
                <p className="mb-11 text-xl">Sign in to your account.</p>
              </header>
              <div className="space-y-6">
                <CustomInput
                  label="Email / GAMP ID"
                  placeholder="johndoe@gmail.com / A034529"
                  error={errors.emailOrGampId?.message?.toString()}
                  {...register("emailOrGampId")}
                />
                <PasswordInput
                  placeholder="******"
                  error={errors.password?.message?.toString()}
                  {...register("password")}
                />
                <div>
                  <div className="flex justify-end">
                    <Link
                      to={BrowserComboRoutes.agentForgotPassword}
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
      )}
    </div>
  );
};
