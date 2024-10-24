import { useEffect, useState } from "react";

import { SearchBar } from "../../components/searchbar";
import { useMediaQuery } from "@/utils/hooks";
import { FaAngleDown, FaAngleLeft, FaAngleRight } from "react-icons/fa";
import { Customer } from "@/types/types";
import { IoIosCall } from "react-icons/io";
import { formatToNaira, getCompanyInitials } from "@/utils/utils";
import { createPortal } from "react-dom";
import { twMerge } from "tailwind-merge";

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

export const AgentCustomers = () => {
  const { isMediaQueryMatched } = useMediaQuery(1024);
  return (
    <>
      {!isMediaQueryMatched && (
        <div className="px-5 py-6 max-w-[850px] mx-auto bg-[#F8F8F8]">
          <header className="mb-7">
            <h1 className="font-semibold text-2xl mb-5">Customers</h1>
            <SearchBar
              placeholder={"Find customer"}
              containerClassName="mb-4"
            />
            <div className="flex items-center">
              <button className="bg-[#333] rounded-lg text-white py-2 px-3 text-xs font-semibold mr-2">
                All customers
              </button>
              <button className="flex items-center bg-[#F2F2F2] rounded-lg text-[#828282] font-semibold text-xs py-2 px-3">
                Policy bought <FaAngleDown className="ml-[6px]" />{" "}
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
          <em className="not-italic text-sm">{customer.name}</em>
          <em className="not-italic text-xs text-[#4F4F4F] flex items-center">
            <IoIosCall />
            <span className="underline">{customer.phoneNo}</span>
          </em>
        </div>
        <FaAngleRight className="text-xl" />
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
        "z-50 h-screen w-screen fixed top-0 left-0 bg-white py-10 px-6 overflow-y-auto transition translate-x-full",
        isOpen && "translate-x-0"
      )}
    >
      <FaAngleLeft
        className="text-2xl mb-6"
        onClick={(e) => {
          e.stopPropagation();
          onClose();
        }}
      />
      <h3 className="font-semibold mb-6">Customer Info</h3>
      <div className="space-y-4">
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
          <em className="not-italic font-medium text-sm text-[#333]">
            {customer.phoneNo}{" "}
          </em>
        </div>
        <div className="flex flex-col">
          <em className="not-italic text-sm text-[#4F4F4F] mb-1">
            Email Address
          </em>
          <em className="not-italic font-medium text-sm text-[#333]">
            {customer.email}{" "}
          </em>
        </div>
      </div>
      <div className="bg-[#ccc]" />
      <div className="mt-4 mb-14">
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
              <em className="not-italic font-medium text-sm">
                No inactive policies
              </em>
            )}
          </div>
        </div>
      </div>
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
  );
};
