import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { HelmetProvider } from "react-helmet-async";
import { StoreProvider } from "./Store";
import { PayPalScriptProvider } from "@paypal/react-paypal-js";
import { ToggleCartStoreContext } from "./Utility/toggleCartStore.js";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <HelmetProvider>
      <StoreProvider>
        <ToggleCartStoreContext>
          <PayPalScriptProvider deferLoading={true}>
            <App />
          </PayPalScriptProvider>
        </ToggleCartStoreContext>
      </StoreProvider>
    </HelmetProvider>
  </React.StrictMode>
);

reportWebVitals();
