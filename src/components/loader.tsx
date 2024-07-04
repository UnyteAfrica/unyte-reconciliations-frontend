import { twMerge } from "tailwind-merge";

export const Loader = ({ className = "" }: { className?: string }) => (
  <div className={twMerge("loader h-6 w-6", className)}></div>
);
