import ReactDOM from "react-dom";
import React from "react";
import App from "./App";
import "./pages/index.css";
import { BrowserRouter } from "react-router-dom";
import { ToastProvider } from "react-toast-notifications";
import routes from "./routes";
ReactDOM.render(
  <BrowserRouter>
    <ToastProvider placement="bottom-right">
      <App routes={routes} />
    </ToastProvider>
  </BrowserRouter>,
  document.getElementById("root")
);
