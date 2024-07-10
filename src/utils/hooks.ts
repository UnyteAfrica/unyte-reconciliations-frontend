import { useEffect } from "react";

export const useLockScroll = (control: boolean) => {
  useEffect(() => {
    if (control) {
      document.body.style.height = "100vh";
      document.body.style.overflow = "hidden";

      return () => {
        console.log("unmounting");
        document.body.style.height = "auto";
        document.body.style.overflow = "visible";
      };
    }
  }, [control]);
};
