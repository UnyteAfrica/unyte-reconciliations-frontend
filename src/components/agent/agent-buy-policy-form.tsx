import { useEffect, useRef, useState } from "react";
import { twMerge } from "tailwind-merge";
import { CustomInput } from "../shared/input";
import { Icon } from "../shared/icon";
import { MdOutlineFileUpload } from "react-icons/md";
import { formatToNaira } from "@/utils/utils";
import { SlidingButton } from "../shared/sliding-button";
import toast from "react-hot-toast";
import { useQuery } from "@tanstack/react-query";
import { AgentQueryKeys } from "@/utils/query-keys";
import { AgentApi } from "@/services/api/api-agent";
import { QuoteFormValue } from "@/types/types";
import { Loader } from "../loader";
import { produce } from "immer";

export const BuyPolicyForm: React.FC<{
  policyType: string;
  isOpen: boolean;
  policyCategory: string;
  onClose: () => void;
}> = ({ policyType, isOpen, onClose, policyCategory }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [formPage, setFormPage] = useState(1);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [customerFormValues, setCustomerFormValues] = useState<
    QuoteFormValue[]
  >([]);
  const [insuranceFormValues, setInsuranceFormValues] = useState<
    QuoteFormValue[]
  >([]);

  const policyCategoryId = policyCategory.split(" ")[0].toLowerCase();

  const {
    isPending: isLoadingQuoteParams,
    data: quoteParamsData,
    // error: quoteParamsError,
  } = useQuery({
    queryKey: [AgentQueryKeys.quoteParams],
    queryFn: () => AgentApi.getQuoteParams(policyCategoryId),
  });

  useEffect(() => {
    setCustomerFormValues(quoteParamsData?.customer_metadata || []);
  }, [quoteParamsData?.customer_metadata]);

  useEffect(() => {
    setInsuranceFormValues(quoteParamsData?.insurance_details || []);
  }, [quoteParamsData?.insurance_details]);

  return (
    <div
      className={twMerge(
        "z-50 h-dvh w-screen fixed top-0 left-0 flex flex-col bg-white py-10 px-6 pb-6 transition translate-x-[100%] opacity-0 overflow-y-auto",
        isOpen && "translate-x-0 opacity-100"
      )}
      ref={containerRef}
    >
      <div className="flex justify-between items-center mb-4">
        <button
          onClick={(e) => {
            e.stopPropagation();
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
          <Icon type="arrowBack" className="" />
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
            <h4 className="font-semibold mb-2">Sell {policyType}</h4>
            <em className="not-italic text-sm text-[#4F4F4F]">
              Enter customer's personal details
            </em>
          </header>
          <div>
            {isLoadingQuoteParams ? (
              <Loader className="mx-auto w-16 h-16 mt-20" />
            ) : formPage == 1 ? (
              <div className="space-y-6">
                {customerFormValues.map((formValue, idx) => (
                  <CustomInput
                    key={idx}
                    label={formValue.name}
                    labelClassName="text-sm"
                    className="h-14 border-[#e0e0e0] text-sm"
                    value={formValue.value}
                    onChange={(e) =>
                      setCustomerFormValues(
                        produce((draft) => {
                          draft[idx].value = e.target.value;
                        })
                      )
                    }
                  />
                ))}
              </div>
            ) : (
              formPage == 2 && (
                <div className="space-y-6">
                  {insuranceFormValues.map((formValue, idx) => (
                    <CustomInput
                      key={idx}
                      label={formValue.name}
                      labelClassName="text-sm"
                      className="h-14 border-[#e0e0e0] text-sm"
                    />
                  ))}

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
              )
            )}
          </div>
          <div className="grow min-h-10" />
          <button
            onClick={(e) => {
              e.preventDefault();
              if (formPage == 1) {
                setFormPage(2);
                containerRef.current?.scrollTo({
                  top: 0,
                  left: 0,
                  behavior: "smooth",
                });
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
        <Icon type="travel" className="w-[100px] h-[100px]" />
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
      <SlidingButton onSlide={() => toast.success("Policy Sold")} />
    </div>
  );
};
