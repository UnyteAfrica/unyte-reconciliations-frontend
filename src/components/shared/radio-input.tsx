import camelcase from "camelcase";
import { cx } from "class-variance-authority";
import { ChangeEventHandler, MouseEventHandler } from "react";
import { twMerge } from "tailwind-merge";

type RadioInputProps = {
  label: string;
  onClick: MouseEventHandler<HTMLDivElement>;
  onChange: ChangeEventHandler<HTMLInputElement>;
  name: string;
  checked: boolean;
};

export const RadioInput: React.FC<RadioInputProps> = ({
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
          type="radio"
          name={name}
          className={cx("w-5 h-5", checked && "hidden")}
          onChange={onChange}
          checked={checked}
        />
        <div
          className={twMerge(
            "bg-white border border-mPrimary rounded-full hidden justify-center items-center w-5 h-5",
            checked && "flex"
          )}
          onClick={onClick}
        >
          <div className="w-[12px] h-[12px] bg-mPrimary rounded-full" />
        </div>
      </div>
      <label htmlFor={camelcase(label)}>{label}</label>
    </div>
  );
};
