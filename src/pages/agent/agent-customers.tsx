import { useEffect, useState } from "react";

import { SearchBar } from "../../components/searchbar";
import { useMediaQuery } from "@/utils/hooks";
import { FaAngleDown } from "react-icons/fa";
import { Customer } from "@/types/types";

import { formatToNaira, getCompanyInitials } from "@/utils/utils";
import { createPortal } from "react-dom";
import { twMerge } from "tailwind-merge";
import { Icon } from "@/components/shared/icon";
import { CheckboxInput } from "@/components/shared/checkbox-input";

const customers: Customer[] = [
  {
    email: "dro@gmail.com",
    name: "Dro Tee",
    phoneNo: "+2348091234567",
    activePolicies: [
      {
        policyName: "Health Insurance",
        price: 25500,
      },
      {
        policyName: "Life Insurance",
        price: 32500,
      },
      {
        policyName: "Student Insurance",
        price: 18500,
      },
    ],
    inactivePolicies: [],
  },
  {
    email: "seun@gmail.com",
    name: "Seun Taiwo",
    phoneNo: "+2348091234576",
    activePolicies: [
      {
        policyName: "Life Insurance",
        price: 42500,
      },
      {
        policyName: "Student Insurance",
        price: 25500,
      },
    ],
    inactivePolicies: [],
  },
  {
    email: "jeff@gmail.com",
    name: "Jeff Bezos",
    phoneNo: "+2348091234768",
    activePolicies: [
      {
        policyName: "Student Insurance",
        price: 14570,
      },
    ],
    inactivePolicies: [],
  },
];

const policyTypes = [
  "Health Insurance",
  "Motor Insurance",
  "Life Insurance",
  "Device Insurance",
];

export const AgentCustomers = () => {
  const { isMediaQueryMatched } = useMediaQuery(1024);
  const [isFilterOpened, setIsFilterOpened] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [policySelected, setPolicySelected] = useState<{
    [key: string]: boolean;
  }>({});

  useEffect(() => {
    const policySelectedObj: { [key: string]: boolean } = {};
    for (let policyType of policyTypes) {
      policySelectedObj[policyType] = false;
    }
    setPolicySelected(policySelectedObj);
  }, []);

  const getPolicyFiltersText = () => {
    let text = "";
    let count = 0;
    let hasTakenFirst = false;

    for (let policyType in policySelected) {
      if (policySelected[policyType]) {
        if (!hasTakenFirst) {
          text += policyType;
          count--;
        }
        hasTakenFirst = true;
        count++;
      }
    }
    if (count > 0) text += ` + ${count}`;

    return text;
  };

  const policyFilters = getPolicyFiltersText();

  return (
    <>
      {!isMediaQueryMatched && (
        <div className="px-5 pb-10 max-w-[850px] mx-auto bg-[#F8F8F8]">
          {createPortal(
            <PolicyFilterBottomSheet
              isOpen={isFilterOpened}
              onClose={() => setIsFilterOpened(false)}
              policySelected={policySelected}
              selectPolicyType={(policyType, value) =>
                setPolicySelected((policySelected) => {
                  const clone = { ...policySelected };
                  clone[policyType] = value;
                  return clone;
                })
              }
            />,
            document.body
          )}
          <header className="mb-4">
            <h1 className="font-semibold text-2xl mb-6">Customers</h1>
            <SearchBar
              placeholder="Find customer"
              containerClassName="mb-4 border-2 border-[#E0E0E0] h-10"
              className="text-sm font-medium py-3"
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
            />
            <div className="flex items-center">
              <button
                className={twMerge(
                  "bg-[#F2F2F2] text-[#828282] rounded-lg py-2 px-3 text-xs font-semibold transition mr-2 border-2 border-[#e0e0e0]",
                  (searchText || !policyFilters) &&
                    "bg-[#333] text-white border-none"
                )}
              >
                {searchText ? `Searching for "${searchText}"` : "All customers"}
              </button>
              <button
                className={twMerge(
                  "flex items-center bg-[#F2F2F2] rounded-lg text-[#828282] font-semibold text-xs py-2 px-3 border-2 border-[#e0e0e0] transition",
                  policyFilters && "bg-[#333] text-white border-none"
                )}
                onClick={() => setIsFilterOpened(true)}
              >
                {policyFilters ? policyFilters : "Policy bought"}
                <FaAngleDown className="ml-[6px]" />{" "}
              </button>
            </div>
          </header>
          <main className="space-y-4">
            {customers.map((customer, idx) => (
              <CustomerCard key={idx} customer={customer} />
            ))}
          </main>
        </div>
      )}
      {isMediaQueryMatched && (
        <div className="mx-auto max-w-7xl mt-12 px-6 mb-16">Hello</div>
      )}
    </>
  );
};

