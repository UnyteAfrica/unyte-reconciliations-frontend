import { nairaSign } from "@/utils/utils";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import car from "@/assets/images/car.png";
import { useContext } from "react";
import { OverlayContext, OverlayContextType } from "@/context/overlay.context";
import { Overlay } from "@/components/overlay";
import { ClaimStatusOverlay } from "@/components/overlays/claim-status-overlay";

const settings = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
};

export const ViewClaimsPage = () => {
  const { isUpdateClaimStatusOpened, setIsUpdateClaimStatusOpened } =
    useContext(OverlayContext) as OverlayContextType;

  return (
    <>
      {isUpdateClaimStatusOpened && (
        <Overlay>
          <ClaimStatusOverlay />
        </Overlay>
      )}
      <div className="p-8 max-w-6xl mx-auto w-full">
        <header className="flex pb-4 border-b border-[#e0e0e0] flex-col lg:flex-row lg:w-full lg:justify-between">
          <div className="flex flex-col space-y-3 mb-4">
            <div className="flex items-center">
              <em className="font-medium text-xl inline-block mr-4 not-italic">
                123jkf5402
              </em>
              <div className="p-2 py-1 font-medium text-sm w-20 text-center bg-[#4f4f4f]/[.1]">
                Submitted
              </div>
            </div>
            <em className="not-italic font-medium text-sm">May 7, 2023</em>
          </div>
          <button
            className="rounded-md w-[200px] text-center"
            onClick={(_) => setIsUpdateClaimStatusOpened(true)}
            data-testid="update-claim-btn"
          >
            <div className="space-x-2 flex justify-center items-center bg-mPrimary px-4 py-2 rounded text-white">
              <span className="text-base">Update Claim Status</span>
            </div>
          </button>
        </header>
        <main className="flex flex-col w-full mt-6 lg:flex-row lg:justify-between lg:items-center">
          <div className="w-full mb-8 lg:w-[500px]">
            <h2 className="font-medium text-2xl mb-4">mPrimary Information</h2>
            <div className="gap-y-4 w-full grid grid-cols-2">
              <em className="not-italic text-[##4F4F4F] text-sm inline-block mr-4">
                Policy Number:
              </em>
              <em className="not-italic">123jkf5402</em>

              <em className="not-italic text-[##4F4F4F] text-sm inline-block mr-4">
                User Email:
              </em>
              <em className="not-italic break-words">
                fortunateanozie@gmail.com
              </em>

              <em className="not-italic text-[##4F4F4F] text-sm inline-block mr-4">
                Type of Claim:
              </em>
              <em className="not-italic">Auto</em>

              <em className="not-italic text-[##4F4F4F] text-sm inline-block mr-4">
                Bill Estimate:
              </em>
              <em className="not-italic">{nairaSign}50,000.00</em>

              <em className="not-italic text-[##4F4F4F] text-sm inline-block mr-4">
                Date:
              </em>
              <em className="not-italic">May 7, 2023</em>

              <em className="not-italic text-[##4F4F4F] text-sm inline-block mr-4">
                Description:
              </em>
              <p>
                While I was driving my car got hit by some mad keke-napep. He
                rear-ended me and damaged my bumper.
              </p>
            </div>
          </div>
          <div className="border rounded-md border-[#ccc] p-8 w-full lg:w-[400px] xl:w-[500px] mx-auto lg:mx-0">
            <h2 className="font-medium text-2xl text-[#333] mb-6">Images</h2>
            <Slider className="w-full" {...settings}>
              <div className="mx-auto">
                <img className="mx-auto lg:w-full" src={car} />
              </div>

              <div className="mx-auto">
                <img className="mx-auto lg:w-full" src={car} />
              </div>

              <div className="mx-auto">
                <img className="mx-auto lg:w-full" src={car} />
              </div>

              <div className="mx-auto">
                <img className="mx-auto lg:w-full" src={car} />
              </div>
            </Slider>
          </div>
        </main>
      </div>
    </>
  );
};
