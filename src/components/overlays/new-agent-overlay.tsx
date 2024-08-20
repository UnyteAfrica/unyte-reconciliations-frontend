import { useForm } from "react-hook-form";
import { CustomInput } from "../shared/input";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { MutationKeys } from "@/utils/mutation-keys";
import { InviteAgentType } from "@/types/request.types";
import { Loader } from "../loader";
import { inviteAgent } from "@/services/api/api-company";
import toast from "react-hot-toast";
import { logger } from "@/utils/logger";
import { OTPInput } from "../shared/otp-input";
import { ApiType } from "@/types/types";

const formSchema = z
  .object({
    email: z.string().refine(
      (val) => {
        if (!val.length) return false;
        const mails = val.split(",").map((mail) => mail.trim());
        for (let mail of mails) {
          if (!z.string().email().safeParse(mail).success) return false;
        }

        return true;
      },
      {
        message: "One of the emails is invalid",
      }
    ),
    agentNames: z.string().refine(
      (val) => {
        if (!val.length) return false;
        const names = val.split(",").map((name) => name.trim());
        for (let name of names) {
          if (!z.string().min(3).safeParse(name).success) return false;
        }

        return true;
      },
      {
        message: "All names must have a min of 3 characters",
      }
    ),
  })
  .refine(
    (data) => data.agentNames.split(",").length == data.email.split(",").length,
    {
      message: "You must have the same number of names and email",
      path: ["agentNames", "email"],
    }
  );

export const NewAgentOverlay: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      agentNames: "",
    },
  });

  const { mutate: mInvite, isPending: isInviteLoading } = useMutation({
    mutationKey: [MutationKeys.companyInviteAgent],
    mutationFn: (data: InviteAgentType) => inviteAgent(data),
    onSuccess: () => {
      toast.success("Invite Email sent to agent");
    },
  });

  const onSubmit = ({ agentNames, email }: z.infer<typeof formSchema>) => {
    const data = {
      emails: email.split(","),
      names: agentNames.split(","),
    };
    const agents = [];
    for (let i = 0; i < data.emails.length; i++) {
      const agent = {
        names: data.names[i],
        emails: data.emails[i],
      };
      agents.push(agent);
    }

    logger.log(agents);
    mInvite(agents);
  };

  return (
    <form
      className="p-8 space-y-4 w-full z-50 relative"
      onClick={(e) => {
        e.stopPropagation();
      }}
      onSubmit={handleSubmit(onSubmit)}
    >
      <h1 className="text-center text-2xl font-bold">Invite New Agent</h1>
      <CustomInput
        label="Emails"
        placeholder="johndoe@gmail.com, john@john.com"
        className=""
        error={errors.email?.message?.toString()}
        {...register("email")}
      />
      <CustomInput
        label="Agent Names"
        placeholder="Seun, Taiwo"
        className=""
        error={errors.agentNames?.message?.toString()}
        {...register("agentNames")}
      />
      <OTPInput apiType={ApiType.Insurer} />
      <button className="block rounded-lg text-white font-medium text-lg bg-mPrimary p-5 w-full  font-poppins text-center mx-auto">
        {isInviteLoading ? <Loader className="mx-auto" /> : "Invite Agent"}
      </button>
    </form>
  );
};
