import { useState } from "react";

import SearchIcon from "../assets/Icons/SearchIcon.svg";
import { twMerge } from "tailwind-merge";

type SearchBarProps = {
  placeholder: string;
  className?: string;
  containerClassName?: string;
};

export const SearchBar: React.FC<SearchBarProps> = ({
  placeholder,
  className,
  containerClassName,
}) => {
  const [value, setValue] = useState("");
  return (
    <div
      className={twMerge(
        "relative bg-[#F2F2F2] rounded-lg placeholder:text-[#828282] px-4 py-3 flex items-center",
        containerClassName
      )}
    >
      <img src={SearchIcon} alt="search icon" className="block mr-2 w-7 h-7" />
      <input
        type="search"
        onChange={(e) => setValue(e.target.value)}
        value={value}
        placeholder={placeholder}
        className={twMerge("bg-transparent py-2 text-opacity-20", className)}
      />
    </div>
  );
};
