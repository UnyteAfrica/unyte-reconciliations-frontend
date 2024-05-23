import { SearchBar } from "../components/searchbar";
import { DownloadButton } from "../components/download-button";
import { FilterButton } from "../components/filter-button";
import { PoliciesTable } from "../components/tables/policies-table";
//import { paginate } from "../utils/paginate";

function Policies() {
  const policies = [
    {
      policyRef: "#WP62F3E8F93",
      policyNo: "123jkf5402",
      insurer: "AXA mansard",
      date: "May 7, 2023",
      price: "₦40,000.00",
    },
    {
      policyRef: "#WP62F3E8F93",
      policyNo: "123jkf5402",
      insurer: "AXA mansard",
      date: "May 7, 2023",
      price: "₦40,000.00",
    },
    {
      policyRef: "#WP62F3E8F93",
      policyNo: "123jkf5402",
      insurer: "AXA mansard",
      date: "May 7, 2023",
      price: "₦40,000.00",
    },
    {
      policyRef: "#WP62F3E8F93",
      policyNo: "123jkf5402",
      insurer: "AXA mansard",
      date: "May 7, 2023",
      price: "₦40,000.00",
    },
    {
      policyRef: "#WP62F3E8F93",
      policyNo: "123jkf5402",
      insurer: "AXA mansard",
      date: "May 7, 2023",
      price: "₦40,000.00",
    },
  ];
  const handleSearch = () => {
    //
  };

  return (
    <>
      <div className="mx-auto max-w-6xl mt-12 px-6 lg:px-0">
        <div className="flex flex-row justify-between items-center mb-10">
          <span className="text-3xl text-[#333333] font-semibold">
            Policies
          </span>
          <SearchBar
            handleSearch={handleSearch}
            placeholder="Find policy reference"
          />
          <div id="dates" className="flex flex-row items-center space-x-3">
            <FilterButton />
            <DownloadButton data={[]} />
          </div>
        </div>
        <div className="mb-10">
          <PoliciesTable policies={policies} />
        </div>
      </div>
    </>
  );
}

export default Policies;