const CustomerCard: React.FC<{ customer: Customer }> = ({ customer }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div
      className="bg-white rounded-2xl p-4 cursor-pointer"
      onClick={() => setIsOpen(true)}
    >
      {createPortal(
        <CustomerInfo
          isOpen={isOpen}
          customer={customer}
          onClose={() => setIsOpen(false)}
        />,
        document.body
      )}
      <div className="flex mt-2 py-2 rounded-md items-center border-b border-dotted border-[#E0E0E0]">
        <div className="bg-[#F5A623] w-10 h-10 rounded-full text-white shrink-0 flex justify-center items-center mr-2">
          {getCompanyInitials(customer.name)}
        </div>
        <div className="flex flex-col grow">
          <em className="not-italic text-sm inline-block mb-[2px]">
            {customer.name}
          </em>
          <a
            className="not-italic text-xs text-[#4F4F4F] self-start inline"
            href={`tel:${customer.phoneNo}`}
            onClick={(e) => e.stopPropagation()}
          >
            <Icon type="call" className="w-[14px] h-[14px] inline-block mr-1" />
            <span className="border-b border-[#4F4F4F]">
              {customer.phoneNo}
            </span>
          </a>
        </div>
        <Icon type="arrowForward" className="w-4 h-4" />
      </div>
      <div className="text-[#4F4F4F] space-y-2 mt-3">
        <h2 className="text-sm">Policies</h2>
        <div className="flex justify-between items-center">
          <em className="not-italic text-sm">
            {customer.activePolicies[0].policyName}
          </em>
          <em className="not-italic text-sm font-medium">
            {formatToNaira(customer.activePolicies[0].price)}
          </em>
        </div>
        {!!(customer.activePolicies.length - 1) && (
          <em className="not-italic text-sm text-[#5CC758] font-medium">
            +{customer.activePolicies.length - 1} more
          </em>
        )}
      </div>
    </div>
  );
};

