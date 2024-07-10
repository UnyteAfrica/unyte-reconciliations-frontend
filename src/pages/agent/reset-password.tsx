import { PasswordInput } from "@/components/shared/input";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { Link, useNavigate, useParams } from "react-router-dom";
import { BrowserComboRoutes } from "@/utils/routes";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { MutationKeys } from "@/utils/mutation-keys";
import { agentResetPassword } from "@/api/api-agent";
import { useEffect } from "react";
import { AgentPasswordResetType } from "@/types/request.types";
import { Loader } from "@/components/loader";
import toast from "react-hot-toast";

const formSchema = z
  .object({
    password: z.string().min(6, "Password cannot be less than 6 characters"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password == data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

export const AgentResetPasswordPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });

  const navigate = useNavigate();

  const { id, token } = useParams();

  useEffect(() => {
    if (!id || !token) navigate(BrowserComboRoutes.agentLogin);
  }, [id, token]);

  const { mutate: mResetPassword, isPending: isResetPasswordLoading } =
    useMutation({
      mutationKey: [MutationKeys.agentResetPassword],
      mutationFn: (data: AgentPasswordResetType) => agentResetPassword(data),
      onSuccess: (data) => {
        console.log(data);
        toast.success(data.data.message);
        navigate(BrowserComboRoutes.agentLogin);
      },
    });

  const onSubmit = (data: z.infer<typeof formSchema>) => {
    console.log(data);
    mResetPassword({
      idBase64: id!,
      token: token!,
      newPassword: data.password,
    });
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
              Reset Password
            </p>
          </header>
          <div className="space-y-6">
            <PasswordInput
              label="Password"
              placeholder="********"
              error={errors.password?.message?.toString()}
              {...register("password")}
            />
            <PasswordInput
              label="Confirm Password"
              placeholder="********"
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
                  Log In
                </Link>
              </p>
              <button
                className="w-full font-medium text-xl leading-[24px] bg-primary h-[72px] text-white rounded-2xl"
                disabled={isResetPasswordLoading}
              >
                {isResetPasswordLoading ? (
                  <Loader className="mx-auto" />
                ) : (
                  "Reset"
                )}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
