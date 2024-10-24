import { useEffect, useState } from "react";

import { useMediaQuery } from "@/utils/hooks";

import { PolicyType } from "@/types/types";
import { createPortal } from "react-dom";

import { Icon } from "@/components/shared/icon";
import { FaAngleLeft } from "react-icons/fa";
import { CustomInput } from "@/components/shared/input";
import { twMerge } from "tailwind-merge";
import { MdOutlineFileUpload } from "react-icons/md";
import { formatToNaira } from "@/utils/utils";

const policyTypes: PolicyType[] = [
  {
    name: "Health Insurance",
    description:
      "Covers medical expenses, such as doctor's visits, hospital stays, and prescription drugs.",
    iconType: "healthInsurance",
  },
  {
    name: "Comprehensive Motor Insurance",
    description:
      "With motor insurance you get to cover damages caused by accidents or theft involving a vehicle.",
    iconType: "motorInsurance",
  },
  {
    name: "Travel Insurance",
    description:
      "Travel insurance protects you against unexpected events while traveling, like trip cancellations, lost luggage etc.",
    iconType: "travelInsurance",
  },
  {
    name: "Device Insurance",
    description:
      "Device insurance covers your device against unexpected events that lead to damage of parts of the phone",
    iconType: "deviceInsurance",
  },
];

