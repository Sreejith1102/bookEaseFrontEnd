import "./index.css";
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import { ReservationContextProvider } from "./store/reservation-context";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <ReservationContextProvider>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </ReservationContextProvider>
);
