import { PropsWithChildren } from "react";
import { createPortal } from "react-dom";
import { twMerge } from "tailwind-merge";

type SideModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

export const SideModal: React.FC<PropsWithChildren<SideModalProps>> = ({
  isOpen,
  onClose,
  children,
}) => {
  return (
    <div
      className={twMerge(
        "fixed top-0 left-0 h-screen w-full pointer-events-none",
        isOpen && "pointer-events-auto"
      )}
    >
      <div
        className={twMerge(
          "h-screen w-full fixed top-0 left-0 bg-[#000]/30 transition -translate-x-full opacity-0",
          isOpen && "translate-x-0 opacity-100"
        )}
        onClick={onClose}
      ></div>
      <div
        className={twMerge(
          "fixed right-0 top-0 transition translate-x-full opacity-0",
          isOpen && "translate-x-0 opacity-100"
        )}
      >
        {children}
      </div>
    </div>
  );
};
