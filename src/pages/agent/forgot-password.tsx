import { CustomInput } from "@/components/shared/input";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { BrowserComboRoutes } from "@/utils/routes";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { MutationKeys } from "@/utils/mutation-keys";
import { agentForgotPassword } from "@/api/api-agent";
import { Loader } from "@/components/loader";
import toast from "react-hot-toast";

const formSchema = z.object({
  email: z.string().email("Invalid email entered"),
});

export const AgentForgotPasswordPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
    },
  });

  const { mutate: mForgotPassword, isPending: isLoadingForgotPassword } =
    useMutation({
      mutationKey: [MutationKeys.agentForgotPassword],
      mutationFn: (email: string) => agentForgotPassword(email),
      onSuccess: (data) => {
        console.log(data);
        toast.success(data.data.message);
      },
    });

  const onSubmit = (data: z.infer<typeof formSchema>) => {
    console.log(data);
    mForgotPassword(data.email);
  };

  return (
    <div className="flex justify-center items-center  bg-[#f5f5f5] min-h-screen">
      <div className="p-10 bg-white flex justify-center items-center w-[700px] h-[500px] rounded-2xl">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="text-[#333] w-[560px]"
        >
          <header>
            <p className="text-center mb-11 font-medium text-[28px]">
              Forgot Password
            </p>
          </header>
          <div className="space-y-6">
            <CustomInput
              label="Email"
              placeholder="johndoe@gmail.com"
              error={errors.email?.message?.toString()}
              {...register("email")}
            />
            <div>
              <p className="mb-2">
                Already have an account?{" "}
                <Link
                  to={BrowserComboRoutes.agentLogin}
                  className="text-primary"
                >
                  Log In
                </Link>
              </p>
              <button
                className="w-full font-medium text-xl leading-[24px] bg-primary h-[72px] text-white rounded-2xl"
                disabled={isLoadingForgotPassword}
              >
                {isLoadingForgotPassword ? (
                  <Loader className="mx-auto" />
                ) : (
                  "Reset Password"
                )}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