export const CustomerInfo: React.FC<{
  customer: Customer;
  isOpen: boolean;
  onClose: () => void;
}> = ({ customer, isOpen, onClose }) => {
  return (
    <div
      className={twMerge(
        "z-50 h-dvh w-screen fixed top-0 left-0 bg-white py-10 overflow-y-auto transition translate-x-full",
        isOpen && "translate-x-0"
      )}
    >
      <button
        onClick={(e) => {
          e.stopPropagation();
          onClose();
        }}
        className="mb-6 ml-6"
      >
        <Icon type="arrowBack" className="" />
      </button>

      <h3 className="font-semibold mb-6 ml-6">Customer Info</h3>
      <div className="space-y-4 mb-4 px-6">
        <div className="flex flex-col">
          <em className="not-italic text-sm text-[#4F4F4F] mb-1">
            Customer Name
          </em>
          <em className="not-italic font-medium text-sm text-[#333]">
            {customer.name}{" "}
          </em>
        </div>
        <div className="flex flex-col">
          <em className="not-italic text-sm text-[#4F4F4F] mb-1">
            Phone Number
          </em>
          <a
            className="not-italic font-medium text-sm text-[#333] self-start border-b border-[#333]"
            href={`tel:${customer.phoneNo}`}
          >
            {customer.phoneNo}{" "}
          </a>
        </div>
        <div className="flex flex-col">
          <em className="not-italic text-sm text-[#4F4F4F] mb-1">
            Email Address
          </em>
          <a
            className="not-italic font-medium text-sm text-[#333] self-start border-b border-[#333]"
            href={`mailto:${customer.email}`}
          >
            {customer.email}{" "}
          </a>
        </div>
      </div>
      <div className="bg-[#F7F7F7] h-4 w-full" />
      <div className="my-4 px-6">
        <div className="mb-4">
          <h3 className="font-semibold mb-2">Active Policies</h3>
          <div className="border rounded-lg border-[#E0E0E0] p-4 space-y-4 min-h-[82px]">
            {customer.activePolicies.map((activePolicy, idx) => (
              <div key={idx} className="flex justify-between items-center">
                <em className="not-italic text-sm text-[#4F4F4F]">
                  {activePolicy.policyName}
                </em>
                <em className="not-italic font-medium text-[#333]">
                  {formatToNaira(activePolicy.price)}
                </em>
              </div>
            ))}
          </div>
        </div>
        <div>
          <h3 className="font-semibold mb-2">Inactive Policies</h3>
          <div
            className={twMerge(
              "border rounded-lg border-[#E0E0E0] p-4 space-y-4 min-h-[82px]",
              !!!customer.inactivePolicies.length &&
                "flex justify-center items-center"
            )}
          >
            {customer.inactivePolicies.length ? (
              customer.inactivePolicies.map((inactivePolicy, idx) => (
                <div key={idx} className="flex justify-between items-center">
                  <em className="not-italic text-sm text-[#4F4F4F]">
                    {inactivePolicy.policyName}
                  </em>
                  <em className="not-italic font-medium text-[#333]">
                    {formatToNaira(inactivePolicy.price)}
                  </em>
                </div>
              ))
            ) : (
              <em className="not-italic font-medium text-sm text-[#333]">
                No inactive policies
              </em>
            )}
          </div>
        </div>
      </div>
      <div className="bg-[#F7F7F7] h-4 w-full mb-6" />
      <div className="px-6">
        <a
          href={`tel:${customer.phoneNo}`}
          className="bg-[#25D366] text-white text-lg font-medium rounded-lg w-full py-4 block text-center mb-4"
        >
          Call Customer
        </a>
        <a className="border border-[#FF1F1F] rounded-lg text-[#FF1F1F] w-full py-4 block text-center">
          Delete Customer
        </a>
      </div>
    </div>
  );
};

type PolicyFilterBottomSheetProps = {
  isOpen: boolean;
  onClose: () => void;
  policySelected: { [key: string]: boolean };
  selectPolicyType: (policyType: string, value: boolean) => void;
};

const PolicyFilterBottomSheet: React.FC<PolicyFilterBottomSheetProps> = ({
  isOpen,
  onClose,
  policySelected,
  selectPolicyType,
}) => {
  return (
    <div
      className={twMerge(
        "h-dvh w-screen bg-black/30 fixed inset-0 transition ",
        isOpen && "z-50 opacity-100 translate-y-0",
        !isOpen && "-z-20 opacity-0 translate-y-[100%]"
      )}
      onClick={onClose}
    >
      <div
        className={twMerge(
          "bg-white w-screen absolute bottom-0 rounded-t-2xl transition"
          // isShowingBottomSheet && "translate-y-0"
        )}
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <div className="p-6">
          <header className="flex justify-between items-center mb-6">
            <h2 className="font-semibold text-xl">Filter Customers</h2>
            <button onClick={onClose}>
              <Icon type="close" className="w-6 h-6" />
            </button>
          </header>
          <div className="space-y-4">
            {policyTypes.map((policyType, idx) => (
              <CheckboxInput
                key={idx}
                label={policyType}
                onClick={() =>
                  selectPolicyType(policyType, !policySelected[policyType])
                }
                onChange={(e) => selectPolicyType(policyType, e.target.checked)}
                checked={policySelected[policyType]}
                name="claim-status"
              />
            ))}
          </div>
          <button
            className="bg-[#25D366] text-white font-medium text-lg py-[18px] w-full rounded-lg mt-10"
            onClick={onClose}
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};
