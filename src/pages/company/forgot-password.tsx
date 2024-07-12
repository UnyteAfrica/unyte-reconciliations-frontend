import { CustomInput } from "@/components/shared/input";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { BrowserComboRoutes } from "@/utils/routes";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { MutationKeys } from "@/utils/mutation-keys";
import { companyForgotPassword } from "@/services/api/api-company";
import { isAxiosError } from "axios";
import { Loader } from "@/components/loader";
import toast from "react-hot-toast";

const formSchema = z.object({
  email: z.string().email("Invalid email entered"),
});

export const CompanyForgotPasswordPage = () => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
    },
  });

  const { mutate: mForgotPassword, isPending: isForgotPasswordLoading } =
    useMutation({
      mutationKey: [MutationKeys.companyForgotPassword],
      mutationFn: (email: string) => companyForgotPassword(email),
      onError: (err) => {
        if (isAxiosError(err)) {
          if (err.response?.status == 400) {
            toast.error(err.response.data.error[0]);
          }
        }
      },
      onSuccess: (data) => {
        if (data.status == 200) {
          setValue("email", "");
          toast.success("Password reset email has been sent");
        }
        console.log(data);
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
                  to={BrowserComboRoutes.companyLogin}
                  className="text-primary"
                >
                  Log In
                </Link>
              </p>
              <button
                className="w-full font-medium text-xl leading-[24px] bg-primary h-[72px] text-white rounded-2xl"
                disabled={isForgotPasswordLoading}
              >
                {isForgotPasswordLoading ? (
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
