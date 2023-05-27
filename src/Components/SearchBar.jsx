import { useState } from "react";
import PropTypes from "prop-types";

import SearchIcon from "../assets/icons/SearchIcon.svg";
function SearchBar({ handleSearch, placeholder }) {
    const [value, setValue] = useState("")
  return (
    <form onSubmit={handleSearch}>
      <div className="relative">
        <input type="search" placeholder={placeholder} className="border rounded bg-[#F2F2F2] pl-9 px-6 py-2 placeholder:text-[#828282] text-opacity-20"/>
        <img src={SearchIcon} alt="search icon" className="absolute top-3.5 left-2" value={value} onChange={(e) => setValue(e.target.value)}/>
      </div>
    </form>
  );
}

SearchBar.propTypes = {
  handleSearch: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
  value: PropTypes.string,
};

export default SearchBar;
