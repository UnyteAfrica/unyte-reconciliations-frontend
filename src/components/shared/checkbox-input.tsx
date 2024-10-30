import camelcase from "camelcase";
import { cx } from "class-variance-authority";
import { ChangeEventHandler, MouseEventHandler } from "react";
import { FaCheck } from "react-icons/fa";
import { twMerge } from "tailwind-merge";

type CheckboxInputProps = {
  label: string;
  onClick?: MouseEventHandler<HTMLDivElement>;
  onChange: ChangeEventHandler<HTMLInputElement>;
  name: string;
  checked: boolean;
};

export const CheckboxInput: React.FC<CheckboxInputProps> = ({
  label,
  checked,
  name,
  onClick,
  onChange,
}) => {
  return (
    <div className="flex items-center mb-4 h-8">
      <div className="mr-2 flex justify-center items-center">
        <input
          id={camelcase(label)}
          type="checkbox"
          name={name}
          className={cx("w-5 h-5", checked && "hidden")}
          onChange={onChange}
          checked={checked}
        />
        <div
          className={twMerge(
            "bg-white border border-mPrimary relative rounded hidden justify-center items-center w-[22px] h-[22px]",
            checked && "flex"
          )}
          onClick={onClick}
        >
          <FaCheck className="absolute -top-1 left-[2px] text-2xl text-mPrimary" />
        </div>
      </div>
      <label htmlFor={camelcase(label)}>{label}</label>
    </div>
  );
};
