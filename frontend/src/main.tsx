import React from "react";
import ReactDOM from "react-dom/client";
import App from "@/App";

import { LanguageProvider } from "@/presentation/i18n/LanguageContext";

const rootElement = document.querySelector("#root");
if (!rootElement) {
  throw new Error("Failed to find the root element");
}

ReactDOM.createRoot(rootElement).render(
  <React.StrictMode>
    <LanguageProvider>
      <App />
    </LanguageProvider>
  </React.StrictMode>,
);
