"use client";

import { useForm } from "react-hook-form";
import { CustomInput } from "../shared/input";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const formSchema = z.object({
  email: z.string().email("Invalid email entered"),
});

export const AddressOverlayForm: React.FC = () => {
  const {
    register,
    formState: { errors },
  } = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
    },
  });

  return (
    <form
      className="p-8 space-y-4 w-full z-50 relative"
      onClick={(e) => {
        e.stopPropagation();
      }}
    >
      <h1 className="text-center text-2xl font-bold">Add New Agent</h1>
      <CustomInput
        placeholder="Email"
        className=""
        error={errors.email?.message?.toString()}
        {...register("email")}
      />
      <button className="block rounded-lg text-white font-normal bg-primary text-sm p-3  font-poppins text-center mx-auto">
        {/* {isPending ? <Loader className="mx-auto" /> : "Update"} */}
      </button>
    </form>
  );
};
