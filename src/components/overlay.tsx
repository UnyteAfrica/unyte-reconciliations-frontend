import { PropsWithChildren, useContext } from "react";
import { twMerge } from "tailwind-merge";
import { useLockScroll } from "@/utils/hooks";
import { OverlayContext, OverlayContextType } from "@/context/overlay.context";

export const Overlay: React.FC<PropsWithChildren<{ className?: string }>> = ({
  className,
  children,
}) => {
  const { isNewAgentOverlayOpened, setNewAgentOverlayOpened } = useContext(
    OverlayContext
  ) as OverlayContextType;

  useLockScroll(true);

  const handleClose = () => {
    if (isNewAgentOverlayOpened) setNewAgentOverlayOpened(false);
  };

  return (
    <div
      className={twMerge(
        "bg-[#080202]/[.40] h-screen w-screen flex justify-center items-center fixed top-0 left-0 z-40",
        className
      )}
      onClick={handleClose}
    >
      <div className="max-h-[80vh] overlayContainer w-[90%] max-w-[550px] overflow-y-auto rounded-2xl bg-white">
        {children}
      </div>
    </div>
  );
};
