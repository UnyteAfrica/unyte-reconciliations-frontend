import React, { ComponentPropsWithoutRef, useRef, useState } from "react";
import { MdEdit } from "react-icons/md";
import { twMerge } from "tailwind-merge";
import { Loader } from "../loader";

export type EditableProfileImageProps = ComponentPropsWithoutRef<"input"> & {
  extImageUrl?: string;
  error?: string;
  errorClassName?: string;
  initials: string;
  isLoading?: boolean;
  onImageChange: (image: File) => void;
};

export const EditableProfileImage: React.FC<EditableProfileImageProps> = ({
  extImageUrl,
  onImageChange,
  error,
  errorClassName,
  initials,
  isLoading,
}) => {
  const [imageUrl, setImageUrl] = useState(extImageUrl ?? "");
  const imageInputRef = useRef<HTMLInputElement>(null);

  if (isLoading)
    return (
      <div className="w-32 h-32 bg-[#e0e0e0] rounded-full flex justify-center items-center my-4 relative lg:shrink-0 lg:my-0">
        <Loader className="mx-auto w-16 h-16" />
      </div>
    );
  return (
    <>
      <div className="relative inline-block">
        <input
          ref={imageInputRef}
          className="hidden"
          type="file"
          onChange={(e) => {
            if (e.target.files) {
              const file = e.target.files[0];
              setImageUrl(URL.createObjectURL(file));
              onImageChange(file);
            }
          }}
          accept="image/png, image/jpeg, image/webp, image/jpg"
        />
        <div className="relative inline-block">
          {!error && imageUrl ? (
            <img
              className="w-32 h-32 rounded-full flex my-4 object-cover lg:shrink-0 lg:my-0"
              src={imageUrl}
              alt=""
            />
          ) : (
            <div className="w-32 h-32 bg-[#e0e0e0] rounded-full flex justify-center items-center my-4 relative lg:shrink-0 lg:my-0">
              <em className="not-italic font-semibold text-3xl">{initials}</em>
            </div>
          )}
          <div
            className="w-8 h-8 rounded-full bg-black text-white absolute bottom-2 right-2 flex justify-center items-center cursor-pointer"
            onClick={() => {
              imageInputRef?.current?.click();
            }}
          >
            <MdEdit className="text-xl" />
          </div>
        </div>

        <p
          className={twMerge(
            "font-sora text-lg block font-bold  mt-2 text-red-600",
            errorClassName
          )}
        >
          {error && error}
        </p>
      </div>
    </>
  );
};
