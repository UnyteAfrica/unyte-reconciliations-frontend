import { useState } from "react";

import SearchIcon from "../assets/Icons/SearchIcon.svg";

type SearchBarProps = {
  handleSearch: () => void;
  placeholder: string;
};

export const SearchBar: React.FC<SearchBarProps> = ({
  handleSearch,
  placeholder,
}) => {
  const [value, setValue] = useState("");
  return (
    <form onSubmit={handleSearch}>
      <div className="relative">
        <input
          type="search"
          onChange={(e) => setValue(e.target.value)}
          value={value}
          placeholder={placeholder}
          className="border rounded bg-[#F2F2F2] pl-9 px-6 py-2 placeholder:text-[#828282] text-opacity-20"
        />
        <img
          src={SearchIcon}
          alt="search icon"
          className="absolute top-3.5 left-2"
        />
      </div>
    </form>
  );
};
