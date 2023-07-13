import { useState } from "react";
import Cancel from "../assets/Icons/Cancel.svg";
import Status from "../Components/Status";
import ClaimImage from "../assets/Images/ClaimImage.png";
import ClaimImage2 from "../assets/Images/ClaimImage2.png";

import { BiChevronRight, BiChevronLeft } from "react-icons/bi";
function ClaimsInformation() {
  const handleStatusUpdate = () => {};
  const [currentClaimImage, setCurrentClaimImage] = useState(ClaimImage);
  const [prevClaimImageBtnisDisabled, setPrevClaimImageBtnisDisabled] = useState(false);
  const [nextClaimImageBtnisDisabled, setNextClaimImageBtnisDisabled] = useState(false);
  const prevClaimImageClick = () => {
    setCurrentClaimImage(ClaimImage);
    setPrevClaimImageBtnisDisabled(true)
    setNextClaimImageBtnisDisabled(false)
  }
  const nextClaimImageClick = () => {
    setCurrentClaimImage(ClaimImage2);
    setNextClaimImageBtnisDisabled(true)
    setPrevClaimImageBtnisDisabled(false)
  }

  return (
    <div>
      <div
        id="policy-info"
        className="flex justify-between items-center px-4 py-5 mx-12"
      >
        <div id="policy-number" className="flex space-x-8 items-center">
          <img src={Cancel} alt="cancel" />
          <div className="flex flex-col font-medium">
            <span className="text-[#333333] text-lg">123jkf5402</span>
            <span className="text-[#4F4F4F] text-sm">May 7, 2023</span>
          </div>
          <Status status="submitted" />
        </div>
        <div id="update-btn">
          <button onClick={handleStatusUpdate} className="bg-[#25D366] rounded">
            <div className="space-x-2 flex flex-row items-center px-4 py-2 text-white">
              <span className="text-base">Update Claim status</span>
            </div>
          </button>
        </div>
      </div>
      <hr />
      <div
        id="pry-info-sect"
        className="mx-auto max-w-7xl mt-12 px-6 lg:px-0 border-red-600"
      >
        <div id="pry-info-container" className="flex flex-row justify-between">
          <div id="pry-info" className="w-1/2">
            <p className="text-2xl font-medium text-[#333333] mb-1.5">
              Primary Information
            </p>
            <hr />
            <table className="w-full mt-5 whitespace-nowrap items-start">
              <thead></thead>
              <tbody className="text-sm text-[#333333]">
                <tr>
                  <td className="text-[#4F4F4F] p-2 pr-16 pl-0">
                    Policy number
                  </td>
                  <td className="p-2 pl-0">123jkf5402</td>
                </tr>
                <tr>
                  <td className="text-[#4F4F4F] p-2 pr-16 pl-0">User email</td>
                  <td className="p-2 pl-0">fortunateanozie@gmail.com</td>
                </tr>
                <tr>
                  <td className="text-[#4F4F4F] p-2 pr-16 pl-0">
                    Type of claim
                  </td>
                  <td className="p-2 pl-0">Auto</td>
                </tr>
                <tr>
                  <td className="text-[#4F4F4F] p-2 pr-16 pl-0">Date</td>
                  <td className="p-2 pl-0">May 7, 2023</td>
                </tr>
                <tr>
                  <td className="text-[#4F4F4F] p-2 pr-16 pl-0">
                    Bill estimate
                  </td>
                  <td className="p-2 pl-0">₦50,000.00</td>
                </tr>
                <tr>
                  <td className="text-[#4F4F4F] p-2 pr-16 pl-0">Description</td>
                  <td className="p-2 pl-0 whitespace-normal">
                    While I was driving my car got hit by some mad keke-napep.
                    He rear-ended me and damaged my bumper.
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div
            id="claim-image"
            className="border border-[#E0E0E0] rounded-sm pb-10 p-6 "
          >
            <p className="mb-3 text-[#333333] font-medium text-2xl">Images</p>
            <hr />
            <div id="image container" className="px-5 mt-4 relative">
              <img src={currentClaimImage} alt="a damaged car" />
              <button className="h-10 w-10 absolute top-24 -left-0.5 rounded-full flex justify-center items-center border border-[#E0E0E0] bg-white shadow-lg hover:cursor-pointer disabled:opacity-50 disabled:cursor-auto" onClick={prevClaimImageClick} disabled={prevClaimImageBtnisDisabled}>
                <BiChevronLeft />
              </button>
              <button className="h-10 w-10 absolute -right-0.5 top-24 rounded-full flex justify-center items-center border border-[#E0E0E0] bg-white shadow-lg hover:cursor-pointer disabled:opacity-50 disabled:cursor-auto" onClick={nextClaimImageClick} disabled={nextClaimImageBtnisDisabled}>
                <BiChevronRight />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ClaimsInformation;
