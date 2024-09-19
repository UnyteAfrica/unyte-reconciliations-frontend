import { useForm } from "react-hook-form";
import { CustomInput, FileInput } from "../shared/input";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { MutationKeys } from "@/utils/mutation-keys";
import { InviteAgentType } from "@/types/request.types";
import { Loader } from "../loader";
import {
  inviteAgent,
  inviteAgentsThroughCSV,
} from "@/services/api/api-company";
import toast from "react-hot-toast";
import { logger } from "@/utils/logger";
import { OTPInput } from "../shared/otp-input";
import { ApiType } from "@/types/types";
import { useEffect, useState } from "react";
import { cx } from "class-variance-authority";
import { FaFileCsv } from "react-icons/fa";
import Papa from "papaparse";
import { twMerge } from "tailwind-merge";

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

enum AddAgentState {
  TEXT,
  CSV,
}

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

  const [addAgentState, setAddAgentState] = useState<AddAgentState>(
    AddAgentState.TEXT
  );
  const [agentsCSV, setAgentsCSV] = useState<File | null>(null);

  const { mutate: mInvite, isPending: isInviteLoading } = useMutation({
    mutationKey: [MutationKeys.companyInviteAgent],
    mutationFn: (data: InviteAgentType) => inviteAgent(data),
    onSuccess: () => {
      toast.success("Invite Email sent to agent");
    },
  });

  const { mutate: mInviteCSV, isPending: isCSVInviteLoading } = useMutation({
    mutationKey: [MutationKeys.companyInviteAgentCSV],
    mutationFn: (data: FormData) => inviteAgentsThroughCSV(data),
    onSuccess: () => {
      toast.success("Invite emails sent to agents");
    },
  });

  const onSubmit = ({ agentNames, email }: z.infer<typeof formSchema>) => {
    if (addAgentState == AddAgentState.TEXT) {
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
    }
  };

  useEffect(() => {
    console.log(!!agentsCSV);
  }, [agentsCSV]);

  return (
    <form
      className="p-8 w-full z-50 relative"
      onClick={(e) => {
        e.stopPropagation();
      }}
      onSubmit={handleSubmit(onSubmit)}
    >
      <h1 className="text-center text-2xl font-bold mb-4">Invite New Agent</h1>
      <div className="space-x-4 mb-4">
        <button
          className={cx(
            "font-medium px-4",
            addAgentState == AddAgentState.TEXT &&
              "border-b-2 border-mPrimary pb-2"
          )}
          onClick={(e) => {
            e.preventDefault();
            setAddAgentState(AddAgentState.TEXT);
          }}
        >
          Invite By Email
        </button>
        <button
          className={cx(
            "font-medium px-4",
            addAgentState == AddAgentState.CSV &&
              "border-b-2 border-mPrimary pb-2"
          )}
          onClick={(e) => {
            e.preventDefault();
            setAddAgentState(AddAgentState.CSV);
          }}
        >
          Invite By CSV
        </button>
      </div>
      {addAgentState == AddAgentState.TEXT && (
        <div className="space-y-4 mb-4">
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
        </div>
      )}
      {addAgentState == AddAgentState.CSV && (
        <>
          <div className=" font-inter flex justify-center items-center"></div>
          <FileInput
            containerClassName="h-52 my-8 rounded-2xl"
            innerContent={
              <div className="w-full flex flex-col justify-center items-center">
                <FaFileCsv className="text-5xl text-mPrimary/[.7] text-center" />
                <p className="mx-auto inline-block mt-4">Select a CSV file</p>
              </div>
            }
            acceptedFiles=".csv"
            onFileChange={(file) => {
              Papa.parse<[string, string]>(file, {
                complete: function (results) {
                  if (results.data[0].length != 2) {
                    toast.error(
                      "The CSV format is invalid. The CSV must have names and emails only"
                    );
                    setAgentsCSV(null);
                    return;
                  }
                  if (
                    results.data[0][0] != "names" ||
                    results.data[0][1].trim() != "emails"
                  ) {
                    toast.error(
                      "The CSV format is invalid. The CSV must have names and emails only"
                    );
                    setAgentsCSV(null);
                    return;
                  }
                  setAgentsCSV(file);
                },
                preview: 1,
              });
            }}
          />
        </>
      )}
      <OTPInput apiType={ApiType.Insurer} />
      <button
        disabled={addAgentState == AddAgentState.CSV && !!!agentsCSV}
        className={twMerge(
          "block rounded-lg text-white font-medium text-lg bg-mPrimary p-5 w-full  font-poppins text-center mx-auto disabled:cursor-not-allowed disabled:bg-mPrimary/[0.4]"
        )}
        onClick={() => {
          if (addAgentState == AddAgentState.CSV) {
            if (!agentsCSV) {
              toast.error("CSV was not selected");
              return;
            }
            const data = new FormData();
            data.append("agents_csv", agentsCSV);
            mInviteCSV(data);
          }
        }}
      >
        {isInviteLoading || isCSVInviteLoading ? (
          <Loader className="mx-auto" />
        ) : (
          "Invite Agent"
        )}
      </button>
    </form>
  );
};
