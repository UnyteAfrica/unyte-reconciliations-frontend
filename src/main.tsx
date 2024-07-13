import "@/index.css";

import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import App from "./App.tsx";
import {
  MutationCache,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { isAxiosError } from "axios";
import { CompanyProvider } from "./context/company.context.tsx";
import { AgentProvider } from "./context/agent.context.tsx";
import { OverlayContextProvider } from "./context/overlay.context.tsx";

const queryClient = new QueryClient({
  mutationCache: new MutationCache({
    onError: (err) => {
      console.log(err);
      if (isAxiosError(err)) {
        let errMessage =
          err.response?.data.detail ??
          err.response?.data.message ??
          err.response?.data.non_field_errors ??
          "";
        if (!errMessage) {
          if (Array.isArray(err.response?.data.error)) {
            errMessage = err.response.data.error[0];
          } else {
            errMessage = err.response?.data.error;
          }
        }

        if (errMessage) toast.error(errMessage);
      }
    },
  }),
});

ReactDOM.createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <React.StrictMode>
      <QueryClientProvider client={queryClient}>
        <Toaster
          toastOptions={{ duration: 5000, style: { fontFamily: "Inter" } }}
        />
        <OverlayContextProvider>
          <CompanyProvider>
            <AgentProvider>
              <App />
            </AgentProvider>
          </CompanyProvider>
        </OverlayContextProvider>
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </React.StrictMode>
  </BrowserRouter>
);
