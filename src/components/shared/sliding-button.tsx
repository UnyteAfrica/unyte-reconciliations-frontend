import { useEffect, useRef, useState } from "react";
import { FaArrowRight } from "react-icons/fa";

const THRESHOLD = 0.8;

type SlidingButtonProps = {
  onSlide: () => void;
};

export const SlidingButton: React.FC<SlidingButtonProps> = ({ onSlide }) => {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const endButtonRef = useRef<HTMLButtonElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const completedDivRef = useRef<HTMLDivElement>(null);
  const [isComplete, setIsComplete] = useState(false);

  const distanceRef = useRef(0);
  const startRef = useRef(0);

  useEffect(() => {
    const onTouchStart = (e: TouchEvent) => {
      const { clientX } = e.changedTouches[0];
      if (isComplete) return;
      startRef.current = clientX;
    };
    const onTouchMove = (e: TouchEvent) => {
      const { clientX } = e.changedTouches[0];
      const distance = clientX - startRef.current;
      if (isComplete) return;
      if (distance / distanceRef.current < THRESHOLD) {
        completedDivRef.current!.style.width = `${
          distance + buttonRef.current!.clientWidth
        }px`;
        buttonRef.current!.style.transform = `translateX(${distance}px)`;
      }

      if (distance / distanceRef.current >= THRESHOLD) {
        completedDivRef.current!.style.width = `${
          distanceRef.current + buttonRef.current!.clientWidth
        }px`;
        buttonRef.current!.style.transform = `translateX(${distanceRef.current}px)`;
        setIsComplete(true);
      }
    };

    const onTouchEnd = (e: TouchEvent) => {
      const { clientX } = e.changedTouches[0];
      if (isComplete) return;
      const distance = clientX - startRef.current;
      if (distance / distanceRef.current < THRESHOLD) {
        buttonRef.current?.classList.add("transition");
        completedDivRef.current?.classList.add("transition");
        completedDivRef.current!.style.width = `${0}px`;
        buttonRef.current!.style.transform = `translateX(${0}px)`;
        setTimeout(() => {
          buttonRef.current?.classList.remove("transition");
          completedDivRef.current?.classList.remove("transition");
        }, 400);
      }
    };

    buttonRef.current?.addEventListener("touchstart", onTouchStart);
    buttonRef.current?.addEventListener("touchmove", onTouchMove);
    buttonRef.current?.addEventListener("touchend", onTouchEnd);

    return () => {
      buttonRef.current?.removeEventListener("touchstart", onTouchStart);
      buttonRef.current?.removeEventListener("touchmove", onTouchMove);
      buttonRef.current?.removeEventListener("touchend", onTouchEnd);
    };
  }, [isComplete]);

  useEffect(() => {
    const start = buttonRef.current?.getBoundingClientRect().x || 0;
    const end = endButtonRef.current?.getBoundingClientRect().x || 0;
    const distance = end - start;
    distanceRef.current = distance;
  }, []);

  useEffect(() => {
    if (isComplete) {
      onSlide();
    }
  }, [isComplete]);

  return (
    <div
      ref={containerRef}
      className="w-full h-12 border border-[#25D366] rounded-full relative"
    >
      <p className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[175px]  text-black">
        Slide button to confirm
      </p>
      <div
        className="absolute inset-0 w-0 h-12 bg-[#25D366] rounded-full text-white flex z-10 justify-center items-center"
        ref={completedDivRef}
      >
        Completed
      </div>
      <button
        ref={buttonRef}
        className="h-12 w-12 relative bottom-[1px] -left-[1px] rounded-full bg-[#25D366] text-white flex justify-center items-center  z-20"
      >
        <FaArrowRight />
      </button>
      <button
        ref={endButtonRef}
        className="h-8 w-8 rounded-full absolute right-2 top-2 bg-[#25D366] text-white justify-center items-center invisible"
      >
        <FaArrowRight />
      </button>
    </div>
  );
};
