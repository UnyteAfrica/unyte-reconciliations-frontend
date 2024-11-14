import SearchIcon from "../assets/Icons/SearchIcon.svg";
import { twMerge } from "tailwind-merge";

type SearchBarProps = {
  placeholder: string;
  className?: string;
  containerClassName?: string;
  value: string;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
};

export const SearchBar: React.FC<SearchBarProps> = ({
  placeholder,
  className,
  containerClassName,
  value,
  onChange,
}) => {
  return (
    <div
      className={twMerge(
        "relative bg-[#F2F2F2] rounded-lg placeholder:text-[#828282] px-4 py-3 flex items-center",
        containerClassName
      )}
    >
      <img
        src={SearchIcon}
        alt="search icon"
        className="block mr-2 w-[18px] h-[18px]"
      />
      <input
        type="search"
        onChange={onChange}
        value={value}
        placeholder={placeholder}
        className={twMerge(
          "bg-transparent py-2 text-opacity-20 outline-none w-full",
          className
        )}
      />
    </div>
  );
};
