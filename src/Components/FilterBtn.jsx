import { useState } from "react";
import { BiChevronDown, BiChevronUp } from "react-icons/bi";

function FilterBtn() {
    const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

    return (
        <>
        <div className="relative">
        <button
          className="text-[#333333]"
          onClick={toggleDropdown}
        >
          <div className="space-x-2 flex flex-row items-center bg-[#828282] px-4 py-2 rounded text-white">
            <span className="text-base">Filter</span>
            {isOpen ? <BiChevronUp /> : <BiChevronDown />}
          </div>
        </button>
        {/*isOpen && (
          <div className="absolute right-0 mt-2 py-2 bg-white shadow-lg rounded-md">
            <a
              href="#"
              className="block px-4 py-2 text-gray-800 hover:bg-gray-200"
            >
              Logout
            </a>
          </div>
        )*/}
      </div>
        </>
    )
}

export default FilterBtn;