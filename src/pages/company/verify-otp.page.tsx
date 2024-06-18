import { PasswordInput } from "@/components/shared/input";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

const formSchema = z.object({
  otp: z.string().min(6, "OTP cannot be less than 6 characters"),
});

export const CompanyVerifyOTPPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      otp: "",
    },
  });

  const onSubmit = (data: z.infer<typeof formSchema>) => {
    console.log(data);
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
              Verify OTP
            </p>
          </header>
          <div className="space-y-6">
            <PasswordInput
              label="OTP"
              placeholder="******"
              error={errors.otp?.message?.toString()}
              {...register("otp")}
            />
            <div>
              <button className="text-primary mb-2">Resend OTP</button>
              <button className="w-full font-medium text-xl leading-[24px] bg-primary h-[72px] text-white rounded-2xl">
                Verify
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
