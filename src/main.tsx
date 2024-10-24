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
import * as changeCase from "change-case";

import { logger } from "./utils/logger.ts";
import { isPlainObject } from "lodash";
import { AuthProvider } from "./context/auth.context.tsx";

const ERR_MAP: { [key: string]: string } = {
  business_registration_number: "Company Registration No",
  admin_name: "Admin Name",
  business_name: "Company Name",
  email: "Admin Email",
  password: "Password",
  insurer_gampID: "GAMP ID",
};

const queryClient = new QueryClient({
  mutationCache: new MutationCache({
    onError: (err) => {
      logger.error(err);
      if (isAxiosError(err)) {
        let errMessage =
          err.response?.data.detail ??
          err.response?.data.message ??
          err.response?.data.non_field_errors ??
          "";

        if (!errMessage && Array.isArray(err.response?.data.error)) {
          errMessage = err.response.data.error[0];
        }
        if (!errMessage && err.response?.data.error) {
          errMessage = err.response?.data.error;
        }
        if (errMessage) {
          toast.error(errMessage);
        }

        if (!errMessage && isPlainObject(err.response?.data)) {
          const errObj = err.response?.data;
          for (let key in errObj) {
            const keyVal: string =
              key in ERR_MAP
                ? (ERR_MAP[key] as string)
                : changeCase.capitalCase(key);

            toast.error(`${keyVal}: ${errObj[key]}`);
          }
        }
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
              <AuthProvider>
                <App />
              </AuthProvider>
            </AgentProvider>
          </CompanyProvider>
        </OverlayContextProvider>
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </React.StrictMode>
  </BrowserRouter>
);
