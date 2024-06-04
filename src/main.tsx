import "@/index.css";

import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { UserProvider } from "./context/user.context.js";
import App from "./App.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <React.StrictMode>
      <Toaster />
      <UserProvider>
        <App />
      </UserProvider>
    </React.StrictMode>
  </BrowserRouter>
);