export const AgentPolicies = () => {
  const { isMediaQueryMatched } = useMediaQuery(1024);
  return (
    <>
      {!isMediaQueryMatched && (
        <div className="px-5 py-6 max-w-[850px] mx-auto bg-[#F8F8F8]">
          <header className="mb-7">
            <h1 className="font-semibold text-2xl mb-5">Policies</h1>
            <p>
              Choose any of our available policies to sell to potential
              customers
            </p>
          </header>
          <main className="space-y-4">
            {policyTypes.map((policyType, idx) => (
              <PolicyCard policyType={policyType} key={idx} />
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

const PolicyCard: React.FC<{ policyType: PolicyType }> = ({ policyType }) => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [isOpen]);

  return (
    <div className="bg-white rounded-2xl p-4 cursor-pointer">
      {createPortal(
        <BuyPolicyForm
          isOpen={isOpen}
          policyType={policyType}
          onClose={() => setIsOpen(false)}
        />,
        document.body
      )}

      <div className="flex mb-2">
        <div className="bg-[#C8FFC6] h-8 w-8 rounded-full mr-2 flex justify-center items-center shrink-0">
          <Icon type={policyType.iconType} />
        </div>
        <div>
          <h3 className="not-italic text-sm font-medium inline-block mb-1 text-[#101323]">
            {policyType.name}
          </h3>
          <p className="text-[#667085] text-xs">{policyType.description}</p>
        </div>
      </div>
      <div className="flex justify-between">
        <button
          onClick={() => setIsOpen(true)}
          className="w-[48%] text-white text-sm font-medium bg-[#25D366] rounded-full py-[6px]"
        >
          Sell Policy
        </button>
        <button className="w-[48%] text-black text-sm font-medium bg-[#F9FAFB] rounded-full py-[6px]">
          View Policy
        </button>
      </div>
    </div>
  );
};

const BuyPolicyForm: React.FC<{
  policyType: PolicyType;
  isOpen: boolean;
  onClose: () => void;
}> = ({ policyType, isOpen, onClose }) => {
  const [formPage, setFormPage] = useState(1);
  const [isSubmitted, setIsSubmitted] = useState(false);

  return (
    <div
      className={twMerge(
        "z-50 h-screen w-screen fixed top-0 left-0 flex flex-col bg-white py-10 px-6 pb-6 transition translate-x-[100%] opacity-0 overflow-y-auto",
        isOpen && "translate-x-0 opacity-100"
      )}
    >
      <div className="flex justify-between items-center mb-4">
        <button
          onClick={() => {
            if (isSubmitted) {
              setIsSubmitted(false);
              return;
            }
            if (formPage == 1) {
              onClose();
            } else {
              setFormPage(1);
            }
          }}
        >
          <FaAngleLeft className="text-2xl" />
        </button>
        {!isSubmitted && (
          <>
            <div
              className={twMerge(
                "bg-[#D9D9D9] rounded-full h-[6px] w-[40%] transition",
                formPage == 2 && "bg-[#25D366]"
              )}
            />
            <div className="bg-[#D9D9D9] rounded-full h-[6px] w-[40%]" />
          </>
        )}
      </div>
      {isSubmitted && <PolicyPayment />}
      {!isSubmitted && (
        <>
          <header className="mb-4">
            <h4 className="font-semibold mb-2">Sell {policyType.name}</h4>
            <em className="not-italic text-sm text-[#4F4F4F]">
              Enter customer's personal details
            </em>
          </header>
          <div>
            {formPage == 1 && (
              <div className="space-y-6">
                <CustomInput
                  label="Customer's Full Name"
                  labelClassName="text-sm"
                  className="h-14 border-[#e0e0e0] text-sm"
                  placeholder="John Doe"
                />
                <CustomInput
                  label="Customer's Date of Birth"
                  labelClassName="text-sm"
                  className="h-14 border-[#e0e0e0] text-sm"
                  placeholder="DD/MM/YYYY"
                  type="date"
                />
                <CustomInput
                  label="Customer's Phone Number"
                  labelClassName="text-sm"
                  className="h-14 border-[#e0e0e0] text-sm"
                  placeholder="08035892001"
                />
                <CustomInput
                  label="Customer's Email Address"
                  labelClassName="text-sm"
                  className="h-14 border-[#e0e0e0] text-sm"
                  placeholder="mail@mail.com"
                />
              </div>
            )}
            {formPage == 2 && (
              <div className="space-y-6">
                <CustomInput
                  label="What country is the customer travelling to?"
                  labelClassName="text-sm"
                  className="h-14 border-[#e0e0e0] text-sm"
                  placeholder="Customer's Destination"
                />
                <CustomInput
                  label="Duration of the trip"
                  labelClassName="text-sm"
                  className="h-14 border-[#e0e0e0] text-sm"
                  placeholder="DD/MM/YYYY"
                  type="date"
                />
                <CustomInput
                  label="Purpose of the trip"
                  labelClassName="text-sm"
                  className="h-14 border-[#e0e0e0] text-sm"
                  placeholder="08035892001"
                />

                <button className="w-full rounded-lg bg-[#F2F2F2] text-[#333] flex items-center justify-center py-4">
                  <MdOutlineFileUpload className="text-4xl inline-block mr-2" />
                  <span className="font-medium text-sm">
                    Upload Passport Data Page
                  </span>
                </button>
                <div className="flex justify-center items-center mt-4">
                  <Icon type="verified" className="inline-block mr-1" />
                  <em className="not-italic text-[#333] text-sm">
                    Your data is safe and secure
                  </em>
                </div>
              </div>
            )}
          </div>
          <div className="grow" />
          <button
            onClick={(e) => {
              e.preventDefault();
              if (formPage == 1) {
                setFormPage(2);
              } else {
                //Submit Form
                setIsSubmitted(true);
              }
            }}
            className="w-full bg-[#25D366] py-4 text-lg font-medium rounded-lg text-white"
          >
            {formPage == 1 ? "Continue" : "Get Quote"}
          </button>
          <em className="block text-center not-italic text-xs mt-10">
            Powered by Unyte Africa
          </em>
        </>
      )}
    </div>
  );
};

const PolicyPayment = () => {
  return (
    <div className="py-6 bg-white">
      <div className="w-full bg-[#C8FFC6] flex justify-center items-center mb-3 py-6 rounded-lg">
        <Icon type="travel" className="" />
      </div>
      <div className="py-[10px] mx-auto w-[165px] bg-[#101323] flex justify-center items-center rounded-full mb-3">
        <Icon type="whiteReceipt" className="mr-1 inline-block" />
        <span className="text-xs font-medium text-white">
          View coverage details
        </span>
      </div>
      <div className="bg-[#F9FAFB] rounded-lg p-4 space-y-4 mb-3">
        <div className="flex justify-between items-center">
          <em className="not-italic text-sm text-[#667085]">Policy number</em>
          <em className="not-italic text-sm font-medium text-[#101323]">
            **** **** 5678
          </em>
        </div>
        <div className="flex justify-between items-center">
          <em className="not-italic text-sm text-[#667085]">Effective date</em>
          <em className="not-italic text-sm font-medium text-[#101323]">
            19/09/2024
          </em>
        </div>
        <div className="flex justify-between items-center">
          <em className="not-italic text-sm text-[#667085]">Expiration Date</em>
          <em className="not-italic text-sm font-medium text-[#101323]">
            11/12/2024
          </em>
        </div>
        <div className="flex justify-between items-center">
          <em className="not-italic text-sm text-[#667085]">Cost</em>
          <em className="not-italic text-sm font-medium text-[#101323]">
            {formatToNaira(7500)}
          </em>
        </div>
      </div>
      <div className="space-y-[10px] bg-[#F9FAFB] rounded-lg p-4 mb-4">
        <em className="not-italic font-medium block">
          AXA Mansard Insurance LTD
        </em>
        <em className="not-italic font-medium block">3112456789</em>
        <em className="not-italic font-medium block">GTBank</em>
      </div>
      <em className="block mb-4 uppercase text-center not-italic">or</em>
      <Icon type="qr" className="mb-8 mx-auto" />
      <button className="w-full bg-[#25D366] py-4 text-lg font-medium rounded-lg text-white">
        Sliding button to confirm
      </button>
    </div>
  );
};
