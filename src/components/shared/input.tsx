"use client";

import { cx } from "class-variance-authority";
import {
  ComponentPropsWithoutRef,
  MouseEventHandler,
  ReactNode,
  forwardRef,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import { twMerge } from "tailwind-merge";
import camelcase from "camelcase";
import { FaRegEye } from "react-icons/fa";
import { Image } from "./image";

export type CustomInputProps = ComponentPropsWithoutRef<"input"> & {
  label?: string;
  labelClassName?: string;
  containerClassName?: string;
  error?: string;
  errorClassName?: string;
  after?: ReactNode;
  optional?: boolean;
};
export type ImageInputProps = ComponentPropsWithoutRef<"input"> & {
  label?: string;
  labelClassName?: string;
  extImageUrl?: string;
  containerClassName?: string;
  error?: string;
  errorClassName?: string;
  onImageChange: (image: File) => void;
};

export type CustomSelectProps = ComponentPropsWithoutRef<"select"> & {
  label?: string;
  labelClassName?: string;
  containerClassName?: string;
  selectWrapperClassname?: string;
  error?: string;
  errorClassName?: string;
  placeholder?: string;
  after?: ReactNode;
  options: { option: string; value: string }[] | string[];
};

type CustomTextAreaProps = ComponentPropsWithoutRef<"textarea"> & {
  label?: string;
  labelClassName?: string;
  error?: string;
  errorClassName?: string;
};

type PasswordInputProps = Omit<CustomInputProps, "label"> & {
  inputClassname?: string;
  error?: string;
  label?: string;
};

const isStringArray = (
  obj: { option: string; value: string }[] | string[]
): obj is string[] => {
  return typeof obj[0] == "string";
};

export const CustomInput = forwardRef<HTMLInputElement, CustomInputProps>(
  function CustomInput(props, ref) {
    const {
      placeholder,
      type,
      className,
      label = "",
      labelClassName = "",
      containerClassName = "",
      error,
      errorClassName,
      after,
      optional,
      ...rest
    } = props;
    const inputId = camelcase(label);

    return (
      <div className={twMerge("", containerClassName)}>
        {label ? (
          <>
            <label
              className={twMerge(
                "text-lg text-[#333] leading-[24px] mb-2 block",
                labelClassName
              )}
              htmlFor={inputId}
            >
              {label}{" "}
              {optional && (
                <span className="not-italic text-sm text-[#333]">
                  (optional)
                </span>
              )}
            </label>
          </>
        ) : null}

        <input
          ref={ref}
          className={twMerge(
            "block text-lg font-sora w-full px-3 py-[16px] h-[72px] border border-[#424242] rounded-lg outline-none focus:border-black",
            className
          )}
          id={inputId}
          type={type}
          placeholder={placeholder}
          {...rest}
        />
        <p className={twMerge("text-sm text-[#333]", errorClassName)}>
          {error && error}
        </p>
        {/* {after && after} */}
      </div>
    );
  }
);

export const CustomSelect = forwardRef<HTMLSelectElement, CustomSelectProps>(
  function CustomSelect(props, ref) {
    const {
      className,
      label = "",
      labelClassName = "",
      containerClassName = "",
      selectWrapperClassname,
      error,
      errorClassName,
      placeholder,
      after,
      options,
      ...rest
    } = props;
    const inputId = camelcase(label);
    return (
      <div className={twMerge("", containerClassName)}>
        {label ? (
          <label
            className={twMerge(
              "font-sora font-semibold text-[16px] leading-[20px] mb-2 block",
              labelClassName
            )}
            htmlFor={inputId}
          >
            {label}
          </label>
        ) : null}

        <div
          className={twMerge(
            "border-[#B5B3B3] border inline-block rounded-lg overflow-hidden relative w-[156px] h-[54px]",
            selectWrapperClassname
          )}
        >
          <select
            ref={ref}
            className={twMerge(
              "block text-[14px] font-sora w-full px-3 py-[16px] border border-[#424242] rounded-lg outline-none",
              className
            )}
            id={inputId}
            {...rest}
          >
            <option disabled value="">
              {placeholder
                ? placeholder
                : ` Select ${label ? `a ${label.toLowerCase()}` : "an option"}`}
            </option>
            {isStringArray(options)
              ? options.map((option, idx) => (
                  <option value={option} key={idx}>
                    {option}
                  </option>
                ))
              : options.map((option, idx) => (
                  <option value={option.value} key={idx}>
                    {option.option}
                  </option>
                ))}
          </select>
        </div>
        <p className={twMerge("font-sora text-sm text-[#333]", errorClassName)}>
          {error && error}
        </p>
      </div>
    );
  }
);

export const CustomTextArea = forwardRef<
  HTMLTextAreaElement,
  CustomTextAreaProps
>(function CustomTextArea(props, ref) {
  const {
    placeholder,
    className,
    label = "",
    labelClassName = "",
    error = "",
    errorClassName,
    ...rest
  } = props;
  const inputId = camelcase(label);
  return (
    <div className="mb-8">
      {label ? (
        <label
          className={twMerge(
            "font-sora font-semibold text-[16px] leading-[20px] mb-2 block",
            labelClassName
          )}
          htmlFor={inputId}
        >
          {label}
        </label>
      ) : null}

      <textarea
        className={twMerge(
          "block text-[14px] w-full px-[3px] transition rounded-lg duration-300 focus:border-black",
          className
        )}
        ref={ref}
        placeholder={placeholder}
        {...rest}
      />
      <p className={twMerge("font-sora text-sm text-[#333]", errorClassName)}>
        {error && error}
      </p>
    </div>
  );
});

export const PasswordInput = forwardRef<HTMLInputElement, PasswordInputProps>(
  function PasswordInput(props, ref) {
    const {
      className,
      inputClassname = "",
      labelClassName = "",
      label = "Password",
      onChange,
      value,
      error,
      ...rest
    } = props;
    const [isPasswordShown, setIsPasswordShown] = useState(false);

    const togglePasswordShown: MouseEventHandler<HTMLButtonElement> = (e) => {
      e.preventDefault();
      setIsPasswordShown((oldIsPasswordShown) => !oldIsPasswordShown);
    };

    const inputId = camelcase(label);

    return (
      <div>
        <label
          className={twMerge(
            "text-lg text-[#333] leading-[24px] mb-2 block",
            labelClassName
          )}
          htmlFor={inputId}
        >
          {label}
        </label>

        <div
          className={twMerge(
            "flex relative items-center w-[100%] border border-[#424242] rounded-lg  transition duration-300 focus-within:border-black",
            className
          )}
        >
          <CustomInput
            type={isPasswordShown ? "text" : "password"}
            placeholder="********"
            className={twMerge(
              "mb-0 border-0 w-[90%] focus:border-transparent focus:border-b-0",
              inputClassname
            )}
            containerClassName="w-full"
            onChange={onChange}
            value={value}
            id={inputId}
            ref={ref}
            {...rest}
          />

          <button
            onClick={togglePasswordShown}
            className={cx(
              "absolute top-[50%] -translate-y-[50%] right-3",
              isPasswordShown &&
                "after:content-[''] after:absolute after:left-2 after:top-0 after:h-full after:w-[2px] after:bg-[#595959] after:rotate-45"
            )}
          >
            <FaRegEye width={20} height={20} />
          </button>
        </div>
        <p className="font-sora text-sm text-[#333]">{error && error}</p>
      </div>
    );
  }
);

export const ImageInput = forwardRef<HTMLInputElement, ImageInputProps>(
  function ImageInput(props, ref) {
    const {
      placeholder,
      type,
      className,
      label = "",
      labelClassName = "",
      containerClassName = "",
      error,
      errorClassName,
      extImageUrl,
      onImageChange,
      ...rest
    } = props;
    const inputId = camelcase(label);
    const [imageUrl, setImageUrl] = useState(extImageUrl ?? "");
    const imageInputRef = useRef<HTMLInputElement>(null);
    useImperativeHandle(ref, () => imageInputRef.current!, []);
    return (
      <div className={twMerge("", containerClassName)}>
        {label ? (
          <>
            <label
              className={twMerge(
                "font-sora font-semibold text-[16px] leading-[20px] mb-2 block",
                labelClassName
              )}
              htmlFor={inputId}
            >
              {label}
            </label>
            <p className="my-0 mb-2 text-sm">
              Tap the box to select the image*
            </p>
          </>
        ) : null}

        <input
          ref={imageInputRef}
          className={twMerge(
            "text-[14px] font-sora w-full px-3 py-[16px] border border-[#424242] rounded-lg outline-none focus:border-black hidden",
            className
          )}
          id={inputId}
          type="file"
          placeholder={placeholder}
          onChange={(e) => {
            if (e.target.files) {
              const file = e.target.files[0];
              setImageUrl(URL.createObjectURL(file));
              onImageChange(file);
            }
          }}
          accept="image/png, image/jpeg, image/webp, image/jpg"
          {...rest}
        />
        <div
          className="w-full aspect-[282/131] border border-[#838080] flex justify-center items-center rounded-lg"
          onClick={() => {
            imageInputRef?.current?.click();
          }}
        >
          {imageUrl ? (
            <Image
              src={imageUrl}
              className="w-full h-full object-cover rounded-lg"
              alt="Image preview"
              height={160}
              width={328}
            />
          ) : (
            <p>Select Image File</p>
          )}
        </div>
        <p className={twMerge("font-sora text-sm text-[#333]", errorClassName)}>
          {error && error}
        </p>
      </div>
    );
  }
);

type DateInputProps = {
  containerClassName?: string;
  date: Date;
  onDateChange: (date: Date) => void;
};

export const DateInput = forwardRef<HTMLInputElement, DateInputProps>(
  function DateInput(props, _) {
    const { containerClassName, date, onDateChange } = props;
    const inputRef = useRef<HTMLInputElement>(null);

    const formattedDate = date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      // weekday: "short", // Optional, to include weekday (e.g., 'Sun')
    });

    const inputValue = date.toISOString().split("T")[0];

    return (
      <button
        className={twMerge(
          "px-4 py-2 border rounded-md relative",
          containerClassName ?? ""
        )}
        onClick={() => inputRef.current?.showPicker()}
      >
        {formattedDate}
        <input
          type="date"
          placeholder="date"
          className="absolute top-[45px] left-0 invisible opacity-0 h-0 w-0"
          value={inputValue}
          ref={inputRef}
          onChange={(e) => {
            const dateVal = e.target.valueAsDate;
            if (dateVal) {
              onDateChange(dateVal);
            }
          }}
        />
      </button>
    );
  }
);
